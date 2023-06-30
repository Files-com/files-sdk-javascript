import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class ShareGroup
 */
class ShareGroup {
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
  // int64 # Share Group ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Name of the share group
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Additional notes of the share group
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
  }

  // int64 # Owner User ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // array # A list of share group members
  getShareGroupMembers = () => this.attributes.share_group_members

  setShareGroupMembers = value => {
    this.attributes.share_group_members = value
  }

  // array(object) # A list of share group members.
  getMembers = () => this.attributes.members

  setMembers = value => {
    this.attributes.members = value
  }


  // Parameters:
  //   notes - string - Additional notes of the share group
  //   name - string - Name of the share group
  //   members - array(object) - A list of share group members.
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
    if (params['notes'] && !isString(params['notes'])) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(notes)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['members'] && !isArray(params['members'])) {
      throw new errors.InvalidParameterError(`Bad parameter: members must be of type Array, received ${getType(members)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/share_groups/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new ShareGroup(response?.data, this.options)
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

    const response = await Api.sendRequest(`/share_groups/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = ShareGroup.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
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

    const response = await Api.sendRequest(`/share_groups`, 'GET', params, options)

    return response?.data?.map(obj => new ShareGroup(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ShareGroup.list(params, options)

  // Parameters:
  //   id (required) - int64 - Share Group ID.
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

    const response = await Api.sendRequest(`/share_groups/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new ShareGroup(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ShareGroup.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   notes - string - Additional notes of the share group
  //   name (required) - string - Name of the share group
  //   members (required) - array(object) - A list of share group members.
  static create = async (params = {}, options = {}) => {
    if (!params['name']) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params['members']) {
      throw new errors.MissingParameterError('Parameter missing: members')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['notes'] && !isString(params['notes'])) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params['notes'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['members'] && !isArray(params['members'])) {
      throw new errors.InvalidParameterError(`Bad parameter: members must be of type Array, received ${getType(params['members'])}`)
    }

    const response = await Api.sendRequest(`/share_groups`, 'POST', params, options)

    return new ShareGroup(response?.data, options)
  }
}

export default ShareGroup
