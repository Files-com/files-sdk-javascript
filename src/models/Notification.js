/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Notification
 */
class Notification {
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

  setId = value => {
    this.attributes.id = value
  }

  // string # Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # ID of Group to receive notifications
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
  }

  // string # Group name, if a Group ID is set
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
  }

  // array(int64) # If set, will only notify on actions made by a member of one of the specified groups
  getTriggeringGroupIds = () => this.attributes.triggering_group_ids

  setTriggeringGroupIds = value => {
    this.attributes.triggering_group_ids = value
  }

  // array(int64) # If set, will only notify on actions made one of the specified users
  getTriggeringUserIds = () => this.attributes.triggering_user_ids

  setTriggeringUserIds = value => {
    this.attributes.triggering_user_ids = value
  }

  // boolean # Notify when actions are performed by a share recipient?
  getTriggerByShareRecipients = () => this.attributes.trigger_by_share_recipients

  setTriggerByShareRecipients = value => {
    this.attributes.trigger_by_share_recipients = value
  }

  // boolean # If true, will send notifications about a user's own activity to that user.  If false, only activity performed by other users (or anonymous users) will be sent in notifications.
  getNotifyUserActions = () => this.attributes.notify_user_actions

  setNotifyUserActions = value => {
    this.attributes.notify_user_actions = value
  }

  // boolean # Trigger on files copied to this path?
  getNotifyOnCopy = () => this.attributes.notify_on_copy

  setNotifyOnCopy = value => {
    this.attributes.notify_on_copy = value
  }

  // boolean # Trigger on files deleted in this path?
  getNotifyOnDelete = () => this.attributes.notify_on_delete

  setNotifyOnDelete = value => {
    this.attributes.notify_on_delete = value
  }

  // boolean # Trigger on files downloaded in this path?
  getNotifyOnDownload = () => this.attributes.notify_on_download

  setNotifyOnDownload = value => {
    this.attributes.notify_on_download = value
  }

  // boolean # Trigger on files moved to this path?
  getNotifyOnMove = () => this.attributes.notify_on_move

  setNotifyOnMove = value => {
    this.attributes.notify_on_move = value
  }

  // boolean # Trigger on files created/uploaded/updated/changed in this path?
  getNotifyOnUpload = () => this.attributes.notify_on_upload

  setNotifyOnUpload = value => {
    this.attributes.notify_on_upload = value
  }

  // boolean # Apply notification recursively?  This will enable notifications for each subfolder.
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
  }

  // string # The time interval that notifications are aggregated to
  getSendInterval = () => this.attributes.send_interval

  setSendInterval = value => {
    this.attributes.send_interval = value
  }

  // string # Custom message to include in notification emails
  getMessage = () => this.attributes.message

  setMessage = value => {
    this.attributes.message = value
  }

  // array(string) # Array of filenames (possibly with wildcards) to scope trigger
  getTriggeringFilenames = () => this.attributes.triggering_filenames

  setTriggeringFilenames = value => {
    this.attributes.triggering_filenames = value
  }

  // boolean # Is the user unsubscribed from this notification?
  getUnsubscribed = () => this.attributes.unsubscribed

  setUnsubscribed = value => {
    this.attributes.unsubscribed = value
  }

  // string # The reason that the user unsubscribed
  getUnsubscribedReason = () => this.attributes.unsubscribed_reason

  setUnsubscribedReason = value => {
    this.attributes.unsubscribed_reason = value
  }

  // int64 # Notification user ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Notification username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // boolean # If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had their email "hard bounce", which means that we are unable to send mail to this user's current email address. Notifications will resume if the user changes their email address.
  getSuppressedEmail = () => this.attributes.suppressed_email

  setSuppressedEmail = value => {
    this.attributes.suppressed_email = value
  }

  // Parameters:
  //   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
  //   notify_on_delete - boolean - Trigger on files deleted in this path?
  //   notify_on_download - boolean - Trigger on files downloaded in this path?
  //   notify_on_move - boolean - Trigger on files moved to this path?
  //   notify_on_upload - boolean - Trigger on files created/uploaded/updated/changed in this path?
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   message - string - Custom message to include in notification emails
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to scope trigger
  //   triggering_group_ids - array(int64) - If set, will only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - If set, will only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.send_interval && !isString(params.send_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_interval must be of type String, received ${getType(params.send_interval)}`)
    }

    if (params.message && !isString(params.message)) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params.message)}`)
    }

    if (params.triggering_filenames && !isArray(params.triggering_filenames)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_filenames must be of type Array, received ${getType(params.triggering_filenames)}`)
    }

    if (params.triggering_group_ids && !isArray(params.triggering_group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_group_ids must be of type Array, received ${getType(params.triggering_group_ids)}`)
    }

    if (params.triggering_user_ids && !isArray(params.triggering_user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_user_ids must be of type Array, received ${getType(params.triggering_user_ids)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new Notification(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/notifications/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await Notification.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `path`, `user_id` or `group_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `user_id` or `group_id`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  //   path - string - Show notifications for this Path.
  //   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
  //   group_id - string
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.group_id && !isString(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type String, received ${getType(params.group_id)}`)
    }

    const response = await Api.sendRequest('/notifications', 'GET', params, options)

    return response?.data?.map(obj => new Notification(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Notification.list(params, options)

  // Parameters:
  //   id (required) - int64 - Notification ID.
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

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Notification(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Notification.find(id, params, options)

  // Parameters:
  //   user_id - int64 - The id of the user to notify. Provide `user_id`, `username` or `group_id`.
  //   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
  //   notify_on_delete - boolean - Trigger on files deleted in this path?
  //   notify_on_download - boolean - Trigger on files downloaded in this path?
  //   notify_on_move - boolean - Trigger on files moved to this path?
  //   notify_on_upload - boolean - Trigger on files created/uploaded/updated/changed in this path?
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   message - string - Custom message to include in notification emails
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to scope trigger
  //   triggering_group_ids - array(int64) - If set, will only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - If set, will only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  //   group_id - int64 - The ID of the group to notify.  Provide `user_id`, `username` or `group_id`.
  //   path - string - Path
  //   username - string - The username of the user to notify.  Provide `user_id`, `username` or `group_id`.
  static create = async (params = {}, options = {}) => {
    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.send_interval && !isString(params.send_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_interval must be of type String, received ${getType(params.send_interval)}`)
    }

    if (params.message && !isString(params.message)) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params.message)}`)
    }

    if (params.triggering_filenames && !isArray(params.triggering_filenames)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_filenames must be of type Array, received ${getType(params.triggering_filenames)}`)
    }

    if (params.triggering_group_ids && !isArray(params.triggering_group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_group_ids must be of type Array, received ${getType(params.triggering_group_ids)}`)
    }

    if (params.triggering_user_ids && !isArray(params.triggering_user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_user_ids must be of type Array, received ${getType(params.triggering_user_ids)}`)
    }

    if (params.group_id && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.username && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    const response = await Api.sendRequest('/notifications', 'POST', params, options)

    return new Notification(response?.data, options)
  }

  // Parameters:
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `path`, `user_id` or `group_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `user_id` or `group_id`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  //   path - string - Show notifications for this Path.
  //   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
  //   group_id - string
  static createExport = async (params = {}, options = {}) => {
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.group_id && !isString(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type String, received ${getType(params.group_id)}`)
    }

    const response = await Api.sendRequest('/notifications/create_export', 'POST', params, options)

    const Export = require('./Export.js').default
    return response?.data?.map(obj => new Export(obj, options)) || []
  }
}

export default Notification

module.exports = Notification
module.exports.default = Notification
