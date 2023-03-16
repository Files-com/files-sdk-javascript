import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class History
 */
class History {
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

  isLoaded = () => !!this.attributes.path
  // int64 # Action ID
  getId = () => this.attributes.id

  // string # Path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // date-time # Action occurrence date/time
  getWhen = () => this.attributes.when

  // string # The destination path for this action, if applicable
  getDestination = () => this.attributes.destination

  // string # Friendly displayed output
  getDisplay = () => this.attributes.display

  // string # IP Address that performed this action
  getIp = () => this.attributes.ip

  // string # The source path for this action, if applicable
  getSource = () => this.attributes.source

  // array # Targets
  getTargets = () => this.attributes.targets

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  // string # Username
  getUsername = () => this.attributes.username

  // string # Type of action
  getAction = () => this.attributes.action

  // string # Failure type.  If action was a user login or session failure, why did it fail?
  getFailureType = () => this.attributes.failure_type

  // string # Interface on which this action occurred.
  getInterface = () => this.attributes.interface


  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[user_id]=desc`). Valid fields are `user_id` and `created_at`.
  //   path (required) - string - Path to operate on.
  static listForFile = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['start_at'] && !isString(params['start_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params['start_at'])}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params['end_at'])}`)
    }

    if (params['display'] && !isString(params['display'])) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params['display'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/history/files/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return response?.data?.map(obj => new Action(obj, options)) || []
  }

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[user_id]=desc`). Valid fields are `user_id` and `created_at`.
  //   path (required) - string - Path to operate on.
  static listForFolder = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['start_at'] && !isString(params['start_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params['start_at'])}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params['end_at'])}`)
    }

    if (params['display'] && !isString(params['display'])) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params['display'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/history/folders/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return response?.data?.map(obj => new Action(obj, options)) || []
  }

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[user_id]=desc`). Valid fields are `user_id` and `created_at`.
  //   user_id (required) - int64 - User ID.
  static listForUser = async (user_id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['user_id'] = user_id

    if (!params['user_id']) {
      throw new errors.MissingParameterError('Parameter missing: user_id')
    }

    if (params['start_at'] && !isString(params['start_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params['start_at'])}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params['end_at'])}`)
    }

    if (params['display'] && !isString(params['display'])) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params['display'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    const response = await Api.sendRequest(`/history/users/${encodeURIComponent(params['user_id'])}`, 'GET', params, options)

    return response?.data?.map(obj => new Action(obj, options)) || []
  }

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[user_id]=desc`). Valid fields are `user_id` and `created_at`.
  static listLogins = async (params = {}, options = {}) => {
    if (params['start_at'] && !isString(params['start_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params['start_at'])}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params['end_at'])}`)
    }

    if (params['display'] && !isString(params['display'])) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params['display'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/history/login`, 'GET', params, options)

    return response?.data?.map(obj => new Action(obj, options)) || []
  }

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[path]=desc`). Valid fields are `path`, `folder`, `user_id` or `created_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `user_id`, `folder` or `path`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  static list = async (params = {}, options = {}) => {
    if (params['start_at'] && !isString(params['start_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params['start_at'])}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params['end_at'])}`)
    }

    if (params['display'] && !isString(params['display'])) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params['display'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/history`, 'GET', params, options)

    return response?.data?.map(obj => new Action(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    History.list(params, options)
}

export default History
