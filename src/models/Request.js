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
 * Class Request
 */
class Request {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Request ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // string # Source filename, if applicable
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
    exposeAttributes(this, ['source'])
  }

  // string # Destination filename
  getDestination = () => this.attributes.destination

  setDestination = value => {
    this.attributes.destination = value
    exposeAttributes(this, ['destination'])
  }

  // int64 # ID of automation that created request
  getAutomationId = () => this.attributes.automation_id

  setAutomationId = value => {
    this.attributes.automation_id = value
    exposeAttributes(this, ['automation_id'])
  }

  // string # User making the request (if applicable)
  getUserDisplayName = () => this.attributes.user_display_name

  setUserDisplayName = value => {
    this.attributes.user_display_name = value
    exposeAttributes(this, ['user_display_name'])
  }

  // string # A list of user IDs to request the file from. If sent as a string, it should be comma-delimited.
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
    exposeAttributes(this, ['user_ids'])
  }

  // string # A list of group IDs to request the file from. If sent as a string, it should be comma-delimited.
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
    exposeAttributes(this, ['group_ids'])
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/requests/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The Request object doesn\'t support updates.')
    } else {
      const newObject = await Request.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  //   mine - boolean - Only show requests of the current user?  (Defaults to true if current user is not a site admin.)
  //   path - string - Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (isArray(params.mine) || isObject(params.mine)) {
      throw new errors.InvalidParameterError(`Bad parameter: mine must be of type Boolean, received ${getType(params.mine)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    const response = await Api.sendRequest('/requests', 'GET', params, options)

    return response?.data?.map(obj => new Request(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Request.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Request.list(pageParams, pageOptions))

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  //   mine - boolean - Only show requests of the current user?  (Defaults to true if current user is not a site admin.)
  //   path (required) - string - Path to show requests for.  If omitted, shows all paths. Send `/` to represent the root directory.
  static getFolder = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (isArray(params.mine) || isObject(params.mine)) {
      throw new errors.InvalidParameterError(`Bad parameter: mine must be of type Boolean, received ${getType(params.mine)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    const response = await Api.sendRequest(`/requests/folders/${encodeURIComponent(params.path)}`, 'GET', params, options)

    return response?.data?.map(obj => new Request(obj, retainedOptions(options))) || []
  }

  // The items getFolder() lists, one at a time: an async iterator that requests each page
  // through getFolder() only once the items before it have been taken (see Api._iterate).
  static getFolderIterator = (path, params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Request.getFolder(path, pageParams, pageOptions))

  // Parameters:
  //   path (required) - string - Folder path on which to request the file.
  //   destination (required) - string - Destination filename (without extension) to request.
  //   user_ids - string - A list of user IDs to request the file from. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs to request the file from. If sent as a string, it should be comma-delimited.
  static create = async (params = {}, options = {}) => {
    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (!params.destination) {
      throw new errors.MissingParameterError('Parameter missing: destination')
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.user_ids !== undefined && params.user_ids !== null && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
    }

    const response = await Api.sendRequest('/requests', 'POST', params, options)

    return new Request(response?.data, retainedOptions(options))
  }
}

export default Request

module.exports = Request
module.exports.default = Request
