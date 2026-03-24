/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class ExpectationIncident
 */
class ExpectationIncident {
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

  // int64 # Expectation Incident ID
  getId = () => this.attributes.id

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  // int64 # Expectation ID.
  getExpectationId = () => this.attributes.expectation_id

  // string # Incident status.
  getStatus = () => this.attributes.status

  // date-time # When the incident was opened.
  getOpenedAt = () => this.attributes.opened_at

  // date-time # When the most recent failing evaluation contributing to the incident occurred.
  getLastFailedAt = () => this.attributes.last_failed_at

  // date-time # When the incident was acknowledged.
  getAcknowledgedAt = () => this.attributes.acknowledged_at

  // date-time # When the current snooze expires.
  getSnoozedUntil = () => this.attributes.snoozed_until

  // date-time # When the incident was resolved.
  getResolvedAt = () => this.attributes.resolved_at

  // int64 # Evaluation that first opened the incident.
  getOpenedByEvaluationId = () => this.attributes.opened_by_evaluation_id

  // int64 # Most recent evaluation linked to the incident.
  getLastEvaluationId = () => this.attributes.last_evaluation_id

  // int64 # Evaluation that resolved the incident.
  getResolvedByEvaluationId = () => this.attributes.resolved_by_evaluation_id

  // object # Compact incident summary payload.
  getSummary = () => this.attributes.summary

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Resolve an expectation incident
  resolve = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/expectation_incidents/${encodeURIComponent(params.id)}/resolve`, 'POST', params, this.options)

    return new ExpectationIncident(response?.data, this.options)
  }

  // Snooze an expectation incident until a specified time
  //
  // Parameters:
  //   snoozed_until (required) - string - Time until which the incident should remain snoozed.
  snooze = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.snoozed_until && !isString(params.snoozed_until)) {
      throw new errors.InvalidParameterError(`Bad parameter: snoozed_until must be of type String, received ${getType(params.snoozed_until)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params.snoozed_until) {
      if (this.attributes.snoozed_until) {
        params.snoozed_until = this.snoozed_until
      } else {
        throw new errors.MissingParameterError('Parameter missing: snoozed_until')
      }
    }

    const response = await Api.sendRequest(`/expectation_incidents/${encodeURIComponent(params.id)}/snooze`, 'POST', params, this.options)

    return new ExpectationIncident(response?.data, this.options)
  }

  // Acknowledge an expectation incident
  acknowledge = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/expectation_incidents/${encodeURIComponent(params.id)}/acknowledge`, 'POST', params, this.options)

    return new ExpectationIncident(response?.data, this.options)
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `created_at` or `expectation_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `expectation_id` and `workspace_id`. Valid field combinations are `[ workspace_id, expectation_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/expectation_incidents', 'GET', params, options)

    return response?.data?.map(obj => new ExpectationIncident(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ExpectationIncident.list(params, options)

  // Parameters:
  //   id (required) - int64 - Expectation Incident ID.
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

    const response = await Api.sendRequest(`/expectation_incidents/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ExpectationIncident(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ExpectationIncident.find(id, params, options)
}

export default ExpectationIncident

module.exports = ExpectationIncident
module.exports.default = ExpectationIncident
