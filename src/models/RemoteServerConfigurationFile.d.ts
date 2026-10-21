import Files from '../Files'

/**
 * A RemoteServerConfigurationFile is a configuration file (required for some Remote Server integrations, such as the
 * Files.com Agent).
 */
declare class RemoteServerConfigurationFile {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: RemoteServerConfigurationFile.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: RemoteServerConfigurationFile.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The remote server ID of the agent */
  readonly id?: number | null

  /** The permission set for the agent ['read_write', 'read_only', 'write_only'] */
  readonly permission_set?: string | null

  /** The private key for the agent */
  readonly private_key?: string | null

  /** Files.com subdomain site name */
  readonly subdomain?: string | null

  /** The root directory for the agent */
  readonly root?: string | null

  /** Optional customer-facing name for this Agent installation */
  readonly node_name?: string | null

  /** Follow symlinks when traversing directories */
  readonly follow_links?: boolean | null

  /** Preferred network protocol ['udp', 'tcp'] (default udp) */
  readonly prefer_protocol?: string | null

  /** DNS lookup method ['auto','doh','system'] (default auto) */
  readonly dns?: string | null

  /** Proxy all outbound traffic through files.com proxy server */
  readonly proxy_all_outbound?: boolean | null

  /** Custom site endpoint URL */
  readonly endpoint_override?: string | null

  /** Log file name and location */
  readonly log_file?: string | null

  /** Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal'] (default info) */
  readonly log_level?: string | null

  /** Log route for agent logs. (default 5) */
  readonly log_rotate_num?: number | null

  /** Log route size in MB for agent logs. (default 20) */
  readonly log_rotate_size?: number | null

  /** Maximum number of concurrent jobs (default 500) */
  readonly override_max_concurrent_jobs?: number | null

  /** Graceful shutdown timeout in seconds (default 15) */
  readonly graceful_shutdown_timeout?: number | null

  /**
   * File transfer (upload/download) rate limit
   *  `<limit>-<period>`, with the given periods:
   * * 'S': second
   * * 'M': minute
   * * 'H': hour
   * * 'D': day
   * Examples:
   * * 5 requests/second: '5-S'
   * * 10 requests/minute: '10-M'
   * * 1000 requests/hour: '1000-H'
   * * 2000 requests/day: '2000-D'
   */
  readonly transfer_rate_limit?: string | null

  /** Auto update policy ['manual_trigger', 'critical_only', 'always', 'never'] (default always) */
  readonly auto_update_policy?: string | null

  /** The remote server ID of the agent */
  getId(): number | null | undefined

  /** The permission set for the agent ['read_write', 'read_only', 'write_only'] */
  getPermissionSet(): string | null | undefined

  /** The private key for the agent */
  getPrivateKey(): string | null | undefined

  /** Files.com subdomain site name */
  getSubdomain(): string | null | undefined

  /** The root directory for the agent */
  getRoot(): string | null | undefined

  /** Optional customer-facing name for this Agent installation */
  getNodeName(): string | null | undefined

  /** Follow symlinks when traversing directories */
  getFollowLinks(): boolean | null | undefined

  /** Preferred network protocol ['udp', 'tcp'] (default udp) */
  getPreferProtocol(): string | null | undefined

  /** DNS lookup method ['auto','doh','system'] (default auto) */
  getDns(): string | null | undefined

  /** Proxy all outbound traffic through files.com proxy server */
  getProxyAllOutbound(): boolean | null | undefined

  /** Custom site endpoint URL */
  getEndpointOverride(): string | null | undefined

  /** Log file name and location */
  getLogFile(): string | null | undefined

  /** Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal'] (default info) */
  getLogLevel(): string | null | undefined

  /** Log route for agent logs. (default 5) */
  getLogRotateNum(): number | null | undefined

  /** Log route size in MB for agent logs. (default 20) */
  getLogRotateSize(): number | null | undefined

  /** Maximum number of concurrent jobs (default 500) */
  getOverrideMaxConcurrentJobs(): number | null | undefined

  /** Graceful shutdown timeout in seconds (default 15) */
  getGracefulShutdownTimeout(): number | null | undefined

  /**
   * File transfer (upload/download) rate limit
   *  `<limit>-<period>`, with the given periods:
   * * 'S': second
   * * 'M': minute
   * * 'H': hour
   * * 'D': day
   * Examples:
   * * 5 requests/second: '5-S'
   * * 10 requests/minute: '10-M'
   * * 1000 requests/hour: '1000-H'
   * * 2000 requests/day: '2000-D'
   */
  getTransferRateLimit(): string | null | undefined

  /** Auto update policy ['manual_trigger', 'critical_only', 'always', 'never'] (default always) */
  getAutoUpdatePolicy(): string | null | undefined
}

declare namespace RemoteServerConfigurationFile {
  /** The fields of `RemoteServerConfigurationFile` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The remote server ID of the agent */
    id?: number | null

    /** The permission set for the agent ['read_write', 'read_only', 'write_only'] */
    permission_set?: string | null

    /** The private key for the agent */
    private_key?: string | null

    /** Files.com subdomain site name */
    subdomain?: string | null

    /** The root directory for the agent */
    root?: string | null

    /** Optional customer-facing name for this Agent installation */
    node_name?: string | null

    /** Follow symlinks when traversing directories */
    follow_links?: boolean | null

    /** Preferred network protocol ['udp', 'tcp'] (default udp) */
    prefer_protocol?: string | null

    /** DNS lookup method ['auto','doh','system'] (default auto) */
    dns?: string | null

    /** Proxy all outbound traffic through files.com proxy server */
    proxy_all_outbound?: boolean | null

    /** Custom site endpoint URL */
    endpoint_override?: string | null

    /** Log file name and location */
    log_file?: string | null

    /** Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal'] (default info) */
    log_level?: string | null

    /** Log route for agent logs. (default 5) */
    log_rotate_num?: number | null

    /** Log route size in MB for agent logs. (default 20) */
    log_rotate_size?: number | null

    /** Maximum number of concurrent jobs (default 500) */
    override_max_concurrent_jobs?: number | null

    /** Graceful shutdown timeout in seconds (default 15) */
    graceful_shutdown_timeout?: number | null

    /**
     * File transfer (upload/download) rate limit
     *  `<limit>-<period>`, with the given periods:
     * * 'S': second
     * * 'M': minute
     * * 'H': hour
     * * 'D': day
     * Examples:
     * * 5 requests/second: '5-S'
     * * 10 requests/minute: '10-M'
     * * 1000 requests/hour: '1000-H'
     * * 2000 requests/day: '2000-D'
     */
    transfer_rate_limit?: string | null

    /** Auto update policy ['manual_trigger', 'critical_only', 'always', 'never'] (default always) */
    auto_update_policy?: string | null
  }
}

export default RemoteServerConfigurationFile
