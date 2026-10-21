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
 * Class UsageDailySnapshot
 */
class UsageDailySnapshot {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
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

  // int64 # Transformation and AI credits used on this day. Note: only updated for days before the current day.
  getTransformationCreditsUsage = () => this.attributes.transformation_credits_usage

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

  // array(object) # Usage broken down by each top-level folder
  getUsageByTopLevelDir = () => this.attributes.usage_by_top_level_dir

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `date`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `date` and `usage_snapshot_id`. Valid field combinations are `[ usage_snapshot_id, date ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `date`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `date`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `date`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `date`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/usage_daily_snapshots', 'GET', params, options)

    return response?.data?.map(obj => new UsageDailySnapshot(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    UsageDailySnapshot.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      UsageDailySnapshot.list(pageParams, pageOptions))
}

export default UsageDailySnapshot

module.exports = UsageDailySnapshot
module.exports.default = UsageDailySnapshot
