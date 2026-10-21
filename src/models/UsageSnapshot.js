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
 * Class UsageSnapshot
 */
class UsageSnapshot {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Usage snapshot ID
  getId = () => this.attributes.id

  // date-time # Usage snapshot start date/time
  getStartAt = () => this.attributes.start_at

  // date-time # Usage snapshot end date/time
  getEndAt = () => this.attributes.end_at

  // int64 # Highest user count number in time period
  getHighWaterUserCount = () => this.attributes.high_water_user_count

  // int64 # Total Transformation and AI credits used in this usage period. Updated daily. Does not include credits consumed today.
  getTransformationCreditsUsage = () => this.attributes.transformation_credits_usage

  // int64 # Current total Storage Usage GB as of end date (not necessarily high water mark, which is used for billing)
  getCurrentStorage = () => this.attributes.current_storage

  // int64 # Highest Storage Usage GB recorded in time period (used for billing)
  getHighWaterStorage = () => this.attributes.high_water_storage

  // int64 # Storage Usage for root folder as of end date (not necessarily high water mark, which is used for billing)
  getRootStorage = () => this.attributes.root_storage

  // int64 # Storage Usage for files that are deleted but uploaded within last 30 days as of end date (not necessarily high water mark, which is used for billing)
  getDeletedFilesCountedInMinimum = () => this.attributes.deleted_files_counted_in_minimum

  // int64 # Storage Usage for files that are deleted but retained as backups as of end date (not necessarily high water mark, which is used for billing)
  getDeletedFilesStorage = () => this.attributes.deleted_files_storage

  // int64 # Storage + Transfer Usage - Total Billable amount
  getTotalBillableUsage = () => this.attributes.total_billable_usage

  // int64 # Transfer usage for period - Total Billable amount
  getTotalBillableTransferUsage = () => this.attributes.total_billable_transfer_usage

  // int64 # Transfer Usage for period - Outbound GB from Files Native Storage
  getBytesSent = () => this.attributes.bytes_sent

  // int64 # Transfer Usage for period - Inbound GB to Remote Servers (Sync/Mount)
  getSyncBytesReceived = () => this.attributes.sync_bytes_received

  // int64 # Transfer Usage for period - Outbound GB from Remote Servers (Sync/Mount)
  getSyncBytesSent = () => this.attributes.sync_bytes_sent

  // array(object) # Storage Usage - map of root folders to their usage as of end date (not necessarily high water mark, which is used for billing)
  getUsageByTopLevelDir = () => this.attributes.usage_by_top_level_dir

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/usage_snapshots', 'GET', params, options)

    return response?.data?.map(obj => new UsageSnapshot(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    UsageSnapshot.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      UsageSnapshot.list(pageParams, pageOptions))
}

export default UsageSnapshot

module.exports = UsageSnapshot
module.exports.default = UsageSnapshot
