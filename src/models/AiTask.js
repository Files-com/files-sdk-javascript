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
 * Class AiTask
 */
class AiTask {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # AI Task ID.
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

  // string # AI Task name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # AI Task description.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // string # Prompt sent when this AI Task is invoked.
  getPrompt = () => this.attributes.prompt

  setPrompt = value => {
    this.attributes.prompt = value
    exposeAttributes(this, ['prompt'])
  }

  // string # Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  getPermissionSet = () => this.attributes.permission_set

  setPermissionSet = value => {
    this.attributes.permission_set = value
    exposeAttributes(this, ['permission_set'])
  }

  // string # Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // string # Source glob used with `path` for action-triggered AI Tasks.
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
    exposeAttributes(this, ['source'])
  }

  // boolean # If true, this AI Task will not run.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
    exposeAttributes(this, ['disabled'])
  }

  // string # How this AI Task is triggered.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
    exposeAttributes(this, ['trigger'])
  }

  // array(string) # If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
  getTriggerActions = () => this.attributes.trigger_actions

  setTriggerActions = value => {
    this.attributes.trigger_actions = value
    exposeAttributes(this, ['trigger_actions'])
  }

  // string # If trigger is `daily`, this specifies how often to run the AI Task.
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

  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields.
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

  // array(string) # Times of day in HH:MM format for the AI Task schedule.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
    exposeAttributes(this, ['schedule_times_of_day'])
  }

  // string # Time zone used by the AI Task schedule.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
    exposeAttributes(this, ['schedule_time_zone'])
  }

  // string # Optional holiday region used by the AI Task schedule.
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

  // date-time # Most recent successful invocation time.
  getLastRunAt = () => this.attributes.last_run_at

  setLastRunAt = value => {
    this.attributes.last_run_at = value
    exposeAttributes(this, ['last_run_at'])
  }

  // int64 # Master User ID used for AI Task invocations.
  getMasterAdminUserId = () => this.attributes.master_admin_user_id

  setMasterAdminUserId = value => {
    this.attributes.master_admin_user_id = value
    exposeAttributes(this, ['master_admin_user_id'])
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Manually Run AI Task
  manualRun = async (params = {}) => {
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

    await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}/manual_run`, 'POST', params, this.options)
  }

  // Parameters:
  //   description - string - AI Task description.
  //   disabled - boolean - If true, this AI Task will not run.
  //   holiday_region - string - Optional holiday region used by the AI Task schedule.
  //   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
  //   name - string - AI Task name.
  //   path - string - Path scope used for action-triggered AI Tasks.
  //   permission_set - string - Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  //   prompt - string - Prompt sent when this AI Task is invoked.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_time_zone - string - Time zone used by the AI Task schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the AI Task schedule.
  //   source - string - Source glob used with `path` for action-triggered AI Tasks.
  //   trigger - string - How this AI Task is triggered.
  //   trigger_actions - array(string) - If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
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

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.holiday_region !== undefined && params.holiday_region !== null && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.permission_set !== undefined && params.permission_set !== null && !isString(params.permission_set)) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(params.permission_set)}`)
    }

    if (params.prompt !== undefined && params.prompt !== null && !isString(params.prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: prompt must be of type String, received ${getType(params.prompt)}`)
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

    if (params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.source !== undefined && params.source !== null && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions !== undefined && params.trigger_actions !== null && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
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

    const response = await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await AiTask.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name`, `disabled` or `updated_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `trigger` or `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/ai_tasks', 'GET', params, options)

    return response?.data?.map(obj => new AiTask(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    AiTask.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      AiTask.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Ai Task ID.
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

    const response = await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AiTask(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    AiTask.find(id, params, options)

  // Parameters:
  //   description - string - AI Task description.
  //   disabled - boolean - If true, this AI Task will not run.
  //   holiday_region - string - Optional holiday region used by the AI Task schedule.
  //   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
  //   name (required) - string - AI Task name.
  //   path - string - Path scope used for action-triggered AI Tasks.
  //   permission_set - string - Permissions used by the internal API key for this AI Task. Valid values are `full` and `files_only`.
  //   prompt (required) - string - Prompt sent when this AI Task is invoked.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   recurring_days - array(int64) - If trigger is `daily`, this selects one or more day numbers inside a `week`, `month`, `quarter`, or `year` interval.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the AI Task's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_time_zone - string - Time zone used by the AI Task schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for the AI Task schedule.
  //   source - string - Source glob used with `path` for action-triggered AI Tasks.
  //   trigger - string - How this AI Task is triggered.
  //   trigger_actions - array(string) - If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.prompt) {
      throw new errors.MissingParameterError('Parameter missing: prompt')
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.holiday_region !== undefined && params.holiday_region !== null && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.permission_set !== undefined && params.permission_set !== null && !isString(params.permission_set)) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(params.permission_set)}`)
    }

    if (params.prompt !== undefined && params.prompt !== null && !isString(params.prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: prompt must be of type String, received ${getType(params.prompt)}`)
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

    if (params.schedule_time_zone !== undefined && params.schedule_time_zone !== null && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.schedule_times_of_day !== undefined && params.schedule_times_of_day !== null && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.source !== undefined && params.source !== null && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions !== undefined && params.trigger_actions !== null && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/ai_tasks', 'POST', params, options)

    return new AiTask(response?.data, retainedOptions(options))
  }
}

export default AiTask

module.exports = AiTask
module.exports.default = AiTask
