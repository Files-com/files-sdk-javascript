import Api from '../Api'
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
  // int64 # ID of the associated Automation.
  getAutomationId = () => this.attributes.automation_id

  // string # The success status of the AutomationRun. One of `running`, `success`, `partial_failure`, or `failure`.
  getStatus = () => this.attributes.status

  // string # Link to status messages log file.
  getStatusMessagesUrl = () => this.attributes.status_messages_url


  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   automation_id (required) - int64 - ID of the associated Automation.
  static list = async (params = {}, options = {}) => {
    if (!params['automation_id']) {
      throw new Error('Parameter missing: automation_id')
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

    if (params['automation_id'] && !isInt(params['automation_id'])) {
      throw new Error(`Bad parameter: automation_id must be of type Int, received ${getType(automation_id)}`)
    }

    const response = await Api.sendRequest(`/automation_runs`, 'GET', params, options)

    return response?.data?.map(obj => new AutomationRun(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    AutomationRun.list(params, options)
}

export default AutomationRun
