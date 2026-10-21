import Files = require('../Files')

/** A Remote Mount Backend is used to provide high availability for a Remote Server Mount Folder Behavior. */
declare class RemoteMountBackend {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: RemoteMountBackend.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: RemoteMountBackend.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Path to the canary file used for health checks. */
  readonly canary_file_path?: string | null

  /** True if this backend is enabled. */
  readonly enabled?: boolean | null

  /** Number of consecutive failures before considering the backend unhealthy. */
  readonly fall?: number | null

  /** True if health checks are enabled for this backend. */
  readonly health_check_enabled?: boolean | null

  /** Array of recent health check results. */
  readonly health_check_results?: Files.JsonObject[] | null

  /** Type of health check to perform. */
  readonly health_check_type?: 'active' | 'passive' | Files.OtherString | null

  /** Unique identifier for this backend. */
  readonly id?: number | null

  /** Interval in seconds between health checks. */
  readonly interval?: number | null

  /** Minimum free CPU percentage required for this backend to be considered healthy. */
  readonly min_free_cpu?: Files.DecimalString | number | null

  /** Minimum free memory percentage required for this backend to be considered healthy. */
  readonly min_free_mem?: Files.DecimalString | number | null

  /** Priority of this backend. */
  readonly priority?: number | null

  /** Path on the remote server to treat as the root of this mount. */
  readonly remote_path?: string | null

  /** The remote server that this backend is associated with. */
  readonly remote_server_id?: number | null

  /** The mount ID of the Remote Server Mount that this backend is associated with. */
  readonly remote_server_mount_id?: number | null

  /** Number of consecutive successes before considering the backend healthy. */
  readonly rise?: number | null

  /** Status of this backend. */
  readonly status?: 'healthy' | 'degraded' | 'failed' | 'desynced' | Files.OtherString | null

  /** True if this backend is undergoing maintenance. */
  readonly undergoing_maintenance?: boolean | null

  /** Path to the canary file used for health checks. */
  getCanaryFilePath(): string | null | undefined

  /** True if this backend is enabled. */
  getEnabled(): boolean | null | undefined

  /** Number of consecutive failures before considering the backend unhealthy. */
  getFall(): number | null | undefined

  /** True if health checks are enabled for this backend. */
  getHealthCheckEnabled(): boolean | null | undefined

  /** Array of recent health check results. */
  getHealthCheckResults(): Files.JsonObject[] | null | undefined

  /** Type of health check to perform. */
  getHealthCheckType(): 'active' | 'passive' | Files.OtherString | null | undefined

  /** Unique identifier for this backend. */
  getId(): number | null | undefined

  /** Interval in seconds between health checks. */
  getInterval(): number | null | undefined

  /** Minimum free CPU percentage required for this backend to be considered healthy. */
  getMinFreeCpu(): Files.DecimalString | number | null | undefined

  /** Minimum free memory percentage required for this backend to be considered healthy. */
  getMinFreeMem(): Files.DecimalString | number | null | undefined

  /** Priority of this backend. */
  getPriority(): number | null | undefined

  /** Path on the remote server to treat as the root of this mount. */
  getRemotePath(): string | null | undefined

  /** The remote server that this backend is associated with. */
  getRemoteServerId(): number | null | undefined

  /** The mount ID of the Remote Server Mount that this backend is associated with. */
  getRemoteServerMountId(): number | null | undefined

  /** Number of consecutive successes before considering the backend healthy. */
  getRise(): number | null | undefined

  /** Status of this backend. */
  getStatus(): 'healthy' | 'degraded' | 'failed' | 'desynced' | Files.OtherString | null | undefined

  /** True if this backend is undergoing maintenance. */
  getUndergoingMaintenance(): boolean | null | undefined

  /** Path to the canary file used for health checks. */
  setCanaryFilePath(value: string): void

  /** True if this backend is enabled. */
  setEnabled(value: boolean): void

  /** Number of consecutive failures before considering the backend unhealthy. */
  setFall(value: number): void

  /** True if health checks are enabled for this backend. */
  setHealthCheckEnabled(value: boolean): void

  /** Array of recent health check results. */
  setHealthCheckResults(value: Files.JsonObject[]): void

  /** Type of health check to perform. */
  setHealthCheckType(value: 'active' | 'passive'): void

  /** Unique identifier for this backend. */
  setId(value: number): void

  /** Interval in seconds between health checks. */
  setInterval(value: number): void

  /** Minimum free CPU percentage required for this backend to be considered healthy. */
  setMinFreeCpu(value: number): void

  /** Minimum free memory percentage required for this backend to be considered healthy. */
  setMinFreeMem(value: number): void

  /** Priority of this backend. */
  setPriority(value: number): void

  /** Path on the remote server to treat as the root of this mount. */
  setRemotePath(value: string): void

  /** The remote server that this backend is associated with. */
  setRemoteServerId(value: number): void

  /** The mount ID of the Remote Server Mount that this backend is associated with. */
  setRemoteServerMountId(value: number): void

