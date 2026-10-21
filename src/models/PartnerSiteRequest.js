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
 * Class PartnerSiteRequest
 */
class PartnerSiteRequest {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Partner Site Request ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Host Partner ID
  getHostPartnerId = () => this.attributes.host_partner_id

  setHostPartnerId = value => {
    this.attributes.host_partner_id = value
    exposeAttributes(this, ['host_partner_id'])
  }

  // string # Guest Site URL
  getGuestSiteUrl = () => this.attributes.guest_site_url

  setGuestSiteUrl = value => {
    this.attributes.guest_site_url = value
    exposeAttributes(this, ['guest_site_url'])
  }

  // string # Request status (pending, approved, rejected)
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // string # Host Site Name
  getHostSiteName = () => this.attributes.host_site_name

  setHostSiteName = value => {
    this.attributes.host_site_name = value
    exposeAttributes(this, ['host_site_name'])
  }

  // string # Pairing key used to approve this request on the Guest Site
  getPairingKey = () => this.attributes.pairing_key

  setPairingKey = value => {
    this.attributes.pairing_key = value
    exposeAttributes(this, ['pairing_key'])
  }

  // date-time # Request creation date/time
  getCreatedAt = () => this.attributes.created_at

  // date-time # Request last updated date/time
  getUpdatedAt = () => this.attributes.updated_at

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
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
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `host_partner_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `host_partner_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partner_site_requests', 'GET', params, options)

    return response?.data?.map(obj => new PartnerSiteRequest(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    PartnerSiteRequest.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      PartnerSiteRequest.list(pageParams, pageOptions))

  // Parameters:
  //   pairing_key (required) - string - Pairing key for the partner site request
  static findByPairingKey = async (params = {}, options = {}) => {
    if (!params.pairing_key) {
      throw new errors.MissingParameterError('Parameter missing: pairing_key')
    }

    if (params.pairing_key !== undefined && params.pairing_key !== null && !isString(params.pairing_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: pairing_key must be of type String, received ${getType(params.pairing_key)}`)
    }

    await Api.sendRequest('/partner_site_requests/find_by_pairing_key', 'GET', params, options)
  }

  // Parameters:
  //   host_partner_id (required) - int64 - Host Partner ID to link with
  //   guest_site_url (required) - string - Guest Site URL to link to
  static create = async (params = {}, options = {}) => {
    if (!params.host_partner_id) {
      throw new errors.MissingParameterError('Parameter missing: host_partner_id')
    }

    if (!params.guest_site_url) {
      throw new errors.MissingParameterError('Parameter missing: guest_site_url')
    }

    if (params.host_partner_id !== undefined && params.host_partner_id !== null && !isInt(params.host_partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: host_partner_id must be of type Int, received ${getType(params.host_partner_id)}`)
    }

    if (params.guest_site_url !== undefined && params.guest_site_url !== null && !isString(params.guest_site_url)) {
      throw new errors.InvalidParameterError(`Bad parameter: guest_site_url must be of type String, received ${getType(params.guest_site_url)}`)
    }

    const response = await Api.sendRequest('/partner_site_requests', 'POST', params, options)

    return new PartnerSiteRequest(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   pairing_key (required) - string - Pairing key for the partner site request
  static reject = async (params = {}, options = {}) => {
    if (!params.pairing_key) {
      throw new errors.MissingParameterError('Parameter missing: pairing_key')
    }

    if (params.pairing_key !== undefined && params.pairing_key !== null && !isString(params.pairing_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: pairing_key must be of type String, received ${getType(params.pairing_key)}`)
    }

    await Api.sendRequest('/partner_site_requests/reject', 'POST', params, options)
  }

  // Parameters:
  //   pairing_key (required) - string - Pairing key for the partner site request
  //   partner_id - int64 - ID of an existing Partner on this site, with the host role, that represents the requesting organization. The connection binds to that Partner and makes it host_and_guest. When omitted, a guest Partner named after the host site is created.
  static approve = async (params = {}, options = {}) => {
    if (!params.pairing_key) {
      throw new errors.MissingParameterError('Parameter missing: pairing_key')
    }

    if (params.pairing_key !== undefined && params.pairing_key !== null && !isString(params.pairing_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: pairing_key must be of type String, received ${getType(params.pairing_key)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    await Api.sendRequest('/partner_site_requests/approve', 'POST', params, options)
  }
}

export default PartnerSiteRequest

module.exports = PartnerSiteRequest
module.exports.default = PartnerSiteRequest
