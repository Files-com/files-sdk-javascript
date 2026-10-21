import Files = require('../Files')

/** An ExpectationEvaluation records one open or closed window for an Expectation. */
declare class ExpectationEvaluation {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ExpectationEvaluation.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ExpectationEvaluation.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** ExpectationEvaluation ID */
  readonly id?: number | null

  /** Workspace ID. `0` means the default workspace. */
  readonly workspace_id?: number | null

  /** Expectation ID. */
  readonly expectation_id?: number | null

  /** Evaluation status. */
  readonly status?: 'open' | 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString | null

  /** How the evaluation window was opened. */
  readonly opened_via?: 'schedule' | 'manual' | 'upload' | Files.OtherString | null

  /** When the evaluation row was opened. */
  readonly opened_at?: Files.DateTimeString | null

  /** Logical start of the candidate window. */
  readonly window_start_at?: Files.DateTimeString | null

  /** Actual candidate cutoff boundary for the window. */
  readonly window_end_at?: Files.DateTimeString | null

  /** Logical due boundary for schedule-driven windows. */
  readonly deadline_at?: Files.DateTimeString | null

  /** Logical cutoff for late acceptance, when present. */
  readonly late_acceptance_cutoff_at?: Files.DateTimeString | null

  /** Hard stop after which the window may not remain open. */
  readonly hard_close_at?: Files.DateTimeString | null

  /** When the evaluation row was finalized. */
  readonly closed_at?: Files.DateTimeString | null

  /** Captured evidence for files that matched the window. */
  readonly matched_files?: Files.JsonObject[] | null

  /** Captured evidence for required files that were missing. */
  readonly missing_files?: Files.JsonObject[] | null

  /** Captured criteria failures for the window, including file-scoped FTS errors and returned validation details. */
  readonly criteria_errors?: string[] | null

  /** Compact evaluator summary payload. */
  readonly summary?: Files.JsonObject | null

  /** Creation time. */
  readonly created_at?: Files.DateTimeString | null

  /** Last update time. */
  readonly updated_at?: Files.DateTimeString | null

  /** ExpectationEvaluation ID */
  getId(): number | null | undefined

  /** Workspace ID. `0` means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Expectation ID. */
  getExpectationId(): number | null | undefined

  /** Evaluation status. */
  getStatus(): 'open' | 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString | null | undefined

  /** How the evaluation window was opened. */
  getOpenedVia(): 'schedule' | 'manual' | 'upload' | Files.OtherString | null | undefined

  /** When the evaluation row was opened. */
  getOpenedAt(): Files.DateTimeString | null | undefined

  /** Logical start of the candidate window. */
  getWindowStartAt(): Files.DateTimeString | null | undefined

  /** Actual candidate cutoff boundary for the window. */
  getWindowEndAt(): Files.DateTimeString | null | undefined

  /** Logical due boundary for schedule-driven windows. */
  getDeadlineAt(): Files.DateTimeString | null | undefined

  /** Logical cutoff for late acceptance, when present. */
  getLateAcceptanceCutoffAt(): Files.DateTimeString | null | undefined

  /** Hard stop after which the window may not remain open. */
  getHardCloseAt(): Files.DateTimeString | null | undefined

  /** When the evaluation row was finalized. */
  getClosedAt(): Files.DateTimeString | null | undefined

  /** Captured evidence for files that matched the window. */
  getMatchedFiles(): Files.JsonObject[] | null | undefined

  /** Captured evidence for required files that were missing. */
  getMissingFiles(): Files.JsonObject[] | null | undefined

  /** Captured criteria failures for the window, including file-scoped FTS errors and returned validation details. */
  getCriteriaErrors(): string[] | null | undefined

  /** Compact evaluator summary payload. */
  getSummary(): Files.JsonObject | null | undefined

  /** Creation time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Last update time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** List Expectation Evaluations */
  static list(params?: ExpectationEvaluation.ListParams, options?: Files.RequestOptions): Promise<ExpectationEvaluation[]>

  /** Alias of `list()`. */
  static all(params?: ExpectationEvaluation.ListParams, options?: Files.RequestOptions): Promise<ExpectationEvaluation[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: ExpectationEvaluation.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ExpectationEvaluation>

  /**
   * Show Expectation Evaluation
   * @param id - Expectation Evaluation ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ExpectationEvaluation>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ExpectationEvaluation>

  static default: typeof ExpectationEvaluation
}

declare namespace ExpectationEvaluation {
  /** The fields of `ExpectationEvaluation` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** ExpectationEvaluation ID */
    id?: number | null

    /** Workspace ID. `0` means the default workspace. */
    workspace_id?: number | null

    /** Expectation ID. */
    expectation_id?: number | null

    /** Evaluation status. */
    status?: 'open' | 'success' | 'late' | 'missing' | 'invalid' | Files.OtherString | null

    /** How the evaluation window was opened. */
    opened_via?: 'schedule' | 'manual' | 'upload' | Files.OtherString | null

    /** When the evaluation row was opened. */
    opened_at?: Files.DateTimeString | null

    /** Logical start of the candidate window. */
    window_start_at?: Files.DateTimeString | null

    /** Actual candidate cutoff boundary for the window. */
    window_end_at?: Files.DateTimeString | null

    /** Logical due boundary for schedule-driven windows. */
    deadline_at?: Files.DateTimeString | null

    /** Logical cutoff for late acceptance, when present. */
    late_acceptance_cutoff_at?: Files.DateTimeString | null

    /** Hard stop after which the window may not remain open. */
    hard_close_at?: Files.DateTimeString | null

    /** When the evaluation row was finalized. */
    closed_at?: Files.DateTimeString | null

    /** Captured evidence for files that matched the window. */
    matched_files?: Files.JsonObject[] | null

    /** Captured evidence for required files that were missing. */
    missing_files?: Files.JsonObject[] | null

    /** Captured criteria failures for the window, including file-scoped FTS errors and returned validation details. */
    criteria_errors?: string[] | null

    /** Compact evaluator summary payload. */
    summary?: Files.JsonObject | null

    /** Creation time. */
    created_at?: Files.DateTimeString | null

    /** Last update time. */
    updated_at?: Files.DateTimeString | null
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
     * `created_at` or `expectation_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `expectation_id` and `workspace_id`. Valid field combinations are `[ workspace_id, expectation_id ]`.
     */
    filter?: Files.JsonObject
  }
}

export = ExpectationEvaluation
