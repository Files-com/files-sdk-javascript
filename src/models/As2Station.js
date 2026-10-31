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
 * Class As2Station
 */
class As2Station {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Id of the AS2 Station.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # ID of the Workspace associated with this AS2 Station.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # The station's formal AS2 name, unique across all Workspaces on the Site.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Public URI for sending AS2 message to.
  getUri = () => this.attributes.uri

  setUri = value => {
    this.attributes.uri = value
    exposeAttributes(this, ['uri'])
  }

  // string # The station's AS2 domain name.
  getDomain = () => this.attributes.domain

  setDomain = value => {
    this.attributes.domain = value
    exposeAttributes(this, ['domain'])
  }

  // string # Serial of public certificate used for message security in hex format.
  getHexPublicCertificateSerial = () => this.attributes.hex_public_certificate_serial

  setHexPublicCertificateSerial = value => {
    this.attributes.hex_public_certificate_serial = value
    exposeAttributes(this, ['hex_public_certificate_serial'])
  }

  // string # MD5 hash of public certificate used for message security.
  getPublicCertificateMd5 = () => this.attributes.public_certificate_md5

  setPublicCertificateMd5 = value => {
    this.attributes.public_certificate_md5 = value
    exposeAttributes(this, ['public_certificate_md5'])
  }

  // string # Public certificate used for message security.
  getPublicCertificate = () => this.attributes.public_certificate

  setPublicCertificate = value => {
    this.attributes.public_certificate = value
    exposeAttributes(this, ['public_certificate'])
  }

  // string # MD5 hash of private key used for message security.
  getPrivateKeyMd5 = () => this.attributes.private_key_md5

  setPrivateKeyMd5 = value => {
    this.attributes.private_key_md5 = value
    exposeAttributes(this, ['private_key_md5'])
  }

  // string # Subject of public certificate used for message security.
  getPublicCertificateSubject = () => this.attributes.public_certificate_subject

  setPublicCertificateSubject = value => {
    this.attributes.public_certificate_subject = value
    exposeAttributes(this, ['public_certificate_subject'])
  }

  // string # Issuer of public certificate used for message security.
  getPublicCertificateIssuer = () => this.attributes.public_certificate_issuer

  setPublicCertificateIssuer = value => {
    this.attributes.public_certificate_issuer = value
    exposeAttributes(this, ['public_certificate_issuer'])
  }

  // string # Serial of public certificate used for message security.
  getPublicCertificateSerial = () => this.attributes.public_certificate_serial

  setPublicCertificateSerial = value => {
    this.attributes.public_certificate_serial = value
    exposeAttributes(this, ['public_certificate_serial'])
  }

  // string # Not before value of public certificate used for message security.
  getPublicCertificateNotBefore = () => this.attributes.public_certificate_not_before

  setPublicCertificateNotBefore = value => {
    this.attributes.public_certificate_not_before = value
    exposeAttributes(this, ['public_certificate_not_before'])
  }

  // string # Not after value of public certificate used for message security.
  getPublicCertificateNotAfter = () => this.attributes.public_certificate_not_after

  setPublicCertificateNotAfter = value => {
    this.attributes.public_certificate_not_after = value
    exposeAttributes(this, ['public_certificate_not_after'])
  }

  // string # MD5 hash of private key password used for message security.
  getPrivateKeyPasswordMd5 = () => this.attributes.private_key_password_md5

  setPrivateKeyPasswordMd5 = value => {
    this.attributes.private_key_password_md5 = value
    exposeAttributes(this, ['private_key_password_md5'])
  }

  // string # PEM-encoded private key matching public_certificate.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
    exposeAttributes(this, ['private_key'])
  }

  // string # Password for the PEM-encoded private key.
  getPrivateKeyPassword = () => this.attributes.private_key_password

  setPrivateKeyPassword = value => {
    this.attributes.private_key_password = value
    exposeAttributes(this, ['private_key_password'])
  }

  // string # Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this instead of public_certificate and private_key.
  getPkcs12 = () => this.attributes.pkcs12

  setPkcs12 = value => {
    this.attributes.pkcs12 = value
    exposeAttributes(this, ['pkcs12'])
  }

  // string # Password for pkcs12. The file and password are used only for import; the extracted certificate and private key are stored as PEM.
  getPkcs12Password = () => this.attributes.pkcs12_password

  setPkcs12Password = value => {
    this.attributes.pkcs12_password = value
    exposeAttributes(this, ['pkcs12_password'])
  }

  // Parameters:
  //   name - string - The station's formal AS2 name, unique across all Workspaces on the Site.
  //   public_certificate - string - Public certificate used for message security.
  //   private_key - string - PEM-encoded private key matching public_certificate.
  //   private_key_password - string - Password for the PEM-encoded private key.
  //   pkcs12 - string - Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's replacement certificate and private key. Provide this instead of public_certificate and private_key.
  //   pkcs12_password - string - Password for pkcs12. The file and password are used only for import; the extracted certificate and private key are stored as PEM.
  update = async (params = {}) => {
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

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.public_certificate !== undefined && params.public_certificate !== null && !isString(params.public_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params.public_certificate)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_password !== undefined && params.private_key_password !== null && !isString(params.private_key_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params.private_key_password)}`)
    }

    if (params.pkcs12 !== undefined && params.pkcs12 !== null && !isString(params.pkcs12)) {
      throw new errors.InvalidParameterError(`Bad parameter: pkcs12 must be of type String, received ${getType(params.pkcs12)}`)
    }

    if (params.pkcs12_password !== undefined && params.pkcs12_password !== null && !isString(params.pkcs12_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: pkcs12_password must be of type String, received ${getType(params.pkcs12_password)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/as2_stations/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
  }

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

    await Api.sendRequest(`/as2_stations/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await As2Station.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/as2_stations', 'GET', params, options)

    return response?.data?.map(obj => new As2Station(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    As2Station.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      As2Station.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - As2 Station ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/as2_stations/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new As2Station(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    As2Station.find(id, params, options)

  // Parameters:
  //   name (required) - string - The station's formal AS2 name, unique across all Workspaces on the Site.
  //   workspace_id - int64 - ID of the Workspace associated with this AS2 Station.
  //   public_certificate - string - Public certificate used for message security.
  //   private_key - string - PEM-encoded private key matching public_certificate.
  //   private_key_password - string - Password for the PEM-encoded private key.
  //   pkcs12 - string - Base64-encoded PKCS#12 (.pfx or .p12) file containing the identity's certificate and private key. Provide this instead of public_certificate and private_key.
  //   pkcs12_password - string - Password for pkcs12. The file and password are used only for import; the extracted certificate and private key are stored as PEM.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.public_certificate !== undefined && params.public_certificate !== null && !isString(params.public_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params.public_certificate)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_password !== undefined && params.private_key_password !== null && !isString(params.private_key_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params.private_key_password)}`)
    }

    if (params.pkcs12 !== undefined && params.pkcs12 !== null && !isString(params.pkcs12)) {
      throw new errors.InvalidParameterError(`Bad parameter: pkcs12 must be of type String, received ${getType(params.pkcs12)}`)
    }

    if (params.pkcs12_password !== undefined && params.pkcs12_password !== null && !isString(params.pkcs12_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: pkcs12_password must be of type String, received ${getType(params.pkcs12_password)}`)
    }

    const response = await Api.sendRequest('/as2_stations', 'POST', params, options)

    return new As2Station(response?.data, retainedOptions(options))
  }
}

export default As2Station

module.exports = As2Station
module.exports.default = As2Station
