/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // int64 # Folder Behavior ID
  getFolderBehaviorId = () => this.attributes.folder_behavior_id

  setFolderBehaviorId = value => {
    this.attributes.folder_behavior_id = value
  }

  // int64 # SIEM HTTP Destination ID.
  getSiemHttpDestinationId = () => this.attributes.siem_http_destination_id

  setSiemHttpDestinationId = value => {
    this.attributes.siem_http_destination_id = value
  }

  // int64 # For sync events, the number of files handled successfully.
  getSuccessfulFiles = () => this.attributes.successful_files

  setSuccessfulFiles = value => {
    this.attributes.successful_files = value
  }

  // int64 # For sync events, the number of files that encountered errors.
  getErroredFiles = () => this.attributes.errored_files

  setErroredFiles = value => {
    this.attributes.errored_files = value
  }

  // int64 # For sync events, the total number of bytes synced.
  getBytesSynced = () => this.attributes.bytes_synced

  setBytesSynced = value => {
    this.attributes.bytes_synced = value
  }

  // int64 # For sync events, the number of files considered for the sync.
  getComparedFiles = () => this.attributes.compared_files

  setComparedFiles = value => {
    this.attributes.compared_files = value
  }

  // int64 # For sync events, the number of folders listed and considered for the sync.
  getComparedFolders = () => this.attributes.compared_folders

  setComparedFolders = value => {
    this.attributes.compared_folders = value
  }

  // string # Associated Remote Server type, if any
  getRemoteServerType = () => this.attributes.remote_server_type

  setRemoteServerType = value => {
    this.attributes.remote_server_type = value
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The ExternalEvent object doesn\'t support updates.')
    } else {
      const newObject = await ExternalEvent.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `siem_http_destination_id`, `created_at`, `event_type`, `status` or `folder_behavior_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `event_type`, `remote_server_type`, `status`, `folder_behavior_id` or `siem_http_destination_id`. Valid field combinations are `[ event_type, created_at ]`, `[ remote_server_type, created_at ]`, `[ status, created_at ]`, `[ folder_behavior_id, created_at ]`, `[ event_type, status ]`, `[ remote_server_type, status ]`, `[ folder_behavior_id, status ]`, `[ event_type, status, created_at ]`, `[ remote_server_type, status, created_at ]` or `[ folder_behavior_id, status, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/external_events', 'GET', params, options)

    return response?.data?.map(obj => new ExternalEvent(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ExternalEvent.list(params, options)

  // Parameters:
  //   id (required) - int64 - External Event ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/external_events/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ExternalEvent(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ExternalEvent.find(id, params, options)

  // Parameters:
  //   status (required) - string - Status of event.
  //   body (required) - string - Event body
  static create = async (params = {}, options = {}) => {
    if (!params.status) {
      throw new errors.MissingParameterError('Parameter missing: status')
    }

    if (!params.body) {
      throw new errors.MissingParameterError('Parameter missing: body')
    }

    if (params.status && !isString(params.status)) {
      throw new errors.InvalidParameterError(`Bad parameter: status must be of type String, received ${getType(params.status)}`)
    }

    if (params.body && !isString(params.body)) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params.body)}`)
    }

    const response = await Api.sendRequest('/external_events', 'POST', params, options)

    return new ExternalEvent(response?.data, options)
  }
}

export default ExternalEvent

module.exports = ExternalEvent
module.exports.default = ExternalEvent
