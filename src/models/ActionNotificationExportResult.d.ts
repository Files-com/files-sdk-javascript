import Files from '../Files'

/**
 * An ActionNotificationExportResult is a single record containing webhook log information that can be obtained as a
 * part of Action Notification Export request.
 */
declare class ActionNotificationExportResult {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: ActionNotificationExportResult.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: ActionNotificationExportResult.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Notification ID */
  readonly id?: number | null

  /** When the notification was sent. */
  readonly created_at?: number | null

  /** HTTP status code returned in the webhook response. */
  readonly status?: number | null

  /** A message indicating the overall status of the webhook notification. */
  readonly message?: string | null

  /** `true` if the webhook succeeded by receiving a 200 or 204 response. */
  readonly success?: boolean | null

  /** A JSON-encoded string with headers that were sent with the webhook. */
  readonly request_headers?: string | null

  /** The HTTP verb used to perform the webhook. */
  readonly request_method?: string | null

  /** The webhook request URL. */
  readonly request_url?: string | null

  /**
   * The path to the actual file that triggered this notification. This must be slash-delimited, but it must neither
   * start nor end with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** The folder associated with the triggering action for this notification. */
  readonly folder?: string | null

  /** Notification ID */
  getId(): number | null | undefined

  /** When the notification was sent. */
  getCreatedAt(): number | null | undefined

  /** HTTP status code returned in the webhook response. */
  getStatus(): number | null | undefined

  /** A message indicating the overall status of the webhook notification. */
  getMessage(): string | null | undefined

  /** `true` if the webhook succeeded by receiving a 200 or 204 response. */
  getSuccess(): boolean | null | undefined

  /** A JSON-encoded string with headers that were sent with the webhook. */
  getRequestHeaders(): string | null | undefined

  /** The HTTP verb used to perform the webhook. */
  getRequestMethod(): string | null | undefined

  /** The webhook request URL. */
  getRequestUrl(): string | null | undefined

  /**
   * The path to the actual file that triggered this notification. This must be slash-delimited, but it must neither
   * start nor end with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** The folder associated with the triggering action for this notification. */
  getFolder(): string | null | undefined

  /** List Action Notification Export Results */
  static list(params: ActionNotificationExportResult.ListParams, options?: Files.RequestOptions): Promise<ActionNotificationExportResult[]>

  /** Alias of `list()`. */
  static all(params: ActionNotificationExportResult.ListParams, options?: Files.RequestOptions): Promise<ActionNotificationExportResult[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params: ActionNotificationExportResult.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<ActionNotificationExportResult>
}

declare namespace ActionNotificationExportResult {
  /** The fields of `ActionNotificationExportResult` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Notification ID */
    id?: number | null

    /** When the notification was sent. */
    created_at?: number | null

    /** HTTP status code returned in the webhook response. */
    status?: number | null

    /** A message indicating the overall status of the webhook notification. */
    message?: string | null

    /** `true` if the webhook succeeded by receiving a 200 or 204 response. */
    success?: boolean | null

    /** A JSON-encoded string with headers that were sent with the webhook. */
    request_headers?: string | null

    /** The HTTP verb used to perform the webhook. */
    request_method?: string | null

    /** The webhook request URL. */
    request_url?: string | null

    /**
     * The path to the actual file that triggered this notification. This must be slash-delimited, but it must neither
     * start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** The folder associated with the triggering action for this notification. */
    folder?: string | null
  }

  interface ListParams {
    /** User ID.  Provide a value of `0` to operate the current session's user. */
    user_id?: number

    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** ID of the associated action notification export. */
    action_notification_export_id: number
  }
}

export default ActionNotificationExportResult
