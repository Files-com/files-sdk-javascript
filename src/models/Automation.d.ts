import Files from '../Files'
import AutomationAuthoringSchema from './AutomationAuthoringSchema'

/** An Automation is an automated process of controlling workflows on your Files.com site. */
declare class Automation {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Automation.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Automation.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Automation ID */
  readonly id?: number | null

  /** Workspace ID */
  readonly workspace_id?: number | null

  /**
   * Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true`
   * we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues
   * with race conditions on remote systems at the cost of some performance.
   */
  readonly always_serialize_jobs?: boolean | null

  /**
   * Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent
   * wasted transfer. If this flag is `true` we will overwrite the destination file always. Note that this may cause
   * large amounts of wasted transfer usage. This setting has no effect unless `overwrite_files` is also set to `true`.
   */
  readonly always_overwrite_size_matching_files?: boolean | null

  /** Automation type */
  readonly automation?: 'create_folder' | 'delete_file' | 'copy_file' | 'move_file' | 'as2_send' | 'run_sync' | 'import_file' | 'v2' | Files.OtherString | null

  /** Indicates if the automation has been deleted. */
  readonly deleted?: boolean | null

  /** Description for the this Automation. */
  readonly description?: string | null

  /** Automation v2 graph definition. */
  readonly definition?: Automation.Definition | null

  /** If set, this string in the destination path will be replaced with the value in `destination_replace_to`. */
  readonly destination_replace_from?: string | null

  /**
   * If set, this string will replace the value `destination_replace_from` in the destination filename. You can use
   * special patterns here.
   */
  readonly destination_replace_to?: string | null

  /** Destination Paths */
  readonly destinations?: string[] | null

  /** If true, this automation will not run. */
  readonly disabled?: boolean | null

  /** If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts. */
  readonly exclude_pattern?: string | null

  /** List of URLs to be imported and names to be used. */
  readonly import_urls?: Files.JsonObject[] | null

  /** If trigger is `email`, this is the address that triggers the Automation. */
  readonly inbound_email_address?: string | null

  /**
   * Normally copy and move automations that use globs will implicitly preserve the source folder structure in the
   * destination. If this flag is `true`, the source folder structure will be flattened in the destination. This is
   * useful for copying or moving files from multiple folders into a single destination folder.
   */
  readonly flatten_destination_structure?: boolean | null

  /** IDs of Groups for the Automation (i.e. who to Request File from) */
  readonly group_ids?: number[] | string | null

  /** If true, the Lock Folders behavior will be disregarded for automated actions. */
  readonly ignore_locked_folders?: boolean | null

  /**
   * If trigger is `daily`, this specifies how often to run this automation. One of: `day`, `week`, `week_end`, `month`,
   * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
   */
  readonly interval?: string | null

  /** Time when automation was last modified. Does not change for name or description updates. */
  readonly last_modified_at?: Files.DateTimeString | null

  /**
   * If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.
   * This behavior no longer works and should not be used.
   */
  readonly legacy_folder_matching?: boolean | null

  /** Name for this automation. */
  readonly name?: string | null

  /**
   * If true, existing files will be overwritten with new files on Move/Copy automations. Note: by default files will
   * not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file. Use the
   * `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and
   * overwrite files no matter what.
   */
  readonly overwrite_files?: boolean | null

  /**
   * Path on which this Automation runs. Supports globs, except on remote mounts. This must be slash-delimited, but it
   * must neither start nor end with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Timezone to use when rendering timestamps in paths. */
  readonly path_time_zone?: string | null

  /** Current Automation v2 definition version. */
  readonly version?: number | null

  /**
   * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`,
   * `quarter`, `year`.
   */
  readonly recurring_day?: number | null

  /**
   * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
   * `week`, `month`, `quarter`, `year`.
   */
  readonly recurring_days?: number[] | null

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields. */
  readonly schedule_id?: number | null

  /**
   * If the Automation fails, retry at this interval (in minutes). Acceptable values are 5 through 1440 (one day). Set
   * to null to disable.
   */
  readonly retry_on_failure_interval_in_minutes?: number | null

  /** If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable. */
  readonly retry_on_failure_number_of_attempts?: number | null

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
   */
  readonly schedule?: Files.JsonObject | null

  /**
   * If trigger is `custom_schedule` or `daily` with times, Human readable schedule description for when the automation
   * should be run.
   */
  readonly human_readable_schedule?: string | null

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0 is Sunday, 1
   * is Monday, etc.
   */
  readonly schedule_days_of_week?: number[] | null

  /**
   * Times of day to run in HH:MM format (24-hour). For `custom_schedule`, run at these times on specified days of week.
   * For `daily`, run at these times on the scheduled interval date.
   */
  readonly schedule_times_of_day?: string[] | null

  /** Time zone for the schedule. If not set, times are interpreted as UTC. */
  readonly schedule_time_zone?: string | null

  /**
   * Source path/glob. See Automation docs for exact description, but this is used to filter for files in the `path` to
   * find files to operate on. Supports globs, except on remote mounts.
   */
  readonly source?: string | null

  /** IDs of Syncs to run by this Automation. */
  readonly sync_ids?: number[] | string | null

  /**
   * If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are
   * create, copy, move, archived_delete, update, read, destroy
   */
  readonly trigger_actions?: string[] | null

  /** How this automation is triggered to run. */
  readonly trigger?: 'manual' | 'daily' | 'custom_schedule' | 'webhook' | 'email' | 'action' | Files.OtherString | null

  /** User ID of the Automation's creator. */
  readonly user_id?: number | null

  /** IDs of Users for the Automation (i.e. who to Request File from) */
  readonly user_ids?: number[] | string | null

  /** A Hash of attributes specific to the automation type. */
  readonly value?: Automation.Value | null

