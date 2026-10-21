/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
const exposeAttributes = (model, names) => {
  names.forEach(name => {
    if (!(name in model)) {
      Object.defineProperty(model, name, { get: () => model.attributes[name] })
    }
  })
}

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
const adoptAttributes = (model, attributes = {}) => {
  const adopted = {}
  Object.entries(attributes).forEach(([key, value]) => {
    adopted[key.replace('?', '')] = value
  })

  model.attributes = adopted
  exposeAttributes(model, Object.keys(adopted))
}

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
const retainedOptions = options => {
  if (!options?.client) {
    return options
  }

  const { signal, ...context } = options
  return context
}

/**
 * Class History
 */
class History {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.path

  // int64 # Action ID
  getId = () => this.attributes.id

  // string # Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
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

  // object # Targets
  getTargets = () => this.attributes.targets

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  // string # Username
  getUsername = () => this.attributes.username

  // boolean # true if this change was performed by a user on a parent site.
  getUserIsFromParentSite = () => this.attributes.user_is_from_parent_site

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
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
  //   path (required) - string - Path to operate on.
  static listForFile = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.start_at !== undefined && params.start_at !== null && !isString(params.start_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params.start_at)}`)
    }

    if (params.end_at !== undefined && params.end_at !== null && !isString(params.end_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params.end_at)}`)
    }

    if (params.display !== undefined && params.display !== null && !isString(params.display)) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params.display)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    const response = await Api.sendRequest(`/history/files/${encodeURIComponent(params.path)}`, 'GET', params, options)

    const Action = require('./Action.js').default
    return response?.data?.map(obj => new Action(obj, retainedOptions(options))) || []
  }

  // The items listForFile() lists, one at a time: an async iterator that requests each page
  // through listForFile() only once the items before it have been taken (see Api._iterate).
  static listForFileIterator = (path, params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      History.listForFile(path, pageParams, pageOptions))

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
  //   path (required) - string - Path to operate on.
  static listForFolder = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.start_at !== undefined && params.start_at !== null && !isString(params.start_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params.start_at)}`)
    }

    if (params.end_at !== undefined && params.end_at !== null && !isString(params.end_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params.end_at)}`)
    }

    if (params.display !== undefined && params.display !== null && !isString(params.display)) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params.display)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    const response = await Api.sendRequest(`/history/folders/${encodeURIComponent(params.path)}`, 'GET', params, options)

    const Action = require('./Action.js').default
    return response?.data?.map(obj => new Action(obj, retainedOptions(options))) || []
  }

  // The items listForFolder() lists, one at a time: an async iterator that requests each page
  // through listForFolder() only once the items before it have been taken (see Api._iterate).
  static listForFolderIterator = (path, params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      History.listForFolder(path, pageParams, pageOptions))

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
  //   user_id (required) - int64 - User ID.
  static listForUser = async (userId, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.user_id = userId

    if (!params.user_id) {
      throw new errors.MissingParameterError('Parameter missing: user_id')
    }

    if (params.start_at !== undefined && params.start_at !== null && !isString(params.start_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params.start_at)}`)
    }

    if (params.end_at !== undefined && params.end_at !== null && !isString(params.end_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params.end_at)}`)
    }

    if (params.display !== undefined && params.display !== null && !isString(params.display)) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params.display)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    const response = await Api.sendRequest(`/history/users/${encodeURIComponent(params.user_id)}`, 'GET', params, options)

    const Action = require('./Action.js').default
    return response?.data?.map(obj => new Action(obj, retainedOptions(options))) || []
  }

  // The items listForUser() lists, one at a time: an async iterator that requests each page
  // through listForUser() only once the items before it have been taken (see Api._iterate).
  static listForUserIterator = (userId, params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      History.listForUser(userId, pageParams, pageOptions))

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
  static listLogins = async (params = {}, options = {}) => {
    if (params.start_at !== undefined && params.start_at !== null && !isString(params.start_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params.start_at)}`)
    }

    if (params.end_at !== undefined && params.end_at !== null && !isString(params.end_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params.end_at)}`)
    }

    if (params.display !== undefined && params.display !== null && !isString(params.display)) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params.display)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/history/login', 'GET', params, options)

    const Action = require('./Action.js').default
    return response?.data?.map(obj => new Action(obj, retainedOptions(options))) || []
  }

  // The items listLogins() lists, one at a time: an async iterator that requests each page
  // through listLogins() only once the items before it have been taken (see Api._iterate).
  static listLoginsIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      History.listLogins(pageParams, pageOptions))

  // Parameters:
  //   start_at - string - Leave blank or set to a date/time to filter earlier entries.
  //   end_at - string - Leave blank or set to a date/time to filter later entries.
  //   display - string - Display format. Leave blank or set to `full` or `parent`.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `user_id`, `folder` or `path`. Valid field combinations are `[  ]`, `[ path ]`, `[ path ]` or `[ path ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  static list = async (params = {}, options = {}) => {
    if (params.start_at !== undefined && params.start_at !== null && !isString(params.start_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params.start_at)}`)
    }

    if (params.end_at !== undefined && params.end_at !== null && !isString(params.end_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params.end_at)}`)
    }

    if (params.display !== undefined && params.display !== null && !isString(params.display)) {
      throw new errors.InvalidParameterError(`Bad parameter: display must be of type String, received ${getType(params.display)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/history', 'GET', params, options)

    const Action = require('./Action.js').default
    return response?.data?.map(obj => new Action(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    History.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      History.list(pageParams, pageOptions))
}

export default History

module.exports = History
module.exports.default = History
