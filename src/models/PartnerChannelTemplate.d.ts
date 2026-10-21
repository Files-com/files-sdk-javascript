import Files from '../Files'

/** A PartnerChannelTemplate defines reusable Partner Channel configuration that can be applied to Partners. */
declare class PartnerChannelTemplate {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: PartnerChannelTemplate.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: PartnerChannelTemplate.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The unique ID of the Partner Channel Template. */
  readonly id?: number | null

  /** ID of the Workspace associated with this Partner Channel Template. */
  readonly workspace_id?: number | null

  /**
   * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner`
   * enables incoming uploads.
   */
  readonly direction?: 'two_way' | 'to_partner' | 'from_partner' | Files.OtherString | null

  /**
   * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder
   * name overrides must be blank when enabled, and the Template must remain one-way.
   */
  readonly use_channel_root?: boolean | null

  /** The name of the Partner Channel Template. */
  readonly name?: string | null

  /**
   * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Optional Channel-level to-Partner folder name override. */
  readonly to_partner_folder_name?: string | null

  /** Optional Channel-level from-Partner folder name override. */
  readonly from_partner_folder_name?: string | null

  /** Optional route path pattern for files uploaded by the Partner. Supports {{partner_name}}. */
  readonly from_partner_route_path_pattern?: string | null

  /** Optional route path pattern for files delivered to the Partner. Supports {{partner_name}}. */
  readonly to_partner_route_path_pattern?: string | null

  /** Managed folder paths inside the to-Partner folder. */
  readonly to_partner_managed_folder_paths?: string[] | null

  /** Managed folder paths inside the from-Partner folder. */
  readonly from_partner_managed_folder_paths?: string[] | null

  /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  readonly effective_to_partner_folder_name?: string | null

  /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  readonly effective_from_partner_folder_name?: string | null

  /** The unique ID of the Partner Channel Template. */
  getId(): number | null | undefined

  /** ID of the Workspace associated with this Partner Channel Template. */
  getWorkspaceId(): number | null | undefined

  /**
   * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner`
   * enables incoming uploads.
   */
  getDirection(): 'two_way' | 'to_partner' | 'from_partner' | Files.OtherString | null | undefined

  /**
   * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder
   * name overrides must be blank when enabled, and the Template must remain one-way.
   */
  getUseChannelRoot(): boolean | null | undefined

  /** The name of the Partner Channel Template. */
  getName(): string | null | undefined

  /**
   * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Optional Channel-level to-Partner folder name override. */
  getToPartnerFolderName(): string | null | undefined

  /** Optional Channel-level from-Partner folder name override. */
  getFromPartnerFolderName(): string | null | undefined

  /** Optional route path pattern for files uploaded by the Partner. Supports {{partner_name}}. */
  getFromPartnerRoutePathPattern(): string | null | undefined

  /** Optional route path pattern for files delivered to the Partner. Supports {{partner_name}}. */
  getToPartnerRoutePathPattern(): string | null | undefined

  /** Managed folder paths inside the to-Partner folder. */
  getToPartnerManagedFolderPaths(): string[] | null | undefined

  /** Managed folder paths inside the from-Partner folder. */
  getFromPartnerManagedFolderPaths(): string[] | null | undefined

  /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  getEffectiveToPartnerFolderName(): string | null | undefined

  /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  getEffectiveFromPartnerFolderName(): string | null | undefined

  /** The unique ID of the Partner Channel Template. */
  setId(value: number): void

  /** ID of the Workspace associated with this Partner Channel Template. */
  setWorkspaceId(value: number): void

  /**
   * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner`
   * enables incoming uploads.
   */
  setDirection(value: 'two_way' | 'to_partner' | 'from_partner'): void

  /**
   * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder
   * name overrides must be blank when enabled, and the Template must remain one-way.
   */
  setUseChannelRoot(value: boolean): void

  /** The name of the Partner Channel Template. */
  setName(value: string): void

  /**
   * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
   * with a slash. Maximum of 5000 characters.
   */
  setPath(value: string): void

  /** Optional Channel-level to-Partner folder name override. */
  setToPartnerFolderName(value: string): void

  /** Optional Channel-level from-Partner folder name override. */
  setFromPartnerFolderName(value: string): void

  /** Optional route path pattern for files uploaded by the Partner. Supports {{partner_name}}. */
  setFromPartnerRoutePathPattern(value: string): void

  /** Optional route path pattern for files delivered to the Partner. Supports {{partner_name}}. */
  setToPartnerRoutePathPattern(value: string): void

  /** Managed folder paths inside the to-Partner folder. */
  setToPartnerManagedFolderPaths(value: string[]): void

