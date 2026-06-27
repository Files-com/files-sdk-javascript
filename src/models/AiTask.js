/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AiTask
 */
class AiTask {
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

  // int64 # AI Task ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # AI Task name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # AI Task description.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // string # Prompt sent when this AI Task is invoked.
  getPrompt = () => this.attributes.prompt

  setPrompt = value => {
    this.attributes.prompt = value
  }

  // string # Path scope used for action-triggered AI Tasks. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # Source glob used with `path` for action-triggered AI Tasks.
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
  }

  // boolean # If true, this AI Task will not run.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // string # How this AI Task is triggered.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
  }

  // array(string) # If trigger is `action`, the file action types that invoke this AI Task. Valid actions are create, copy, move, archived_delete, update, read, destroy.
  getTriggerActions = () => this.attributes.trigger_actions

  setTriggerActions = value => {
    this.attributes.trigger_actions = value
  }

  // string # If trigger is `daily`, this specifies how often to run the AI Task.
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

  // array(string) # Times of day in HH:MM format for scheduled AI Tasks.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
  }

  // string # Time zone used by the AI Task schedule.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
  }

  // string # Optional holiday region used by scheduled AI Tasks.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
  }

  // string # Human-readable schedule description.
  getHumanReadableSchedule = () => this.attributes.human_readable_schedule

  setHumanReadableSchedule = value => {
    this.attributes.human_readable_schedule = value
  }

  // date-time # Most recent successful invocation time.
  getLastRunAt = () => this.attributes.last_run_at

  setLastRunAt = value => {
    this.attributes.last_run_at = value
  }

  // int64 # Master User ID used for AI Task invocations.
  getMasterAdminUserId = () => this.attributes.master_admin_user_id

  setMasterAdminUserId = value => {
    this.attributes.master_admin_user_id = value
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

    await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}/manual_run`, 'POST', params, this.options)
  }

  // Parameters:
  //   description - string - AI Task description.
  //   disabled - boolean - If true, this AI Task will not run.
  //   holiday_region - string - Optional holiday region used by scheduled AI Tasks.
  //   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
  //   name - string - AI Task name.
  //   path - string - Path scope used for action-triggered AI Tasks.
  //   prompt - string - Prompt sent when this AI Task is invoked.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_time_zone - string - Time zone used by the AI Task schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for scheduled AI Tasks.
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

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.holiday_region && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.prompt && !isString(params.prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: prompt must be of type String, received ${getType(params.prompt)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.schedule_days_of_week && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_time_zone && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.schedule_times_of_day && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.source && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
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

    const response = await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new AiTask(response?.data, this.options)
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

    await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await AiTask.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `id`, `disabled` or `updated_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `trigger` or `workspace_id`. Valid field combinations are `[ workspace_id, disabled ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/ai_tasks', 'GET', params, options)

    return response?.data?.map(obj => new AiTask(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    AiTask.list(params, options)

  // Parameters:
  //   id (required) - int64 - Ai Task ID.
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

    const response = await Api.sendRequest(`/ai_tasks/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AiTask(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    AiTask.find(id, params, options)

  // Parameters:
  //   description - string - AI Task description.
  //   disabled - boolean - If true, this AI Task will not run.
  //   holiday_region - string - Optional holiday region used by scheduled AI Tasks.
  //   interval - string - If trigger is `daily`, this specifies how often to run the AI Task.
  //   name (required) - string - AI Task name.
  //   path - string - Path scope used for action-triggered AI Tasks.
  //   prompt (required) - string - Prompt sent when this AI Task is invoked.
  //   recurring_day - int64 - If trigger is `daily`, this selects the day number inside the chosen interval.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, the 0-based weekdays used by the schedule.
  //   schedule_time_zone - string - Time zone used by the AI Task schedule.
  //   schedule_times_of_day - array(string) - Times of day in HH:MM format for scheduled AI Tasks.
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

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.holiday_region && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.prompt && !isString(params.prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: prompt must be of type String, received ${getType(params.prompt)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.schedule_days_of_week && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_time_zone && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.schedule_times_of_day && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (params.source && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/ai_tasks', 'POST', params, options)

    return new AiTask(response?.data, options)
  }
}

export default AiTask

module.exports = AiTask
module.exports.default = AiTask
