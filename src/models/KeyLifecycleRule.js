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
 * Class KeyLifecycleRule
 */
class KeyLifecycleRule {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Key Lifecycle Rule ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Key type for which the rule will apply (gpg, ssh, or api).
  getKeyType = () => this.attributes.key_type

  setKeyType = value => {
    this.attributes.key_type = value
    exposeAttributes(this, ['key_type'])
  }

  // int64 # Number of days of inactivity before the rule applies.
  getInactivityDays = () => this.attributes.inactivity_days

  setInactivityDays = value => {
    this.attributes.inactivity_days = value
    exposeAttributes(this, ['inactivity_days'])
  }

  // int64 # Number of days after creation before an SSH key expires. Applies only to SSH keys.
  getExpirationDays = () => this.attributes.expiration_days

  setExpirationDays = value => {
    this.attributes.expiration_days = value
    exposeAttributes(this, ['expiration_days'])
  }

  // boolean # If true, a default-workspace rule also applies to keys in all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
    exposeAttributes(this, ['apply_to_all_workspaces'])
  }

  // string # Key Lifecycle Rule name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // Parameters:
  //   apply_to_all_workspaces - boolean - If true, a default-workspace rule also applies to keys in all workspaces.
  //   expiration_days - int64 - Number of days after creation before an SSH key expires. Applies only to SSH keys.
  //   key_type - string - Key type for which the rule will apply (gpg, ssh, or api).
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies.
  //   name - string - Key Lifecycle Rule name
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
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

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.expiration_days !== undefined && params.expiration_days !== null && !isInt(params.expiration_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: expiration_days must be of type Int, received ${getType(params.expiration_days)}`)
    }

    if (params.key_type !== undefined && params.key_type !== null && !isString(params.key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: key_type must be of type String, received ${getType(params.key_type)}`)
    }

    if (params.inactivity_days !== undefined && params.inactivity_days !== null && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/key_lifecycle_rules/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/key_lifecycle_rules/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await KeyLifecycleRule.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `key_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `key_type` and `workspace_id`. Valid field combinations are `[ workspace_id, key_type ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/key_lifecycle_rules', 'GET', params, options)

    return response?.data?.map(obj => new KeyLifecycleRule(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    KeyLifecycleRule.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      KeyLifecycleRule.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Key Lifecycle Rule ID.
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

    const response = await Api.sendRequest(`/key_lifecycle_rules/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new KeyLifecycleRule(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    KeyLifecycleRule.find(id, params, options)

  // Parameters:
  //   apply_to_all_workspaces - boolean - If true, a default-workspace rule also applies to keys in all workspaces.
  //   expiration_days - int64 - Number of days after creation before an SSH key expires. Applies only to SSH keys.
  //   key_type - string - Key type for which the rule will apply (gpg, ssh, or api).
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies.
  //   name - string - Key Lifecycle Rule name
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.expiration_days !== undefined && params.expiration_days !== null && !isInt(params.expiration_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: expiration_days must be of type Int, received ${getType(params.expiration_days)}`)
    }

    if (params.key_type !== undefined && params.key_type !== null && !isString(params.key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: key_type must be of type String, received ${getType(params.key_type)}`)
    }

    if (params.inactivity_days !== undefined && params.inactivity_days !== null && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/key_lifecycle_rules', 'POST', params, options)

    return new KeyLifecycleRule(response?.data, retainedOptions(options))
  }
}

export default KeyLifecycleRule

module.exports = KeyLifecycleRule
module.exports.default = KeyLifecycleRule
