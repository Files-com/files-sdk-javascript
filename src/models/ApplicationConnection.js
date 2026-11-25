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
 * Class ApplicationConnection
 */
class ApplicationConnection {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Connection ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Workspace that owns this connection.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # Connection display name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Application key from the Automation applications list.
  getApplicationKey = () => this.attributes.application_key

  setApplicationKey = value => {
    this.attributes.application_key = value
    exposeAttributes(this, ['application_key'])
  }

  // string # HTTPS origin for this connection.
  getOrigin = () => this.attributes.origin

  setOrigin = value => {
    this.attributes.origin = value
    exposeAttributes(this, ['origin'])
  }

  // int64 # ID of the credential in the Secret Store, if the connection uses a credential.
  getSecretId = () => this.attributes.secret_id

  setSecretId = value => {
    this.attributes.secret_id = value
    exposeAttributes(this, ['secret_id'])
  }

  // object # Current credential type and placement, without the secret value.
  getAuthentication = () => this.attributes.authentication

  setAuthentication = value => {
    this.attributes.authentication = value
    exposeAttributes(this, ['authentication'])
  }

  // date-time # Time the connection was created.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Time the connection was updated.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Connection display name.
  //   secret_id - int64 - ID of the credential in the Secret Store, if the connection uses a credential.
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

    if (params.secret_id !== undefined && params.secret_id !== null && !isInt(params.secret_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: secret_id must be of type Int, received ${getType(params.secret_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/application_connections/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/application_connections/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await ApplicationConnection.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `application_key`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id` and `application_key`. Valid field combinations are `[ workspace_id, application_key ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `application_key`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/application_connections', 'GET', params, options)

    return response?.data?.map(obj => new ApplicationConnection(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ApplicationConnection.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ApplicationConnection.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Application Connection ID.
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

    const response = await Api.sendRequest(`/application_connections/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ApplicationConnection(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ApplicationConnection.find(id, params, options)

  // Parameters:
  //   name (required) - string - Connection display name.
  //   secret_id - int64 - ID of the credential in the Secret Store, if the connection uses a credential.
  //   application_key (required) - string - Application key from the Automation applications list.
  //   origin (required) - string - HTTPS origin for this connection.
  //   workspace_id - int64 - Workspace that owns this connection.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.application_key) {
      throw new errors.MissingParameterError('Parameter missing: application_key')
    }

    if (!params.origin) {
      throw new errors.MissingParameterError('Parameter missing: origin')
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.secret_id !== undefined && params.secret_id !== null && !isInt(params.secret_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: secret_id must be of type Int, received ${getType(params.secret_id)}`)
    }

    if (params.application_key !== undefined && params.application_key !== null && !isString(params.application_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: application_key must be of type String, received ${getType(params.application_key)}`)
    }

    if (params.origin !== undefined && params.origin !== null && !isString(params.origin)) {
      throw new errors.InvalidParameterError(`Bad parameter: origin must be of type String, received ${getType(params.origin)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/application_connections', 'POST', params, options)

    return new ApplicationConnection(response?.data, retainedOptions(options))
  }
}

export default ApplicationConnection

module.exports = ApplicationConnection
module.exports.default = ApplicationConnection
