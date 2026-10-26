import Files = require('../Files')

/** An AS2IncomingMessage is a single record created for each individual AS2 file transfer incoming from a Partner. */
declare class As2IncomingMessage {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: As2IncomingMessage.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: As2IncomingMessage.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** ID of this AS2 incoming message record. */
  readonly id?: number | null

  /**
   * ID of the incoming message record this message was replayed from. Empty for messages received directly from a
   * trading partner.
   */
  readonly replayed_from_message_id?: number | null

  /** ID of the Workspace associated with this AS2 Incoming Message. */
  readonly workspace_id?: number | null

  /** Id of the AS2 Partner associated with this message. */
  readonly as2_partner_id?: number | null

  /** Id of the AS2 Station associated with this message. */
  readonly as2_station_id?: number | null

  /** UUID assigned to this message. */
  readonly uuid?: string | null

  /** Content Type header of the incoming message. */
  readonly content_type?: string | null

  /** HTTP Headers sent with this message. */
  readonly http_headers?: Files.JsonObject | null

  /** Result of processing. */
  readonly processing_result?: 'not_started' | 'unable_to_find_station' | 'unable_to_find_partner' | 'unable_to_validate_signature' | 'decrypt_fail' | 'file_save_fail' | 'success' | Files.OtherString | null

  /** Result of processing description. */
  readonly processing_result_description?: string | null

  /** AS2 Message Integrity Check */
  readonly mic?: string | null

  /** AS2 Message Integrity Check Algorithm Used */
  readonly mic_algo?: string | null

  /** AS2 TO header of message */
  readonly as2_to?: string | null

  /** AS2 FROM header of message */
  readonly as2_from?: string | null

  /** AS2 Message Id */
  readonly message_id?: string | null

  /** AS2 Subject Header */
  readonly subject?: string | null

  /** Date Header */
  readonly date?: string | null

  /** Encrypted Payload Body Size */
  readonly body_size?: string | null

  /** Filename of the file being received. */
  readonly attachment_filename?: string | null

  /** IP Address of the Sender */
  readonly ip?: string | null

  /** Message creation date/time */
  readonly created_at?: Files.DateTimeString | null

  /** HTTP Response Code sent for this message */
  readonly http_response_code?: string | null

  /** HTTP Headers sent for this message. */
  readonly http_response_headers?: Files.JsonObject | null

  /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial */
  readonly recipient_serial?: string | null

  /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial in hex format. */
  readonly hex_recipient_serial?: string | null

  /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s issuer */
  readonly recipient_issuer?: string | null

  /** Message body received? */
  readonly message_received?: boolean | null

  /** Message decrypted successfully? */
  readonly message_decrypted?: boolean | null

  /** Message signature verified? */
  readonly message_signature_verified?: boolean | null

  /** Message processed successfully? */
  readonly message_processing_success?: boolean | null

  /** MDN returned? */
  readonly message_mdn_returned?: boolean | null

  /** URL to download the encrypted signed smime that is to sent as AS2 body */
  readonly encrypted_uri?: string | null

  /** URL to download the file contents as smime with signature */
  readonly smime_signed_uri?: string | null

  /** URL to download the file contents encoded as smime */
  readonly smime_uri?: string | null

  /** URL to download the original file contents */
  readonly raw_uri?: string | null

  /** URL to download the http response body */
  readonly mdn_response_uri?: string | null

  /** ID of this AS2 incoming message record. */
  getId(): number | null | undefined

  /**
   * ID of the incoming message record this message was replayed from. Empty for messages received directly from a
   * trading partner.
   */
  getReplayedFromMessageId(): number | null | undefined

  /** ID of the Workspace associated with this AS2 Incoming Message. */
  getWorkspaceId(): number | null | undefined

  /** Id of the AS2 Partner associated with this message. */
  getAs2PartnerId(): number | null | undefined

  /** Id of the AS2 Station associated with this message. */
  getAs2StationId(): number | null | undefined

  /** UUID assigned to this message. */
  getUuid(): string | null | undefined

  /** Content Type header of the incoming message. */
  getContentType(): string | null | undefined

  /** HTTP Headers sent with this message. */
  getHttpHeaders(): Files.JsonObject | null | undefined

  /** Result of processing. */
  getProcessingResult(): 'not_started' | 'unable_to_find_station' | 'unable_to_find_partner' | 'unable_to_validate_signature' | 'decrypt_fail' | 'file_save_fail' | 'success' | Files.OtherString | null | undefined

  /** Result of processing description. */
  getProcessingResultDescription(): string | null | undefined

  /** AS2 Message Integrity Check */
  getMic(): string | null | undefined

  /** AS2 Message Integrity Check Algorithm Used */
  getMicAlgo(): string | null | undefined

  /** AS2 TO header of message */
  getAs2To(): string | null | undefined

  /** AS2 FROM header of message */
  getAs2From(): string | null | undefined

  /** AS2 Message Id */
  getMessageId(): string | null | undefined

  /** AS2 Subject Header */
  getSubject(): string | null | undefined

  /** Date Header */
  getDate(): string | null | undefined

  /** Encrypted Payload Body Size */
  getBodySize(): string | null | undefined

  /** Filename of the file being received. */
  getAttachmentFilename(): string | null | undefined

  /** IP Address of the Sender */
  getIp(): string | null | undefined

  /** Message creation date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** HTTP Response Code sent for this message */
  getHttpResponseCode(): string | null | undefined

  /** HTTP Headers sent for this message. */
  getHttpResponseHeaders(): Files.JsonObject | null | undefined

  /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial */
  getRecipientSerial(): string | null | undefined

  /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial in hex format. */
  getHexRecipientSerial(): string | null | undefined

  /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s issuer */
  getRecipientIssuer(): string | null | undefined

