import Files = require('../Files')

/**
 * An SFTPActionLog is an audit log for monitoring and troubleshooting operations made to your site through SFTP
 * protocol.
 */
declare class SftpActionLog {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SftpActionLog.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SftpActionLog.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Start Time of Action. Deprecrated: Use created_at. */
  readonly timestamp?: Files.DateTimeString | null

  /** IP Address of SFTP Client */
  readonly remote_ip?: string | null

  /** IP Address of SFTP Server */
  readonly server_ip?: string | null

  /** Username */
  readonly username?: string | null

  /** Name of the SFTP Client provided at initial connection */
  readonly ssh_client_identification?: string | null

  /** Unique ID of the Session */
  readonly session_uuid?: string | null

  /** SFTP Sequence ID */
  readonly seq_id?: number | null

  /** Authentication Method */
  readonly auth_method?: string | null

  /** Authentication Ciphers */
  readonly auth_ciphers?: string | null

  /** Action Type */
  readonly action_type?: string | null

  /**
   * Path as sent by the Client (may not match Files.com path due to user root folders for SFTP). This must be
   * slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
   */
  readonly path?: string | null

  /** Path on Files.com */
  readonly true_path?: string | null

  /** Name of File */
  readonly name?: string | null

  /** SFTP Response Code Returned to the Client. */
  readonly sftp_response_code?: string | null

  /** SFTP Response Message Returned to the Client. */
  readonly sftp_response_message?: string | null

  /** MD5 Hash of the file. Not always available. */
  readonly md5?: string | null

  /** Size of File That was Uploaded or Downloaded. */
  readonly size?: number | null

  /** Data Length in Bytes. Present for actions that transfer data. */
  readonly data_length?: number | null

  /** The number of bytes transferred for uploads and downloads. */
  readonly bytes_transferred?: number | null

  /** Number of entries returned when listing files and folders */
  readonly entries_returned?: number | null

  /** Whether SFTP Action was successful. */
  readonly success?: boolean | null

  /** SFTP Action status. */
  readonly status?: 'SUCCESS' | 'FAILURE' | 'PARTIAL_TRANSFER' | Files.OtherString | null

  /** Duration (in milliseconds) */
  readonly duration_ms?: number | null

  /** Start Time of Action */
  readonly created_at?: Files.DateTimeString | null

  /** Start Time of Action. Deprecrated: Use created_at. */
  getTimestamp(): Files.DateTimeString | null | undefined

  /** IP Address of SFTP Client */
  getRemoteIp(): string | null | undefined

  /** IP Address of SFTP Server */
  getServerIp(): string | null | undefined

  /** Username */
  getUsername(): string | null | undefined

  /** Name of the SFTP Client provided at initial connection */
  getSshClientIdentification(): string | null | undefined

  /** Unique ID of the Session */
  getSessionUuid(): string | null | undefined

  /** SFTP Sequence ID */
  getSeqId(): number | null | undefined

  /** Authentication Method */
  getAuthMethod(): string | null | undefined

  /** Authentication Ciphers */
  getAuthCiphers(): string | null | undefined

  /** Action Type */
  getActionType(): string | null | undefined

  /**
   * Path as sent by the Client (may not match Files.com path due to user root folders for SFTP). This must be
   * slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
   */
  getPath(): string | null | undefined

  /** Path on Files.com */
  getTruePath(): string | null | undefined

  /** Name of File */
  getName(): string | null | undefined

  /** SFTP Response Code Returned to the Client. */
  getSftpResponseCode(): string | null | undefined

  /** SFTP Response Message Returned to the Client. */
  getSftpResponseMessage(): string | null | undefined

  /** MD5 Hash of the file. Not always available. */
  getMd5(): string | null | undefined

  /** Size of File That was Uploaded or Downloaded. */
  getSize(): number | null | undefined

  /** Data Length in Bytes. Present for actions that transfer data. */
  getDataLength(): number | null | undefined

  /** The number of bytes transferred for uploads and downloads. */
  getBytesTransferred(): number | null | undefined

