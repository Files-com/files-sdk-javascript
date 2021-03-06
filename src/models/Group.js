import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Group
 */
class Group {
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
  // int64 # Group ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Group name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # List of user IDs who are group administrators (separated by commas)
  getAdminIds = () => this.attributes.admin_ids

  setAdminIds = value => {
    this.attributes.admin_ids = value
  }

  // string # Notes about this group
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
  }

  // array # List of user IDs who belong to this group (separated by commas)
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
  }

  // array # List of usernames who belong to this group (separated by commas)
  getUsernames = () => this.attributes.usernames

  setUsernames = value => {
    this.attributes.usernames = value
  }


  // Parameters:
  //   name - string - Group name.
  //   notes - string - Group notes.
  //   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
  //   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['notes'] && !isString(params['notes'])) {
      throw new Error(`Bad parameter: notes must be of type String, received ${getType(notes)}`)
    }
    if (params['user_ids'] && !isString(params['user_ids'])) {
      throw new Error(`Bad parameter: user_ids must be of type String, received ${getType(user_ids)}`)
    }
    if (params['admin_ids'] && !isString(params['admin_ids'])) {
      throw new Error(`Bad parameter: admin_ids must be of type String, received ${getType(admin_ids)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/groups/${params['id']}`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/groups/${params['id']}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Group.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `name`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `name`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `name`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `name`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `name`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `name`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `name`.
  //   ids - string - Comma-separated list of group ids to include in results.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['ids'] && !isString(params['ids'])) {
      throw new Error(`Bad parameter: ids must be of type String, received ${getType(ids)}`)
    }

    const response = await Api.sendRequest(`/groups`, 'GET', params, options)

    return response?.data?.map(obj => new Group(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Group.list(params, options)

  // Parameters:
  //   id (required) - int64 - Group ID.
  static find = async (id, params = {}, options = {}) => {
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

    const response = await Api.sendRequest(`/groups/${params['id']}`, 'GET', params, options)

    return new Group(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Group.find(id, params, options)

  // Parameters:
  //   name - string - Group name.
  //   notes - string - Group notes.
  //   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
  //   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
  static create = async (params = {}, options = {}) => {
    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (params['notes'] && !isString(params['notes'])) {
      throw new Error(`Bad parameter: notes must be of type String, received ${getType(notes)}`)
    }

    if (params['user_ids'] && !isString(params['user_ids'])) {
      throw new Error(`Bad parameter: user_ids must be of type String, received ${getType(user_ids)}`)
    }

    if (params['admin_ids'] && !isString(params['admin_ids'])) {
      throw new Error(`Bad parameter: admin_ids must be of type String, received ${getType(admin_ids)}`)
    }

    const response = await Api.sendRequest(`/groups`, 'POST', params, options)

    return new Group(response?.data, options)
  }
}

export default Group
