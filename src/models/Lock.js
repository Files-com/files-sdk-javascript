import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Lock
 */
class Lock {
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

  isLoaded = () => !!this.attributes.path
  // string # Path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # Lock timeout in seconds
  getTimeout = () => this.attributes.timeout

  setTimeout = value => {
    this.attributes.timeout = value
  }

  // string # DEPRECATED: Lock depth
  getDepth = () => this.attributes.depth

  setDepth = value => {
    this.attributes.depth = value
  }

  // boolean # Does lock apply to subfolders?
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
  }

  // string # Owner of the lock.  This can be any arbitrary string.
  getOwner = () => this.attributes.owner

  setOwner = value => {
    this.attributes.owner = value
  }

  // string # DEPRECATED: Lock scope
  getScope = () => this.attributes.scope

  setScope = value => {
    this.attributes.scope = value
  }

  // boolean # Is lock exclusive?
  getExclusive = () => this.attributes.exclusive

  setExclusive = value => {
    this.attributes.exclusive = value
  }

  // string # Lock token.  Use to release lock.
  getToken = () => this.attributes.token

  setToken = value => {
    this.attributes.token = value
  }

  // string # DEPRECATED: Lock type
  getType = () => this.attributes.type

  setType = value => {
    this.attributes.type = value
  }

  // boolean # Can lock be modified by users other than its creator?
  getAllowAccessByAnyUser = () => this.attributes.allow_access_by_any_user

  setAllowAccessByAnyUser = value => {
    this.attributes.allow_access_by_any_user = value
  }

  // int64 # Lock creator user ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Lock creator username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }


  // Parameters:
  //   token (required) - string - Lock token
  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['token'] && !isString(params['token'])) {
      throw new errors.InvalidParameterError(`Bad parameter: token must be of type String, received ${getType(token)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params['token']) {
      if (this.attributes.token) {
        params['token'] = this.token
      } else {
        throw new errors.MissingParameterError('Parameter missing: token')
      }
    }

    const response = await Api.sendRequest(`/locks/${encodeURIComponent(params['path'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      const newObject = Lock.create(this.attributes.path, this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   path (required) - string - Path to operate on.
  //   include_children - boolean - Include locks from children objects?
  static listFor = async (path, params = {}, options = {}) => {
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

    const response = await Api.sendRequest(`/locks/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return response?.data?.map(obj => new Lock(obj, options)) || []
  }

  // Parameters:
  //   path (required) - string - Path
  //   allow_access_by_any_user - boolean - Allow lock to be updated by any user?
  //   exclusive - boolean - Is lock exclusive?
  //   recursive - string - Does lock apply to subfolders?
  //   timeout - int64 - Lock timeout length
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['recursive'] && !isString(params['recursive'])) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type String, received ${getType(params['recursive'])}`)
    }

    if (params['timeout'] && !isInt(params['timeout'])) {
      throw new errors.InvalidParameterError(`Bad parameter: timeout must be of type Int, received ${getType(params['timeout'])}`)
    }

    const response = await Api.sendRequest(`/locks/${encodeURIComponent(params['path'])}`, 'POST', params, options)

    return new Lock(response?.data, options)
  }
}

export default Lock
