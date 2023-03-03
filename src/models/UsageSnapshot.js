import Api from '../Api'
import * as errors from '../Errors'
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
  // int64 # Usage snapshot ID
  getId = () => this.attributes.id

  // date-time # Usage snapshot start date/time
  getStartAt = () => this.attributes.start_at

  // date-time # Usage snapshot end date/time
  getEndAt = () => this.attributes.end_at

  // double # Highest user count number in time period
  getHighWaterUserCount = () => this.attributes.high_water_user_count

  // double # Current total Storage Usage GB as of end date (not necessarily high water mark, which is used for billing)
  getCurrentStorage = () => this.attributes.current_storage

  // double # Highest Storage Usage GB recorded in time period (used for billing)
  getHighWaterStorage = () => this.attributes.high_water_storage

  // object # Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used for billing)
  getUsageByTopLevelDir = () => this.attributes.usage_by_top_level_dir

  // double # Storage Usage for root folder as of end date (not necessarily high water mark, which is used for billing)
  getRootStorage = () => this.attributes.root_storage

  // double # Storage Usage for files that are deleted but uploaded within last 30 days as of end date (not necessarily high water mark, which is used for billing)
  getDeletedFilesCountedInMinimum = () => this.attributes.deleted_files_counted_in_minimum

  // double # Storage Usage for files that are deleted but retained as backups as of end date (not necessarily high water mark, which is used for billing)
  getDeletedFilesStorage = () => this.attributes.deleted_files_storage

  // double # Storage + Transfer Usage - Total Billable amount
  getTotalBillableUsage = () => this.attributes.total_billable_usage

  // double # Transfer usage for period - Total Billable amount
  getTotalBillableTransferUsage = () => this.attributes.total_billable_transfer_usage

  // double # Transfer Usage for period - Outbound GB from Files Native Storage
  getBytesSent = () => this.attributes.bytes_sent

  // double # Transfer Usage for period - Inbound GB to Remote Servers (Sync/Mount)
  getSyncBytesReceived = () => this.attributes.sync_bytes_received

  // double # Transfer Usage for period - Outbound GB from Remote Servers (Sync/Mount)
  getSyncBytesSent = () => this.attributes.sync_bytes_sent


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/usage_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new UsageSnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UsageSnapshot.list(params, options)
}

export default UsageSnapshot
