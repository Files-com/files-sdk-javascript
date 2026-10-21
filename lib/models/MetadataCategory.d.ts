import Files = require('../Files')

/**
 * A MetadataCategory defines a reusable set of Custom Metadata rules that can be assigned to folders via a folder
 * behavior.
 */
declare class MetadataCategory {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: MetadataCategory.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: MetadataCategory.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Metadata Category ID */
  readonly id?: number | null

  /** Name of the metadata category. */
  readonly name?: string | null

  /** Map of key names to arrays of allowed values. An empty array means free-form text. */
  readonly definitions?: { [key: string]: string[] } | null

  /** Metadata keys that should appear as columns in the UI by default. */
  readonly default_columns?: string[] | null

  /** Metadata Category ID */
  getId(): number | null | undefined

  /** Name of the metadata category. */
  getName(): string | null | undefined

  /** Map of key names to arrays of allowed values. An empty array means free-form text. */
  getDefinitions(): { [key: string]: string[] } | null | undefined

  /** Metadata keys that should appear as columns in the UI by default. */
  getDefaultColumns(): string[] | null | undefined

  /** Metadata Category ID */
  setId(value: number): void

  /** Name of the metadata category. */
  setName(value: string): void

  /** Map of key names to arrays of allowed values. An empty array means free-form text. */
  setDefinitions(value: { [key: string]: string[] }): void

  /** Metadata keys that should appear as columns in the UI by default. */
  setDefaultColumns(value: string[]): void

  /** Update Metadata Category */
  update(params?: MetadataCategory.UpdateParams): Promise<this>

  /** Delete Metadata Category */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Metadata Categories */
  static list(params?: MetadataCategory.ListParams, options?: Files.RequestOptions): Promise<MetadataCategory[]>

  /** Alias of `list()`. */
  static all(params?: MetadataCategory.ListParams, options?: Files.RequestOptions): Promise<MetadataCategory[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: MetadataCategory.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<MetadataCategory>

  /**
   * Show Metadata Category
   * @param id - Metadata Category ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<MetadataCategory>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<MetadataCategory>

  /**
   * List Metadata Categories by Path
   * @param path - Path to operate on.
   */
  static listFor(path: string, params?: MetadataCategory.ListForParams, options?: Files.RequestOptions): Promise<MetadataCategory[]>

  /**
   * The models `listFor()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForIterator(path: string, params?: MetadataCategory.ListForParams, options?: Files.RequestOptions): AsyncIterableIterator<MetadataCategory>

  /** Create Metadata Category */
  static create(params: MetadataCategory.CreateParams, options?: Files.RequestOptions): Promise<MetadataCategory>

  static default: typeof MetadataCategory
}

declare namespace MetadataCategory {
  /** The fields of `MetadataCategory` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Metadata Category ID */
    id?: number | null

    /** Name of the metadata category. */
    name?: string | null

    /** Map of key names to arrays of allowed values. An empty array means free-form text. */
    definitions?: { [key: string]: string[] } | null

    /** Metadata keys that should appear as columns in the UI by default. */
    default_columns?: string[] | null
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

  interface ListForParams {
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

  interface CreateParams {
    /** Name of the metadata category. */
    name: string

    /** Metadata keys that should appear as columns in the UI by default. */
    default_columns?: string[]
  }

  interface UpdateParams {
    /** Name of the metadata category. */
    name?: string

    /** Metadata keys that should appear as columns in the UI by default. */
    default_columns?: string[]
  }
}

export = MetadataCategory
