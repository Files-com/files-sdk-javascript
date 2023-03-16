import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class BandwidthSnapshot
 */
class BandwidthSnapshot {
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
  // int64 # Site bandwidth ID
  getId = () => this.attributes.id

  // double # Site bandwidth report bytes received
  getBytesReceived = () => this.attributes.bytes_received

  // double # Site bandwidth report bytes sent
  getBytesSent = () => this.attributes.bytes_sent

  // double # Site sync bandwidth report bytes received
  getSyncBytesReceived = () => this.attributes.sync_bytes_received

  // double # Site sync bandwidth report bytes sent
  getSyncBytesSent = () => this.attributes.sync_bytes_sent

  // double # Site bandwidth report get requests
  getRequestsGet = () => this.attributes.requests_get

  // double # Site bandwidth report put requests
  getRequestsPut = () => this.attributes.requests_put

  // double # Site bandwidth report other requests
  getRequestsOther = () => this.attributes.requests_other

  // date-time # Time the site bandwidth report was logged
  getLoggedAt = () => this.attributes.logged_at


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[logged_at]=desc`). Valid fields are `logged_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `logged_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `logged_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `logged_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `logged_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `logged_at`.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/bandwidth_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new BandwidthSnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BandwidthSnapshot.list(params, options)
}

export default BandwidthSnapshot
