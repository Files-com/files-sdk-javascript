import Files from '../Files'

/** A Desktop Configuration Profile centrally defines desktop mount point mappings for users in a Site or Workspace. */
declare class DesktopConfigurationProfile {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: DesktopConfigurationProfile.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: DesktopConfigurationProfile.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Desktop Configuration Profile ID */
  readonly id?: number | null

  /** Profile name */
  readonly name?: string | null

  /** Workspace ID */
  readonly workspace_id?: number | null

  /** Whether this profile applies to all users in the Workspace by default */
  readonly use_for_all_users?: boolean | null

  /**
   * Whether the desktop app should hide drive mounting, prevent new drive mounts, and unmount active drive mounts for
   * users with this profile
   */
  readonly disable_drive_mounting?: boolean | null

  /**
   * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B, or
   * C, and values are Files.com paths to mount there.
   */
  readonly mount_mappings?: DesktopConfigurationProfile.MountMappings | null

  /** Desktop Configuration Profile ID */
  getId(): number | null | undefined

  /** Profile name */
  getName(): string | null | undefined

  /** Workspace ID */
  getWorkspaceId(): number | null | undefined

  /** Whether this profile applies to all users in the Workspace by default */
  getUseForAllUsers(): boolean | null | undefined

  /**
   * Whether the desktop app should hide drive mounting, prevent new drive mounts, and unmount active drive mounts for
   * users with this profile
   */
  getDisableDriveMounting(): boolean | null | undefined

  /**
   * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B, or
   * C, and values are Files.com paths to mount there.
   */
  getMountMappings(): DesktopConfigurationProfile.MountMappings | null | undefined

  /** Desktop Configuration Profile ID */
  setId(value: number): void

  /** Profile name */
  setName(value: string): void

  /** Workspace ID */
  setWorkspaceId(value: number): void

  /** Whether this profile applies to all users in the Workspace by default */
  setUseForAllUsers(value: boolean): void

  /**
   * Whether the desktop app should hide drive mounting, prevent new drive mounts, and unmount active drive mounts for
   * users with this profile
   */
  setDisableDriveMounting(value: boolean): void

  /**
   * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B, or
   * C, and values are Files.com paths to mount there.
   */
  setMountMappings(value: DesktopConfigurationProfile.MountMappings): void

  /** Update Desktop Configuration Profile */
  update(params?: DesktopConfigurationProfile.UpdateParams): Promise<this>

  /** Delete Desktop Configuration Profile */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Desktop Configuration Profiles */
  static list(params?: DesktopConfigurationProfile.ListParams, options?: Files.RequestOptions): Promise<DesktopConfigurationProfile[]>

  /** Alias of `list()`. */
  static all(params?: DesktopConfigurationProfile.ListParams, options?: Files.RequestOptions): Promise<DesktopConfigurationProfile[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: DesktopConfigurationProfile.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<DesktopConfigurationProfile>

  /**
   * Show Desktop Configuration Profile
   * @param id - Desktop Configuration Profile ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<DesktopConfigurationProfile>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<DesktopConfigurationProfile>

  /** Create Desktop Configuration Profile */
  static create(params: DesktopConfigurationProfile.CreateParams, options?: Files.RequestOptions): Promise<DesktopConfigurationProfile>
}

declare namespace DesktopConfigurationProfile {
  /** The fields of `DesktopConfigurationProfile` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Desktop Configuration Profile ID */
    id?: number | null

    /** Profile name */
    name?: string | null

    /** Workspace ID */
    workspace_id?: number | null

    /** Whether this profile applies to all users in the Workspace by default */
    use_for_all_users?: boolean | null

    /**
     * Whether the desktop app should hide drive mounting, prevent new drive mounts, and unmount active drive mounts for
     * users with this profile
     */
    disable_drive_mounting?: boolean | null

    /**
     * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B,
     * or C, and values are Files.com paths to mount there.
     */
    mount_mappings?: DesktopConfigurationProfile.MountMappings | null
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
    /** Profile name */
    name: string

    /**
     * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B,
     * or C, and values are Files.com paths to mount there.
     */
    mount_mappings: DesktopConfigurationProfile.MountMappings

    /** Workspace ID */
    workspace_id?: number

    /** Whether this profile applies to all users in the Workspace by default */
    use_for_all_users?: boolean

    /**
     * Whether the desktop app should hide drive mounting, prevent new drive mounts, and unmount active drive mounts for
     * users with this profile
     */
    disable_drive_mounting?: boolean
  }

  interface UpdateParams {
    /** Profile name */
    name?: string

    /** Workspace ID */
    workspace_id?: number

    /**
     * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B,
     * or C, and values are Files.com paths to mount there.
     */
    mount_mappings?: DesktopConfigurationProfile.MountMappings

    /** Whether this profile applies to all users in the Workspace by default */
    use_for_all_users?: boolean

    /**
     * Whether the desktop app should hide drive mounting, prevent new drive mounts, and unmount active drive mounts for
     * users with this profile
     */
    disable_drive_mounting?: boolean
  }

  /**
   * Mount point mappings for the desktop app. Keys must be a single uppercase Windows drive letter other than A, B, or
   * C, and values are Files.com paths to mount there. Empty mappings are allowed only when disable_drive_mounting is
   * true.
   */
  type MountMappings = {
    [key: string]: string
  }
}

export default DesktopConfigurationProfile
