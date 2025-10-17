/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class UserLifecycleRule
 */
class UserLifecycleRule {
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

  // int64 # User Lifecycle Rule ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # User authentication method for which the rule will apply.
  getAuthenticationMethod = () => this.attributes.authentication_method

  setAuthenticationMethod = value => {
    this.attributes.authentication_method = value
  }

  // array(int64) # Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users.
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
  }

  // string # Action to take on inactive users (disable or delete)
  getAction = () => this.attributes.action

  setAction = value => {
    this.attributes.action = value
  }

  // int64 # Number of days of inactivity before the rule applies
  getInactivityDays = () => this.attributes.inactivity_days

  setInactivityDays = value => {
    this.attributes.inactivity_days = value
  }

  // boolean # If true, the rule will apply to folder admins.
  getIncludeFolderAdmins = () => this.attributes.include_folder_admins

  setIncludeFolderAdmins = value => {
    this.attributes.include_folder_admins = value
  }

  // boolean # If true, the rule will apply to site admins.
  getIncludeSiteAdmins = () => this.attributes.include_site_admins

  setIncludeSiteAdmins = value => {
    this.attributes.include_site_admins = value
  }

  // string # User Lifecycle Rule name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  getPartnerTag = () => this.attributes.partner_tag

  setPartnerTag = value => {
    this.attributes.partner_tag = value
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
  }

  // string # State of the users to apply the rule to (inactive or disabled)
  getUserState = () => this.attributes.user_state

  setUserState = value => {
    this.attributes.user_state = value
  }

  // string # If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  getUserTag = () => this.attributes.user_tag

  setUserTag = value => {
    this.attributes.user_tag = value
  }

  // Parameters:
  //   action - string - Action to take on inactive users (disable or delete)
  //   authentication_method - string - User authentication method for which the rule will apply.
  //   group_ids - array(int64) - Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users.
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies
  //   include_site_admins - boolean - If true, the rule will apply to site admins.
  //   include_folder_admins - boolean - If true, the rule will apply to folder admins.
  //   name - string - User Lifecycle Rule name
  //   partner_tag - string - If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  //   user_state - string - State of the users to apply the rule to (inactive or disabled)
  //   user_tag - string - If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
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

    if (params.action && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.authentication_method && !isString(params.authentication_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params.authentication_method)}`)
    }

    if (params.group_ids && !isArray(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type Array, received ${getType(params.group_ids)}`)
    }

    if (params.inactivity_days && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.partner_tag && !isString(params.partner_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_tag must be of type String, received ${getType(params.partner_tag)}`)
    }

    if (params.user_state && !isString(params.user_state)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_state must be of type String, received ${getType(params.user_state)}`)
    }

    if (params.user_tag && !isString(params.user_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_tag must be of type String, received ${getType(params.user_tag)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/user_lifecycle_rules/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new UserLifecycleRule(response?.data, this.options)
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

    await Api.sendRequest(`/user_lifecycle_rules/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await UserLifecycleRule.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/user_lifecycle_rules', 'GET', params, options)

    return response?.data?.map(obj => new UserLifecycleRule(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserLifecycleRule.list(params, options)

  // Parameters:
  //   id (required) - int64 - User Lifecycle Rule ID.
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

    const response = await Api.sendRequest(`/user_lifecycle_rules/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new UserLifecycleRule(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    UserLifecycleRule.find(id, params, options)

  // Parameters:
  //   action - string - Action to take on inactive users (disable or delete)
  //   authentication_method - string - User authentication method for which the rule will apply.
  //   group_ids - array(int64) - Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users.
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies
  //   include_site_admins - boolean - If true, the rule will apply to site admins.
  //   include_folder_admins - boolean - If true, the rule will apply to folder admins.
  //   name - string - User Lifecycle Rule name
  //   partner_tag - string - If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  //   user_state - string - State of the users to apply the rule to (inactive or disabled)
  //   user_tag - string - If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  static create = async (params = {}, options = {}) => {
    if (params.action && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.authentication_method && !isString(params.authentication_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params.authentication_method)}`)
    }

    if (params.group_ids && !isArray(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type Array, received ${getType(params.group_ids)}`)
    }

    if (params.inactivity_days && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.partner_tag && !isString(params.partner_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_tag must be of type String, received ${getType(params.partner_tag)}`)
    }

    if (params.user_state && !isString(params.user_state)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_state must be of type String, received ${getType(params.user_state)}`)
    }

    if (params.user_tag && !isString(params.user_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_tag must be of type String, received ${getType(params.user_tag)}`)
    }

    const response = await Api.sendRequest('/user_lifecycle_rules', 'POST', params, options)

    return new UserLifecycleRule(response?.data, options)
  }
}

export default UserLifecycleRule

module.exports = UserLifecycleRule
module.exports.default = UserLifecycleRule
