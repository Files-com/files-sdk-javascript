import Files = require('../Files')
import Attachment = require('../Attachment')
import BundlePath = require('./BundlePath')
import FormFieldSet = require('./FormFieldSet')
import Image = require('./Image')

/** A Bundle is the API/SDK term for the feature called Share Links in the web interface. */
declare class Bundle {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Bundle.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Bundle.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Bundle code.  This code forms the end part of the Public URL. */
  readonly code?: string | null

  /** Page link and button color */
  readonly color_left?: string | null

  /** Top bar link color */
  readonly color_link?: string | null

  /** Page link and button color */
  readonly color_text?: string | null

  /** Top bar background color */
  readonly color_top?: string | null

  /** Top bar text color */
  readonly color_top_text?: string | null

  /** Public URL of Share Link */
  readonly url?: string | null

  /** Public description */
  readonly description?: string | null

  /** Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply. */
  readonly expires_at?: Files.DateTimeString | null

  /** Is this bundle password protected? */
  readonly password_protected?: boolean | null

  /** Permissions that apply to Folders in this Share Link. */
  readonly permissions?: 'read' | 'write' | 'read_write' | 'full' | 'none' | 'preview_only' | Files.OtherString | null

  readonly preview_only?: boolean | null

  /** Show a registration page that captures the downloader's name and email address? */
  readonly require_registration?: boolean | null

  /**
   * Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
   */
  readonly require_share_recipient?: boolean | null

  /**
   * If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log
   * back in every time they visit the page.
   */
  readonly require_logout?: boolean | null

  /** Legal text that must be agreed to prior to accessing Bundle. */
  readonly clickwrap_body?: string | null

  /** Custom Form to use */
  readonly form_field_set?: FormFieldSet.Attributes | null

  /** BundleRegistrations can be saved without providing name? */
  readonly skip_name?: boolean | null

  /** BundleRegistrations can be saved without providing email? */
  readonly skip_email?: boolean | null

  /** Date when share will start to be accessible. If `nil` access granted right after create. */
  readonly start_access_on_date?: Files.DateTimeString | null

  /** BundleRegistrations can be saved without providing company? */
  readonly skip_company?: boolean | null

  /** Bundle ID */
  readonly id?: number | null

  /** If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this. */
  readonly bypasses_site_expiration_rules?: boolean | null

  /** Bundle created at date/time */
  readonly created_at?: Files.DateTimeString | null

  /** Indicates if the bundle has been deleted. */
  readonly deleted?: boolean | null

  /** Bundle deleted at date/time */
  readonly deleted_at?: Files.DateTimeString | null

  /**
   * Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing
   * anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless
   * absolutely required.
   */
  readonly dont_separate_submissions_by_folder?: boolean | null

  /**
   * Read-only expiration date/time, using the explicit expiration or the site-wide setting when applicable. Null when
   * the Share Link does not expire.
   */
  readonly effective_expires_at?: Files.DateTimeString | null

  /** Maximum number of times bundle can be accessed */
  readonly max_uses?: number | null

  /** Internal name for identifying this Share Link. */
  readonly internal_name?: string | null

  /** Bundle internal note */
  readonly note?: string | null

  /**
   * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime`
   * directives, and any custom form data.
   */
  readonly path_template?: string | null

  /** Timezone to use when rendering timestamps in path templates. */
  readonly path_template_time_zone?: string | null

  /** Send delivery receipt to the uploader. Note: For writable share only */
  readonly send_email_receipt_to_uploader?: boolean | null

  /** ID of the snapshot containing this bundle's contents. */
  readonly snapshot_id?: number | null

  /** Bundle creator user ID */
  readonly user_id?: number | null

  /** Bundle creator username */
  readonly username?: string | null

  /** Owning group ID. If set, members of this group can view, edit, and share this Share Link. */
  readonly group_id?: number | null

  /** ID of the clickwrap to use with this bundle. */
  readonly clickwrap_id?: number | null

  /** ID of the associated inbox, if available. */
  readonly inbox_id?: number | null

  /** Preview watermark image applied to all bundle items. */
  readonly watermark_attachment?: Image.Attributes | null

