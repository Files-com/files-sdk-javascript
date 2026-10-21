import Files = require('../Files')

/**
 * A PublicIPAddress is an IP address that `app.files.com` (or `*.files.com`) may potentially resolve to over the next
 * 30 days.
 */
declare class PublicIpAddress {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PublicIpAddress.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PublicIpAddress.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The public IP address. */
  readonly ip_address?: string | null

  /** The name of the frontend server. */
  readonly server_name?: string | null

  readonly ftp_enabled?: boolean | null

  readonly sftp_enabled?: boolean | null

  /** The public IP address. */
  getIpAddress(): string | null | undefined

  /** The name of the frontend server. */
  getServerName(): string | null | undefined

  getFtpEnabled(): boolean | null | undefined

  getSftpEnabled(): boolean | null | undefined

  static default: typeof PublicIpAddress
}

declare namespace PublicIpAddress {
  /** The fields of `PublicIpAddress` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The public IP address. */
    ip_address?: string | null

    /** The name of the frontend server. */
    server_name?: string | null

    ftp_enabled?: boolean | null

    sftp_enabled?: boolean | null
  }
}

export = PublicIpAddress
