import Files from '../Files'

/** An EmailIncomingMessage is an audit log designed to track status of email to inbox uploads. */
declare class EmailIncomingMessage {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EmailIncomingMessage.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EmailIncomingMessage.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Id of the Email Incoming Message */
  readonly id?: number | null

  /** Id of the Inbox associated with this message */
  readonly inbox_id?: number | null

  /** Sender of the email */
  readonly sender?: string | null

  /** Sender name */
  readonly sender_name?: string | null

  /** Status of the message */
  readonly status?: 'success' | 'partial_failure' | 'failure' | 'skipped' | Files.OtherString | null

  /** Body of the email */
  readonly body?: string | null

  /** Message describing the failure */
  readonly message?: string | null

  /** Message creation date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Title of the Inbox associated with this message */
  readonly inbox_title?: string | null

  /** Id of the Email Incoming Message */
  getId(): number | null | undefined

  /** Id of the Inbox associated with this message */
  getInboxId(): number | null | undefined

  /** Sender of the email */
  getSender(): string | null | undefined

  /** Sender name */
  getSenderName(): string | null | undefined

  /** Status of the message */
  getStatus(): 'success' | 'partial_failure' | 'failure' | 'skipped' | Files.OtherString | null | undefined

  /** Body of the email */
  getBody(): string | null | undefined

  /** Message describing the failure */
  getMessage(): string | null | undefined

  /** Message creation date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Title of the Inbox associated with this message */
  getInboxTitle(): string | null | undefined

  /** List Email Incoming Messages */
  static list(params?: EmailIncomingMessage.ListParams, options?: Files.RequestOptions): Promise<EmailIncomingMessage[]>

  /** Alias of `list()`. */
  static all(params?: EmailIncomingMessage.ListParams, options?: Files.RequestOptions): Promise<EmailIncomingMessage[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EmailIncomingMessage.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EmailIncomingMessage>
}

declare namespace EmailIncomingMessage {
  /** The fields of `EmailIncomingMessage` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Id of the Email Incoming Message */
    id?: number | null

    /** Id of the Inbox associated with this message */
    inbox_id?: number | null

    /** Sender of the email */
    sender?: string | null

    /** Sender name */
    sender_name?: string | null

    /** Status of the message */
    status?: 'success' | 'partial_failure' | 'failure' | 'skipped' | Files.OtherString | null

    /** Body of the email */
    body?: string | null

    /** Message describing the failure */
    message?: string | null

    /** Message creation date/time */
    created_at?: Files.DateTimeString | null

    /** Title of the Inbox associated with this message */
    inbox_title?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`,
     * `sender`, `status` or `inbox_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `inbox_id`, `sender` or `status`. Valid field combinations are `[ inbox_id, created_at ]`, `[ sender, created_at
     * ]`, `[ status, created_at ]`, `[ inbox_id, status ]`, `[ status, sender ]`, `[ inbox_id, status, created_at ]`,
     * `[ status, sender, created_at ]`, `[ inbox_id, status, sender ]` or `[ inbox_id, status, sender, created_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `sender`. */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default EmailIncomingMessage
