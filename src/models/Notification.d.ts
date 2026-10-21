import Files from '../Files'

/** A Notification is our feature that sends E-Mails when specific actions occur in the folder. */
declare class Notification {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Notification.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Notification.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Notification ID */
  readonly id?: number | null

  /**
   * Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of
   * 5000 characters.
   */
  readonly path?: string | null

  /** ID of Group to receive notifications */
  readonly group_id?: number | null

  /** Group name, if a Group ID is set */
  readonly group_name?: string | null

  /** Group IDs when the notification requires multiple groups */
  readonly group_ids?: number[] | string | null

  /** Group names when the notification requires multiple groups */
  readonly group_names?: string[] | null

  /** If set, will only notify on actions made by a member of one of the specified groups */
  readonly triggering_group_ids?: number[] | null

  /** If set, will only notify on actions made one of the specified users */
  readonly triggering_user_ids?: number[] | null

  /** Notify when actions are performed by a share recipient? */
  readonly trigger_by_share_recipients?: boolean | null

  /**
   * If true, will send notifications about a user's own activity to that user. If false, only activity performed by
   * other users (or anonymous users) will be sent in notifications.
   */
  readonly notify_user_actions?: boolean | null

  /** Trigger on files copied to this path? */
  readonly notify_on_copy?: boolean | null

  /** Trigger on files deleted in this path? */
  readonly notify_on_delete?: boolean | null

  /** Trigger on files downloaded in this path? */
  readonly notify_on_download?: boolean | null

  /** Trigger on files moved to this path? */
  readonly notify_on_move?: boolean | null

  /** Trigger on files created/uploaded/updated/changed in this path? */
  readonly notify_on_upload?: boolean | null

  /** Apply notification recursively?  This will enable notifications for each subfolder. */
  readonly recursive?: boolean | null

  /** The time interval that notifications are aggregated to */
  readonly send_interval?: 'five_minutes' | 'fifteen_minutes' | 'hourly' | 'daily' | Files.OtherString | null

  /** Custom subject line to use for notification emails */
  readonly subject?: string | null

  /** Custom message to include in notification emails */
  readonly message?: string | null

  /** Array of filenames (possibly with wildcards) to scope trigger */
  readonly triggering_filenames?: string[] | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Is the user unsubscribed from this notification? */
  readonly unsubscribed?: boolean | null

  /** The reason that the user unsubscribed */
  readonly unsubscribed_reason?: 'none' | 'unsubscribe_link_clicked' | 'mail_bounced' | 'mail_marked_as_spam' | Files.OtherString | null

  /** Notification user ID */
  readonly user_id?: number | null

  /** Notification username */
  readonly username?: string | null

  /**
   * If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had
   * their email "hard bounce", which means that we are unable to send mail to this user's current email address.
   * Notifications will resume if the user changes their email address.
   */
  readonly suppressed_email?: boolean | null

  /** Notification ID */
  getId(): number | null | undefined

  /**
   * Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of
   * 5000 characters.
   */
  getPath(): string | null | undefined

  /** ID of Group to receive notifications */
  getGroupId(): number | null | undefined

  /** Group name, if a Group ID is set */
  getGroupName(): string | null | undefined

  /** Group IDs when the notification requires multiple groups */
  getGroupIds(): number[] | string | null | undefined

  /** Group names when the notification requires multiple groups */
  getGroupNames(): string[] | null | undefined

  /** If set, will only notify on actions made by a member of one of the specified groups */
  getTriggeringGroupIds(): number[] | null | undefined

  /** If set, will only notify on actions made one of the specified users */
  getTriggeringUserIds(): number[] | null | undefined

  /** Notify when actions are performed by a share recipient? */
  getTriggerByShareRecipients(): boolean | null | undefined

  /**
   * If true, will send notifications about a user's own activity to that user. If false, only activity performed by
   * other users (or anonymous users) will be sent in notifications.
   */
  getNotifyUserActions(): boolean | null | undefined

  /** Trigger on files copied to this path? */
  getNotifyOnCopy(): boolean | null | undefined

  /** Trigger on files deleted in this path? */
  getNotifyOnDelete(): boolean | null | undefined

  /** Trigger on files downloaded in this path? */
  getNotifyOnDownload(): boolean | null | undefined

  /** Trigger on files moved to this path? */
  getNotifyOnMove(): boolean | null | undefined

  /** Trigger on files created/uploaded/updated/changed in this path? */
  getNotifyOnUpload(): boolean | null | undefined

  /** Apply notification recursively?  This will enable notifications for each subfolder. */
  getRecursive(): boolean | null | undefined

  /** The time interval that notifications are aggregated to */
  getSendInterval(): 'five_minutes' | 'fifteen_minutes' | 'hourly' | 'daily' | Files.OtherString | null | undefined

  /** Custom subject line to use for notification emails */
  getSubject(): string | null | undefined

  /** Custom message to include in notification emails */
  getMessage(): string | null | undefined

  /** Array of filenames (possibly with wildcards) to scope trigger */
  getTriggeringFilenames(): string[] | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Is the user unsubscribed from this notification? */
  getUnsubscribed(): boolean | null | undefined

