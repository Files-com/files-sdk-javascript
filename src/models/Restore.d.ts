import Files from '../Files'

/** A Restore kicks off a process to restore deleted data for your Site. */
declare class Restore {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Restore.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Restore.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /**
   * Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater
   * than 365 days prior to the restore request.
   */
  readonly earliest_date?: Files.DateTimeString | null

  /** Restore Record ID. */
  readonly id?: number | null

  /** Number of directories that were successfully restored. */
  readonly dirs_restored?: number | null

  /** Number of directories that were not able to be restored. */
  readonly dirs_errored?: number | null

  /** Total number of directories processed. */
  readonly dirs_total?: number | null

  /** Number of files successfully restored. */
  readonly files_restored?: number | null

  /** Number of files that were not able to be restored. */
  readonly files_errored?: number | null

  /** Total number of files processed. */
  readonly files_total?: number | null

  /**
   * Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash
   * selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not
   * use a leading slash. To restore all deleted items of the selected restoration type within the selected site or
   * workspace scope, specify an empty string (`''`) or omit the field.
   */
  readonly prefix?: string | null

  /**
   * Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and
   * associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace
   * period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are
   * included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
   */
  readonly restoration_type?: 'files' | 'users' | Files.OtherString | null

  /**
   * If true, we will restore the files in place (into their original paths). If false, we will create a new restoration
   * folder in the root and restore files there.
   */
  readonly restore_in_place?: boolean | null

  /**
   * If true, a user restore restores permissions deleted along with the selected users, including permissions removed
   * independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`,
   * remain deleted. An in-place file restore restores user and group permissions on returned folders and their
   * subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including
   * permissions removed independently within that window. File restores into a new folder do not restore permissions.
   */
  readonly restore_deleted_permissions?: boolean | null

  /** Number of users successfully restored (only present for `restoration_type=users`). */
  readonly users_restored?: number | null

  /** Number of users that failed to restore (only present for `restoration_type=users`). */
  readonly users_errored?: number | null

  /** Total number of users processed (only present for `restoration_type=users`). */
  readonly users_total?: number | null

  /** Number of API keys restored (only present for `restoration_type=users`). */
  readonly api_keys_restored?: number | null

  /** Number of public keys restored (only present for `restoration_type=users`). */
  readonly public_keys_restored?: number | null

  /** Number of two factor authentication methods restored (only present for `restoration_type=users`). */
  readonly two_factor_authentication_methods_restored?: number | null

  /** Status of the restoration process. */
  readonly status?: 'pending' | 'counting' | 'restoring' | 'complete' | 'validating' | Files.OtherString | null

  /**
   * If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger
   * File Expiration to delete the file again.
   */
  readonly update_timestamps?: boolean | null

  /** Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope. */
  readonly workspace_id?: number | null

  /** Error messages received while restoring files and/or directories. Only present if there were errors. */
  readonly error_messages?: string[] | null

  /**
   * Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater
   * than 365 days prior to the restore request.
   */
  getEarliestDate(): Files.DateTimeString | null | undefined

  /** Restore Record ID. */
  getId(): number | null | undefined

  /** Number of directories that were successfully restored. */
  getDirsRestored(): number | null | undefined

  /** Number of directories that were not able to be restored. */
  getDirsErrored(): number | null | undefined

  /** Total number of directories processed. */
  getDirsTotal(): number | null | undefined

  /** Number of files successfully restored. */
  getFilesRestored(): number | null | undefined

  /** Number of files that were not able to be restored. */
  getFilesErrored(): number | null | undefined

  /** Total number of files processed. */
  getFilesTotal(): number | null | undefined

  /**
   * Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash
   * selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not
   * use a leading slash. To restore all deleted items of the selected restoration type within the selected site or
   * workspace scope, specify an empty string (`''`) or omit the field.
   */
  getPrefix(): string | null | undefined

  /**
   * Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and
   * associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace
   * period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are
   * included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
   */
  getRestorationType(): 'files' | 'users' | Files.OtherString | null | undefined

  /**
   * If true, we will restore the files in place (into their original paths). If false, we will create a new restoration
   * folder in the root and restore files there.
   */
  getRestoreInPlace(): boolean | null | undefined

