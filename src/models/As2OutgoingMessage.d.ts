import Files from '../Files'

/** An AS2OutgoingMessage is a single record created for each individual AS2 file transfer out to a Partner. */
declare class As2OutgoingMessage {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: As2OutgoingMessage.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: As2OutgoingMessage.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Id of the AS2 Partner. */
  readonly id?: number | null

  /** ID of the Workspace associated with this AS2 Outgoing Message. */
  readonly workspace_id?: number | null

  /** Id of the AS2 Partner associated with this message. */
  readonly as2_partner_id?: number | null

  /** Id of the AS2 Station associated with this message. */
  readonly as2_station_id?: number | null

  /** UUID assigned to this message. */
  readonly uuid?: string | null

  /** HTTP Headers sent with this message. */
  readonly http_headers?: Files.JsonObject | null

  /** Result of processing. */
  readonly processing_result?: 'not_started' | 'send_failed' | 'send_success' | 'send_success_mdn_invalid' | 'send_success_mic_mismatch' | 'send_success_message_id_mismatch' | 'send_success_signature_mismatch' | 'send_success_processing_failure' | 'send_failed_unknown_host' | 'send_failed_bad_http_response_code' | 'send_failed_ssl_error' | 'send_failed_connection_refused' | Files.OtherString | null

  /** Result of processing description. */
  readonly processing_result_description?: string | null

  /** AS2 Message Integrity Check SHA1 */
  readonly mic?: string | null

  /** AS2 Message Integrity Check SHA256 */
  readonly mic_sha_256?: string | null

  /** AS2 TO */
  readonly as2_to?: string | null

  /** AS2 FROM */
  readonly as2_from?: string | null

  /** AS2 Subject */
  readonly as2_subject?: string | null

  /** Date Header */
  readonly date?: string | null

  /** AS2 Message Id */
  readonly message_id?: string | null

  /** Encrypted Payload Body Size */
  readonly body_size?: string | null

  /** Filename of the file being sent. */
  readonly attachment_filename?: string | null

  /** Message creation date/time */
  readonly created_at?: Files.DateTimeString | null

  /** HTTP Response Code received for this message */
  readonly http_response_code?: string | null

  /** HTTP Headers received for this message. */
  readonly http_response_headers?: Files.JsonObject | null

  /** HTTP transmission duration in seceonds */
  readonly http_transmission_duration?: number | null

  /** Did the partner give a response body? */
  readonly mdn_received?: boolean | null

  /** Is the response in MDN format? */
  readonly mdn_valid?: boolean | null

  /** MDN signature verified? */
  readonly mdn_signature_verified?: boolean | null

  /** MDN message id matched? */
  readonly mdn_message_id_matched?: boolean | null

  /** MDN MIC matched? */
  readonly mdn_mic_matched?: boolean | null

  /** MDN disposition indicate a successful processing? */
  readonly mdn_processing_success?: boolean | null

  /** URL to download the original file contents */
  readonly raw_uri?: string | null

  /** URL to download the file contents encoded as smime */
  readonly smime_uri?: string | null

  /** URL to download the file contents as smime with signature */
  readonly smime_signed_uri?: string | null

  /** URL to download the encrypted signed smime that is to sent as AS2 body */
  readonly encrypted_uri?: string | null

  /** URL to download the http response body */
  readonly mdn_response_uri?: string | null

  /** Id of the AS2 Partner. */
  getId(): number | null | undefined

  /** ID of the Workspace associated with this AS2 Outgoing Message. */
  getWorkspaceId(): number | null | undefined

  /** Id of the AS2 Partner associated with this message. */
  getAs2PartnerId(): number | null | undefined

  /** Id of the AS2 Station associated with this message. */
  getAs2StationId(): number | null | undefined

  /** UUID assigned to this message. */
  getUuid(): string | null | undefined

  /** HTTP Headers sent with this message. */
  getHttpHeaders(): Files.JsonObject | null | undefined

  /** Result of processing. */
  getProcessingResult(): 'not_started' | 'send_failed' | 'send_success' | 'send_success_mdn_invalid' | 'send_success_mic_mismatch' | 'send_success_message_id_mismatch' | 'send_success_signature_mismatch' | 'send_success_processing_failure' | 'send_failed_unknown_host' | 'send_failed_bad_http_response_code' | 'send_failed_ssl_error' | 'send_failed_connection_refused' | Files.OtherString | null | undefined

  /** Result of processing description. */
  getProcessingResultDescription(): string | null | undefined

  /** AS2 Message Integrity Check SHA1 */
  getMic(): string | null | undefined

  /** AS2 Message Integrity Check SHA256 */
  getMicSha256(): string | null | undefined

  /** AS2 TO */
  getAs2To(): string | null | undefined

  /** AS2 FROM */
  getAs2From(): string | null | undefined

  /** AS2 Subject */
  getAs2Subject(): string | null | undefined

  /** Date Header */
  getDate(): string | null | undefined

  /** AS2 Message Id */
  getMessageId(): string | null | undefined

  /** Encrypted Payload Body Size */
  getBodySize(): string | null | undefined

  /** Filename of the file being sent. */
  getAttachmentFilename(): string | null | undefined

