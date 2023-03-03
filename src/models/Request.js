import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Request
 */
class Request {
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
  // int64 # Request ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Folder path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # Source filename, if applicable
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
  }

  // string # Destination filename
  getDestination = () => this.attributes.destination

  setDestination = value => {
    this.attributes.destination = value
  }

  // string # ID of automation that created request
  getAutomationId = () => this.attributes.automation_id

  setAutomationId = value => {
    this.attributes.automation_id = value
  }

  // string # User making the request (if applicable)
  getUserDisplayName = () => this.attributes.user_display_name

  setUserDisplayName = value => {
    this.attributes.user_display_name = value
  }

  // string # A list of user IDs to request the file from. If sent as a string, it should be comma-delimited.
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
  }

  // string # A list of group IDs to request the file from. If sent as a string, it should be comma-delimited.
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
  }


  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/requests/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        throw new errors.NotImplementedError('The Request object doesn\'t support updates.')
      } else {
        const newObject = Request.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[destination]=desc`). Valid fields are `destination`.
  //   mine - boolean - Only show requests of the current user?  (Defaults to true if current user is not a site admin.)
  //   path - string - Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/requests`, 'GET', params, options)

    return response?.data?.map(obj => new Request(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Request.list(params, options)

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[destination]=desc`). Valid fields are `destination`.
  //   mine - boolean - Only show requests of the current user?  (Defaults to true if current user is not a site admin.)
  //   path (required) - string - Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory.
  static getFolder = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/requests/folders/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return response?.data?.map(obj => new Request(obj, options)) || []
  }

  // Parameters:
  //   path (required) - string - Folder path on which to request the file.
  //   destination (required) - string - Destination filename (without extension) to request.
  //   user_ids - string - A list of user IDs to request the file from. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs to request the file from. If sent as a string, it should be comma-delimited.
  static create = async (params = {}, options = {}) => {
    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (!params['destination']) {
      throw new errors.MissingParameterError('Parameter missing: destination')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['destination'] && !isString(params['destination'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params['destination'])}`)
    }

    if (params['user_ids'] && !isString(params['user_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params['user_ids'])}`)
    }

    if (params['group_ids'] && !isString(params['group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params['group_ids'])}`)
    }

    const response = await Api.sendRequest(`/requests`, 'POST', params, options)

    return new Request(response?.data, options)
  }
}

export default Request
