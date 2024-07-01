/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // array(string) # Markdown-formatted change messages.
  getChanges = () => this.attributes.changes

  // date-time # The time this change was made
  getCreatedAt = () => this.attributes.created_at

  // int64 # The user id responsible for this change
  getUserId = () => this.attributes.user_id

  // int64 # The api key id responsible for this change
  getApiKeyId = () => this.attributes.api_key_id

  // boolean # true if this change was performed by Files.com support.
  getUserIsFilesSupport = () => this.attributes.user_is_files_support

  // string # The username of the user responsible for this change
  getUsername = () => this.attributes.username

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string
  //   page - int64
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[api_key_id]=desc`). Valid fields are `api_key_id`, `created_at` or `user_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `api_key_id` and `user_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.action && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.page && !isInt(params.page)) {
      throw new errors.InvalidParameterError(`Bad parameter: page must be of type Int, received ${getType(params.page)}`)
    }

    const response = await Api.sendRequest('/settings_changes', 'GET', params, options)

    return response?.data?.map(obj => new SettingsChange(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SettingsChange.list(params, options)
}

export default SettingsChange

module.exports = SettingsChange
module.exports.default = SettingsChange
