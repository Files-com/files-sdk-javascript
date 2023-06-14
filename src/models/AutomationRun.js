import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

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

  // date-time # Automation run completion/failure date/time.
  getCompletedAt = () => this.attributes.completed_at

  // date-time # Automation run start date/time.
  getCreatedAt = () => this.attributes.created_at

  // string # The success status of the AutomationRun. One of `running`, `success`, `partial_failure`, or `failure`.
  getStatus = () => this.attributes.status

  // string # Link to status messages log file.
  getStatusMessagesUrl = () => this.attributes.status_messages_url


  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[automation_id]=desc`). Valid fields are `automation_id`, `created_at` or `status`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status` and `automation_id`. Valid field combinations are `[ automation_id, status ]`.
  //   automation_id (required) - int64 - ID of the associated Automation.
  static list = async (params = {}, options = {}) => {
    if (!params['automation_id']) {
      throw new errors.MissingParameterError('Parameter missing: automation_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['automation_id'] && !isInt(params['automation_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: automation_id must be of type Int, received ${getType(params['automation_id'])}`)
    }

    const response = await Api.sendRequest(`/automation_runs`, 'GET', params, options)

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

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/automation_runs/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new AutomationRun(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    AutomationRun.find(id, params, options)
}

export default AutomationRun
