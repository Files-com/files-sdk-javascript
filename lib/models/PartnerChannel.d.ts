import Files = require('../Files')

/**
 * A PartnerChannel defines a structured communication path within a Partner root folder, including directional folder
 * names and partner-scoped routing configuration.
 */
declare class PartnerChannel {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PartnerChannel.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PartnerChannel.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The unique ID of the Partner Channel. */
  readonly id?: number | null

  /** ID of the Workspace associated with this Partner Channel. */
  readonly workspace_id?: number | null

  /**
   * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner`
   * enables incoming uploads.
   */
  readonly direction?: 'two_way' | 'to_partner' | 'from_partner' | Files.OtherString | null

  /**
   * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder
   * name overrides must be blank when enabled, and the Channel must remain one-way.
   */
  readonly use_channel_root?: boolean | null

  /** ID of the Partner this Channel belongs to. */
  readonly partner_id?: number | null

  /** ID of the Partner Channel Template that manages this Channel, if any. */
  readonly partner_channel_template_id?: number | null

  /**
   * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Optional Channel-level to-Partner folder name override. */
  readonly to_partner_folder_name?: string | null

  /** Optional Channel-level from-Partner folder name override. */
  readonly from_partner_folder_name?: string | null

  /** Optional route path for files uploaded by the Partner. */
  readonly from_partner_route_path?: string | null

  /** Optional route path for files delivered to the Partner. */
  readonly to_partner_route_path?: string | null

  /** Managed folder paths inside the to-Partner folder. */
  readonly to_partner_managed_folder_paths?: string[] | null

  /** Managed folder paths inside the from-Partner folder. */
  readonly from_partner_managed_folder_paths?: string[] | null

  /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  readonly effective_to_partner_folder_name?: string | null

  /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  readonly effective_from_partner_folder_name?: string | null

  /** Resolved Channel folder path. */
  readonly channel_path?: string | null

  /** Resolved to-Partner folder path. */
  readonly to_partner_folder_path?: string | null

  /** Resolved from-Partner folder path. */
  readonly from_partner_folder_path?: string | null

  /** The unique ID of the Partner Channel. */
  getId(): number | null | undefined

  /** ID of the Workspace associated with this Partner Channel. */
  getWorkspaceId(): number | null | undefined

  /**
   * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner`
   * enables incoming uploads.
   */
  getDirection(): 'two_way' | 'to_partner' | 'from_partner' | Files.OtherString | null | undefined

  /**
   * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder
   * name overrides must be blank when enabled, and the Channel must remain one-way.
   */
  getUseChannelRoot(): boolean | null | undefined

  /** ID of the Partner this Channel belongs to. */
  getPartnerId(): number | null | undefined

  /** ID of the Partner Channel Template that manages this Channel, if any. */
  getPartnerChannelTemplateId(): number | null | undefined

  /**
   * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Optional Channel-level to-Partner folder name override. */
  getToPartnerFolderName(): string | null | undefined

  /** Optional Channel-level from-Partner folder name override. */
  getFromPartnerFolderName(): string | null | undefined

  /** Optional route path for files uploaded by the Partner. */
  getFromPartnerRoutePath(): string | null | undefined

  /** Optional route path for files delivered to the Partner. */
  getToPartnerRoutePath(): string | null | undefined

  /** Managed folder paths inside the to-Partner folder. */
  getToPartnerManagedFolderPaths(): string[] | null | undefined

  /** Managed folder paths inside the from-Partner folder. */
  getFromPartnerManagedFolderPaths(): string[] | null | undefined

  /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  getEffectiveToPartnerFolderName(): string | null | undefined

  /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  getEffectiveFromPartnerFolderName(): string | null | undefined

  /** Resolved Channel folder path. */
  getChannelPath(): string | null | undefined

  /** Resolved to-Partner folder path. */
  getToPartnerFolderPath(): string | null | undefined

  /** Resolved from-Partner folder path. */
  getFromPartnerFolderPath(): string | null | undefined

  /** The unique ID of the Partner Channel. */
  setId(value: number): void

  /** ID of the Workspace associated with this Partner Channel. */
  setWorkspaceId(value: number): void

  /**
   * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner`
   * enables incoming uploads.
   */
  setDirection(value: 'two_way' | 'to_partner' | 'from_partner'): void

  /**
   * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder
   * name overrides must be blank when enabled, and the Channel must remain one-way.
   */
  setUseChannelRoot(value: boolean): void

  /** ID of the Partner this Channel belongs to. */
  setPartnerId(value: number): void

  /** ID of the Partner Channel Template that manages this Channel, if any. */
  setPartnerChannelTemplateId(value: number): void

  /**
   * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  setPath(value: string): void

  /** Optional Channel-level to-Partner folder name override. */
  setToPartnerFolderName(value: string): void

  /** Optional Channel-level from-Partner folder name override. */
  setFromPartnerFolderName(value: string): void

  /** Optional route path for files uploaded by the Partner. */
  setFromPartnerRoutePath(value: string): void

  /** Optional route path for files delivered to the Partner. */
  setToPartnerRoutePath(value: string): void

  /** Managed folder paths inside the to-Partner folder. */
  setToPartnerManagedFolderPaths(value: string[]): void

