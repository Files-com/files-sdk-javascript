import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Behavior
 */
class Behavior {
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
  // int64 # Folder behavior ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Folder path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # URL for attached file
  getAttachmentUrl = () => this.attributes.attachment_url

  setAttachmentUrl = value => {
    this.attributes.attachment_url = value
  }

  // string # Behavior type.
  getBehavior = () => this.attributes.behavior

  setBehavior = value => {
    this.attributes.behavior = value
  }

  // object # Settings for this behavior.  See the section above for an example value to provide here.  Formatting is different for each Behavior type.  May be sent as nested JSON or a single JSON-encoded string.  If using XML encoding for the API call, this data must be sent as a JSON-encoded string.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
  }

  // file # Certain behaviors may require a file, for instance, the "watermark" behavior requires a watermark image
  getAttachmentFile = () => this.attributes.attachment_file

  setAttachmentFile = value => {
    this.attributes.attachment_file = value
  }


  // Parameters:
  //   value - string - The value of the folder behavior.  Can be a integer, array, or hash depending on the type of folder behavior.
  //   attachment_file - file - Certain behaviors may require a file, for instance, the "watermark" behavior requires a watermark image
  //   behavior - string - Behavior type.
  //   path - string - Folder behaviors path.
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
    if (params['value'] && !isString(params['value'])) {
      throw new Error(`Bad parameter: value must be of type String, received ${getType(value)}`)
    }
    if (params['behavior'] && !isString(params['behavior'])) {
      throw new Error(`Bad parameter: behavior must be of type String, received ${getType(behavior)}`)
    }
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/behaviors/${params['id']}`, 'PATCH', params, this.options)
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

    return Api.sendRequest(`/behaviors/${params['id']}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Behavior.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `behavior`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `behavior`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `behavior`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `behavior`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `behavior`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `behavior`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `behavior`.
  //   behavior - string - If set, only shows folder behaviors matching this behavior type.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['behavior'] && !isString(params['behavior'])) {
      throw new Error(`Bad parameter: behavior must be of type String, received ${getType(behavior)}`)
    }

    const response = await Api.sendRequest(`/behaviors`, 'GET', params, options)

    return response?.data?.map(obj => new Behavior(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Behavior.list(params, options)

  // Parameters:
  //   id (required) - int64 - Behavior ID.
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

    const response = await Api.sendRequest(`/behaviors/${params['id']}`, 'GET', params, options)

    return new Behavior(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Behavior.find(id, params, options)

  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `behavior`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `behavior`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `behavior`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `behavior`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `behavior`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `behavior`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `behavior`.
  //   path (required) - string - Path to operate on.
  //   recursive - string - Show behaviors above this path?
  //   behavior - string - DEPRECATED: If set only shows folder behaviors matching this behavior type. Use `filter[behavior]` instead.
  static listFor = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['recursive'] && !isString(params['recursive'])) {
      throw new Error(`Bad parameter: recursive must be of type String, received ${getType(recursive)}`)
    }

    if (params['behavior'] && !isString(params['behavior'])) {
      throw new Error(`Bad parameter: behavior must be of type String, received ${getType(behavior)}`)
    }

    const response = await Api.sendRequest(`/behaviors/folders/${params['path']}`, 'GET', params, options)

    return response?.data?.map(obj => new Behavior(obj, options)) || []
  }

  // Parameters:
  //   value - string - The value of the folder behavior.  Can be a integer, array, or hash depending on the type of folder behavior.
  //   attachment_file - file - Certain behaviors may require a file, for instance, the "watermark" behavior requires a watermark image
  //   path (required) - string - Folder behaviors path.
  //   behavior (required) - string - Behavior type.
  static create = async (params = {}, options = {}) => {
    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (!params['behavior']) {
      throw new Error('Parameter missing: behavior')
    }

    if (params['value'] && !isString(params['value'])) {
      throw new Error(`Bad parameter: value must be of type String, received ${getType(value)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['behavior'] && !isString(params['behavior'])) {
      throw new Error(`Bad parameter: behavior must be of type String, received ${getType(behavior)}`)
    }

    const response = await Api.sendRequest(`/behaviors`, 'POST', params, options)

    return new Behavior(response?.data, options)
  }

  // Parameters:
  //   url (required) - string - URL for testing the webhook.
  //   method - string - HTTP method(GET or POST).
  //   encoding - string - HTTP encoding method.  Can be JSON, XML, or RAW (form data).
  //   headers - object - Additional request headers.
  //   body - object - Additional body parameters.
  //   action - string - action for test body
  static webhookTest = async (params = {}, options = {}) => {
    if (!params['url']) {
      throw new Error('Parameter missing: url')
    }

    if (params['url'] && !isString(params['url'])) {
      throw new Error(`Bad parameter: url must be of type String, received ${getType(url)}`)
    }

    if (params['method'] && !isString(params['method'])) {
      throw new Error(`Bad parameter: method must be of type String, received ${getType(method)}`)
    }

    if (params['encoding'] && !isString(params['encoding'])) {
      throw new Error(`Bad parameter: encoding must be of type String, received ${getType(encoding)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    const response = await Api.sendRequest(`/behaviors/webhook/test`, 'POST', params, options)

    return response?.data
  }
}

export default Behavior
