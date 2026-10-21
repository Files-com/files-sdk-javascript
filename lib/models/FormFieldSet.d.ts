import Files = require('../Files')
import FormField = require('./FormField')

/** A Form Field Set is a custom form to be used for bundle and inbox registrations. */
declare class FormFieldSet {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FormFieldSet.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FormFieldSet.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Form field set id */
  readonly id?: number | null

  /** Title to be displayed */
  readonly title?: string | null

  /**
   * Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
   */
  readonly require_complete_metadata_capture?: boolean | null

  /** Layout of the form */
  readonly form_layout?: number[] | null

  /**
   * Associated form field definitions; authenticated form field set responses include historical definitions, while
   * form_layout identifies current fields
   */
  readonly form_fields?: FormField.Attributes[] | Files.JsonObject[] | null

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing name */
  readonly skip_name?: boolean | null

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing email */
  readonly skip_email?: boolean | null

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing company */
  readonly skip_company?: boolean | null

  /** Form Field Set is in use by an active Inbox / Bundle / Inbox Registration / Bundle Registration */
  readonly in_use?: boolean | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** Workspace ID */
  readonly workspace_id?: number

  /** Form field set id */
  getId(): number | null | undefined

  /** Title to be displayed */
  getTitle(): string | null | undefined

  /**
   * Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
   */
  getRequireCompleteMetadataCapture(): boolean | null | undefined

  /** Layout of the form */
  getFormLayout(): number[] | null | undefined

  /**
   * Associated form field definitions; authenticated form field set responses include historical definitions, while
   * form_layout identifies current fields
   */
  getFormFields(): FormField.Attributes[] | Files.JsonObject[] | null | undefined

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing name */
  getSkipName(): boolean | null | undefined

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing email */
  getSkipEmail(): boolean | null | undefined

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing company */
  getSkipCompany(): boolean | null | undefined

  /** Form Field Set is in use by an active Inbox / Bundle / Inbox Registration / Bundle Registration */
  getInUse(): boolean | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** Workspace ID */
  getWorkspaceId(): number | undefined

  /** Form field set id */
  setId(value: number): void

  /** Title to be displayed */
  setTitle(value: string): void

  /**
   * Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
   */
  setRequireCompleteMetadataCapture(value: boolean): void

  /** Layout of the form */
  setFormLayout(value: number[]): void

  /**
   * Associated form field definitions; authenticated form field set responses include historical definitions, while
   * form_layout identifies current fields
   */
  setFormFields(value: Files.JsonObject[]): void

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing name */
  setSkipName(value: boolean): void

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing email */
  setSkipEmail(value: boolean): void

  /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing company */
  setSkipCompany(value: boolean): void

  /** Form Field Set is in use by an active Inbox / Bundle / Inbox Registration / Bundle Registration */
  setInUse(value: boolean): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /** Workspace ID */
  setWorkspaceId(value: number): void

  /** Update Form Field Set */
  update(params?: FormFieldSet.UpdateParams): Promise<this>

  /** Delete Form Field Set */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Form Field Sets */
  static list(params?: FormFieldSet.ListParams, options?: Files.RequestOptions): Promise<FormFieldSet[]>

  /** Alias of `list()`. */
  static all(params?: FormFieldSet.ListParams, options?: Files.RequestOptions): Promise<FormFieldSet[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: FormFieldSet.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<FormFieldSet>

  /**
   * Show Form Field Set
   * @param id - Form Field Set ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<FormFieldSet>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<FormFieldSet>

  /** Create Form Field Set */
  static create(params?: FormFieldSet.CreateParams, options?: Files.RequestOptions): Promise<FormFieldSet>

  static default: typeof FormFieldSet
}

declare namespace FormFieldSet {
  /** The fields of `FormFieldSet` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Form field set id */
    id?: number | null

    /** Title to be displayed */
    title?: string | null

    /**
     * Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata
     * capture
     */
    require_complete_metadata_capture?: boolean | null

    /** Layout of the form */
    form_layout?: number[] | null

    /**
     * Associated form field definitions; authenticated form field set responses include historical definitions, while
     * form_layout identifies current fields
     */
    form_fields?: FormField.Attributes[] | Files.JsonObject[] | null

    /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing name */
    skip_name?: boolean | null

    /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing email */
    skip_email?: boolean | null

    /** Any associated InboxRegistrations or BundleRegistrations can be saved without providing company */
    skip_company?: boolean | null

    /** Form Field Set is in use by an active Inbox / Bundle / Inbox Registration / Bundle Registration */
    in_use?: boolean | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Workspace ID */
    workspace_id?: number
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
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** Title to be displayed */
    title?: string

    /**
     * Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata
     * capture
     */
    require_complete_metadata_capture?: boolean

    /** Workspace ID */
    workspace_id?: number

    /** Skip validating form email */
    skip_email?: boolean

    /** Skip validating form name */
    skip_name?: boolean

    /** Skip validating company */
    skip_company?: boolean

    /**
     * Each item's keys, as the API describes them:
     * - `id`: Id of existing Form Field
     * - `label`: Label of Field
     * - `field_type`: Type of field: text, text_area, dropdown, radio, or date
     * - `help_text`: Help text of field
     * - `required`: Is this a required field? (default true)
     * - `options_for_select`: List of options for dropdown or radio
     * - `default_option`: Default option to be preselected in the dropdown or radio.
     */
    form_fields?: Files.JsonObject[]
  }

  interface UpdateParams {
    /** Title to be displayed */
    title?: string

    /**
     * Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata
     * capture
     */
    require_complete_metadata_capture?: boolean

    /** Workspace ID */
    workspace_id?: number

    /** Skip validating form email */
    skip_email?: boolean

    /** Skip validating form name */
    skip_name?: boolean

    /** Skip validating company */
    skip_company?: boolean

    /**
     * Each item's keys, as the API describes them:
     * - `id`: Id of existing Form Field
     * - `label`: Label of Field
     * - `field_type`: Type of field: text, text_area, dropdown, radio, or date
     * - `help_text`: Help text of field
     * - `required`: Is this a required field? (default true)
     * - `options_for_select`: List of options for dropdown or radio
     * - `default_option`: Default option to be preselected in the dropdown or radio.
     */
    form_fields?: Files.JsonObject[]
  }
}

export = FormFieldSet
