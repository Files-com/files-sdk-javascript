import Api from '../Api'
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

  // date-time # Site bandwidth report created at date/time
  getCreatedAt = () => this.attributes.created_at

  // date-time # The last time this site bandwidth report was updated
  getUpdatedAt = () => this.attributes.updated_at


  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `logged_at`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `logged_at`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `logged_at`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `logged_at`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `logged_at`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `logged_at`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `logged_at`.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/bandwidth_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new BandwidthSnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BandwidthSnapshot.list(params, options)
}

export default BandwidthSnapshot
