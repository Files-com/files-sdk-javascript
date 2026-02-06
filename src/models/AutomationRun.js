/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AutomationRun
 */
class AutomationRun {
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

  // int64 # ID.
  getId = () => this.attributes.id

  // int64 # ID of the associated Automation.
  getAutomationId = () => this.attributes.automation_id

  // int64 # Workspace ID.
  getWorkspaceId = () => this.attributes.workspace_id

  // date-time # Automation run completion/failure date/time.
  getCompletedAt = () => this.attributes.completed_at

  // date-time # Automation run start date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # If set, this automation will be retried at this date/time due to `failure` or `partial_failure`.
  getRetryAt = () => this.attributes.retry_at

  // date-time # If set, this Automation run was retried due to `failure` or `partial_failure`.
  getRetriedAt = () => this.attributes.retried_at

  // int64 # ID of the run that is or will be retrying this run.
  getRetriedInRunId = () => this.attributes.retried_in_run_id

  // int64 # ID of the original run that this run is retrying.
  getRetryOfRunId = () => this.attributes.retry_of_run_id

  // double # Automation run runtime.
  getRuntime = () => this.attributes.runtime

  // string # The success status of the AutomationRun. One of `running`, `success`, `partial_failure`, or `failure`.
  getStatus = () => this.attributes.status

  // int64 # Count of successful operations.
  getSuccessfulOperations = () => this.attributes.successful_operations

  // int64 # Count of failed operations.
  getFailedOperations = () => this.attributes.failed_operations

  // string # Link to status messages log file.
  getStatusMessagesUrl = () => this.attributes.status_messages_url

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation_id`, `created_at` or `status`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status`, `workspace_id` or `automation_id`. Valid field combinations are `[ workspace_id, status ]`, `[ automation_id, status ]`, `[ workspace_id, automation_id ]` or `[ workspace_id, automation_id, status ]`.
  //   automation_id (required) - int64 - ID of the associated Automation.
  static list = async (params = {}, options = {}) => {
    if (!params.automation_id) {
      throw new errors.MissingParameterError('Parameter missing: automation_id')
    }

    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.automation_id && !isInt(params.automation_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: automation_id must be of type Int, received ${getType(params.automation_id)}`)
    }

    const response = await Api.sendRequest('/automation_runs', 'GET', params, options)

    return response?.data?.map(obj => new AutomationRun(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    AutomationRun.list(params, options)

  // Parameters:
  //   id (required) - int64 - Automation Run ID.
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

    const response = await Api.sendRequest(`/automation_runs/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AutomationRun(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    AutomationRun.find(id, params, options)
}

export default AutomationRun

module.exports = AutomationRun
module.exports.default = AutomationRun
