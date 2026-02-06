/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class PartnerSiteRequest
 */
class PartnerSiteRequest {
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

  // int64 # Partner Site Request ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Partner ID
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
  }

  // int64 # Linked Site ID
  getLinkedSiteId = () => this.attributes.linked_site_id

  setLinkedSiteId = value => {
    this.attributes.linked_site_id = value
  }

  // string # Request status (pending, approved, rejected)
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // string # Main Site Name
  getMainSiteName = () => this.attributes.main_site_name

  setMainSiteName = value => {
    this.attributes.main_site_name = value
  }

  // string # Pairing key used to approve this request on the target site
  getPairingKey = () => this.attributes.pairing_key

  setPairingKey = value => {
    this.attributes.pairing_key = value
  }

  // date-time # Request creation date/time
  getCreatedAt = () => this.attributes.created_at

  // date-time # Request last updated date/time
  getUpdatedAt = () => this.attributes.updated_at

  // string # Site URL to link to
  getSiteUrl = () => this.attributes.site_url

  setSiteUrl = value => {
    this.attributes.site_url = value
  }

  // Reject partner site request
  reject = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/partner_site_requests/${encodeURIComponent(params.id)}/reject`, 'POST', params, this.options)
  }

  // Approve partner site request
  approve = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/partner_site_requests/${encodeURIComponent(params.id)}/approve`, 'POST', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/partner_site_requests/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The PartnerSiteRequest object doesn\'t support updates.')
    } else {
      const newObject = await PartnerSiteRequest.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partner_site_requests', 'GET', params, options)

    return response?.data?.map(obj => new PartnerSiteRequest(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    PartnerSiteRequest.list(params, options)

  // Parameters:
  //   pairing_key (required) - string - Pairing key for the partner site request
  static findByPairingKey = async (params = {}, options = {}) => {
    if (!params.pairing_key) {
      throw new errors.MissingParameterError('Parameter missing: pairing_key')
    }

    if (params.pairing_key && !isString(params.pairing_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: pairing_key must be of type String, received ${getType(params.pairing_key)}`)
    }

    await Api.sendRequest('/partner_site_requests/find_by_pairing_key', 'GET', params, options)
  }

  // Parameters:
  //   partner_id (required) - int64 - Partner ID to link with
  //   site_url (required) - string - Site URL to link to
  static create = async (params = {}, options = {}) => {
    if (!params.partner_id) {
      throw new errors.MissingParameterError('Parameter missing: partner_id')
    }

    if (!params.site_url) {
      throw new errors.MissingParameterError('Parameter missing: site_url')
    }

    if (params.partner_id && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.site_url && !isString(params.site_url)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_url must be of type String, received ${getType(params.site_url)}`)
    }

    const response = await Api.sendRequest('/partner_site_requests', 'POST', params, options)

    return new PartnerSiteRequest(response?.data, options)
  }
}

export default PartnerSiteRequest

module.exports = PartnerSiteRequest
module.exports.default = PartnerSiteRequest
