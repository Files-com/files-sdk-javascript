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
 * Class UserLifecycleRule
 */
class UserLifecycleRule {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # User Lifecycle Rule ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO authentication method with one rule.
  getAuthenticationMethod = () => this.attributes.authentication_method

  setAuthenticationMethod = value => {
    this.attributes.authentication_method = value
    exposeAttributes(this, ['authentication_method'])
  }

  // array(int64) # Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users.
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
    exposeAttributes(this, ['group_ids'])
  }

  // string # Action to take on inactive users (disable or delete)
  getAction = () => this.attributes.action

  setAction = value => {
    this.attributes.action = value
    exposeAttributes(this, ['action'])
  }

  // int64 # Number of days of inactivity before the rule applies
  getInactivityDays = () => this.attributes.inactivity_days

  setInactivityDays = value => {
    this.attributes.inactivity_days = value
    exposeAttributes(this, ['inactivity_days'])
  }

  // boolean # If true, the rule will apply to folder admins.
  getIncludeFolderAdmins = () => this.attributes.include_folder_admins

  setIncludeFolderAdmins = value => {
    this.attributes.include_folder_admins = value
    exposeAttributes(this, ['include_folder_admins'])
  }

  // boolean # If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled when `workspace_id` is `0`.
  getIncludeSiteAdmins = () => this.attributes.include_site_admins

  setIncludeSiteAdmins = value => {
    this.attributes.include_site_admins = value
    exposeAttributes(this, ['include_site_admins'])
  }

  // boolean # If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when `workspace_id` is `0`.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
    exposeAttributes(this, ['apply_to_all_workspaces'])
  }

  // string # User Lifecycle Rule name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // boolean # If true, users will be emailed before the rule disables or deletes them.
  getNotifyUsers = () => this.attributes.notify_users

  setNotifyUsers = value => {
    this.attributes.notify_users = value
    exposeAttributes(this, ['notify_users'])
  }

  // string # If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  getPartnerTag = () => this.attributes.partner_tag

  setPartnerTag = value => {
    this.attributes.partner_tag = value
    exposeAttributes(this, ['partner_tag'])
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
    exposeAttributes(this, ['site_id'])
  }

  // int64 # Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only to users who belong to that Workspace, regardless of access granted to other users.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # State of the users to apply the rule to (inactive or disabled)
  getUserState = () => this.attributes.user_state

  setUserState = value => {
    this.attributes.user_state = value
    exposeAttributes(this, ['user_state'])
  }

  // string # If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  getUserTag = () => this.attributes.user_tag

  setUserTag = value => {
    this.attributes.user_tag = value
    exposeAttributes(this, ['user_tag'])
  }

  // Parameters:
  //   action - string - Action to take on inactive users (disable or delete)
  //   apply_to_all_workspaces - boolean - If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when `workspace_id` is `0`.
  //   authentication_method - string - User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO authentication method with one rule.
  //   group_ids - array(int64) - Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users.
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies
  //   include_site_admins - boolean - If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled when `workspace_id` is `0`.
  //   include_folder_admins - boolean - If true, the rule will apply to folder admins.
  //   name - string - User Lifecycle Rule name
  //   notify_users - boolean - If true, users will be emailed before the rule disables or deletes them.
  //   partner_tag - string - If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  //   user_state - string - State of the users to apply the rule to (inactive or disabled)
  //   user_tag - string - If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  //   workspace_id - int64 - Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only to users who belong to that Workspace, regardless of access granted to other users.
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

    if (params.action !== undefined && params.action !== null && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.authentication_method !== undefined && params.authentication_method !== null && !isString(params.authentication_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params.authentication_method)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isArray(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type Array, received ${getType(params.group_ids)}`)
    }

    if (params.inactivity_days !== undefined && params.inactivity_days !== null && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (isArray(params.include_site_admins) || isObject(params.include_site_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_site_admins must be of type Boolean, received ${getType(params.include_site_admins)}`)
    }

    if (isArray(params.include_folder_admins) || isObject(params.include_folder_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_folder_admins must be of type Boolean, received ${getType(params.include_folder_admins)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (isArray(params.notify_users) || isObject(params.notify_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_users must be of type Boolean, received ${getType(params.notify_users)}`)
    }

    if (params.partner_tag !== undefined && params.partner_tag !== null && !isString(params.partner_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_tag must be of type String, received ${getType(params.partner_tag)}`)
    }

    if (params.user_state !== undefined && params.user_state !== null && !isString(params.user_state)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_state must be of type String, received ${getType(params.user_state)}`)
    }

    if (params.user_tag !== undefined && params.user_tag !== null && !isString(params.user_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_tag must be of type String, received ${getType(params.user_tag)}`)
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

    const response = await Api.sendRequest(`/user_lifecycle_rules/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/user_lifecycle_rules/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await UserLifecycleRule.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id` and `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/user_lifecycle_rules', 'GET', params, options)

    return response?.data?.map(obj => new UserLifecycleRule(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    UserLifecycleRule.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      UserLifecycleRule.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - User Lifecycle Rule ID.
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

    const response = await Api.sendRequest(`/user_lifecycle_rules/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new UserLifecycleRule(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    UserLifecycleRule.find(id, params, options)

  // Parameters:
  //   action - string - Action to take on inactive users (disable or delete)
  //   apply_to_all_workspaces - boolean - If true, a Default Workspace rule also applies to users in all Custom Workspaces. Can only be enabled when `workspace_id` is `0`.
  //   authentication_method - string - User authentication method for which the rule will apply. Use `all_non_sso` to target every non-SSO authentication method with one rule.
  //   group_ids - array(int64) - Array of Group IDs to which the rule applies. If empty or not set, the rule applies to all users.
  //   inactivity_days - int64 - Number of days of inactivity before the rule applies
  //   include_site_admins - boolean - If true, the rule includes Site Administrators, who always belong to the Default Workspace. Can only be enabled when `workspace_id` is `0`.
  //   include_folder_admins - boolean - If true, the rule will apply to folder admins.
  //   name - string - User Lifecycle Rule name
  //   notify_users - boolean - If true, users will be emailed before the rule disables or deletes them.
  //   partner_tag - string - If provided, only users belonging to Partners with this tag at the Partner level will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  //   user_state - string - State of the users to apply the rule to (inactive or disabled)
  //   user_tag - string - If provided, only users with this tag will be affected by the rule. Tags must only contain lowercase letters, numbers, and hyphens.
  //   workspace_id - int64 - Workspace whose users the rule applies to. `0` means the Default Workspace. A Custom Workspace rule applies only to users who belong to that Workspace, regardless of access granted to other users.
  static create = async (params = {}, options = {}) => {
    if (params.action !== undefined && params.action !== null && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.authentication_method !== undefined && params.authentication_method !== null && !isString(params.authentication_method)) {
      throw new errors.InvalidParameterError(`Bad parameter: authentication_method must be of type String, received ${getType(params.authentication_method)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isArray(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type Array, received ${getType(params.group_ids)}`)
    }

    if (params.inactivity_days !== undefined && params.inactivity_days !== null && !isInt(params.inactivity_days)) {
      throw new errors.InvalidParameterError(`Bad parameter: inactivity_days must be of type Int, received ${getType(params.inactivity_days)}`)
    }

    if (isArray(params.include_site_admins) || isObject(params.include_site_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_site_admins must be of type Boolean, received ${getType(params.include_site_admins)}`)
    }

    if (isArray(params.include_folder_admins) || isObject(params.include_folder_admins)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_folder_admins must be of type Boolean, received ${getType(params.include_folder_admins)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (isArray(params.notify_users) || isObject(params.notify_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: notify_users must be of type Boolean, received ${getType(params.notify_users)}`)
    }

    if (params.partner_tag !== undefined && params.partner_tag !== null && !isString(params.partner_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_tag must be of type String, received ${getType(params.partner_tag)}`)
    }

    if (params.user_state !== undefined && params.user_state !== null && !isString(params.user_state)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_state must be of type String, received ${getType(params.user_state)}`)
    }

    if (params.user_tag !== undefined && params.user_tag !== null && !isString(params.user_tag)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_tag must be of type String, received ${getType(params.user_tag)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/user_lifecycle_rules', 'POST', params, options)

    return new UserLifecycleRule(response?.data, retainedOptions(options))
  }
}

export default UserLifecycleRule

module.exports = UserLifecycleRule
module.exports.default = UserLifecycleRule
