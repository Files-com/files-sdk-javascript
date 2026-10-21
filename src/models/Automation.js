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
 * Class Automation
 */
class Automation {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Automation ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Workspace ID
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // boolean # Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  getAlwaysSerializeJobs = () => this.attributes.always_serialize_jobs

  setAlwaysSerializeJobs = value => {
    this.attributes.always_serialize_jobs = value
    exposeAttributes(this, ['always_serialize_jobs'])
  }

  // boolean # Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  getAlwaysOverwriteSizeMatchingFiles = () => this.attributes.always_overwrite_size_matching_files

  setAlwaysOverwriteSizeMatchingFiles = value => {
    this.attributes.always_overwrite_size_matching_files = value
    exposeAttributes(this, ['always_overwrite_size_matching_files'])
  }

  // string # Automation type
  getAutomation = () => this.attributes.automation

  setAutomation = value => {
    this.attributes.automation = value
    exposeAttributes(this, ['automation'])
  }

  // boolean # Indicates if the automation has been deleted.
  getDeleted = () => this.attributes.deleted

  setDeleted = value => {
    this.attributes.deleted = value
    exposeAttributes(this, ['deleted'])
  }

  // string # Description for the this Automation.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // object # Automation v2 graph definition.
  getDefinition = () => this.attributes.definition

  setDefinition = value => {
    this.attributes.definition = value
    exposeAttributes(this, ['definition'])
  }

  // string # If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  getDestinationReplaceFrom = () => this.attributes.destination_replace_from

  setDestinationReplaceFrom = value => {
    this.attributes.destination_replace_from = value
    exposeAttributes(this, ['destination_replace_from'])
  }

  // string # If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  getDestinationReplaceTo = () => this.attributes.destination_replace_to

  setDestinationReplaceTo = value => {
    this.attributes.destination_replace_to = value
    exposeAttributes(this, ['destination_replace_to'])
  }

  // array(string) # Destination Paths
  getDestinations = () => this.attributes.destinations

  setDestinations = value => {
    this.attributes.destinations = value
    exposeAttributes(this, ['destinations'])
  }

