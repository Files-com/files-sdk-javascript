import Files = require('../Files')
import AgentNodeConnection = require('./AgentNodeConnection')

declare class AgentNodeInstance {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AgentNodeInstance.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AgentNodeInstance.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Ephemeral ID for this running Agent process */
  readonly instance_id?: string | null

  /** Role of this process during an Agent update */
  readonly process_state?: 'default' | 'draining' | Files.OtherString | null

  /** Whether this process has an available proxy connection */
  readonly status?: 'available' | 'unavailable' | Files.OtherString | null

  /** Whether this process receives new unscoped work for its node */
  readonly is_default?: boolean | null

  /** Agent version reported by this process */
  readonly agent_version?: string | null

  /** Most recent successful observation for this process */
  readonly last_seen_at?: Files.DateTimeString | null

  /** Proxy connections observed for this process */
  readonly connections?: AgentNodeConnection.Attributes[] | null

  /** Ephemeral ID for this running Agent process */
  getInstanceId(): string | null | undefined

  /** Role of this process during an Agent update */
  getProcessState(): 'default' | 'draining' | Files.OtherString | null | undefined

  /** Whether this process has an available proxy connection */
  getStatus(): 'available' | 'unavailable' | Files.OtherString | null | undefined

  /** Whether this process receives new unscoped work for its node */
  getIsDefault(): boolean | null | undefined

  /** Agent version reported by this process */
  getAgentVersion(): string | null | undefined

  /** Most recent successful observation for this process */
  getLastSeenAt(): Files.DateTimeString | null | undefined

  /** Proxy connections observed for this process */
  getConnections(): AgentNodeConnection.Attributes[] | null | undefined

  static default: typeof AgentNodeInstance
}

declare namespace AgentNodeInstance {
  /** The fields of `AgentNodeInstance` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Ephemeral ID for this running Agent process */
    instance_id?: string | null

    /** Role of this process during an Agent update */
    process_state?: 'default' | 'draining' | Files.OtherString | null

    /** Whether this process has an available proxy connection */
    status?: 'available' | 'unavailable' | Files.OtherString | null

    /** Whether this process receives new unscoped work for its node */
    is_default?: boolean | null

    /** Agent version reported by this process */
    agent_version?: string | null

    /** Most recent successful observation for this process */
    last_seen_at?: Files.DateTimeString | null

    /** Proxy connections observed for this process */
    connections?: AgentNodeConnection.Attributes[] | null
  }
}

export = AgentNodeInstance
