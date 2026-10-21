import Files = require('../Files')

/** Snapshots allow you to create a read-only archive of files at a specific point in time. */
declare class Snapshot {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Snapshot.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Snapshot.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The snapshot's unique ID. */
  readonly id?: number | null

  /** When the snapshot expires. */
  readonly expires_at?: Files.DateTimeString | null

  /** When the snapshot was finalized. */
  readonly finalized_at?: Files.DateTimeString | null

  /** A name for the snapshot. */
  readonly name?: string | null

  /** The user that created this snapshot, if applicable. */
  readonly user_id?: number | null

  /** The bundle using this snapshot, if applicable. */
  readonly bundle_id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** An array of paths to add to the snapshot. */
  readonly paths?: string[]

  /** The snapshot's unique ID. */
  getId(): number | null | undefined

  /** When the snapshot expires. */
  getExpiresAt(): Files.DateTimeString | null | undefined

  /** When the snapshot was finalized. */
  getFinalizedAt(): Files.DateTimeString | null | undefined

  /** A name for the snapshot. */
  getName(): string | null | undefined

  /** The user that created this snapshot, if applicable. */
  getUserId(): number | null | undefined

  /** The bundle using this snapshot, if applicable. */
  getBundleId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** An array of paths to add to the snapshot. */
  getPaths(): string[] | undefined

  /** The snapshot's unique ID. */
  setId(value: number): void

  /** When the snapshot expires. */
  setExpiresAt(value: Files.DateTimeString): void

  /** When the snapshot was finalized. */
  setFinalizedAt(value: Files.DateTimeString): void

  /** A name for the snapshot. */
  setName(value: string): void

  /** The user that created this snapshot, if applicable. */
  setUserId(value: number): void

  /** The bundle using this snapshot, if applicable. */
  setBundleId(value: number): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** An array of paths to add to the snapshot. */
  setPaths(value: string[]): void

  /** Finalize Snapshot */
  finalize(params?: Files.NoParams): Promise<void>

  /** Update Snapshot */
  update(params?: Snapshot.UpdateParams): Promise<this>

  /** Delete Snapshot */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Snapshots */
  static list(params?: Snapshot.ListParams, options?: Files.RequestOptions): Promise<Snapshot[]>

  /** Alias of `list()`. */
  static all(params?: Snapshot.ListParams, options?: Files.RequestOptions): Promise<Snapshot[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Snapshot.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Snapshot>

  /**
   * Show Snapshot
   * @param id - Snapshot ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Snapshot>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Snapshot>

  /** Create Snapshot */
  static create(params?: Snapshot.CreateParams, options?: Files.RequestOptions): Promise<Snapshot>

  static default: typeof Snapshot
}

declare namespace Snapshot {
  /** The fields of `Snapshot` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The snapshot's unique ID. */
    id?: number | null

    /** When the snapshot expires. */
    expires_at?: Files.DateTimeString | null

    /** When the snapshot was finalized. */
    finalized_at?: Files.DateTimeString | null

    /** A name for the snapshot. */
    name?: string | null

    /** The user that created this snapshot, if applicable. */
    user_id?: number | null

    /** The bundle using this snapshot, if applicable. */
    bundle_id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** An array of paths to add to the snapshot. */
    paths?: string[]
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
  }

  interface CreateParams {
    /** When the snapshot expires. */
    expires_at?: Files.DateTimeString

    /** A name for the snapshot. */
    name?: string

    /** An array of paths to add to the snapshot. */
    paths?: string[]

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** When the snapshot expires. */
    expires_at?: Files.DateTimeString

    /** A name for the snapshot. */
    name?: string

    /** An array of paths to add to the snapshot. */
    paths?: string[]
  }
}

export = Snapshot
