import Files from '../Files'
import AgentNodeInstance from './AgentNodeInstance'

declare class AgentNode {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AgentNode.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AgentNode.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Stable Agent installation ID */
  readonly node_id?: string | null

  /** Customer-configured Agent node name */
  readonly name?: string | null

  /** Hostname reported by the Agent */
  readonly hostname?: string | null

  /** Configured traffic preference */
  readonly availability_role?: 'primary' | 'auto' | 'standby' | Files.OtherString | null

  /** Whether this node currently has an available Agent instance */
  readonly status?: 'available' | 'unavailable' | Files.OtherString | null

  /** Whether this node is the current default route for new unscoped work */
  readonly is_default?: boolean | null

  /**
   * Whether the proxy recently validated a direct connection to this Agent node. False means direct transfers are
   * enabled but not currently available; null means disabled or unsupported.
   */
  readonly direct_transfer_available?: boolean | null

  /** Most recent successful node observation */
  readonly last_seen_at?: Files.DateTimeString | null

  /** Current Agent processes for this node */
  readonly instances?: AgentNodeInstance.Attributes[] | null

  /** Stable Agent installation ID */
  getNodeId(): string | null | undefined

  /** Customer-configured Agent node name */
  getName(): string | null | undefined

  /** Hostname reported by the Agent */
  getHostname(): string | null | undefined

  /** Configured traffic preference */
  getAvailabilityRole(): 'primary' | 'auto' | 'standby' | Files.OtherString | null | undefined

  /** Whether this node currently has an available Agent instance */
  getStatus(): 'available' | 'unavailable' | Files.OtherString | null | undefined

  /** Whether this node is the current default route for new unscoped work */
  getIsDefault(): boolean | null | undefined

  /**
   * Whether the proxy recently validated a direct connection to this Agent node. False means direct transfers are
   * enabled but not currently available; null means disabled or unsupported.
   */
  getDirectTransferAvailable(): boolean | null | undefined

  /** Most recent successful node observation */
  getLastSeenAt(): Files.DateTimeString | null | undefined

  /** Current Agent processes for this node */
  getInstances(): AgentNodeInstance.Attributes[] | null | undefined
}

declare namespace AgentNode {
  /** The fields of `AgentNode` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Stable Agent installation ID */
    node_id?: string | null

    /** Customer-configured Agent node name */
    name?: string | null

    /** Hostname reported by the Agent */
    hostname?: string | null

    /** Configured traffic preference */
    availability_role?: 'primary' | 'auto' | 'standby' | Files.OtherString | null

    /** Whether this node currently has an available Agent instance */
    status?: 'available' | 'unavailable' | Files.OtherString | null

    /** Whether this node is the current default route for new unscoped work */
    is_default?: boolean | null

    /**
     * Whether the proxy recently validated a direct connection to this Agent node. False means direct transfers are
     * enabled but not currently available; null means disabled or unsupported.
     */
    direct_transfer_available?: boolean | null

    /** Most recent successful node observation */
    last_seen_at?: Files.DateTimeString | null

    /** Current Agent processes for this node */
    instances?: AgentNodeInstance.Attributes[] | null
  }
}

export default AgentNode