  /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
  readonly watermark_value?: Bundle.WatermarkValue | null

  /**
   * If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot
   * be enabled if the bundle has a password set.
   */
  readonly send_one_time_password_to_recipient_at_registration?: boolean | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Does this bundle have an associated inbox? */
  readonly has_inbox?: boolean | null

  /** Should folder uploads be prevented? */
  readonly dont_allow_folders_in_uploads?: boolean | null

  /**
   * Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination
   * subfolder name.
   */
  readonly requested_upload_slots?: Bundle.RequestedUploadSlots | null

  /** A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles. */
  readonly paths?: string[] | null

  /** A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles. */
  readonly bundlepaths?: BundlePath.Attributes[] | null

  /** Password for this bundle. */
  readonly password?: string

  /** Id of Form Field Set to use with this bundle */
  readonly form_field_set_id?: number

  /** If true, create a snapshot of this bundle's contents. */
  readonly create_snapshot?: boolean

  /** If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true. */
  readonly finalize_snapshot?: boolean

  /** Preview watermark image applied to all bundle items. */
  readonly watermark_attachment_file?: Attachment

  /** If true, will delete the file stored in watermark_attachment */
  readonly watermark_attachment_delete?: boolean

  /** Bundle code.  This code forms the end part of the Public URL. */
  getCode(): string | null | undefined

  /** Page link and button color */
  getColorLeft(): string | null | undefined

  /** Top bar link color */
  getColorLink(): string | null | undefined

  /** Page link and button color */
  getColorText(): string | null | undefined

  /** Top bar background color */
  getColorTop(): string | null | undefined

  /** Top bar text color */
  getColorTopText(): string | null | undefined

  /** Public URL of Share Link */
  getUrl(): string | null | undefined

  /** Public description */
  getDescription(): string | null | undefined

  /** Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply. */
  getExpiresAt(): Files.DateTimeString | null | undefined

  /** Is this bundle password protected? */
  getPasswordProtected(): boolean | null | undefined

  /** Permissions that apply to Folders in this Share Link. */
  getPermissions(): 'read' | 'write' | 'read_write' | 'full' | 'none' | 'preview_only' | Files.OtherString | null | undefined

  getPreviewOnly(): boolean | null | undefined

  /** Show a registration page that captures the downloader's name and email address? */
  getRequireRegistration(): boolean | null | undefined

  /**
   * Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
   */
  getRequireShareRecipient(): boolean | null | undefined

  /**
   * If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log
   * back in every time they visit the page.
   */
  getRequireLogout(): boolean | null | undefined

  /** Legal text that must be agreed to prior to accessing Bundle. */
  getClickwrapBody(): string | null | undefined

  /** Custom Form to use */
  getFormFieldSet(): FormFieldSet.Attributes | null | undefined

  /** BundleRegistrations can be saved without providing name? */
  getSkipName(): boolean | null | undefined

  /** BundleRegistrations can be saved without providing email? */
  getSkipEmail(): boolean | null | undefined

  /** Date when share will start to be accessible. If `nil` access granted right after create. */
  getStartAccessOnDate(): Files.DateTimeString | null | undefined

  /** BundleRegistrations can be saved without providing company? */
  getSkipCompany(): boolean | null | undefined

  /** Bundle ID */
  getId(): number | null | undefined

  /** If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this. */
  getBypassesSiteExpirationRules(): boolean | null | undefined

  /** Bundle created at date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Indicates if the bundle has been deleted. */
  getDeleted(): boolean | null | undefined

  /** Bundle deleted at date/time */
  getDeletedAt(): Files.DateTimeString | null | undefined

  /**
   * Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing
   * anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless
   * absolutely required.
   */
  getDontSeparateSubmissionsByFolder(): boolean | null | undefined

  /**
   * Read-only expiration date/time, using the explicit expiration or the site-wide setting when applicable. Null when
   * the Share Link does not expire.
   */
  getEffectiveExpiresAt(): Files.DateTimeString | null | undefined

  /** Maximum number of times bundle can be accessed */
  getMaxUses(): number | null | undefined

  /** Internal name for identifying this Share Link. */
  getInternalName(): string | null | undefined

