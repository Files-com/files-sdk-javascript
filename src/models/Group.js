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
 * Class Group
 */
class Group {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Group ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Group name
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # A list of allowed IPs if applicable.  Newline delimited
  getAllowedIps = () => this.attributes.allowed_ips

  setAllowedIps = value => {
    this.attributes.allowed_ips = value
    exposeAttributes(this, ['allowed_ips'])
  }

  // string # Comma-delimited list of user IDs who are group administrators (separated by commas)
  getAdminIds = () => this.attributes.admin_ids

  setAdminIds = value => {
    this.attributes.admin_ids = value
    exposeAttributes(this, ['admin_ids'])
  }

  // string # Notes about this group
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
    exposeAttributes(this, ['notes'])
  }

  // string # Comma-delimited list of user IDs who belong to this group (separated by commas)
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
    exposeAttributes(this, ['user_ids'])
  }

  // string # Comma-delimited list of usernames who belong to this group (separated by commas)
  getUsernames = () => this.attributes.usernames

  setUsernames = value => {
    this.attributes.usernames = value
    exposeAttributes(this, ['usernames'])
  }

  // int64 # AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user or Partner assignment overrides it.
  getAiAssistantPersonalityId = () => this.attributes.ai_assistant_personality_id

  setAiAssistantPersonalityId = value => {
    this.attributes.ai_assistant_personality_id = value
    exposeAttributes(this, ['ai_assistant_personality_id'])
  }

  // boolean # If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  getFtpPermission = () => this.attributes.ftp_permission

  setFtpPermission = value => {
    this.attributes.ftp_permission = value
    exposeAttributes(this, ['ftp_permission'])
  }

  // boolean # If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  getSftpPermission = () => this.attributes.sftp_permission

  setSftpPermission = value => {
    this.attributes.sftp_permission = value
    exposeAttributes(this, ['sftp_permission'])
  }

  // boolean # If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  getDavPermission = () => this.attributes.dav_permission

  setDavPermission = value => {
    this.attributes.dav_permission = value
    exposeAttributes(this, ['dav_permission'])
  }

  // boolean # If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
  getRestapiPermission = () => this.attributes.restapi_permission

  setRestapiPermission = value => {
    this.attributes.restapi_permission = value
    exposeAttributes(this, ['restapi_permission'])
  }

  // boolean # If true, users in this group can access the S3-compatible endpoint. This will override a false value of `s3_compatible_endpoint_permission` on the user level. Defaults to false.
  getS3CompatibleEndpointPermission = () => this.attributes.s3_compatible_endpoint_permission

  setS3CompatibleEndpointPermission = value => {
    this.attributes.s3_compatible_endpoint_permission = value
    exposeAttributes(this, ['s3_compatible_endpoint_permission'])
  }

  // int64 # Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  getDesktopConfigurationProfileId = () => this.attributes.desktop_configuration_profile_id

  setDesktopConfigurationProfileId = value => {
    this.attributes.desktop_configuration_profile_id = value
    exposeAttributes(this, ['desktop_configuration_profile_id'])
  }

  // int64 # Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  getIntegrationCentricProfileId = () => this.attributes.integration_centric_profile_id

  setIntegrationCentricProfileId = value => {
    this.attributes.integration_centric_profile_id = value
    exposeAttributes(this, ['integration_centric_profile_id'])
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
    exposeAttributes(this, ['site_id'])
  }

  // int64 # Workspace ID
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // Parameters:
  //   notes - string - Group notes.
  //   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
  //   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user or Partner assignment overrides it.
  //   ftp_permission - boolean - If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  //   sftp_permission - boolean - If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  //   dav_permission - boolean - If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  //   restapi_permission - boolean - If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
  //   s3_compatible_endpoint_permission - boolean - If true, users in this group can access the S3-compatible endpoint. This will override a false value of `s3_compatible_endpoint_permission` on the user level. Defaults to false.
  //   desktop_configuration_profile_id - int64 - Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  //   integration_centric_profile_id - int64 - Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   name - string - Group name.
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

    if (params.notes !== undefined && params.notes !== null && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (params.user_ids !== undefined && params.user_ids !== null && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.admin_ids !== undefined && params.admin_ids !== null && !isString(params.admin_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: admin_ids must be of type String, received ${getType(params.admin_ids)}`)
    }

    if (params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !isInt(params.ai_assistant_personality_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ai_assistant_personality_id must be of type Int, received ${getType(params.ai_assistant_personality_id)}`)
    }

    if (isArray(params.ftp_permission) || isObject(params.ftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: ftp_permission must be of type Boolean, received ${getType(params.ftp_permission)}`)
    }

    if (isArray(params.sftp_permission) || isObject(params.sftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_permission must be of type Boolean, received ${getType(params.sftp_permission)}`)
    }

    if (isArray(params.dav_permission) || isObject(params.dav_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: dav_permission must be of type Boolean, received ${getType(params.dav_permission)}`)
    }

    if (isArray(params.restapi_permission) || isObject(params.restapi_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: restapi_permission must be of type Boolean, received ${getType(params.restapi_permission)}`)
    }

    if (isArray(params.s3_compatible_endpoint_permission) || isObject(params.s3_compatible_endpoint_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint_permission must be of type Boolean, received ${getType(params.s3_compatible_endpoint_permission)}`)
    }

    if (params.desktop_configuration_profile_id !== undefined && params.desktop_configuration_profile_id !== null && !isInt(params.desktop_configuration_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_configuration_profile_id must be of type Int, received ${getType(params.desktop_configuration_profile_id)}`)
    }

    if (params.integration_centric_profile_id !== undefined && params.integration_centric_profile_id !== null && !isInt(params.integration_centric_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: integration_centric_profile_id must be of type Int, received ${getType(params.integration_centric_profile_id)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/groups/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/groups/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Group.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `workspace_id` or `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and `workspace_id`. Valid field combinations are `[ workspace_id, name ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
  //   ids - string - Comma-separated list of group ids to include in results.
  //   include_parent_site_groups - boolean - Include groups from the parent site.
  //   include_default_workspace_groups - boolean - When scoped to a Custom Workspace, include Default Workspace groups that have permissions in that Workspace. Available to Site Administrators, and to Workspace Administrators and Folder Admins in that Workspace when the site shares its Default Workspace directory with Workspaces.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.ids !== undefined && params.ids !== null && !isString(params.ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: ids must be of type String, received ${getType(params.ids)}`)
    }

    if (isArray(params.include_parent_site_groups) || isObject(params.include_parent_site_groups)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_parent_site_groups must be of type Boolean, received ${getType(params.include_parent_site_groups)}`)
    }

    if (isArray(params.include_default_workspace_groups) || isObject(params.include_default_workspace_groups)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_default_workspace_groups must be of type Boolean, received ${getType(params.include_default_workspace_groups)}`)
    }

    const response = await Api.sendRequest('/groups', 'GET', params, options)

    return response?.data?.map(obj => new Group(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Group.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Group.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Group ID.
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

    const response = await Api.sendRequest(`/groups/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Group(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Group.find(id, params, options)

  // Parameters:
  //   notes - string - Group notes.
  //   user_ids - string - A list of user ids. If sent as a string, should be comma-delimited.
  //   admin_ids - string - A list of group admin user ids. If sent as a string, should be comma-delimited.
  //   ai_assistant_personality_id - int64 - AI Assistant Personality ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user or Partner assignment overrides it.
  //   ftp_permission - boolean - If true, users in this group can use FTP to login.  This will override a false value of `ftp_permission` on the user level.
  //   sftp_permission - boolean - If true, users in this group can use SFTP to login.  This will override a false value of `sftp_permission` on the user level.
  //   dav_permission - boolean - If true, users in this group can use WebDAV to login.  This will override a false value of `dav_permission` on the user level.
  //   restapi_permission - boolean - If true, users in this group can use the REST API to login.  This will override a false value of `restapi_permission` on the user level.
  //   s3_compatible_endpoint_permission - boolean - If true, users in this group can access the S3-compatible endpoint. This will override a false value of `s3_compatible_endpoint_permission` on the user level. Defaults to false.
  //   desktop_configuration_profile_id - int64 - Desktop Configuration Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  //   integration_centric_profile_id - int64 - Integration Centric Profile ID assigned to this Group, if any. Users in the Group inherit it unless a direct per-user assignment overrides it.
  //   allowed_ips - string - A list of allowed IPs if applicable.  Newline delimited
  //   name (required) - string - Group name.
  //   workspace_id - int64 - Workspace ID
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.notes !== undefined && params.notes !== null && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (params.user_ids !== undefined && params.user_ids !== null && !isString(params.user_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_ids must be of type String, received ${getType(params.user_ids)}`)
    }

    if (params.admin_ids !== undefined && params.admin_ids !== null && !isString(params.admin_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: admin_ids must be of type String, received ${getType(params.admin_ids)}`)
    }

    if (params.ai_assistant_personality_id !== undefined && params.ai_assistant_personality_id !== null && !isInt(params.ai_assistant_personality_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ai_assistant_personality_id must be of type Int, received ${getType(params.ai_assistant_personality_id)}`)
    }

    if (isArray(params.ftp_permission) || isObject(params.ftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: ftp_permission must be of type Boolean, received ${getType(params.ftp_permission)}`)
    }

    if (isArray(params.sftp_permission) || isObject(params.sftp_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: sftp_permission must be of type Boolean, received ${getType(params.sftp_permission)}`)
    }

    if (isArray(params.dav_permission) || isObject(params.dav_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: dav_permission must be of type Boolean, received ${getType(params.dav_permission)}`)
    }

    if (isArray(params.restapi_permission) || isObject(params.restapi_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: restapi_permission must be of type Boolean, received ${getType(params.restapi_permission)}`)
    }

    if (isArray(params.s3_compatible_endpoint_permission) || isObject(params.s3_compatible_endpoint_permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: s3_compatible_endpoint_permission must be of type Boolean, received ${getType(params.s3_compatible_endpoint_permission)}`)
    }

    if (params.desktop_configuration_profile_id !== undefined && params.desktop_configuration_profile_id !== null && !isInt(params.desktop_configuration_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: desktop_configuration_profile_id must be of type Int, received ${getType(params.desktop_configuration_profile_id)}`)
    }

    if (params.integration_centric_profile_id !== undefined && params.integration_centric_profile_id !== null && !isInt(params.integration_centric_profile_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: integration_centric_profile_id must be of type Int, received ${getType(params.integration_centric_profile_id)}`)
    }

    if (params.allowed_ips !== undefined && params.allowed_ips !== null && !isString(params.allowed_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: allowed_ips must be of type String, received ${getType(params.allowed_ips)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/groups', 'POST', params, options)

    return new Group(response?.data, retainedOptions(options))
  }
}

export default Group

module.exports = Group
module.exports.default = Group
