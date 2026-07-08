/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Secret
 */
class Secret {
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

  // int64 # Secret ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Workspace ID. 0 means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # Secret name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Internal description for your reference.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // string # Secret type.
  getSecretType = () => this.attributes.secret_type

  setSecretType = value => {
    this.attributes.secret_type = value
  }

  // object # Non-secret metadata for the Secret type.
  getMetadata = () => this.attributes.metadata

  setMetadata = value => {
    this.attributes.metadata = value
  }

  // array(string) # Names of configured secret value fields. Secret values are never returned.
  getValueFieldNames = () => this.attributes.value_field_names

  setValueFieldNames = value => {
    this.attributes.value_field_names = value
  }

  // date-time # Secret create date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Secret update date/time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Secret name.
  //   description - string - Internal description for your reference.
  //   secret_type - string - Secret type.
  //   metadata - object - Non-secret metadata for the Secret type.
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

    if (params.secret_type && !isString(params.secret_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: secret_type must be of type String, received ${getType(params.secret_type)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/secrets/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new Secret(response?.data, this.options)
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

    await Api.sendRequest(`/secrets/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await Secret.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `secret_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`, `name` or `secret_type`. Valid field combinations are `[ workspace_id, name ]`, `[ workspace_id, secret_type ]`, `[ secret_type, name ]` or `[ workspace_id, secret_type, name ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/secrets', 'GET', params, options)

    return response?.data?.map(obj => new Secret(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Secret.list(params, options)

  // Parameters:
  //   id (required) - int64 - Secret ID.
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

    const response = await Api.sendRequest(`/secrets/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Secret(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Secret.find(id, params, options)

  // Parameters:
  //   name (required) - string - Secret name.
  //   description - string - Internal description for your reference.
  //   secret_type (required) - string - Secret type.
  //   metadata - object - Non-secret metadata for the Secret type.
  //   workspace_id - int64 - Workspace ID. 0 means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.secret_type) {
      throw new errors.MissingParameterError('Parameter missing: secret_type')
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.secret_type && !isString(params.secret_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: secret_type must be of type String, received ${getType(params.secret_type)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/secrets', 'POST', params, options)

    return new Secret(response?.data, options)
  }
}

export default Secret

module.exports = Secret
module.exports.default = Secret
