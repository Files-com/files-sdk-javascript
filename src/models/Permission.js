import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Permission
 */
class Permission {
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

  // int64 # Permission ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Folder path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # User's username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // int64 # Group ID
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
  }

  // string # Group name if applicable
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
  }

  // string # Permission type
  getPermission = () => this.attributes.permission

  setPermission = value => {
    this.attributes.permission = value
  }

  // boolean # Does this permission apply to subfolders?
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
  }


  save = () => {
    if (this.attributes['path']) {
      throw new Error('The Permission object doesn\'t support updates.')
    } else {
      const newObject = Permission.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   path - string - Permission path.  If provided, will scope permissions to this path.
  //   group_id - string - Group ID.  If provided, will scope permissions to this group.
  //   user_id - string - User ID.  If provided, will scope permissions to this user.
  //   include_groups - boolean - If searching by user or group, also include user's permissions that are inherited from its groups?
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

    if (params['group_id'] && !isString(params['group_id'])) {
      throw new Error(`Bad parameter: group_id must be of type String, received ${getType(group_id)}`)
    }

    if (params['user_id'] && !isString(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type String, received ${getType(user_id)}`)
    }

    const response = await Api.sendRequest(`/permissions`, 'GET', params, options)

    return response?.data?.map(obj => new Permission(obj, options)) || []
  }

  static all = (path, params = {}, options = {}) =>
    Permission.list(path, params, options)

  // Parameters:
  //   group_id - int64 - Group ID
  //   path - string - Folder path
  //   permission - string -  Permission type.  Can be `admin`, `full`, `readonly`, `writeonly`, `previewonly`, or `history`
  //   recursive - boolean - Apply to subfolders recursively?
  //   user_id - int64 - User ID.  Provide `username` or `user_id`
  //   username - string - User username.  Provide `username` or `user_id`
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new Error(`Bad parameter: group_id must be of type Int, received ${getType(group_id)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['permission'] && !isString(params['permission'])) {
      throw new Error(`Bad parameter: permission must be of type String, received ${getType(permission)}`)
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['username'] && !isString(params['username'])) {
      throw new Error(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }

    const response = await Api.sendRequest(`/permissions`, 'POST', params, options)

    return new Permission(response?.data, options)
  }

  // Parameters:
  //   id (required) - int64 - Permission ID.
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

    const response = await Api.sendRequest(`/permissions/' . params['id'] . '`, 'DELETE', params, options)

    return response?.data
  }

  static destroy = (id, params = {}, options = {}) =>
    Permission.delete(id, params, options)
}

export default Permission
