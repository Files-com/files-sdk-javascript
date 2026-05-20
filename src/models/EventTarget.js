/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EventTarget
 */
class EventTarget {
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

  // int64 # Event Target ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Event Target name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Event Target type.
  getTargetType = () => this.attributes.target_type

  setTargetType = value => {
    this.attributes.target_type = value
  }

  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // boolean # If true, this default-workspace target can receive events from all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
  }

  // boolean # Whether this Event Target can receive events.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
  }

  // object # Event Target configuration.
  getConfig = () => this.attributes.config

  setConfig = value => {
    this.attributes.config = value
  }

  // object # Event Target delivery policy. Email targets support batch_interval in seconds, between 600 and 86400.
  getDeliveryPolicy = () => this.attributes.delivery_policy

  setDeliveryPolicy = value => {
    this.attributes.delivery_policy = value
  }

  // date-time # Event Target create date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Event Target update date/time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Event Target name.
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace target can receive events from all workspaces.
  //   target_type - string - Event Target type.
  //   enabled - boolean - Whether this Event Target can receive events.
  //   config - object - Event Target configuration.
  //   delivery_policy - object - Event Target delivery policy. Email targets support batch_interval in seconds, between 600 and 86400.
  update = async (params = {}) => {
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

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.target_type && !isString(params.target_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: target_type must be of type String, received ${getType(params.target_type)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/event_targets/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new EventTarget(response?.data, this.options)
  }

  delete = async (params = {}) => {
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

    await Api.sendRequest(`/event_targets/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await EventTarget.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `enabled` and `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`, `target_type` or `workspace_id`. Valid field combinations are `[ enabled, target_type ]`, `[ workspace_id, enabled ]` or `[ workspace_id, enabled, target_type ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_targets', 'GET', params, options)

    return response?.data?.map(obj => new EventTarget(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EventTarget.list(params, options)

  // Parameters:
  //   id (required) - int64 - Event Target ID.
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

    const response = await Api.sendRequest(`/event_targets/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventTarget(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    EventTarget.find(id, params, options)

  // Parameters:
  //   name (required) - string - Event Target name.
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace target can receive events from all workspaces.
  //   target_type (required) - string - Event Target type.
  //   enabled - boolean - Whether this Event Target can receive events.
  //   config (required) - object - Event Target configuration.
  //   delivery_policy - object - Event Target delivery policy. Email targets support batch_interval in seconds, between 600 and 86400.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.target_type) {
      throw new errors.MissingParameterError('Parameter missing: target_type')
    }

    if (!params.config) {
      throw new errors.MissingParameterError('Parameter missing: config')
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.target_type && !isString(params.target_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: target_type must be of type String, received ${getType(params.target_type)}`)
    }

    const response = await Api.sendRequest('/event_targets', 'POST', params, options)

    return new EventTarget(response?.data, options)
  }
}

export default EventTarget

module.exports = EventTarget
module.exports.default = EventTarget
