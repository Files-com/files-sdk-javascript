import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isInt, isObject, isString } from '../utils'

/**
 * Class HistoryExport
 */
class HistoryExport {
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

  // int64 # History Export ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // date-time # Start date/time of export range.
  getStartAt = () => this.attributes.start_at

  setStartAt = value => {
    this.attributes.start_at = value
  }

  // date-time # End date/time of export range.
  getEndAt = () => this.attributes.end_at

  setEndAt = value => {
    this.attributes.end_at = value
  }

  // string # Status of export.  Will be: `building` or `ready`
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // string # Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
  getQueryAction = () => this.attributes.query_action

  setQueryAction = value => {
    this.attributes.query_action = value
  }

  // string # Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`
  getQueryInterface = () => this.attributes.query_interface

  setQueryInterface = value => {
    this.attributes.query_interface = value
  }

  // int64 # Return results that are actions performed by the user indiciated by this User ID
  getQueryUserId = () => this.attributes.query_user_id

  setQueryUserId = value => {
    this.attributes.query_user_id = value
  }

  // int64 # Return results that are file actions related to the file indicated by this File ID
  getQueryFileId = () => this.attributes.query_file_id

  setQueryFileId = value => {
    this.attributes.query_file_id = value
  }

  // int64 # Return results that are file actions inside the parent folder specified by this folder ID
  getQueryParentId = () => this.attributes.query_parent_id

  setQueryParentId = value => {
    this.attributes.query_parent_id = value
  }

  // string # Return results that are file actions related to this path.
  getQueryPath = () => this.attributes.query_path

  setQueryPath = value => {
    this.attributes.query_path = value
  }

  // string # Return results that are file actions related to files or folders inside this folder path.
  getQueryFolder = () => this.attributes.query_folder

  setQueryFolder = value => {
    this.attributes.query_folder = value
  }

  // string # Return results that are file moves originating from this path.
  getQuerySrc = () => this.attributes.query_src

  setQuerySrc = value => {
    this.attributes.query_src = value
  }

  // string # Return results that are file moves with this path as destination.
  getQueryDestination = () => this.attributes.query_destination

  setQueryDestination = value => {
    this.attributes.query_destination = value
  }

  // string # Filter results by this IP address.
  getQueryIp = () => this.attributes.query_ip

  setQueryIp = value => {
    this.attributes.query_ip = value
  }

  // string # Filter results by this username.
  getQueryUsername = () => this.attributes.query_username

  setQueryUsername = value => {
    this.attributes.query_username = value
  }

  // string # If searching for Histories about login failures, this parameter restricts results to failures of this specific type.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`
  getQueryFailureType = () => this.attributes.query_failure_type

  setQueryFailureType = value => {
    this.attributes.query_failure_type = value
  }

  // int64 # If searching for Histories about specific objects (such as Users, or API Keys), this paremeter restricts results to objects that match this ID.
  getQueryTargetId = () => this.attributes.query_target_id

  setQueryTargetId = value => {
    this.attributes.query_target_id = value
  }

  // string # If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to objects with this name/username.
  getQueryTargetName = () => this.attributes.query_target_name

  setQueryTargetName = value => {
    this.attributes.query_target_name = value
  }

  // string # If searching for Histories about Permisisons, this parameter restricts results to permissions of this level.
  getQueryTargetPermission = () => this.attributes.query_target_permission

  setQueryTargetPermission = value => {
    this.attributes.query_target_permission = value
  }

  // int64 # If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user ID.
  getQueryTargetUserId = () => this.attributes.query_target_user_id

  setQueryTargetUserId = value => {
    this.attributes.query_target_user_id = value
  }

  // string # If searching for Histories about API keys, this parameter restricts results to API keys created by/for this username.
  getQueryTargetUsername = () => this.attributes.query_target_username

  setQueryTargetUsername = value => {
    this.attributes.query_target_username = value
  }

  // string # If searching for Histories about API keys, this parameter restricts results to API keys associated with this platform.
  getQueryTargetPlatform = () => this.attributes.query_target_platform

  setQueryTargetPlatform = value => {
    this.attributes.query_target_platform = value
  }

  // string # If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
  getQueryTargetPermissionSet = () => this.attributes.query_target_permission_set

