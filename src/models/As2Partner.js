import Api from '../Api'
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
  //   public_certificate - string
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['uri'] && !isString(params['uri'])) {
      throw new Error(`Bad parameter: uri must be of type String, received ${getType(uri)}`)
    }
    if (params['public_certificate'] && !isString(params['public_certificate'])) {
      throw new Error(`Bad parameter: public_certificate must be of type String, received ${getType(public_certificate)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/as2_partners/${params['id']}`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/as2_partners/${params['id']}`, 'DELETE', params, this.options)
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
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via either the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
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
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/as2_partners/${params['id']}`, 'GET', params, options)

    return new As2Partner(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    As2Partner.find(id, params, options)

  // Parameters:
  //   name (required) - string - AS2 Name
  //   uri (required) - string - URL base for AS2 responses
  //   public_certificate (required) - string
  //   as2_station_id (required) - int64 - Id of As2Station for this partner
  static create = async (params = {}, options = {}) => {
    if (!params['name']) {
      throw new Error('Parameter missing: name')
    }

    if (!params['uri']) {
      throw new Error('Parameter missing: uri')
    }

    if (!params['public_certificate']) {
      throw new Error('Parameter missing: public_certificate')
    }

    if (!params['as2_station_id']) {
      throw new Error('Parameter missing: as2_station_id')
    }

    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (params['uri'] && !isString(params['uri'])) {
      throw new Error(`Bad parameter: uri must be of type String, received ${getType(uri)}`)
    }

    if (params['public_certificate'] && !isString(params['public_certificate'])) {
      throw new Error(`Bad parameter: public_certificate must be of type String, received ${getType(public_certificate)}`)
    }

    if (params['as2_station_id'] && !isInt(params['as2_station_id'])) {
      throw new Error(`Bad parameter: as2_station_id must be of type Int, received ${getType(as2_station_id)}`)
    }

    const response = await Api.sendRequest(`/as2_partners`, 'POST', params, options)

    return new As2Partner(response?.data, options)
  }
}

export default As2Partner
