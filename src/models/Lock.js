import Api from '../Api'
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

  // int64 # Lock timeout
  getTimeout = () => this.attributes.timeout

  setTimeout = value => {
    this.attributes.timeout = value
  }

  // string # Lock depth (0 or infinity)
  getDepth = () => this.attributes.depth

  setDepth = value => {
    this.attributes.depth = value
  }

  // string # Owner of lock.  This can be any arbitrary string.
  getOwner = () => this.attributes.owner

  setOwner = value => {
    this.attributes.owner = value
  }

  // string # Lock scope(shared or exclusive)
  getScope = () => this.attributes.scope

  setScope = value => {
    this.attributes.scope = value
  }

  // string # Lock token.  Use to release lock.
  getToken = () => this.attributes.token

  setToken = value => {
    this.attributes.token = value
  }

  // string # Lock type
  getType = () => this.attributes.type

  setType = value => {
    this.attributes.type = value
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
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['token'] && !isString(params['token'])) {
      throw new Error(`Bad parameter: token must be of type String, received ${getType(token)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    if (!params['token']) {
      if (this.attributes.token) {
        params['token'] = this.token
      } else {
        throw new Error('Parameter missing: token')
      }
    }

    return Api.sendRequest(`/locks/${params['path']}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      const newObject = Lock.create(this.attributes.path, this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   path (required) - string - Path to operate on.
  //   include_children - boolean - Include locks from children objects?
  static listFor = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    const response = await Api.sendRequest(`/locks/${params['path']}`, 'GET', params, options)

    return response?.data?.map(obj => new Lock(obj, options)) || []
  }

  // Parameters:
  //   path (required) - string - Path
  //   timeout - int64 - Lock timeout length
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['timeout'] && !isInt(params['timeout'])) {
      throw new Error(`Bad parameter: timeout must be of type Int, received ${getType(timeout)}`)
    }

    const response = await Api.sendRequest(`/locks/${params['path']}`, 'POST', params, options)

    return new Lock(response?.data, options)
  }
}

export default Lock
