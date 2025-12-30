/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class KeyLifecycleRule
 */
class KeyLifecycleRule {
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

  // int64 # Key Lifecycle Rule ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Key type for which the rule will apply (gpg or ssh).
  getKeyType = () => this.attributes.key_type

  setKeyType = value => {
    this.attributes.key_type = value
  }

  // int64 # Number of days of inactivity before the rule applies.
  getInactivityDays = () => this.attributes.inactivity_days

  setInactivityDays = value => {
    this.attributes.inactivity_days = value
  }

  // string # Key Lifecycle Rule name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // Parameters:
  //   key_type - string - Key type for which the rule will apply (gpg or ssh).
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies.
  //   name - string - Key Lifecycle Rule name
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

    if (params.key_type && !isString(params.key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: key_type must be of type String, received ${getType(params.key_type)}`)
    }

    if (params.inactivity_days && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/key_lifecycle_rules/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new KeyLifecycleRule(response?.data, this.options)
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

    await Api.sendRequest(`/key_lifecycle_rules/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await KeyLifecycleRule.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `key_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `key_type`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/key_lifecycle_rules', 'GET', params, options)

    return response?.data?.map(obj => new KeyLifecycleRule(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    KeyLifecycleRule.list(params, options)

  // Parameters:
  //   id (required) - int64 - Key Lifecycle Rule ID.
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

    const response = await Api.sendRequest(`/key_lifecycle_rules/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new KeyLifecycleRule(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    KeyLifecycleRule.find(id, params, options)

  // Parameters:
  //   key_type - string - Key type for which the rule will apply (gpg or ssh).
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies.
  //   name - string - Key Lifecycle Rule name
  static create = async (params = {}, options = {}) => {
    if (params.key_type && !isString(params.key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: key_type must be of type String, received ${getType(params.key_type)}`)
    }

    if (params.inactivity_days && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    const response = await Api.sendRequest('/key_lifecycle_rules', 'POST', params, options)

    return new KeyLifecycleRule(response?.data, options)
  }
}

export default KeyLifecycleRule

module.exports = KeyLifecycleRule
module.exports.default = KeyLifecycleRule
