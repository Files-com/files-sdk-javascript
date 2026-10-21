import Files = require('../Files')

declare class DirectConnectionInfo {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: DirectConnectionInfo.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: DirectConnectionInfo.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Direct connection information schema version. */
  readonly version?: number | null

  /** TLS server name (SNI and Host header) for the Agent's direct transfer listener. */
  readonly server_name?: string | null

  /** Validated ip:port candidates that may be dialed over TCP+TLS for this transfer. */
  readonly addresses?: string[] | null

  /** Signed HTTPS URI for direct Agent transfer traffic. */
  readonly direct_uri?: string | null

  /** PEM-encoded CA certificate used to verify the Agent's direct transfer TLS certificate. */
  readonly ca_pem?: string | null

  /** Direct connection information schema version. */
  getVersion(): number | null | undefined

  /** TLS server name (SNI and Host header) for the Agent's direct transfer listener. */
  getServerName(): string | null | undefined

  /** Validated ip:port candidates that may be dialed over TCP+TLS for this transfer. */
  getAddresses(): string[] | null | undefined

  /** Signed HTTPS URI for direct Agent transfer traffic. */
  getDirectUri(): string | null | undefined

  /** PEM-encoded CA certificate used to verify the Agent's direct transfer TLS certificate. */
  getCaPem(): string | null | undefined

  static default: typeof DirectConnectionInfo
}

declare namespace DirectConnectionInfo {
  /** The fields of `DirectConnectionInfo` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Direct connection information schema version. */
    version?: number | null

    /** TLS server name (SNI and Host header) for the Agent's direct transfer listener. */
    server_name?: string | null

    /** Validated ip:port candidates that may be dialed over TCP+TLS for this transfer. */
    addresses?: string[] | null

    /** Signed HTTPS URI for direct Agent transfer traffic. */
    direct_uri?: string | null

    /** PEM-encoded CA certificate used to verify the Agent's direct transfer TLS certificate. */
    ca_pem?: string | null
  }
}

export = DirectConnectionInfo
