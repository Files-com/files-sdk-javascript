import Files from '../Files'

declare class AgentPushUpdate {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AgentPushUpdate.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AgentPushUpdate.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Pushed agent version */
  readonly version?: string | null

  /** Update accepted or reason */
  readonly message?: string | null

  /** Installed agent version */
  readonly current_version?: string | null

  /** Pending agent version or null */
  readonly pending_version?: string | null

  /** Last error message or null */
  readonly last_error?: string | null

  /** Error code */
  readonly error?: string | null

  /** Pushed agent version */
  getVersion(): string | null | undefined

  /** Update accepted or reason */
  getMessage(): string | null | undefined

  /** Installed agent version */
  getCurrentVersion(): string | null | undefined

  /** Pending agent version or null */
  getPendingVersion(): string | null | undefined

  /** Last error message or null */
  getLastError(): string | null | undefined

  /** Error code */
  getError(): string | null | undefined
}

declare namespace AgentPushUpdate {
  /** The fields of `AgentPushUpdate` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Pushed agent version */
    version?: string | null

    /** Update accepted or reason */
    message?: string | null

    /** Installed agent version */
    current_version?: string | null

    /** Pending agent version or null */
    pending_version?: string | null

    /** Last error message or null */
    last_error?: string | null

    /** Error code */
    error?: string | null
  }
}

export default AgentPushUpdate
