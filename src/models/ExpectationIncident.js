/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
const exposeAttributes = (model, names) => {
  names.forEach(name => {
    if (!(name in model)) {
      Object.defineProperty(model, name, { get: () => model.attributes[name] })
    }
  })
}

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
const adoptAttributes = (model, attributes = {}) => {
  const adopted = {}
  Object.entries(attributes).forEach(([key, value]) => {
    adopted[key.replace('?', '')] = value
  })

  model.attributes = adopted
  exposeAttributes(model, Object.keys(adopted))
}

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
const retainedOptions = options => {
  if (!options?.client) {
    return options
  }

  const { signal, ...context } = options
  return context
}

/**
 * Class ExpectationIncident
 */
class ExpectationIncident {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.snoozed_until !== undefined && params.snoozed_until !== null && !isString(params.snoozed_until)) {
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
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
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `created_at` or `expectation_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `expectation_id` and `workspace_id`. Valid field combinations are `[ workspace_id, expectation_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/expectation_incidents', 'GET', params, options)

    return response?.data?.map(obj => new ExpectationIncident(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ExpectationIncident.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ExpectationIncident.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Expectation Incident ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/expectation_incidents/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ExpectationIncident(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ExpectationIncident.find(id, params, options)
}

export default ExpectationIncident

module.exports = ExpectationIncident
module.exports.default = ExpectationIncident
