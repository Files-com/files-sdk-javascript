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
 * Class ActionNotificationExportResult
 */
class ActionNotificationExportResult {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Notification ID
  getId = () => this.attributes.id

  // int64 # When the notification was sent.
  getCreatedAt = () => this.attributes.created_at

  // int64 # HTTP status code returned in the webhook response.
  getStatus = () => this.attributes.status

  // string # A message indicating the overall status of the webhook notification.
  getMessage = () => this.attributes.message

  // boolean # `true` if the webhook succeeded by receiving a 200 or 204 response.
  getSuccess = () => this.attributes.success

  // string # A JSON-encoded string with headers that were sent with the webhook.
  getRequestHeaders = () => this.attributes.request_headers

  // string # The HTTP verb used to perform the webhook.
  getRequestMethod = () => this.attributes.request_method

  // string # The webhook request URL.
  getRequestUrl = () => this.attributes.request_url

  // string # The path to the actual file that triggered this notification. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # The folder associated with the triggering action for this notification.
  getFolder = () => this.attributes.folder

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   action_notification_export_id (required) - int64 - ID of the associated action notification export.
  static list = async (params = {}, options = {}) => {
    if (!params.action_notification_export_id) {
      throw new errors.MissingParameterError('Parameter missing: action_notification_export_id')
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.action_notification_export_id !== undefined && params.action_notification_export_id !== null && !isInt(params.action_notification_export_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: action_notification_export_id must be of type Int, received ${getType(params.action_notification_export_id)}`)
    }

    const response = await Api.sendRequest('/action_notification_export_results', 'GET', params, options)

    return response?.data?.map(obj => new ActionNotificationExportResult(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ActionNotificationExportResult.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ActionNotificationExportResult.list(pageParams, pageOptions))
}

export default ActionNotificationExportResult

module.exports = ActionNotificationExportResult
module.exports.default = ActionNotificationExportResult
