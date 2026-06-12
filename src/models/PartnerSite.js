/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class PartnerSite
 */
class PartnerSite {
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

  // int64 # Host Partner ID
  getHostPartnerId = () => this.attributes.host_partner_id

  // string # Host Partner Name
  getHostPartnerName = () => this.attributes.host_partner_name

  // int64 # Guest Partner ID
  getGuestPartnerId = () => this.attributes.guest_partner_id

  // string # Guest Partner Name
  getGuestPartnerName = () => this.attributes.guest_partner_name

  // int64 # Host Site ID
  getHostSiteId = () => this.attributes.host_site_id

  // string # Host Site Name
  getHostSiteName = () => this.attributes.host_site_name

  // int64 # Guest Site ID
  getGuestSiteId = () => this.attributes.guest_site_id

  // string # Guest Site Name
  getGuestSiteName = () => this.attributes.guest_site_name

  // int64 # Workspace ID for the Host Partner
  getWorkspaceId = () => this.attributes.workspace_id

  static linkeds = async (options = {}) => {
    const response = await Api.sendRequest('/partner_sites/linked_partner_sites', 'GET', {}, options)

    return response?.data?.map(obj => new PartnerSite(obj, options)) || []
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partner_sites', 'GET', params, options)

    return response?.data?.map(obj => new PartnerSite(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    PartnerSite.list(params, options)
}

export default PartnerSite

module.exports = PartnerSite
module.exports.default = PartnerSite
