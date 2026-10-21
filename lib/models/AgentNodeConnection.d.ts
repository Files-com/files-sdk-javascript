import Files = require('../Files')

declare class AgentNodeConnection {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AgentNodeConnection.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AgentNodeConnection.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** How the Agent process uses this proxy connection */
  readonly mode?: 'active' | 'standby' | Files.OtherString | null

  /** Whether this connection was observed recently and has not disconnected */
  readonly status?: 'available' | 'unavailable' | Files.OtherString | null

  /** Most recent successful observation for this connection */
  readonly last_seen_at?: Files.DateTimeString | null

  /** How the Agent process uses this proxy connection */
  getMode(): 'active' | 'standby' | Files.OtherString | null | undefined

  /** Whether this connection was observed recently and has not disconnected */
  getStatus(): 'available' | 'unavailable' | Files.OtherString | null | undefined

  /** Most recent successful observation for this connection */
  getLastSeenAt(): Files.DateTimeString | null | undefined

  static default: typeof AgentNodeConnection
}

declare namespace AgentNodeConnection {
  /** The fields of `AgentNodeConnection` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** How the Agent process uses this proxy connection */
    mode?: 'active' | 'standby' | Files.OtherString | null

    /** Whether this connection was observed recently and has not disconnected */
    status?: 'available' | 'unavailable' | Files.OtherString | null

    /** Most recent successful observation for this connection */
    last_seen_at?: Files.DateTimeString | null
  }
}

export = AgentNodeConnection
