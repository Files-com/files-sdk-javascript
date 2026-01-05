/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class SyncRun
 */
class SyncRun {
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

  // int64 # SyncRun ID
  getId = () => this.attributes.id

  // string # Log or summary body for this run
  getBody = () => this.attributes.body

  // int64 # Total bytes synced in this run
  getBytesSynced = () => this.attributes.bytes_synced

  // int64 # Number of files compared
  getComparedFiles = () => this.attributes.compared_files

  // int64 # Number of folders compared
  getComparedFolders = () => this.attributes.compared_folders

  // date-time # When this run was completed
  getCompletedAt = () => this.attributes.completed_at

  // date-time # When this run was created
  getCreatedAt = () => this.attributes.created_at

  // string # Destination remote server type, if any
  getDestRemoteServerType = () => this.attributes.dest_remote_server_type

  // boolean # Whether this run was a dry run (no actual changes made)
  getDryRun = () => this.attributes.dry_run

  // int64 # Number of files that errored
  getErroredFiles = () => this.attributes.errored_files

  // int64 # Estimated bytes count for this run
  getEstimatedBytesCount = () => this.attributes.estimated_bytes_count

  // array(string) # Array of errors encountered during the run
  getEventErrors = () => this.attributes.event_errors

  // string # Link to external log file.
  getLogUrl = () => this.attributes.log_url

  // double # Total runtime in seconds
  getRuntime = () => this.attributes.runtime

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  // int64 # Workspace ID
  getWorkspaceId = () => this.attributes.workspace_id

  // string # Source remote server type, if any
  getSrcRemoteServerType = () => this.attributes.src_remote_server_type

  // string # Status of the sync run (success, failure, partial_failure, in_progress, skipped)
  getStatus = () => this.attributes.status

  // int64 # Number of files successfully synced
  getSuccessfulFiles = () => this.attributes.successful_files

  // int64 # ID of the Sync this run belongs to
  getSyncId = () => this.attributes.sync_id

  // string # Name of the Sync this run belongs to
  getSyncName = () => this.attributes.sync_name

  // date-time # When this run was last updated
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `workspace_id`, `sync_id`, `created_at` or `status`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `status`, `dry_run`, `workspace_id`, `src_remote_server_type`, `dest_remote_server_type` or `sync_id`. Valid field combinations are `[ status, created_at ]`, `[ workspace_id, created_at ]`, `[ src_remote_server_type, created_at ]`, `[ dest_remote_server_type, created_at ]`, `[ sync_id, created_at ]`, `[ workspace_id, status ]`, `[ src_remote_server_type, status ]`, `[ dest_remote_server_type, status ]`, `[ sync_id, status ]`, `[ workspace_id, src_remote_server_type ]`, `[ workspace_id, dest_remote_server_type ]`, `[ workspace_id, sync_id ]`, `[ workspace_id, status, created_at ]`, `[ src_remote_server_type, status, created_at ]`, `[ dest_remote_server_type, status, created_at ]`, `[ sync_id, status, created_at ]`, `[ workspace_id, src_remote_server_type, created_at ]`, `[ workspace_id, dest_remote_server_type, created_at ]`, `[ workspace_id, sync_id, created_at ]`, `[ workspace_id, src_remote_server_type, status ]`, `[ workspace_id, dest_remote_server_type, status ]`, `[ workspace_id, sync_id, status ]`, `[ workspace_id, src_remote_server_type, status, created_at ]`, `[ workspace_id, dest_remote_server_type, status, created_at ]` or `[ workspace_id, sync_id, status, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/sync_runs', 'GET', params, options)

    return response?.data?.map(obj => new SyncRun(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SyncRun.list(params, options)

  // Parameters:
  //   id (required) - int64 - Sync Run ID.
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

    const response = await Api.sendRequest(`/sync_runs/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new SyncRun(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    SyncRun.find(id, params, options)
}

export default SyncRun

module.exports = SyncRun
module.exports.default = SyncRun
