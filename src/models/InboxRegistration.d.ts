import Files from '../Files'

/** An InboxRegistration is created when a user fills out the form to access the inbox. */
declare class InboxRegistration {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: InboxRegistration.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: InboxRegistration.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Registration cookie code */
  readonly code?: string | null

  /** Registrant name */
  readonly name?: string | null

  /** Registrant company name */
  readonly company?: string | null

  /** Registrant email address */
  readonly email?: string | null

  /** Registrant IP Address */
  readonly ip?: string | null

  /** Clickwrap text that was shown to the registrant */
  readonly clickwrap_body?: string | null

  /** Id of associated form field set */
  readonly form_field_set_id?: number | null

  /** Data for form field set with form field ids as keys and user data as values */
  readonly form_field_data?: Files.JsonObject | null

  /** Id of associated inbox */
  readonly inbox_id?: number | null

  /** Id of associated inbox recipient */
  readonly inbox_recipient_id?: number | null

  /** Title of associated inbox */
  readonly inbox_title?: string | null

  /** Registration creation date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Registration cookie code */
  getCode(): string | null | undefined

  /** Registrant name */
  getName(): string | null | undefined

  /** Registrant company name */
  getCompany(): string | null | undefined

  /** Registrant email address */
  getEmail(): string | null | undefined

  /** Registrant IP Address */
  getIp(): string | null | undefined

  /** Clickwrap text that was shown to the registrant */
  getClickwrapBody(): string | null | undefined

  /** Id of associated form field set */
  getFormFieldSetId(): number | null | undefined

  /** Data for form field set with form field ids as keys and user data as values */
  getFormFieldData(): Files.JsonObject | null | undefined

  /** Id of associated inbox */
  getInboxId(): number | null | undefined

  /** Id of associated inbox recipient */
  getInboxRecipientId(): number | null | undefined

  /** Title of associated inbox */
  getInboxTitle(): string | null | undefined

  /** Registration creation date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Inbox Registrations */
  static list(params?: InboxRegistration.ListParams, options?: Files.RequestOptions): Promise<InboxRegistration[]>

  /** Alias of `list()`. */
  static all(params?: InboxRegistration.ListParams, options?: Files.RequestOptions): Promise<InboxRegistration[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: InboxRegistration.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<InboxRegistration>
}

declare namespace InboxRegistration {
  /** The fields of `InboxRegistration` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Registration cookie code */
    code?: string | null

    /** Registrant name */
    name?: string | null

    /** Registrant company name */
    company?: string | null

    /** Registrant email address */
    email?: string | null

    /** Registrant IP Address */
    ip?: string | null

    /** Clickwrap text that was shown to the registrant */
    clickwrap_body?: string | null

    /** Id of associated form field set */
    form_field_set_id?: number | null

    /** Data for form field set with form field ids as keys and user data as values */
    form_field_data?: Files.JsonObject | null

    /** Id of associated inbox */
    inbox_id?: number | null

    /** Id of associated inbox recipient */
    inbox_recipient_id?: number | null

    /** Title of associated inbox */
    inbox_title?: string | null

    /** Registration creation date/time */
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

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** ID of the associated Inbox. This is required if the user is not a site admin. */
    folder_behavior_id?: number
  }
}

export default InboxRegistration
