import Files = require('../Files')

declare class AutomationExecutionNode {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationExecutionNode.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationExecutionNode.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Node ID from the pinned Automation definition. */
  readonly node_id?: string | null

  /** Node type. */
  readonly node_type?: string | null

  /** Node status. */
  readonly status?: string | null

  /** Current node execution stage. */
  readonly run_stage?: string | null

  /** Whether this node reused persisted output from an earlier run. */
  readonly reused?: boolean | null

  /** Count of successful operations in this node. */
  readonly successful_operations?: number | null

  /** Count of failed operations in this node. */
  readonly failed_operations?: number | null

  /** When this node started. */
  readonly started_at?: Files.DateTimeString | null

  /** When this node completed. */
  readonly completed_at?: Files.DateTimeString | null

  /** Node runtime in milliseconds. */
  readonly duration_ms?: number | null

  /** Ordered inbound edge references. */
  readonly inputs?: Files.JsonObject[] | null

  /** Output counts, item kinds, and typed-error summaries by outlet. */
  readonly outputs?: Files.JsonObject | null

  /** Available input items grouped by inlet. Resolve large values with item_refs and item_values. */
  readonly input_items?: Files.JsonObject | null

  /** Output items grouped by outlet. Resolve large values with item_refs and item_values. */
  readonly output_items?: Files.JsonObject | null

  /**
   * References with a path from the response root and a digest. Replace the null at each path with the value for that
   * digest. Path segments are literal object keys or zero-based array indexes.
   */
  readonly item_refs?: Files.JsonObject[] | null

  /**
   * Ordered entries with a digest, a value, and optional item_refs relative to that value. References inside entries
   * point to earlier entries in this array.
   */
  readonly item_values?: Files.JsonObject[] | null

  /** Node ID from the pinned Automation definition. */
  getNodeId(): string | null | undefined

  /** Node type. */
  getNodeType(): string | null | undefined

  /** Node status. */
  getStatus(): string | null | undefined

  /** Current node execution stage. */
  getRunStage(): string | null | undefined

  /** Whether this node reused persisted output from an earlier run. */
  getReused(): boolean | null | undefined

  /** Count of successful operations in this node. */
  getSuccessfulOperations(): number | null | undefined

  /** Count of failed operations in this node. */
  getFailedOperations(): number | null | undefined

  /** When this node started. */
  getStartedAt(): Files.DateTimeString | null | undefined

  /** When this node completed. */
  getCompletedAt(): Files.DateTimeString | null | undefined

  /** Node runtime in milliseconds. */
  getDurationMs(): number | null | undefined

  /** Ordered inbound edge references. */
  getInputs(): Files.JsonObject[] | null | undefined

  /** Output counts, item kinds, and typed-error summaries by outlet. */
  getOutputs(): Files.JsonObject | null | undefined

  /** Available input items grouped by inlet. Resolve large values with item_refs and item_values. */
  getInputItems(): Files.JsonObject | null | undefined

  /** Output items grouped by outlet. Resolve large values with item_refs and item_values. */
  getOutputItems(): Files.JsonObject | null | undefined

  /**
   * References with a path from the response root and a digest. Replace the null at each path with the value for that
   * digest. Path segments are literal object keys or zero-based array indexes.
   */
  getItemRefs(): Files.JsonObject[] | null | undefined

  /**
   * Ordered entries with a digest, a value, and optional item_refs relative to that value. References inside entries
   * point to earlier entries in this array.
   */
  getItemValues(): Files.JsonObject[] | null | undefined

  static default: typeof AutomationExecutionNode
}

declare namespace AutomationExecutionNode {
  /** The fields of `AutomationExecutionNode` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Node ID from the pinned Automation definition. */
    node_id?: string | null

    /** Node type. */
    node_type?: string | null

    /** Node status. */
    status?: string | null

    /** Current node execution stage. */
    run_stage?: string | null

    /** Whether this node reused persisted output from an earlier run. */
    reused?: boolean | null

    /** Count of successful operations in this node. */
    successful_operations?: number | null

    /** Count of failed operations in this node. */
    failed_operations?: number | null

    /** When this node started. */
    started_at?: Files.DateTimeString | null

    /** When this node completed. */
    completed_at?: Files.DateTimeString | null

    /** Node runtime in milliseconds. */
    duration_ms?: number | null

    /** Ordered inbound edge references. */
    inputs?: Files.JsonObject[] | null

    /** Output counts, item kinds, and typed-error summaries by outlet. */
    outputs?: Files.JsonObject | null

    /** Available input items grouped by inlet. Resolve large values with item_refs and item_values. */
    input_items?: Files.JsonObject | null

    /** Output items grouped by outlet. Resolve large values with item_refs and item_values. */
    output_items?: Files.JsonObject | null

    /**
     * References with a path from the response root and a digest. Replace the null at each path with the value for that
     * digest. Path segments are literal object keys or zero-based array indexes.
     */
    item_refs?: Files.JsonObject[] | null

    /**
     * Ordered entries with a digest, a value, and optional item_refs relative to that value. References inside entries
     * point to earlier entries in this array.
     */
    item_values?: Files.JsonObject[] | null
  }
}

export = AutomationExecutionNode
