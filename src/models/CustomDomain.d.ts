import Files from '../Files'

/** A CustomDomain object represents an additional customer-owned domain that routes to a Files.com site. */
declare class CustomDomain {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: CustomDomain.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: CustomDomain.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Custom Domain ID. */
  readonly id?: number | null

  /** Workspace ID (0 for the default workspace). */
  readonly workspace_id?: number | null

  /** Allow all workspaces to use this default-workspace Custom Domain. */
  readonly available_to_all_workspaces?: boolean | null

  /**
   * Eligible public IP addresses for Remote Server outbound connections. Empty when this Custom Domain is not eligible
   * for outbound selection.
   */
  readonly outbound_ip_addresses?: string[] | null

  /** Customer-owned domain name. */
  readonly domain?: string | null

  /**
   * Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing
   * traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be
   * set manually via the API for any reason.
   */
  readonly destination?: 'site_alias' | 'public_hosting' | 's3_endpoint' | 'unassigned' | Files.OtherString | null

  /** Current DNS verification status. */
  readonly dns_status?: 'disabled' | 'correct' | 'no_records' | 'cname_wrong' | 'a_record' | 'caa_conflict' | Files.OtherString | null

  /** Current SSL certificate ID. */
  readonly ssl_certificate_id?: number | null

  /** Is this domain's SSL certificate automatically managed and renewed by Files.com? */
  readonly brick_managed?: boolean | null

  /**
   * Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior. Preserved as historical
   * context when `destination` becomes `unassigned`.
   */
  readonly folder_behavior_id?: number | null

  /** Dedicated public IP addresses allocated to this Custom Domain. */
  readonly ip_addresses?: string[] | null

  /** When this Custom Domain was created. */
  readonly created_at?: Files.DateTimeString | null

  /** When this Custom Domain was last updated. */
  readonly updated_at?: Files.DateTimeString | null

  /** Custom Domain ID. */
  getId(): number | null | undefined

  /** Workspace ID (0 for the default workspace). */
  getWorkspaceId(): number | null | undefined

  /** Allow all workspaces to use this default-workspace Custom Domain. */
  getAvailableToAllWorkspaces(): boolean | null | undefined

  /**
   * Eligible public IP addresses for Remote Server outbound connections. Empty when this Custom Domain is not eligible
   * for outbound selection.
   */
  getOutboundIpAddresses(): string[] | null | undefined

  /** Customer-owned domain name. */
  getDomain(): string | null | undefined

  /**
   * Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing
   * traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be
   * set manually via the API for any reason.
   */
  getDestination(): 'site_alias' | 'public_hosting' | 's3_endpoint' | 'unassigned' | Files.OtherString | null | undefined

  /** Current DNS verification status. */
  getDnsStatus(): 'disabled' | 'correct' | 'no_records' | 'cname_wrong' | 'a_record' | 'caa_conflict' | Files.OtherString | null | undefined

  /** Current SSL certificate ID. */
  getSslCertificateId(): number | null | undefined

  /** Is this domain's SSL certificate automatically managed and renewed by Files.com? */
  getBrickManaged(): boolean | null | undefined

  /**
   * Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior. Preserved as historical
   * context when `destination` becomes `unassigned`.
   */
  getFolderBehaviorId(): number | null | undefined

  /** Dedicated public IP addresses allocated to this Custom Domain. */
  getIpAddresses(): string[] | null | undefined

  /** When this Custom Domain was created. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** When this Custom Domain was last updated. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Custom Domain ID. */
  setId(value: number): void

  /** Workspace ID (0 for the default workspace). */
  setWorkspaceId(value: number): void

  /** Allow all workspaces to use this default-workspace Custom Domain. */
  setAvailableToAllWorkspaces(value: boolean): void

  /**
   * Eligible public IP addresses for Remote Server outbound connections. Empty when this Custom Domain is not eligible
   * for outbound selection.
   */
  setOutboundIpAddresses(value: string[]): void

  /** Customer-owned domain name. */
  setDomain(value: string): void

  /**
   * Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing
   * traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be
   * set manually via the API for any reason.
   */
  setDestination(value: 'site_alias' | 'public_hosting' | 's3_endpoint' | 'unassigned'): void

  /** Current DNS verification status. */
  setDnsStatus(value: 'disabled' | 'correct' | 'no_records' | 'cname_wrong' | 'a_record' | 'caa_conflict' | Files.OtherString): void

  /** Current SSL certificate ID. */
  setSslCertificateId(value: number): void

