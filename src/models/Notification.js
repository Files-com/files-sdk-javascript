import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

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

  // string # Folder path to notify on This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # Notification group id
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
  }

  // string # Group name if applicable
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
  }

  // array # Only notify on actions made by a member of one of the specified groups
  getTriggeringGroupIds = () => this.attributes.triggering_group_ids

  setTriggeringGroupIds = value => {
    this.attributes.triggering_group_ids = value
  }

  // array # Only notify on actions made one of the specified users
  getTriggeringUserIds = () => this.attributes.triggering_user_ids

  setTriggeringUserIds = value => {
    this.attributes.triggering_user_ids = value
  }

  // boolean # Notify when actions are performed by a share recipient?
  getTriggerByShareRecipients = () => this.attributes.trigger_by_share_recipients

  setTriggerByShareRecipients = value => {
    this.attributes.trigger_by_share_recipients = value
  }

  // boolean # Trigger notification on notification user actions?
  getNotifyUserActions = () => this.attributes.notify_user_actions

  setNotifyUserActions = value => {
    this.attributes.notify_user_actions = value
  }

  // boolean # Triggers notification when copying files to this path
  getNotifyOnCopy = () => this.attributes.notify_on_copy

  setNotifyOnCopy = value => {
    this.attributes.notify_on_copy = value
  }

  // boolean # Triggers notification when deleting files from this path
  getNotifyOnDelete = () => this.attributes.notify_on_delete

  setNotifyOnDelete = value => {
    this.attributes.notify_on_delete = value
  }

  // boolean # Triggers notification when downloading files from this path
  getNotifyOnDownload = () => this.attributes.notify_on_download

  setNotifyOnDownload = value => {
    this.attributes.notify_on_download = value
  }

  // boolean # Triggers notification when moving files to this path
  getNotifyOnMove = () => this.attributes.notify_on_move

  setNotifyOnMove = value => {
    this.attributes.notify_on_move = value
  }

  // boolean # Triggers notification when uploading new files to this path
  getNotifyOnUpload = () => this.attributes.notify_on_upload

  setNotifyOnUpload = value => {
    this.attributes.notify_on_upload = value
  }

  // boolean # Enable notifications for each subfolder in this path
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
  }

  // string # The time interval that notifications are aggregated to
  getSendInterval = () => this.attributes.send_interval

  setSendInterval = value => {
    this.attributes.send_interval = value
  }

  // string # Custom message to include in notification emails.
  getMessage = () => this.attributes.message

  setMessage = value => {
    this.attributes.message = value
  }

  // array # Array of filenames (possibly with wildcards) to match for action path
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
  //   notify_on_delete - boolean - Triggers notification when deleting files from this path
  //   notify_on_download - boolean - Triggers notification when downloading files from this path
  //   notify_on_move - boolean - Triggers notification when moving files to this path
  //   notify_on_upload - boolean - Triggers notification when uploading new files to this path
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   message - string - Custom message to include in notification emails.
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to match for action path
  //   triggering_group_ids - array(int64) - Only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - Only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['send_interval'] && !isString(params['send_interval'])) {
      throw new errors.InvalidParameterError(`Bad parameter: send_interval must be of type String, received ${getType(send_interval)}`)
    }
    if (params['message'] && !isString(params['message'])) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(message)}`)
    }
    if (params['triggering_filenames'] && !isArray(params['triggering_filenames'])) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_filenames must be of type Array, received ${getType(triggering_filenames)}`)
    }
    if (params['triggering_group_ids'] && !isArray(params['triggering_group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_group_ids must be of type Array, received ${getType(triggering_group_ids)}`)
    }
    if (params['triggering_user_ids'] && !isArray(params['triggering_user_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_user_ids must be of type Array, received ${getType(triggering_user_ids)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

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
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Notification.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - DEPRECATED: Show notifications for this User ID. Use `filter[user_id]` instead.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[path]=desc`). Valid fields are `path`, `user_id` or `group_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `user_id` or `group_id`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  //   path - string - Show notifications for this Path.
  //   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
  //   group_id - string
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
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

    if (params['group_id'] && !isString(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type String, received ${getType(params['group_id'])}`)
    }

    const response = await Api.sendRequest(`/notifications`, 'GET', params, options)

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

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Notification(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Notification.find(id, params, options)

  // Parameters:
  //   user_id - int64 - The id of the user to notify. Provide `user_id`, `username` or `group_id`.
  //   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
  //   notify_on_delete - boolean - Triggers notification when deleting files from this path
  //   notify_on_download - boolean - Triggers notification when downloading files from this path
  //   notify_on_move - boolean - Triggers notification when moving files to this path
  //   notify_on_upload - boolean - Triggers notification when uploading new files to this path
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   message - string - Custom message to include in notification emails.
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to match for action path
  //   triggering_group_ids - array(int64) - Only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - Only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  //   group_id - int64 - The ID of the group to notify.  Provide `user_id`, `username` or `group_id`.
  //   path - string - Path
  //   username - string - The username of the user to notify.  Provide `user_id`, `username` or `group_id`.
  static create = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['send_interval'] && !isString(params['send_interval'])) {
      throw new errors.InvalidParameterError(`Bad parameter: send_interval must be of type String, received ${getType(params['send_interval'])}`)
    }

    if (params['message'] && !isString(params['message'])) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params['message'])}`)
    }

    if (params['triggering_filenames'] && !isArray(params['triggering_filenames'])) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_filenames must be of type Array, received ${getType(params['triggering_filenames'])}`)
    }

    if (params['triggering_group_ids'] && !isArray(params['triggering_group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_group_ids must be of type Array, received ${getType(params['triggering_group_ids'])}`)
    }

    if (params['triggering_user_ids'] && !isArray(params['triggering_user_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_user_ids must be of type Array, received ${getType(params['triggering_user_ids'])}`)
    }

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params['group_id'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['username'] && !isString(params['username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params['username'])}`)
    }

    const response = await Api.sendRequest(`/notifications`, 'POST', params, options)

    return new Notification(response?.data, options)
  }
}

export default Notification
