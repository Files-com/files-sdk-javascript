import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class ActionNotificationExport
 */
class ActionNotificationExport {
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
  // int64 # History Export ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Version of the underlying records for the export.
  getExportVersion = () => this.attributes.export_version

  setExportVersion = value => {
    this.attributes.export_version = value
  }

  // date-time # Start date/time of export range.
  getStartAt = () => this.attributes.start_at

  setStartAt = value => {
    this.attributes.start_at = value
  }

  // date-time # End date/time of export range.
  getEndAt = () => this.attributes.end_at

  setEndAt = value => {
    this.attributes.end_at = value
  }

  // string # Status of export.  Valid values: `building`, `ready`, or `failed`
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // string # Return notifications that were triggered by actions on this specific path.
  getQueryPath = () => this.attributes.query_path

  setQueryPath = value => {
    this.attributes.query_path = value
  }

  // string # Return notifications that were triggered by actions in this folder.
  getQueryFolder = () => this.attributes.query_folder

  setQueryFolder = value => {
    this.attributes.query_folder = value
  }

  // string # Error message associated with the request, if any.
  getQueryMessage = () => this.attributes.query_message

  setQueryMessage = value => {
    this.attributes.query_message = value
  }

  // string # The HTTP request method used by the webhook.
  getQueryRequestMethod = () => this.attributes.query_request_method

  setQueryRequestMethod = value => {
    this.attributes.query_request_method = value
  }

  // string # The target webhook URL.
  getQueryRequestUrl = () => this.attributes.query_request_url

  setQueryRequestUrl = value => {
    this.attributes.query_request_url = value
  }

  // string # The HTTP status returned from the server in response to the webhook request.
  getQueryStatus = () => this.attributes.query_status

  setQueryStatus = value => {
    this.attributes.query_status = value
  }

  // boolean # true if the webhook request succeeded (i.e. returned a 200 or 204 response status). false otherwise.
  getQuerySuccess = () => this.attributes.query_success

  setQuerySuccess = value => {
    this.attributes.query_success = value
  }

  // string # If `status` is `ready`, this will be a URL where all the results can be downloaded at once as a CSV.
  getResultsUrl = () => this.attributes.results_url

  setResultsUrl = value => {
    this.attributes.results_url = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }


  save = () => {
      if (this.attributes['id']) {
        throw new errors.NotImplementedError('The ActionNotificationExport object doesn\'t support updates.')
      } else {
        const newObject = ActionNotificationExport.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   id (required) - int64 - Action Notification Export ID.
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

    const response = await Api.sendRequest(`/action_notification_exports/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new ActionNotificationExport(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ActionNotificationExport.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
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
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['start_at'] && !isString(params['start_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: start_at must be of type String, received ${getType(params['start_at'])}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: end_at must be of type String, received ${getType(params['end_at'])}`)
    }

    if (params['query_message'] && !isString(params['query_message'])) {
      throw new errors.InvalidParameterError(`Bad parameter: query_message must be of type String, received ${getType(params['query_message'])}`)
    }

    if (params['query_request_method'] && !isString(params['query_request_method'])) {
      throw new errors.InvalidParameterError(`Bad parameter: query_request_method must be of type String, received ${getType(params['query_request_method'])}`)
    }

    if (params['query_request_url'] && !isString(params['query_request_url'])) {
      throw new errors.InvalidParameterError(`Bad parameter: query_request_url must be of type String, received ${getType(params['query_request_url'])}`)
    }

    if (params['query_status'] && !isString(params['query_status'])) {
      throw new errors.InvalidParameterError(`Bad parameter: query_status must be of type String, received ${getType(params['query_status'])}`)
    }

    if (params['query_path'] && !isString(params['query_path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: query_path must be of type String, received ${getType(params['query_path'])}`)
    }

    if (params['query_folder'] && !isString(params['query_folder'])) {
      throw new errors.InvalidParameterError(`Bad parameter: query_folder must be of type String, received ${getType(params['query_folder'])}`)
    }

    const response = await Api.sendRequest(`/action_notification_exports`, 'POST', params, options)

    return new ActionNotificationExport(response?.data, options)
  }
}

export default ActionNotificationExport