  /** The reason that the user unsubscribed */
  getUnsubscribedReason(): 'none' | 'unsubscribe_link_clicked' | 'mail_bounced' | 'mail_marked_as_spam' | Files.OtherString | null | undefined

  /** Notification user ID */
  getUserId(): number | null | undefined

  /** Notification username */
  getUsername(): string | null | undefined

  /**
   * If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had
   * their email "hard bounce", which means that we are unable to send mail to this user's current email address.
   * Notifications will resume if the user changes their email address.
   */
  getSuppressedEmail(): boolean | null | undefined

  /** Notification ID */
  setId(value: number): void

  /**
   * Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of
   * 5000 characters.
   */
  setPath(value: string): void

  /** ID of Group to receive notifications */
  setGroupId(value: number): void

  /** Group name, if a Group ID is set */
  setGroupName(value: string): void

  /** Group IDs when the notification requires multiple groups */
  setGroupIds(value: string): void

  /** Group names when the notification requires multiple groups */
  setGroupNames(value: string[]): void

  /** If set, will only notify on actions made by a member of one of the specified groups */
  setTriggeringGroupIds(value: number[]): void

  /** If set, will only notify on actions made one of the specified users */
  setTriggeringUserIds(value: number[]): void

  /** Notify when actions are performed by a share recipient? */
  setTriggerByShareRecipients(value: boolean): void

  /**
   * If true, will send notifications about a user's own activity to that user. If false, only activity performed by
   * other users (or anonymous users) will be sent in notifications.
   */
  setNotifyUserActions(value: boolean): void

  /** Trigger on files copied to this path? */
  setNotifyOnCopy(value: boolean): void

  /** Trigger on files deleted in this path? */
  setNotifyOnDelete(value: boolean): void

  /** Trigger on files downloaded in this path? */
  setNotifyOnDownload(value: boolean): void

  /** Trigger on files moved to this path? */
  setNotifyOnMove(value: boolean): void

  /** Trigger on files created/uploaded/updated/changed in this path? */
  setNotifyOnUpload(value: boolean): void

  /** Apply notification recursively?  This will enable notifications for each subfolder. */
  setRecursive(value: boolean): void

  /** The time interval that notifications are aggregated to */
  setSendInterval(value: string): void

  /** Custom subject line to use for notification emails */
  setSubject(value: string): void

  /** Custom message to include in notification emails */
  setMessage(value: string): void

  /** Array of filenames (possibly with wildcards) to scope trigger */
  setTriggeringFilenames(value: string[]): void

  /** Workspace ID. `0` means the default workspace. */
  setWorkspaceId(value: number): void

  /** Is the user unsubscribed from this notification? */
  setUnsubscribed(value: boolean): void

  /** The reason that the user unsubscribed */
  setUnsubscribedReason(value: 'none' | 'unsubscribe_link_clicked' | 'mail_bounced' | 'mail_marked_as_spam' | Files.OtherString): void

  /** Notification user ID */
  setUserId(value: number): void

  /** Notification username */
  setUsername(value: string): void

  /**
   * If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had
   * their email "hard bounce", which means that we are unable to send mail to this user's current email address.
   * Notifications will resume if the user changes their email address.
   */
  setSuppressedEmail(value: boolean): void

  /** Update Notification */
  update(params?: Notification.UpdateParams): Promise<this>

  /** Delete Notification */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Notifications */
  static list(params?: Notification.ListParams, options?: Files.RequestOptions): Promise<Notification[]>

  /** Alias of `list()`. */
  static all(params?: Notification.ListParams, options?: Files.RequestOptions): Promise<Notification[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Notification.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Notification>

  /**
   * Show Notification
   * @param id - Notification ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Notification>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Notification>

  /** Create Notification */
  static create(params?: Notification.CreateParams, options?: Files.RequestOptions): Promise<Notification>
}

declare namespace Notification {
  /** The fields of `Notification` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Notification ID */
    id?: number | null

    /**
     * Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum
     * of 5000 characters.
     */
    path?: string | null

    /** ID of Group to receive notifications */
    group_id?: number | null

    /** Group name, if a Group ID is set */
    group_name?: string | null

    /** Group IDs when the notification requires multiple groups */
    group_ids?: number[] | string | null

    /** Group names when the notification requires multiple groups */
    group_names?: string[] | null

    /** If set, will only notify on actions made by a member of one of the specified groups */
    triggering_group_ids?: number[] | null

    /** If set, will only notify on actions made one of the specified users */
    triggering_user_ids?: number[] | null

    /** Notify when actions are performed by a share recipient? */
    trigger_by_share_recipients?: boolean | null

    /**
     * If true, will send notifications about a user's own activity to that user. If false, only activity performed by
     * other users (or anonymous users) will be sent in notifications.
     */
    notify_user_actions?: boolean | null

    /** Trigger on files copied to this path? */
    notify_on_copy?: boolean | null

    /** Trigger on files deleted in this path? */
    notify_on_delete?: boolean | null

