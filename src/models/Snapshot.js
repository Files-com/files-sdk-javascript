import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Snapshot
 */
class Snapshot {
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
  // int64 # The snapshot's unique ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // date-time # When the snapshot expires.
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
  }

  // date-time # When the snapshot was finalized.
  getFinalizedAt = () => this.attributes.finalized_at

  setFinalizedAt = value => {
    this.attributes.finalized_at = value
  }

  // string # A name for the snapshot.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // int64 # The user that created this snapshot, if applicable.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // int64 # The bundle using this snapshot, if applicable.
  getBundleId = () => this.attributes.bundle_id

  setBundleId = value => {
    this.attributes.bundle_id = value
  }

  // array(string) # An array of paths to add to the snapshot.
  getPaths = () => this.attributes.paths

  setPaths = value => {
    this.attributes.paths = value
  }


  // Parameters:
  //   expires_at - string - When the snapshot expires.
  //   name - string - A name for the snapshot.
  //   paths - array(string) - An array of paths to add to the snapshot.
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
    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(expires_at)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['paths'] && !isArray(params['paths'])) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(paths)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/snapshots/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new Snapshot(response?.data, this.options)
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

    const response = await Api.sendRequest(`/snapshots/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Snapshot.create(this.attributes, this.options)
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

    const response = await Api.sendRequest(`/snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new Snapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Snapshot.list(params, options)

  // Parameters:
  //   id (required) - int64 - Snapshot ID.
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

    const response = await Api.sendRequest(`/snapshots/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Snapshot(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Snapshot.find(id, params, options)

  // Parameters:
  //   expires_at - string - When the snapshot expires.
  //   name - string - A name for the snapshot.
  //   paths - array(string) - An array of paths to add to the snapshot.
  static create = async (params = {}, options = {}) => {
    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params['expires_at'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['paths'] && !isArray(params['paths'])) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(params['paths'])}`)
    }

    const response = await Api.sendRequest(`/snapshots`, 'POST', params, options)

    return new Snapshot(response?.data, options)
  }
}

export default Snapshot
