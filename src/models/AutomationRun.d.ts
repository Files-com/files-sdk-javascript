import Files from '../Files'
import AutomationExecutionNode from './AutomationExecutionNode'

/** An AutomationRun is a record with information about a single execution of a given Automation. */
declare class AutomationRun {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationRun.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationRun.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** ID. */
  readonly id?: number | null

  /** ID of the associated Automation. */
  readonly automation_id?: number | null

  /** ID of the immutable Automation version pinned by this run. */
  readonly automation_version_id?: number | null

  /** Pinned Automation v2 definition version. */
  readonly version?: number | null

  /** Workspace ID. */
  readonly workspace_id?: number | null

  /** Date/time at which cancellation was requested. */
  readonly cancel_requested_at?: Files.DateTimeString | null

  /** Automation run completion/failure date/time. */
  readonly completed_at?: Files.DateTimeString | null

  /** Automation run start date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** If set, this automation will be retried at this date/time due to `failure` or `partial_failure`. */
  readonly retry_at?: Files.DateTimeString | null

  /** If set, this Automation run was retried due to `failure` or `partial_failure`. */
  readonly retried_at?: Files.DateTimeString | null

  /** ID of the run that is or will be retrying this run. */
  readonly retried_in_run_id?: number | null

  /** ID of the original run that this run is retrying. */
  readonly retry_of_run_id?: number | null

  /** ID of the run whose persisted node outputs this run reused. */
  readonly rerun_of_run_id?: number | null

  /** Node at which this run resumed execution. */
  readonly rerun_from_node_id?: string | null

  /** Automation run runtime. */
  readonly runtime?: number | null

  /**
   * The status of the AutomationRun. One of `queued`, `running`, `success`, `partial_failure`, `failure`, `skipped`, or
   * `canceled`.
   */
  readonly status?: 'running' | 'success' | 'partial_failure' | 'failure' | 'skipped' | 'queued' | 'canceled' | Files.OtherString | null

  /** Count of successful operations. */
  readonly successful_operations?: number | null

  /** Count of failed operations. */
  readonly failed_operations?: number | null

  /**
   * Automation definition snapshot pinned by this run. For performance reasons, this is not provided when listing
   * Automation runs.
   */
  readonly definition?: Files.JsonObject | null

  /**
   * Status and execution stage for each node in this run. For performance reasons, this is not provided when listing
   * Automation runs.
   */
  readonly node_states?: Files.JsonObject | null

  /**
   * Execution status, timing, and bounded output summaries for each node. For performance reasons, this is not provided
   * when listing Automation runs.
   */
  readonly execution_nodes?: AutomationExecutionNode.Attributes[] | null

  /** Link to the run journal artifact. */
  readonly journal_url?: string | null

  /** Link to status messages log file. */
  readonly status_messages_url?: string | null

  /** ID. */
  getId(): number | null | undefined

  /** ID of the associated Automation. */
  getAutomationId(): number | null | undefined

  /** ID of the immutable Automation version pinned by this run. */
  getAutomationVersionId(): number | null | undefined

  /** Pinned Automation v2 definition version. */
  getVersion(): number | null | undefined

  /** Workspace ID. */
  getWorkspaceId(): number | null | undefined

  /** Date/time at which cancellation was requested. */
  getCancelRequestedAt(): Files.DateTimeString | null | undefined

  /** Automation run completion/failure date/time. */
  getCompletedAt(): Files.DateTimeString | null | undefined

  /** Automation run start date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** If set, this automation will be retried at this date/time due to `failure` or `partial_failure`. */
  getRetryAt(): Files.DateTimeString | null | undefined

  /** If set, this Automation run was retried due to `failure` or `partial_failure`. */
  getRetriedAt(): Files.DateTimeString | null | undefined

  /** ID of the run that is or will be retrying this run. */
  getRetriedInRunId(): number | null | undefined

  /** ID of the original run that this run is retrying. */
  getRetryOfRunId(): number | null | undefined

  /** ID of the run whose persisted node outputs this run reused. */
  getRerunOfRunId(): number | null | undefined

  /** Node at which this run resumed execution. */
  getRerunFromNodeId(): string | null | undefined

  /** Automation run runtime. */
  getRuntime(): number | null | undefined

  /**
   * The status of the AutomationRun. One of `queued`, `running`, `success`, `partial_failure`, `failure`, `skipped`, or
   * `canceled`.
   */
  getStatus(): 'running' | 'success' | 'partial_failure' | 'failure' | 'skipped' | 'queued' | 'canceled' | Files.OtherString | null | undefined

  /** Count of successful operations. */
  getSuccessfulOperations(): number | null | undefined

  /** Count of failed operations. */
  getFailedOperations(): number | null | undefined

