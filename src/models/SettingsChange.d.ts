import Files from '../Files'

/** A SettingsChange is any change in your site caused by any user. */
declare class SettingsChange {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SettingsChange.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SettingsChange.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The API key id responsible for this change. */
  readonly api_key_id?: number | null

  /** Markdown-formatted change messages. */
  readonly changes?: string[] | null

  /** The time this change was made. */
  readonly created_at?: Files.DateTimeString | null

  /** The user id responsible for this change. */
  readonly user_id?: number | null

  /** true if this change was performed by Files.com support. */
  readonly user_is_files_support?: boolean | null

  /** true if this change was performed by a user on a parent site. */
  readonly user_is_from_parent_site?: boolean | null

  /** The username of the user responsible for this change. */
  readonly username?: string | null

  /** The API key id responsible for this change. */
  getApiKeyId(): number | null | undefined

  /** Markdown-formatted change messages. */
  getChanges(): string[] | null | undefined

  /** The time this change was made. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** The user id responsible for this change. */
  getUserId(): number | null | undefined

  /** true if this change was performed by Files.com support. */
  getUserIsFilesSupport(): boolean | null | undefined

  /** true if this change was performed by a user on a parent site. */
  getUserIsFromParentSite(): boolean | null | undefined

  /** The username of the user responsible for this change. */
  getUsername(): string | null | undefined

  /** List Settings Changes */
  static list(params?: SettingsChange.ListParams, options?: Files.RequestOptions): Promise<SettingsChange[]>

  /** Alias of `list()`. */
  static all(params?: SettingsChange.ListParams, options?: Files.RequestOptions): Promise<SettingsChange[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SettingsChange.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SettingsChange>
}

declare namespace SettingsChange {
  /** The fields of `SettingsChange` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The API key id responsible for this change. */
    api_key_id?: number | null

    /** Markdown-formatted change messages. */
    changes?: string[] | null

    /** The time this change was made. */
    created_at?: Files.DateTimeString | null

    /** The user id responsible for this change. */
    user_id?: number | null

    /** true if this change was performed by Files.com support. */
    user_is_files_support?: boolean | null

    /** true if this change was performed by a user on a parent site. */
    user_is_from_parent_site?: boolean | null

    /** The username of the user responsible for this change. */
    username?: string | null
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
     * `api_key_id` or `user_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `api_key_id`
     * and `user_id`.
     */
    filter?: Files.JsonObject
  }
}

export default SettingsChange