  /** Managed folder paths inside the from-Partner folder. */
  setFromPartnerManagedFolderPaths(value: string[]): void

  /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  setEffectiveToPartnerFolderName(value: string): void

  /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
  setEffectiveFromPartnerFolderName(value: string): void

  /** Update Partner Channel Template */
  update(params?: PartnerChannelTemplate.UpdateParams): Promise<this>

  /** Delete Partner Channel Template */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Partner Channel Templates */
  static list(params?: PartnerChannelTemplate.ListParams, options?: Files.RequestOptions): Promise<PartnerChannelTemplate[]>

  /** Alias of `list()`. */
  static all(params?: PartnerChannelTemplate.ListParams, options?: Files.RequestOptions): Promise<PartnerChannelTemplate[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: PartnerChannelTemplate.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<PartnerChannelTemplate>

  /**
   * Show Partner Channel Template
   * @param id - Partner Channel Template ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<PartnerChannelTemplate>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<PartnerChannelTemplate>

  /** Create Partner Channel Template */
  static create(params: PartnerChannelTemplate.CreateParams, options?: Files.RequestOptions): Promise<PartnerChannelTemplate>
}

declare namespace PartnerChannelTemplate {
  /** The fields of `PartnerChannelTemplate` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The unique ID of the Partner Channel Template. */
    id?: number | null

    /** ID of the Workspace associated with this Partner Channel Template. */
    workspace_id?: number | null

    /**
     * Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and
     * `from_partner` enables incoming uploads.
     */
    direction?: 'two_way' | 'to_partner' | 'from_partner' | Files.OtherString | null

    /**
     * Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation.
     * Folder name overrides must be blank when enabled, and the Template must remain one-way.
     */
    use_channel_root?: boolean | null

    /** The name of the Partner Channel Template. */
    name?: string | null

    /**
     * Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end
     * with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Optional Channel-level to-Partner folder name override. */
    to_partner_folder_name?: string | null

    /** Optional Channel-level from-Partner folder name override. */
    from_partner_folder_name?: string | null

    /** Optional route path pattern for files uploaded by the Partner. Supports {{partner_name}}. */
    from_partner_route_path_pattern?: string | null

    /** Optional route path pattern for files delivered to the Partner. Supports {{partner_name}}. */
    to_partner_route_path_pattern?: string | null

    /** Managed folder paths inside the to-Partner folder. */
    to_partner_managed_folder_paths?: string[] | null

    /** Managed folder paths inside the from-Partner folder. */
    from_partner_managed_folder_paths?: string[] | null

    /** Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
    effective_to_partner_folder_name?: string | null

    /** Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly. */
    effective_from_partner_folder_name?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
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
     * Folder name overrides must be blank when enabled, and the Template must remain one-way.
     */
    use_channel_root?: boolean

    /** Optional Channel-level from-Partner folder name override. */
    from_partner_folder_name?: string

    /** Managed folder paths inside the from-Partner folder. */
    from_partner_managed_folder_paths?: string[]

    /** Optional route path pattern for files uploaded by the Partner. Supports {{partner_name}}. */
    from_partner_route_path_pattern?: string

    /** Optional Channel-level to-Partner folder name override. */
    to_partner_folder_name?: string

    /** Managed folder paths inside the to-Partner folder. */
    to_partner_managed_folder_paths?: string[]

    /** Optional route path pattern for files delivered to the Partner. Supports {{partner_name}}. */
    to_partner_route_path_pattern?: string

    /** The name of the Partner Channel Template. */
    name: string

    /** Channel path relative to the Partner root folder. */
    path: string

    /** ID of the Workspace associated with this Partner Channel Template. */
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
     * Folder name overrides must be blank when enabled, and the Template must remain one-way.
     */
    use_channel_root?: boolean

    /** Optional Channel-level from-Partner folder name override. */
    from_partner_folder_name?: string

    /** Managed folder paths inside the from-Partner folder. */
    from_partner_managed_folder_paths?: string[]

    /** Optional route path pattern for files uploaded by the Partner. Supports {{partner_name}}. */
    from_partner_route_path_pattern?: string

    /** Optional Channel-level to-Partner folder name override. */
    to_partner_folder_name?: string

    /** Managed folder paths inside the to-Partner folder. */
    to_partner_managed_folder_paths?: string[]

    /** Optional route path pattern for files delivered to the Partner. Supports {{partner_name}}. */
    to_partner_route_path_pattern?: string

    /** The name of the Partner Channel Template. */
    name?: string

    /** Channel path relative to the Partner root folder. */
    path?: string
  }
}

export default PartnerChannelTemplate
