/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EmailIncomingMessage
 */
class EmailIncomingMessage {
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

  // int64 # Id of the Email Incoming Message
  getId = () => this.attributes.id

  // int64 # Id of the Inbox associated with this message
  getInboxId = () => this.attributes.inbox_id

  // string # Sender of the email
  getSender = () => this.attributes.sender

  // string # Sender name
  getSenderName = () => this.attributes.sender_name

  // string # Status of the message
  getStatus = () => this.attributes.status

  // string # Body of the email
  getBody = () => this.attributes.body

  // string # Message describing the failure
  getMessage = () => this.attributes.message

  // date-time # Message creation date/time
  getCreatedAt = () => this.attributes.created_at

  // string # Title of the Inbox associated with this message
  getInboxTitle = () => this.attributes.inbox_title

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`, `sender`, `status` or `inbox_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `inbox_id`, `sender` or `status`. Valid field combinations are `[ created_at, inbox_id ]`, `[ created_at, sender ]`, `[ created_at, status ]`, `[ inbox_id, status ]`, `[ created_at, inbox_id, status ]`, `[ inbox_id, sender, status ]` or `[ created_at, inbox_id, sender, status ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `sender`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/email_incoming_messages', 'GET', params, options)

    return response?.data?.map(obj => new EmailIncomingMessage(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EmailIncomingMessage.list(params, options)

  // Parameters:
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`, `sender`, `status` or `inbox_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `inbox_id`, `sender` or `status`. Valid field combinations are `[ created_at, inbox_id ]`, `[ created_at, sender ]`, `[ created_at, status ]`, `[ inbox_id, status ]`, `[ created_at, inbox_id, status ]`, `[ inbox_id, sender, status ]` or `[ created_at, inbox_id, sender, status ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `sender`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static createExport = async (params = {}, options = {}) => {
    const response = await Api.sendRequest('/email_incoming_messages/create_export', 'POST', params, options)

    const Export = require('./Export.js').default
    return response?.data?.map(obj => new Export(obj, options)) || []
  }
}

export default EmailIncomingMessage

module.exports = EmailIncomingMessage
module.exports.default = EmailIncomingMessage
