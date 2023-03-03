import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class GroupUser
 */
class GroupUser {
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
  // string # Group name
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
  }

  // int64 # Group ID
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
  }

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // boolean # Is this user an administrator of this group?
  getAdmin = () => this.attributes.admin

  setAdmin = value => {
    this.attributes.admin = value
  }

  // array # A list of usernames for users in this group
  getUsernames = () => this.attributes.usernames

  setUsernames = value => {
    this.attributes.usernames = value
  }

  // int64 # Group User ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }


  // Parameters:
  //   group_id (required) - int64 - Group ID to add user to.
  //   user_id (required) - int64 - User ID to add to group.
  //   admin - boolean - Is the user a group administrator?
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
    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(group_id)}`)
    }
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params['group_id']) {
      if (this.attributes.group_id) {
        params['group_id'] = this.group_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: group_id')
      }
    }

    if (!params['user_id']) {
      if (this.attributes.user_id) {
        params['user_id'] = this.user_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: user_id')
      }
    }

    const response = await Api.sendRequest(`/group_users/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new GroupUser(response?.data, this.options)
  }

  // Parameters:
  //   group_id (required) - int64 - Group ID from which to remove user.
  //   user_id (required) - int64 - User ID to remove from group.
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
    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(group_id)}`)
    }
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params['group_id']) {
      if (this.attributes.group_id) {
        params['group_id'] = this.group_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: group_id')
      }
    }

    if (!params['user_id']) {
      if (this.attributes.user_id) {
        params['user_id'] = this.user_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: user_id')
      }
    }

    const response = await Api.sendRequest(`/group_users/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = GroupUser.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  If provided, will return group_users of this user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   group_id - int64 - Group ID.  If provided, will return group_users of this group.
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

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params['group_id'])}`)
    }

    const response = await Api.sendRequest(`/group_users`, 'GET', params, options)

    return response?.data?.map(obj => new GroupUser(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    GroupUser.list(params, options)

  // Parameters:
  //   group_id (required) - int64 - Group ID to add user to.
  //   user_id (required) - int64 - User ID to add to group.
  //   admin - boolean - Is the user a group administrator?
  static create = async (params = {}, options = {}) => {
    if (!params['group_id']) {
      throw new errors.MissingParameterError('Parameter missing: group_id')
    }

    if (!params['user_id']) {
      throw new errors.MissingParameterError('Parameter missing: user_id')
    }

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params['group_id'])}`)
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    const response = await Api.sendRequest(`/group_users`, 'POST', params, options)

    return new GroupUser(response?.data, options)
  }
}

export default GroupUser
