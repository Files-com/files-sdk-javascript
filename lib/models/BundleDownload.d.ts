import Files = require('../Files')
import BundleRegistration = require('./BundleRegistration')

/** A BundleDownload is a record of the download action that happened in the bundle. */
declare class BundleDownload {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BundleDownload.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BundleDownload.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  readonly bundle_registration?: BundleRegistration.Attributes | null

  /** Download method (file or full_zip) */
  readonly download_method?: 'file' | 'full_zip' | Files.OtherString | null

  /**
   * Download path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Download date/time */
  readonly created_at?: Files.DateTimeString | null

  getBundleRegistration(): BundleRegistration.Attributes | null | undefined

  /** Download method (file or full_zip) */
  getDownloadMethod(): 'file' | 'full_zip' | Files.OtherString | null | undefined

  /**
   * Download path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Download date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Share Link Downloads */
  static list(params?: BundleDownload.ListParams, options?: Files.RequestOptions): Promise<BundleDownload[]>

  /** Alias of `list()`. */
  static all(params?: BundleDownload.ListParams, options?: Files.RequestOptions): Promise<BundleDownload[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: BundleDownload.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<BundleDownload>

  static default: typeof BundleDownload
}

declare namespace BundleDownload {
  /** The fields of `BundleDownload` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    bundle_registration?: BundleRegistration.Attributes | null

    /** Download method (file or full_zip) */
    download_method?: 'file' | 'full_zip' | Files.OtherString | null

    /**
     * Download path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Download date/time */
    created_at?: Files.DateTimeString | null
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
     * and `created_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject

    /** Bundle ID */
    bundle_id?: number

    /** BundleRegistration ID */
    bundle_registration_id?: number
  }
}

export = BundleDownload
