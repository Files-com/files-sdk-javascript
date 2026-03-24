/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Expectation
 */
class Expectation {
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

  // int64 # Expectation ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # Expectation name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Expectation description.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // string # Path scope for the expectation. Supports workspace-relative presentation. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # Source glob used to select candidate files.
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
  }

  // string # Optional source exclusion glob.
  getExcludePattern = () => this.attributes.exclude_pattern

  setExcludePattern = value => {
    this.attributes.exclude_pattern = value
  }

  // boolean # If true, the expectation is disabled.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // int64 # Criteria schema version for this expectation.
  getExpectationsVersion = () => this.attributes.expectations_version

  setExpectationsVersion = value => {
    this.attributes.expectations_version = value
  }

  // string # How this expectation opens windows.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
  }

  // string # If trigger is `daily`, this specifies how often to run the expectation.
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
  }

  // int64 # If trigger is `daily`, this selects the day number inside the chosen interval.
  getRecurringDay = () => this.attributes.recurring_day

  setRecurringDay = value => {
    this.attributes.recurring_day = value
  }

  // array(int64) # If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
  }

  // array(string) # Times of day in HH:MM format for schedule-driven expectations.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
  }

  // string # Time zone used by the expectation schedule.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
  }

  // string # Optional holiday region used by schedule-driven expectations.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
  }

  // int64 # How many seconds before the due boundary the window starts.
  getLookbackInterval = () => this.attributes.lookback_interval

  setLookbackInterval = value => {
    this.attributes.lookback_interval = value
  }

  // int64 # How many seconds a schedule-driven window may remain eligible to close as late.
  getLateAcceptanceInterval = () => this.attributes.late_acceptance_interval

  setLateAcceptanceInterval = value => {
    this.attributes.late_acceptance_interval = value
  }

  // int64 # How many quiet seconds are required before final closure.
  getInactivityInterval = () => this.attributes.inactivity_interval

  setInactivityInterval = value => {
    this.attributes.inactivity_interval = value
  }

  // int64 # Hard-stop duration in seconds for unscheduled expectations.
  getMaxOpenInterval = () => this.attributes.max_open_interval

  setMaxOpenInterval = value => {
    this.attributes.max_open_interval = value
  }

  // object # Structured criteria v1 definition for the expectation.
  getCriteria = () => this.attributes.criteria

  setCriteria = value => {
    this.attributes.criteria = value
  }

  // date-time # Last time this expectation was evaluated.
  getLastEvaluatedAt = () => this.attributes.last_evaluated_at

  setLastEvaluatedAt = value => {
    this.attributes.last_evaluated_at = value
  }

  // date-time # Last time this expectation closed successfully.
  getLastSuccessAt = () => this.attributes.last_success_at

  setLastSuccessAt = value => {
    this.attributes.last_success_at = value
  }

  // date-time # Last time this expectation closed with a failure result.
  getLastFailureAt = () => this.attributes.last_failure_at

  setLastFailureAt = value => {
    this.attributes.last_failure_at = value
  }

  // string # Most recent terminal result for this expectation.
  getLastResult = () => this.attributes.last_result

  setLastResult = value => {
    this.attributes.last_result = value
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Manually open an Expectation window
  trigger = async (params = {}) => {
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

    const response = await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}/trigger`, 'POST', params, this.options)

    const ExpectationEvaluation = require('./ExpectationEvaluation.js').default
    return new ExpectationEvaluation(response?.data, this.options)
  }

  // Parameters:
  //   name - string - Expectation name.
  //   description - string - Expectation description.
  //   path - string - Path scope for the expectation. Supports workspace-relative presentation.
  //   source - string - Source glob used to select candidate files.
  //   exclude_pattern - string - Optional source exclusion glob.
  //   disabled - boolean - If true, the expectation is disabled.
  //   trigger - string - How this expectation opens windows.
  //   interval - string - If trigger is `daily`, this specifies how often to run the expectation.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for schedule-driven expectations.
  //   schedule_time_zone - string - Time zone used by the expectation schedule.
  //   holiday_region - string - Optional holiday region used by schedule-driven expectations.
  //   lookback_interval - int64 - How many seconds before the due boundary the window starts.
  //   late_acceptance_interval - int64 - How many seconds a schedule-driven window may remain eligible to close as late.
  //   inactivity_interval - int64 - How many quiet seconds are required before final closure.
  //   max_open_interval - int64 - Hard-stop duration in seconds for unscheduled expectations.
  //   criteria - object - Structured criteria v1 definition for the expectation.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
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

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.source && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.exclude_pattern && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.schedule_days_of_week && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_times_of_day && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.schedule_time_zone && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.holiday_region && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.lookback_interval && !isInt(params.lookback_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: lookback_interval must be of type Int, received ${getType(params.lookback_interval)}`)
    }

    if (params.late_acceptance_interval && !isInt(params.late_acceptance_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: late_acceptance_interval must be of type Int, received ${getType(params.late_acceptance_interval)}`)
    }

    if (params.inactivity_interval && !isInt(params.inactivity_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_interval must be of type Int, received ${getType(params.inactivity_interval)}`)
    }

    if (params.max_open_interval && !isInt(params.max_open_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_open_interval must be of type Int, received ${getType(params.max_open_interval)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new Expectation(response?.data, this.options)
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

    await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await Expectation.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `disabled`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled` and `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/expectations', 'GET', params, options)

    return response?.data?.map(obj => new Expectation(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Expectation.list(params, options)

  // Parameters:
  //   id (required) - int64 - Expectation ID.
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

    const response = await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Expectation(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Expectation.find(id, params, options)

  // Parameters:
  //   name - string - Expectation name.
  //   description - string - Expectation description.
  //   path - string - Path scope for the expectation. Supports workspace-relative presentation.
  //   source - string - Source glob used to select candidate files.
  //   exclude_pattern - string - Optional source exclusion glob.
  //   disabled - boolean - If true, the expectation is disabled.
  //   trigger - string - How this expectation opens windows.
  //   interval - string - If trigger is `daily`, this specifies how often to run the expectation.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for schedule-driven expectations.
  //   schedule_time_zone - string - Time zone used by the expectation schedule.
  //   holiday_region - string - Optional holiday region used by schedule-driven expectations.
  //   lookback_interval - int64 - How many seconds before the due boundary the window starts.
  //   late_acceptance_interval - int64 - How many seconds a schedule-driven window may remain eligible to close as late.
  //   inactivity_interval - int64 - How many quiet seconds are required before final closure.
  //   max_open_interval - int64 - Hard-stop duration in seconds for unscheduled expectations.
  //   criteria - object - Structured criteria v1 definition for the expectation.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.source && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.exclude_pattern && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.schedule_days_of_week && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_times_of_day && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.schedule_time_zone && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.holiday_region && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.lookback_interval && !isInt(params.lookback_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: lookback_interval must be of type Int, received ${getType(params.lookback_interval)}`)
    }

    if (params.late_acceptance_interval && !isInt(params.late_acceptance_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: late_acceptance_interval must be of type Int, received ${getType(params.late_acceptance_interval)}`)
    }

    if (params.inactivity_interval && !isInt(params.inactivity_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_interval must be of type Int, received ${getType(params.inactivity_interval)}`)
    }

    if (params.max_open_interval && !isInt(params.max_open_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_open_interval must be of type Int, received ${getType(params.max_open_interval)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/expectations', 'POST', params, options)

    return new Expectation(response?.data, options)
  }
}

export default Expectation

module.exports = Expectation
module.exports.default = Expectation
