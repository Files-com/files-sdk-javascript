import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class BundleNotification
 */
class BundleNotification {
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
  // int64 # Bundle ID to notify on
  getBundleId = () => this.attributes.bundle_id

  setBundleId = value => {
    this.attributes.bundle_id = value
  }

  // int64 # Bundle Notification ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // boolean # Triggers bundle notification when a registration action occurs for it.
  getNotifyOnRegistration = () => this.attributes.notify_on_registration

  setNotifyOnRegistration = value => {
    this.attributes.notify_on_registration = value
  }

  // boolean # Triggers bundle notification when a upload action occurs for it.
  getNotifyOnUpload = () => this.attributes.notify_on_upload

  setNotifyOnUpload = value => {
    this.attributes.notify_on_upload = value
  }

  // int64 # The id of the user to notify.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }


  // Parameters:
  //   notify_on_registration - boolean - Triggers bundle notification when a registration action occurs for it.
  //   notify_on_upload - boolean - Triggers bundle notification when a upload action occurs for it.
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

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/bundle_notifications/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new BundleNotification(response?.data, this.options)
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

    const response = await Api.sendRequest(`/bundle_notifications/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = BundleNotification.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[bundle_id]=desc`). Valid fields are `bundle_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `bundle_id`.
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

    const response = await Api.sendRequest(`/bundle_notifications`, 'GET', params, options)

    return response?.data?.map(obj => new BundleNotification(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BundleNotification.list(params, options)

  // Parameters:
  //   id (required) - int64 - Bundle Notification ID.
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

    const response = await Api.sendRequest(`/bundle_notifications/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new BundleNotification(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    BundleNotification.find(id, params, options)

  // Parameters:
  //   user_id - int64 - The id of the user to notify.
  //   notify_on_registration - boolean - Triggers bundle notification when a registration action occurs for it.
  //   notify_on_upload - boolean - Triggers bundle notification when a upload action occurs for it.
  //   bundle_id (required) - int64 - Bundle ID to notify on
  static create = async (params = {}, options = {}) => {
    if (!params['bundle_id']) {
      throw new errors.MissingParameterError('Parameter missing: bundle_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['bundle_id'] && !isInt(params['bundle_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_id must be of type Int, received ${getType(params['bundle_id'])}`)
    }

    const response = await Api.sendRequest(`/bundle_notifications`, 'POST', params, options)

    return new BundleNotification(response?.data, options)
  }
}

export default BundleNotification
