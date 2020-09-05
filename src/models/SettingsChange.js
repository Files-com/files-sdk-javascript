import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class SettingsChange
 */
class SettingsChange {
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
  // object # Specifics on what changed.
  getChangeDetails = () => this.attributes.change_details

  // date-time # The time this change was made
  getCreatedAt = () => this.attributes.created_at

  // int64 # The user id responsible for this change
  getUserId = () => this.attributes.user_id


  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `site_id`, `api_key_id`, `created_at` or `user_id`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `api_key_id` and `user_id`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `api_key_id` and `user_id`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `api_key_id` and `user_id`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `api_key_id` and `user_id`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `api_key_id` and `user_id`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `api_key_id` and `user_id`.
  static list = async (params = {}, options = {}) => {
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

    const response = await Api.sendRequest(`/settings_changes`, 'GET', params, options)

    return response?.data?.map(obj => new SettingsChange(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SettingsChange.list(params, options)
}

export default SettingsChange
