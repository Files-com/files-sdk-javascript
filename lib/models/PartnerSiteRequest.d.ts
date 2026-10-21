import Files = require('../Files')

/**
 * A PartnerSiteRequest represents a request for a Guest Partner to add their Files.com Site to their Partnership with
 * the Host Partner.
 */
declare class PartnerSiteRequest {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PartnerSiteRequest.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PartnerSiteRequest.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Partner Site Request ID */
  readonly id?: number | null

  /** Host Partner ID */
  readonly host_partner_id?: number | null

  /** Guest Site URL */
  readonly guest_site_url?: string | null

  /** Request status (pending, approved, rejected) */
  readonly status?: 'pending' | 'approved' | 'rejected' | Files.OtherString | null

  /** Host Site Name */
  readonly host_site_name?: string | null

  /** Pairing key used to approve this request on the Guest Site */
  readonly pairing_key?: string | null

  /** Request creation date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Request last updated date/time */
  readonly updated_at?: Files.DateTimeString | null

  /** Partner Site Request ID */
  getId(): number | null | undefined

  /** Host Partner ID */
  getHostPartnerId(): number | null | undefined

  /** Guest Site URL */
  getGuestSiteUrl(): string | null | undefined

  /** Request status (pending, approved, rejected) */
  getStatus(): 'pending' | 'approved' | 'rejected' | Files.OtherString | null | undefined

  /** Host Site Name */
  getHostSiteName(): string | null | undefined

  /** Pairing key used to approve this request on the Guest Site */
  getPairingKey(): string | null | undefined

  /** Request creation date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Request last updated date/time */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Partner Site Request ID */
  setId(value: number): void

  /** Host Partner ID */
  setHostPartnerId(value: number): void

  /** Guest Site URL */
  setGuestSiteUrl(value: string): void

  /** Request status (pending, approved, rejected) */
  setStatus(value: 'pending' | 'approved' | 'rejected' | Files.OtherString): void

  /** Host Site Name */
  setHostSiteName(value: string): void

  /** Pairing key used to approve this request on the Guest Site */
  setPairingKey(value: string): void

  /** Delete Partner Site Request */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List Partner Site Requests */
  static list(params?: PartnerSiteRequest.ListParams, options?: Files.RequestOptions): Promise<PartnerSiteRequest[]>

  /** Alias of `list()`. */
  static all(params?: PartnerSiteRequest.ListParams, options?: Files.RequestOptions): Promise<PartnerSiteRequest[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: PartnerSiteRequest.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<PartnerSiteRequest>

  /** Find partner site request by pairing key */
  static findByPairingKey(params: PartnerSiteRequest.FindByPairingKeyParams, options?: Files.RequestOptions): Promise<void>

  /** Create Partner Site Request */
  static create(params: PartnerSiteRequest.CreateParams, options?: Files.RequestOptions): Promise<PartnerSiteRequest>

  /** Reject partner site request */
  static reject(params: PartnerSiteRequest.RejectParams, options?: Files.RequestOptions): Promise<void>

  /** Approve partner site request */
  static approve(params: PartnerSiteRequest.ApproveParams, options?: Files.RequestOptions): Promise<void>

  static default: typeof PartnerSiteRequest
}

declare namespace PartnerSiteRequest {
  /** The fields of `PartnerSiteRequest` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Partner Site Request ID */
    id?: number | null

    /** Host Partner ID */
    host_partner_id?: number | null

    /** Guest Site URL */
    guest_site_url?: string | null

    /** Request status (pending, approved, rejected) */
    status?: 'pending' | 'approved' | 'rejected' | Files.OtherString | null

    /** Host Site Name */
    host_site_name?: string | null

    /** Pairing key used to approve this request on the Guest Site */
    pairing_key?: string | null

    /** Request creation date/time */
    created_at?: Files.DateTimeString | null

    /** Request last updated date/time */
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are
     * `host_partner_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `host_partner_id`.
     */
    filter?: Files.JsonObject
  }

  interface FindByPairingKeyParams {
    /** Pairing key for the partner site request */
    pairing_key: string
  }

  interface CreateParams {
    /** Host Partner ID to link with */
    host_partner_id: number

    /** Guest Site URL to link to */
    guest_site_url: string
  }

  interface RejectParams {
    /** Pairing key for the partner site request */
    pairing_key: string
  }

  interface ApproveParams {
    /** Pairing key for the partner site request */
    pairing_key: string

    /**
     * ID of an existing Partner on this site, with the host role, that represents the requesting organization. The
     * connection binds to that Partner and makes it host_and_guest. When omitted, a guest Partner named after the host
     * site is created.
     */
    partner_id?: number
  }
}

export = PartnerSiteRequest