  /** If trigger is `webhook`, this is the URL of the webhook to trigger the Automation. */
  readonly webhook_url?: string | null

  /** Skip the automation if there is a formal, observed holiday for this region. */
  readonly holiday_region?: string | null

  /** Automation ID */
  getId(): number | null | undefined

  /** Workspace ID */
  getWorkspaceId(): number | null | undefined

  /**
   * Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true`
   * we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues
   * with race conditions on remote systems at the cost of some performance.
   */
  getAlwaysSerializeJobs(): boolean | null | undefined

  /**
   * Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent
   * wasted transfer. If this flag is `true` we will overwrite the destination file always. Note that this may cause
   * large amounts of wasted transfer usage. This setting has no effect unless `overwrite_files` is also set to `true`.
   */
  getAlwaysOverwriteSizeMatchingFiles(): boolean | null | undefined

  /** Automation type */
  getAutomation(): 'create_folder' | 'delete_file' | 'copy_file' | 'move_file' | 'as2_send' | 'run_sync' | 'import_file' | 'v2' | Files.OtherString | null | undefined

  /** Indicates if the automation has been deleted. */
  getDeleted(): boolean | null | undefined

  /** Description for the this Automation. */
  getDescription(): string | null | undefined

  /** Automation v2 graph definition. */
  getDefinition(): Automation.Definition | null | undefined

  /** If set, this string in the destination path will be replaced with the value in `destination_replace_to`. */
  getDestinationReplaceFrom(): string | null | undefined

  /**
   * If set, this string will replace the value `destination_replace_from` in the destination filename. You can use
   * special patterns here.
   */
  getDestinationReplaceTo(): string | null | undefined

  /** Destination Paths */
  getDestinations(): string[] | null | undefined

  /** If true, this automation will not run. */
  getDisabled(): boolean | null | undefined

  /** If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts. */
  getExcludePattern(): string | null | undefined

  /** List of URLs to be imported and names to be used. */
  getImportUrls(): Files.JsonObject[] | null | undefined

  /** If trigger is `email`, this is the address that triggers the Automation. */
  getInboundEmailAddress(): string | null | undefined

  /**
   * Normally copy and move automations that use globs will implicitly preserve the source folder structure in the
   * destination. If this flag is `true`, the source folder structure will be flattened in the destination. This is
   * useful for copying or moving files from multiple folders into a single destination folder.
   */
  getFlattenDestinationStructure(): boolean | null | undefined

  /** IDs of Groups for the Automation (i.e. who to Request File from) */
  getGroupIds(): number[] | string | null | undefined

  /** If true, the Lock Folders behavior will be disregarded for automated actions. */
  getIgnoreLockedFolders(): boolean | null | undefined

  /**
   * If trigger is `daily`, this specifies how often to run this automation. One of: `day`, `week`, `week_end`, `month`,
   * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
   */
  getInterval(): string | null | undefined

  /** Time when automation was last modified. Does not change for name or description updates. */
  getLastModifiedAt(): Files.DateTimeString | null | undefined

  /**
   * If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.
   * This behavior no longer works and should not be used.
   */
  getLegacyFolderMatching(): boolean | null | undefined

  /** Name for this automation. */
  getName(): string | null | undefined

  /**
   * If true, existing files will be overwritten with new files on Move/Copy automations. Note: by default files will
   * not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file. Use the
   * `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and
   * overwrite files no matter what.
   */
  getOverwriteFiles(): boolean | null | undefined

  /**
   * Path on which this Automation runs. Supports globs, except on remote mounts. This must be slash-delimited, but it
   * must neither start nor end with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Timezone to use when rendering timestamps in paths. */
  getPathTimeZone(): string | null | undefined

  /** Current Automation v2 definition version. */
  getVersion(): number | null | undefined

  /**
   * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`,
   * `quarter`, `year`.
   */
  getRecurringDay(): number | null | undefined

  /**
   * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
   * `week`, `month`, `quarter`, `year`.
   */
  getRecurringDays(): number[] | null | undefined

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields. */
  getScheduleId(): number | null | undefined

  /**
   * If the Automation fails, retry at this interval (in minutes). Acceptable values are 5 through 1440 (one day). Set
   * to null to disable.
   */
  getRetryOnFailureIntervalInMinutes(): number | null | undefined

  /** If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable. */
  getRetryOnFailureNumberOfAttempts(): number | null | undefined

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
   */
  getSchedule(): Files.JsonObject | null | undefined

  /**
   * If trigger is `custom_schedule` or `daily` with times, Human readable schedule description for when the automation
   * should be run.
   */
  getHumanReadableSchedule(): string | null | undefined

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0 is Sunday, 1
   * is Monday, etc.
   */
  getScheduleDaysOfWeek(): number[] | null | undefined

  /**
   * Times of day to run in HH:MM format (24-hour). For `custom_schedule`, run at these times on specified days of week.
   * For `daily`, run at these times on the scheduled interval date.
   */
  getScheduleTimesOfDay(): string[] | null | undefined

  /** Time zone for the schedule. If not set, times are interpreted as UTC. */
  getScheduleTimeZone(): string | null | undefined

  /**
   * Source path/glob. See Automation docs for exact description, but this is used to filter for files in the `path` to
   * find files to operate on. Supports globs, except on remote mounts.
   */
  getSource(): string | null | undefined

  /** IDs of Syncs to run by this Automation. */
  getSyncIds(): number[] | string | null | undefined

  /**
   * If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are
   * create, copy, move, archived_delete, update, read, destroy
   */
  getTriggerActions(): string[] | null | undefined

  /** How this automation is triggered to run. */
  getTrigger(): 'manual' | 'daily' | 'custom_schedule' | 'webhook' | 'email' | 'action' | Files.OtherString | null | undefined

