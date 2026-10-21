import Files = require('../Files')

/** An ActionNotificationExport is an operation that provides access to outgoing webhook logs. */
declare class ActionNotificationExport {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ActionNotificationExport.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ActionNotificationExport.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** History Export ID */
  readonly id?: number | null

  /** Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export. */
  readonly workspace_id?: number | null

  /** Version of the underlying records for the export. */
  readonly export_version?: string | null

  /** Start date/time of export range. */
  readonly start_at?: Files.DateTimeString | null

  /** End date/time of export range. */
  readonly end_at?: Files.DateTimeString | null

  /** Status of export.  Valid values: `building`, `ready`, or `failed` */
  readonly status?: string | null

  /** Return notifications that were triggered by actions on this specific path. */
  readonly query_path?: string | null

  /** Return notifications that were triggered by actions in this folder. */
  readonly query_folder?: string | null

  /** Error message associated with the request, if any. */
  readonly query_message?: string | null

  /** The HTTP request method used by the webhook. */
  readonly query_request_method?: string | null

  /** The target webhook URL. */
  readonly query_request_url?: string | null

  /** The HTTP status returned from the server in response to the webhook request. */
  readonly query_status?: string | null

  /** true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise. */
  readonly query_success?: boolean | null

  /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
  readonly results_url?: string | null

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  readonly user_id?: number

  /** History Export ID */
  getId(): number | null | undefined

  /** Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export. */
  getWorkspaceId(): number | null | undefined

  /** Version of the underlying records for the export. */
  getExportVersion(): string | null | undefined

  /** Start date/time of export range. */
  getStartAt(): Files.DateTimeString | null | undefined

  /** End date/time of export range. */
  getEndAt(): Files.DateTimeString | null | undefined

  /** Status of export.  Valid values: `building`, `ready`, or `failed` */
  getStatus(): string | null | undefined

  /** Return notifications that were triggered by actions on this specific path. */
  getQueryPath(): string | null | undefined

  /** Return notifications that were triggered by actions in this folder. */
  getQueryFolder(): string | null | undefined

  /** Error message associated with the request, if any. */
  getQueryMessage(): string | null | undefined

  /** The HTTP request method used by the webhook. */
  getQueryRequestMethod(): string | null | undefined

  /** The target webhook URL. */
  getQueryRequestUrl(): string | null | undefined

  /** The HTTP status returned from the server in response to the webhook request. */
  getQueryStatus(): string | null | undefined

  /** true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise. */
  getQuerySuccess(): boolean | null | undefined

  /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
  getResultsUrl(): string | null | undefined

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  getUserId(): number | undefined

  /** History Export ID */
  setId(value: number): void

  /** Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export. */
  setWorkspaceId(value: number): void

  /** Version of the underlying records for the export. */
  setExportVersion(value: string): void

  /** Start date/time of export range. */
  setStartAt(value: Files.DateTimeString): void

  /** End date/time of export range. */
  setEndAt(value: Files.DateTimeString): void

  /** Status of export.  Valid values: `building`, `ready`, or `failed` */
  setStatus(value: string): void

  /** Return notifications that were triggered by actions on this specific path. */
  setQueryPath(value: string): void

  /** Return notifications that were triggered by actions in this folder. */
  setQueryFolder(value: string): void

  /** Error message associated with the request, if any. */
  setQueryMessage(value: string): void

  /** The HTTP request method used by the webhook. */
  setQueryRequestMethod(value: string): void

  /** The target webhook URL. */
  setQueryRequestUrl(value: string): void

  /** The HTTP status returned from the server in response to the webhook request. */
  setQueryStatus(value: string): void

  /** true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise. */
  setQuerySuccess(value: boolean): void

  /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
  setResultsUrl(value: string): void

  /** User ID.  Provide a value of `0` to operate the current session's user. */
  setUserId(value: number): void

  /**
   * Creates this object from its attributes. Its attributes then become those the API returns. Rejects with a
   * `NotImplementedError` if it already has an `id`, since it cannot be updated.
   */
  save(): Promise<true>

  /**
   * Show Action Notification Export
   * @param id - Action Notification Export ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ActionNotificationExport>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<ActionNotificationExport>

  /** Create Action Notification Export */
  static create(params?: ActionNotificationExport.CreateParams, options?: Files.RequestOptions): Promise<ActionNotificationExport>

  static default: typeof ActionNotificationExport
}

declare namespace ActionNotificationExport {
  /** The fields of `ActionNotificationExport` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** History Export ID */
    id?: number | null

    /**
     * Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export.
     */
    workspace_id?: number | null

    /** Version of the underlying records for the export. */
    export_version?: string | null

    /** Start date/time of export range. */
    start_at?: Files.DateTimeString | null

    /** End date/time of export range. */
    end_at?: Files.DateTimeString | null

    /** Status of export.  Valid values: `building`, `ready`, or `failed` */
    status?: string | null

    /** Return notifications that were triggered by actions on this specific path. */
    query_path?: string | null

    /** Return notifications that were triggered by actions in this folder. */
    query_folder?: string | null

    /** Error message associated with the request, if any. */
    query_message?: string | null

    /** The HTTP request method used by the webhook. */
    query_request_method?: string | null

    /** The target webhook URL. */
    query_request_url?: string | null

    /** The HTTP status returned from the server in response to the webhook request. */
    query_status?: string | null

    /** true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise. */
    query_success?: boolean | null

    /** If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV. */
    results_url?: string | null

    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number
  }

  interface CreateParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /**
     * Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export.
     */
    workspace_id?: number

    /** Start date/time of export range. */
    start_at?: Files.DateTimeString

    /** End date/time of export range. */
    end_at?: Files.DateTimeString

    /** Error message associated with the request, if any. */
    query_message?: string

    /** The HTTP request method used by the webhook. */
    query_request_method?: string

    /** The target webhook URL. */
    query_request_url?: string

    /** The HTTP status returned from the server in response to the webhook request. */
    query_status?: string

    /** true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise. */
    query_success?: boolean

    /** Return notifications that were triggered by actions on this specific path. */
    query_path?: string

    /** Return notifications that were triggered by actions in this folder. */
    query_folder?: string
  }
}

export = ActionNotificationExport
