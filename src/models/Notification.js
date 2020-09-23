import Api from '../Api'
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

  // boolean # Trigger notification on notification user actions?
  getNotifyUserActions = () => this.attributes.notify_user_actions

  setNotifyUserActions = value => {
    this.attributes.notify_user_actions = value
  }

  // boolean # Triggers notification when moving or copying files to this path
  getNotifyOnCopy = () => this.attributes.notify_on_copy

  setNotifyOnCopy = value => {
    this.attributes.notify_on_copy = value
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
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['send_interval'] && !isString(params['send_interval'])) {
      throw new Error(`Bad parameter: send_interval must be of type String, received ${getType(send_interval)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/notifications/${params['id']}`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/notifications/${params['id']}`, 'DELETE', params, this.options)
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
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `site_id`, `path`, `user_id` or `group_id`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `user_id`, `group_id` or `path`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `user_id`, `group_id` or `path`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `user_id`, `group_id` or `path`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `user_id`, `group_id` or `path`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `user_id`, `group_id` or `path`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `user_id`, `group_id` or `path`.
  //   group_id - int64 - DEPRECATED: Show notifications for this Group ID. Use `filter[group_id]` instead.
  //   path - string - Show notifications for this Path.
  //   include_ancestors - boolean - If `include_ancestors` is `true` and `path` is specified, include notifications for any parent paths. Ignored if `path` is not specified.
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new Error(`Bad parameter: group_id must be of type Int, received ${getType(group_id)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
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
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/notifications/${params['id']}`, 'GET', params, options)

    return new Notification(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Notification.find(id, params, options)

  // Parameters:
  //   user_id - int64 - The id of the user to notify. Provide `user_id`, `username` or `group_id`.
  //   notify_on_copy - boolean - If `true`, copying or moving resources into this path will trigger a notification, in addition to just uploads.
  //   notify_user_actions - boolean - If `true` actions initiated by the user will still result in a notification
  //   recursive - boolean - If `true`, enable notifications for each subfolder in this path
  //   send_interval - string - The time interval that notifications are aggregated by.  Can be `five_minutes`, `fifteen_minutes`, `hourly`, or `daily`.
  //   group_id - int64 - The ID of the group to notify.  Provide `user_id`, `username` or `group_id`.
  //   path - string - Path
  //   username - string - The username of the user to notify.  Provide `user_id`, `username` or `group_id`.
  static create = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['send_interval'] && !isString(params['send_interval'])) {
      throw new Error(`Bad parameter: send_interval must be of type String, received ${getType(send_interval)}`)
    }

    if (params['group_id'] && !isInt(params['group_id'])) {
      throw new Error(`Bad parameter: group_id must be of type Int, received ${getType(group_id)}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['username'] && !isString(params['username'])) {
      throw new Error(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }

    const response = await Api.sendRequest(`/notifications`, 'POST', params, options)

    return new Notification(response?.data, options)
  }
}

export default Notification