  /** User ID of the Automation's creator. */
  getUserId(): number | null | undefined

  /** IDs of Users for the Automation (i.e. who to Request File from) */
  getUserIds(): number[] | string | null | undefined

  /** A Hash of attributes specific to the automation type. */
  getValue(): Automation.Value | null | undefined

  /** If trigger is `webhook`, this is the URL of the webhook to trigger the Automation. */
  getWebhookUrl(): string | null | undefined

  /** Skip the automation if there is a formal, observed holiday for this region. */
  getHolidayRegion(): string | null | undefined

  /** Automation ID */
  setId(value: number): void

  /** Workspace ID */
  setWorkspaceId(value: number): void

  /**
   * Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true`
   * we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues
   * with race conditions on remote systems at the cost of some performance.
   */
  setAlwaysSerializeJobs(value: boolean): void

  /**
   * Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent
   * wasted transfer. If this flag is `true` we will overwrite the destination file always. Note that this may cause
   * large amounts of wasted transfer usage. This setting has no effect unless `overwrite_files` is also set to `true`.
   */
  setAlwaysOverwriteSizeMatchingFiles(value: boolean): void

  /** Automation type */
  setAutomation(value: 'create_folder' | 'delete_file' | 'copy_file' | 'move_file' | 'as2_send' | 'run_sync' | 'import_file' | 'v2'): void

  /** Indicates if the automation has been deleted. */
  setDeleted(value: boolean): void

  /** Description for the this Automation. */
  setDescription(value: string): void

  /** Automation v2 graph definition. */
  setDefinition(value: Automation.Definition): void

  /** If set, this string in the destination path will be replaced with the value in `destination_replace_to`. */
  setDestinationReplaceFrom(value: string): void

  /**
   * If set, this string will replace the value `destination_replace_from` in the destination filename. You can use
   * special patterns here.
   */
  setDestinationReplaceTo(value: string): void

  /** Destination Paths */
  setDestinations(value: string[]): void

  /** If true, this automation will not run. */
  setDisabled(value: boolean): void

  /** If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts. */
  setExcludePattern(value: string): void

  /** List of URLs to be imported and names to be used. */
  setImportUrls(value: Files.JsonObject[]): void

  /** If trigger is `email`, this is the address that triggers the Automation. */
  setInboundEmailAddress(value: string): void

  /**
   * Normally copy and move automations that use globs will implicitly preserve the source folder structure in the
   * destination. If this flag is `true`, the source folder structure will be flattened in the destination. This is
   * useful for copying or moving files from multiple folders into a single destination folder.
   */
  setFlattenDestinationStructure(value: boolean): void

  /** IDs of Groups for the Automation (i.e. who to Request File from) */
  setGroupIds(value: string): void

  /** If true, the Lock Folders behavior will be disregarded for automated actions. */
  setIgnoreLockedFolders(value: boolean): void

  /**
   * If trigger is `daily`, this specifies how often to run this automation. One of: `day`, `week`, `week_end`, `month`,
   * `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
   */
  setInterval(value: string): void

  /** Time when automation was last modified. Does not change for name or description updates. */
  setLastModifiedAt(value: Files.DateTimeString): void

  /**
   * If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.
   * This behavior no longer works and should not be used.
   */
  setLegacyFolderMatching(value: boolean): void

  /** Name for this automation. */
  setName(value: string): void

  /**
   * If true, existing files will be overwritten with new files on Move/Copy automations. Note: by default files will
   * not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file. Use the
   * `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and
   * overwrite files no matter what.
   */
  setOverwriteFiles(value: boolean): void

  /**
   * Path on which this Automation runs. Supports globs, except on remote mounts. This must be slash-delimited, but it
   * must neither start nor end with a slash. Maximum of 5000 characters.
   */
  setPath(value: string): void

  /** Timezone to use when rendering timestamps in paths. */
  setPathTimeZone(value: string): void

  /** Current Automation v2 definition version. */
  setVersion(value: number): void

  /**
   * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`,
   * `quarter`, `year`.
   */
  setRecurringDay(value: number): void

  /**
   * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
   * `week`, `month`, `quarter`, `year`.
   */
  setRecurringDays(value: number[]): void

  /** If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields. */
  setScheduleId(value: number): void

  /**
   * If the Automation fails, retry at this interval (in minutes). Acceptable values are 5 through 1440 (one day). Set
   * to null to disable.
   */
  setRetryOnFailureIntervalInMinutes(value: number): void

  /** If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable. */
  setRetryOnFailureNumberOfAttempts(value: number): void

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
   */
  setSchedule(value: Files.JsonObject): void

  /**
   * If trigger is `custom_schedule` or `daily` with times, Human readable schedule description for when the automation
   * should be run.
   */
  setHumanReadableSchedule(value: string): void

  /**
   * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0 is Sunday, 1
   * is Monday, etc.
   */
  setScheduleDaysOfWeek(value: number[]): void

  /**
   * Times of day to run in HH:MM format (24-hour). For `custom_schedule`, run at these times on specified days of week.
   * For `daily`, run at these times on the scheduled interval date.
   */
  setScheduleTimesOfDay(value: string[]): void

  /** Time zone for the schedule. If not set, times are interpreted as UTC. */
  setScheduleTimeZone(value: string): void

  /**
   * Source path/glob. See Automation docs for exact description, but this is used to filter for files in the `path` to
   * find files to operate on. Supports globs, except on remote mounts.
   */
  setSource(value: string): void

  /** IDs of Syncs to run by this Automation. */
  setSyncIds(value: string): void

  /**
   * If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are
   * create, copy, move, archived_delete, update, read, destroy
   */
  setTriggerActions(value: string[]): void

