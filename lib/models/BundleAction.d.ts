import Files = require('../Files')
import BundleRegistration = require('./BundleRegistration')

/** A BundleAction is an action performed on a bundle. */
declare class BundleAction {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: BundleAction.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: BundleAction.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Type of action */
  readonly action?: 'create' | 'read' | 'update' | 'destroy' | 'move' | 'copy' | 'registration' | Files.OtherString | null

  /** Object that contains bundle registration information */
  readonly bundle_registration?: BundleRegistration.Attributes | null

  /** Action occurrence date/time */
  readonly created_at?: Files.DateTimeString | null

  /** The destination path for this bundle action, if applicable */
  readonly destination?: string | null

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  readonly path?: string | null

  /** The source path for this bundle action, if applicable */
  readonly source?: string | null

  /** Identifier of the associated bundle registration */
  readonly bundle_registration_id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Name of the registrant who performed the action */
  readonly bundle_registration_name?: string | null

  /** Email of the registrant */
  readonly bundle_registration_email?: string | null

  /** IP address of the registrant */
  readonly bundle_registration_ip?: string | null

  /** Id of associated form field set */
  readonly form_field_set_id?: number | null

  /** Data for form field set with form field ids as keys and user data as values */
  readonly form_field_data?: Files.JsonObject | null

  /** Type of action */
  getAction(): 'create' | 'read' | 'update' | 'destroy' | 'move' | 'copy' | 'registration' | Files.OtherString | null | undefined

  /** Object that contains bundle registration information */
  getBundleRegistration(): BundleRegistration.Attributes | null | undefined

  /** Action occurrence date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** The destination path for this bundle action, if applicable */
  getDestination(): string | null | undefined

  /** Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters. */
  getPath(): string | null | undefined

  /** The source path for this bundle action, if applicable */
  getSource(): string | null | undefined

  /** Identifier of the associated bundle registration */
  getBundleRegistrationId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Name of the registrant who performed the action */
  getBundleRegistrationName(): string | null | undefined

  /** Email of the registrant */
  getBundleRegistrationEmail(): string | null | undefined

  /** IP address of the registrant */
  getBundleRegistrationIp(): string | null | undefined

  /** Id of associated form field set */
  getFormFieldSetId(): number | null | undefined

  /** Data for form field set with form field ids as keys and user data as values */
  getFormFieldData(): Files.JsonObject | null | undefined

  /** List Bundle Actions */
  static list(params?: BundleAction.ListParams, options?: Files.RequestOptions): Promise<BundleAction[]>

  /** Alias of `list()`. */
  static all(params?: BundleAction.ListParams, options?: Files.RequestOptions): Promise<BundleAction[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: BundleAction.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<BundleAction>

  static default: typeof BundleAction
}

declare namespace BundleAction {
  /** The fields of `BundleAction` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Type of action */
    action?: 'create' | 'read' | 'update' | 'destroy' | 'move' | 'copy' | 'registration' | Files.OtherString | null

    /** Object that contains bundle registration information */
    bundle_registration?: BundleRegistration.Attributes | null

    /** Action occurrence date/time */
    created_at?: Files.DateTimeString | null

    /** The destination path for this bundle action, if applicable */
    destination?: string | null

    /**
     * Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** The source path for this bundle action, if applicable */
    source?: string | null

    /** Identifier of the associated bundle registration */
    bundle_registration_id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Name of the registrant who performed the action */
    bundle_registration_name?: string | null

    /** Email of the registrant */
    bundle_registration_email?: string | null

    /** IP address of the registrant */
    bundle_registration_ip?: string | null

    /** Id of associated form field set */
    form_field_set_id?: number | null

    /** Data for form field set with form field ids as keys and user data as values */
    form_field_data?: Files.JsonObject | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `created_at` or `bundle_registration_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `bundle_id` or `bundle_registration_id`. Valid field combinations are `[ bundle_id, created_at ]`, `[
     * bundle_registration_id, created_at ]`, `[ bundle_id, bundle_registration_id ]` or `[ bundle_id,
     * bundle_registration_id, created_at ]`.
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

    /** Bundle Registration ID */
    bundle_registration_id?: number
  }
}

export = BundleAction
