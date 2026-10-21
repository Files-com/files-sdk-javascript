import Files from '../Files'

/**
 * An InboundS3Log is an audit log for monitoring and troubleshooting S3-compatible API requests to your Files.com site.
 */
declare class InboundS3Log {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: InboundS3Log.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: InboundS3Log.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /**
   * Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Client IP */
  readonly client_ip?: string | null

  /** S3 Operation Type */
  readonly operation?: string | null

  /** HTTP Status Code */
  readonly status?: string | null

  /** AWS Access Key ID */
  readonly aws_access_key?: string | null

  /** Error message, if applicable */
  readonly error_message?: string | null

  /** Error type, if applicable */
  readonly error_type?: string | null

  /** Duration (in milliseconds) */
  readonly duration_ms?: number | null

  /** Request ID */
  readonly request_id?: string | null

  /** User Agent */
  readonly user_agent?: string | null

  /** Start Time of Request */
  readonly created_at?: Files.DateTimeString | null

  /**
   * Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Client IP */
  getClientIp(): string | null | undefined

  /** S3 Operation Type */
  getOperation(): string | null | undefined

  /** HTTP Status Code */
  getStatus(): string | null | undefined

  /** AWS Access Key ID */
  getAwsAccessKey(): string | null | undefined

  /** Error message, if applicable */
  getErrorMessage(): string | null | undefined

  /** Error type, if applicable */
  getErrorType(): string | null | undefined

  /** Duration (in milliseconds) */
  getDurationMs(): number | null | undefined

  /** Request ID */
  getRequestId(): string | null | undefined

  /** User Agent */
  getUserAgent(): string | null | undefined

  /** Start Time of Request */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List Inbound S3 Logs */
  static list(params?: InboundS3Log.ListParams, options?: Files.RequestOptions): Promise<InboundS3Log[]>

  /** Alias of `list()`. */
  static all(params?: InboundS3Log.ListParams, options?: Files.RequestOptions): Promise<InboundS3Log[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: InboundS3Log.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<InboundS3Log>
}

declare namespace InboundS3Log {
  /** The fields of `InboundS3Log` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Client IP */
    client_ip?: string | null

    /** S3 Operation Type */
    operation?: string | null

    /** HTTP Status Code */
    status?: string | null

    /** AWS Access Key ID */
    aws_access_key?: string | null

    /** Error message, if applicable */
    error_message?: string | null

    /** Error type, if applicable */
    error_type?: string | null

    /** Duration (in milliseconds) */
    duration_ms?: number | null

    /** Request ID */
    request_id?: string | null

    /** User Agent */
    user_agent?: string | null