  /** How this automation is triggered to run. */
  setTrigger(value: 'manual' | 'daily' | 'custom_schedule' | 'webhook' | 'email' | 'action'): void

  /** User ID of the Automation's creator. */
  setUserId(value: number): void

  /** IDs of Users for the Automation (i.e. who to Request File from) */
  setUserIds(value: string): void

  /** A Hash of attributes specific to the automation type. */
  setValue(value: Automation.Value): void

  /** If trigger is `webhook`, this is the URL of the webhook to trigger the Automation. */
  setWebhookUrl(value: string): void

  /** Skip the automation if there is a formal, observed holiday for this region. */
  setHolidayRegion(value: string): void

  /** Upgrade a legacy Automation to Automation v2 */
  upgrade(params?: Files.NoParams): Promise<Automation>

  /** Manually Run Automation */
  manualRun(params?: Automation.ManualRunParams): Promise<void>

  /** Update Automation */
  update(params?: Automation.UpdateParams): Promise<this>

  /** Delete Automation */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Automations */
  static list(params?: Automation.ListParams, options?: Files.RequestOptions): Promise<Automation[]>

  /** Alias of `list()`. */
  static all(params?: Automation.ListParams, options?: Files.RequestOptions): Promise<Automation[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: Automation.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<Automation>

  /**
   * Show Automation
   * @param id - Automation ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Automation>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<Automation>

  /** Show the Automation v2 authoring schema and active node catalog */
  static getAuthoringSchema(options?: Files.RequestOptions): Promise<AutomationAuthoringSchema>

  /** Create Automation */
  static create(params: Automation.CreateParams, options?: Files.RequestOptions): Promise<Automation>
}

declare namespace Automation {
  /** The fields of `Automation` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Automation ID */
    id?: number | null

    /** Workspace ID */
    workspace_id?: number | null

    /**
     * Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is
     * `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve
     * some issues with race conditions on remote systems at the cost of some performance.
     */
    always_serialize_jobs?: boolean | null

    /**
     * Ordinarily, files with identical size in the source and destination will be skipped from copy operations to
     * prevent wasted transfer. If this flag is `true` we will overwrite the destination file always. Note that this may
     * cause large amounts of wasted transfer usage. This setting has no effect unless `overwrite_files` is also set to
     * `true`.
     */
    always_overwrite_size_matching_files?: boolean | null

    /** Automation type */
    automation?: 'create_folder' | 'delete_file' | 'copy_file' | 'move_file' | 'as2_send' | 'run_sync' | 'import_file' | 'v2' | Files.OtherString | null

    /** Indicates if the automation has been deleted. */
    deleted?: boolean | null

    /** Description for the this Automation. */
    description?: string | null

    /** Automation v2 graph definition. */
    definition?: Automation.Definition | null

    /** If set, this string in the destination path will be replaced with the value in `destination_replace_to`. */
    destination_replace_from?: string | null

    /**
     * If set, this string will replace the value `destination_replace_from` in the destination filename. You can use
     * special patterns here.
     */
    destination_replace_to?: string | null

    /** Destination Paths */
    destinations?: string[] | null

    /** If true, this automation will not run. */
    disabled?: boolean | null

    /** If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts. */
    exclude_pattern?: string | null

    /** List of URLs to be imported and names to be used. */
    import_urls?: Files.JsonObject[] | null

    /** If trigger is `email`, this is the address that triggers the Automation. */
    inbound_email_address?: string | null

    /**
     * Normally copy and move automations that use globs will implicitly preserve the source folder structure in the
     * destination. If this flag is `true`, the source folder structure will be flattened in the destination. This is
     * useful for copying or moving files from multiple folders into a single destination folder.
     */
    flatten_destination_structure?: boolean | null

    /** IDs of Groups for the Automation (i.e. who to Request File from) */
    group_ids?: number[] | string | null

    /** If true, the Lock Folders behavior will be disregarded for automated actions. */
    ignore_locked_folders?: boolean | null

    /**
     * If trigger is `daily`, this specifies how often to run this automation. One of: `day`, `week`, `week_end`,
     * `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
     */
    interval?: string | null

    /** Time when automation was last modified. Does not change for name or description updates. */
    last_modified_at?: Files.DateTimeString | null

    /**
     * If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just
     * files. This behavior no longer works and should not be used.
     */
    legacy_folder_matching?: boolean | null

    /** Name for this automation. */
    name?: string | null

    /**
     * If true, existing files will be overwritten with new files on Move/Copy automations. Note: by default files will
     * not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file. Use
     * the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior
     * and overwrite files no matter what.
     */
    overwrite_files?: boolean | null

    /**
     * Path on which this Automation runs. Supports globs, except on remote mounts. This must be slash-delimited, but it
     * must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Timezone to use when rendering timestamps in paths. */
    path_time_zone?: string | null

    /** Current Automation v2 definition version. */
    version?: number | null

    /**
     * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`,
     * `month`, `quarter`, `year`.
     */
    recurring_day?: number | null

    /**
     * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
     * `week`, `month`, `quarter`, `year`.
     */
    recurring_days?: number[] | null

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields. */
    schedule_id?: number | null

    /**
     * If the Automation fails, retry at this interval (in minutes). Acceptable values are 5 through 1440 (one day). Set
     * to null to disable.
     */
    retry_on_failure_interval_in_minutes?: number | null

    /** If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable. */
    retry_on_failure_number_of_attempts?: number | null

    /**
     * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json
     * format.
     */
    schedule?: Files.JsonObject | null

    /**
     * If trigger is `custom_schedule` or `daily` with times, Human readable schedule description for when the
     * automation should be run.
     */
    human_readable_schedule?: string | null

    /**
     * If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0 is Sunday,
     * 1 is Monday, etc.
     */
    schedule_days_of_week?: number[] | null