  /** Is this domain's SSL certificate automatically managed and renewed by Files.com? */
  setBrickManaged(value: boolean): void

  /**
   * Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior. Preserved as historical
   * context when `destination` becomes `unassigned`.
   */
  setFolderBehaviorId(value: number): void

  /** Dedicated public IP addresses allocated to this Custom Domain. */
  setIpAddresses(value: string[]): void

  /** Update Custom Domain */
  update(params?: CustomDomain.UpdateParams): Promise<this>

  /** Delete Custom Domain */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Custom Domains */
  static list(params?: CustomDomain.ListParams, options?: Files.RequestOptions): Promise<CustomDomain[]>

  /** Alias of `list()`. */
  static all(params?: CustomDomain.ListParams, options?: Files.RequestOptions): Promise<CustomDomain[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: CustomDomain.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<CustomDomain>

  /**
   * Show Custom Domain
   * @param id - Custom Domain ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<CustomDomain>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<CustomDomain>

  /**
   * Allocate dedicated IP addresses to this Custom Domain
   * @param id - Custom Domain ID.
   */
  static createAllocateIp(id: number, params: CustomDomain.CreateAllocateIpParams, options?: Files.RequestOptions): Promise<CustomDomain>

  /** Create Custom Domain */
  static create(params: CustomDomain.CreateParams, options?: Files.RequestOptions): Promise<CustomDomain>
}

declare namespace CustomDomain {
  /** The fields of `CustomDomain` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Custom Domain ID. */
    id?: number | null

    /** Workspace ID (0 for the default workspace). */
    workspace_id?: number | null

    /** Allow all workspaces to use this default-workspace Custom Domain. */
    available_to_all_workspaces?: boolean | null

    /**
     * Eligible public IP addresses for Remote Server outbound connections. Empty when this Custom Domain is not
     * eligible for outbound selection.
     */
    outbound_ip_addresses?: string[] | null

    /** Customer-owned domain name. */
    domain?: string | null

    /**
     * Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not
     * routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and
     * can be set manually via the API for any reason.
     */
    destination?: 'site_alias' | 'public_hosting' | 's3_endpoint' | 'unassigned' | Files.OtherString | null

    /** Current DNS verification status. */
    dns_status?: 'disabled' | 'correct' | 'no_records' | 'cname_wrong' | 'a_record' | 'caa_conflict' | Files.OtherString | null

    /** Current SSL certificate ID. */
    ssl_certificate_id?: number | null

    /** Is this domain's SSL certificate automatically managed and renewed by Files.com? */
    brick_managed?: boolean | null

    /**
     * Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior. Preserved as historical
     * context when `destination` becomes `unassigned`.
     */
    folder_behavior_id?: number | null

    /** Dedicated public IP addresses allocated to this Custom Domain. */
    ip_addresses?: string[] | null

    /** When this Custom Domain was created. */
    created_at?: Files.DateTimeString | null

    /** When this Custom Domain was last updated. */
    updated_at?: Files.DateTimeString | null
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
     * `id` or `available_to_all_workspaces`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateAllocateIpParams {
    /** Number of dedicated IP addresses to allocate. */
    count: 1 | 2
  }

  interface CreateParams {
    /** Allow all workspaces to use this default-workspace Custom Domain. */
    available_to_all_workspaces?: boolean

    /** Workspace ID (0 for the default workspace). */
    workspace_id?: number

    /**
     * Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not
     * routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and
     * can be set manually via the API for any reason.
     */
    destination?: 'site_alias' | 'public_hosting' | 's3_endpoint' | 'unassigned'

    /**
     * Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior. Preserved as historical
     * context when `destination` becomes `unassigned`.
     */
    folder_behavior_id?: number

    /** Current SSL certificate ID. */
    ssl_certificate_id?: number

    /** Customer-owned domain name. */
    domain: string
  }

  interface UpdateParams {
    /** Allow all workspaces to use this default-workspace Custom Domain. */
    available_to_all_workspaces?: boolean

    /** Workspace ID (0 for the default workspace). */
    workspace_id?: number

    /**
     * Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not
     * routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and
     * can be set manually via the API for any reason.
     */
    destination?: 'site_alias' | 'public_hosting' | 's3_endpoint' | 'unassigned'

    /**
     * Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior. Preserved as historical
     * context when `destination` becomes `unassigned`.
     */
    folder_behavior_id?: number

    /** Current SSL certificate ID. */
    ssl_certificate_id?: number

    /** Customer-owned domain name. */
    domain?: string
  }
}

export default CustomDomain
