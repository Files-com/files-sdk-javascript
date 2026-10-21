import Files = require('../Files')

/** An InboxRecipient is a person who has had an inbox shared with them via email invitation. */
declare class InboxRecipient {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: InboxRecipient.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: InboxRecipient.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The recipient's company. */
  readonly company?: string | null

  /** The recipient's name. */
  readonly name?: string | null

  /** A note sent to the recipient with the inbox. */
  readonly note?: string | null

  /** The recipient's email address. */
  readonly recipient?: string | null

  /** When the Inbox was shared with this recipient. */
  readonly sent_at?: Files.DateTimeString | null

  /** Inbox to share. */
  readonly inbox_id?: number

  /** Set to true to share the link with the recipient upon creation. */
  readonly share_after_create?: boolean

  /** The recipient's company. */
  getCompany(): string | null | undefined

  /** The recipient's name. */
  getName(): string | null | undefined

  /** A note sent to the recipient with the inbox. */
  getNote(): string | null | undefined

  /** The recipient's email address. */
  getRecipient(): string | null | undefined

  /** When the Inbox was shared with this recipient. */
  getSentAt(): Files.DateTimeString | null | undefined

  /** Inbox to share. */
  getInboxId(): number | undefined

  /** Set to true to share the link with the recipient upon creation. */
  getShareAfterCreate(): boolean | undefined

  /** The recipient's company. */
  setCompany(value: string): void

  /** The recipient's name. */
  setName(value: string): void

  /** A note sent to the recipient with the inbox. */
  setNote(value: string): void

  /** The recipient's email address. */
  setRecipient(value: string): void

  /** When the Inbox was shared with this recipient. */
  setSentAt(value: Files.DateTimeString): void

  /** Inbox to share. */
  setInboxId(value: number): void

  /** Set to true to share the link with the recipient upon creation. */
  setShareAfterCreate(value: boolean): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List Inbox Recipients */
  static list(params: InboxRecipient.ListParams, options?: Files.RequestOptions): Promise<InboxRecipient[]>

  /** Alias of `list()`. */
  static all(params: InboxRecipient.ListParams, options?: Files.RequestOptions): Promise<InboxRecipient[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params: InboxRecipient.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<InboxRecipient>

  /** Create Inbox Recipient */
  static create(params: InboxRecipient.CreateParams, options?: Files.RequestOptions): Promise<InboxRecipient>

  static default: typeof InboxRecipient
}

declare namespace InboxRecipient {
  /** The fields of `InboxRecipient` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The recipient's company. */
    company?: string | null

    /** The recipient's name. */
    name?: string | null

    /** A note sent to the recipient with the inbox. */
    note?: string | null

    /** The recipient's email address. */
    recipient?: string | null

    /** When the Inbox was shared with this recipient. */
    sent_at?: Files.DateTimeString | null

    /** Inbox to share. */
    inbox_id?: number

    /** Set to true to share the link with the recipient upon creation. */
    share_after_create?: boolean
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `has_registrations`.
     */
    filter?: Files.JsonObject

    /** List recipients for the inbox with this ID. */
    inbox_id: number
  }

  interface CreateParams {
    /** Inbox to share. */
    inbox_id: number

    /** Email address to share this inbox with. */
    recipient: string

    /** Name of recipient. */
    name?: string

    /** Company of recipient. */
    company?: string

    /** Note to include in email. */
    note?: string

    /** Set to true to share the link with the recipient upon creation. */
    share_after_create?: boolean
  }
}

export = InboxRecipient
