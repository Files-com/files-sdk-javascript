import Files from '../Files'
import PublicIpAddress from './PublicIpAddress'

/**
 * An IPAddress is a record of IP addresses that you can use to automate keeping your firewall's configuration up to
 * date.
 */
declare class IpAddress {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: IpAddress.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: IpAddress.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Unique label for list; used by Zapier and other integrations. */
  readonly id?: string | null

  /** The object that this public IP address list is associated with. */
  readonly associated_with?: string | null

  /** Group ID */
  readonly group_id?: number | null

  /** A list of IP addresses. */
  readonly ip_addresses?: string[] | null

  /** Unique label for list; used by Zapier and other integrations. */
  getId(): string | null | undefined

  /** The object that this public IP address list is associated with. */
  getAssociatedWith(): string | null | undefined

  /** Group ID */
  getGroupId(): number | null | undefined

  /** A list of IP addresses. */
  getIpAddresses(): string[] | null | undefined

  /** List IP Addresses associated with the current site */
  static list(params?: IpAddress.ListParams, options?: Files.RequestOptions): Promise<IpAddress[]>

  /** Alias of `list()`. */
  static all(params?: IpAddress.ListParams, options?: Files.RequestOptions): Promise<IpAddress[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: IpAddress.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<IpAddress>

  /** List all possible public SmartFile IP addresses */
  static getSmartfileReserved(params?: IpAddress.GetSmartfileReservedParams, options?: Files.RequestOptions): Promise<PublicIpAddress[]>

  /**
   * The models `getSmartfileReserved()` lists, one at a time: nothing is requested before the first `next()`, and each
   * page only once the models before it have been taken. The params, options and settings are taken when the iterator
   * is made, the global settings as they are then unless `options.client` is given, and every page and model uses them.
   * Leaving a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is
   * not retried.
   */
  static getSmartfileReservedIterator(params?: IpAddress.GetSmartfileReservedParams, options?: Files.RequestOptions): AsyncIterableIterator<PublicIpAddress>

  /** List all possible public ExaVault IP addresses */
  static getExavaultReserved(params?: IpAddress.GetExavaultReservedParams, options?: Files.RequestOptions): Promise<PublicIpAddress[]>

  /**
   * The models `getExavaultReserved()` lists, one at a time: nothing is requested before the first `next()`, and each
   * page only once the models before it have been taken. The params, options and settings are taken when the iterator
   * is made, the global settings as they are then unless `options.client` is given, and every page and model uses them.
   * Leaving a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is
   * not retried.
   */
  static getExavaultReservedIterator(params?: IpAddress.GetExavaultReservedParams, options?: Files.RequestOptions): AsyncIterableIterator<PublicIpAddress>

  /** List all possible public IP addresses */
  static getReserved(params?: IpAddress.GetReservedParams, options?: Files.RequestOptions): Promise<PublicIpAddress[]>

  /**
   * The models `getReserved()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static getReservedIterator(params?: IpAddress.GetReservedParams, options?: Files.RequestOptions): AsyncIterableIterator<PublicIpAddress>
}

declare namespace IpAddress {
  /** The fields of `IpAddress` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Unique label for list; used by Zapier and other integrations. */
    id?: string | null

    /** The object that this public IP address list is associated with. */
    associated_with?: string | null

    /** Group ID */
    group_id?: number | null

    /** A list of IP addresses. */
    ip_addresses?: string[] | null
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

  interface GetSmartfileReservedParams {
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

  interface GetExavaultReservedParams {
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

  interface GetReservedParams {
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
}

export default IpAddress