  /**
   * If true, a user restore restores permissions deleted along with the selected users, including permissions removed
   * independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`,
   * remain deleted. An in-place file restore restores user and group permissions on returned folders and their
   * subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including
   * permissions removed independently within that window. File restores into a new folder do not restore permissions.
   */
  getRestoreDeletedPermissions(): boolean | null | undefined

  /** Number of users successfully restored (only present for `restoration_type=users`). */
  getUsersRestored(): number | null | undefined

  /** Number of users that failed to restore (only present for `restoration_type=users`). */
  getUsersErrored(): number | null | undefined

  /** Total number of users processed (only present for `restoration_type=users`). */
  getUsersTotal(): number | null | undefined

  /** Number of API keys restored (only present for `restoration_type=users`). */
  getApiKeysRestored(): number | null | undefined

  /** Number of public keys restored (only present for `restoration_type=users`). */
  getPublicKeysRestored(): number | null | undefined

  /** Number of two factor authentication methods restored (only present for `restoration_type=users`). */
  getTwoFactorAuthenticationMethodsRestored(): number | null | undefined

  /** Status of the restoration process. */
  getStatus(): 'pending' | 'counting' | 'restoring' | 'complete' | 'validating' | Files.OtherString | null | undefined

  /**
   * If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger
   * File Expiration to delete the file again.
   */
  getUpdateTimestamps(): boolean | null | undefined

  /** Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope. */
  getWorkspaceId(): number | null | undefined

  /** Error messages received while restoring files and/or directories. Only present if there were errors. */
  getErrorMessages(): string[] | null | undefined

  /**
   * Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater
   * than 365 days prior to the restore request.
   */
  setEarliestDate(value: Files.DateTimeString): void

  /** Restore Record ID. */
  setId(value: number): void

  /** Number of directories that were successfully restored. */
  setDirsRestored(value: number): void

  /** Number of directories that were not able to be restored. */
  setDirsErrored(value: number): void

  /** Total number of directories processed. */
  setDirsTotal(value: number): void

  /** Number of files successfully restored. */
  setFilesRestored(value: number): void

  /** Number of files that were not able to be restored. */
  setFilesErrored(value: number): void

  /** Total number of files processed. */
  setFilesTotal(value: number): void

  /**
   * Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash
   * selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not
   * use a leading slash. To restore all deleted items of the selected restoration type within the selected site or
   * workspace scope, specify an empty string (`''`) or omit the field.
   */
  setPrefix(value: string): void

  /**
   * Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and
   * associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace
   * period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are
   * included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
   */
  setRestorationType(value: 'files' | 'users'): void

  /**
   * If true, we will restore the files in place (into their original paths). If false, we will create a new restoration
   * folder in the root and restore files there.
   */
  setRestoreInPlace(value: boolean): void

  /**
   * If true, a user restore restores permissions deleted along with the selected users, including permissions removed
   * independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`,
   * remain deleted. An in-place file restore restores user and group permissions on returned folders and their
   * subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including
   * permissions removed independently within that window. File restores into a new folder do not restore permissions.
   */
  setRestoreDeletedPermissions(value: boolean): void

  /** Number of users successfully restored (only present for `restoration_type=users`). */
  setUsersRestored(value: number): void

  /** Number of users that failed to restore (only present for `restoration_type=users`). */
  setUsersErrored(value: number): void

  /** Total number of users processed (only present for `restoration_type=users`). */
  setUsersTotal(value: number): void

  /** Number of API keys restored (only present for `restoration_type=users`). */
  setApiKeysRestored(value: number): void

  /** Number of public keys restored (only present for `restoration_type=users`). */
  setPublicKeysRestored(value: number): void

  /** Number of two factor authentication methods restored (only present for `restoration_type=users`). */
  setTwoFactorAuthenticationMethodsRestored(value: number): void

  /** Status of the restoration process. */
  setStatus(value: 'pending' | 'counting' | 'restoring' | 'complete' | 'validating' | Files.OtherString): void

  /**
   * If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger
   * File Expiration to delete the file again.
   */
  setUpdateTimestamps(value: boolean): void

  /** Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope. */
  setWorkspaceId(value: number): void

  /** Error messages received while restoring files and/or directories. Only present if there were errors. */
  setErrorMessages(value: string[]): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /** List Restores */
  static list(params?: Restore.ListParams, options?: Files.RequestOptions): Promise<Restore[]>

