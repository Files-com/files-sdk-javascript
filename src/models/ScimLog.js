/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class ScimLog
 */
class ScimLog {
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

  // int64 # The unique ID of this SCIM request.
  getId = () => this.attributes.id

  // string # The date and time when this SCIM request occurred.
  getCreatedAt = () => this.attributes.created_at

  // string # The path portion of the URL requested.
  getRequestPath = () => this.attributes.request_path

  // string # The HTTP method used for this request.
  getRequestMethod = () => this.attributes.request_method

  // string # The HTTP response code returned for this request.
  getHttpResponseCode = () => this.attributes.http_response_code

  // string # The User-Agent header sent with the request.
  getUserAgent = () => this.attributes.user_agent

  // string # The JSON payload sent with the request.
  getRequestJson = () => this.attributes.request_json

  // string # The JSON payload returned in the response.
  getResponseJson = () => this.attributes.response_json

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/scim_logs', 'GET', params, options)

    return response?.data?.map(obj => new ScimLog(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ScimLog.list(params, options)

  // Parameters:
  //   id (required) - int64 - Scim Log ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/scim_logs/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ScimLog(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ScimLog.find(id, params, options)
}

export default ScimLog

module.exports = ScimLog
module.exports.default = ScimLog
