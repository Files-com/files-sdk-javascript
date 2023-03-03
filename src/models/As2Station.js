import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class As2Station
 */
class As2Station {
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
  // int64 # Id of the AS2 Station.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # The station's formal AS2 name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Public URI for sending AS2 message to.
  getUri = () => this.attributes.uri

  setUri = value => {
    this.attributes.uri = value
  }

  // string # The station's AS2 domain name.
  getDomain = () => this.attributes.domain

  setDomain = value => {
    this.attributes.domain = value
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

  // string # MD5 hash of private key used for message security.
  getPrivateKeyMd5 = () => this.attributes.private_key_md5

  setPrivateKeyMd5 = value => {
    this.attributes.private_key_md5 = value
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

  // string # MD5 hash of private key password used for message security.
  getPrivateKeyPasswordMd5 = () => this.attributes.private_key_password_md5

  setPrivateKeyPasswordMd5 = value => {
    this.attributes.private_key_password_md5 = value
  }

  // string
  getPublicCertificate = () => this.attributes.public_certificate

  setPublicCertificate = value => {
    this.attributes.public_certificate = value
  }

  // string
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
  }

  // string
  getPrivateKeyPassword = () => this.attributes.private_key_password

  setPrivateKeyPassword = value => {
    this.attributes.private_key_password = value
  }


  // Parameters:
  //   name - string - AS2 Name
  //   public_certificate - string
  //   private_key - string
  //   private_key_password - string
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
    if (params['public_certificate'] && !isString(params['public_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(public_certificate)}`)
    }
    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }
    if (params['private_key_password'] && !isString(params['private_key_password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(private_key_password)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/as2_stations/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new As2Station(response?.data, this.options)
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

    const response = await Api.sendRequest(`/as2_stations/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = As2Station.create(this.attributes, this.options)
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

    const response = await Api.sendRequest(`/as2_stations`, 'GET', params, options)

    return response?.data?.map(obj => new As2Station(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    As2Station.list(params, options)

  // Parameters:
  //   id (required) - int64 - As2 Station ID.
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

    const response = await Api.sendRequest(`/as2_stations/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new As2Station(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    As2Station.find(id, params, options)

  // Parameters:
  //   name (required) - string - AS2 Name
  //   public_certificate (required) - string
  //   private_key (required) - string
  //   private_key_password - string
  static create = async (params = {}, options = {}) => {
    if (!params['name']) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params['public_certificate']) {
      throw new errors.MissingParameterError('Parameter missing: public_certificate')
    }

    if (!params['private_key']) {
      throw new errors.MissingParameterError('Parameter missing: private_key')
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['public_certificate'] && !isString(params['public_certificate'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params['public_certificate'])}`)
    }

    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params['private_key'])}`)
    }

    if (params['private_key_password'] && !isString(params['private_key_password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params['private_key_password'])}`)
    }

    const response = await Api.sendRequest(`/as2_stations`, 'POST', params, options)

    return new As2Station(response?.data, options)
  }
}

export default As2Station