    /**
     * Times of day to run in HH:MM format (24-hour). For `custom_schedule`, run at these times on specified days of
     * week. For `daily`, run at these times on the scheduled interval date.
     */
    schedule_times_of_day?: string[] | null

    /** Time zone for the schedule. If not set, times are interpreted as UTC. */
    schedule_time_zone?: string | null

    /**
     * Source path/glob. See Automation docs for exact description, but this is used to filter for files in the `path`
     * to find files to operate on. Supports globs, except on remote mounts.
     */
    source?: string | null

    /** IDs of Syncs to run by this Automation. */
    sync_ids?: number[] | string | null

    /**
     * If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are
     * create, copy, move, archived_delete, update, read, destroy
     */
    trigger_actions?: string[] | null

    /** How this automation is triggered to run. */
    trigger?: 'manual' | 'daily' | 'custom_schedule' | 'webhook' | 'email' | 'action' | Files.OtherString | null

    /** User ID of the Automation's creator. */
    user_id?: number | null

    /** IDs of Users for the Automation (i.e. who to Request File from) */
    user_ids?: number[] | string | null

    /** A Hash of attributes specific to the automation type. */
    value?: Automation.Value | null

    /** If trigger is `webhook`, this is the URL of the webhook to trigger the Automation. */
    webhook_url?: string | null

    /** Skip the automation if there is a formal, observed holiday for this region. */
    holiday_region?: string | null
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
     * `name`, `automation`, `last_modified_at` or `disabled`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`,
     * `last_modified_at`, `workspace_id` or `automation`. Valid field combinations are `[ disabled, last_modified_at
     * ]`, `[ workspace_id, disabled ]`, `[ disabled, automation ]`, `[ workspace_id, last_modified_at ]`, `[
     * automation, last_modified_at ]`, `[ workspace_id, automation ]`, `[ workspace_id, disabled, last_modified_at ]`,
     * `[ disabled, automation, last_modified_at ]`, `[ workspace_id, disabled, automation ]`, `[ workspace_id,
     * automation, last_modified_at ]` or `[ workspace_id, disabled, automation, last_modified_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `last_modified_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `last_modified_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are
     * `last_modified_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `last_modified_at`.
     */
    filter_lteq?: Files.JsonObject
  }

  interface CreateParams {
    /**
     * Source path/glob. See Automation docs for exact description, but this is used to filter for files in the `path`
     * to find files to operate on. Supports globs, except on remote mounts.
     */
    source?: string

    /** A list of destination paths. Use a trailing slash for folder destinations and omit it for file destinations. */
    destinations?: string[]

    /** If set, this string in the destination path will be replaced with the value in `destination_replace_to`. */
    destination_replace_from?: string

    /**
     * If set, this string will replace the value `destination_replace_from` in the destination filename. You can use
     * special patterns here.
     */
    destination_replace_to?: string

    /**
     * How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`,
     * `quarter_end`, `year`, `year_end`
     */
    interval?: string

    /** Path on which this Automation runs.  Supports globs, except on remote mounts. */
    path?: string

    /** A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited. */
    sync_ids?: string

    /** A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited. */
    user_ids?: string

    /** A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited. */
    group_ids?: string

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields. */
    schedule_id?: number

    /**
     * If trigger is `custom_schedule` without `schedule_id`, a list of days of the week to run this automation. 0 is
     * Sunday, 1 is Monday, etc.
     */
    schedule_days_of_week?: number[]

    /**
     * Times of day to run in HH:MM format (24-hour). Required for `custom_schedule` without `schedule_id`. Optional for
     * `daily` triggers; if not set, runs at midnight UTC.
     */
    schedule_times_of_day?: string[]

    /**
     * Time zone for schedule fields. Optional for `custom_schedule` without `schedule_id` and for `daily`. If not set,
     * times are interpreted as UTC.
     */
    schedule_time_zone?: string

    /**
     * Skip automation on holidays in this region. Optional for `custom_schedule` without `schedule_id` and for `daily`.
     */
    holiday_region?: string

    /**
     * Ordinarily, files with identical size in the source and destination will be skipped from copy operations to
     * prevent wasted transfer. If this flag is `true` we will overwrite the destination file always. Note that this may
     * cause large amounts of wasted transfer usage. This setting has no effect unless `overwrite_files` is also set to
     * `true`.
     */
    always_overwrite_size_matching_files?: boolean

    /**
     * Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is
     * `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve
     * some issues with race conditions on remote systems at the cost of some performance.
     */
    always_serialize_jobs?: boolean

    /** Description for the this Automation. */
    description?: string

    /** Automation v2 graph definition. */
    definition?: Automation.Definition

    /** If true, this automation will not run. */
    disabled?: boolean

    /** If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts. */
    exclude_pattern?: string

    /** List of URLs to be imported and names to be used. */
    import_urls?: Files.JsonObject[]

    /**
     * Normally copy and move automations that use globs will implicitly preserve the source folder structure in the
     * destination. If this flag is `true`, the source folder structure will be flattened in the destination. This is
     * useful for copying or moving files from multiple folders into a single destination folder.
     */
    flatten_destination_structure?: boolean

    /** If true, the Lock Folders behavior will be disregarded for automated actions. */
    ignore_locked_folders?: boolean

    /**
     * DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition
     * to just files. This behavior no longer works and should not be used.
     */
    legacy_folder_matching?: boolean

    /** Name for this automation. */
    name?: string

    /**
     * If true, existing files will be overwritten with new files on Move/Copy automations. Note: by default files will
     * not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file. Use
     * the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior
     * and overwrite files no matter what.
     */
    overwrite_files?: boolean

    /** Timezone to use when rendering timestamps in paths. */
    path_time_zone?: string

    /**
     * If the Automation fails, retry at this interval (in minutes). Acceptable values are 5 through 1440 (one day). Set
     * to null to disable.
     */
    retry_on_failure_interval_in_minutes?: number

    /** If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable. */
    retry_on_failure_number_of_attempts?: number

    /** How this automation is triggered to run. */
    trigger?: 'manual' | 'daily' | 'custom_schedule' | 'webhook' | 'email' | 'action'

    /**
     * If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are
     * create, copy, move, archived_delete, update, read, destroy
     */
    trigger_actions?: string[]

    /** A Hash of attributes specific to the automation type. */
    value?: Automation.Value

    /**
     * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`,
     * `month`, `quarter`, `year`.
     */
    recurring_day?: number

    /**
     * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
     * `week`, `month`, `quarter`, `year`.
     */
    recurring_days?: number[]

    /** Automation type */
    automation: 'create_folder' | 'delete_file' | 'copy_file' | 'move_file' | 'as2_send' | 'run_sync' | 'import_file' | 'v2'

    /** Workspace ID */
    workspace_id?: number
  }

