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

  // int64 # ID of the Sync this run belongs to
  getSyncId = () => this.attributes.sync_id

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  // string # Status of the sync run (success, failure, partial_failure, in_progress, skipped)
  getStatus = () => this.attributes.status

  // string # Type of remote server used, if any
  getRemoteServerType = () => this.attributes.remote_server_type

  // string # Log or summary body for this run
  getBody = () => this.attributes.body

  // array(string) # Array of errors encountered during the run
  getEventErrors = () => this.attributes.event_errors

  // int64 # Total bytes synced in this run
  getBytesSynced = () => this.attributes.bytes_synced

  // int64 # Number of files compared
  getComparedFiles = () => this.attributes.compared_files

  // int64 # Number of folders compared
  getComparedFolders = () => this.attributes.compared_folders

  // int64 # Number of files that errored
  getErroredFiles = () => this.attributes.errored_files

  // int64 # Number of files successfully synced
  getSuccessfulFiles = () => this.attributes.successful_files

  // double # Total runtime in seconds
  getRuntime = () => this.attributes.runtime

  // string # Link to external log file.
  getLogUrl = () => this.attributes.log_url

  // date-time # When this run was completed
  getCompletedAt = () => this.attributes.completed_at

  // boolean # Whether notifications were sent for this run
  getNotified = () => this.attributes.notified

  // date-time # When this run was created
  getCreatedAt = () => this.attributes.created_at

  // date-time # When this run was last updated
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `sync_id`, `created_at` or `status`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status` and `sync_id`. Valid field combinations are `[ sync_id, status ]`.
  //   sync_id (required) - int64 - ID of the Sync this run belongs to
  static list = async (params = {}, options = {}) => {
    if (!params.sync_id) {
      throw new errors.MissingParameterError('Parameter missing: sync_id')
    }

    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.sync_id && !isInt(params.sync_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: sync_id must be of type Int, received ${getType(params.sync_id)}`)
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
