/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // string # Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Username (if applicable)
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // int64 # Group ID
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
  }

  // string # Group name (if applicable)
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
  }

  // string # Permission type.  See the table referenced in the documentation for an explanation of each permission.
  getPermission = () => this.attributes.permission

  setPermission = value => {
    this.attributes.permission = value
  }

  // boolean # Recursive: does this permission apply to subfolders?
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
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

    await Api.sendRequest(`/permissions/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The Permission object doesn\'t support updates.')
    } else {
      const newObject = await Permission.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `group_id`, `path`, `user_id` or `permission`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `group_id` or `user_id`. Valid field combinations are `[ path, group_id ]`, `[ path, user_id ]` or `[ group_id, user_id ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  //   path - string - Permission path.  If provided, will scope all permissions(including upward) to this path.
  //   include_groups - boolean - If searching by user or group, also include user's permissions that are inherited from its groups?
  //   group_id - string
  //   user_id - string
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.group_id && !isString(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type String, received ${getType(params.group_id)}`)
    }

    if (params.user_id && !isString(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type String, received ${getType(params.user_id)}`)
    }

    const response = await Api.sendRequest('/permissions', 'GET', params, options)

    return response?.data?.map(obj => new Permission(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Permission.list(params, options)

  // Parameters:
  //   path (required) - string - Folder path
  //   group_id - int64 - Group ID. Provide `group_name` or `group_id`
  //   permission - string - Permission type.  Can be `admin`, `full`, `readonly`, `writeonly`, `list`, or `history`
  //   recursive - boolean - Apply to subfolders recursively?
  //   user_id - int64 - User ID.  Provide `username` or `user_id`
  //   username - string - User username.  Provide `username` or `user_id`
  //   group_name - string - Group name.  Provide `group_name` or `group_id`
  static create = async (params = {}, options = {}) => {
    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.group_id && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.permission && !isString(params.permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: permission must be of type String, received ${getType(params.permission)}`)
    }

    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.username && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.group_name && !isString(params.group_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_name must be of type String, received ${getType(params.group_name)}`)
    }

    const response = await Api.sendRequest('/permissions', 'POST', params, options)

    return new Permission(response?.data, options)
  }
}

export default Permission

module.exports = Permission
module.exports.default = Permission
