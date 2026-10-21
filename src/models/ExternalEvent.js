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
 * Class ExternalEvent
 */
class ExternalEvent {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Event ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Type of event being recorded.
  getEventType = () => this.attributes.event_type

  setEventType = value => {
    this.attributes.event_type = value
    exposeAttributes(this, ['event_type'])
  }

  // string # Status of event.
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // string # Event body
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
    exposeAttributes(this, ['body'])
  }

  // date-time # External event create date/time
  getCreatedAt = () => this.attributes.created_at

  // string # Link to log file.
  getBodyUrl = () => this.attributes.body_url

  setBodyUrl = value => {
    this.attributes.body_url = value
    exposeAttributes(this, ['body_url'])
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The ExternalEvent object doesn\'t support updates.')
    } else {
      const newObject = await ExternalEvent.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`, `status` or `event_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at` and `status`. Valid field combinations are `[ status, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/external_events', 'GET', params, options)

    return response?.data?.map(obj => new ExternalEvent(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ExternalEvent.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ExternalEvent.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - External Event ID.
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

    const response = await Api.sendRequest(`/external_events/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ExternalEvent(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ExternalEvent.find(id, params, options)

  // Parameters:
  //   status (required) - string - Status of event.
  //   body (required) - string - Event body
  static create = async (params = {}, options = {}) => {
    if (!params.status) {
      throw new errors.MissingParameterError('Parameter missing: status')
    }

    if (!params.body) {
      throw new errors.MissingParameterError('Parameter missing: body')
    }

    if (params.status !== undefined && params.status !== null && !isString(params.status)) {
      throw new errors.InvalidParameterError(`Bad parameter: status must be of type String, received ${getType(params.status)}`)
    }

    if (params.body !== undefined && params.body !== null && !isString(params.body)) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params.body)}`)
    }

    const response = await Api.sendRequest('/external_events', 'POST', params, options)

    return new ExternalEvent(response?.data, retainedOptions(options))
  }
}

export default ExternalEvent

module.exports = ExternalEvent
module.exports.default = ExternalEvent
