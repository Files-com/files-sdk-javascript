import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isInt, isObject, isString } from '../utils'

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

  // array # List of user IDs who are group administrators (separated by commas)
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
      throw new Error('Current object has no ID')
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

    return Api.sendRequest(`/groups/' . params['id'] . '`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
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

    return Api.sendRequest(`/groups/' . params['id'] . '`, 'DELETE', params, this.options)
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
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   ids - string - Comma-separated list of group ids to include in results.
  static list = async (params = {}, options = {}) => {
    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
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

    const response = await Api.sendRequest(`/groups/' . params['id'] . '`, 'GET', params, options)

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
