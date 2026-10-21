import Files = require('../Files')

/** An AutomationLog is an audit log for monitoring and troubleshooting triggered Automation. */
declare class AutomationLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** Automation ID */
  readonly automation_id?: number | null

  /** Automation Run ID */
  readonly automation_run_id?: number | null

  /** Logical item correlation ID */
  readonly correlation_id?: string | null

  /** Destination path, for moves and copies */
  readonly dest_path?: string | null

  /** Typed error, if applicable */
  readonly error_type?: string | null

  /** ID of the Automation whose definition owns this node */
  readonly source_automation_id?: number | null

  /** Pinned version of the Automation whose definition owns this node */
  readonly source_automation_version?: number | null

  /** Message */
  readonly message?: string | null

  /** Node ID */
  readonly node_id?: string | null

  /** Node type */
  readonly node_type?: string | null

  /** Operation type */
  readonly operation?: 'as2_send' | 'copy' | 'delete' | 'import_file' | 'items_emitted' | 'mkdir' | 'move' | 'node_finished' | 'node_started' | 'perform_as2_send' | 'run_sync' | 'save_url' | 'wait' | Files.OtherString | null

  /** Node outlet used by the item */
  readonly output?: string | null

  /**
   * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Status */
  readonly status?: 'success' | 'failure' | 'skipped' | 'retried_failure' | Files.OtherString | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** Automation ID */
  getAutomationId(): number | null | undefined

  /** Automation Run ID */
  getAutomationRunId(): number | null | undefined

  /** Logical item correlation ID */
  getCorrelationId(): string | null | undefined

  /** Destination path, for moves and copies */
  getDestPath(): string | null | undefined

  /** Typed error, if applicable */
  getErrorType(): string | null | undefined

  /** ID of the Automation whose definition owns this node */
  getSourceAutomationId(): number | null | undefined

  /** Pinned version of the Automation whose definition owns this node */
  getSourceAutomationVersion(): number | null | undefined

  /** Message */
  getMessage(): string | null | undefined

  /** Node ID */
  getNodeId(): string | null | undefined

  /** Node type */
  getNodeType(): string | null | undefined

  /** Operation type */
  getOperation(): 'as2_send' | 'copy' | 'delete' | 'import_file' | 'items_emitted' | 'mkdir' | 'move' | 'node_finished' | 'node_started' | 'perform_as2_send' | 'run_sync' | 'save_url' | 'wait' | Files.OtherString | null | undefined

  /** Node outlet used by the item */
  getOutput(): string | null | undefined

  /**
   * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Status */
  getStatus(): 'success' | 'failure' | 'skipped' | 'retried_failure' | Files.OtherString | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Automation Logs */
  static list(params?: AutomationLog.ListParams, options?: Files.RequestOptions): Promise<AutomationLog[]>

  /** Alias of `list()`. */
  static all(params?: AutomationLog.ListParams, options?: Files.RequestOptions): Promise<AutomationLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: AutomationLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<AutomationLog>

  static default: typeof AutomationLog
}

declare namespace AutomationLog {
  /** The fields of `AutomationLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** Automation ID */
    automation_id?: number | null

    /** Automation Run ID */
    automation_run_id?: number | null

    /** Logical item correlation ID */
    correlation_id?: string | null

    /** Destination path, for moves and copies */
    dest_path?: string | null

    /** Typed error, if applicable */
    error_type?: string | null

    /** ID of the Automation whose definition owns this node */
    source_automation_id?: number | null

    /** Pinned version of the Automation whose definition owns this node */
    source_automation_version?: number | null

    /** Message */
    message?: string | null

    /** Node ID */
    node_id?: string | null

    /** Node type */
    node_type?: string | null

    /** Operation type */
    operation?: 'as2_send' | 'copy' | 'delete' | 'import_file' | 'items_emitted' | 'mkdir' | 'move' | 'node_finished' | 'node_started' | 'perform_as2_send' | 'run_sync' | 'save_url' | 'wait' | Files.OtherString | null

    /** Node outlet used by the item */
    output?: string | null

    /**
     * File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Status */
    status?: 'success' | 'failure' | 'skipped' | 'retried_failure' | Files.OtherString | null

    /** Start Time of Action */
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

    /** Number of records to show per page.  (Max: 1000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `automation_id`, `automation_run_id`, `correlation_id`, `error_type`, `node_id`, `node_type`, `operation`,
     * `output`, `path`, `source_automation_id`, `source_automation_version`, `status` or `created_at`. Valid field
     * combinations are any combination of `automation_id`, `automation_run_id`, `correlation_id`, `error_type`,
     * `node_id`, `node_type`, `operation`, `output`, `path`, `source_automation_id`, `source_automation_version`,
     * `status` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `source_automation_version` and `created_at`. Valid field combinations are any combination of `automation_id`,
     * `automation_run_id`, `correlation_id`, `error_type`, `node_id`, `node_type`, `operation`, `output`, `path`,
     * `source_automation_id`, `source_automation_version`, `status` and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `source_automation_version` and `created_at`. Valid field combinations are any combination of `automation_id`,
     * `automation_run_id`, `correlation_id`, `error_type`, `node_id`, `node_type`, `operation`, `output`, `path`,
     * `source_automation_id`, `source_automation_version`, `status` and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are
     * `correlation_id`, `error_type`, `node_id`, `node_type`, `output` or `path`. Valid field combinations are any
     * combination of `automation_id`, `automation_run_id`, `correlation_id`, `error_type`, `node_id`, `node_type`,
     * `operation`, `output`, `path`, `source_automation_id`, `source_automation_version`, `status` and `created_at`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are
     * `source_automation_version` and `created_at`. Valid field combinations are any combination of `automation_id`,
     * `automation_run_id`, `correlation_id`, `error_type`, `node_id`, `node_type`, `operation`, `output`, `path`,
     * `source_automation_id`, `source_automation_version`, `status` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `source_automation_version` and `created_at`. Valid field combinations are any combination of `automation_id`,
     * `automation_run_id`, `correlation_id`, `error_type`, `node_id`, `node_type`, `operation`, `output`, `path`,
     * `source_automation_id`, `source_automation_version`, `status` and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = AutomationLog
