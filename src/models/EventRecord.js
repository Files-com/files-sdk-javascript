/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EventRecord
 */
class EventRecord {
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

  // int64 # Event Record ID
  getId = () => this.attributes.id

  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  getWorkspaceId = () => this.attributes.workspace_id

  // string # Stable event UUID.
  getEventUuid = () => this.attributes.event_uuid

  // string # Versioned event type string.
  getEventType = () => this.attributes.event_type

  // string # Event severity.
  getSeverity = () => this.attributes.severity

  // string # Source record type.
  getSourceType = () => this.attributes.source_type

  // int64 # Source record ID.
  getSourceId = () => this.attributes.source_id

  // date-time # Event occurrence date/time.
  getOccurredAt = () => this.attributes.occurred_at

  // string # Human-readable event title.
  getHumanTitle = () => this.attributes.human_title

  // string # Human-readable event summary.
  getHumanSummary = () => this.attributes.human_summary

  // array(object) # Human-readable event detail fields.
  getHumanFields = () => this.attributes.human_fields

  // object # Actor associated with the event.
  getActor = () => this.attributes.actor

  // array(object) # Resources associated with the event.
  getResources = () => this.attributes.resources

  // object # Event payload.
  getPayload = () => this.attributes.payload

  // date-time # Event Record create date/time.
  getCreatedAt = () => this.attributes.created_at

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `event_type`, `created_at` or `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `event_type` or `workspace_id`. Valid field combinations are `[ event_type, created_at ]`, `[ workspace_id, created_at ]`, `[ workspace_id, event_type ]` or `[ workspace_id, event_type, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `event_type`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_records', 'GET', params, options)

    return response?.data?.map(obj => new EventRecord(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EventRecord.list(params, options)

  // Parameters:
  //   id (required) - int64 - Event Record ID.
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

    const response = await Api.sendRequest(`/event_records/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventRecord(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    EventRecord.find(id, params, options)
}

export default EventRecord

module.exports = EventRecord
module.exports.default = EventRecord
