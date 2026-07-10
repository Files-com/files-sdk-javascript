/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class IntegrationCentricProfile
 */
class IntegrationCentricProfile {
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

  // int64 # Integration Centric Profile ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Profile name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // int64 # Workspace ID
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // boolean # Whether this profile applies to all users in the Workspace by default
  getUseForAllUsers = () => this.attributes.use_for_all_users

  setUseForAllUsers = value => {
    this.attributes.use_for_all_users = value
  }

  // array(object) # Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may include a display `name`.
  getExpectedRemoteServers = () => this.attributes.expected_remote_servers

  setExpectedRemoteServers = value => {
    this.attributes.expected_remote_servers = value
  }

  // Parameters:
  //   name - string - Profile name
  //   workspace_id - int64 - Workspace ID
  //   expected_remote_servers - array(object) - Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may include a display `name`.
  //   use_for_all_users - boolean - Whether this profile applies to all users in the Workspace by default
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

    if (params.expected_remote_servers && !isArray(params.expected_remote_servers)) {
      throw new errors.InvalidParameterError(`Bad parameter: expected_remote_servers must be of type Array, received ${getType(params.expected_remote_servers)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/integration_centric_profiles/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new IntegrationCentricProfile(response?.data, this.options)
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

    await Api.sendRequest(`/integration_centric_profiles/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await IntegrationCentricProfile.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/integration_centric_profiles', 'GET', params, options)

    return response?.data?.map(obj => new IntegrationCentricProfile(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    IntegrationCentricProfile.list(params, options)

  // Parameters:
  //   id (required) - int64 - Integration Centric Profile ID.
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

    const response = await Api.sendRequest(`/integration_centric_profiles/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new IntegrationCentricProfile(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    IntegrationCentricProfile.find(id, params, options)

  // Parameters:
  //   name (required) - string - Profile name
  //   expected_remote_servers (required) - array(object) - Remote Server integrations the user is expected to add and connect. Each entry requires `server_type` and may include a display `name`.
  //   workspace_id - int64 - Workspace ID
  //   use_for_all_users - boolean - Whether this profile applies to all users in the Workspace by default
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.expected_remote_servers) {
      throw new errors.MissingParameterError('Parameter missing: expected_remote_servers')
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.expected_remote_servers && !isArray(params.expected_remote_servers)) {
      throw new errors.InvalidParameterError(`Bad parameter: expected_remote_servers must be of type Array, received ${getType(params.expected_remote_servers)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/integration_centric_profiles', 'POST', params, options)

    return new IntegrationCentricProfile(response?.data, options)
  }
}

export default IntegrationCentricProfile

module.exports = IntegrationCentricProfile
module.exports.default = IntegrationCentricProfile
