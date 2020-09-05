import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class UserRequest
 */
class UserRequest {
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
  // int64 # ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # User's full name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // email # User email address
  getEmail = () => this.attributes.email

  setEmail = value => {
    this.attributes.email = value
  }

  // string # Details of the user's request
  getDetails = () => this.attributes.details

  setDetails = value => {
    this.attributes.details = value
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

    return Api.sendRequest(`/user_requests/${params['id']}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        throw new Error('The UserRequest object doesn\'t support updates.')
      } else {
        const newObject = UserRequest.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
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

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    const response = await Api.sendRequest(`/user_requests`, 'GET', params, options)

    return response?.data?.map(obj => new UserRequest(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserRequest.list(params, options)

  // Parameters:
  //   id (required) - int64 - User Request ID.
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

    const response = await Api.sendRequest(`/user_requests/${params['id']}`, 'GET', params, options)

    return new UserRequest(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    UserRequest.find(id, params, options)

  // Parameters:
  //   name (required) - string - Name of user requested
  //   email (required) - string - Email of user requested
  //   details (required) - string - Details of the user request
  static create = async (params = {}, options = {}) => {
    if (!params['name']) {
      throw new Error('Parameter missing: name')
    }

    if (!params['email']) {
      throw new Error('Parameter missing: email')
    }

    if (!params['details']) {
      throw new Error('Parameter missing: details')
    }

    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (params['email'] && !isString(params['email'])) {
      throw new Error(`Bad parameter: email must be of type String, received ${getType(email)}`)
    }

    if (params['details'] && !isString(params['details'])) {
      throw new Error(`Bad parameter: details must be of type String, received ${getType(details)}`)
    }

    const response = await Api.sendRequest(`/user_requests`, 'POST', params, options)

    return new UserRequest(response?.data, options)
  }
}

export default UserRequest