  /** Managed folder paths inside the from-Partner folder. */
  setFromPartnerManagedFolderPaths(value: string[]): void

  /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  setEffectiveToPartnerFolderName(value: string): void

  /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  setEffectiveFromPartnerFolderName(value: string): void

  /** Resolved Channel folder path. */
  setChannelPath(value: string): void

  /** Resolved to-Partner folder path. */
  setToPartnerFolderPath(value: string): void

  /** Resolved from-Partner folder path. */
  setFromPartnerFolderPath(value: string): void

  /** Update Partner Channel */
  update(params?: PartnerChannel.UpdateParams): Promise<this>

  /** Delete Partner Channel */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Partner Channels */
  static list(params?: PartnerChannel.ListParams, options?: Files.RequestOptions): Promise<PartnerChannel[]>

  /** Alias of `list()`. */
  static all(params?: PartnerChannel.ListParams, options?: Files.RequestOptions): Promise<PartnerChannel[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: PartnerChannel.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<PartnerChannel>

  /**
   * Show Partner Channel
   * @param id - Partner Channel ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<PartnerChannel>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<PartnerChannel>

  /** Create Partner Channel */
  static create(params: PartnerChannel.CreateParams, options?: Files.RequestOptions): Promise<PartnerChannel>

  static default: typeof PartnerChannel
}

declare namespace PartnerChannel {
  /** The fields of `PartnerChannel` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The unique ID of the Partner Channel. */
    id?: number | null

    /** ID of the Workspace associated with this Partner Channel. */
    workspace_id?: number | null

    /**
     * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and
     * `from_partner` enables incoming uploads.
     */
    direction?: 'two_way' | 'to_partner' | 'from_partner' | Files.OtherString | null

    /**
     * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation.
     * Folder name overrides must be blank when enabled, and the Channel must remain one-way.
     */
    use_channel_root?: boolean | null

    /** ID of the Partner this Channel belongs to. */
    partner_id?: number | null

    /** ID of the Partner Channel Template that manages this Channel, if any. */
    partner_channel_template_id?: number | null

    /**
     * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
     * with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Optional Channel-level to-Partner folder name override. */
    to_partner_folder_name?: string | null

    /** Optional Channel-level from-Partner folder name override. */
    from_partner_folder_name?: string | null

    /** Optional route path for files uploaded by the Partner. */
    from_partner_route_path?: string | null

    /** Optional route path for files delivered to the Partner. */
    to_partner_route_path?: string | null

    /** Managed folder paths inside the to-Partner folder. */
    to_partner_managed_folder_paths?: string[] | null

    /** Managed folder paths inside the from-Partner folder. */
    from_partner_managed_folder_paths?: string[] | null

    /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
    effective_to_partner_folder_name?: string | null

    /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
    effective_from_partner_folder_name?: string | null

    /** Resolved Channel folder path. */
    channel_path?: string | null

    /** Resolved to-Partner folder path. */
    to_partner_folder_path?: string | null

    /** Resolved from-Partner folder path. */
    from_partner_folder_path?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `path` or `partner_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `partner_id`
     * and `workspace_id`. Valid field combinations are `[ workspace_id, partner_id ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /**
     * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and
     * `from_partner` enables incoming uploads.
     */
    direction?: 'two_way' | 'to_partner' | 'from_partner'

    /**
     * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation.
     * Folder name overrides must be blank when enabled, and the Channel must remain one-way.
     */
    use_channel_root?: boolean

    /** Optional Channel-level from-Partner folder name override. */
    from_partner_folder_name?: string

    /** Managed folder paths inside the from-Partner folder. */
    from_partner_managed_folder_paths?: string[]

    /** Optional route path for files uploaded by the Partner. */
    from_partner_route_path?: string

    /** Optional Channel-level to-Partner folder name override. */
    to_partner_folder_name?: string

    /** Managed folder paths inside the to-Partner folder. */
    to_partner_managed_folder_paths?: string[]

    /** Optional route path for files delivered to the Partner. */
    to_partner_route_path?: string

    /** ID of the Partner this Channel belongs to. */
    partner_id: number

    /** Channel path relative to the Partner root folder. */
    path: string

    /** ID of the Workspace associated with this Partner Channel. */
    workspace_id?: number
  }

  interface UpdateParams {
    /**
     * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and
     * `from_partner` enables incoming uploads.
     */
    direction?: 'two_way' | 'to_partner' | 'from_partner'

    /**
     * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation.
     * Folder name overrides must be blank when enabled, and the Channel must remain one-way.
     */
    use_channel_root?: boolean

    /** Optional Channel-level from-Partner folder name override. */
    from_partner_folder_name?: string

    /** Managed folder paths inside the from-Partner folder. */
    from_partner_managed_folder_paths?: string[]

    /** Optional route path for files uploaded by the Partner. */
    from_partner_route_path?: string

    /** Optional Channel-level to-Partner folder name override. */
    to_partner_folder_name?: string

    /** Managed folder paths inside the to-Partner folder. */
    to_partner_managed_folder_paths?: string[]

    /** Optional route path for files delivered to the Partner. */
    to_partner_route_path?: string

    /** Channel path relative to the Partner root folder. */
    path?: string
  }
}

export = PartnerChannel
