import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class UsageDailySnapshot
 */
class UsageDailySnapshot {
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
  // int64 # ID of the usage record
  getId = () => this.attributes.id

  // date # The date of this usage record
  getDate = () => this.attributes.date

  // boolean # True if the API usage fields `read_api_usage` and `write_api_usage` can be relied upon.  If this is false, we suggest hiding that value from any UI.
  getApiUsageAvailable = () => this.attributes.api_usage_available

  // int64 # Read API Calls used on this day. Note: only updated for days before the current day.
  getReadApiUsage = () => this.attributes.read_api_usage

  // int64 # Write API Calls used on this day. Note: only updated for days before the current day.
  getWriteApiUsage = () => this.attributes.write_api_usage

  // int64 # Number of billable users as of this day.
  getUserCount = () => this.attributes.user_count

  // int64 # GB of Files Native Storage used on this day.
  getCurrentStorage = () => this.attributes.current_storage

  // int64 # GB of Files Native Storage used on this day for files that have been deleted and are stored as backups.
  getDeletedFilesStorage = () => this.attributes.deleted_files_storage

  // int64 # GB of Files Native Storage used on this day for files that have been permanently deleted but were uploaded less than 30 days ago, and are still billable.
  getDeletedFilesCountedInMinimum = () => this.attributes.deleted_files_counted_in_minimum

  // int64 # GB of Files Native Storage used for the root folder.  Included here because this value will not be part of `usage_by_top_level_dir`
  getRootStorage = () => this.attributes.root_storage

  // object # Usage broken down by each top-level folder
  getUsageByTopLevelDir = () => this.attributes.usage_by_top_level_dir


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[date]=desc`). Valid fields are `date` and `usage_snapshot_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`. Valid field combinations are `[ usage_snapshot_id, date ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `date`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `date`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `date`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `date`.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/usage_daily_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new UsageDailySnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UsageDailySnapshot.list(params, options)
}

export default UsageDailySnapshot
