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
 * Class EventTarget
 */
class EventTarget {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Event Target ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Event Target name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Event Target type.
  getTargetType = () => this.attributes.target_type

  setTargetType = value => {
    this.attributes.target_type = value
    exposeAttributes(this, ['target_type'])
  }

  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // boolean # If true, this default-workspace target can receive events from all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
    exposeAttributes(this, ['apply_to_all_workspaces'])
  }

  // boolean # Whether this Event Target can receive events.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
    exposeAttributes(this, ['enabled'])
  }

  // object # Event Target configuration. Folder targets accept path and format (json or csv).
  getConfig = () => this.attributes.config

  setConfig = value => {
    this.attributes.config = value
    exposeAttributes(this, ['config'])
  }

  // object # Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400. Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other matching events retain immediate delivery.
  getDeliveryPolicy = () => this.attributes.delivery_policy

  setDeliveryPolicy = value => {
    this.attributes.delivery_policy = value
    exposeAttributes(this, ['delivery_policy'])
  }

  // date-time # Event Target create date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Event Target update date/time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Event Target name.
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace target can receive events from all workspaces.
  //   enabled - boolean - Whether this Event Target can receive events.
  //   config - object - Event Target configuration. Folder targets accept path and format (json or csv).
  //   delivery_policy - object - Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400. Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other matching events retain immediate delivery.
  update = async (params = {}) => {
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

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (isArray(params.enabled) || isObject(params.enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: enabled must be of type Boolean, received ${getType(params.enabled)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/event_targets/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
  }

  delete = async (params = {}) => {
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

    await Api.sendRequest(`/event_targets/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await EventTarget.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`, `enabled` or `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`, `target_type` or `workspace_id`. Valid field combinations are `[ enabled, target_type ]`, `[ workspace_id, enabled ]` or `[ workspace_id, enabled, target_type ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_targets', 'GET', params, options)

    return response?.data?.map(obj => new EventTarget(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    EventTarget.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      EventTarget.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Event Target ID.
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

    const response = await Api.sendRequest(`/event_targets/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventTarget(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    EventTarget.find(id, params, options)

  // Parameters:
  //   name (required) - string - Event Target name.
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace target can receive events from all workspaces.
  //   enabled - boolean - Whether this Event Target can receive events.
  //   config (required) - object - Event Target configuration. Folder targets accept path and format (json or csv).
  //   delivery_policy - object - Event Target delivery policy. Email and folder targets support batch_interval in seconds, between 600 and 86400. Slack and Teams support delivery_mode (immediate or subfolder_summary), summary_path (empty string means root), and summary_delay (15–300 seconds, default 60). The summary applies to matching file activity under summary_path; other matching events retain immediate delivery.
  //   target_type (required) - string - Event Target type.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.config) {
      throw new errors.MissingParameterError('Parameter missing: config')
    }

    if (!params.target_type) {
      throw new errors.MissingParameterError('Parameter missing: target_type')
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (isArray(params.enabled) || isObject(params.enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: enabled must be of type Boolean, received ${getType(params.enabled)}`)
    }

    if (params.target_type !== undefined && params.target_type !== null && !isString(params.target_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: target_type must be of type String, received ${getType(params.target_type)}`)
    }

    const response = await Api.sendRequest('/event_targets', 'POST', params, options)

    return new EventTarget(response?.data, retainedOptions(options))
  }
}

export default EventTarget

module.exports = EventTarget
module.exports.default = EventTarget
