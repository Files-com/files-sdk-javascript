import Files = require('../Files')
import AutomationRun = require('./AutomationRun')
import FormField = require('./FormField')

declare class SharedWorkflow {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SharedWorkflow.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SharedWorkflow.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Shared Workflow ID. */
  readonly id?: number | null

  /** Name displayed to recipients. */
  readonly name?: string | null

  /** Description displayed to recipients. */
  readonly description?: string | null

  /** Revision required when submitting a Shared Workflow run. */
  readonly submission_revision?: string | null

  /** Current custom questions in display order. */
  readonly form_fields?: FormField.Attributes[] | null

  /** Shared Workflow ID. */
  getId(): number | null | undefined

  /** Name displayed to recipients. */
  getName(): string | null | undefined

  /** Description displayed to recipients. */
  getDescription(): string | null | undefined

  /** Revision required when submitting a Shared Workflow run. */
  getSubmissionRevision(): string | null | undefined

  /** Current custom questions in display order. */
  getFormFields(): FormField.Attributes[] | null | undefined

  /** Run a Shared Workflow */
  runWorkflow(params?: SharedWorkflow.RunWorkflowParams): Promise<AutomationRun>

  /** List Shared Workflows */
  static list(params?: SharedWorkflow.ListParams, options?: Files.RequestOptions): Promise<SharedWorkflow[]>

  /** Alias of `list()`. */
  static all(params?: SharedWorkflow.ListParams, options?: Files.RequestOptions): Promise<SharedWorkflow[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SharedWorkflow.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SharedWorkflow>

  /**
   * Show Shared Workflow
   * @param id - Shared Workflow ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SharedWorkflow>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SharedWorkflow>

  /**
   * Show a Shared Workflow run started by the recipient
   * @param id - Shared Workflow ID.
   * @param runId - ID of the run returned by the Shared Workflow submission.
   */
  static findRun(id: number, runId: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AutomationRun>

  static default: typeof SharedWorkflow
}

declare namespace SharedWorkflow {
  /** The fields of `SharedWorkflow` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Shared Workflow ID. */
    id?: number | null

    /** Name displayed to recipients. */
    name?: string | null

    /** Description displayed to recipients. */
    description?: string | null

    /** Revision required when submitting a Shared Workflow run. */
    submission_revision?: string | null

    /** Current custom questions in display order. */
    form_fields?: FormField.Attributes[] | null
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject
  }

  interface RunWorkflowParams {
    /**
     * Required: when not given, this object's `submission_revision` is used. Revision returned when opening the Shared
     * Workflow.
     */
    submission_revision?: string

    /**
     * Required: when not given, this object's `submission_id` is used. Client-generated UUID used to retry the same
     * submission without starting another run.
     */
    submission_id?: string

    /**
     * Required: when not given, this object's `file_path` is used. Path of a file the recipient can read, including a
     * file uploaded to a Snapshot created for this workflow.
     */
    file_path?: string
  }
}

export = SharedWorkflow