  /** Alias of `list()`. */
  static all(params?: Restore.ListParams, options?: Files.RequestOptions): Promise<Restore[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Restore.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Restore>

  /** Create Restore */
  static create(params: Restore.CreateParams, options?: Files.RequestOptions): Promise<Restore>
}

declare namespace Restore {
  /** The fields of `Restore` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be
     * greater than 365 days prior to the restore request.
     */
    earliest_date?: Files.DateTimeString | null

    /** Restore Record ID. */
    id?: number | null

    /** Number of directories that were successfully restored. */
    dirs_restored?: number | null

    /** Number of directories that were not able to be restored. */
    dirs_errored?: number | null

    /** Total number of directories processed. */
    dirs_total?: number | null

    /** Number of files successfully restored. */
    files_restored?: number | null

    /** Number of files that were not able to be restored. */
    files_errored?: number | null

    /** Total number of files processed. */
    files_total?: number | null

    /**
     * Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing
     * slash selects that folder and its contents only; without it, the prefix matches any path beginning with that
     * text. Do not use a leading slash. To restore all deleted items of the selected restoration type within the
     * selected site or workspace scope, specify an empty string (`''`) or omit the field.
     */
    prefix?: string | null

    /**
     * Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and
     * associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace
     * period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are
     * included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
     */
    restoration_type?: 'files' | 'users' | Files.OtherString | null

    /**
     * If true, we will restore the files in place (into their original paths). If false, we will create a new
     * restoration folder in the root and restore files there.
     */
    restore_in_place?: boolean | null

    /**
     * If true, a user restore restores permissions deleted along with the selected users, including permissions removed
     * independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`,
     * remain deleted. An in-place file restore restores user and group permissions on returned folders and their
     * subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including
     * permissions removed independently within that window. File restores into a new folder do not restore permissions.
     */
    restore_deleted_permissions?: boolean | null

    /** Number of users successfully restored (only present for `restoration_type=users`). */
    users_restored?: number | null

    /** Number of users that failed to restore (only present for `restoration_type=users`). */
    users_errored?: number | null

    /** Total number of users processed (only present for `restoration_type=users`). */
    users_total?: number | null

    /** Number of API keys restored (only present for `restoration_type=users`). */
    api_keys_restored?: number | null

    /** Number of public keys restored (only present for `restoration_type=users`). */
    public_keys_restored?: number | null

    /** Number of two factor authentication methods restored (only present for `restoration_type=users`). */
    two_factor_authentication_methods_restored?: number | null

    /** Status of the restoration process. */
    status?: 'pending' | 'counting' | 'restoring' | 'complete' | 'validating' | Files.OtherString | null

    /**
     * If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger
     * File Expiration to delete the file again.
     */
    update_timestamps?: boolean | null

    /** Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope. */
    workspace_id?: number | null

    /** Error messages received while restoring files and/or directories. Only present if there were errors. */
    error_messages?: string[] | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `restoration_type`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /**
     * Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be
     * greater than 365 days prior to the restore request.
     */
    earliest_date: Files.DateTimeString

    /**
     * Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing
     * slash selects that folder and its contents only; without it, the prefix matches any path beginning with that
     * text. Do not use a leading slash. To restore all deleted items of the selected restoration type within the
     * selected site or workspace scope, specify an empty string (`''`) or omit the field.
     */
    prefix?: string

    /**
     * Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and
     * associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace
     * period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are
     * included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
     */
    restoration_type?: 'files' | 'users'

    /**
     * If true, a user restore restores permissions deleted along with the selected users, including permissions removed
     * independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`,
     * remain deleted. An in-place file restore restores user and group permissions on returned folders and their
     * subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including
     * permissions removed independently within that window. File restores into a new folder do not restore permissions.
     */
    restore_deleted_permissions?: boolean

    /**
     * If true, we will restore the files in place (into their original paths). If false, we will create a new
     * restoration folder in the root and restore files there.
     */
    restore_in_place?: boolean

    /**
     * If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger
     * File Expiration to delete the file again.
     */
    update_timestamps?: boolean

    /** Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope. */
    workspace_id?: number
  }
}

export default Restore
