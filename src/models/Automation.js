/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Automation
 */
class Automation {
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

  // int64 # Automation ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // boolean # Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.
  getAlwaysOverwriteSizeMatchingFiles = () => this.attributes.always_overwrite_size_matching_files

  setAlwaysOverwriteSizeMatchingFiles = value => {
    this.attributes.always_overwrite_size_matching_files = value
  }

  // string # Automation type
  getAutomation = () => this.attributes.automation

  setAutomation = value => {
    this.attributes.automation = value
  }

  // boolean # Indicates if the automation has been deleted.
  getDeleted = () => this.attributes.deleted

  setDeleted = value => {
    this.attributes.deleted = value
  }

  // string # Description for the this Automation.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // string # If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  getDestinationReplaceFrom = () => this.attributes.destination_replace_from

  setDestinationReplaceFrom = value => {
    this.attributes.destination_replace_from = value
  }

  // string # If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  getDestinationReplaceTo = () => this.attributes.destination_replace_to

  setDestinationReplaceTo = value => {
    this.attributes.destination_replace_to = value
  }

  // array(string) # Destination Paths
  getDestinations = () => this.attributes.destinations

  setDestinations = value => {
    this.attributes.destinations = value
  }

  // boolean # If true, this automation will not run.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // string # If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  getExcludePattern = () => this.attributes.exclude_pattern

  setExcludePattern = value => {
    this.attributes.exclude_pattern = value
  }

  // boolean # Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  getFlattenDestinationStructure = () => this.attributes.flatten_destination_structure

  setFlattenDestinationStructure = value => {
    this.attributes.flatten_destination_structure = value
  }

