import Files = require('../Files')

/** A DNSRecord is a custom DNS configuration record for a Site. */
declare class DnsRecord {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: DnsRecord.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: DnsRecord.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Unique label for DNS record; used by Zapier and other integrations. */
  readonly id?: string | null

  /** DNS record domain name */
  readonly domain?: string | null

  /** DNS record type */
  readonly rrtype?: string | null

  /** DNS record value */
  readonly value?: string | null

  /** Unique label for DNS record; used by Zapier and other integrations. */
  getId(): string | null | undefined

  /** DNS record domain name */
  getDomain(): string | null | undefined

  /** DNS record type */
  getRrtype(): string | null | undefined

  /** DNS record value */
  getValue(): string | null | undefined

  /** Show Site DNS Configuration */
  static list(params?: DnsRecord.ListParams, options?: Files.RequestOptions): Promise<DnsRecord[]>

  /** Alias of `list()`. */
  static all(params?: DnsRecord.ListParams, options?: Files.RequestOptions): Promise<DnsRecord[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: DnsRecord.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<DnsRecord>

  static default: typeof DnsRecord
}

declare namespace DnsRecord {
  /** The fields of `DnsRecord` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Unique label for DNS record; used by Zapier and other integrations. */
    id?: string | null

    /** DNS record domain name */
    domain?: string | null

    /** DNS record type */
    rrtype?: string | null

    /** DNS record value */
    value?: string | null
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
}

export = DnsRecord
