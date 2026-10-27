import Files from '../Files'

/** An EventTarget is a delivery destination for EventRecords. */
declare class EventTarget {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: EventTarget.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: EventTarget.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Event Target ID */
  readonly id?: number | null

  /** Event Target name. */
  readonly name?: string | null

  /** Event Target type. */
  readonly target_type?: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder' | Files.OtherString | null

  /** Workspace ID. 0 means the default workspace or site-wide. */
  readonly workspace_id?: number | null

  /** If true, this default-workspace target can receive events from all workspaces. */
  readonly apply_to_all_workspaces?: boolean | null

  /** Whether this Event Target can receive events. */
  readonly enabled?: boolean | null

  /** Event Target configuration. Fields depend on target_type. */
  readonly config?: EventTarget.Config | null

  /**
   * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
   * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and
   * summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other
   * matching events retain immediate delivery.
   */
  readonly delivery_policy?: EventTarget.DeliveryPolicy | null

  /** Event Target create date/time. */
  readonly created_at?: Files.DateTimeString | null

  /** Event Target update date/time. */
  readonly updated_at?: Files.DateTimeString | null

  /** Event Target ID */
  getId(): number | null | undefined

  /** Event Target name. */
  getName(): string | null | undefined

  /** Event Target type. */
  getTargetType(): 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder' | Files.OtherString | null | undefined

  /** Workspace ID. 0 means the default workspace or site-wide. */
  getWorkspaceId(): number | null | undefined

  /** If true, this default-workspace target can receive events from all workspaces. */
  getApplyToAllWorkspaces(): boolean | null | undefined

  /** Whether this Event Target can receive events. */
  getEnabled(): boolean | null | undefined

  /** Event Target configuration. Fields depend on target_type. */
  getConfig(): EventTarget.Config | null | undefined

  /**
   * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
   * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and
   * summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other
   * matching events retain immediate delivery.
   */
  getDeliveryPolicy(): EventTarget.DeliveryPolicy | null | undefined

  /** Event Target create date/time. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** Event Target update date/time. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Event Target ID */
  setId(value: number): void

  /** Event Target name. */
  setName(value: string): void