  /** Bundle internal note */
  getNote(): string | null | undefined

  /**
   * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime`
   * directives, and any custom form data.
   */
  getPathTemplate(): string | null | undefined

  /** Timezone to use when rendering timestamps in path templates. */
  getPathTemplateTimeZone(): string | null | undefined

  /** Send delivery receipt to the uploader. Note: For writable share only */
  getSendEmailReceiptToUploader(): boolean | null | undefined

  /** ID of the snapshot containing this bundle's contents. */
  getSnapshotId(): number | null | undefined

  /** Bundle creator user ID */
  getUserId(): number | null | undefined

  /** Bundle creator username */
  getUsername(): string | null | undefined

  /** Owning group ID. If set, members of this group can view, edit, and share this Share Link. */
  getGroupId(): number | null | undefined

  /** ID of the clickwrap to use with this bundle. */
  getClickwrapId(): number | null | undefined

  /** ID of the associated inbox, if available. */
  getInboxId(): number | null | undefined

  /** Preview watermark image applied to all bundle items. */
  getWatermarkAttachment(): Image.Attributes | null | undefined

  /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
  getWatermarkValue(): Bundle.WatermarkValue | null | undefined

  /**
   * If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot
   * be enabled if the bundle has a password set.
   */
  getSendOneTimePasswordToRecipientAtRegistration(): boolean | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Does this bundle have an associated inbox? */
  getHasInbox(): boolean | null | undefined

  /** Should folder uploads be prevented? */
  getDontAllowFoldersInUploads(): boolean | null | undefined

  /**
   * Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination
   * subfolder name.
   */
  getRequestedUploadSlots(): Bundle.RequestedUploadSlots | null | undefined

  /** A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles. */
  getPaths(): string[] | null | undefined

  /** A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles. */
  getBundlepaths(): BundlePath.Attributes[] | null | undefined

  /** Password for this bundle. */
  getPassword(): string | undefined

  /** Id of Form Field Set to use with this bundle */
  getFormFieldSetId(): number | undefined

  /** If true, create a snapshot of this bundle's contents. */
  getCreateSnapshot(): boolean | undefined

  /** If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true. */
  getFinalizeSnapshot(): boolean | undefined

  /** Preview watermark image applied to all bundle items. */
  getWatermarkAttachmentFile(): Attachment | undefined

  /** If true, will delete the file stored in watermark_attachment */
  getWatermarkAttachmentDelete(): boolean | undefined

  /** Bundle code.  This code forms the end part of the Public URL. */
  setCode(value: string): void

  /** Page link and button color */
  setColorLeft(value: string): void

  /** Top bar link color */
  setColorLink(value: string): void

  /** Page link and button color */
  setColorText(value: string): void

  /** Top bar background color */
  setColorTop(value: string): void

  /** Top bar text color */
  setColorTopText(value: string): void

  /** Public URL of Share Link */
  setUrl(value: string): void

  /** Public description */
  setDescription(value: string): void

  /** Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply. */
  setExpiresAt(value: Files.DateTimeString): void

  /** Is this bundle password protected? */
  setPasswordProtected(value: boolean): void

  /** Permissions that apply to Folders in this Share Link. */
  setPermissions(value: 'read' | 'write' | 'read_write' | 'full' | 'none' | 'preview_only'): void

  setPreviewOnly(value: boolean): void

  /** Show a registration page that captures the downloader's name and email address? */
  setRequireRegistration(value: boolean): void

  /**
   * Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
   */
  setRequireShareRecipient(value: boolean): void

  /**
   * If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log
   * back in every time they visit the page.
   */
  setRequireLogout(value: boolean): void

  /** Legal text that must be agreed to prior to accessing Bundle. */
  setClickwrapBody(value: string): void

  /** Custom Form to use */
  setFormFieldSet(value: FormFieldSet.Attributes): void

  /** BundleRegistrations can be saved without providing name? */
  setSkipName(value: boolean): void

  /** BundleRegistrations can be saved without providing email? */
  setSkipEmail(value: boolean): void

  /** Date when share will start to be accessible. If `nil` access granted right after create. */
  setStartAccessOnDate(value: Files.DateTimeString): void

