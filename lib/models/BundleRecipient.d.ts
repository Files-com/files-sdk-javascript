import Files = require('../Files')

/** A BundleRecipient is a person who has had a bundle shared with them via email invite. */
declare class BundleRecipient {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BundleRecipient.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BundleRecipient.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The recipient's company. */
  readonly company?: string | null

  /** The recipient's name. */
  readonly name?: string | null

  /** A note sent to the recipient with the bundle. */
  readonly note?: string | null

  /** The recipient's email address. */
  readonly recipient?: string | null

  /** When the Bundle was shared with this recipient. */
  readonly sent_at?: Files.DateTimeString | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** Bundle to share. */
  readonly bundle_id?: number

  /** Set to true to share the link with the recipient upon creation. */
  readonly share_after_create?: boolean

  /** The recipient's company. */
  getCompany(): string | null | undefined

  /** The recipient's name. */
  getName(): string | null | undefined

  /** A note sent to the recipient with the bundle. */
  getNote(): string | null | undefined

  /** The recipient's email address. */
  getRecipient(): string | null | undefined

  /** When the Bundle was shared with this recipient. */
  getSentAt(): Files.DateTimeString | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** Bundle to share. */
  getBundleId(): number | undefined

  /** Set to true to share the link with the recipient upon creation. */
  getShareAfterCreate(): boolean | undefined

  /** The recipient's company. */
  setCompany(value: string): void

  /** The recipient's name. */
  setName(value: string): void

  /** A note sent to the recipient with the bundle. */
  setNote(value: string): void

  /** The recipient's email address. */
  setRecipient(value: string): void

  /** When the Bundle was shared with this recipient. */
  setSentAt(value: Files.DateTimeString): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /** Bundle to share. */
  setBundleId(value: number): void

  /** Set to true to share the link with the recipient upon creation. */
  setShareAfterCreate(value: boolean): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List Share Link Recipients */
  static list(params: BundleRecipient.ListParams, options?: Files.RequestOptions): Promise<BundleRecipient[]>

  /** Alias of `list()`. */
  static all(params: BundleRecipient.ListParams, options?: Files.RequestOptions): Promise<BundleRecipient[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params: BundleRecipient.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<BundleRecipient>

  /** Create Share Link Recipient */
  static create(params: BundleRecipient.CreateParams, options?: Files.RequestOptions): Promise<BundleRecipient>

  static default: typeof BundleRecipient
}

declare namespace BundleRecipient {
  /** The fields of `BundleRecipient` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The recipient's company. */
    company?: string | null

    /** The recipient's name. */
    name?: string | null

    /** A note sent to the recipient with the bundle. */
    note?: string | null

    /** The recipient's email address. */
    recipient?: string | null

    /** When the Bundle was shared with this recipient. */
    sent_at?: Files.DateTimeString | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Bundle to share. */
    bundle_id?: number

    /** Set to true to share the link with the recipient upon creation. */
    share_after_create?: boolean
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `has_registrations`.
     */
    filter?: Files.JsonObject

    /** List recipients for the bundle with this ID. */
    bundle_id: number
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Bundle to share. */
    bundle_id: number

    /** Email addresses to share this bundle with. */
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

export = BundleRecipient
