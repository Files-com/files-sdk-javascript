/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AutomationLog
 */
class AutomationLog {
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

  // date-time # Start Time of Action
  getTimestamp = () => this.attributes.timestamp

  // int64 # Automation ID
  getAutomationId = () => this.attributes.automation_id

  // int64 # Automation Run ID
  getAutomationRunId = () => this.attributes.automation_run_id

  // string # Destination path, for moves and copies
  getDestPath = () => this.attributes.dest_path

  // string # Error type, if applicable
  getErrorType = () => this.attributes.error_type

  // string # Message
  getMessage = () => this.attributes.message

  // string # Operation type
  getOperation = () => this.attributes.operation

  // string # File path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # Status
  getStatus = () => this.attributes.status

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string
  //   page - int64
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `start_date`, `end_date`, `automation_id`, `automation_run_id`, `operation`, `path` or `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, automation_id ]`, `[ start_date, automation_run_id ]`, `[ start_date, operation ]`, `[ start_date, path ]`, `[ start_date, status ]`, `[ end_date, automation_id ]`, `[ end_date, automation_run_id ]`, `[ end_date, operation ]`, `[ end_date, path ]`, `[ end_date, status ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ operation, path ]`, `[ operation, status ]`, `[ path, status ]`, `[ start_date, end_date, automation_id ]`, `[ start_date, end_date, automation_run_id ]`, `[ start_date, end_date, operation ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, status ]`, `[ start_date, automation_id, automation_run_id ]`, `[ start_date, automation_id, operation ]`, `[ start_date, automation_id, path ]`, `[ start_date, automation_id, status ]`, `[ start_date, automation_run_id, operation ]`, `[ start_date, automation_run_id, path ]`, `[ start_date, automation_run_id, status ]`, `[ start_date, operation, path ]`, `[ start_date, operation, status ]`, `[ start_date, path, status ]`, `[ end_date, automation_id, automation_run_id ]`, `[ end_date, automation_id, operation ]`, `[ end_date, automation_id, path ]`, `[ end_date, automation_id, status ]`, `[ end_date, automation_run_id, operation ]`, `[ end_date, automation_run_id, path ]`, `[ end_date, automation_run_id, status ]`, `[ end_date, operation, path ]`, `[ end_date, operation, status ]`, `[ end_date, path, status ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, path, status ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, path, status ]`, `[ operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id ]`, `[ start_date, end_date, automation_id, operation ]`, `[ start_date, end_date, automation_id, path ]`, `[ start_date, end_date, automation_id, status ]`, `[ start_date, end_date, automation_run_id, operation ]`, `[ start_date, end_date, automation_run_id, path ]`, `[ start_date, end_date, automation_run_id, status ]`, `[ start_date, end_date, operation, path ]`, `[ start_date, end_date, operation, status ]`, `[ start_date, end_date, path, status ]`, `[ start_date, automation_id, automation_run_id, operation ]`, `[ start_date, automation_id, automation_run_id, path ]`, `[ start_date, automation_id, automation_run_id, status ]`, `[ start_date, automation_id, operation, path ]`, `[ start_date, automation_id, operation, status ]`, `[ start_date, automation_id, path, status ]`, `[ start_date, automation_run_id, operation, path ]`, `[ start_date, automation_run_id, operation, status ]`, `[ start_date, automation_run_id, path, status ]`, `[ start_date, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation ]`, `[ end_date, automation_id, automation_run_id, path ]`, `[ end_date, automation_id, automation_run_id, status ]`, `[ end_date, automation_id, operation, path ]`, `[ end_date, automation_id, operation, status ]`, `[ end_date, automation_id, path, status ]`, `[ end_date, automation_run_id, operation, path ]`, `[ end_date, automation_run_id, operation, status ]`, `[ end_date, automation_run_id, path, status ]`, `[ end_date, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, operation, path, status ]`, `[ automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation ]`, `[ start_date, end_date, automation_id, automation_run_id, path ]`, `[ start_date, end_date, automation_id, automation_run_id, status ]`, `[ start_date, end_date, automation_id, operation, path ]`, `[ start_date, end_date, automation_id, operation, status ]`, `[ start_date, end_date, automation_id, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_run_id, path, status ]`, `[ start_date, end_date, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, automation_id, automation_run_id, path, status ]`, `[ start_date, automation_id, operation, path, status ]`, `[ start_date, automation_run_id, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation, path ]`, `[ end_date, automation_id, automation_run_id, operation, status ]`, `[ end_date, automation_id, automation_run_id, path, status ]`, `[ end_date, automation_id, operation, path, status ]`, `[ end_date, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_id, automation_run_id, path, status ]`, `[ start_date, end_date, automation_id, operation, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path, status ]` or `[ end_date, automation_id, automation_run_id, operation, path, status ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `operation`, `path` or `status`. Valid field combinations are `[ start_date ]`, `[ end_date ]`, `[ automation_id ]`, `[ automation_run_id ]`, `[ operation ]`, `[ path ]`, `[ status ]`, `[ start_date, end_date ]`, `[ start_date, automation_id ]`, `[ start_date, automation_run_id ]`, `[ start_date, operation ]`, `[ start_date, path ]`, `[ start_date, status ]`, `[ end_date, automation_id ]`, `[ end_date, automation_run_id ]`, `[ end_date, operation ]`, `[ end_date, path ]`, `[ end_date, status ]`, `[ automation_id, automation_run_id ]`, `[ automation_id, operation ]`, `[ automation_id, path ]`, `[ automation_id, status ]`, `[ automation_run_id, operation ]`, `[ automation_run_id, path ]`, `[ automation_run_id, status ]`, `[ operation, path ]`, `[ operation, status ]`, `[ path, status ]`, `[ start_date, end_date, automation_id ]`, `[ start_date, end_date, automation_run_id ]`, `[ start_date, end_date, operation ]`, `[ start_date, end_date, path ]`, `[ start_date, end_date, status ]`, `[ start_date, automation_id, automation_run_id ]`, `[ start_date, automation_id, operation ]`, `[ start_date, automation_id, path ]`, `[ start_date, automation_id, status ]`, `[ start_date, automation_run_id, operation ]`, `[ start_date, automation_run_id, path ]`, `[ start_date, automation_run_id, status ]`, `[ start_date, operation, path ]`, `[ start_date, operation, status ]`, `[ start_date, path, status ]`, `[ end_date, automation_id, automation_run_id ]`, `[ end_date, automation_id, operation ]`, `[ end_date, automation_id, path ]`, `[ end_date, automation_id, status ]`, `[ end_date, automation_run_id, operation ]`, `[ end_date, automation_run_id, path ]`, `[ end_date, automation_run_id, status ]`, `[ end_date, operation, path ]`, `[ end_date, operation, status ]`, `[ end_date, path, status ]`, `[ automation_id, automation_run_id, operation ]`, `[ automation_id, automation_run_id, path ]`, `[ automation_id, automation_run_id, status ]`, `[ automation_id, operation, path ]`, `[ automation_id, operation, status ]`, `[ automation_id, path, status ]`, `[ automation_run_id, operation, path ]`, `[ automation_run_id, operation, status ]`, `[ automation_run_id, path, status ]`, `[ operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id ]`, `[ start_date, end_date, automation_id, operation ]`, `[ start_date, end_date, automation_id, path ]`, `[ start_date, end_date, automation_id, status ]`, `[ start_date, end_date, automation_run_id, operation ]`, `[ start_date, end_date, automation_run_id, path ]`, `[ start_date, end_date, automation_run_id, status ]`, `[ start_date, end_date, operation, path ]`, `[ start_date, end_date, operation, status ]`, `[ start_date, end_date, path, status ]`, `[ start_date, automation_id, automation_run_id, operation ]`, `[ start_date, automation_id, automation_run_id, path ]`, `[ start_date, automation_id, automation_run_id, status ]`, `[ start_date, automation_id, operation, path ]`, `[ start_date, automation_id, operation, status ]`, `[ start_date, automation_id, path, status ]`, `[ start_date, automation_run_id, operation, path ]`, `[ start_date, automation_run_id, operation, status ]`, `[ start_date, automation_run_id, path, status ]`, `[ start_date, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation ]`, `[ end_date, automation_id, automation_run_id, path ]`, `[ end_date, automation_id, automation_run_id, status ]`, `[ end_date, automation_id, operation, path ]`, `[ end_date, automation_id, operation, status ]`, `[ end_date, automation_id, path, status ]`, `[ end_date, automation_run_id, operation, path ]`, `[ end_date, automation_run_id, operation, status ]`, `[ end_date, automation_run_id, path, status ]`, `[ end_date, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path ]`, `[ automation_id, automation_run_id, operation, status ]`, `[ automation_id, automation_run_id, path, status ]`, `[ automation_id, operation, path, status ]`, `[ automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation ]`, `[ start_date, end_date, automation_id, automation_run_id, path ]`, `[ start_date, end_date, automation_id, automation_run_id, status ]`, `[ start_date, end_date, automation_id, operation, path ]`, `[ start_date, end_date, automation_id, operation, status ]`, `[ start_date, end_date, automation_id, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_run_id, path, status ]`, `[ start_date, end_date, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, automation_id, automation_run_id, path, status ]`, `[ start_date, automation_id, operation, path, status ]`, `[ start_date, automation_run_id, operation, path, status ]`, `[ end_date, automation_id, automation_run_id, operation, path ]`, `[ end_date, automation_id, automation_run_id, operation, status ]`, `[ end_date, automation_id, automation_run_id, path, status ]`, `[ end_date, automation_id, operation, path, status ]`, `[ end_date, automation_run_id, operation, path, status ]`, `[ automation_id, automation_run_id, operation, path, status ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, path ]`, `[ start_date, end_date, automation_id, automation_run_id, operation, status ]`, `[ start_date, end_date, automation_id, automation_run_id, path, status ]`, `[ start_date, end_date, automation_id, operation, path, status ]`, `[ start_date, end_date, automation_run_id, operation, path, status ]`, `[ start_date, automation_id, automation_run_id, operation, path, status ]` or `[ end_date, automation_id, automation_run_id, operation, path, status ]`.
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

    const response = await Api.sendRequest('/automation_logs', 'GET', params, options)

    return response?.data?.map(obj => new AutomationLog(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    AutomationLog.list(params, options)
}

export default AutomationLog

module.exports = AutomationLog
module.exports.default = AutomationLog
