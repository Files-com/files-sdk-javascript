import Files = require('../Files')

/**
 * A Clickwrap is a legal agreement (such as an NDA or Terms of Use) that your Users and/or Bundle/Inbox participants
 * will need to agree to via a "Clickwrap" UI before accessing the site, bundle, or inbox.
 */
declare class Clickwrap {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Clickwrap.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Clickwrap.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Clickwrap ID */
  readonly id?: number | null

  /** Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.) */
  readonly name?: string | null

  /** Body text of Clickwrap (supports Markdown formatting). */
  readonly body?: string | null

  /**
   * Use this Clickwrap for Users? Values: `none`, `require` (new user signup via email invitation only),
   * `require_all_users_once` (show to all users at their next web login; once accepted, not shown again),
   * `require_all_users_always` (show to all users on every web login).
   */
  readonly use_with_users?: 'none' | 'require' | 'require_all_users_once' | 'require_all_users_always' | Files.OtherString | null

  /** Use this Clickwrap for Bundles? */
  readonly use_with_bundles?: 'none' | 'available' | 'require' | 'available_to_all_users' | Files.OtherString | null

  /** Use this Clickwrap for Inboxes? */
  readonly use_with_inboxes?: 'none' | 'available' | 'require' | 'available_to_all_users' | Files.OtherString | null

  /** Clickwrap ID */
  getId(): number | null | undefined

  /** Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.) */
  getName(): string | null | undefined

  /** Body text of Clickwrap (supports Markdown formatting). */
  getBody(): string | null | undefined

  /**
   * Use this Clickwrap for Users? Values: `none`, `require` (new user signup via email invitation only),
   * `require_all_users_once` (show to all users at their next web login; once accepted, not shown again),
   * `require_all_users_always` (show to all users on every web login).
   */
  getUseWithUsers(): 'none' | 'require' | 'require_all_users_once' | 'require_all_users_always' | Files.OtherString | null | undefined

  /** Use this Clickwrap for Bundles? */
  getUseWithBundles(): 'none' | 'available' | 'require' | 'available_to_all_users' | Files.OtherString | null | undefined

  /** Use this Clickwrap for Inboxes? */
  getUseWithInboxes(): 'none' | 'available' | 'require' | 'available_to_all_users' | Files.OtherString | null | undefined

  /** Clickwrap ID */
  setId(value: number): void

  /** Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.) */
  setName(value: string): void

  /** Body text of Clickwrap (supports Markdown formatting). */
  setBody(value: string): void

  /**
   * Use this Clickwrap for Users? Values: `none`, `require` (new user signup via email invitation only),
   * `require_all_users_once` (show to all users at their next web login; once accepted, not shown again),
   * `require_all_users_always` (show to all users on every web login).
   */
  setUseWithUsers(value: 'none' | 'require' | 'require_all_users_once' | 'require_all_users_always'): void

  /** Use this Clickwrap for Bundles? */
  setUseWithBundles(value: 'none' | 'available' | 'require' | 'available_to_all_users'): void

  /** Use this Clickwrap for Inboxes? */
  setUseWithInboxes(value: 'none' | 'available' | 'require' | 'available_to_all_users'): void

  /** Update Clickwrap */
  update(params?: Clickwrap.UpdateParams): Promise<this>

  /** Delete Clickwrap */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Clickwraps */
  static list(params?: Clickwrap.ListParams, options?: Files.RequestOptions): Promise<Clickwrap[]>

  /** Alias of `list()`. */
  static all(params?: Clickwrap.ListParams, options?: Files.RequestOptions): Promise<Clickwrap[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Clickwrap.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Clickwrap>

  /**
   * Show Clickwrap
   * @param id - Clickwrap ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Clickwrap>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Clickwrap>

  /** Create Clickwrap */
  static create(params?: Clickwrap.CreateParams, options?: Files.RequestOptions): Promise<Clickwrap>

  static default: typeof Clickwrap
}

declare namespace Clickwrap {
  /** The fields of `Clickwrap` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Clickwrap ID */
    id?: number | null

    /** Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.) */
    name?: string | null

    /** Body text of Clickwrap (supports Markdown formatting). */
    body?: string | null

    /**
     * Use this Clickwrap for Users? Values: `none`, `require` (new user signup via email invitation only),
     * `require_all_users_once` (show to all users at their next web login; once accepted, not shown again),
     * `require_all_users_always` (show to all users on every web login).
     */
    use_with_users?: 'none' | 'require' | 'require_all_users_once' | 'require_all_users_always' | Files.OtherString | null

    /** Use this Clickwrap for Bundles? */
    use_with_bundles?: 'none' | 'available' | 'require' | 'available_to_all_users' | Files.OtherString | null

    /** Use this Clickwrap for Inboxes? */
    use_with_inboxes?: 'none' | 'available' | 'require' | 'available_to_all_users' | Files.OtherString | null
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
  }

  interface CreateParams {
    /** Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.) */
    name?: string

    /** Body text of Clickwrap (supports Markdown formatting). */
    body?: string

    /** Use this Clickwrap for Bundles? */
    use_with_bundles?: 'none' | 'available' | 'require' | 'available_to_all_users'

    /** Use this Clickwrap for Inboxes? */
    use_with_inboxes?: 'none' | 'available' | 'require' | 'available_to_all_users'

    /**
     * Use this Clickwrap for Users? Values: `none`, `require` (new user signup via email invitation only),
     * `require_all_users_once` (show to all users at their next web login; once accepted, not shown again),
     * `require_all_users_always` (show to all users on every web login).
     */
    use_with_users?: 'none' | 'require' | 'require_all_users_once' | 'require_all_users_always'
  }

  interface UpdateParams {
    /** Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.) */
    name?: string

    /** Body text of Clickwrap (supports Markdown formatting). */
    body?: string

    /** Use this Clickwrap for Bundles? */
    use_with_bundles?: 'none' | 'available' | 'require' | 'available_to_all_users'

    /** Use this Clickwrap for Inboxes? */
    use_with_inboxes?: 'none' | 'available' | 'require' | 'available_to_all_users'

    /**
     * Use this Clickwrap for Users? Values: `none`, `require` (new user signup via email invitation only),
     * `require_all_users_once` (show to all users at their next web login; once accepted, not shown again),
     * `require_all_users_always` (show to all users on every web login).
     */
    use_with_users?: 'none' | 'require' | 'require_all_users_once' | 'require_all_users_always'
  }
}

export = Clickwrap
