import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class As2IncomingMessage
 */
class As2IncomingMessage {
  attributes = {}
  options = {}

  constructor(attributes = {}, options = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      const normalizedKey = key.replace('?', '')

      this.attributes[normalizedKey] = value

      Object.defineProperty(this, normalizedKey, { value, writable: false })
    })

    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id
  // int64 # Id of the AS2 Partner.
  getId = () => this.attributes.id

  // int64 # Id of the AS2 Partner associated with this message.
  getAs2PartnerId = () => this.attributes.as2_partner_id

  // int64 # Id of the AS2 Station associated with this message.
  getAs2StationId = () => this.attributes.as2_station_id

  // string # UUID assigned to this message.
  getUuid = () => this.attributes.uuid

  // string # Content Type header of the incoming message.
  getContentType = () => this.attributes.content_type

  // object # HTTP Headers sent with this message.
  getHttpHeaders = () => this.attributes.http_headers

  // string # JSON Structure of the activity log.
  getActivityLog = () => this.attributes.activity_log

  // string # Result of processing.
  getProcessingResult = () => this.attributes.processing_result

  // string # Result of processing description.
  getProcessingResultDescription = () => this.attributes.processing_result_description

  // string # AS2 Message Integrity Check
  getMic = () => this.attributes.mic

  // string # AS2 Message Integrity Check Algorithm Used
  getMicAlgo = () => this.attributes.mic_algo

  // string # AS2 TO header of message
  getAs2To = () => this.attributes.as2_to

  // string # AS2 FROM header of message
  getAs2From = () => this.attributes.as2_from

  // string # AS2 Message Id
  getMessageId = () => this.attributes.message_id

  // string # AS2 Subject Header
  getSubject = () => this.attributes.subject

  // string # Date Header
  getDate = () => this.attributes.date

  // string # Encrypted Payload Body Size
  getBodySize = () => this.attributes.body_size

  // string # Filename of the file being received.
  getAttachmentFilename = () => this.attributes.attachment_filename

  // string # IP Address of the Sender
  getIp = () => this.attributes.ip

  // date-time # Message creation date/time
  getCreatedAt = () => this.attributes.created_at

  // string # HTTP Response Code sent for this message
  getHttpResponseCode = () => this.attributes.http_response_code

  // object # HTTP Headers sent for this message.
  getHttpResponseHeaders = () => this.attributes.http_response_headers

  // string # Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial
  getRecipientSerial = () => this.attributes.recipient_serial

  // string # Incoming Message Recipient(the Client Cert used to encrypt this message)'s serial in hex format.
  getHexRecipientSerial = () => this.attributes.hex_recipient_serial

  // string # Incoming Message Recipient(the Client Cert used to encrypt this message)'s issuer
  getRecipientIssuer = () => this.attributes.recipient_issuer

  // boolean # Message body received?
  getMessageReceived = () => this.attributes.message_received

  // boolean # Message decrypted successfully?
  getMessageDecrypted = () => this.attributes.message_decrypted

  // boolean # Message signature verified?
  getMessageSignatureVerified = () => this.attributes.message_signature_verified

  // boolean # Message processed successfully?
  getMessageProcessingSuccess = () => this.attributes.message_processing_success

  // boolean # MDN returned?
  getMessageMdnReturned = () => this.attributes.message_mdn_returned

  // string # URL to download the encrypted signed smime that is to sent as AS2 body
  getEncryptedUri = () => this.attributes.encrypted_uri

  // string # URL to download the file contents as smime with signature
  getSmimeSignedUri = () => this.attributes.smime_signed_uri

  // string # URL to download the file contents encoded as smime
  getSmimeUri = () => this.attributes.smime_uri

  // string # URL to download the original file contents
  getRawUri = () => this.attributes.raw_uri

  // string # URL to download the http response body
  getMdnResponseUri = () => this.attributes.mdn_response_uri


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[created_at]=desc`). Valid fields are `created_at` and `as2_partner_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  //   as2_partner_id - int64 - As2 Partner ID.  If provided, will return message specific to that partner.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['as2_partner_id'] && !isInt(params['as2_partner_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: as2_partner_id must be of type Int, received ${getType(params['as2_partner_id'])}`)
    }

    const response = await Api.sendRequest(`/as2_incoming_messages`, 'GET', params, options)

    return response?.data?.map(obj => new As2IncomingMessage(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    As2IncomingMessage.list(params, options)
}

export default As2IncomingMessage