  interface ManualRunParams {
    /** Initial items for a v2 manual trigger. Each item contains exactly one `file` path or `data` object. */
    items?: Files.JsonObject[]
  }

  interface UpdateParams {
    /**
     * Source path/glob. See Automation docs for exact description, but this is used to filter for files in the `path`
     * to find files to operate on. Supports globs, except on remote mounts.
     */
    source?: string

    /** A list of destination paths. Use a trailing slash for folder destinations and omit it for file destinations. */
    destinations?: string[]

    /** If set, this string in the destination path will be replaced with the value in `destination_replace_to`. */
    destination_replace_from?: string

    /**
     * If set, this string will replace the value `destination_replace_from` in the destination filename. You can use
     * special patterns here.
     */
    destination_replace_to?: string

    /**
     * How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`,
     * `quarter_end`, `year`, `year_end`
     */
    interval?: string

    /** Path on which this Automation runs.  Supports globs, except on remote mounts. */
    path?: string

    /** A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited. */
    sync_ids?: string

    /** A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited. */
    user_ids?: string

    /** A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited. */
    group_ids?: string

    /** If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields. */
    schedule_id?: number

    /**
     * If trigger is `custom_schedule` without `schedule_id`, a list of days of the week to run this automation. 0 is
     * Sunday, 1 is Monday, etc.
     */
    schedule_days_of_week?: number[]

    /**
     * Times of day to run in HH:MM format (24-hour). Required for `custom_schedule` without `schedule_id`. Optional for
     * `daily` triggers; if not set, runs at midnight UTC.
     */
    schedule_times_of_day?: string[]

    /**
     * Time zone for schedule fields. Optional for `custom_schedule` without `schedule_id` and for `daily`. If not set,
     * times are interpreted as UTC.
     */
    schedule_time_zone?: string

    /**
     * Skip automation on holidays in this region. Optional for `custom_schedule` without `schedule_id` and for `daily`.
     */
    holiday_region?: string

    /**
     * Ordinarily, files with identical size in the source and destination will be skipped from copy operations to
     * prevent wasted transfer. If this flag is `true` we will overwrite the destination file always. Note that this may
     * cause large amounts of wasted transfer usage. This setting has no effect unless `overwrite_files` is also set to
     * `true`.
     */
    always_overwrite_size_matching_files?: boolean

    /**
     * Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is
     * `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve
     * some issues with race conditions on remote systems at the cost of some performance.
     */
    always_serialize_jobs?: boolean

    /** Description for the this Automation. */
    description?: string

    /** Automation v2 graph definition. */
    definition?: Automation.Definition

    /** If true, this automation will not run. */
    disabled?: boolean

    /** If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts. */
    exclude_pattern?: string

    /** List of URLs to be imported and names to be used. */
    import_urls?: Files.JsonObject[]

    /**
     * Normally copy and move automations that use globs will implicitly preserve the source folder structure in the
     * destination. If this flag is `true`, the source folder structure will be flattened in the destination. This is
     * useful for copying or moving files from multiple folders into a single destination folder.
     */
    flatten_destination_structure?: boolean

    /** If true, the Lock Folders behavior will be disregarded for automated actions. */
    ignore_locked_folders?: boolean

    /**
     * DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition
     * to just files. This behavior no longer works and should not be used.
     */
    legacy_folder_matching?: boolean

    /** Name for this automation. */
    name?: string

    /**
     * If true, existing files will be overwritten with new files on Move/Copy automations. Note: by default files will
     * not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file. Use
     * the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior
     * and overwrite files no matter what.
     */
    overwrite_files?: boolean

    /** Timezone to use when rendering timestamps in paths. */
    path_time_zone?: string

    /**
     * If the Automation fails, retry at this interval (in minutes). Acceptable values are 5 through 1440 (one day). Set
     * to null to disable.
     */
    retry_on_failure_interval_in_minutes?: number

    /** If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable. */
    retry_on_failure_number_of_attempts?: number

    /** How this automation is triggered to run. */
    trigger?: 'manual' | 'daily' | 'custom_schedule' | 'webhook' | 'email' | 'action'

    /**
     * If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are
     * create, copy, move, archived_delete, update, read, destroy
     */
    trigger_actions?: string[]

    /** A Hash of attributes specific to the automation type. */
    value?: Automation.Value

    /**
     * If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`,
     * `month`, `quarter`, `year`.
     */
    recurring_day?: number

    /**
     * If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals:
     * `week`, `month`, `quarter`, `year`.
     */
    recurring_days?: number[]

    /** Automation type */
    automation?: 'create_folder' | 'delete_file' | 'copy_file' | 'move_file' | 'as2_send' | 'run_sync' | 'import_file' | 'v2'
  }

