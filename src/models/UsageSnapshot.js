import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class UsageSnapshot
 */
class UsageSnapshot {
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
  // int64 # Site usage ID
  getId = () => this.attributes.id

  // date-time # Site usage report start date/time
  getStartAt = () => this.attributes.start_at

  // date-time # Site usage report end date/time
  getEndAt = () => this.attributes.end_at

  // date-time # Site usage report created at date/time
  getCreatedAt = () => this.attributes.created_at

  // double # Site usage report highest usage in time period
  getHighWaterUserCount = () => this.attributes.high_water_user_count

  // double # Current site usage as of report
  getCurrentStorage = () => this.attributes.current_storage

  // double # Site usage report highest usage in time period
  getHighWaterStorage = () => this.attributes.high_water_storage

  // int64 # Number of downloads in report time period
  getTotalDownloads = () => this.attributes.total_downloads

  // int64 # Number of uploads in time period
  getTotalUploads = () => this.attributes.total_uploads

  // date-time # The last time this site usage report was updated
  getUpdatedAt = () => this.attributes.updated_at

  // object # A map of root folders to their total usage
  getUsageByTopLevelDir = () => this.attributes.usage_by_top_level_dir

  // double # Usage for root folder
  getRootStorage = () => this.attributes.root_storage

  // double # Usage for files that are deleted but uploaded within last 30 days
  getDeletedFilesCountedInMinimum = () => this.attributes.deleted_files_counted_in_minimum

  // double # Usage for files that are deleted but retained as backups
  getDeletedFilesStorage = () => this.attributes.deleted_files_storage


  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/usage_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new UsageSnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UsageSnapshot.list(params, options)
}

export default UsageSnapshot
