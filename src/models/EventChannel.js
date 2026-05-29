/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class EventChannel
 */
class EventChannel {
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

  // int64 # Event Channel ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Event Channel name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Event Channel description.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // boolean # Whether this Event Channel can dispatch events.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
  }

  // boolean # Whether this Event Channel is the default destination for newly published events.
  getDefaultChannel = () => this.attributes.default_channel

  setDefaultChannel = value => {
    this.attributes.default_channel = value
  }

  // date-time # Event Channel create date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Event Channel update date/time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Event Channel name.
  //   description - string - Event Channel description.
  //   enabled - boolean - Whether this Event Channel can dispatch events.
  //   default_channel - boolean - Whether this Event Channel is the default destination for newly published events.
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

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/event_channels/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new EventChannel(response?.data, this.options)
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

    await Api.sendRequest(`/event_channels/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await EventChannel.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `enabled` and `default_channel`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `enabled` and `default_channel`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/event_channels', 'GET', params, options)

    return response?.data?.map(obj => new EventChannel(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    EventChannel.list(params, options)

  // Parameters:
  //   id (required) - int64 - Event Channel ID.
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

    const response = await Api.sendRequest(`/event_channels/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new EventChannel(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    EventChannel.find(id, params, options)

  // Parameters:
  //   name (required) - string - Event Channel name.
  //   description - string - Event Channel description.
  //   enabled - boolean - Whether this Event Channel can dispatch events.
  //   default_channel - boolean - Whether this Event Channel is the default destination for newly published events.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    const response = await Api.sendRequest('/event_channels', 'POST', params, options)

    return new EventChannel(response?.data, options)
  }
}

export default EventChannel

module.exports = EventChannel
module.exports.default = EventChannel