  /** Message body received? */
  getMessageReceived(): boolean | null | undefined

  /** Message decrypted successfully? */
  getMessageDecrypted(): boolean | null | undefined

  /** Message signature verified? */
  getMessageSignatureVerified(): boolean | null | undefined

  /** Message processed successfully? */
  getMessageProcessingSuccess(): boolean | null | undefined

  /** MDN returned? */
  getMessageMdnReturned(): boolean | null | undefined

  /** URL to download the encrypted signed smime that is to sent as AS2 body */
  getEncryptedUri(): string | null | undefined

  /** URL to download the file contents as smime with signature */
  getSmimeSignedUri(): string | null | undefined

  /** URL to download the file contents encoded as smime */
  getSmimeUri(): string | null | undefined

  /** URL to download the original file contents */
  getRawUri(): string | null | undefined

  /** URL to download the http response body */
  getMdnResponseUri(): string | null | undefined

  /** Replay AS2 Incoming Message */
  replay(params?: Files.NoParams): Promise<As2IncomingMessage>

  /** List AS2 Incoming Messages */
  static list(params?: As2IncomingMessage.ListParams, options?: Files.RequestOptions): Promise<As2IncomingMessage[]>

  /** Alias of `list()`. */
  static all(params?: As2IncomingMessage.ListParams, options?: Files.RequestOptions): Promise<As2IncomingMessage[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: As2IncomingMessage.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<As2IncomingMessage>

  /**
   * Show AS2 Incoming Message
   * @param id - As2 Incoming Message ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<As2IncomingMessage>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<As2IncomingMessage>

  static default: typeof As2IncomingMessage
}

declare namespace As2IncomingMessage {
  /** The fields of `As2IncomingMessage` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** ID of this AS2 incoming message record. */
    id?: number | null

    /**
     * ID of the incoming message record this message was replayed from. Empty for messages received directly from a
     * trading partner.
     */
    replayed_from_message_id?: number | null

    /** ID of the Workspace associated with this AS2 Incoming Message. */
    workspace_id?: number | null

    /** Id of the AS2 Partner associated with this message. */
    as2_partner_id?: number | null

    /** Id of the AS2 Station associated with this message. */
    as2_station_id?: number | null

    /** UUID assigned to this message. */
    uuid?: string | null

    /** Content Type header of the incoming message. */
    content_type?: string | null

    /** HTTP Headers sent with this message. */
    http_headers?: Files.JsonObject | null

    /** Result of processing. */
    processing_result?: 'not_started' | 'unable_to_find_station' | 'unable_to_find_partner' | 'unable_to_validate_signature' | 'decrypt_fail' | 'file_save_fail' | 'success' | Files.OtherString | null

    /** Result of processing description. */
    processing_result_description?: string | null

    /** AS2 Message Integrity Check */
    mic?: string | null

    /** AS2 Message Integrity Check Algorithm Used */
    mic_algo?: string | null

    /** AS2 TO header of message */
    as2_to?: string | null

    /** AS2 FROM header of message */
    as2_from?: string | null

    /** AS2 Message Id */
    message_id?: string | null

    /** AS2 Subject Header */
    subject?: string | null

    /** Date Header */
    date?: string | null

    /** Encrypted Payload Body Size */
    body_size?: string | null

    /** Filename of the file being received. */
    attachment_filename?: string | null

    /** IP Address of the Sender */
    ip?: string | null

    /** Message creation date/time */
    created_at?: Files.DateTimeString | null

    /** HTTP Response Code sent for this message */
    http_response_code?: string | null

    /** HTTP Headers sent for this message. */
    http_response_headers?: Files.JsonObject | null

    /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial */
    recipient_serial?: string | null

    /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial in hex format. */
    hex_recipient_serial?: string | null

    /** Incoming Message Recipient(the Client Cert used to encrypt this message)'s issuer */
    recipient_issuer?: string | null

    /** Message body received? */
    message_received?: boolean | null

    /** Message decrypted successfully? */
    message_decrypted?: boolean | null

    /** Message signature verified? */
    message_signature_verified?: boolean | null

    /** Message processed successfully? */
    message_processing_success?: boolean | null

    /** MDN returned? */
    message_mdn_returned?: boolean | null

    /** URL to download the encrypted signed smime that is to sent as AS2 body */
    encrypted_uri?: string | null

    /** URL to download the file contents as smime with signature */
    smime_signed_uri?: string | null

    /** URL to download the file contents encoded as smime */
    smime_uri?: string | null

    /** URL to download the original file contents */
    raw_uri?: string | null

    /** URL to download the http response body */
    mdn_response_uri?: string | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`,
     * `created_at` or `as2_partner_id`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`,
     * `as2_station_id`, `workspace_id`, `replayed_from_message_id` or `as2_partner_id`. Valid field combinations are `[
     * as2_station_id, created_at ]`, `[ workspace_id, created_at ]`, `[ replayed_from_message_id, created_at ]`, `[
     * as2_partner_id, created_at ]`, `[ workspace_id, as2_station_id ]`, `[ workspace_id, replayed_from_message_id ]`,
     * `[ workspace_id, as2_partner_id ]`, `[ workspace_id, as2_station_id, created_at ]`, `[ workspace_id,
     * replayed_from_message_id, created_at ]` or `[ workspace_id, as2_partner_id, created_at ]`.
     */
    filter?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gt?: Files.JsonObject

    /**
     * If set, return records where the specified field is greater than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_gteq?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
     */
    filter_lt?: Files.JsonObject

    /**
     * If set, return records where the specified field is less than or equal the supplied value. Valid fields are
     * `created_at`.
     */
    filter_lteq?: Files.JsonObject
  }
}

export = As2IncomingMessage
