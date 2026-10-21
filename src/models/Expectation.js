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
 * Class Expectation
 */
class Expectation {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Expectation ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # Expectation name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Expectation description.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // string # Path scope for the expectation. Supports workspace-relative presentation. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // string # Source glob used to select candidate files.
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
    exposeAttributes(this, ['source'])
  }

  // string # Optional source exclusion glob.
  getExcludePattern = () => this.attributes.exclude_pattern

  setExcludePattern = value => {
    this.attributes.exclude_pattern = value
    exposeAttributes(this, ['exclude_pattern'])
  }

  // boolean # If true, the expectation is disabled.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
    exposeAttributes(this, ['disabled'])
  }

  // int64 # Criteria schema version for this expectation.
  getExpectationsVersion = () => this.attributes.expectations_version

  setExpectationsVersion = value => {
    this.attributes.expectations_version = value
    exposeAttributes(this, ['expectations_version'])
  }

  // string # How this expectation opens windows.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
    exposeAttributes(this, ['trigger'])
  }

  // string # If trigger is `daily`, this specifies how often to run the expectation.
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
    exposeAttributes(this, ['interval'])
  }

  // int64 # If trigger is `daily`, this selects the day number inside the chosen interval.
  getRecurringDay = () => this.attributes.recurring_day

  setRecurringDay = value => {
    this.attributes.recurring_day = value
    exposeAttributes(this, ['recurring_day'])
  }

  // array(int64) # If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  getRecurringDays = () => this.attributes.recurring_days

  setRecurringDays = value => {
    this.attributes.recurring_days = value
    exposeAttributes(this, ['recurring_days'])
  }

  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields.
  getScheduleId = () => this.attributes.schedule_id

  setScheduleId = value => {
    this.attributes.schedule_id = value
    exposeAttributes(this, ['schedule_id'])
  }

  // array(int64) # If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
    exposeAttributes(this, ['schedule_days_of_week'])
  }

  // array(string) # Times of day in HH:MM format for the Expectation schedule.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
    exposeAttributes(this, ['schedule_times_of_day'])
  }

  // string # Time zone used by the Expectation schedule.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
    exposeAttributes(this, ['schedule_time_zone'])
  }

  // string # Optional holiday region used by the Expectation schedule.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
    exposeAttributes(this, ['holiday_region'])
  }

  // int64 # How many seconds before the due boundary the window starts.
  getLookbackInterval = () => this.attributes.lookback_interval

  setLookbackInterval = value => {
    this.attributes.lookback_interval = value
    exposeAttributes(this, ['lookback_interval'])
  }

  // int64 # How many seconds a schedule-driven window may remain eligible to close as late.
  getLateAcceptanceInterval = () => this.attributes.late_acceptance_interval

  setLateAcceptanceInterval = value => {
    this.attributes.late_acceptance_interval = value
    exposeAttributes(this, ['late_acceptance_interval'])
  }

  // int64 # How many quiet seconds are required before final closure.
  getInactivityInterval = () => this.attributes.inactivity_interval

  setInactivityInterval = value => {
    this.attributes.inactivity_interval = value
    exposeAttributes(this, ['inactivity_interval'])
  }

  // int64 # Hard-stop duration in seconds for unscheduled expectations.
  getMaxOpenInterval = () => this.attributes.max_open_interval

  setMaxOpenInterval = value => {
    this.attributes.max_open_interval = value
    exposeAttributes(this, ['max_open_interval'])
  }

  // object # Versioned success criteria definition for the expectation. Criteria v2 supports optional FTS content validation.
  getCriteria = () => this.attributes.criteria

  setCriteria = value => {
    this.attributes.criteria = value
    exposeAttributes(this, ['criteria'])
  }

  // date-time # Last time this expectation was evaluated.
  getLastEvaluatedAt = () => this.attributes.last_evaluated_at

  setLastEvaluatedAt = value => {
    this.attributes.last_evaluated_at = value
    exposeAttributes(this, ['last_evaluated_at'])
  }

  // date-time # Last time this expectation closed successfully.
  getLastSuccessAt = () => this.attributes.last_success_at

  setLastSuccessAt = value => {
    this.attributes.last_success_at = value
    exposeAttributes(this, ['last_success_at'])
  }

  // date-time # Last time this expectation closed with a failure result.
  getLastFailureAt = () => this.attributes.last_failure_at

  setLastFailureAt = value => {
    this.attributes.last_failure_at = value
    exposeAttributes(this, ['last_failure_at'])
  }

  // string # Most recent terminal result for this expectation.
  getLastResult = () => this.attributes.last_result

  setLastResult = value => {
    this.attributes.last_result = value
    exposeAttributes(this, ['last_result'])
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Manually open an Expectation window
  triggerEvaluation = async (params = {}) => {
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

    const response = await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}/trigger_evaluation`, 'POST', params, this.options)

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
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the Expectation schedule.
  //   schedule_time_zone - string - Time zone used by the Expectation schedule.
  //   holiday_region - string - Optional holiday region used by the Expectation schedule.
  //   lookback_interval - int64 - How many seconds before the due boundary the window starts.
  //   late_acceptance_interval - int64 - How many seconds a schedule-driven window may remain eligible to close as late.
  //   inactivity_interval - int64 - How many quiet seconds are required before final closure.
  //   max_open_interval - int64 - Hard-stop duration in seconds for unscheduled expectations.
  //   criteria - object - Versioned success criteria definition for the expectation, including optional Files Transform Script content validation in criteria v2.
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

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.source !== undefined && params.source !== null && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.exclude_pattern !== undefined && params.exclude_pattern !== null && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.recurring_day !== undefined && params.recurring_day !== null && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.recurring_days !== undefined && params.recurring_days !== null && !isArray(params.recurring_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_days must be of type Array, received ${getType(params.recurring_days)}`)
    }

    if (params.schedule_id !== undefined && params.schedule_id !== null && !isInt(params.schedule_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_id must be of type Int, received ${getType(params.schedule_id)}`)
    }

    if (params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.holiday_region !== undefined && params.holiday_region !== null && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.lookback_interval !== undefined && params.lookback_interval !== null && !isInt(params.lookback_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: lookback_interval must be of type Int, received ${getType(params.lookback_interval)}`)
    }

    if (params.late_acceptance_interval !== undefined && params.late_acceptance_interval !== null && !isInt(params.late_acceptance_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: late_acceptance_interval must be of type Int, received ${getType(params.late_acceptance_interval)}`)
    }

    if (params.inactivity_interval !== undefined && params.inactivity_interval !== null && !isInt(params.inactivity_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_interval must be of type Int, received ${getType(params.inactivity_interval)}`)
    }

    if (params.max_open_interval !== undefined && params.max_open_interval !== null && !isInt(params.max_open_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_open_interval must be of type Int, received ${getType(params.max_open_interval)}`)
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

    const response = await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Expectation.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `disabled`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled` and `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/expectations', 'GET', params, options)

    return response?.data?.map(obj => new Expectation(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Expectation.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Expectation.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Expectation ID.
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

    const response = await Api.sendRequest(`/expectations/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Expectation(response?.data, retainedOptions(options))
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
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the Expectation's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the Expectation schedule.
  //   schedule_time_zone - string - Time zone used by the Expectation schedule.
  //   holiday_region - string - Optional holiday region used by the Expectation schedule.
  //   lookback_interval - int64 - How many seconds before the due boundary the window starts.
  //   late_acceptance_interval - int64 - How many seconds a schedule-driven window may remain eligible to close as late.
  //   inactivity_interval - int64 - How many quiet seconds are required before final closure.
  //   max_open_interval - int64 - Hard-stop duration in seconds for unscheduled expectations.
  //   criteria - object - Versioned success criteria definition for the expectation, including optional Files Transform Script content validation in criteria v2.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.source !== undefined && params.source !== null && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.exclude_pattern !== undefined && params.exclude_pattern !== null && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.recurring_day !== undefined && params.recurring_day !== null && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.recurring_days !== undefined && params.recurring_days !== null && !isArray(params.recurring_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_days must be of type Array, received ${getType(params.recurring_days)}`)
    }

    if (params.schedule_id !== undefined && params.schedule_id !== null && !isInt(params.schedule_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_id must be of type Int, received ${getType(params.schedule_id)}`)
    }

    if (params.schedule_days_of_week !== undefined && params.schedule_days_of_week !== null && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.holiday_region !== undefined && params.holiday_region !== null && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.lookback_interval !== undefined && params.lookback_interval !== null && !isInt(params.lookback_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: lookback_interval must be of type Int, received ${getType(params.lookback_interval)}`)
    }

    if (params.late_acceptance_interval !== undefined && params.late_acceptance_interval !== null && !isInt(params.late_acceptance_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: late_acceptance_interval must be of type Int, received ${getType(params.late_acceptance_interval)}`)
    }

    if (params.inactivity_interval !== undefined && params.inactivity_interval !== null && !isInt(params.inactivity_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_interval must be of type Int, received ${getType(params.inactivity_interval)}`)
    }

    if (params.max_open_interval !== undefined && params.max_open_interval !== null && !isInt(params.max_open_interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_open_interval must be of type Int, received ${getType(params.max_open_interval)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/expectations', 'POST', params, options)

    return new Expectation(response?.data, retainedOptions(options))
  }
}

export default Expectation

module.exports = Expectation
module.exports.default = Expectation