  /** Message creation date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** HTTP Response Code received for this message */
  getHttpResponseCode(): string | null | undefined

  /** HTTP Headers received for this message. */
  getHttpResponseHeaders(): Files.JsonObject | null | undefined

  /** HTTP transmission duration in seceonds */
  getHttpTransmissionDuration(): number | null | undefined

  /** Did the partner give a response body? */
  getMdnReceived(): boolean | null | undefined

  /** Is the response in MDN format? */
  getMdnValid(): boolean | null | undefined

  /** MDN signature verified? */
  getMdnSignatureVerified(): boolean | null | undefined

  /** MDN message id matched? */
  getMdnMessageIdMatched(): boolean | null | undefined

  /** MDN MIC matched? */
  getMdnMicMatched(): boolean | null | undefined

  /** MDN disposition indicate a successful processing? */
  getMdnProcessingSuccess(): boolean | null | undefined

  /** URL to download the original file contents */
  getRawUri(): string | null | undefined

  /** URL to download the file contents encoded as smime */
  getSmimeUri(): string | null | undefined

  /** URL to download the file contents as smime with signature */
  getSmimeSignedUri(): string | null | undefined

  /** URL to download the encrypted signed smime that is to sent as AS2 body */
  getEncryptedUri(): string | null | undefined

  /** URL to download the http response body */
  getMdnResponseUri(): string | null | undefined

  /** List AS2 Outgoing Messages */
  static list(params?: As2OutgoingMessage.ListParams, options?: Files.RequestOptions): Promise<As2OutgoingMessage[]>

  /** Alias of `list()`. */
  static all(params?: As2OutgoingMessage.ListParams, options?: Files.RequestOptions): Promise<As2OutgoingMessage[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: As2OutgoingMessage.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<As2OutgoingMessage>
}

declare namespace As2OutgoingMessage {
  /** The fields of `As2OutgoingMessage` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Id of the AS2 Partner. */
    id?: number | null

    /** ID of the Workspace associated with this AS2 Outgoing Message. */
    workspace_id?: number | null

    /** Id of the AS2 Partner associated with this message. */
    as2_partner_id?: number | null

    /** Id of the AS2 Station associated with this message. */
    as2_station_id?: number | null

    /** UUID assigned to this message. */
    uuid?: string | null

    /** HTTP Headers sent with this message. */
    http_headers?: Files.JsonObject | null

    /** Result of processing. */
    processing_result?: 'not_started' | 'send_failed' | 'send_success' | 'send_success_mdn_invalid' | 'send_success_mic_mismatch' | 'send_success_message_id_mismatch' | 'send_success_signature_mismatch' | 'send_success_processing_failure' | 'send_failed_unknown_host' | 'send_failed_bad_http_response_code' | 'send_failed_ssl_error' | 'send_failed_connection_refused' | Files.OtherString | null

    /** Result of processing description. */
    processing_result_description?: string | null

    /** AS2 Message Integrity Check SHA1 */
    mic?: string | null

    /** AS2 Message Integrity Check SHA256 */
    mic_sha_256?: string | null

    /** AS2 TO */
    as2_to?: string | null

    /** AS2 FROM */
    as2_from?: string | null

    /** AS2 Subject */
    as2_subject?: string | null

    /** Date Header */
    date?: string | null

    /** AS2 Message Id */
    message_id?: string | null

    /** Encrypted Payload Body Size */
    body_size?: string | null

    /** Filename of the file being sent. */
    attachment_filename?: string | null

    /** Message creation date/time */
    created_at?: Files.DateTimeString | null

    /** HTTP Response Code received for this message */
    http_response_code?: string | null

    /** HTTP Headers received for this message. */
    http_response_headers?: Files.JsonObject | null

    /** HTTP transmission duration in seceonds */
    http_transmission_duration?: number | null

    /** Did the partner give a response body? */
    mdn_received?: boolean | null

    /** Is the response in MDN format? */
    mdn_valid?: boolean | null

    /** MDN signature verified? */
    mdn_signature_verified?: boolean | null

    /** MDN message id matched? */
    mdn_message_id_matched?: boolean | null

    /** MDN MIC matched? */
    mdn_mic_matched?: boolean | null

    /** MDN disposition indicate a successful processing? */
    mdn_processing_success?: boolean | null

    /** URL to download the original file contents */
    raw_uri?: string | null

    /** URL to download the file contents encoded as smime */
    smime_uri?: string | null

    /** URL to download the file contents as smime with signature */
    smime_signed_uri?: string | null

    /** URL to download the encrypted signed smime that is to sent as AS2 body */
    encrypted_uri?: string | null

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
     * `as2_station_id`, `workspace_id` or `as2_partner_id`. Valid field combinations are `[ as2_station_id, created_at
     * ]`, `[ workspace_id, created_at ]`, `[ as2_partner_id, created_at ]`, `[ workspace_id, as2_station_id ]`, `[
     * workspace_id, as2_partner_id ]`, `[ workspace_id, as2_station_id, created_at ]` or `[ workspace_id,
     * as2_partner_id, created_at ]`.
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

export default As2OutgoingMessage
