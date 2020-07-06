import Api from '../Api'
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


  // List Requests
  //
  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   mine - boolean - Only show requests of the current user?  (Defaults to true if current user is not a site admin.)
  folders = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }
    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }
    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    return Api.sendRequest(`/requests/folders/${encodeURIComponent(params['path'])}`, 'GET', params, this.options)
  }

  save = () => {
    if (this.attributes['path']) {
      throw new Error('The Request object doesn\'t support updates.')
    } else {
      const newObject = Request.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   mine - boolean - Only show requests of the current user?  (Defaults to true if current user is not a site admin.)
  //   path - string - Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory.
  static list = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    const response = await Api.sendRequest(`/requests`, 'GET', params, options)

    return response?.data?.map(obj => new Request(obj, options)) || []
  }

  static all = (path, params = {}, options = {}) =>
    Request.list(path, params, options)

  // Parameters:
  //   path (required) - string - Folder path on which to request the file.
  //   destination (required) - string - Destination filename (without extension) to request.
  //   user_ids - string - A list of user IDs to request the file from. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs to request the file from. If sent as a string, it should be comma-delimited.
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (!params['destination']) {
      throw new Error('Parameter missing: destination')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['destination'] && !isString(params['destination'])) {
      throw new Error(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (params['user_ids'] && !isString(params['user_ids'])) {
      throw new Error(`Bad parameter: user_ids must be of type String, received ${getType(user_ids)}`)
    }

    if (params['group_ids'] && !isString(params['group_ids'])) {
      throw new Error(`Bad parameter: group_ids must be of type String, received ${getType(group_ids)}`)
    }

    const response = await Api.sendRequest(`/requests`, 'POST', params, options)

    return new Request(response?.data, options)
  }

  // Parameters:
  //   id (required) - int64 - Request ID.
  static delete = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/requests/' . params['id'] . '`, 'DELETE', params, options)

    return response?.data
  }

  static destroy = (id, params = {}, options = {}) =>
    Request.delete(id, params, options)
}

export default Request
