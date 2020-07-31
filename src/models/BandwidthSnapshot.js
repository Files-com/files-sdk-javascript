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
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  static list = async (params = {}, options = {}) => {
    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    const response = await Api.sendRequest(`/bandwidth_snapshots`, 'GET', params, options)

    return response?.data?.map(obj => new BandwidthSnapshot(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BandwidthSnapshot.list(params, options)
}

export default BandwidthSnapshot