  /** Number of consecutive successes before considering the backend healthy. */
  setRise(value: number): void

  /** Status of this backend. */
  setStatus(value: 'healthy' | 'degraded' | 'failed' | 'desynced' | Files.OtherString): void

  /** True if this backend is undergoing maintenance. */
  setUndergoingMaintenance(value: boolean): void

  /** Reset backend status to healthy */
  resetStatus(params?: Files.NoParams): Promise<void>

  /** Update Remote Mount Backend */
  update(params?: RemoteMountBackend.UpdateParams): Promise<this>

  /** Delete Remote Mount Backend */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Remote Mount Backends */
  static list(params?: RemoteMountBackend.ListParams, options?: Files.RequestOptions): Promise<RemoteMountBackend[]>

  /** Alias of `list()`. */
  static all(params?: RemoteMountBackend.ListParams, options?: Files.RequestOptions): Promise<RemoteMountBackend[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: RemoteMountBackend.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<RemoteMountBackend>

  /**
   * Show Remote Mount Backend
   * @param id - Remote Mount Backend ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteMountBackend>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<RemoteMountBackend>

  /** Create Remote Mount Backend */
  static create(params: RemoteMountBackend.CreateParams, options?: Files.RequestOptions): Promise<RemoteMountBackend>

  static default: typeof RemoteMountBackend
}

declare namespace RemoteMountBackend {
  /** The fields of `RemoteMountBackend` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Path to the canary file used for health checks. */
    canary_file_path?: string | null

    /** True if this backend is enabled. */
    enabled?: boolean | null

    /** Number of consecutive failures before considering the backend unhealthy. */
    fall?: number | null

    /** True if health checks are enabled for this backend. */
    health_check_enabled?: boolean | null

    /** Array of recent health check results. */
    health_check_results?: Files.JsonObject[] | null

    /** Type of health check to perform. */
    health_check_type?: 'active' | 'passive' | Files.OtherString | null

    /** Unique identifier for this backend. */
    id?: number | null

    /** Interval in seconds between health checks. */
    interval?: number | null

    /** Minimum free CPU percentage required for this backend to be considered healthy. */
    min_free_cpu?: Files.DecimalString | number | null

    /** Minimum free memory percentage required for this backend to be considered healthy. */
    min_free_mem?: Files.DecimalString | number | null

    /** Priority of this backend. */
    priority?: number | null

    /** Path on the remote server to treat as the root of this mount. */
    remote_path?: string | null

    /** The remote server that this backend is associated with. */
    remote_server_id?: number | null

    /** The mount ID of the Remote Server Mount that this backend is associated with. */
    remote_server_mount_id?: number | null

    /** Number of consecutive successes before considering the backend healthy. */
    rise?: number | null

    /** Status of this backend. */
    status?: 'healthy' | 'degraded' | 'failed' | 'desynced' | Files.OtherString | null

    /** True if this backend is undergoing maintenance. */
    undergoing_maintenance?: boolean | null
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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are
     * `remote_server_mount_id`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** True if this backend is enabled. */
    enabled?: boolean

    /** Number of consecutive failures before considering the backend unhealthy. */
    fall?: number

    /** True if health checks are enabled for this backend. */
    health_check_enabled?: boolean

    /** Type of health check to perform. */
    health_check_type?: 'active' | 'passive'

    /** Interval in seconds between health checks. */
    interval?: number

    /** Minimum free CPU percentage required for this backend to be considered healthy. */
    min_free_cpu?: number

    /** Minimum free memory percentage required for this backend to be considered healthy. */
    min_free_mem?: number

    /** Priority of this backend. */
    priority?: number

    /** Path on the remote server to treat as the root of this mount. */
    remote_path?: string

    /** Number of consecutive successes before considering the backend healthy. */
    rise?: number

    /** Path to the canary file used for health checks. */
    canary_file_path: string

    /** The mount ID of the Remote Server Mount that this backend is associated with. */
    remote_server_mount_id: number

    /** The remote server that this backend is associated with. */
    remote_server_id: number
  }

  interface UpdateParams {
    /** True if this backend is enabled. */
    enabled?: boolean

    /** Number of consecutive failures before considering the backend unhealthy. */
    fall?: number

    /** True if health checks are enabled for this backend. */
    health_check_enabled?: boolean

    /** Type of health check to perform. */
    health_check_type?: 'active' | 'passive'

    /** Interval in seconds between health checks. */
    interval?: number

    /** Minimum free CPU percentage required for this backend to be considered healthy. */
    min_free_cpu?: number

    /** Minimum free memory percentage required for this backend to be considered healthy. */
    min_free_mem?: number

    /** Priority of this backend. */
    priority?: number

    /** Path on the remote server to treat as the root of this mount. */
    remote_path?: string

    /** Number of consecutive successes before considering the backend healthy. */
    rise?: number

    /** Path to the canary file used for health checks. */
    canary_file_path?: string

    /** The remote server that this backend is associated with. */
    remote_server_id?: number
  }
}

export = RemoteMountBackend