  /**
   * Automation definition snapshot pinned by this run. For performance reasons, this is not provided when listing
   * Automation runs.
   */
  getDefinition(): Files.JsonObject | null | undefined

  /**
   * Status and execution stage for each node in this run. For performance reasons, this is not provided when listing
   * Automation runs.
   */
  getNodeStates(): Files.JsonObject | null | undefined

  /**
   * Execution status, timing, and bounded output summaries for each node. For performance reasons, this is not provided
   * when listing Automation runs.
   */
  getExecutionNodes(): AutomationExecutionNode.Attributes[] | null | undefined

  /** Link to the run journal artifact. */
  getJournalUrl(): string | null | undefined

  /** Link to status messages log file. */
  getStatusMessagesUrl(): string | null | undefined

  /** Cancel Automation Run */
  cancel(params?: Files.NoParams): Promise<AutomationRun>

  /** Re-run Automation from Node */
  rerun(params?: AutomationRun.RerunParams): Promise<AutomationRun>

  /** List Automation Runs */
  static list(params: AutomationRun.ListParams, options?: Files.RequestOptions): Promise<AutomationRun[]>

  /** Alias of `list()`. */
  static all(params: AutomationRun.ListParams, options?: Files.RequestOptions): Promise<AutomationRun[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params: AutomationRun.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<AutomationRun>

  /**
   * Show Automation Run
   * @param id - Automation Run ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AutomationRun>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AutomationRun>

  /**
   * Show Automation Run Node
   * @param id - Automation Run ID.
   */
  static findNode(id: number, params: AutomationRun.FindNodeParams, options?: Files.RequestOptions): Promise<AutomationExecutionNode>
}

declare namespace AutomationRun {
  /** The fields of `AutomationRun` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** ID. */
    id?: number | null

    /** ID of the associated Automation. */
    automation_id?: number | null

    /** ID of the immutable Automation version pinned by this run. */
    automation_version_id?: number | null

    /** Pinned Automation v2 definition version. */
    version?: number | null

    /** Workspace ID. */
    workspace_id?: number | null

    /** Date/time at which cancellation was requested. */
    cancel_requested_at?: Files.DateTimeString | null

    /** Automation run completion/failure date/time. */
    completed_at?: Files.DateTimeString | null

    /** Automation run start date/time. */
    created_at?: Files.DateTimeString | null

    /** If set, this automation will be retried at this date/time due to `failure` or `partial_failure`. */
    retry_at?: Files.DateTimeString | null

    /** If set, this Automation run was retried due to `failure` or `partial_failure`. */
    retried_at?: Files.DateTimeString | null

    /** ID of the run that is or will be retrying this run. */
    retried_in_run_id?: number | null

    /** ID of the original run that this run is retrying. */
    retry_of_run_id?: number | null

    /** ID of the run whose persisted node outputs this run reused. */
    rerun_of_run_id?: number | null

    /** Node at which this run resumed execution. */
    rerun_from_node_id?: string | null

    /** Automation run runtime. */
    runtime?: number | null

    /**
     * The status of the AutomationRun. One of `queued`, `running`, `success`, `partial_failure`, `failure`, `skipped`,
     * or `canceled`.
     */
    status?: 'running' | 'success' | 'partial_failure' | 'failure' | 'skipped' | 'queued' | 'canceled' | Files.OtherString | null

    /** Count of successful operations. */
    successful_operations?: number | null

    /** Count of failed operations. */
    failed_operations?: number | null

    /**
     * Automation definition snapshot pinned by this run. For performance reasons, this is not provided when listing
     * Automation runs.
     */
    definition?: Files.JsonObject | null

    /**
     * Status and execution stage for each node in this run. For performance reasons, this is not provided when listing
     * Automation runs.
     */
    node_states?: Files.JsonObject | null

    /**
     * Execution status, timing, and bounded output summaries for each node. For performance reasons, this is not
     * provided when listing Automation runs.
     */
    execution_nodes?: AutomationExecutionNode.Attributes[] | null

    /** Link to the run journal artifact. */
    journal_url?: string | null

    /** Link to status messages log file. */
    status_messages_url?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are
     * `automation_id`, `created_at` or `status`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `status`,
     * `workspace_id` or `automation_id`. Valid field combinations are `[ workspace_id, status ]`, `[ automation_id,
     * status ]`, `[ workspace_id, automation_id ]` or `[ workspace_id, automation_id, status ]`.
     */
    filter?: Files.JsonObject

    /** ID of the associated Automation. */
    automation_id: number
  }

  interface FindNodeParams {
    /** Node ID from the pinned Automation definition. */
    node_id: string
  }

  interface RerunParams {
    /** Required: when not given, this object's `node_id` is used. Node ID at which execution should resume. */
    node_id?: string
  }
}

export default AutomationRun