  // array(int64) # IDs of Groups for the Automation (i.e. who to Request File from)
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
  }

  // boolean # If true, the Lock Folders behavior will be disregarded for automated actions.
  getIgnoreLockedFolders = () => this.attributes.ignore_locked_folders

  setIgnoreLockedFolders = value => {
    this.attributes.ignore_locked_folders = value
  }

  // string # If trigger is `daily`, this specifies how often to run this automation.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
  }

  // date-time # Time when automation was last modified. Does not change for name or description updates.
  getLastModifiedAt = () => this.attributes.last_modified_at

  setLastModifiedAt = value => {
    this.attributes.last_modified_at = value
  }

  // boolean # If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  getLegacyFolderMatching = () => this.attributes.legacy_folder_matching

  setLegacyFolderMatching = value => {
    this.attributes.legacy_folder_matching = value
  }

  // string # Name for this automation.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // boolean # If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten if they appear to be the same file size as the newly incoming file.  Use the `:always_overwrite_size_matching_files` option to override this.
  getOverwriteFiles = () => this.attributes.overwrite_files

  setOverwriteFiles = value => {
    this.attributes.overwrite_files = value
  }

  // string # Path on which this Automation runs.  Supports globs, except on remote mounts. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # Timezone to use when rendering timestamps in paths.
  getPathTimeZone = () => this.attributes.path_time_zone

  setPathTimeZone = value => {
    this.attributes.path_time_zone = value
  }

  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  getRecurringDay = () => this.attributes.recurring_day

  setRecurringDay = value => {
    this.attributes.recurring_day = value
  }

  // object # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
  getSchedule = () => this.attributes.schedule

  setSchedule = value => {
    this.attributes.schedule = value
  }

  // string # If trigger is `custom_schedule`, Human readable Custom schedule description for when the automation should be run.
  getHumanReadableSchedule = () => this.attributes.human_readable_schedule

  setHumanReadableSchedule = value => {
    this.attributes.human_readable_schedule = value
  }

  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0-based days of the week. 0 is Sunday, 1 is Monday, etc.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
  }

  // array(string) # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. Times of day in HH:MM format.
  getScheduleTimesOfDay = () => this.attributes.schedule_times_of_day

  setScheduleTimesOfDay = value => {
    this.attributes.schedule_times_of_day = value
  }

  // string # If trigger is `custom_schedule`, Custom schedule Time Zone for when the automation should be run.
  getScheduleTimeZone = () => this.attributes.schedule_time_zone

  setScheduleTimeZone = value => {
    this.attributes.schedule_time_zone = value
  }

  // string # Source path. Supports globs, except on remote mounts.
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
  }

  // array(int64) # IDs of remote sync folder behaviors to run by this Automation
  getSyncIds = () => this.attributes.sync_ids

  setSyncIds = value => {
    this.attributes.sync_ids = value
  }

  // array(string) # If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  getTriggerActions = () => this.attributes.trigger_actions

  setTriggerActions = value => {
    this.attributes.trigger_actions = value
  }

  // string # How this automation is triggered to run.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
  }

  // int64 # User ID of the Automation's creator.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // array(int64) # IDs of Users for the Automation (i.e. who to Request File from)
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
  }

  // object # A Hash of attributes specific to the automation type.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
  }

  // string # If trigger is `webhook`, this is the URL of the webhook to trigger the Automation.
  getWebhookUrl = () => this.attributes.webhook_url

  setWebhookUrl = value => {
    this.attributes.webhook_url = value
  }

  // Manually run automation
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

    await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}/manual_run`, 'POST', params, this.options)
  }

  // Parameters:
  //   source - string - Source Path
  //   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`. A list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - If trigger is `custom_schedule`. A list of times of day to run this automation. 24-hour time format.
  //   schedule_time_zone - string - If trigger is `custom_schedule`. Time zone for the schedule.
  //   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.
  //   description - string - Description for the this Automation.
  //   disabled - boolean - If true, this automation will not run.
  //   exclude_pattern - string - If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  //   flatten_destination_structure - boolean - Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  //   ignore_locked_folders - boolean - If true, the Lock Folders behavior will be disregarded for automated actions.
  //   legacy_folder_matching - boolean - DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  //   name - string - Name for this automation.
  //   overwrite_files - boolean - If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten if they appear to be the same file size as the newly incoming file.  Use the `:always_overwrite_size_matching_files` option to override this.
  //   path_time_zone - string - Timezone to use when rendering timestamps in paths.
  //   trigger - string - How this automation is triggered to run.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation - string - Automation type
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

    if (params.source && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.destinations && !isArray(params.destinations)) {
      throw new errors.InvalidParameterError(`Bad parameter: destinations must be of type Array, received ${getType(params.destinations)}`)
    }

    if (params.destination_replace_from && !isString(params.destination_replace_from)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_from must be of type String, received ${getType(params.destination_replace_from)}`)
    }

    if (params.destination_replace_to && !isString(params.destination_replace_to)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_to must be of type String, received ${getType(params.destination_replace_to)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.sync_ids && !isString(params.sync_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_ids must be of type String, received ${getType(params.sync_ids)}`)
    }

    if (params.user_ids && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.group_ids && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
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

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.exclude_pattern && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.path_time_zone && !isString(params.path_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_time_zone must be of type String, received ${getType(params.path_time_zone)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.automation && !isString(params.automation)) {
      throw new errors.InvalidParameterError(`Bad parameter: automation must be of type String, received ${getType(params.automation)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new Automation(response?.data, this.options)
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

    await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await Automation.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation`, `disabled`, `last_modified_at` or `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `last_modified_at` or `automation`. Valid field combinations are `[ disabled, last_modified_at ]`, `[ disabled, automation ]`, `[ last_modified_at, automation ]` or `[ disabled, last_modified_at, automation ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `last_modified_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `last_modified_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `last_modified_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `last_modified_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/automations', 'GET', params, options)

    return response?.data?.map(obj => new Automation(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Automation.list(params, options)

  // Parameters:
  //   id (required) - int64 - Automation ID.
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

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Automation(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Automation.find(id, params, options)

  // Parameters:
  //   source - string - Source Path
  //   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule`. A list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - If trigger is `custom_schedule`. A list of times of day to run this automation. 24-hour time format.
  //   schedule_time_zone - string - If trigger is `custom_schedule`. Time zone for the schedule.
  //   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.
  //   description - string - Description for the this Automation.
  //   disabled - boolean - If true, this automation will not run.
  //   exclude_pattern - string - If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  //   flatten_destination_structure - boolean - Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  //   ignore_locked_folders - boolean - If true, the Lock Folders behavior will be disregarded for automated actions.
  //   legacy_folder_matching - boolean - DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  //   name - string - Name for this automation.
  //   overwrite_files - boolean - If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten if they appear to be the same file size as the newly incoming file.  Use the `:always_overwrite_size_matching_files` option to override this.
  //   path_time_zone - string - Timezone to use when rendering timestamps in paths.
  //   trigger - string - How this automation is triggered to run.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation (required) - string - Automation type
  static create = async (params = {}, options = {}) => {
    if (!params.automation) {
      throw new errors.MissingParameterError('Parameter missing: automation')
    }

    if (params.source && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.destinations && !isArray(params.destinations)) {
      throw new errors.InvalidParameterError(`Bad parameter: destinations must be of type Array, received ${getType(params.destinations)}`)
    }

    if (params.destination_replace_from && !isString(params.destination_replace_from)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_from must be of type String, received ${getType(params.destination_replace_from)}`)
    }

    if (params.destination_replace_to && !isString(params.destination_replace_to)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_to must be of type String, received ${getType(params.destination_replace_to)}`)
    }

    if (params.interval && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.sync_ids && !isString(params.sync_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_ids must be of type String, received ${getType(params.sync_ids)}`)
    }

    if (params.user_ids && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.group_ids && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
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

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.exclude_pattern && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.path_time_zone && !isString(params.path_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_time_zone must be of type String, received ${getType(params.path_time_zone)}`)
    }

    if (params.trigger && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
    }

    if (params.recurring_day && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.automation && !isString(params.automation)) {
      throw new errors.InvalidParameterError(`Bad parameter: automation must be of type String, received ${getType(params.automation)}`)
    }

    const response = await Api.sendRequest('/automations', 'POST', params, options)

    return new Automation(response?.data, options)
  }
}

export default Automation

module.exports = Automation
module.exports.default = Automation