  /** BundleRegistrations can be saved without providing company? */
  setSkipCompany(value: boolean): void

  /** Bundle ID */
  setId(value: number): void

  /** If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this. */
  setBypassesSiteExpirationRules(value: boolean): void

  /** Indicates if the bundle has been deleted. */
  setDeleted(value: boolean): void

  /** Bundle deleted at date/time */
  setDeletedAt(value: Files.DateTimeString): void

  /**
   * Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing
   * anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless
   * absolutely required.
   */
  setDontSeparateSubmissionsByFolder(value: boolean): void

  /**
   * Read-only expiration date/time, using the explicit expiration or the site-wide setting when applicable. Null when
   * the Share Link does not expire.
   */
  setEffectiveExpiresAt(value: Files.DateTimeString): void

  /** Maximum number of times bundle can be accessed */
  setMaxUses(value: number): void

  /** Internal name for identifying this Share Link. */
  setInternalName(value: string): void

  /** Bundle internal note */
  setNote(value: string): void

  /**
   * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime`
   * directives, and any custom form data.
   */
  setPathTemplate(value: string): void

  /** Timezone to use when rendering timestamps in path templates. */
  setPathTemplateTimeZone(value: string): void

  /** Send delivery receipt to the uploader. Note: For writable share only */
  setSendEmailReceiptToUploader(value: boolean): void

  /** ID of the snapshot containing this bundle's contents. */
  setSnapshotId(value: number): void

  /** Bundle creator user ID */
  setUserId(value: number): void

  /** Bundle creator username */
  setUsername(value: string): void

  /** Owning group ID. If set, members of this group can view, edit, and share this Share Link. */
  setGroupId(value: number): void

  /** ID of the clickwrap to use with this bundle. */
  setClickwrapId(value: number): void

  /** ID of the associated inbox, if available. */
  setInboxId(value: number): void

  /** Preview watermark image applied to all bundle items. */
  setWatermarkAttachment(value: Image.Attributes): void

  /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
  setWatermarkValue(value: Bundle.WatermarkValue): void

  /**
   * If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot
   * be enabled if the bundle has a password set.
   */
  setSendOneTimePasswordToRecipientAtRegistration(value: boolean): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** Does this bundle have an associated inbox? */
  setHasInbox(value: boolean): void

  /** Should folder uploads be prevented? */
  setDontAllowFoldersInUploads(value: boolean): void

  /**
   * Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination
   * subfolder name.
   */
  setRequestedUploadSlots(value: Bundle.RequestedUploadSlots): void

  /** A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles. */
  setPaths(value: string[]): void

  /** A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles. */
  setBundlepaths(value: BundlePath.Attributes[]): void

  /** Password for this bundle. */
  setPassword(value: string): void

  /** Id of Form Field Set to use with this bundle */
  setFormFieldSetId(value: number): void

  /** If true, create a snapshot of this bundle's contents. */
  setCreateSnapshot(value: boolean): void

  /** If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true. */
  setFinalizeSnapshot(value: boolean): void

  /** Preview watermark image applied to all bundle items. */
  setWatermarkAttachmentFile(value: Attachment): void

  /** If true, will delete the file stored in watermark_attachment */
  setWatermarkAttachmentDelete(value: boolean): void

  /** Send email(s) with a link to bundle */
  share(params?: Bundle.ShareParams): Promise<void>

  /** Update Share Link */
  update(params?: Bundle.UpdateParams): Promise<this>

  /** Delete Share Link */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Share Links */
  static list(params?: Bundle.ListParams, options?: Files.RequestOptions): Promise<Bundle[]>

  /** Alias of `list()`. */
  static all(params?: Bundle.ListParams, options?: Files.RequestOptions): Promise<Bundle[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Bundle.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Bundle>

  /**
   * Show Share Link
   * @param id - Bundle ID.
   */
  static find(id: number, params?: Bundle.FindParams, options?: Files.RequestOptions): Promise<Bundle>

  /** Alias of `find()`. */
  static get(id: number, params?: Bundle.FindParams, options?: Files.RequestOptions): Promise<Bundle>

  /** Create Share Link */
  static create(params: Bundle.CreateParams, options?: Files.RequestOptions): Promise<Bundle>

  static default: typeof Bundle
}

declare namespace Bundle {
  /** The fields of `Bundle` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Bundle code.  This code forms the end part of the Public URL. */
    code?: string | null

