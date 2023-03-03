import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Project
 */
class Project {
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
  // int64 # Project ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Global access settings
  getGlobalAccess = () => this.attributes.global_access

  setGlobalAccess = value => {
    this.attributes.global_access = value
  }


  // Parameters:
  //   global_access (required) - string - Global permissions.  Can be: `none`, `anyone_with_read`, `anyone_with_full`.
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
    if (params['global_access'] && !isString(params['global_access'])) {
      throw new errors.InvalidParameterError(`Bad parameter: global_access must be of type String, received ${getType(global_access)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params['global_access']) {
      if (this.attributes.global_access) {
        params['global_access'] = this.global_access
      } else {
        throw new errors.MissingParameterError('Parameter missing: global_access')
      }
    }

    const response = await Api.sendRequest(`/projects/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new Project(response?.data, this.options)
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

    const response = await Api.sendRequest(`/projects/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Project.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/projects`, 'GET', params, options)

    return response?.data?.map(obj => new Project(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Project.list(params, options)

  // Parameters:
  //   id (required) - int64 - Project ID.
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

    const response = await Api.sendRequest(`/projects/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Project(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Project.find(id, params, options)

  // Parameters:
  //   global_access (required) - string - Global permissions.  Can be: `none`, `anyone_with_read`, `anyone_with_full`.
  static create = async (params = {}, options = {}) => {
    if (!params['global_access']) {
      throw new errors.MissingParameterError('Parameter missing: global_access')
    }

    if (params['global_access'] && !isString(params['global_access'])) {
      throw new errors.InvalidParameterError(`Bad parameter: global_access must be of type String, received ${getType(params['global_access'])}`)
    }

    const response = await Api.sendRequest(`/projects`, 'POST', params, options)

    return new Project(response?.data, options)
  }
}

export default Project