  /** Automation v2 workflow graph. Nodes define triggers, actions, and control flow; edges connect node IDs. */
  interface Definition {
    /** Automation definition schema version. */
    schema_version: 1

    /**
     * Flat list of nodes. Every node requires a unique id and a type, accepts the node-specific config fields
     * documented below, and action or control-flow nodes may set return to true to include their output in the
     * Automation result.
     */
    nodes: Automation.Definition.Node[]

    /** Directed connections between nodes. */
    edges: Automation.Definition.Edge[]
  }

  namespace Definition {
    /** Node ID or named input. */
    type Slug = string

    /** Case-sensitive output name. Use 1-64 letters, numbers, underscores, or hyphens. */
    type OutputName = string

    /**
     * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{ fts }}
     * supplies one file or folder name; {{{ fts }}} supplies a path fragment.
     */
    type TemplateString = string

    /** A bare Files TransformScript expression, no braces. */
    type FtsExpression = string

    /** One or more destination path templates. */
    type Destinations = Automation.Definition.TemplateString[]

    /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
    type OnError = Array<{
      /**
       * A typed error family (not-found, processing-failure, service-unavailable), family/specific-error, or * for all.
       */
      error: string

      action: 'continue' | 'propagate'
    }>

    interface Edge {
      /** Source node ID. */
      from: Automation.Definition.Slug

      /** Destination node ID. */
      to: Automation.Definition.Slug

      /** Named source output. Omit for the main output. */
      output?: Automation.Definition.OutputName

      /** Named destination input. Omit for the main input. */
      input?: Automation.Definition.Slug
    }

    type Node =
      | Automation.Definition.NodeTriggerScheduled
      | Automation.Definition.NodeTriggerManual
      | Automation.Definition.NodeTriggerAction
      | Automation.Definition.NodeTriggerFolderCreation
      | Automation.Definition.NodeTriggerWebhook
      | Automation.Definition.NodeTriggerEmail
      | Automation.Definition.NodeCreateFolder
      | Automation.Definition.NodeCopyFile
      | Automation.Definition.NodeMoveFile
      | Automation.Definition.NodeDeleteFile
      | Automation.Definition.NodeImportFile
      | Automation.Definition.NodeRunSync
      | Automation.Definition.NodeAs2Send
      | Automation.Definition.NodeSendEmail
      | Automation.Definition.NodeAgentCompute
      | Automation.Definition.NodeSetMetadata
      | Automation.Definition.NodeExtract
      | Automation.Definition.NodeDocumentConvert
      | Automation.Definition.NodeImageConvert
      | Automation.Definition.NodeZip
      | Automation.Definition.NodeUnzip
      | Automation.Definition.NodeGpgEncrypt
      | Automation.Definition.NodeGpgDecrypt
      | Automation.Definition.NodeIf
      | Automation.Definition.NodeSwitch
      | Automation.Definition.NodeFilter
      | Automation.Definition.NodeJoin
      | Automation.Definition.NodeAggregate
      | Automation.Definition.NodeWait
      | Automation.Definition.NodeTransform
      | Automation.Definition.NodeRunAutomation

    /** Trigger scheduled node */
    interface NodeTriggerScheduled {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'trigger_scheduled'

