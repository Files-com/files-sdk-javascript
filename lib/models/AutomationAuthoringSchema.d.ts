import Files = require('../Files')

declare class AutomationAuthoringSchema {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationAuthoringSchema.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationAuthoringSchema.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** JSON Schema for active Automation v2 graph definitions. */
  readonly definition_schema?: Files.JsonObject | null

  /** Typed error families accepted by Automation v2 on_error rules. */
  readonly error_families?: Files.JsonObject[] | null

  /** Active Automation v2 node authoring metadata. */
  readonly nodes?: Files.JsonObject[] | null

  /** Stable public URL for the Automation v2 graph definition JSON Schema. */
  readonly schema_url?: string | null

  /** JSON Schema for active Automation v2 graph definitions. */
  getDefinitionSchema(): Files.JsonObject | null | undefined

  /** Typed error families accepted by Automation v2 on_error rules. */
  getErrorFamilies(): Files.JsonObject[] | null | undefined

  /** Active Automation v2 node authoring metadata. */
  getNodes(): Files.JsonObject[] | null | undefined

  /** Stable public URL for the Automation v2 graph definition JSON Schema. */
  getSchemaUrl(): string | null | undefined

  static default: typeof AutomationAuthoringSchema
}

declare namespace AutomationAuthoringSchema {
  /** The fields of `AutomationAuthoringSchema` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** JSON Schema for active Automation v2 graph definitions. */
    definition_schema?: Files.JsonObject | null

    /** Typed error families accepted by Automation v2 on_error rules. */
    error_families?: Files.JsonObject[] | null

    /** Active Automation v2 node authoring metadata. */
    nodes?: Files.JsonObject[] | null

    /** Stable public URL for the Automation v2 graph definition JSON Schema. */
    schema_url?: string | null
  }
}

export = AutomationAuthoringSchema
