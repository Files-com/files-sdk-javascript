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
 * Class Schedule
 */
class Schedule {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Schedule ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Schedule name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // array(int64) # 0-based weekdays used by the Schedule. 0 is Sunday.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
    exposeAttributes(this, ['schedule_days_of_week'])
  }

  // array(string) # Times of day in HH:MM format (24-hour).
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
    exposeAttributes(this, ['schedule_times_of_day'])
  }

  // string # Time zone for scheduled times. If not set, times are interpreted as UTC.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
    exposeAttributes(this, ['schedule_time_zone'])
  }

  // string # Optional holiday region on which linked resources do not run.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
    exposeAttributes(this, ['holiday_region'])
  }

  // string # Human-readable Schedule description.
  getHumanReadableSchedule = () => this.attributes.human_readable_schedule

  setHumanReadableSchedule = value => {
    this.attributes.human_readable_schedule = value
    exposeAttributes(this, ['human_readable_schedule'])
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   name - string - Schedule name.
  //   schedule_days_of_week - array(int64) - 0-based weekdays used by the Schedule. 0 is Sunday.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format (24-hour).
  //   schedule_time_zone - string - Time zone for scheduled times. If not set, times are interpreted as UTC.
  //   holiday_region - string - Optional holiday region on which linked resources do not run.
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

    const response = await Api.sendRequest(`/schedules/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/schedules/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Schedule.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/schedules', 'GET', params, options)

    return response?.data?.map(obj => new Schedule(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Schedule.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Schedule.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Schedule ID.
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

    const response = await Api.sendRequest(`/schedules/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Schedule(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Schedule.find(id, params, options)

  // Parameters:
  //   name (required) - string - Schedule name.
  //   schedule_days_of_week (required) - array(int64) - 0-based weekdays used by the Schedule. 0 is Sunday.
  //   schedule_times_of_day (required) - array(string) - Times of day in HH:MM format (24-hour).
  //   schedule_time_zone - string - Time zone for scheduled times. If not set, times are interpreted as UTC.
  //   holiday_region - string - Optional holiday region on which linked resources do not run.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.schedule_days_of_week) {
      throw new errors.MissingParameterError('Parameter missing: schedule_days_of_week')
    }

    if (!params.schedule_times_of_day) {
      throw new errors.MissingParameterError('Parameter missing: schedule_times_of_day')
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
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

    const response = await Api.sendRequest('/schedules', 'POST', params, options)

    return new Schedule(response?.data, retainedOptions(options))
  }
}

export default Schedule

module.exports = Schedule
module.exports.default = Schedule