    /** Page link and button color */
    color_left?: string | null

    /** Top bar link color */
    color_link?: string | null

    /** Page link and button color */
    color_text?: string | null

    /** Top bar background color */
    color_top?: string | null

    /** Top bar text color */
    color_top_text?: string | null

    /** Public URL of Share Link */
    url?: string | null

    /** Public description */
    description?: string | null

    /** Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply. */
    expires_at?: Files.DateTimeString | null

    /** Is this bundle password protected? */
    password_protected?: boolean | null

    /** Permissions that apply to Folders in this Share Link. */
    permissions?: 'read' | 'write' | 'read_write' | 'full' | 'none' | 'preview_only' | Files.OtherString | null

    preview_only?: boolean | null

    /** Show a registration page that captures the downloader's name and email address? */
    require_registration?: boolean | null

    /**
     * Only allow access to recipients who have explicitly received the share via an email sent through the Files.com
     * UI?
     */
    require_share_recipient?: boolean | null

    /**
     * If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and
     * log back in every time they visit the page.
     */
    require_logout?: boolean | null

    /** Legal text that must be agreed to prior to accessing Bundle. */
    clickwrap_body?: string | null

    /** Custom Form to use */
    form_field_set?: FormFieldSet.Attributes | null

    /** BundleRegistrations can be saved without providing name? */
    skip_name?: boolean | null

    /** BundleRegistrations can be saved without providing email? */
    skip_email?: boolean | null

    /** Date when share will start to be accessible. If `nil` access granted right after create. */
    start_access_on_date?: Files.DateTimeString | null

    /** BundleRegistrations can be saved without providing company? */
    skip_company?: boolean | null

    /** Bundle ID */
    id?: number | null

    /** If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this. */
    bypasses_site_expiration_rules?: boolean | null

    /** Bundle created at date/time */
    created_at?: Files.DateTimeString | null

    /** Indicates if the bundle has been deleted. */
    deleted?: boolean | null

    /** Bundle deleted at date/time */
    deleted_at?: Files.DateTimeString | null

    /**
     * Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing
     * anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option
     * unless absolutely required.
     */
    dont_separate_submissions_by_folder?: boolean | null

    /**
     * Read-only expiration date/time, using the explicit expiration or the site-wide setting when applicable. Null when
     * the Share Link does not expire.
     */
    effective_expires_at?: Files.DateTimeString | null

    /** Maximum number of times bundle can be accessed */
    max_uses?: number | null

    /** Internal name for identifying this Share Link. */
    internal_name?: string | null

    /** Bundle internal note */
    note?: string | null

    /**
     * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime`
     * directives, and any custom form data.
     */
    path_template?: string | null

    /** Timezone to use when rendering timestamps in path templates. */
    path_template_time_zone?: string | null

    /** Send delivery receipt to the uploader. Note: For writable share only */
    send_email_receipt_to_uploader?: boolean | null

    /** ID of the snapshot containing this bundle's contents. */
    snapshot_id?: number | null

    /** Bundle creator user ID */
    user_id?: number | null

    /** Bundle creator username */
    username?: string | null

    /** Owning group ID. If set, members of this group can view, edit, and share this Share Link. */
    group_id?: number | null

    /** ID of the clickwrap to use with this bundle. */
    clickwrap_id?: number | null

    /** ID of the associated inbox, if available. */
    inbox_id?: number | null

    /** Preview watermark image applied to all bundle items. */
    watermark_attachment?: Image.Attributes | null

    /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
    watermark_value?: Bundle.WatermarkValue | null

    /**
     * If true, require_share_recipient bundles will send a one-time password to the recipient when they register.
     * Cannot be enabled if the bundle has a password set.
     */
    send_one_time_password_to_recipient_at_registration?: boolean | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Does this bundle have an associated inbox? */
    has_inbox?: boolean | null

