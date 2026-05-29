/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EventSubscription
 */
class EventSubscription {
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

  // int64 # Event Subscription ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Event Channel ID
  getEventChannelId = () => this.attributes.event_channel_id

  setEventChannelId = value => {
    this.attributes.event_channel_id = value
  }

  // int64 # Workspace ID. 0 means the default workspace or site-wide.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // boolean # If true, this default-workspace subscription applies to events from all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
  }

  // string # Event Subscription name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // boolean # Whether this Event Subscription can dispatch events.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
  }

  // array(string) # Event type strings matched by this subscription. Blank means all event types.
  getEventTypes = () => this.attributes.event_types

  setEventTypes = value => {
    this.attributes.event_types = value
  }

  // object # Structured event payload filter.
  getFilter = () => this.attributes.filter

  setFilter = value => {
    this.attributes.filter = value
  }

  // object # Event Subscription delivery policy.
  getDeliveryPolicy = () => this.attributes.delivery_policy

  setDeliveryPolicy = value => {
    this.attributes.delivery_policy = value
  }

  // array(int64) # Event Target IDs this subscription sends to.
  getEventTargetIds = () => this.attributes.event_target_ids

  setEventTargetIds = value => {
    this.attributes.event_target_ids = value
  }

  // date-time # Event Subscription create date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Event Subscription update date/time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   event_channel_id - int64 - Event Channel ID
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace subscription applies to events from all workspaces.
  //   name - string - Event Subscription name.
  //   enabled - boolean - Whether this Event Subscription can dispatch events.
  //   event_types - array(string) - Event type strings matched by this subscription. Blank means all event types.
  //   filter - object - Structured event payload filter.
  //   delivery_policy - object - Event Subscription delivery policy.
  //   event_target_ids - array(int64) - Event Target IDs this subscription sends to.
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

    if (params.event_channel_id && !isInt(params.event_channel_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_channel_id must be of type Int, received ${getType(params.event_channel_id)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.event_types && !isArray(params.event_types)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_types must be of type Array, received ${getType(params.event_types)}`)
    }

    if (params.event_target_ids && !isArray(params.event_target_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_target_ids must be of type Array, received ${getType(params.event_target_ids)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/event_subscriptions/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new EventSubscription(response?.data, this.options)
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

    await Api.sendRequest(`/event_subscriptions/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await EventSubscription.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `enabled`, `event_channel_id` or `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled`, `event_channel_id` or `workspace_id`. Valid field combinations are `[ enabled, event_channel_id ]`, `[ workspace_id, enabled ]` or `[ workspace_id, enabled, event_channel_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_subscriptions', 'GET', params, options)

    return response?.data?.map(obj => new EventSubscription(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EventSubscription.list(params, options)

  // Parameters:
  //   id (required) - int64 - Event Subscription ID.
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

    const response = await Api.sendRequest(`/event_subscriptions/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventSubscription(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    EventSubscription.find(id, params, options)

  // Parameters:
  //   event_channel_id - int64 - Event Channel ID
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace or site-wide.
  //   apply_to_all_workspaces - boolean - If true, this default-workspace subscription applies to events from all workspaces.
  //   name (required) - string - Event Subscription name.
  //   enabled - boolean - Whether this Event Subscription can dispatch events.
  //   event_types - array(string) - Event type strings matched by this subscription. Blank means all event types.
  //   filter - object - Structured event payload filter.
  //   delivery_policy - object - Event Subscription delivery policy.
  //   event_target_ids - array(int64) - Event Target IDs this subscription sends to.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.event_channel_id && !isInt(params.event_channel_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_channel_id must be of type Int, received ${getType(params.event_channel_id)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.event_types && !isArray(params.event_types)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_types must be of type Array, received ${getType(params.event_types)}`)
    }

    if (params.event_target_ids && !isArray(params.event_target_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: event_target_ids must be of type Array, received ${getType(params.event_target_ids)}`)
    }

    const response = await Api.sendRequest('/event_subscriptions', 'POST', params, options)

    return new EventSubscription(response?.data, options)
  }
}

export default EventSubscription

module.exports = EventSubscription
module.exports.default = EventSubscription
