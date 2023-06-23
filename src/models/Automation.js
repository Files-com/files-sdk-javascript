import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

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

  // boolean # If true, this automation will not run.
  getDisabled = () => this.attributes.disabled

  setDisabled = value => {
    this.attributes.disabled = value
  }

  // string # How this automation is triggered to run. One of: `realtime`, `daily`, `custom_schedule`, `webhook`, `email`, or `action`.
  getTrigger = () => this.attributes.trigger

  setTrigger = value => {
    this.attributes.trigger = value
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

  // string # Name for this automation.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // object # If trigger is `custom_schedule`, Custom schedule description for when the automation should be run.
  getSchedule = () => this.attributes.schedule

  setSchedule = value => {
    this.attributes.schedule = value
  }

  // string # Source Path
  getSource = () => this.attributes.source

  setSource = value => {
    this.attributes.source = value
  }

  // array # Destination Path
  getDestinations = () => this.attributes.destinations

  setDestinations = value => {
    this.attributes.destinations = value
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

  // string # Description for the this Automation.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // int64 # If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  getRecurringDay = () => this.attributes.recurring_day

  setRecurringDay = value => {
    this.attributes.recurring_day = value
  }

  // string # Path on which this Automation runs.  Supports globs. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # User ID of the Automation's creator.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // array # IDs of remote sync folder behaviors to run by this Automation
  getSyncIds = () => this.attributes.sync_ids

  setSyncIds = value => {
    this.attributes.sync_ids = value
  }

  // array # IDs of Users for the Automation (i.e. who to Request File from)
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
  }

  // array # IDs of Groups for the Automation (i.e. who to Request File from)
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
  }

  // string # If trigger is `webhook`, this is the URL of the webhook to trigger the Automation.
  getWebhookUrl = () => this.attributes.webhook_url

  setWebhookUrl = value => {
    this.attributes.webhook_url = value
  }

  // array # If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  getTriggerActions = () => this.attributes.trigger_actions

  setTriggerActions = value => {
    this.attributes.trigger_actions = value
  }

  // object # A Hash of attributes specific to the automation type.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
  }

  // string # DEPRECATED: Destination Path. Use `destinations` instead.
  getDestination = () => this.attributes.destination

  setDestination = value => {
    this.attributes.destination = value
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
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params['id'])}/manual_run`, 'POST', params, this.options)

    return response?.data
  }

  // Parameters:
  //   source - string - Source Path
  //   destination - string - DEPRECATED: Destination Path. Use `destinations` instead.
  //   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule - object - Custom schedule for running this automation.
  //   description - string - Description for the this Automation.
  //   disabled - boolean - If true, this automation will not run.
  //   name - string - Name for this automation.
  //   trigger - string - How this automation is triggered to run. One of: `realtime`, `daily`, `custom_schedule`, `webhook`, `email`, or `action`.
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
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['source'] && !isString(params['source'])) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(source)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }
    if (params['destinations'] && !isArray(params['destinations'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destinations must be of type Array, received ${getType(destinations)}`)
    }
    if (params['destination_replace_from'] && !isString(params['destination_replace_from'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_from must be of type String, received ${getType(destination_replace_from)}`)
    }
    if (params['destination_replace_to'] && !isString(params['destination_replace_to'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_to must be of type String, received ${getType(destination_replace_to)}`)
    }
    if (params['interval'] && !isString(params['interval'])) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(interval)}`)
    }
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['sync_ids'] && !isString(params['sync_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_ids must be of type String, received ${getType(sync_ids)}`)
    }
    if (params['user_ids'] && !isString(params['user_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(user_ids)}`)
    }
    if (params['group_ids'] && !isString(params['group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(group_ids)}`)
    }
    if (params['description'] && !isString(params['description'])) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(description)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['trigger'] && !isString(params['trigger'])) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(trigger)}`)
    }
    if (params['trigger_actions'] && !isArray(params['trigger_actions'])) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(trigger_actions)}`)
    }
    if (params['recurring_day'] && !isInt(params['recurring_day'])) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(recurring_day)}`)
    }
    if (params['automation'] && !isString(params['automation'])) {
      throw new errors.InvalidParameterError(`Bad parameter: automation must be of type String, received ${getType(automation)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

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
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Automation.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[automation]=desc`). Valid fields are `automation`, `disabled`, `last_modified_at` or `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `disabled`, `last_modified_at` or `automation`. Valid field combinations are `[ automation, disabled ]` and `[ disabled, automation ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `last_modified_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `last_modified_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `last_modified_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `last_modified_at`.
  //   with_deleted - boolean - Set to true to include deleted automations in the results.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/automations`, 'GET', params, options)

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

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/automations/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Automation(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Automation.find(id, params, options)

  // Parameters:
  //   source - string - Source Path
  //   destination - string - DEPRECATED: Destination Path. Use `destinations` instead.
  //   destinations - array(string) - A list of String destination paths or Hash of folder_path and optional file_path.
  //   destination_replace_from - string - If set, this string in the destination path will be replaced with the value in `destination_replace_to`.
  //   destination_replace_to - string - If set, this string will replace the value `destination_replace_from` in the destination filename. You can use special patterns here.
  //   interval - string - How often to run this automation? One of: `day`, `week`, `week_end`, `month`, `month_end`, `quarter`, `quarter_end`, `year`, `year_end`
  //   path - string - Path on which this Automation runs.  Supports globs.
  //   sync_ids - string - A list of sync IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   user_ids - string - A list of user IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   group_ids - string - A list of group IDs the automation is associated with. If sent as a string, it should be comma-delimited.
  //   schedule - object - Custom schedule for running this automation.
  //   description - string - Description for the this Automation.
  //   disabled - boolean - If true, this automation will not run.
  //   name - string - Name for this automation.
  //   trigger - string - How this automation is triggered to run. One of: `realtime`, `daily`, `custom_schedule`, `webhook`, `email`, or `action`.
  //   trigger_actions - array(string) - If trigger is `action`, this is the list of action types on which to trigger the automation. Valid actions are create, read, update, destroy, move, copy
  //   value - object - A Hash of attributes specific to the automation type.
  //   recurring_day - int64 - If trigger type is `daily`, this specifies a day number to run in one of the supported intervals: `week`, `month`, `quarter`, `year`.
  //   automation (required) - string - Automation type
  static create = async (params = {}, options = {}) => {
    if (!params['automation']) {
      throw new errors.MissingParameterError('Parameter missing: automation')
    }

    if (params['source'] && !isString(params['source'])) {
      throw new errors.InvalidParameterError(`Bad parameter: source must be of type String, received ${getType(params['source'])}`)
    }

    if (params['destination'] && !isString(params['destination'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params['destination'])}`)
    }

    if (params['destinations'] && !isArray(params['destinations'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destinations must be of type Array, received ${getType(params['destinations'])}`)
    }

    if (params['destination_replace_from'] && !isString(params['destination_replace_from'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_from must be of type String, received ${getType(params['destination_replace_from'])}`)
    }

    if (params['destination_replace_to'] && !isString(params['destination_replace_to'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_replace_to must be of type String, received ${getType(params['destination_replace_to'])}`)
    }

    if (params['interval'] && !isString(params['interval'])) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type String, received ${getType(params['interval'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['sync_ids'] && !isString(params['sync_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_ids must be of type String, received ${getType(params['sync_ids'])}`)
    }

    if (params['user_ids'] && !isString(params['user_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params['user_ids'])}`)
    }

    if (params['group_ids'] && !isString(params['group_ids'])) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params['group_ids'])}`)
    }

    if (params['description'] && !isString(params['description'])) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params['description'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['trigger'] && !isString(params['trigger'])) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger must be of type String, received ${getType(params['trigger'])}`)
    }

    if (params['trigger_actions'] && !isArray(params['trigger_actions'])) {
      throw new errors.InvalidParameterError(`Bad parameter: trigger_actions must be of type Array, received ${getType(params['trigger_actions'])}`)
    }

    if (params['recurring_day'] && !isInt(params['recurring_day'])) {
      throw new errors.InvalidParameterError(`Bad parameter: recurring_day must be of type Int, received ${getType(params['recurring_day'])}`)
    }

    if (params['automation'] && !isString(params['automation'])) {
      throw new errors.InvalidParameterError(`Bad parameter: automation must be of type String, received ${getType(params['automation'])}`)
    }

    const response = await Api.sendRequest(`/automations`, 'POST', params, options)

    return new Automation(response?.data, options)
  }
}

export default Automation
