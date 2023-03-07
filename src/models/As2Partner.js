import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class As2Partner
 */
class As2Partner {
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
  // int64 # Id of the AS2 Partner.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Id of the AS2 Station associated with this partner.
  getAs2StationId = () => this.attributes.as2_station_id

  setAs2StationId = value => {
    this.attributes.as2_station_id = value
  }

  // string # The partner's formal AS2 name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Public URI for sending AS2 message to.
  getUri = () => this.attributes.uri

  setUri = value => {
    this.attributes.uri = value
  }

  // string # Remote server certificate security setting
  getServerCertificate = () => this.attributes.server_certificate

  setServerCertificate = value => {
    this.attributes.server_certificate = value
  }

  // boolean # `true` if remote server only accepts connections from dedicated IPs
  getEnableDedicatedIps = () => this.attributes.enable_dedicated_ips

  setEnableDedicatedIps = value => {
    this.attributes.enable_dedicated_ips = value
  }

  // string # Serial of public certificate used for message security in hex format.
  getHexPublicCertificateSerial = () => this.attributes.hex_public_certificate_serial

  setHexPublicCertificateSerial = value => {
    this.attributes.hex_public_certificate_serial = value
  }

  // string # MD5 hash of public certificate used for message security.
  getPublicCertificateMd5 = () => this.attributes.public_certificate_md5

  setPublicCertificateMd5 = value => {
    this.attributes.public_certificate_md5 = value
  }

  // string # Subject of public certificate used for message security.
  getPublicCertificateSubject = () => this.attributes.public_certificate_subject

  setPublicCertificateSubject = value => {
    this.attributes.public_certificate_subject = value
  }

  // string # Issuer of public certificate used for message security.
  getPublicCertificateIssuer = () => this.attributes.public_certificate_issuer

  setPublicCertificateIssuer = value => {
    this.attributes.public_certificate_issuer = value
  }

  // string # Serial of public certificate used for message security.
  getPublicCertificateSerial = () => this.attributes.public_certificate_serial

  setPublicCertificateSerial = value => {
    this.attributes.public_certificate_serial = value
  }

  // string # Not before value of public certificate used for message security.
  getPublicCertificateNotBefore = () => this.attributes.public_certificate_not_before

  setPublicCertificateNotBefore = value => {
    this.attributes.public_certificate_not_before = value
  }

  // string # Not after value of public certificate used for message security.
  getPublicCertificateNotAfter = () => this.attributes.public_certificate_not_after

  setPublicCertificateNotAfter = value => {
    this.attributes.public_certificate_not_after = value
  }

  // string
  getPublicCertificate = () => this.attributes.public_certificate

  setPublicCertificate = value => {
    this.attributes.public_certificate = value
  }


  // Parameters:
  //   name - string - AS2 Name
  //   uri - string - URL base for AS2 responses
  //   server_certificate - string - Remote server certificate security setting
  //   public_certificate - string
  //   enable_dedicated_ips - boolean
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['uri'] && !isString(params['uri'])) {
      throw new errors.InvalidParameterError(`Bad parameter: uri must be of type String, received ${getType(uri)}`)
    }
    if (params['server_certificate'] && !isString(params['server_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(server_certificate)}`)
    }
    if (params['public_certificate'] && !isString(params['public_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(public_certificate)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new As2Partner(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = As2Partner.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

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

    const response = await Api.sendRequest(`/as2_partners`, 'GET', params, options)

    return response?.data?.map(obj => new As2Partner(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    As2Partner.list(params, options)

  // Parameters:
  //   id (required) - int64 - As2 Partner ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new As2Partner(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    As2Partner.find(id, params, options)

  // Parameters:
  //   name (required) - string - AS2 Name
  //   uri (required) - string - URL base for AS2 responses
  //   public_certificate (required) - string
  //   as2_station_id (required) - int64 - Id of As2Station for this partner
  //   server_certificate - string - Remote server certificate security setting
  //   enable_dedicated_ips - boolean
  static create = async (params = {}, options = {}) => {
    if (!params['name']) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params['uri']) {
      throw new errors.MissingParameterError('Parameter missing: uri')
    }

    if (!params['public_certificate']) {
      throw new errors.MissingParameterError('Parameter missing: public_certificate')
    }

    if (!params['as2_station_id']) {
      throw new errors.MissingParameterError('Parameter missing: as2_station_id')
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['uri'] && !isString(params['uri'])) {
      throw new errors.InvalidParameterError(`Bad parameter: uri must be of type String, received ${getType(params['uri'])}`)
    }

    if (params['public_certificate'] && !isString(params['public_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params['public_certificate'])}`)
    }

    if (params['as2_station_id'] && !isInt(params['as2_station_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: as2_station_id must be of type Int, received ${getType(params['as2_station_id'])}`)
    }

    if (params['server_certificate'] && !isString(params['server_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(params['server_certificate'])}`)
    }

    const response = await Api.sendRequest(`/as2_partners`, 'POST', params, options)

    return new As2Partner(response?.data, options)
  }
}

export default As2Partner
