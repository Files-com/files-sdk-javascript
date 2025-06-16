/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Sync
 */
class Sync {
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

  // int64 # Sync ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Name for this sync job
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Description for this sync job
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // int64 # Site ID this sync belongs to
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
  }

  // int64 # User who created or owns this sync
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Absolute source path for the sync
  getSrcPath = () => this.attributes.src_path

  setSrcPath = value => {
    this.attributes.src_path = value
  }

  // string # Absolute destination path for the sync
  getDestPath = () => this.attributes.dest_path

  setDestPath = value => {
    this.attributes.dest_path = value
  }

  // int64 # Remote server ID for the source (if remote)
  getSrcRemoteServerId = () => this.attributes.src_remote_server_id

  setSrcRemoteServerId = value => {
    this.attributes.src_remote_server_id = value
  }

  // int64 # Remote server ID for the destination (if remote)
  getDestRemoteServerId = () => this.attributes.dest_remote_server_id

  setDestRemoteServerId = value => {
    this.attributes.dest_remote_server_id = value
  }

  // boolean # Is this a two-way sync?
  getTwoWay = () => this.attributes.two_way

  setTwoWay = value => {
    this.attributes.two_way = value
  }

  // boolean # Keep files after copying?
  getKeepAfterCopy = () => this.attributes.keep_after_copy

  setKeepAfterCopy = value => {
    this.attributes.keep_after_copy = value
  }

  // boolean # Delete empty folders after sync?
  getDeleteEmptyFolders = () => this.attributes.delete_empty_folders

  setDeleteEmptyFolders = value => {
    this.attributes.delete_empty_folders = value
  }

  // boolean # Is this sync disabled?
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // string # Trigger type: daily, custom_schedule, or manual
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
  }

  // string # Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  getTriggerFile = () => this.attributes.trigger_file

  setTriggerFile = value => {
    this.attributes.trigger_file = value
  }

  // array(string) # Array of glob patterns to include
  getIncludePatterns = () => this.attributes.include_patterns

  setIncludePatterns = value => {
    this.attributes.include_patterns = value
  }

  // array(string) # Array of glob patterns to exclude
  getExcludePatterns = () => this.attributes.exclude_patterns

  setExcludePatterns = value => {
    this.attributes.exclude_patterns = value
  }

  // date-time # When this sync was created
  getCreatedAt = () => this.attributes.created_at

  // date-time # When this sync was last updated
  getUpdatedAt = () => this.attributes.updated_at

  // int64 # Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
  getSyncIntervalMinutes = () => this.attributes.sync_interval_minutes

  setSyncIntervalMinutes = value => {
    this.attributes.sync_interval_minutes = value
  }

  // string # If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
  }

  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  getRecurringDay = () => this.attributes.recurring_day

  setRecurringDay = value => {
    this.attributes.recurring_day = value
  }

  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
  }

  // array(string) # If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. Times of day in HH:MM format.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
  }

  // string # If trigger is `custom_schedule`, Custom schedule Time Zone for when the sync should be run.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
  }

  // Manually Run Sync
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

    await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}/manual_run`, 'POST', params, this.options)
  }

  // Parameters:
  //   name - string - Name for this sync job
  //   description - string - Description for this sync job
  //   src_path - string - Absolute source path
  //   dest_path - string - Absolute destination path
  //   src_remote_server_id - int64 - Remote server ID for the source
  //   dest_remote_server_id - int64 - Remote server ID for the destination
  //   two_way - boolean - Is this a two-way sync?
  //   keep_after_copy - boolean - Keep files after copying?
  //   delete_empty_folders - boolean - Delete empty folders after sync?
  //   disabled - boolean - Is this sync disabled?
  //   interval - string - If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   trigger - string - Trigger type: daily, custom_schedule, or manual
  //   trigger_file - string - Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   schedule_time_zone - string - If trigger is `custom_schedule`, Custom schedule Time Zone for when the sync should be run.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. Times of day in HH:MM format.
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

    if (params.src_path && !isString(params.src_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_path must be of type String, received ${getType(params.src_path)}`)
    }

    if (params.dest_path && !isString(params.dest_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_path must be of type String, received ${getType(params.dest_path)}`)
    }

    if (params.src_remote_server_id && !isInt(params.src_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_remote_server_id must be of type Int, received ${getType(params.src_remote_server_id)}`)
    }

    if (params.dest_remote_server_id && !isInt(params.dest_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_remote_server_id must be of type Int, received ${getType(params.dest_remote_server_id)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_file && !isString(params.trigger_file)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_file must be of type String, received ${getType(params.trigger_file)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.schedule_time_zone && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.schedule_days_of_week && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_times_of_day && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new Sync(response?.data, this.options)
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

    await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await Sync.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/syncs', 'GET', params, options)

    return response?.data?.map(obj => new Sync(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Sync.list(params, options)

  // Parameters:
  //   id (required) - int64 - Sync ID.
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

    const response = await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Sync(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Sync.find(id, params, options)

  // Parameters:
  //   name - string - Name for this sync job
  //   description - string - Description for this sync job
  //   src_path - string - Absolute source path
  //   dest_path - string - Absolute destination path
  //   src_remote_server_id - int64 - Remote server ID for the source
  //   dest_remote_server_id - int64 - Remote server ID for the destination
  //   two_way - boolean - Is this a two-way sync?
  //   keep_after_copy - boolean - Keep files after copying?
  //   delete_empty_folders - boolean - Delete empty folders after sync?
  //   disabled - boolean - Is this sync disabled?
  //   interval - string - If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   trigger - string - Trigger type: daily, custom_schedule, or manual
  //   trigger_file - string - Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   schedule_time_zone - string - If trigger is `custom_schedule`, Custom schedule Time Zone for when the sync should be run.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. Times of day in HH:MM format.
  static create = async (params = {}, options = {}) => {
    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.src_path && !isString(params.src_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_path must be of type String, received ${getType(params.src_path)}`)
    }

    if (params.dest_path && !isString(params.dest_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_path must be of type String, received ${getType(params.dest_path)}`)
    }

    if (params.src_remote_server_id && !isInt(params.src_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_remote_server_id must be of type Int, received ${getType(params.src_remote_server_id)}`)
    }

    if (params.dest_remote_server_id && !isInt(params.dest_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_remote_server_id must be of type Int, received ${getType(params.dest_remote_server_id)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_file && !isString(params.trigger_file)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_file must be of type String, received ${getType(params.trigger_file)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.schedule_time_zone && !isString(params.schedule_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_time_zone must be of type String, received ${getType(params.schedule_time_zone)}`)
    }

    if (params.schedule_days_of_week && !isArray(params.schedule_days_of_week)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_days_of_week must be of type Array, received ${getType(params.schedule_days_of_week)}`)
    }

    if (params.schedule_times_of_day && !isArray(params.schedule_times_of_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: schedule_times_of_day must be of type Array, received ${getType(params.schedule_times_of_day)}`)
    }

    const response = await Api.sendRequest('/syncs', 'POST', params, options)

    return new Sync(response?.data, options)
  }

  static createMigrateTo = async (options = {}) => {
    await Api.sendRequest('/syncs/migrate_to_syncs', 'POST', {}, options)
  }
}

export default Sync

module.exports = Sync
module.exports.default = Sync
