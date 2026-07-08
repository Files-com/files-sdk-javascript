/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class CustomDomain
 */
class CustomDomain {
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

  // int64 # Custom Domain ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Customer-owned domain name.
  getDomain = () => this.attributes.domain

  setDomain = value => {
    this.attributes.domain = value
  }

  // string # Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be set manually via the API for any reason.
  getDestination = () => this.attributes.destination

  setDestination = value => {
    this.attributes.destination = value
  }

  // string # Current DNS verification status.
  getDnsStatus = () => this.attributes.dns_status

  setDnsStatus = value => {
    this.attributes.dns_status = value
  }

  // int64 # Current SSL certificate ID.
  getSslCertificateId = () => this.attributes.ssl_certificate_id

  setSslCertificateId = value => {
    this.attributes.ssl_certificate_id = value
  }

  // boolean # Is this domain's SSL certificate automatically managed and renewed by Files.com?
  getBrickManaged = () => this.attributes.brick_managed

  setBrickManaged = value => {
    this.attributes.brick_managed = value
  }

  // int64 # Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior.  Preserved as historical context when `destination` becomes `unassigned`.
  getFolderBehaviorId = () => this.attributes.folder_behavior_id

  setFolderBehaviorId = value => {
    this.attributes.folder_behavior_id = value
  }

  // date-time # When this Custom Domain was created.
  getCreatedAt = () => this.attributes.created_at

  // date-time # When this Custom Domain was last updated.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   destination - string - Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be set manually via the API for any reason.
  //   folder_behavior_id - int64 - Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior.  Preserved as historical context when `destination` becomes `unassigned`.
  //   ssl_certificate_id - int64 - Current SSL certificate ID.
  //   domain - string - Customer-owned domain name.
  update = async (params = {}) => {
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

    if (params.destination && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.folder_behavior_id && !isInt(params.folder_behavior_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: folder_behavior_id must be of type Int, received ${getType(params.folder_behavior_id)}`)
    }

    if (params.ssl_certificate_id && !isInt(params.ssl_certificate_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_certificate_id must be of type Int, received ${getType(params.ssl_certificate_id)}`)
    }

    if (params.domain && !isString(params.domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain must be of type String, received ${getType(params.domain)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/custom_domains/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new CustomDomain(response?.data, this.options)
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

    await Api.sendRequest(`/custom_domains/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await CustomDomain.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/custom_domains', 'GET', params, options)

    return response?.data?.map(obj => new CustomDomain(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    CustomDomain.list(params, options)

  // Parameters:
  //   id (required) - int64 - Custom Domain ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/custom_domains/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new CustomDomain(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    CustomDomain.find(id, params, options)

  // Parameters:
  //   destination - string - Where this custom domain routes. Can be `site_alias`, `public_hosting`, `s3_endpoint`, or `unassigned` (not routing traffic). Set to `unassigned` automatically when a bound `public_hosting` folder behavior is deleted, and can be set manually via the API for any reason.
  //   folder_behavior_id - int64 - Public Hosting behavior ID when this domain routes to a specific Public Hosting behavior.  Preserved as historical context when `destination` becomes `unassigned`.
  //   ssl_certificate_id - int64 - Current SSL certificate ID.
  //   domain (required) - string - Customer-owned domain name.
  static create = async (params = {}, options = {}) => {
    if (!params.domain) {
      throw new errors.MissingParameterError('Parameter missing: domain')
    }

    if (params.destination && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.folder_behavior_id && !isInt(params.folder_behavior_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: folder_behavior_id must be of type Int, received ${getType(params.folder_behavior_id)}`)
    }

    if (params.ssl_certificate_id && !isInt(params.ssl_certificate_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: ssl_certificate_id must be of type Int, received ${getType(params.ssl_certificate_id)}`)
    }

    if (params.domain && !isString(params.domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: domain must be of type String, received ${getType(params.domain)}`)
    }

    const response = await Api.sendRequest('/custom_domains', 'POST', params, options)

    return new CustomDomain(response?.data, options)
  }
}

export default CustomDomain

module.exports = CustomDomain
module.exports.default = CustomDomain