    /** Start Time of Request */
    created_at?: Files.DateTimeString | null
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 1000, 1,000 or less is recommended). */
    per_page?: number

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `operation`,
     * `status`, `path`, `client_ip` or `created_at`. Valid field combinations are `[ operation ]`, `[ status ]`, `[
     * path ]`, `[ client_ip ]`, `[ created_at ]`, `[ operation, status ]`, `[ operation, path ]`, `[ operation,
     * client_ip ]`, `[ operation, created_at ]`, `[ status, path ]`, `[ status, client_ip ]`, `[ status, created_at ]`,
     * `[ path, client_ip ]`, `[ path, created_at ]`, `[ client_ip, created_at ]`, `[ operation, status, path ]`, `[
     * operation, status, client_ip ]`, `[ operation, status, created_at ]`, `[ operation, path, client_ip ]`, `[
     * operation, path, created_at ]`, `[ operation, client_ip, created_at ]`, `[ status, path, client_ip ]`, `[ status,
     * path, created_at ]`, `[ status, client_ip, created_at ]`, `[ path, client_ip, created_at ]`, `[ operation,
     * status, path, client_ip ]`, `[ operation, status, path, created_at ]`, `[ operation, status, client_ip,
     * created_at ]`, `[ operation, path, client_ip, created_at ]` or `[ status, path, client_ip, created_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are `[ operation ]`, `[ status ]`, `[ path ]`, `[ client_ip ]`, `[
     * created_at ]`, `[ operation, status ]`, `[ operation, path ]`, `[ operation, client_ip ]`, `[ operation,
     * created_at ]`, `[ status, path ]`, `[ status, client_ip ]`, `[ status, created_at ]`, `[ path, client_ip ]`, `[
     * path, created_at ]`, `[ client_ip, created_at ]`, `[ operation, status, path ]`, `[ operation, status, client_ip
     * ]`, `[ operation, status, created_at ]`, `[ operation, path, client_ip ]`, `[ operation, path, created_at ]`, `[
     * operation, client_ip, created_at ]`, `[ status, path, client_ip ]`, `[ status, path, created_at ]`, `[ status,
     * client_ip, created_at ]`, `[ path, client_ip, created_at ]`, `[ operation, status, path, client_ip ]`, `[
     * operation, status, path, created_at ]`, `[ operation, status, client_ip, created_at ]`, `[ operation, path,
     * client_ip, created_at ]` or `[ status, path, client_ip, created_at ]`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are `[ operation ]`, `[ status ]`, `[ path ]`, `[ client_ip ]`, `[
     * created_at ]`, `[ operation, status ]`, `[ operation, path ]`, `[ operation, client_ip ]`, `[ operation,
     * created_at ]`, `[ status, path ]`, `[ status, client_ip ]`, `[ status, created_at ]`, `[ path, client_ip ]`, `[
     * path, created_at ]`, `[ client_ip, created_at ]`, `[ operation, status, path ]`, `[ operation, status, client_ip
     * ]`, `[ operation, status, created_at ]`, `[ operation, path, client_ip ]`, `[ operation, path, created_at ]`, `[
     * operation, client_ip, created_at ]`, `[ status, path, client_ip ]`, `[ status, path, created_at ]`, `[ status,
     * client_ip, created_at ]`, `[ path, client_ip, created_at ]`, `[ operation, status, path, client_ip ]`, `[
     * operation, status, path, created_at ]`, `[ operation, status, client_ip, created_at ]`, `[ operation, path,
     * client_ip, created_at ]` or `[ status, path, client_ip, created_at ]`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `operation`,
     * `status`, `path` or `client_ip`. Valid field combinations are `[ operation ]`, `[ status ]`, `[ path ]`, `[
     * client_ip ]`, `[ created_at ]`, `[ operation, status ]`, `[ operation, path ]`, `[ operation, client_ip ]`, `[
     * operation, created_at ]`, `[ status, path ]`, `[ status, client_ip ]`, `[ status, created_at ]`, `[ path,
     * client_ip ]`, `[ path, created_at ]`, `[ client_ip, created_at ]`, `[ operation, status, path ]`, `[ operation,
     * status, client_ip ]`, `[ operation, status, created_at ]`, `[ operation, path, client_ip ]`, `[ operation, path,
     * created_at ]`, `[ operation, client_ip, created_at ]`, `[ status, path, client_ip ]`, `[ status, path, created_at
     * ]`, `[ status, client_ip, created_at ]`, `[ path, client_ip, created_at ]`, `[ operation, status, path, client_ip
     * ]`, `[ operation, status, path, created_at ]`, `[ operation, status, client_ip, created_at ]`, `[ operation,
     * path, client_ip, created_at ]` or `[ status, path, client_ip, created_at ]`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are `[ operation ]`, `[ status ]`, `[ path ]`, `[ client_ip ]`, `[ created_at ]`, `[
     * operation, status ]`, `[ operation, path ]`, `[ operation, client_ip ]`, `[ operation, created_at ]`, `[ status,
     * path ]`, `[ status, client_ip ]`, `[ status, created_at ]`, `[ path, client_ip ]`, `[ path, created_at ]`, `[
     * client_ip, created_at ]`, `[ operation, status, path ]`, `[ operation, status, client_ip ]`, `[ operation,
     * status, created_at ]`, `[ operation, path, client_ip ]`, `[ operation, path, created_at ]`, `[ operation,
     * client_ip, created_at ]`, `[ status, path, client_ip ]`, `[ status, path, created_at ]`, `[ status, client_ip,
     * created_at ]`, `[ path, client_ip, created_at ]`, `[ operation, status, path, client_ip ]`, `[ operation, status,
     * path, created_at ]`, `[ operation, status, client_ip, created_at ]`, `[ operation, path, client_ip, created_at ]`
     * or `[ status, path, client_ip, created_at ]`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are `[ operation ]`, `[ status ]`, `[ path ]`, `[ client_ip ]`, `[
     * created_at ]`, `[ operation, status ]`, `[ operation, path ]`, `[ operation, client_ip ]`, `[ operation,
     * created_at ]`, `[ status, path ]`, `[ status, client_ip ]`, `[ status, created_at ]`, `[ path, client_ip ]`, `[
     * path, created_at ]`, `[ client_ip, created_at ]`, `[ operation, status, path ]`, `[ operation, status, client_ip
     * ]`, `[ operation, status, created_at ]`, `[ operation, path, client_ip ]`, `[ operation, path, created_at ]`, `[
     * operation, client_ip, created_at ]`, `[ status, path, client_ip ]`, `[ status, path, created_at ]`, `[ status,
     * client_ip, created_at ]`, `[ path, client_ip, created_at ]`, `[ operation, status, path, client_ip ]`, `[
     * operation, status, path, created_at ]`, `[ operation, status, client_ip, created_at ]`, `[ operation, path,
     * client_ip, created_at ]` or `[ status, path, client_ip, created_at ]`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export default InboundS3Log
