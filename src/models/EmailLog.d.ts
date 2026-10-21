import Files from '../Files'

/** An EmailLog is a record of the email notifications that were sent. */
declare class EmailLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EmailLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EmailLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** Log Message */
  readonly message?: string | null

  /** Status of E-Mail delivery */
  readonly status?: 'success' | 'failure' | 'suppressed' | Files.OtherString | null

  /** Subject line of E-Mail */
  readonly subject?: string | null

  /** To field of E-Mail */
  readonly to?: string | null

  /** CC field of E-Mail */
  readonly cc?: string | null

  /** How was the email delivered?  `customer_smtp` or `files.com` */
  readonly delivery_method?: string | null

  /** Customer SMTP Hostname used. */
  readonly smtp_hostname?: string | null

  /** Customer SMTP IP address as resolved for use (useful for troubleshooting DNS issues with customer SMTP). */
  readonly smtp_ip?: string | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** Log Message */
  getMessage(): string | null | undefined

  /** Status of E-Mail delivery */
  getStatus(): 'success' | 'failure' | 'suppressed' | Files.OtherString | null | undefined

  /** Subject line of E-Mail */
  getSubject(): string | null | undefined

  /** To field of E-Mail */
  getTo(): string | null | undefined

  /** CC field of E-Mail */
  getCc(): string | null | undefined

  /** How was the email delivered?  `customer_smtp` or `files.com` */
  getDeliveryMethod(): string | null | undefined

  /** Customer SMTP Hostname used. */
  getSmtpHostname(): string | null | undefined

  /** Customer SMTP IP address as resolved for use (useful for troubleshooting DNS issues with customer SMTP). */
  getSmtpIp(): string | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Email Logs */
  static list(params?: EmailLog.ListParams, options?: Files.RequestOptions): Promise<EmailLog[]>

  /** Alias of `list()`. */
  static all(params?: EmailLog.ListParams, options?: Files.RequestOptions): Promise<EmailLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EmailLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EmailLog>
}

declare namespace EmailLog {
  /** The fields of `EmailLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** Log Message */
    message?: string | null

    /** Status of E-Mail delivery */
    status?: 'success' | 'failure' | 'suppressed' | Files.OtherString | null

    /** Subject line of E-Mail */
    subject?: string | null

    /** To field of E-Mail */
    to?: string | null

    /** CC field of E-Mail */
    cc?: string | null

    /** How was the email delivered?  `customer_smtp` or `files.com` */
    delivery_method?: string | null

    /** Customer SMTP Hostname used. */
    smtp_hostname?: string | null

    /** Customer SMTP IP address as resolved for use (useful for troubleshooting DNS issues with customer SMTP). */
    smtp_ip?: string | null

    /** Start Time of Action */
    created_at?: Files.DateTimeString | null
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 1000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `status` and
     * `created_at`. Valid field combinations are any combination of `status` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `status` and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `status` and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `status` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `status` and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default EmailLog