  /** Event Target type. */
  setTargetType(value: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder'): void

  /** Workspace ID. 0 means the default workspace or site-wide. */
  setWorkspaceId(value: number): void

  /** If true, this default-workspace target can receive events from all workspaces. */
  setApplyToAllWorkspaces(value: boolean): void

  /** Whether this Event Target can receive events. */
  setEnabled(value: boolean): void

  /** Event Target configuration. Fields depend on target_type. */
  setConfig(value: EventTarget.Config): void

  /**
   * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
   * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and
   * summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other
   * matching events retain immediate delivery.
   */
  setDeliveryPolicy(value: EventTarget.DeliveryPolicy): void

  /** Update Event Target */
  update(params?: EventTarget.UpdateParams): Promise<this>

  /** Delete Event Target */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Event Targets */
  static list(params?: EventTarget.ListParams, options?: Files.RequestOptions): Promise<EventTarget[]>

  /** Alias of `list()`. */
  static all(params?: EventTarget.ListParams, options?: Files.RequestOptions): Promise<EventTarget[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: EventTarget.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<EventTarget>

  /**
   * Show Event Target
   * @param id - Event Target ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventTarget>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<EventTarget>

  /** Create Event Target */
  static create(params: EventTarget.CreateParams, options?: Files.RequestOptions): Promise<EventTarget>
}

declare namespace EventTarget {
  /** The fields of `EventTarget` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Event Target ID */
    id?: number | null

    /** Event Target name. */
    name?: string | null

    /** Event Target type. */
    target_type?: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder' | Files.OtherString | null

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number | null

    /** If true, this default-workspace target can receive events from all workspaces. */
    apply_to_all_workspaces?: boolean | null

    /** Whether this Event Target can receive events. */
    enabled?: boolean | null

    /** Event Target configuration. Fields depend on target_type. */
    config?: EventTarget.Config | null

    /**
     * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
     * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root),
     * and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path;
     * other matching events retain immediate delivery.
     */
    delivery_policy?: EventTarget.DeliveryPolicy | null

    /** Event Target create date/time. */
    created_at?: Files.DateTimeString | null

    /** Event Target update date/time. */
    updated_at?: Files.DateTimeString | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`,
     * `enabled` or `workspace_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`,
     * `target_type` or `workspace_id`. Valid field combinations are `[ enabled, target_type ]`, `[ workspace_id,
     * enabled ]` or `[ workspace_id, enabled, target_type ]`.
     */
    filter?: Files.JsonObject
  }

  interface CreateParams {
    /** Event Target name. */
    name: string

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number

    /** If true, this default-workspace target can receive events from all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Whether this Event Target can receive events. */
    enabled?: boolean

    /** Event Target configuration. Fields depend on target_type. */
    config: EventTarget.Config

    /**
     * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
     * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root),
     * and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path;
     * other matching events retain immediate delivery.
     */
    delivery_policy?: EventTarget.DeliveryPolicy

    /** Event Target type. */
    target_type: 'email' | 'webhook' | 'slack_webhook' | 'teams_webhook' | 'amazon_sns' | 'google_pubsub' | 'folder'
  }

  interface UpdateParams {
    /** Event Target name. */
    name?: string

    /** Workspace ID. 0 means the default workspace or site-wide. */
    workspace_id?: number

    /** If true, this default-workspace target can receive events from all workspaces. */
    apply_to_all_workspaces?: boolean

    /** Whether this Event Target can receive events. */
    enabled?: boolean

    /** Event Target configuration. Fields depend on target_type. */
    config?: EventTarget.Config

    /**
     * Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400.
     * Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root),
     * and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path;
     * other matching events retain immediate delivery.
     */
    delivery_policy?: EventTarget.DeliveryPolicy
  }

  /** Settings for the target's target_type. Each field names the target types that use it. */
  interface Config {
    /**
     * Required for email targets. IDs of active users who receive the email. Each user must belong to this target's
     * workspace and to this site or a parent site authorized to access it.
     */
    user_ids?: number[]

    /** Required for webhook, Slack and Teams targets. Webhook URL. Slack and Teams URLs must use HTTPS. */
    url?: string

    /**
     * Webhook targets only. Additional HTTP headers sent with each request. Files.com sets Content-Type,
     * X-Files-Event-Id and X-Files-Event-Type itself. Null sends no additional headers.
     */
    headers?: {
      [key: string]: string
    } | null

    /**
     * Webhook targets only. When set, each request includes X-Files-Signature and X-Files-Signature-V2 headers
     * containing the HMAC-SHA256 hex digest of the request body.
     */
    signing_secret?: string

    /**
     * Webhook targets only. If enabled, requests are sent from this site's dedicated IP address. Delivery fails when
     * the site has none. Use `true` or `false`. Any value other than `false` or `null` enables it, including integers
     * such as `0` and `1`.
     */
    use_dedicated_ips?: boolean | null

    /** Slack targets only. Display name for messages. Defaults to Files.com. */
    username?: string

    /** Slack targets only. Channel to post to instead of the webhook's default channel. */
    channel?: string

    /** Slack targets only. Emoji to use as the message icon instead of the Files.com icon. */
    icon_emoji?: string

    /** Required for Amazon SNS targets. ARN of the SNS topic. */
    arn?: string

    /** Required for Amazon SNS targets. Responses omit secret_access_key. Region defaults to us-east-1. */
    aws_credentials?: EventTarget.Config.AwsCredentials

    /** Required for Google Pub/Sub targets. Google Cloud project ID. */
    project_id?: string

    /**
     * Required for Google Pub/Sub targets. Pub/Sub topic ID. It must start with a letter, must not start with goog, and
     * must be 3 to 255 characters.
     */
    topic_id?: string

    /**
     * Required for Google Pub/Sub targets. Service account key as an object, or the key file contents as a JSON string.
     * It is stored as an object. Responses omit private_key.
     */
    google_credentials?: EventTarget.Config.GoogleCredentials

    /** Required for folder targets. Folder that receives event files. */
    path?: string

    /** Required for folder targets. Event file format. Cannot be changed after creation. */
    format?: 'json' | 'csv'
  }

  namespace Config {
    /** AWS credentials */
    interface AwsCredentials {
      access_key_id: string

      region?: string

      /** Accepted in requests; never returned by the API. */
      secret_access_key?: string
    }

    /** Google service account credentials */
    interface GoogleCredentials {
      type?: string

      project_id?: string

      private_key_id?: string

      /** Accepted in requests; never returned by the API. */
      private_key?: string

      client_email?: string

      client_id?: string

      auth_uri?: string

      token_uri?: string

      auth_provider_x509_cert_url?: string

      client_x509_cert_url?: string

      universe_domain?: string

      quota_project_id?: string
    }
  }

  /**
   * Delivery settings for this target. Each target-specific field names the target types that use it. max_attempts and
   * retry_delay_minutes control retries of failed deliveries, and an Event Subscription's delivery_policy can override
   * them.
   */
  interface DeliveryPolicy {
    /**
     * Maximum delivery attempts, including the first attempt. A value below 1 uses the default of 5. Null works like an
     * omitted key.
     */
    max_attempts?: number | null

    /**
     * Minutes to wait before each retry. The last value is used for any later retries, so a list with one value applies
     * it to every retry. An empty list uses the default of [1,5,15,60,180]. Null works like an omitted key.
     */
    retry_delay_minutes?: number[] | null

    /**
     * Email and folder targets only. Seconds to collect events before delivering them together. An omitted or blank
     * value is stored as 600. A numeric string is stored as an integer.
     */
    batch_interval?: number

    /**
     * Slack and Teams targets only. Send each event immediately, or summarize file activity under summary_path by
     * first-level subfolder. Other events are still sent immediately. Omitted means immediate.
     */
    delivery_mode?: 'immediate' | 'subfolder_summary'

    /**
     * Slack and Teams targets only. Required when delivery_mode is subfolder_summary. Folder whose file activity is
     * summarized. An empty string means the root folder.
     */
    summary_path?: string

    /**
     * Slack and Teams targets only. Seconds without new matching activity before a summary is sent. Omitted means 60.
     */
    summary_delay?: number
  }
}

export default EventTarget
