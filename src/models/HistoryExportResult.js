import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class HistoryExportResult
 */
class HistoryExportResult {
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
  // int64 # Action ID
  getId = () => this.attributes.id

  // int64 # When the action happened
  getCreatedAt = () => this.attributes.created_at

  // int64 # When the action happened, in ISO8601 format.
  getCreatedAtIso8601 = () => this.attributes.created_at_iso8601

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  // int64 # File ID related to the action
  getFileId = () => this.attributes.file_id

  // int64 # ID of the parent folder
  getParentId = () => this.attributes.parent_id

  // string # Path of the related action This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # Folder in which the action occurred
  getFolder = () => this.attributes.folder

  // string # File move originated from this path
  getSrc = () => this.attributes.src

  // string # File moved to this destination folder
  getDestination = () => this.attributes.destination

  // string # Client IP that performed the action
  getIp = () => this.attributes.ip

  // string # Username of the user that performed the action
  getUsername = () => this.attributes.username

  // string # What action was taken. Valid values: `create`, `read`, `update`, `destroy`, `move`, `login`, `failedlogin`, `copy`, `user_create`, `user_update`, `user_destroy`, `group_create`, `group_update`, `group_destroy`, `permission_create`, `permission_destroy`, `api_key_create`, `api_key_update`, `api_key_destroy`
  getAction = () => this.attributes.action

  // string # The type of login failure, if applicable.  Valid values: `expired_trial`, `account_overdue`, `locked_out`, `ip_mismatch`, `password_mismatch`, `site_mismatch`, `username_not_found`, `none`, `no_ftp_permission`, `no_web_permission`, `no_directory`, `errno_enoent`, `no_sftp_permission`, `no_dav_permission`, `no_restapi_permission`, `key_mismatch`, `region_mismatch`, `expired_access`, `desktop_ip_mismatch`, `desktop_api_key_not_used_quickly_enough`, `disabled`, `country_mismatch`
  getFailureType = () => this.attributes.failure_type

  // string # Inteface through which the action was taken. Valid values: `web`, `ftp`, `robot`, `jsapi`, `webdesktopapi`, `sftp`, `dav`, `desktop`, `restapi`, `scim`, `office`, `mobile`, `as2`, `inbound_email`, `remote`
  getInterface = () => this.attributes.interface

  // int64 # ID of the object (such as Users, or API Keys) on which the action was taken
  getTargetId = () => this.attributes.target_id

  // string # Name of the User, Group or other object with a name related to this action
  getTargetName = () => this.attributes.target_name

  // string # Permission level of the action
  getTargetPermission = () => this.attributes.target_permission

  // boolean # Whether or not the action was recursive
  getTargetRecursive = () => this.attributes.target_recursive

  // int64 # If searching for Histories about API keys, this is when the API key will expire
  getTargetExpiresAt = () => this.attributes.target_expires_at

  // string # If searching for Histories about API keys, this represents the permission set of the associated  API key
  getTargetPermissionSet = () => this.attributes.target_permission_set

  // string # If searching for Histories about API keys, this is the platform on which the action was taken
  getTargetPlatform = () => this.attributes.target_platform

  // string # If searching for Histories about API keys, this is the username on which the action was taken
  getTargetUsername = () => this.attributes.target_username

  // int64 # If searching for Histories about API keys, this is the User ID on which the action was taken
  getTargetUserId = () => this.attributes.target_user_id


  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   history_export_id (required) - int64 - ID of the associated history export.
  static list = async (params = {}, options = {}) => {
    if (!params['history_export_id']) {
      throw new errors.MissingParameterError('Parameter missing: history_export_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['history_export_id'] && !isInt(params['history_export_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: history_export_id must be of type Int, received ${getType(params['history_export_id'])}`)
    }

    const response = await Api.sendRequest(`/history_export_results`, 'GET', params, options)

    return response?.data?.map(obj => new HistoryExportResult(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    HistoryExportResult.list(params, options)
}

export default HistoryExportResult
