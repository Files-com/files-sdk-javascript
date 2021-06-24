import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class ExternalEvent
 */
class ExternalEvent {
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
  // int64 # Event ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Type of event being recorded.
  getEventType = () => this.attributes.event_type

  setEventType = value => {
    this.attributes.event_type = value
  }

  // string # Status of event.
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // string # Event body
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
  }

  // date-time # External event create date/time
  getCreatedAt = () => this.attributes.created_at

  // string # Link to log file.
  getBodyUrl = () => this.attributes.body_url

  setBodyUrl = value => {
    this.attributes.body_url = value
  }


  save = () => {
      if (this.attributes['id']) {
        throw new Error('The ExternalEvent object doesn\'t support updates.')
      } else {
        const newObject = ExternalEvent.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `remote_server_type`, `event_type`, `created_at` or `status`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type` or `status`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type` or `status`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type` or `status`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type` or `status`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type` or `status`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type` or `status`.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/external_events`, 'GET', params, options)

    return response?.data?.map(obj => new ExternalEvent(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ExternalEvent.list(params, options)

  // Parameters:
  //   id (required) - int64 - External Event ID.
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

    const response = await Api.sendRequest(`/external_events/${params['id']}`, 'GET', params, options)

    return new ExternalEvent(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ExternalEvent.find(id, params, options)

  // Parameters:
  //   status (required) - string - Status of event.
  //   body (required) - string - Event body
  static create = async (params = {}, options = {}) => {
    if (!params['status']) {
      throw new Error('Parameter missing: status')
    }

    if (!params['body']) {
      throw new Error('Parameter missing: body')
    }

    if (params['status'] && !isString(params['status'])) {
      throw new Error(`Bad parameter: status must be of type String, received ${getType(status)}`)
    }

    if (params['body'] && !isString(params['body'])) {
      throw new Error(`Bad parameter: body must be of type String, received ${getType(body)}`)
    }

    const response = await Api.sendRequest(`/external_events`, 'POST', params, options)

    return new ExternalEvent(response?.data, options)
  }
}

export default ExternalEvent
