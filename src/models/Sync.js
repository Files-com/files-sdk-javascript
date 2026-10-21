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
 * Class Sync
 */
class Sync {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Sync ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Name for this sync job
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Description for this sync job
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // int64 # Site ID this sync belongs to
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
    exposeAttributes(this, ['site_id'])
  }

  // int64 # Workspace ID this sync belongs to
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // int64 # User who created or owns this sync
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // string # Absolute source path for the sync
  getSrcPath = () => this.attributes.src_path

  setSrcPath = value => {
    this.attributes.src_path = value
    exposeAttributes(this, ['src_path'])
  }

  // string # Absolute destination path for the sync
  getDestPath = () => this.attributes.dest_path

  setDestPath = value => {
    this.attributes.dest_path = value
    exposeAttributes(this, ['dest_path'])
  }

  // int64 # Remote server ID for the source (if remote)
  getSrcRemoteServerId = () => this.attributes.src_remote_server_id

  setSrcRemoteServerId = value => {
    this.attributes.src_remote_server_id = value
    exposeAttributes(this, ['src_remote_server_id'])
  }

  // int64 # Remote server ID for the destination (if remote)
  getDestRemoteServerId = () => this.attributes.dest_remote_server_id

  setDestRemoteServerId = value => {
    this.attributes.dest_remote_server_id = value
    exposeAttributes(this, ['dest_remote_server_id'])
  }

  // int64 # Source site ID if syncing from a child or partner site
  getSrcSiteId = () => this.attributes.src_site_id

  setSrcSiteId = value => {
    this.attributes.src_site_id = value
    exposeAttributes(this, ['src_site_id'])
  }

  // int64 # Destination site ID if syncing to a child or partner site
  getDestSiteId = () => this.attributes.dest_site_id

  setDestSiteId = value => {
    this.attributes.dest_site_id = value
    exposeAttributes(this, ['dest_site_id'])
  }

  // boolean # Is this a two-way sync?
  getTwoWay = () => this.attributes.two_way

  setTwoWay = value => {
    this.attributes.two_way = value
    exposeAttributes(this, ['two_way'])
  }

  // boolean # Keep files after copying?
  getKeepAfterCopy = () => this.attributes.keep_after_copy

  setKeepAfterCopy = value => {
    this.attributes.keep_after_copy = value
    exposeAttributes(this, ['keep_after_copy'])
  }

  // boolean # Delete empty folders after sync?
  getDeleteEmptyFolders = () => this.attributes.delete_empty_folders

  setDeleteEmptyFolders = value => {
    this.attributes.delete_empty_folders = value
    exposeAttributes(this, ['delete_empty_folders'])
  }

  // boolean # Is this sync disabled?
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
    exposeAttributes(this, ['disabled'])
  }

  // string # Trigger type: daily, custom_schedule, or manual
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
    exposeAttributes(this, ['trigger'])
  }

  // string # Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  getTriggerFile = () => this.attributes.trigger_file

  setTriggerFile = value => {
    this.attributes.trigger_file = value
    exposeAttributes(this, ['trigger_file'])
  }

  // boolean # If true, the trigger file will be sent at the end of a successful sync even when no files were transferred.
  getAlwaysWriteTriggerFile = () => this.attributes.always_write_trigger_file

  setAlwaysWriteTriggerFile = value => {
    this.attributes.always_write_trigger_file = value
    exposeAttributes(this, ['always_write_trigger_file'])
  }

  // array(string) # Array of glob patterns to include
  getIncludePatterns = () => this.attributes.include_patterns

  setIncludePatterns = value => {
    this.attributes.include_patterns = value
    exposeAttributes(this, ['include_patterns'])
  }

  // array(string) # Array of glob patterns to exclude
  getExcludePatterns = () => this.attributes.exclude_patterns

  setExcludePatterns = value => {
    this.attributes.exclude_patterns = value
    exposeAttributes(this, ['exclude_patterns'])
  }

  // date-time # When this sync was created
  getCreatedAt = () => this.attributes.created_at

  // date-time # When this sync was last updated
  getUpdatedAt = () => this.attributes.updated_at

  // int64 # Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
  getSyncIntervalMinutes = () => this.attributes.sync_interval_minutes

  setSyncIntervalMinutes = value => {
    this.attributes.sync_interval_minutes = value
    exposeAttributes(this, ['sync_interval_minutes'])
  }

  // string # If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
    exposeAttributes(this, ['interval'])
  }

  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  getRecurringDay = () => this.attributes.recurring_day

  setRecurringDay = value => {
    this.attributes.recurring_day = value
    exposeAttributes(this, ['recurring_day'])
  }

  // array(int64) # If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  getRecurringDays = () => this.attributes.recurring_days

  setRecurringDays = value => {
    this.attributes.recurring_days = value
    exposeAttributes(this, ['recurring_days'])
  }

  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields.
  getScheduleId = () => this.attributes.schedule_id

  setScheduleId = value => {
    this.attributes.schedule_id = value
    exposeAttributes(this, ['schedule_id'])
  }

  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
    exposeAttributes(this, ['schedule_days_of_week'])
  }

  // array(string) # Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For `daily`, run at these times on the scheduled interval date.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
    exposeAttributes(this, ['schedule_times_of_day'])
  }

  // string # Time zone for the schedule. If not set, times are interpreted as UTC.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
    exposeAttributes(this, ['schedule_time_zone'])
  }

  // string # Skip the sync if there is a formal, observed holiday for this region.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
    exposeAttributes(this, ['holiday_region'])
  }

  // SyncRun # The latest run of this sync
  getLatestSyncRun = () => this.attributes.latest_sync_run

  setLatestSyncRun = value => {
    this.attributes.latest_sync_run = value
    exposeAttributes(this, ['latest_sync_run'])
  }

  // Dry Run Sync
  dryRun = async (params = {}) => {
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

    await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}/dry_run`, 'POST', params, this.options)
  }

  // Manually Run Sync
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

    await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}/manual_run`, 'POST', params, this.options)
  }

  // Parameters:
  //   delete_empty_folders - boolean - Delete empty folders after sync?
  //   description - string - Description for this sync job
  //   dest_path - string - Absolute destination path for the sync
  //   dest_remote_server_id - int64 - Remote server ID for the destination (if remote)
  //   disabled - boolean - Is this sync disabled?
  //   exclude_patterns - array(string) - Array of glob patterns to exclude
  //   holiday_region - string - Skip the sync if there is a formal, observed holiday for this region.
  //   include_patterns - array(string) - Array of glob patterns to include
  //   interval - string - If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   keep_after_copy - boolean - Keep files after copying?
  //   name - string - Name for this sync job
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   recurring_days - array(int64) - If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  //   schedule_time_zone - string - Time zone for the schedule. If not set, times are interpreted as UTC.
  //   schedule_times_of_day - array(string) - Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For `daily`, run at these times on the scheduled interval date.
  //   src_path - string - Absolute source path for the sync
  //   src_remote_server_id - int64 - Remote server ID for the source (if remote)
  //   sync_interval_minutes - int64 - Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
  //   trigger - string - Trigger type: daily, custom_schedule, or manual
  //   trigger_file - string - Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  //   always_write_trigger_file - boolean - If true, the trigger file will be sent at the end of a successful sync even when no files were transferred.
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

    if (isArray(params.delete_empty_folders) || isObject(params.delete_empty_folders)) {
      throw new errors.InvalidParameterError(`Bad parameter: delete_empty_folders must be of type Boolean, received ${getType(params.delete_empty_folders)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.dest_path !== undefined && params.dest_path !== null && !isString(params.dest_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_path must be of type String, received ${getType(params.dest_path)}`)
    }

    if (params.dest_remote_server_id !== undefined && params.dest_remote_server_id !== null && !isInt(params.dest_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_remote_server_id must be of type Int, received ${getType(params.dest_remote_server_id)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.exclude_patterns !== undefined && params.exclude_patterns !== null && !isArray(params.exclude_patterns)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_patterns must be of type Array, received ${getType(params.exclude_patterns)}`)
    }

    if (params.holiday_region !== undefined && params.holiday_region !== null && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.include_patterns !== undefined && params.include_patterns !== null && !isArray(params.include_patterns)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_patterns must be of type Array, received ${getType(params.include_patterns)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (isArray(params.keep_after_copy) || isObject(params.keep_after_copy)) {
      throw new errors.InvalidParameterError(`Bad parameter: keep_after_copy must be of type Boolean, received ${getType(params.keep_after_copy)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
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

    if (params.src_path !== undefined && params.src_path !== null && !isString(params.src_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_path must be of type String, received ${getType(params.src_path)}`)
    }

    if (params.src_remote_server_id !== undefined && params.src_remote_server_id !== null && !isInt(params.src_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_remote_server_id must be of type Int, received ${getType(params.src_remote_server_id)}`)
    }

    if (params.sync_interval_minutes !== undefined && params.sync_interval_minutes !== null && !isInt(params.sync_interval_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_interval_minutes must be of type Int, received ${getType(params.sync_interval_minutes)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_file !== undefined && params.trigger_file !== null && !isString(params.trigger_file)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_file must be of type String, received ${getType(params.trigger_file)}`)
    }

    if (isArray(params.always_write_trigger_file) || isObject(params.always_write_trigger_file)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_write_trigger_file must be of type Boolean, received ${getType(params.always_write_trigger_file)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Sync.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `workspace_id` or `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`, `disabled`, `src_remote_server_id` or `dest_remote_server_id`. Valid field combinations are `[ workspace_id, disabled ]`, `[ workspace_id, src_remote_server_id ]`, `[ workspace_id, dest_remote_server_id ]`, `[ disabled, src_remote_server_id ]`, `[ disabled, dest_remote_server_id ]`, `[ workspace_id, disabled, src_remote_server_id ]` or `[ workspace_id, disabled, dest_remote_server_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/syncs', 'GET', params, options)

    return response?.data?.map(obj => new Sync(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Sync.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Sync.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Sync ID.
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

    const response = await Api.sendRequest(`/syncs/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Sync(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Sync.find(id, params, options)

  // Parameters:
  //   delete_empty_folders - boolean - Delete empty folders after sync?
  //   description - string - Description for this sync job
  //   dest_path - string - Absolute destination path for the sync
  //   dest_remote_server_id - int64 - Remote server ID for the destination (if remote)
  //   disabled - boolean - Is this sync disabled?
  //   exclude_patterns - array(string) - Array of glob patterns to exclude
  //   holiday_region - string - Skip the sync if there is a formal, observed holiday for this region.
  //   include_patterns - array(string) - Array of glob patterns to include
  //   interval - string - If trigger is `daily`, this specifies how often to run this sync.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   keep_after_copy - boolean - Keep files after copying?
  //   name - string - Name for this sync job
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   recurring_days - array(int64) - If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the sync's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`, Custom schedule description for when the sync should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  //   schedule_time_zone - string - Time zone for the schedule. If not set, times are interpreted as UTC.
  //   schedule_times_of_day - array(string) - Times of day to run in HH:MM format. For `custom_schedule`, run at these times on specified days of week. For `daily`, run at these times on the scheduled interval date.
  //   src_path - string - Absolute source path for the sync
  //   src_remote_server_id - int64 - Remote server ID for the source (if remote)
  //   sync_interval_minutes - int64 - Frequency in minutes between syncs. If set, this value must be greater than or equal to the `remote_sync_interval` value for the site's plan. If left blank, the plan's `remote_sync_interval` will be used. This setting is only used if `trigger` is empty.
  //   trigger - string - Trigger type: daily, custom_schedule, or manual
  //   trigger_file - string - Some MFT services request an empty file (known as a trigger file) to signal the sync is complete and they can begin further processing. If trigger_file is set, a zero-byte file will be sent at the end of the sync.
  //   always_write_trigger_file - boolean - If true, the trigger file will be sent at the end of a successful sync even when no files were transferred.
  //   workspace_id - int64 - Workspace ID this sync belongs to
  static create = async (params = {}, options = {}) => {
    if (isArray(params.delete_empty_folders) || isObject(params.delete_empty_folders)) {
      throw new errors.InvalidParameterError(`Bad parameter: delete_empty_folders must be of type Boolean, received ${getType(params.delete_empty_folders)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.dest_path !== undefined && params.dest_path !== null && !isString(params.dest_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_path must be of type String, received ${getType(params.dest_path)}`)
    }

    if (params.dest_remote_server_id !== undefined && params.dest_remote_server_id !== null && !isInt(params.dest_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: dest_remote_server_id must be of type Int, received ${getType(params.dest_remote_server_id)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.exclude_patterns !== undefined && params.exclude_patterns !== null && !isArray(params.exclude_patterns)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_patterns must be of type Array, received ${getType(params.exclude_patterns)}`)
    }

    if (params.holiday_region !== undefined && params.holiday_region !== null && !isString(params.holiday_region)) {
      throw new errors.InvalidParameterError(`Bad parameter: holiday_region must be of type String, received ${getType(params.holiday_region)}`)
    }

    if (params.include_patterns !== undefined && params.include_patterns !== null && !isArray(params.include_patterns)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_patterns must be of type Array, received ${getType(params.include_patterns)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (isArray(params.keep_after_copy) || isObject(params.keep_after_copy)) {
      throw new errors.InvalidParameterError(`Bad parameter: keep_after_copy must be of type Boolean, received ${getType(params.keep_after_copy)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
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

    if (params.src_path !== undefined && params.src_path !== null && !isString(params.src_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_path must be of type String, received ${getType(params.src_path)}`)
    }

    if (params.src_remote_server_id !== undefined && params.src_remote_server_id !== null && !isInt(params.src_remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: src_remote_server_id must be of type Int, received ${getType(params.src_remote_server_id)}`)
    }

    if (params.sync_interval_minutes !== undefined && params.sync_interval_minutes !== null && !isInt(params.sync_interval_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_interval_minutes must be of type Int, received ${getType(params.sync_interval_minutes)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_file !== undefined && params.trigger_file !== null && !isString(params.trigger_file)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_file must be of type String, received ${getType(params.trigger_file)}`)
    }

    if (isArray(params.always_write_trigger_file) || isObject(params.always_write_trigger_file)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_write_trigger_file must be of type Boolean, received ${getType(params.always_write_trigger_file)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/syncs', 'POST', params, options)

    return new Sync(response?.data, retainedOptions(options))
  }
}

export default Sync

module.exports = Sync
module.exports.default = Sync