  setQueryTargetPermissionSet = value => {
    this.attributes.query_target_permission_set = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }


  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/history_exports/' . params['id'] . '`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
    if (this.attributes['id']) {
      throw new Error('The HistoryExport object doesn\'t support updates.')
    } else {
      const newObject = HistoryExport.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    const response = await Api.sendRequest(`/history_exports`, 'GET', params, options)

    return response?.data?.map(obj => new HistoryExport(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    HistoryExport.list(params, options)

  // Parameters:
  //   id (required) - int64 - History Export ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/history_exports/' . params['id'] . '`, 'GET', params, options)

    return new HistoryExport(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    HistoryExport.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   start_at - string - Start date/time of export range.
  //   end_at - string - End date/time of export range.
  //   query_action - string - Filter results by this this action type. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
  //   query_interface - string - Filter results by this this interface type. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`
  //   query_user_id - int64 - Return results that are actions performed by the user indiciated by this User ID
  //   query_file_id - int64 - Return results that are file actions related to the file indicated by this File ID
  //   query_parent_id - int64 - Return results that are file actions inside the parent folder specified by this folder ID
  //   query_path - string - Return results that are file actions related to this path.
  //   query_folder - string - Return results that are file actions related to files or folders inside this folder path.
  //   query_src - string - Return results that are file moves originating from this path.
  //   query_destination - string - Return results that are file moves with this path as destination.
  //   query_ip - string - Filter results by this IP address.
  //   query_username - string - Filter results by this username.
  //   query_failure_type - string - If searching for Histories about login failures, this parameter restricts results to failures of this specific type.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`
  //   query_target_id - int64 - If searching for Histories about specific objects (such as Users, or API Keys), this paremeter restricts results to objects that match this ID.
  //   query_target_name - string - If searching for Histories about Users, Groups or other objects with names, this parameter restricts results to objects with this name/username.
  //   query_target_permission - string - If searching for Histories about Permisisons, this parameter restricts results to permissions of this level.
  //   query_target_user_id - int64 - If searching for Histories about API keys, this parameter restricts results to API keys created by/for this user ID.
  //   query_target_username - string - If searching for Histories about API keys, this parameter restricts results to API keys created by/for this username.
  //   query_target_platform - string - If searching for Histories about API keys, this parameter restricts results to API keys associated with this platform.
  //   query_target_permission_set - string - If searching for Histories about API keys, this parameter restricts results to API keys with this permission set.
  static create = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['start_at'] && !isString(params['start_at'])) {
      throw new Error(`Bad parameter: start_at must be of type String, received ${getType(start_at)}`)
    }

    if (params['end_at'] && !isString(params['end_at'])) {
      throw new Error(`Bad parameter: end_at must be of type String, received ${getType(end_at)}`)
    }

    if (params['query_action'] && !isString(params['query_action'])) {
      throw new Error(`Bad parameter: query_action must be of type String, received ${getType(query_action)}`)
    }

    if (params['query_interface'] && !isString(params['query_interface'])) {
      throw new Error(`Bad parameter: query_interface must be of type String, received ${getType(query_interface)}`)
    }

    if (params['query_user_id'] && !isInt(params['query_user_id'])) {
      throw new Error(`Bad parameter: query_user_id must be of type Int, received ${getType(query_user_id)}`)
    }

    if (params['query_file_id'] && !isInt(params['query_file_id'])) {
      throw new Error(`Bad parameter: query_file_id must be of type Int, received ${getType(query_file_id)}`)
    }

    if (params['query_parent_id'] && !isInt(params['query_parent_id'])) {
      throw new Error(`Bad parameter: query_parent_id must be of type Int, received ${getType(query_parent_id)}`)
    }

    if (params['query_path'] && !isString(params['query_path'])) {
      throw new Error(`Bad parameter: query_path must be of type String, received ${getType(query_path)}`)
    }

    if (params['query_folder'] && !isString(params['query_folder'])) {
      throw new Error(`Bad parameter: query_folder must be of type String, received ${getType(query_folder)}`)
    }

    if (params['query_src'] && !isString(params['query_src'])) {
      throw new Error(`Bad parameter: query_src must be of type String, received ${getType(query_src)}`)
    }

    if (params['query_destination'] && !isString(params['query_destination'])) {
      throw new Error(`Bad parameter: query_destination must be of type String, received ${getType(query_destination)}`)
    }

    if (params['query_ip'] && !isString(params['query_ip'])) {
      throw new Error(`Bad parameter: query_ip must be of type String, received ${getType(query_ip)}`)
    }

    if (params['query_username'] && !isString(params['query_username'])) {
      throw new Error(`Bad parameter: query_username must be of type String, received ${getType(query_username)}`)
    }

    if (params['query_failure_type'] && !isString(params['query_failure_type'])) {
      throw new Error(`Bad parameter: query_failure_type must be of type String, received ${getType(query_failure_type)}`)
    }

    if (params['query_target_id'] && !isInt(params['query_target_id'])) {
      throw new Error(`Bad parameter: query_target_id must be of type Int, received ${getType(query_target_id)}`)
    }

    if (params['query_target_name'] && !isString(params['query_target_name'])) {
      throw new Error(`Bad parameter: query_target_name must be of type String, received ${getType(query_target_name)}`)
    }

    if (params['query_target_permission'] && !isString(params['query_target_permission'])) {
      throw new Error(`Bad parameter: query_target_permission must be of type String, received ${getType(query_target_permission)}`)
    }

    if (params['query_target_user_id'] && !isInt(params['query_target_user_id'])) {
      throw new Error(`Bad parameter: query_target_user_id must be of type Int, received ${getType(query_target_user_id)}`)
    }

    if (params['query_target_username'] && !isString(params['query_target_username'])) {
      throw new Error(`Bad parameter: query_target_username must be of type String, received ${getType(query_target_username)}`)
    }

    if (params['query_target_platform'] && !isString(params['query_target_platform'])) {
      throw new Error(`Bad parameter: query_target_platform must be of type String, received ${getType(query_target_platform)}`)
    }

    if (params['query_target_permission_set'] && !isString(params['query_target_permission_set'])) {
      throw new Error(`Bad parameter: query_target_permission_set must be of type String, received ${getType(query_target_permission_set)}`)
    }

    const response = await Api.sendRequest(`/history_exports`, 'POST', params, options)

    return new HistoryExport(response?.data, options)
  }
}

export default HistoryExport
