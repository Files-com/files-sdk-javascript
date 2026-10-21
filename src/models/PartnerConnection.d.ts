import Files from '../Files'

declare class PartnerConnection {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PartnerConnection.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PartnerConnection.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Relationship ID used with DELETE /partner_sites/:id to disconnect. */
  readonly id?: number | null

  /**
   * This Partner's role in this connection. A host shares local files with the connected site; a guest accesses files
   * shared by the connected site.
   */
  readonly role?: 'host' | 'guest' | Files.OtherString | null

  /** ID of the connected site. */
  readonly site_id?: number | null

  /** Name of the connected site. */
  readonly site_name?: string | null

  /**
   * File API path to the connected Host's mount on this site when role is guest. Null when role is host. File access
   * remains subject to the caller's permissions and the Host Partner's grants.
   */
  readonly mount_path?: string | null

  /** Relationship ID used with DELETE /partner_sites/:id to disconnect. */
  getId(): number | null | undefined

  /**
   * This Partner's role in this connection. A host shares local files with the connected site; a guest accesses files
   * shared by the connected site.
   */
  getRole(): 'host' | 'guest' | Files.OtherString | null | undefined

  /** ID of the connected site. */
  getSiteId(): number | null | undefined

  /** Name of the connected site. */
  getSiteName(): string | null | undefined

  /**
   * File API path to the connected Host's mount on this site when role is guest. Null when role is host. File access
   * remains subject to the caller's permissions and the Host Partner's grants.
   */
  getMountPath(): string | null | undefined
}

declare namespace PartnerConnection {
  /** The fields of `PartnerConnection` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Relationship ID used with DELETE /partner_sites/:id to disconnect. */
    id?: number | null

    /**
     * This Partner's role in this connection. A host shares local files with the connected site; a guest accesses files
     * shared by the connected site.
     */
    role?: 'host' | 'guest' | Files.OtherString | null

    /** ID of the connected site. */
    site_id?: number | null

    /** Name of the connected site. */
    site_name?: string | null

    /**
     * File API path to the connected Host's mount on this site when role is guest. Null when role is host. File access
     * remains subject to the caller's permissions and the Host Partner's grants.
     */
    mount_path?: string | null
  }
}

export default PartnerConnection
