/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class PublicHostingRequestLog
 */
class PublicHostingRequestLog {
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

  // string # IP Address of Public Hosting Client.
  getRemoteIp = () => this.attributes.remote_ip

  // string # IP Address of Public Hosting Server.
  getServerIp = () => this.attributes.server_ip

  // string # HTTP Request Hostname.
  getHostname = () => this.attributes.hostname

  // string # HTTP Request Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // int64 # HTTP Response Code.
  getResponseCode = () => this.attributes.responseCode

  // boolean # Whether SFTP Action was successful.
  getSuccess = () => this.attributes.success

  // int64 # Duration (in milliseconds).
  getDurationMs = () => this.attributes.duration_ms

  // date-time # Start Time of Action.
  getCreatedAt = () => this.attributes.created_at

  // int64 # The number of bytes transferred for file downloads.
  getBytesTransferred = () => this.attributes.bytes_transferred

  // string # Method of the HTTP call.
  getHttpMethod = () => this.attributes.http_method

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date`, `path`, `remote_ip`, `success` or `created_at`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ remote_ip ]`, `[ success ]`, `[ created_at ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, created_at ]`, `[ end_date, path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, created_at ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, created_at ]`, `[ remote_ip, success ]`, `[ remote_ip, created_at ]`, `[ success, created_at ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, created_at ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, created_at ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, created_at ]`, `[ start_date, success, created_at ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, created_at ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, created_at ]`, `[ end_date, success, created_at ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, created_at ]`, `[ path, success, created_at ]`, `[ remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, created_at ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, created_at ]`, `[ start_date, end_date, success, created_at ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, created_at ]`, `[ start_date, path, success, created_at ]`, `[ start_date, remote_ip, success, created_at ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, created_at ]`, `[ end_date, path, success, created_at ]`, `[ end_date, remote_ip, success, created_at ]`, `[ path, remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, created_at ]`, `[ start_date, end_date, path, success, created_at ]`, `[ start_date, end_date, remote_ip, success, created_at ]`, `[ start_date, path, remote_ip, success, created_at ]` or `[ end_date, path, remote_ip, success, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ remote_ip ]`, `[ success ]`, `[ created_at ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, created_at ]`, `[ end_date, path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, created_at ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, created_at ]`, `[ remote_ip, success ]`, `[ remote_ip, created_at ]`, `[ success, created_at ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, created_at ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, created_at ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, created_at ]`, `[ start_date, success, created_at ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, created_at ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, created_at ]`, `[ end_date, success, created_at ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, created_at ]`, `[ path, success, created_at ]`, `[ remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, created_at ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, created_at ]`, `[ start_date, end_date, success, created_at ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, created_at ]`, `[ start_date, path, success, created_at ]`, `[ start_date, remote_ip, success, created_at ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, created_at ]`, `[ end_date, path, success, created_at ]`, `[ end_date, remote_ip, success, created_at ]`, `[ path, remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, created_at ]`, `[ start_date, end_date, path, success, created_at ]`, `[ start_date, end_date, remote_ip, success, created_at ]`, `[ start_date, path, remote_ip, success, created_at ]` or `[ end_date, path, remote_ip, success, created_at ]`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ remote_ip ]`, `[ success ]`, `[ created_at ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, created_at ]`, `[ end_date, path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, created_at ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, created_at ]`, `[ remote_ip, success ]`, `[ remote_ip, created_at ]`, `[ success, created_at ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, created_at ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, created_at ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, created_at ]`, `[ start_date, success, created_at ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, created_at ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, created_at ]`, `[ end_date, success, created_at ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, created_at ]`, `[ path, success, created_at ]`, `[ remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, created_at ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, created_at ]`, `[ start_date, end_date, success, created_at ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, created_at ]`, `[ start_date, path, success, created_at ]`, `[ start_date, remote_ip, success, created_at ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, created_at ]`, `[ end_date, path, success, created_at ]`, `[ end_date, remote_ip, success, created_at ]`, `[ path, remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, created_at ]`, `[ start_date, end_date, path, success, created_at ]`, `[ start_date, end_date, remote_ip, success, created_at ]`, `[ start_date, path, remote_ip, success, created_at ]` or `[ end_date, path, remote_ip, success, created_at ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ remote_ip ]`, `[ success ]`, `[ created_at ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, created_at ]`, `[ end_date, path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, created_at ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, created_at ]`, `[ remote_ip, success ]`, `[ remote_ip, created_at ]`, `[ success, created_at ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, created_at ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, created_at ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, created_at ]`, `[ start_date, success, created_at ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, created_at ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, created_at ]`, `[ end_date, success, created_at ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, created_at ]`, `[ path, success, created_at ]`, `[ remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, created_at ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, created_at ]`, `[ start_date, end_date, success, created_at ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, created_at ]`, `[ start_date, path, success, created_at ]`, `[ start_date, remote_ip, success, created_at ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, created_at ]`, `[ end_date, path, success, created_at ]`, `[ end_date, remote_ip, success, created_at ]`, `[ path, remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, created_at ]`, `[ start_date, end_date, path, success, created_at ]`, `[ start_date, end_date, remote_ip, success, created_at ]`, `[ start_date, path, remote_ip, success, created_at ]` or `[ end_date, path, remote_ip, success, created_at ]`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ remote_ip ]`, `[ success ]`, `[ created_at ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, created_at ]`, `[ end_date, path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, created_at ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, created_at ]`, `[ remote_ip, success ]`, `[ remote_ip, created_at ]`, `[ success, created_at ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, created_at ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, created_at ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, created_at ]`, `[ start_date, success, created_at ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, created_at ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, created_at ]`, `[ end_date, success, created_at ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, created_at ]`, `[ path, success, created_at ]`, `[ remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, created_at ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, created_at ]`, `[ start_date, end_date, success, created_at ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, created_at ]`, `[ start_date, path, success, created_at ]`, `[ start_date, remote_ip, success, created_at ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, created_at ]`, `[ end_date, path, success, created_at ]`, `[ end_date, remote_ip, success, created_at ]`, `[ path, remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, created_at ]`, `[ start_date, end_date, path, success, created_at ]`, `[ start_date, end_date, remote_ip, success, created_at ]`, `[ start_date, path, remote_ip, success, created_at ]` or `[ end_date, path, remote_ip, success, created_at ]`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ path ]`, `[ remote_ip ]`, `[ success ]`, `[ created_at ]`, `[ start_date, end_date ]`, `[ start_date, path ]`, `[ start_date, remote_ip ]`, `[ start_date, success ]`, `[ start_date, created_at ]`, `[ end_date, path ]`, `[ end_date, remote_ip ]`, `[ end_date, success ]`, `[ end_date, created_at ]`, `[ path, remote_ip ]`, `[ path, success ]`, `[ path, created_at ]`, `[ remote_ip, success ]`, `[ remote_ip, created_at ]`, `[ success, created_at ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, remote_ip ]`, `[ start_date, end_date, success ]`, `[ start_date, end_date, created_at ]`, `[ start_date, path, remote_ip ]`, `[ start_date, path, success ]`, `[ start_date, path, created_at ]`, `[ start_date, remote_ip, success ]`, `[ start_date, remote_ip, created_at ]`, `[ start_date, success, created_at ]`, `[ end_date, path, remote_ip ]`, `[ end_date, path, success ]`, `[ end_date, path, created_at ]`, `[ end_date, remote_ip, success ]`, `[ end_date, remote_ip, created_at ]`, `[ end_date, success, created_at ]`, `[ path, remote_ip, success ]`, `[ path, remote_ip, created_at ]`, `[ path, success, created_at ]`, `[ remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip ]`, `[ start_date, end_date, path, success ]`, `[ start_date, end_date, path, created_at ]`, `[ start_date, end_date, remote_ip, success ]`, `[ start_date, end_date, remote_ip, created_at ]`, `[ start_date, end_date, success, created_at ]`, `[ start_date, path, remote_ip, success ]`, `[ start_date, path, remote_ip, created_at ]`, `[ start_date, path, success, created_at ]`, `[ start_date, remote_ip, success, created_at ]`, `[ end_date, path, remote_ip, success ]`, `[ end_date, path, remote_ip, created_at ]`, `[ end_date, path, success, created_at ]`, `[ end_date, remote_ip, success, created_at ]`, `[ path, remote_ip, success, created_at ]`, `[ start_date, end_date, path, remote_ip, success ]`, `[ start_date, end_date, path, remote_ip, created_at ]`, `[ start_date, end_date, path, success, created_at ]`, `[ start_date, end_date, remote_ip, success, created_at ]`, `[ start_date, path, remote_ip, success, created_at ]` or `[ end_date, path, remote_ip, success, created_at ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/public_hosting_request_logs', 'GET', params, options)

    return response?.data?.map(obj => new PublicHostingRequestLog(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    PublicHostingRequestLog.list(params, options)
}

export default PublicHostingRequestLog

module.exports = PublicHostingRequestLog
module.exports.default = PublicHostingRequestLog