  /** Number of entries returned when listing files and folders */
  getEntriesReturned(): number | null | undefined

  /** Whether SFTP Action was successful. */
  getSuccess(): boolean | null | undefined

  /** SFTP Action status. */
  getStatus(): 'SUCCESS' | 'FAILURE' | 'PARTIAL_TRANSFER' | Files.OtherString | null | undefined

  /** Duration (in milliseconds) */
  getDurationMs(): number | null | undefined

  /** Start Time of Action */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** List SFTP Action Logs */
  static list(params?: SftpActionLog.ListParams, options?: Files.RequestOptions): Promise<SftpActionLog[]>

  /** Alias of `list()`. */
  static all(params?: SftpActionLog.ListParams, options?: Files.RequestOptions): Promise<SftpActionLog[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SftpActionLog.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SftpActionLog>

  static default: typeof SftpActionLog
}

declare namespace SftpActionLog {
  /** The fields of `SftpActionLog` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Start Time of Action. Deprecrated: Use created_at. */
    timestamp?: Files.DateTimeString | null

    /** IP Address of SFTP Client */
    remote_ip?: string | null

    /** IP Address of SFTP Server */
    server_ip?: string | null

    /** Username */
    username?: string | null

    /** Name of the SFTP Client provided at initial connection */
    ssh_client_identification?: string | null

    /** Unique ID of the Session */
    session_uuid?: string | null

    /** SFTP Sequence ID */
    seq_id?: number | null

    /** Authentication Method */
    auth_method?: string | null

    /** Authentication Ciphers */
    auth_ciphers?: string | null

    /** Action Type */
    action_type?: string | null

    /**
     * Path as sent by the Client (may not match Files.com path due to user root folders for SFTP). This must be
     * slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
     */
    path?: string | null

    /** Path on Files.com */
    true_path?: string | null

    /** Name of File */
    name?: string | null

    /** SFTP Response Code Returned to the Client. */
    sftp_response_code?: string | null

    /** SFTP Response Message Returned to the Client. */
    sftp_response_message?: string | null

    /** MD5 Hash of the file. Not always available. */
    md5?: string | null

    /** Size of File That was Uploaded or Downloaded. */
    size?: number | null

    /** Data Length in Bytes. Present for actions that transfer data. */
    data_length?: number | null

    /** The number of bytes transferred for uploads and downloads. */
    bytes_transferred?: number | null

    /** Number of entries returned when listing files and folders */
    entries_returned?: number | null

    /** Whether SFTP Action was successful. */
    success?: boolean | null

    /** SFTP Action status. */
    status?: 'SUCCESS' | 'FAILURE' | 'PARTIAL_TRANSFER' | Files.OtherString | null

    /** Duration (in milliseconds) */
    duration_ms?: number | null

    /** Start Time of Action */
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
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `path`,
     * `true_path`, `remote_ip`, `session_uuid`, `success`, `status`, `action_type`, `username` or `created_at`. Valid
     * field combinations are any combination of `path`, `true_path`, `remote_ip`, `session_uuid`, `success`, `status`,
     * `action_type`, `username` and `created_at`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `path`, `true_path`, `remote_ip`, `session_uuid`,
     * `success`, `status`, `action_type`, `username` and `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `path`, `true_path`, `remote_ip`, `session_uuid`,
     * `success`, `status`, `action_type`, `username` and `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`,
     * `true_path`, `action_type` or `username`. Valid field combinations are any combination of `path`, `true_path`,
     * `remote_ip`, `session_uuid`, `success`, `status`, `action_type`, `username` and `created_at`.
     */
    filter_prefix?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     * Valid field combinations are any combination of `path`, `true_path`, `remote_ip`, `session_uuid`, `success`,
     * `status`, `action_type`, `username` and `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`. Valid field combinations are any combination of `path`, `true_path`, `remote_ip`, `session_uuid`,
     * `success`, `status`, `action_type`, `username` and `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = SftpActionLog
