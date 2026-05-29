/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class SiemHttpDestinationEvent
 */
class SiemHttpDestinationEvent {
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

  // int64 # Event ID
  getId = () => this.attributes.id

  // string # Type of SIEM event being recorded.
  getEventType = () => this.attributes.event_type

  // string # Status of event.
  getStatus = () => this.attributes.status

  // string # Event body.
  getBody = () => this.attributes.body

  // array(string) # Event errors.
  getEventErrors = () => this.attributes.event_errors

  // date-time # Event create date/time.
  getCreatedAt = () => this.attributes.created_at

  // string # Link to log file.
  getBodyUrl = () => this.attributes.body_url

  // int64 # SIEM ID.
  getSiemHttpDestinationId = () => this.attributes.siem_http_destination_id

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`, `status` or `siem_http_destination_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `siem_http_destination_id` or `status`. Valid field combinations are `[ siem_http_destination_id, created_at ]`, `[ status, created_at ]`, `[ siem_http_destination_id, status ]` or `[ siem_http_destination_id, status, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/siem_http_destination_events', 'GET', params, options)

    return response?.data?.map(obj => new SiemHttpDestinationEvent(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SiemHttpDestinationEvent.list(params, options)

  // Parameters:
  //   id (required) - int64 - Siem Http Destination Event ID.
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

    const response = await Api.sendRequest(`/siem_http_destination_events/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new SiemHttpDestinationEvent(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    SiemHttpDestinationEvent.find(id, params, options)
}

export default SiemHttpDestinationEvent

module.exports = SiemHttpDestinationEvent
module.exports.default = SiemHttpDestinationEvent