    /** Should folder uploads be prevented? */
    dont_allow_folders_in_uploads?: boolean | null

    /**
     * Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination
     * subfolder name.
     */
    requested_upload_slots?: Bundle.RequestedUploadSlots | null

    /** A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles. */
    paths?: string[] | null

    /** A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles. */
    bundlepaths?: BundlePath.Attributes[] | null

    /** Password for this bundle. */
    password?: string

    /** Id of Form Field Set to use with this bundle */
    form_field_set_id?: number

    /** If true, create a snapshot of this bundle's contents. */
    create_snapshot?: boolean

    /** If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true. */
    finalize_snapshot?: boolean

    /** Preview watermark image applied to all bundle items. */
    watermark_attachment_file?: Attachment

    /** If true, will delete the file stored in watermark_attachment */
    watermark_attachment_delete?: boolean
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `expires_at`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `expires_at`, `code`, `group_id`, `user_id` or `bypasses_site_expiration_rules`. Valid field combinations are `[
     * group_id, expires_at ]` and `[ user_id, expires_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at` and `expires_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at` and `expires_at`.
     */
    filter_gteq?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `code`. */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`
     * and `expires_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at` and `expires_at`.
     */
    filter_lteq?: Files.JsonObject

    /** If true, only list deleted Share Links. */
    deleted?: boolean
  }

  interface FindParams {
    /** If true, show a deleted Share Link. */
    deleted?: boolean
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /** A list of paths to include in this bundle. */
    paths: string[]

    /** Password for this bundle. */
    password?: string

    /** If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this. */
    bypasses_site_expiration_rules?: boolean

    /** Id of Form Field Set to use with this bundle */
    form_field_set_id?: number

    /** If true, create a snapshot of this bundle's contents. */
    create_snapshot?: boolean

    /**
     * Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing
     * anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option
     * unless absolutely required.
     */
    dont_separate_submissions_by_folder?: boolean

    /** Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply. */
    expires_at?: Files.DateTimeString

    /** If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true. */
    finalize_snapshot?: boolean

    /** Maximum number of times bundle can be accessed */
    max_uses?: number

    /** Owning group ID. If set, members of this group can view, edit, and share this Share Link. */
    group_id?: number

    /** Internal name for identifying this Share Link. */
    internal_name?: string

    /** Public description */
    description?: string

    /** Bundle internal note */
    note?: string

    /** Bundle code.  This code forms the end part of the Public URL. */
    code?: string

    /**
     * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime`
     * directives, and any custom form data.
     */
    path_template?: string

    /** Timezone to use when rendering timestamps in path templates. */
    path_template_time_zone?: string

    /** Permissions that apply to Folders in this Share Link. */
    permissions?: 'read' | 'write' | 'read_write' | 'full' | 'none' | 'preview_only'

    /** Show a registration page that captures the downloader's name and email address? */
    require_registration?: boolean

    /** ID of the clickwrap to use with this bundle. */
    clickwrap_id?: number

    /** ID of the associated inbox, if available. */
    inbox_id?: number

    /**
     * Only allow access to recipients who have explicitly received the share via an email sent through the Files.com
     * UI?
     */
    require_share_recipient?: boolean

    /**
     * If true, require_share_recipient bundles will send a one-time password to the recipient when they register.
     * Cannot be enabled if the bundle has a password set.
     */
    send_one_time_password_to_recipient_at_registration?: boolean

    /** Send delivery receipt to the uploader. Note: For writable share only */
    send_email_receipt_to_uploader?: boolean

    /** BundleRegistrations can be saved without providing email? */
    skip_email?: boolean

    /** BundleRegistrations can be saved without providing name? */
    skip_name?: boolean

    /** BundleRegistrations can be saved without providing company? */
    skip_company?: boolean

    /** Date when share will start to be accessible. If `nil` access granted right after create. */
    start_access_on_date?: Files.DateTimeString

    /** ID of the snapshot containing this bundle's contents. */
    snapshot_id?: number

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number

    /** Preview watermark image applied to all bundle items. */
    watermark_attachment_file?: Attachment

    /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
    watermark_value?: Bundle.WatermarkValue
  }

