import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class ActionNotificationExportResult
 */
class ActionNotificationExportResult {
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
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via either the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action_notification_export_id (required) - int64 - ID of the associated action notification export.
  static list = async (params = {}, options = {}) => {
    if (!params['action_notification_export_id']) {
      throw new Error('Parameter missing: action_notification_export_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action_notification_export_id'] && !isInt(params['action_notification_export_id'])) {
      throw new Error(`Bad parameter: action_notification_export_id must be of type Int, received ${getType(action_notification_export_id)}`)
    }

    const response = await Api.sendRequest(`/action_notification_export_results`, 'GET', params, options)

    return response?.data?.map(obj => new ActionNotificationExportResult(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ActionNotificationExportResult.list(params, options)
}

export default ActionNotificationExportResult
