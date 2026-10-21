import Files = require('../Files')

/** A BundleRegistration is a registration record when a user fills out the form to access the bundle. */
declare class BundleRegistration {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BundleRegistration.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BundleRegistration.Attributes & Files.UnknownFields

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

  /** InboxRegistration cookie code, if there is an associated InboxRegistration */
  readonly inbox_code?: string | null

  /** Clickwrap text that was shown to the registrant */
  readonly clickwrap_body?: string | null

  /** Id of associated form field set */
  readonly form_field_set_id?: number | null

  /** Data for form field set with form field ids as keys and user data as values */
  readonly form_field_data?: Files.JsonObject | null

  /** Bundle URL code */
  readonly bundle_code?: string | null

  /** Id of associated bundle */
  readonly bundle_id?: number | null

  /** Id of associated bundle recipient */
  readonly bundle_recipient_id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

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

  /** InboxRegistration cookie code, if there is an associated InboxRegistration */
  getInboxCode(): string | null | undefined

  /** Clickwrap text that was shown to the registrant */
  getClickwrapBody(): string | null | undefined

  /** Id of associated form field set */
  getFormFieldSetId(): number | null | undefined

  /** Data for form field set with form field ids as keys and user data as values */
  getFormFieldData(): Files.JsonObject | null | undefined

  /** Bundle URL code */
  getBundleCode(): string | null | undefined

  /** Id of associated bundle */
  getBundleId(): number | null | undefined

  /** Id of associated bundle recipient */
  getBundleRecipientId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Registration creation date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Share Link Registrations */
  static list(params?: BundleRegistration.ListParams, options?: Files.RequestOptions): Promise<BundleRegistration[]>

  /** Alias of `list()`. */
  static all(params?: BundleRegistration.ListParams, options?: Files.RequestOptions): Promise<BundleRegistration[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: BundleRegistration.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<BundleRegistration>

  static default: typeof BundleRegistration
}

declare namespace BundleRegistration {
  /** The fields of `BundleRegistration` objects. Any of them can be missing, and those the API returns can be null. */
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

    /** InboxRegistration cookie code, if there is an associated InboxRegistration */
    inbox_code?: string | null

    /** Clickwrap text that was shown to the registrant */
    clickwrap_body?: string | null

    /** Id of associated form field set */
    form_field_set_id?: number | null

    /** Data for form field set with form field ids as keys and user data as values */
    form_field_data?: Files.JsonObject | null

    /** Bundle URL code */
    bundle_code?: string | null

    /** Id of associated bundle */
    bundle_id?: number | null

    /** Id of associated bundle recipient */
    bundle_recipient_id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Registration creation date/time */
    created_at?: Files.DateTimeString | null
  }

  interface ListParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

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
     * `bundle_id` or `created_at`.
     */
    sort_by?: Files.JsonObject

    /** ID of the associated Bundle */
    bundle_id?: number
  }
}

export = BundleRegistration
