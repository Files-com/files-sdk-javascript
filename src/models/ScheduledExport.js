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
 * Class ScheduledExport
 */
class ScheduledExport {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Scheduled Export ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Name for this scheduled export.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
  getExportType = () => this.attributes.export_type

  setExportType = value => {
    this.attributes.export_type = value
    exposeAttributes(this, ['export_type'])
  }

  // string # Human-readable report name.
  getReportName = () => this.attributes.report_name

  setReportName = value => {
    this.attributes.report_name = value
    exposeAttributes(this, ['report_name'])
  }

  // object # Options for the report selected by export_type.
  getExportOptions = () => this.attributes.export_options

  setExportOptions = value => {
    this.attributes.export_options = value
    exposeAttributes(this, ['export_options'])
  }

  // int64 # Site Admin user who receives the completed export e-mail.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // boolean # If true, this scheduled export will not run.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
    exposeAttributes(this, ['disabled'])
  }

  // string # Schedule trigger type: `daily` or `custom_schedule`.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
    exposeAttributes(this, ['trigger'])
  }

  // string # If trigger is `daily`, this specifies how often to run the scheduled export.
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

  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields.
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

  // array(string) # Times of day in HH:MM format for the scheduled export schedule.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
    exposeAttributes(this, ['schedule_times_of_day'])
  }

  // string # Time zone used by the scheduled export schedule.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
    exposeAttributes(this, ['schedule_time_zone'])
  }

  // string # Optional holiday region used by the scheduled export schedule.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
    exposeAttributes(this, ['holiday_region'])
  }

  // string # Human-readable schedule description.
  getHumanReadableSchedule = () => this.attributes.human_readable_schedule

  setHumanReadableSchedule = value => {
    this.attributes.human_readable_schedule = value
    exposeAttributes(this, ['human_readable_schedule'])
  }

  // date-time # Most recent scheduled attempt time, including attempts that failed validation.
  getLastRunAt = () => this.attributes.last_run_at

  setLastRunAt = value => {
    this.attributes.last_run_at = value
    exposeAttributes(this, ['last_run_at'])
  }

  // int64 # Most recent Export ID created by this schedule.
  getLastExportId = () => this.attributes.last_export_id

  setLastExportId = value => {
    this.attributes.last_export_id = value
    exposeAttributes(this, ['last_export_id'])
  }

  // string # Validation error from the most recent scheduled attempt. The schedule remains enabled and retries at its next scheduled time. Cleared when an export is successfully created; does not describe errors during export generation.
  getLastError = () => this.attributes.last_error

  setLastError = value => {
    this.attributes.last_error = value
    exposeAttributes(this, ['last_error'])
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Name for this scheduled export.
  //   export_type - string - Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
  //   export_options - object - Options for the report selected by export_type.
  //   user_id - int64 - Site Admin user who receives the completed export e-mail.
  //   disabled - boolean - If true, this scheduled export will not run.
  //   trigger - string - Schedule trigger type: `daily` or `custom_schedule`.
  //   interval - string - If trigger is `daily`, this specifies how often to run the scheduled export.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the scheduled export schedule.
  //   schedule_time_zone - string - Time zone used by the scheduled export schedule.
  //   holiday_region - string - Optional holiday region used by the scheduled export schedule.
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

    if (params.export_type !== undefined && params.export_type !== null && !isString(params.export_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: export_type must be of type String, received ${getType(params.export_type)}`)
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
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

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/scheduled_exports/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/scheduled_exports/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await ScheduledExport.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`, `export_type` or `disabled`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled` and `export_type`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `export_type`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/scheduled_exports', 'GET', params, options)

    return response?.data?.map(obj => new ScheduledExport(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ScheduledExport.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ScheduledExport.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Scheduled Export ID.
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

    const response = await Api.sendRequest(`/scheduled_exports/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ScheduledExport(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ScheduledExport.find(id, params, options)

  // Parameters:
  //   name (required) - string - Name for this scheduled export.
  //   export_type (required) - string - Export report type. Valid values: folder_size_audit, group_membership_audit, permission_audit, share_link_audit
  //   export_options - object - Options for the report selected by export_type.
  //   user_id - int64 - Site Admin user who receives the completed export e-mail.
  //   disabled - boolean - If true, this scheduled export will not run.
  //   trigger - string - Schedule trigger type: `daily` or `custom_schedule`.
  //   interval - string - If trigger is `daily`, this specifies how often to run the scheduled export.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the scheduled export's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the scheduled export schedule.
  //   schedule_time_zone - string - Time zone used by the scheduled export schedule.
  //   holiday_region - string - Optional holiday region used by the scheduled export schedule.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.export_type) {
      throw new errors.MissingParameterError('Parameter missing: export_type')
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.export_type !== undefined && params.export_type !== null && !isString(params.export_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: export_type must be of type String, received ${getType(params.export_type)}`)
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
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

    const response = await Api.sendRequest('/scheduled_exports', 'POST', params, options)

    return new ScheduledExport(response?.data, retainedOptions(options))
  }
}

export default ScheduledExport

module.exports = ScheduledExport
module.exports.default = ScheduledExport