    /** Trigger on files downloaded in this path? */
    notify_on_download?: boolean | null

    /** Trigger on files moved to this path? */
    notify_on_move?: boolean | null

    /** Trigger on files created/uploaded/updated/changed in this path? */
    notify_on_upload?: boolean | null

    /** Apply notification recursively?  This will enable notifications for each subfolder. */
    recursive?: boolean | null

    /** The time interval that notifications are aggregated to */
    send_interval?: 'five_minutes' | 'fifteen_minutes' | 'hourly' | 'daily' | Files.OtherString | null

    /** Custom subject line to use for notification emails */
    subject?: string | null

    /** Custom message to include in notification emails */
    message?: string | null

    /** Array of filenames (possibly with wildcards) to scope trigger */
    triggering_filenames?: string[] | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Is the user unsubscribed from this notification? */
    unsubscribed?: boolean | null

    /** The reason that the user unsubscribed */
    unsubscribed_reason?: 'none' | 'unsubscribe_link_clicked' | 'mail_bounced' | 'mail_marked_as_spam' | Files.OtherString | null

    /** Notification user ID */
    user_id?: number | null

    /** Notification username */
    username?: string | null

    /**
     * If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or
     * had their email "hard bounce", which means that we are unable to send mail to this user's current email address.
     * Notifications will resume if the user changes their email address.
     */
    suppressed_email?: boolean | null
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
     * `path`, `user_id` or `group_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `path`,
     * `user_id`, `workspace_id` or `group_id`. Valid field combinations are `[ workspace_id, path ]`, `[ workspace_id,
     * user_id ]`, `[ workspace_id, group_id ]` or `[ workspace_id, user_id, path ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`. */
    filter_prefix?: Files.JsonObject

    /** Show notifications for this Path. */
    path?: string

    /**
     * If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if
     * `path` is not specified.
     */
    include_ancestors?: boolean

    group_id?: string
  }

  interface CreateParams {
    /** The id of the user to notify. Provide `user_id`, `username` or `group_id`. */
    user_id?: number

    /**
     * If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
     */
    notify_on_copy?: boolean

    /** Trigger on files deleted in this path? */
    notify_on_delete?: boolean

    /** Trigger on files downloaded in this path? */
    notify_on_download?: boolean

    /** Trigger on files moved to this path? */
    notify_on_move?: boolean

    /** Trigger on files created/uploaded/updated/changed in this path? */
    notify_on_upload?: boolean

    /** If `true` actions initiated by the user will still result in a notification */
    notify_user_actions?: boolean

    /** If `true`, enable notifications for each subfolder in this path */
    recursive?: boolean

    /**
     * The time interval that notifications are aggregated by. Can be `five_minutes`, `fifteen_minutes`, `hourly`, or
     * `daily`.
     */
    send_interval?: string

    /** Custom subject line to use for notification emails */
    subject?: string

    /** Custom message to include in notification emails */
    message?: string

    /** Array of filenames (possibly with wildcards) to scope trigger */
    triggering_filenames?: string[]

    /** If set, will only notify on actions made by a member of one of the specified groups */
    triggering_group_ids?: number[]

    /** If set, will only notify on actions made one of the specified users */
    triggering_user_ids?: number[]

    /** Notify when actions are performed by a share recipient? */
    trigger_by_share_recipients?: boolean

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number

    /** The ID of the group to notify.  Provide `user_id`, `username` or `group_id`. */
    group_id?: number

    /** Group IDs when the notification requires multiple groups. If sent as a string, it should be comma-delimited. */
    group_ids?: string

    /** Path */
    path?: string

    /** The username of the user to notify.  Provide `user_id`, `username` or `group_id`. */
    username?: string
  }

  interface UpdateParams {
    /**
     * If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
     */
    notify_on_copy?: boolean

    /** Trigger on files deleted in this path? */
    notify_on_delete?: boolean

    /** Trigger on files downloaded in this path? */
    notify_on_download?: boolean

    /** Trigger on files moved to this path? */
    notify_on_move?: boolean

    /** Trigger on files created/uploaded/updated/changed in this path? */
    notify_on_upload?: boolean

    /** If `true` actions initiated by the user will still result in a notification */
    notify_user_actions?: boolean

    /** If `true`, enable notifications for each subfolder in this path */
    recursive?: boolean

    /**
     * The time interval that notifications are aggregated by. Can be `five_minutes`, `fifteen_minutes`, `hourly`, or
     * `daily`.
     */
    send_interval?: string

    /** Custom subject line to use for notification emails */
    subject?: string

    /** Custom message to include in notification emails */
    message?: string

    /** Array of filenames (possibly with wildcards) to scope trigger */
    triggering_filenames?: string[]

    /** If set, will only notify on actions made by a member of one of the specified groups */
    triggering_group_ids?: number[]

    /** If set, will only notify on actions made one of the specified users */
    triggering_user_ids?: number[]

    /** Notify when actions are performed by a share recipient? */
    trigger_by_share_recipients?: boolean

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number
  }
}

export default Notification
