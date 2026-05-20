/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EventDeliveryAttempt
 */
class EventDeliveryAttempt {
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

  // int64 # Event Delivery Attempt ID
  getId = () => this.attributes.id

  // int64 # Event Record ID
  getEventRecordId = () => this.attributes.event_record_id

  // int64 # Event Subscription ID
  getEventSubscriptionId = () => this.attributes.event_subscription_id

  // int64 # Event Target ID
  getEventTargetId = () => this.attributes.event_target_id

  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  getWorkspaceId = () => this.attributes.workspace_id

  // string # Delivery status.
  getStatus = () => this.attributes.status

  // int64 # Number of delivery attempts made.
  getAttemptNumber = () => this.attributes.attempt_number

  // int64 # HTTP response code, if applicable.
  getResponseCode = () => this.attributes.response_code

  // string # Delivery error message, if applicable.
  getErrorMessage = () => this.attributes.error_message

  // string # Delivery response body, if applicable.
  getResponseBody = () => this.attributes.response_body

  // int64 # Delivery latency in milliseconds.
  getLatencyMs = () => this.attributes.latency_ms

  // date-time # Successful delivery date/time.
  getDeliveredAt = () => this.attributes.delivered_at

  // date-time # Most recent attempt date/time.
  getLastAttemptedAt = () => this.attributes.last_attempted_at

  // date-time # Next scheduled attempt date/time.
  getNextAttemptAt = () => this.attributes.next_attempt_at

  // date-time # Delivery Attempt create date/time.
  getCreatedAt = () => this.attributes.created_at

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `status`, `event_record_id`, `event_target_id` or `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status`, `workspace_id`, `event_record_id` or `event_target_id`. Valid field combinations are `[ workspace_id, status ]`, `[ workspace_id, event_record_id ]` or `[ workspace_id, event_target_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_delivery_attempts', 'GET', params, options)

    return response?.data?.map(obj => new EventDeliveryAttempt(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EventDeliveryAttempt.list(params, options)

  // Parameters:
  //   id (required) - int64 - Event Delivery Attempt ID.
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

    const response = await Api.sendRequest(`/event_delivery_attempts/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventDeliveryAttempt(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    EventDeliveryAttempt.find(id, params, options)
}

export default EventDeliveryAttempt

module.exports = EventDeliveryAttempt
module.exports.default = EventDeliveryAttempt