  // boolean # If true, this automation will not run.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
    exposeAttributes(this, ['disabled'])
  }

  // string # If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  getExcludePattern = () => this.attributes.exclude_pattern

  setExcludePattern = value => {
    this.attributes.exclude_pattern = value
    exposeAttributes(this, ['exclude_pattern'])
  }

  // array(object) # List of URLs to be imported and names to be used.
  getImportUrls = () => this.attributes.import_urls

  setImportUrls = value => {
    this.attributes.import_urls = value
    exposeAttributes(this, ['import_urls'])
  }

  // string # If trigger is `email`, this is the address that triggers the Automation.
  getInboundEmailAddress = () => this.attributes.inbound_email_address

  setInboundEmailAddress = value => {
    this.attributes.inbound_email_address = value
    exposeAttributes(this, ['inbound_email_address'])
  }

  // boolean # Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  getFlattenDestinationStructure = () => this.attributes.flatten_destination_structure

  setFlattenDestinationStructure = value => {
    this.attributes.flatten_destination_structure = value
    exposeAttributes(this, ['flatten_destination_structure'])
  }

  // array(int64) # IDs of Groups for the Automation (i.e. who to Request File from)
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
    exposeAttributes(this, ['group_ids'])
  }

  // boolean # If true, the Lock Folders behavior will be disregarded for automated actions.
  getIgnoreLockedFolders = () => this.attributes.ignore_locked_folders

  setIgnoreLockedFolders = value => {
    this.attributes.ignore_locked_folders = value
    exposeAttributes(this, ['ignore_locked_folders'])
  }

  // string # If trigger is `daily`, this specifies how often to run this automation.  One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
    exposeAttributes(this, ['interval'])
  }

  // date-time # Time when automation was last modified. Does not change for name or description updates.
  getLastModifiedAt = () => this.attributes.last_modified_at

  setLastModifiedAt = value => {
    this.attributes.last_modified_at = value
    exposeAttributes(this, ['last_modified_at'])
  }

  // boolean # If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  getLegacyFolderMatching = () => this.attributes.legacy_folder_matching

  setLegacyFolderMatching = value => {
    this.attributes.legacy_folder_matching = value
    exposeAttributes(this, ['legacy_folder_matching'])
  }

  // string # Name for this automation.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // boolean # If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
  getOverwriteFiles = () => this.attributes.overwrite_files

  setOverwriteFiles = value => {
    this.attributes.overwrite_files = value
    exposeAttributes(this, ['overwrite_files'])
  }

  // string # Path on which this Automation runs.  Supports globs, except on remote mounts. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // string # Timezone to use when rendering timestamps in paths.
  getPathTimeZone = () => this.attributes.path_time_zone

  setPathTimeZone = value => {
    this.attributes.path_time_zone = value
    exposeAttributes(this, ['path_time_zone'])
  }

  // int64 # Current Automation v2 definition version.
  getVersion = () => this.attributes.version

  setVersion = value => {
    this.attributes.version = value
    exposeAttributes(this, ['version'])
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

  // int64 # If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields.
  getScheduleId = () => this.attributes.schedule_id

  setScheduleId = value => {
    this.attributes.schedule_id = value
    exposeAttributes(this, ['schedule_id'])
  }

  // int64 # If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
  getRetryOnFailureIntervalInMinutes = () => this.attributes.retry_on_failure_interval_in_minutes

  setRetryOnFailureIntervalInMinutes = value => {
    this.attributes.retry_on_failure_interval_in_minutes = value
    exposeAttributes(this, ['retry_on_failure_interval_in_minutes'])
  }

  // int64 # If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
  getRetryOnFailureNumberOfAttempts = () => this.attributes.retry_on_failure_number_of_attempts

  setRetryOnFailureNumberOfAttempts = value => {
    this.attributes.retry_on_failure_number_of_attempts = value
    exposeAttributes(this, ['retry_on_failure_number_of_attempts'])
  }

  // object # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run in json format.
  getSchedule = () => this.attributes.schedule

  setSchedule = value => {
    this.attributes.schedule = value
    exposeAttributes(this, ['schedule'])
  }

  // string # If trigger is `custom_schedule` or `daily` with times, Human readable schedule description for when the automation should be run.
  getHumanReadableSchedule = () => this.attributes.human_readable_schedule

  setHumanReadableSchedule = value => {
    this.attributes.human_readable_schedule = value
    exposeAttributes(this, ['human_readable_schedule'])
  }

  // array(int64) # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run. 0 is Sunday, 1 is Monday, etc.
  getScheduleDaysOfWeek = () => this.attributes.schedule_days_of_week

  setScheduleDaysOfWeek = value => {
    this.attributes.schedule_days_of_week = value
    exposeAttributes(this, ['schedule_days_of_week'])
  }

  // array(string) # Times of day to run in HH:MM format (24-hour). For `custom_schedule`, run at these times on specified days of week. For `daily`, run at these times on the scheduled interval date.
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

  // string # Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
    exposeAttributes(this, ['source'])
  }

  // array(int64) # IDs of Syncs to run by this Automation.
  getSyncIds = () => this.attributes.sync_ids

  setSyncIds = value => {
    this.attributes.sync_ids = value
    exposeAttributes(this, ['sync_ids'])
  }

  // array(string) # If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, copy, move, archived_delete, update, read, destroy
  getTriggerActions = () => this.attributes.trigger_actions

  setTriggerActions = value => {
    this.attributes.trigger_actions = value
    exposeAttributes(this, ['trigger_actions'])
  }

  // string # How this automation is triggered to run.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
    exposeAttributes(this, ['trigger'])
  }

  // int64 # User ID of the Automation's creator.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // array(int64) # IDs of Users for the Automation (i.e. who to Request File from)
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
    exposeAttributes(this, ['user_ids'])
  }

  // object # A Hash of attributes specific to the automation type.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
    exposeAttributes(this, ['value'])
  }

  // string # If trigger is `webhook`, this is the URL of the webhook to trigger the Automation.
  getWebhookUrl = () => this.attributes.webhook_url

  setWebhookUrl = value => {
    this.attributes.webhook_url = value
    exposeAttributes(this, ['webhook_url'])
  }

  // string # Skip the automation if there is a formal, observed holiday for this region.
  getHolidayRegion = () => this.attributes.holiday_region

  setHolidayRegion = value => {
    this.attributes.holiday_region = value
    exposeAttributes(this, ['holiday_region'])
  }

  // Upgrade a legacy Automation to Automation v2
  upgrade = async (params = {}) => {
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

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}/upgrade`, 'POST', params, this.options)

    return new Automation(response?.data, this.options)
  }

  // Manually Run Automation
  //
  // Parameters:
  //   items - array(object) - Initial items for a v2 manual trigger. Each item contains exactly one `file` path or `data` object.
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

    if (params.items !== undefined && params.items !== null && !isArray(params.items)) {
      throw new errors.InvalidParameterError(`Bad parameter: items must be of type Array, received ${getType(params.items)}`)
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
  //   source - string - Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  //   destinations - array(string) - A list of destination paths. Use a trailing slash for folder destinations and omit it for file destinations.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs, except on remote mounts.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule` without `schedule_id`, a list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - Times of day to run in HH:MM format (24-hour). Required for `custom_schedule` without `schedule_id`. Optional for `daily` triggers; if not set, runs at midnight UTC.
  //   schedule_time_zone - string - Time zone for schedule fields. Optional for `custom_schedule` without `schedule_id` and for `daily`. If not set, times are interpreted as UTC.
  //   holiday_region - string - Skip automation on holidays in this region. Optional for `custom_schedule` without `schedule_id` and for `daily`.
  //   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  //   always_serialize_jobs - boolean - Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  //   description - string - Description for the this Automation.
  //   definition - object - Automation v2 graph definition.
  //   disabled - boolean - If true, this automation will not run.
  //   exclude_pattern - string - If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  //   import_urls - array(object) - List of URLs to be imported and names to be used.
  //   flatten_destination_structure - boolean - Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  //   ignore_locked_folders - boolean - If true, the Lock Folders behavior will be disregarded for automated actions.
  //   legacy_folder_matching - boolean - DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  //   name - string - Name for this automation.
  //   overwrite_files - boolean - If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
  //   path_time_zone - string - Timezone to use when rendering timestamps in paths.
  //   retry_on_failure_interval_in_minutes - int64 - If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
  //   retry_on_failure_number_of_attempts - int64 - If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
  //   trigger - string - How this automation is triggered to run.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, copy, move, archived_delete, update, read, destroy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   recurring_days - array(int64) - If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation - string - Automation type
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

    if (params.source !== undefined && params.source !== null && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.destinations !== undefined && params.destinations !== null && !isArray(params.destinations)) {
      throw new errors.InvalidParameterError(`Bad parameter: destinations must be of type Array, received ${getType(params.destinations)}`)
    }

    if (params.destination_replace_from !== undefined && params.destination_replace_from !== null && !isString(params.destination_replace_from)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_from must be of type String, received ${getType(params.destination_replace_from)}`)
    }

    if (params.destination_replace_to !== undefined && params.destination_replace_to !== null && !isString(params.destination_replace_to)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_to must be of type String, received ${getType(params.destination_replace_to)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.sync_ids !== undefined && params.sync_ids !== null && !isString(params.sync_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_ids must be of type String, received ${getType(params.sync_ids)}`)
    }

    if (params.user_ids !== undefined && params.user_ids !== null && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
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

    if (isArray(params.always_overwrite_size_matching_files) || isObject(params.always_overwrite_size_matching_files)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_overwrite_size_matching_files must be of type Boolean, received ${getType(params.always_overwrite_size_matching_files)}`)
    }

    if (isArray(params.always_serialize_jobs) || isObject(params.always_serialize_jobs)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_serialize_jobs must be of type Boolean, received ${getType(params.always_serialize_jobs)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.exclude_pattern !== undefined && params.exclude_pattern !== null && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (params.import_urls !== undefined && params.import_urls !== null && !isArray(params.import_urls)) {
      throw new errors.InvalidParameterError(`Bad parameter: import_urls must be of type Array, received ${getType(params.import_urls)}`)
    }

    if (isArray(params.flatten_destination_structure) || isObject(params.flatten_destination_structure)) {
      throw new errors.InvalidParameterError(`Bad parameter: flatten_destination_structure must be of type Boolean, received ${getType(params.flatten_destination_structure)}`)
    }

    if (isArray(params.ignore_locked_folders) || isObject(params.ignore_locked_folders)) {
      throw new errors.InvalidParameterError(`Bad parameter: ignore_locked_folders must be of type Boolean, received ${getType(params.ignore_locked_folders)}`)
    }

    if (isArray(params.legacy_folder_matching) || isObject(params.legacy_folder_matching)) {
      throw new errors.InvalidParameterError(`Bad parameter: legacy_folder_matching must be of type Boolean, received ${getType(params.legacy_folder_matching)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (isArray(params.overwrite_files) || isObject(params.overwrite_files)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite_files must be of type Boolean, received ${getType(params.overwrite_files)}`)
    }

    if (params.path_time_zone !== undefined && params.path_time_zone !== null && !isString(params.path_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_time_zone must be of type String, received ${getType(params.path_time_zone)}`)
    }

    if (params.retry_on_failure_interval_in_minutes !== undefined && params.retry_on_failure_interval_in_minutes !== null && !isInt(params.retry_on_failure_interval_in_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: retry_on_failure_interval_in_minutes must be of type Int, received ${getType(params.retry_on_failure_interval_in_minutes)}`)
    }

    if (params.retry_on_failure_number_of_attempts !== undefined && params.retry_on_failure_number_of_attempts !== null && !isInt(params.retry_on_failure_number_of_attempts)) {
      throw new errors.InvalidParameterError(`Bad parameter: retry_on_failure_number_of_attempts must be of type Int, received ${getType(params.retry_on_failure_number_of_attempts)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions !== undefined && params.trigger_actions !== null && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
    }

    if (params.recurring_day !== undefined && params.recurring_day !== null && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.recurring_days !== undefined && params.recurring_days !== null && !isArray(params.recurring_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_days must be of type Array, received ${getType(params.recurring_days)}`)
    }

    if (params.automation !== undefined && params.automation !== null && !isString(params.automation)) {
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

    await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Automation.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name`, `automation`, `last_modified_at` or `disabled`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `last_modified_at`, `workspace_id` or `automation`. Valid field combinations are `[ disabled, last_modified_at ]`, `[ workspace_id, disabled ]`, `[ disabled, automation ]`, `[ workspace_id, last_modified_at ]`, `[ automation, last_modified_at ]`, `[ workspace_id, automation ]`, `[ workspace_id, disabled, last_modified_at ]`, `[ disabled, automation, last_modified_at ]`, `[ workspace_id, disabled, automation ]`, `[ workspace_id, automation, last_modified_at ]` or `[ workspace_id, disabled, automation, last_modified_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `last_modified_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `last_modified_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `last_modified_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `last_modified_at`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/automations', 'GET', params, options)

    return response?.data?.map(obj => new Automation(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Automation.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Automation.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Automation ID.
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

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Automation(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Automation.find(id, params, options)

  static getAuthoringSchema = async (options = {}) => {
    const response = await Api.sendRequest('/automations/authoring_schema', 'GET', {}, options)

    const AutomationAuthoringSchema = require('./AutomationAuthoringSchema.js').default
    return new AutomationAuthoringSchema(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   source - string - Source path/glob.  See Automation docs for exact description, but this is used to filter for files in the `path` to find files to operate on. Supports globs, except on remote mounts.
  //   destinations - array(string) - A list of destination paths. Use a trailing slash for folder destinations and omit it for file destinations.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs, except on remote mounts.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule_id - int64 - If trigger is `custom_schedule`, the reusable Schedule used instead of the automation's schedule fields.
  //   schedule_days_of_week - array(int64) - If trigger is `custom_schedule` without `schedule_id`, a list of days of the week to run this automation. 0 is Sunday, 1 is Monday, etc.
  //   schedule_times_of_day - array(string) - Times of day to run in HH:MM format (24-hour). Required for `custom_schedule` without `schedule_id`. Optional for `daily` triggers; if not set, runs at midnight UTC.
  //   schedule_time_zone - string - Time zone for schedule fields. Optional for `custom_schedule` without `schedule_id` and for `daily`. If not set, times are interpreted as UTC.
  //   holiday_region - string - Skip automation on holidays in this region. Optional for `custom_schedule` without `schedule_id` and for `daily`.
  //   always_overwrite_size_matching_files - boolean - Ordinarily, files with identical size in the source and destination will be skipped from copy operations to prevent wasted transfer.  If this flag is `true` we will overwrite the destination file always.  Note that this may cause large amounts of wasted transfer usage.  This setting has no effect unless `overwrite_files` is also set to `true`.
  //   always_serialize_jobs - boolean - Ordinarily, we will allow automation runs to run in parallel for non-scheduled automations. If this flag is `true` we will force automation runs to be serialized (run one at a time, one after another). This can resolve some issues with race conditions on remote systems at the cost of some performance.
  //   description - string - Description for the this Automation.
  //   definition - object - Automation v2 graph definition.
  //   disabled - boolean - If true, this automation will not run.
  //   exclude_pattern - string - If set, this glob pattern will exclude files from the automation. Supports globs, except on remote mounts.
  //   import_urls - array(object) - List of URLs to be imported and names to be used.
  //   flatten_destination_structure - boolean - Normally copy and move automations that use globs will implicitly preserve the source folder structure in the destination.  If this flag is `true`, the source folder structure will be flattened in the destination.  This is useful for copying or moving files from multiple folders into a single destination folder.
  //   ignore_locked_folders - boolean - If true, the Lock Folders behavior will be disregarded for automated actions.
  //   legacy_folder_matching - boolean - DEPRECATED: If `true`, use the legacy behavior for this automation, where it can operate on folders in addition to just files.  This behavior no longer works and should not be used.
  //   name - string - Name for this automation.
  //   overwrite_files - boolean - If true, existing files will be overwritten with new files on Move/Copy automations.  Note: by default files will not be overwritten on Copy automations if they appear to be the same file size as the newly incoming file.  Use the `always_overwrite_size_matching_files` option in conjunction with `overwrite_files` to override this behavior and overwrite files no matter what.
  //   path_time_zone - string - Timezone to use when rendering timestamps in paths.
  //   retry_on_failure_interval_in_minutes - int64 - If the Automation fails, retry at this interval (in minutes).  Acceptable values are 5 through 1440 (one day).  Set to null to disable.
  //   retry_on_failure_number_of_attempts - int64 - If the Automation fails, retry at most this many times.  Maximum allowed value: 10.  Set to null to disable.
  //   trigger - string - How this automation is triggered to run.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, copy, move, archived_delete, update, read, destroy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   recurring_days - array(int64) - If trigger type is `daily`, this specifies one or more day numbers to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation (required) - string - Automation type
  //   workspace_id - int64 - Workspace ID
  static create = async (params = {}, options = {}) => {
    if (!params.automation) {
      throw new errors.MissingParameterError('Parameter missing: automation')
    }

    if (params.source !== undefined && params.source !== null && !isString(params.source)) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params.source)}`)
    }

    if (params.destinations !== undefined && params.destinations !== null && !isArray(params.destinations)) {
      throw new errors.InvalidParameterError(`Bad parameter: destinations must be of type Array, received ${getType(params.destinations)}`)
    }

    if (params.destination_replace_from !== undefined && params.destination_replace_from !== null && !isString(params.destination_replace_from)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_from must be of type String, received ${getType(params.destination_replace_from)}`)
    }

    if (params.destination_replace_to !== undefined && params.destination_replace_to !== null && !isString(params.destination_replace_to)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_to must be of type String, received ${getType(params.destination_replace_to)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isString(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params.interval)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.sync_ids !== undefined && params.sync_ids !== null && !isString(params.sync_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_ids must be of type String, received ${getType(params.sync_ids)}`)
    }

    if (params.user_ids !== undefined && params.user_ids !== null && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
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

    if (isArray(params.always_overwrite_size_matching_files) || isObject(params.always_overwrite_size_matching_files)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_overwrite_size_matching_files must be of type Boolean, received ${getType(params.always_overwrite_size_matching_files)}`)
    }

    if (isArray(params.always_serialize_jobs) || isObject(params.always_serialize_jobs)) {
      throw new errors.InvalidParameterError(`Bad parameter: always_serialize_jobs must be of type Boolean, received ${getType(params.always_serialize_jobs)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (isArray(params.disabled) || isObject(params.disabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: disabled must be of type Boolean, received ${getType(params.disabled)}`)
    }

    if (params.exclude_pattern !== undefined && params.exclude_pattern !== null && !isString(params.exclude_pattern)) {
      throw new errors.InvalidParameterError(`Bad parameter: exclude_pattern must be of type String, received ${getType(params.exclude_pattern)}`)
    }

    if (params.import_urls !== undefined && params.import_urls !== null && !isArray(params.import_urls)) {
      throw new errors.InvalidParameterError(`Bad parameter: import_urls must be of type Array, received ${getType(params.import_urls)}`)
    }

    if (isArray(params.flatten_destination_structure) || isObject(params.flatten_destination_structure)) {
      throw new errors.InvalidParameterError(`Bad parameter: flatten_destination_structure must be of type Boolean, received ${getType(params.flatten_destination_structure)}`)
    }

    if (isArray(params.ignore_locked_folders) || isObject(params.ignore_locked_folders)) {
      throw new errors.InvalidParameterError(`Bad parameter: ignore_locked_folders must be of type Boolean, received ${getType(params.ignore_locked_folders)}`)
    }

    if (isArray(params.legacy_folder_matching) || isObject(params.legacy_folder_matching)) {
      throw new errors.InvalidParameterError(`Bad parameter: legacy_folder_matching must be of type Boolean, received ${getType(params.legacy_folder_matching)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (isArray(params.overwrite_files) || isObject(params.overwrite_files)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite_files must be of type Boolean, received ${getType(params.overwrite_files)}`)
    }

    if (params.path_time_zone !== undefined && params.path_time_zone !== null && !isString(params.path_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_time_zone must be of type String, received ${getType(params.path_time_zone)}`)
    }

    if (params.retry_on_failure_interval_in_minutes !== undefined && params.retry_on_failure_interval_in_minutes !== null && !isInt(params.retry_on_failure_interval_in_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: retry_on_failure_interval_in_minutes must be of type Int, received ${getType(params.retry_on_failure_interval_in_minutes)}`)
    }

    if (params.retry_on_failure_number_of_attempts !== undefined && params.retry_on_failure_number_of_attempts !== null && !isInt(params.retry_on_failure_number_of_attempts)) {
      throw new errors.InvalidParameterError(`Bad parameter: retry_on_failure_number_of_attempts must be of type Int, received ${getType(params.retry_on_failure_number_of_attempts)}`)
    }

    if (params.trigger !== undefined && params.trigger !== null && !isString(params.trigger)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params.trigger)}`)
    }

    if (params.trigger_actions !== undefined && params.trigger_actions !== null && !isArray(params.trigger_actions)) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params.trigger_actions)}`)
    }

    if (params.recurring_day !== undefined && params.recurring_day !== null && !isInt(params.recurring_day)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params.recurring_day)}`)
    }

    if (params.recurring_days !== undefined && params.recurring_days !== null && !isArray(params.recurring_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_days must be of type Array, received ${getType(params.recurring_days)}`)
    }

    if (params.automation !== undefined && params.automation !== null && !isString(params.automation)) {
      throw new errors.InvalidParameterError(`Bad parameter: automation must be of type String, received ${getType(params.automation)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/automations', 'POST', params, options)

    return new Automation(response?.data, retainedOptions(options))
  }
}

export default Automation

module.exports = Automation
module.exports.default = Automation