      /** Configuration fields for this node type. */
      config?: {
        interval?: 'week' | 'month' | 'quarter' | 'year' | 'day' | 'week_end' | 'month_end' | 'quarter_end' | 'year_end'

        recurring_day?: number

        recurring_days?: number[]

        schedule_id?: number

        schedule_days_of_week?: number[]

        schedule_times_of_day?: string[]

        schedule_time_zone?: string

        holiday_region?: string

        path?: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        source?: Automation.Definition.TemplateString

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger manual node */
    interface NodeTriggerManual {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'trigger_manual'

      /** Configuration fields for this node type. */
      config?: {
        path?: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        source?: Automation.Definition.TemplateString

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger action node */
    interface NodeTriggerAction {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'trigger_action'

      /** Configuration fields for this node type. */
      config: {
        /** @defaultValue 'file' */
        kind?: 'file' | 'data'

        trigger_actions: Array<'create' | 'read' | 'update' | 'destroy' | 'move' | 'copy' | 'archived_delete'>

        path?: string

        source?: string

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger folder creation node */
    interface NodeTriggerFolderCreation {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'trigger_folder_creation'

      /** Configuration fields for this node type. */
      config?: {
        path?: string
        source?: string
        exclude_pattern?: string
        path_time_zone?: string
      }
    }

    /** Trigger webhook node */
    interface NodeTriggerWebhook {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'trigger_webhook'

      /** Configuration fields for this node type. */
      config?: {
        path?: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        source?: Automation.Definition.TemplateString

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger email node */
    interface NodeTriggerEmail {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'trigger_email'

      /** Configuration fields for this node type. */
      config?: {
        allowed_senders?: string[]

        /** @defaultValue false */
        save_body?: boolean

        /** @defaultValue false */
        save_html_body?: boolean

        /** @defaultValue false */
        save_raw_message?: boolean

        source?: string

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Create folder node */
    interface NodeCreateFolder {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'create_folder'

      /** Configuration fields for this node type. */
      config: {
        /** One or more destination path templates. */
        destinations: Automation.Definition.Destinations

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Copy file node */
    interface NodeCopyFile {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'copy_file'

      /** Configuration fields for this node type. */
      config?: {
        /** One or more destination path templates. */
        destinations?: Automation.Definition.Destinations

        destination_replace_from?: string

        destination_replace_to?: string

        overwrite_files?: boolean

        always_overwrite_size_matching_files?: boolean

        flatten_destination_structure?: boolean

        exclude_pattern?: string

        ignore_locked_folders?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Move file node */
    interface NodeMoveFile {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'move_file'

      /** Configuration fields for this node type. */
      config?: {
        /** One or more destination path templates. */
        destinations?: Automation.Definition.Destinations

        destination_replace_from?: string

        destination_replace_to?: string

        overwrite_files?: boolean

        flatten_destination_structure?: boolean

        exclude_pattern?: string

        ignore_locked_folders?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Delete file node */
    interface NodeDeleteFile {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'delete_file'

      /** Configuration fields for this node type. */
      config?: {
        exclude_pattern?: string

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Import file node */
    interface NodeImportFile {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'import_file'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        url: Automation.Definition.TemplateString

        /** One or more destination path templates. */
        destinations?: Automation.Definition.Destinations

        /** @defaultValue 'get' */
        method?: 'get' | 'post'

        headers?: {
          [key: string]: Automation.Definition.TemplateString
        }

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        content?: Automation.Definition.TemplateString

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Run sync node */
    interface NodeRunSync {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'run_sync'

      /** Configuration fields for this node type. */
      config: {
        sync_ids: number[]

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** As2 send node */
    interface NodeAs2Send {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'as2_send'

      /** Configuration fields for this node type. */
      config: {
        as2_station_id: number

        as2_partner_id: number

        /** @defaultValue 'AS2 EDI Transaction' */
        as2_subject?: string

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Send email node */
    interface NodeSendEmail {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'send_email'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        from?: Automation.Definition.TemplateString

        to: Automation.Definition.TemplateString[]

        cc?: Automation.Definition.TemplateString[]

        bcc?: Automation.Definition.TemplateString[]

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        subject?: Automation.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        body?: Automation.Definition.TemplateString

        attachments?: Automation.Definition.TemplateString[]

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Agent compute node */
    interface NodeAgentCompute {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'agent_compute'

      /** Configuration fields for this node type. */
      config: {
        remote_server_id: number

        command: string

        arguments?: {
          [key: string]: Automation.Definition.TemplateString
        }

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Set metadata node */
    interface NodeSetMetadata {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'set_metadata'

      /** Configuration fields for this node type. */
      config: {
        metadata: {
          [key: string]: Automation.Definition.TemplateString
        }

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Extract node */
    interface NodeExtract {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'extract'

      /** Configuration fields for this node type. */
      config?: {
        /** @defaultValue true */
        include_metadata?: boolean

        /** @defaultValue true */
        include_content?: boolean

        /** @defaultValue 'main' */
        content_mode?: 'main' | 'all'

        max_chars?: number

        max_pages?: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Document convert node */
    interface NodeDocumentConvert {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'document_convert'

      /** Configuration fields for this node type. */
      config: {
        target_format: 'docx' | 'pdf' | 'rtf' | 'txt' | 'csv' | 'xlsx' | 'pptx'

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: Automation.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Image convert node */
    interface NodeImageConvert {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'image_convert'

      /** Configuration fields for this node type. */
      config: {
        target_format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'tif' | 'tiff'

        width?: number

        height?: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: Automation.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Zip node */
    interface NodeZip {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'zip'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination: Automation.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Unzip node */
    interface NodeUnzip {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'unzip'

      /** Configuration fields for this node type. */
      config?: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: Automation.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Gpg encrypt node */
    interface NodeGpgEncrypt {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'gpg_encrypt'

      /** Configuration fields for this node type. */
      config: {
        gpg_key_id: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: Automation.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Gpg decrypt node */
    interface NodeGpgDecrypt {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'gpg_decrypt'

      /** Configuration fields for this node type. */
      config: {
        gpg_key_id: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: Automation.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** If node */
    interface NodeIf {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'if'

      /** Configuration fields for this node type. */
      config: {
        /** A bare Files TransformScript expression, no braces. */
        condition: Automation.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Switch node */
    interface NodeSwitch {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'switch'

      /** Configuration fields for this node type. */
      config: {
        /** Switch cases. Each item contains a unique output name and the condition that sends items to it. */
        cases: Array<{
          /** Case-sensitive output name. Use 1-64 letters, numbers, underscores, or hyphens. */
          name: Automation.Definition.OutputName

          /** A bare Files TransformScript expression, no braces. */
          condition: Automation.Definition.FtsExpression
        }>

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Filter node */
    interface NodeFilter {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'filter'

      /** Configuration fields for this node type. */
      config: {
        kind?: 'file' | 'data'

        /** A bare Files TransformScript expression, no braces. */
        condition: Automation.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Join node */
    interface NodeJoin {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'join'

      /** Configuration fields for this node type. */
      config: {
        /** @defaultValue 'left' */
        join_type?: 'inner' | 'left' | 'outer'

        /** A bare Files TransformScript expression, no braces. */
        left_key: Automation.Definition.FtsExpression

        /** A bare Files TransformScript expression, no braces. */
        right_key: Automation.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Aggregate node */
    interface NodeAggregate {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'aggregate'

      /** Configuration fields for this node type. */
      config?: {
        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Wait node */
    interface NodeWait {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'wait'

      /** Configuration fields for this node type. */
      config?: {
        delay_seconds?: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Transform node */
    interface NodeTransform {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'transform'

      /** Configuration fields for this node type. */
      config: {
        fts: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: Automation.Definition.TemplateString

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Run automation node */
    interface NodeRunAutomation {
      /** Unique node ID within the graph. */
      id: Automation.Definition.Slug

      /** Node type. */
      type: 'run_automation'

      /** Configuration fields for this node type. */
      config: {
        automation_id: number

        automation_version: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: Automation.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }
  }

  /** A Hash of attributes specific to the automation type. */
  type Value = {
    [key: string]: string
  }
}

export default Automation
