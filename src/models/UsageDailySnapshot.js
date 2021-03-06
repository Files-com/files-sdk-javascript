import Api from '../Api'
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

  // int64 # The quantity of storage held for this site
  getCurrentStorage = () => this.attributes.current_storage

  // array # Usage broken down by each top-level folder
  getUsageByTopLevelDir = () => this.attributes.usage_by_top_level_dir


  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `date` and `usage_snapshot_id`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `date` and `usage_snapshot_id`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `date` and `usage_snapshot_id`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/usage_daily_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new UsageDailySnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UsageDailySnapshot.list(params, options)
}

export default UsageDailySnapshot
