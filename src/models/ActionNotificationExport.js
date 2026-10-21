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
 * Class ActionNotificationExport
 */
class ActionNotificationExport {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # History Export ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # Version of the underlying records for the export.
  getExportVersion = () => this.attributes.export_version

  setExportVersion = value => {
    this.attributes.export_version = value
    exposeAttributes(this, ['export_version'])
  }

  // date-time # Start date/time of export range.
  getStartAt = () => this.attributes.start_at

  setStartAt = value => {
    this.attributes.start_at = value
    exposeAttributes(this, ['start_at'])
  }

  // date-time # End date/time of export range.
  getEndAt = () => this.attributes.end_at

  setEndAt = value => {
    this.attributes.end_at = value
    exposeAttributes(this, ['end_at'])
  }

  // string # Status of export.  Valid values: `building`, `ready`, or `failed`
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // string # Return notifications that were triggered by actions on this specific path.
  getQueryPath = () => this.attributes.query_path

  setQueryPath = value => {
    this.attributes.query_path = value
    exposeAttributes(this, ['query_path'])
  }

  // string # Return notifications that were triggered by actions in this folder.
  getQueryFolder = () => this.attributes.query_folder

  setQueryFolder = value => {
    this.attributes.query_folder = value
    exposeAttributes(this, ['query_folder'])
  }

  // string # Error message associated with the request, if any.
  getQueryMessage = () => this.attributes.query_message

  setQueryMessage = value => {
    this.attributes.query_message = value
    exposeAttributes(this, ['query_message'])
  }

  // string # The HTTP request method used by the webhook.
  getQueryRequestMethod = () => this.attributes.query_request_method

  setQueryRequestMethod = value => {
    this.attributes.query_request_method = value
    exposeAttributes(this, ['query_request_method'])
  }

  // string # The target webhook URL.
  getQueryRequestUrl = () => this.attributes.query_request_url

  setQueryRequestUrl = value => {
    this.attributes.query_request_url = value
    exposeAttributes(this, ['query_request_url'])
  }

  // string # The HTTP status returned from the server in response to the webhook request.
  getQueryStatus = () => this.attributes.query_status

  setQueryStatus = value => {
    this.attributes.query_status = value
    exposeAttributes(this, ['query_status'])
  }

  // boolean # true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise.
  getQuerySuccess = () => this.attributes.query_success

  setQuerySuccess = value => {
    this.attributes.query_success = value
    exposeAttributes(this, ['query_success'])
  }

  // string # If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV.
  getResultsUrl = () => this.attributes.results_url

  setResultsUrl = value => {
    this.attributes.results_url = value
    exposeAttributes(this, ['results_url'])
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The ActionNotificationExport object doesn\'t support updates.')
    } else {
      const newObject = await ActionNotificationExport.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   id (required) - int64 - Action Notification Export ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/action_notification_exports/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ActionNotificationExport(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ActionNotificationExport.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   workspace_id - int64 - Workspace whose logs are exported. Set to `0` for the default workspace. A null value means a site-wide export.
  //   start_at - string - Start date/time of export range.
  //   end_at - string - End date/time of export range.
  //   query_message - string - Error message associated with the request, if any.
  //   query_request_method - string - The HTTP request method used by the webhook.
  //   query_request_url - string - The target webhook URL.
  //   query_status - string - The HTTP status returned from the server in response to the webhook request.
  //   query_success - boolean - true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise.
  //   query_path - string - Return notifications that were triggered by actions on this specific path.
  //   query_folder - string - Return notifications that were triggered by actions in this folder.
  static create = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.start_at !== undefined && params.start_at !== null && !isString(params.start_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params.start_at)}`)
    }

    if (params.end_at !== undefined && params.end_at !== null && !isString(params.end_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params.end_at)}`)
    }

    if (params.query_message !== undefined && params.query_message !== null && !isString(params.query_message)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_message must be of type String, received ${getType(params.query_message)}`)
    }

    if (params.query_request_method !== undefined && params.query_request_method !== null && !isString(params.query_request_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_request_method must be of type String, received ${getType(params.query_request_method)}`)
    }

    if (params.query_request_url !== undefined && params.query_request_url !== null && !isString(params.query_request_url)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_request_url must be of type String, received ${getType(params.query_request_url)}`)
    }

    if (params.query_status !== undefined && params.query_status !== null && !isString(params.query_status)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_status must be of type String, received ${getType(params.query_status)}`)
    }

    if (isArray(params.query_success) || isObject(params.query_success)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_success must be of type Boolean, received ${getType(params.query_success)}`)
    }

    if (params.query_path !== undefined && params.query_path !== null && !isString(params.query_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_path must be of type String, received ${getType(params.query_path)}`)
    }

    if (params.query_folder !== undefined && params.query_folder !== null && !isString(params.query_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: query_folder must be of type String, received ${getType(params.query_folder)}`)
    }

    const response = await Api.sendRequest('/action_notification_exports', 'POST', params, options)

    return new ActionNotificationExport(response?.data, retainedOptions(options))
  }
}

export default ActionNotificationExport

module.exports = ActionNotificationExport
module.exports.default = ActionNotificationExport
