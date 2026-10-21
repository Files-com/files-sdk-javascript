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
 * Class Notification
 */
class Notification {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Notification ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Folder path to notify on. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // int64 # ID of Group to receive notifications
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
    exposeAttributes(this, ['group_id'])
  }

  // string # Group name, if a Group ID is set
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
    exposeAttributes(this, ['group_name'])
  }

  // array(int64) # Group IDs when the notification requires multiple groups
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
    exposeAttributes(this, ['group_ids'])
  }

  // array(string) # Group names when the notification requires multiple groups
  getGroupNames = () => this.attributes.group_names

  setGroupNames = value => {
    this.attributes.group_names = value
    exposeAttributes(this, ['group_names'])
  }

  // array(int64) # If set, will only notify on actions made by a member of one of the specified groups
  getTriggeringGroupIds = () => this.attributes.triggering_group_ids

  setTriggeringGroupIds = value => {
    this.attributes.triggering_group_ids = value
    exposeAttributes(this, ['triggering_group_ids'])
  }

  // array(int64) # If set, will only notify on actions made one of the specified users
  getTriggeringUserIds = () => this.attributes.triggering_user_ids

  setTriggeringUserIds = value => {
    this.attributes.triggering_user_ids = value
    exposeAttributes(this, ['triggering_user_ids'])
  }

  // boolean # Notify when actions are performed by a share recipient?
  getTriggerByShareRecipients = () => this.attributes.trigger_by_share_recipients

  setTriggerByShareRecipients = value => {
    this.attributes.trigger_by_share_recipients = value
    exposeAttributes(this, ['trigger_by_share_recipients'])
  }

  // boolean # If true, will send notifications about a user's own activity to that user.  If false, only activity performed by other users (or anonymous users) will be sent in notifications.
  getNotifyUserActions = () => this.attributes.notify_user_actions

  setNotifyUserActions = value => {
    this.attributes.notify_user_actions = value
    exposeAttributes(this, ['notify_user_actions'])
  }

  // boolean # Trigger on files copied to this path?
  getNotifyOnCopy = () => this.attributes.notify_on_copy

  setNotifyOnCopy = value => {
    this.attributes.notify_on_copy = value
    exposeAttributes(this, ['notify_on_copy'])
  }

  // boolean # Trigger on files deleted in this path?
  getNotifyOnDelete = () => this.attributes.notify_on_delete

  setNotifyOnDelete = value => {
    this.attributes.notify_on_delete = value
    exposeAttributes(this, ['notify_on_delete'])
  }

  // boolean # Trigger on files downloaded in this path?
  getNotifyOnDownload = () => this.attributes.notify_on_download

  setNotifyOnDownload = value => {
    this.attributes.notify_on_download = value
    exposeAttributes(this, ['notify_on_download'])
  }

  // boolean # Trigger on files moved to this path?
  getNotifyOnMove = () => this.attributes.notify_on_move

  setNotifyOnMove = value => {
    this.attributes.notify_on_move = value
    exposeAttributes(this, ['notify_on_move'])
  }

  // boolean # Trigger on files created/uploaded/updated/changed in this path?
  getNotifyOnUpload = () => this.attributes.notify_on_upload

  setNotifyOnUpload = value => {
    this.attributes.notify_on_upload = value
    exposeAttributes(this, ['notify_on_upload'])
  }

  // boolean # Apply notification recursively?  This will enable notifications for each subfolder.
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
    exposeAttributes(this, ['recursive'])
  }

  // string # The time interval that notifications are aggregated to
  getSendInterval = () => this.attributes.send_interval

  setSendInterval = value => {
    this.attributes.send_interval = value
    exposeAttributes(this, ['send_interval'])
  }

  // string # Custom subject line to use for notification emails
  getSubject = () => this.attributes.subject

  setSubject = value => {
    this.attributes.subject = value
    exposeAttributes(this, ['subject'])
  }

  // string # Custom message to include in notification emails
  getMessage = () => this.attributes.message

  setMessage = value => {
    this.attributes.message = value
    exposeAttributes(this, ['message'])
  }

  // array(string) # Array of filenames (possibly with wildcards) to scope trigger
  getTriggeringFilenames = () => this.attributes.triggering_filenames

  setTriggeringFilenames = value => {
    this.attributes.triggering_filenames = value
    exposeAttributes(this, ['triggering_filenames'])
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // boolean # Is the user unsubscribed from this notification?
  getUnsubscribed = () => this.attributes.unsubscribed

  setUnsubscribed = value => {
    this.attributes.unsubscribed = value
    exposeAttributes(this, ['unsubscribed'])
  }

  // string # The reason that the user unsubscribed
  getUnsubscribedReason = () => this.attributes.unsubscribed_reason

  setUnsubscribedReason = value => {
    this.attributes.unsubscribed_reason = value
    exposeAttributes(this, ['unsubscribed_reason'])
  }

  // int64 # Notification user ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // string # Notification username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
    exposeAttributes(this, ['username'])
  }

  // boolean # If true, it means that the recipient at this user's email address has manually unsubscribed from all emails, or had their email "hard bounce", which means that we are unable to send mail to this user's current email address. Notifications will resume if the user changes their email address.
  getSuppressedEmail = () => this.attributes.suppressed_email

  setSuppressedEmail = value => {
    this.attributes.suppressed_email = value
    exposeAttributes(this, ['suppressed_email'])
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
  //   subject - string - Custom subject line to use for notification emails
  //   message - string - Custom message to include in notification emails
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to scope trigger
  //   triggering_group_ids - array(int64) - If set, will only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - If set, will only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  update = async (params = {}) => {
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

    if (isArray(params.notify_on_copy) || isObject(params.notify_on_copy)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_copy must be of type Boolean, received ${getType(params.notify_on_copy)}`)
    }

    if (isArray(params.notify_on_delete) || isObject(params.notify_on_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_delete must be of type Boolean, received ${getType(params.notify_on_delete)}`)
    }

    if (isArray(params.notify_on_download) || isObject(params.notify_on_download)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_download must be of type Boolean, received ${getType(params.notify_on_download)}`)
    }

    if (isArray(params.notify_on_move) || isObject(params.notify_on_move)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_move must be of type Boolean, received ${getType(params.notify_on_move)}`)
    }

    if (isArray(params.notify_on_upload) || isObject(params.notify_on_upload)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_upload must be of type Boolean, received ${getType(params.notify_on_upload)}`)
    }

    if (isArray(params.notify_user_actions) || isObject(params.notify_user_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_user_actions must be of type Boolean, received ${getType(params.notify_user_actions)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (params.send_interval !== undefined && params.send_interval !== null && !isString(params.send_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_interval must be of type String, received ${getType(params.send_interval)}`)
    }

    if (params.subject !== undefined && params.subject !== null && !isString(params.subject)) {
      throw new errors.InvalidParameterError(`Bad parameter: subject must be of type String, received ${getType(params.subject)}`)
    }

    if (params.message !== undefined && params.message !== null && !isString(params.message)) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params.message)}`)
    }

    if (params.triggering_filenames !== undefined && params.triggering_filenames !== null && !isArray(params.triggering_filenames)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_filenames must be of type Array, received ${getType(params.triggering_filenames)}`)
    }

    if (params.triggering_group_ids !== undefined && params.triggering_group_ids !== null && !isArray(params.triggering_group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_group_ids must be of type Array, received ${getType(params.triggering_group_ids)}`)
    }

    if (params.triggering_user_ids !== undefined && params.triggering_user_ids !== null && !isArray(params.triggering_user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_user_ids must be of type Array, received ${getType(params.triggering_user_ids)}`)
    }

    if (isArray(params.trigger_by_share_recipients) || isObject(params.trigger_by_share_recipients)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_by_share_recipients must be of type Boolean, received ${getType(params.trigger_by_share_recipients)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
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

    await Api.sendRequest(`/notifications/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Notification.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `path`, `user_id` or `group_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `user_id`, `workspace_id` or `group_id`. Valid field combinations are `[ workspace_id, path ]`, `[ workspace_id, user_id ]`, `[ workspace_id, group_id ]` or `[ workspace_id, user_id, path ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  //   path - string - Show notifications for this Path.
  //   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
  //   group_id - string
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.include_ancestors) || isObject(params.include_ancestors)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_ancestors must be of type Boolean, received ${getType(params.include_ancestors)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isString(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type String, received ${getType(params.group_id)}`)
    }

    const response = await Api.sendRequest('/notifications', 'GET', params, options)

    return response?.data?.map(obj => new Notification(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Notification.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Notification.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Notification ID.
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

    const response = await Api.sendRequest(`/notifications/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Notification(response?.data, retainedOptions(options))
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
  //   subject - string - Custom subject line to use for notification emails
  //   message - string - Custom message to include in notification emails
  //   triggering_filenames - array(string) - Array of filenames (possibly with wildcards) to scope trigger
  //   triggering_group_ids - array(int64) - If set, will only notify on actions made by a member of one of the specified groups
  //   triggering_user_ids - array(int64) - If set, will only notify on actions made one of the specified users
  //   trigger_by_share_recipients - boolean - Notify when actions are performed by a share recipient?
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  //   group_id - int64 - The ID of the group to notify.  Provide `user_id`, `username` or `group_id`.
  //   group_ids - string - Group IDs when the notification requires multiple groups. If sent as a string, it should be comma-delimited.
  //   path - string - Path
  //   username - string - The username of the user to notify.  Provide `user_id`, `username` or `group_id`.
  static create = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (isArray(params.notify_on_copy) || isObject(params.notify_on_copy)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_copy must be of type Boolean, received ${getType(params.notify_on_copy)}`)
    }

    if (isArray(params.notify_on_delete) || isObject(params.notify_on_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_delete must be of type Boolean, received ${getType(params.notify_on_delete)}`)
    }

    if (isArray(params.notify_on_download) || isObject(params.notify_on_download)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_download must be of type Boolean, received ${getType(params.notify_on_download)}`)
    }

    if (isArray(params.notify_on_move) || isObject(params.notify_on_move)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_move must be of type Boolean, received ${getType(params.notify_on_move)}`)
    }

    if (isArray(params.notify_on_upload) || isObject(params.notify_on_upload)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_on_upload must be of type Boolean, received ${getType(params.notify_on_upload)}`)
    }

    if (isArray(params.notify_user_actions) || isObject(params.notify_user_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_user_actions must be of type Boolean, received ${getType(params.notify_user_actions)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (params.send_interval !== undefined && params.send_interval !== null && !isString(params.send_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_interval must be of type String, received ${getType(params.send_interval)}`)
    }

    if (params.subject !== undefined && params.subject !== null && !isString(params.subject)) {
      throw new errors.InvalidParameterError(`Bad parameter: subject must be of type String, received ${getType(params.subject)}`)
    }

    if (params.message !== undefined && params.message !== null && !isString(params.message)) {
      throw new errors.InvalidParameterError(`Bad parameter: message must be of type String, received ${getType(params.message)}`)
    }

    if (params.triggering_filenames !== undefined && params.triggering_filenames !== null && !isArray(params.triggering_filenames)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_filenames must be of type Array, received ${getType(params.triggering_filenames)}`)
    }

    if (params.triggering_group_ids !== undefined && params.triggering_group_ids !== null && !isArray(params.triggering_group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_group_ids must be of type Array, received ${getType(params.triggering_group_ids)}`)
    }

    if (params.triggering_user_ids !== undefined && params.triggering_user_ids !== null && !isArray(params.triggering_user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: triggering_user_ids must be of type Array, received ${getType(params.triggering_user_ids)}`)
    }

    if (isArray(params.trigger_by_share_recipients) || isObject(params.trigger_by_share_recipients)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_by_share_recipients must be of type Boolean, received ${getType(params.trigger_by_share_recipients)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.username !== undefined && params.username !== null && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    const response = await Api.sendRequest('/notifications', 'POST', params, options)

    return new Notification(response?.data, retainedOptions(options))
  }
}

export default Notification

module.exports = Notification
module.exports.default = Notification
