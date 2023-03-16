import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class ApiKey
 */
class ApiKey {
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
  // int64 # API Key ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Unique label that describes this API key.  Useful for external systems where you may have API keys from multiple accounts and want a human-readable label for each key.
  getDescriptiveLabel = () => this.attributes.descriptive_label

  setDescriptiveLabel = value => {
    this.attributes.descriptive_label = value
  }

  // string # User-supplied description of API key.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // date-time # Time which API Key was created
  getCreatedAt = () => this.attributes.created_at

  // date-time # API Key expiration date
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
  }

  // string # API Key actual key string
  getKey = () => this.attributes.key

  setKey = value => {
    this.attributes.key = value
  }

  // date-time # API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be up to 3 hours later than this timestamp.
  getLastUseAt = () => this.attributes.last_use_at

  setLastUseAt = value => {
    this.attributes.last_use_at = value
  }

  // string # Internal name for the API Key.  For your use.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Folder path restriction for this api key. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
  getPermissionSet = () => this.attributes.permission_set

  setPermissionSet = value => {
    this.attributes.permission_set = value
  }

  // string # If this API key represents a Desktop app, what platform was it created on?
  getPlatform = () => this.attributes.platform

  setPlatform = value => {
    this.attributes.platform = value
  }

  // string # URL for API host.
  getUrl = () => this.attributes.url

  setUrl = value => {
    this.attributes.url = value
  }

  // int64 # User ID for the owner of this API Key.  May be blank for Site-wide API Keys.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }


  // Parameters:
  //   name - string - Internal name for the API Key.  For your use.
  //   description - string - User-supplied description of API key.
  //   expires_at - string - API Key expiration date
  //   permission_set - string - Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
  update = async (params = {}) => {
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
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['description'] && !isString(params['description'])) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(description)}`)
    }
    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(expires_at)}`)
    }
    if (params['permission_set'] && !isString(params['permission_set'])) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(permission_set)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/api_keys/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new ApiKey(response?.data, this.options)
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

    const response = await Api.sendRequest(`/api_keys/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = ApiKey.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[expires_at]=desc`). Valid fields are `expires_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `expires_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `expires_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `expires_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `expires_at`.
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/api_keys`, 'GET', params, options)

    return response?.data?.map(obj => new ApiKey(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ApiKey.list(params, options)

  static findCurrent = async (options = {}) => {
    const response = await Api.sendRequest(`/api_key`, 'GET', {}, options)

    return new ApiKey(response?.data, options)
  }

  // Parameters:
  //   id (required) - int64 - Api Key ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/api_keys/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new ApiKey(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ApiKey.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   name - string - Internal name for the API Key.  For your use.
  //   description - string - User-supplied description of API key.
  //   expires_at - string - API Key expiration date
  //   permission_set - string - Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
  //   path - string - Folder path restriction for this api key.
  static create = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['description'] && !isString(params['description'])) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params['description'])}`)
    }

    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params['expires_at'])}`)
    }

    if (params['permission_set'] && !isString(params['permission_set'])) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(params['permission_set'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/api_keys`, 'POST', params, options)

    return new ApiKey(response?.data, options)
  }

  // Parameters:
  //   expires_at - string - API Key expiration date
  //   name - string - Internal name for the API Key.  For your use.
  //   permission_set - string - Permissions for this API Key.  Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations).  Additional permission sets may become available in the future, such as for a Site Admin to give a key with no administrator privileges.  If you have ideas for permission sets, please let us know.
  static updateCurrent = async (params = {}, options = {}) => {
    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params['expires_at'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['permission_set'] && !isString(params['permission_set'])) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(params['permission_set'])}`)
    }

    const response = await Api.sendRequest(`/api_key`, 'PATCH', params, options)

    return new ApiKey(response?.data, options)
  }

  static deleteCurrent = async (options = {}) => {
    const response = await Api.sendRequest(`/api_key`, 'DELETE', {}, options)

    return response?.data
  }
}

export default ApiKey