  interface ShareParams {
    /** A list of email addresses to share this bundle with. Required unless `recipients` is used. */
    to?: string[]

    /** Note to include in email. */
    note?: string

    /** A list of recipients to share this bundle with. Required unless `to` is used. */
    recipients?: Files.JsonObject[]
  }

  interface UpdateParams {
    /** A list of paths to include in this bundle. */
    paths?: string[]

    /** Password for this bundle. */
    password?: string

    /** If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this. */
    bypasses_site_expiration_rules?: boolean

    /** Id of Form Field Set to use with this bundle */
    form_field_set_id?: number

    /** ID of the clickwrap to use with this bundle. */
    clickwrap_id?: number

    /** Bundle code.  This code forms the end part of the Public URL. */
    code?: string

    /** If true, create a snapshot of this bundle's contents. */
    create_snapshot?: boolean

    /** Public description */
    description?: string

    /**
     * Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing
     * anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option
     * unless absolutely required.
     */
    dont_separate_submissions_by_folder?: boolean

    /** Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply. */
    expires_at?: Files.DateTimeString

    /** If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true. */
    finalize_snapshot?: boolean

    /** ID of the associated inbox, if available. */
    inbox_id?: number

    /** Maximum number of times bundle can be accessed */
    max_uses?: number

    /** Owning group ID. If set, members of this group can view, edit, and share this Share Link. */
    group_id?: number

    /** Internal name for identifying this Share Link. */
    internal_name?: string

    /** Bundle internal note */
    note?: string

    /**
     * Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime`
     * directives, and any custom form data.
     */
    path_template?: string

    /** Timezone to use when rendering timestamps in path templates. */
    path_template_time_zone?: string

    /** Permissions that apply to Folders in this Share Link. */
    permissions?: 'read' | 'write' | 'read_write' | 'full' | 'none' | 'preview_only'

    /** Show a registration page that captures the downloader's name and email address? */
    require_registration?: boolean

    /**
     * Only allow access to recipients who have explicitly received the share via an email sent through the Files.com
     * UI?
     */
    require_share_recipient?: boolean

    /**
     * If true, require_share_recipient bundles will send a one-time password to the recipient when they register.
     * Cannot be enabled if the bundle has a password set.
     */
    send_one_time_password_to_recipient_at_registration?: boolean

    /** Send delivery receipt to the uploader. Note: For writable share only */
    send_email_receipt_to_uploader?: boolean

    /** BundleRegistrations can be saved without providing company? */
    skip_company?: boolean

    /** Date when share will start to be accessible. If `nil` access granted right after create. */
    start_access_on_date?: Files.DateTimeString

    /** BundleRegistrations can be saved without providing email? */
    skip_email?: boolean

    /** BundleRegistrations can be saved without providing name? */
    skip_name?: boolean

    /** The owning user id. Only site admins can set this. */
    user_id?: number

    /** If true, will delete the file stored in watermark_attachment */
    watermark_attachment_delete?: boolean

    /** Preview watermark image applied to all bundle items. */
    watermark_attachment_file?: Attachment

    /** Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value */
    watermark_value?: Bundle.WatermarkValue

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }

  /** Share Link watermark settings */
  interface WatermarkValue {
    /**
     * Where to locate the watermark? Valid values: `Center`, `East`, `NorthEast`, `North`, `NorthWest`, `SouthEast`,
     * `South`, `SouthWest`, `West`.
     */
    gravity?: 'Center' | 'East' | 'NorthEast' | 'North' | 'NorthWest' | 'SouthEast' | 'South' | 'SouthWest' | 'West'

    /** Max width/height as percent of image preview. */
    max_height_or_width?: number

    /** Percentage applied to the watermark. */
    transparency?: number

    /** Watermark text. Use {{user}} to embed a username into the string. */
    dynamic_text?: string
  }

  /**
   * Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination
   * subfolder name.
   */
  type RequestedUploadSlots = Array<{
    /**
     * Upload slot label and destination subfolder name. Must be a valid single folder name without trailing whitespace,
     * and unique regardless of letter case or accents.
     */
    name: string
  }>
}

export = Bundle
