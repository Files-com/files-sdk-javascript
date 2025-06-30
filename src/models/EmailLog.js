/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EmailLog
 */
class EmailLog {
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

  // date-time # Start Time of Action. Deprecrated: Use created_at.
  getTimestamp = () => this.attributes.timestamp

  // string # Log Message
  getMessage = () => this.attributes.message

  // string # Status of E-Mail delivery
  getStatus = () => this.attributes.status

  // string # Subject line of E-Mail
  getSubject = () => this.attributes.subject

  // string # To field of E-Mail
  getTo = () => this.attributes.to

  // string # CC field of E-Mail
  getCc = () => this.attributes.cc

  // string # How was the email delivered?  `customer_smtp` or `files.com`
  getDeliveryMethod = () => this.attributes.delivery_method

  // string # Customer SMTP Hostname used.
  getSmtpHostname = () => this.attributes.smtp_hostname

  // string # Customer SMTP IP address as resolved for use (useful for troubleshooting DNS issues with customer SMTP).
  getSmtpIp = () => this.attributes.smtp_ip

  // date-time # Start Time of Action
  getCreatedAt = () => this.attributes.created_at

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status` and `created_at`. Valid field combinations are `[ status ]`, `[ created_at ]` or `[ status, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ status ]`, `[ created_at ]` or `[ status, created_at ]`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ status ]`, `[ created_at ]` or `[ status, created_at ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `status`. Valid field combinations are `[ status ]`, `[ created_at ]` or `[ status, created_at ]`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ status ]`, `[ created_at ]` or `[ status, created_at ]`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ status ]`, `[ created_at ]` or `[ status, created_at ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/email_logs', 'GET', params, options)

    return response?.data?.map(obj => new EmailLog(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EmailLog.list(params, options)
}

export default EmailLog

module.exports = EmailLog
module.exports.default = EmailLog
