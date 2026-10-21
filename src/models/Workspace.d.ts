import Files from '../Files'

/** A Workspace is a lightweight way to organize related resources inside a single Files.com Site. */
declare class Workspace {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Workspace.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Workspace.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Workspace ID */
  readonly id?: number | null

  /** Workspace name */
  readonly name?: string | null

  /** Workspace ID */
  getId(): number | null | undefined

  /** Workspace name */
  getName(): string | null | undefined

  /** Workspace ID */
  setId(value: number): void

  /** Workspace name */
  setName(value: string): void

  /** Update Workspace */
  update(params?: Workspace.UpdateParams): Promise<this>

  /** Delete Workspace */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Workspaces */
  static list(params?: Workspace.ListParams, options?: Files.RequestOptions): Promise<Workspace[]>

  /** Alias of `list()`. */
  static all(params?: Workspace.ListParams, options?: Files.RequestOptions): Promise<Workspace[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Workspace.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Workspace>

  /**
   * Show Workspace
   * @param id - Workspace ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Workspace>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Workspace>

  /** Create Workspace */
  static create(params?: Workspace.CreateParams, options?: Files.RequestOptions): Promise<Workspace>
}

declare namespace Workspace {
  /** The fields of `Workspace` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Workspace ID */
    id?: number | null

    /** Workspace name */
    name?: string | null
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`. */
    sort_by?: Files.JsonObject

    /** If set, return records where the specified field is equal to the supplied value. Valid fields are `name`. */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`. */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** Workspace name */
    name?: string
  }

  interface UpdateParams {
    /** Workspace name */
    name?: string
  }
}

export default Workspace
