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
 * Class As2Partner
 */
class As2Partner {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # ID of the AS2 Partner.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # ID of the Workspace associated with this AS2 Partner.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // int64 # ID of the AS2 Station associated with this partner.
  getAs2StationId = () => this.attributes.as2_station_id

  setAs2StationId = value => {
    this.attributes.as2_station_id = value
    exposeAttributes(this, ['as2_station_id'])
  }

  // string # The partner's formal AS2 name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  getUri = () => this.attributes.uri

  setUri = value => {
    this.attributes.uri = value
    exposeAttributes(this, ['uri'])
  }

  // string # Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to Outgoing AS2 message from Files.com to a Partner.)
  getServerCertificate = () => this.attributes.server_certificate

  setServerCertificate = value => {
    this.attributes.server_certificate = value
    exposeAttributes(this, ['server_certificate'])
  }

  // string # Username to send to server for HTTP Authentication.
  getHttpAuthUsername = () => this.attributes.http_auth_username

  setHttpAuthUsername = value => {
    this.attributes.http_auth_username = value
    exposeAttributes(this, ['http_auth_username'])
  }

  // object # Additional HTTP Headers for outgoing message sent to this partner.
  getAdditionalHttpHeaders = () => this.attributes.additional_http_headers

  setAdditionalHttpHeaders = value => {
    this.attributes.additional_http_headers = value
    exposeAttributes(this, ['additional_http_headers'])
  }

  // string # Default mime type of the file attached to the encrypted message
  getDefaultMimeType = () => this.attributes.default_mime_type

  setDefaultMimeType = value => {
    this.attributes.default_mime_type = value
    exposeAttributes(this, ['default_mime_type'])
  }

  // string # How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for this setting based on next mdn received.
  getMdnValidationLevel = () => this.attributes.mdn_validation_level

  setMdnValidationLevel = value => {
    this.attributes.mdn_validation_level = value
    exposeAttributes(this, ['mdn_validation_level'])
  }

  // string # Should Files.com require signatures on incoming AS2 messages?  `normal`: require that incoming messages are signed with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting state. The next message received is always accepted and switches this to `normal` if it carries a valid signature, or `none` if it does not.
  getSignatureValidationLevel = () => this.attributes.signature_validation_level

  setSignatureValidationLevel = value => {
    this.attributes.signature_validation_level = value
    exposeAttributes(this, ['signature_validation_level'])
  }

  // boolean # If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  getEnableDedicatedIps = () => this.attributes.enable_dedicated_ips

  setEnableDedicatedIps = value => {
    this.attributes.enable_dedicated_ips = value
    exposeAttributes(this, ['enable_dedicated_ips'])
  }

  // string # Serial of public certificate used for message security in hex format.
  getHexPublicCertificateSerial = () => this.attributes.hex_public_certificate_serial

  setHexPublicCertificateSerial = value => {
    this.attributes.hex_public_certificate_serial = value
    exposeAttributes(this, ['hex_public_certificate_serial'])
  }

  // string # Public certificate used for message security.
  getPublicCertificate = () => this.attributes.public_certificate

  setPublicCertificate = value => {
    this.attributes.public_certificate = value
    exposeAttributes(this, ['public_certificate'])
  }

  // string # MD5 hash of public certificate used for message security.
  getPublicCertificateMd5 = () => this.attributes.public_certificate_md5

  setPublicCertificateMd5 = value => {
    this.attributes.public_certificate_md5 = value
    exposeAttributes(this, ['public_certificate_md5'])
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

  // string # Password to send to server for HTTP Authentication.
  getHttpAuthPassword = () => this.attributes.http_auth_password

  setHttpAuthPassword = value => {
    this.attributes.http_auth_password = value
    exposeAttributes(this, ['http_auth_password'])
  }

  // string # Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one certificate.
  getPkcs12 = () => this.attributes.pkcs12

  setPkcs12 = value => {
    this.attributes.pkcs12 = value
    exposeAttributes(this, ['pkcs12'])
  }

  // string # Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored as PEM.
  getPkcs12Password = () => this.attributes.pkcs12_password

  setPkcs12Password = value => {
    this.attributes.pkcs12_password = value
    exposeAttributes(this, ['pkcs12_password'])
  }

  // Parameters:
  //   enable_dedicated_ips - boolean - If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  //   http_auth_username - string - Username to send to server for HTTP Authentication.
  //   http_auth_password - string - Password to send to server for HTTP Authentication.
  //   mdn_validation_level - string - How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for this setting based on next mdn received.
  //   signature_validation_level - string - Should Files.com require signatures on incoming AS2 messages?  `normal`: require that incoming messages are signed with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting state. The next message received is always accepted and switches this to `normal` if it carries a valid signature, or `none` if it does not.
  //   server_certificate - string - Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to Outgoing AS2 message from Files.com to a Partner.)
  //   default_mime_type - string - Default mime type of the file attached to the encrypted message
  //   additional_http_headers - object - Additional HTTP Headers for outgoing message sent to this partner.
  //   name - string - The partner's formal AS2 name.
  //   uri - string - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  //   public_certificate - string - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
  //   pkcs12 - string - Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one certificate.
  //   pkcs12_password - string - Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored as PEM.
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

    if (isArray(params.enable_dedicated_ips) || isObject(params.enable_dedicated_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: enable_dedicated_ips must be of type Boolean, received ${getType(params.enable_dedicated_ips)}`)
    }

    if (params.http_auth_username !== undefined && params.http_auth_username !== null && !isString(params.http_auth_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_username must be of type String, received ${getType(params.http_auth_username)}`)
    }

    if (params.http_auth_password !== undefined && params.http_auth_password !== null && !isString(params.http_auth_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_password must be of type String, received ${getType(params.http_auth_password)}`)
    }

    if (params.mdn_validation_level !== undefined && params.mdn_validation_level !== null && !isString(params.mdn_validation_level)) {
      throw new errors.InvalidParameterError(`Bad parameter: mdn_validation_level must be of type String, received ${getType(params.mdn_validation_level)}`)
    }

    if (params.signature_validation_level !== undefined && params.signature_validation_level !== null && !isString(params.signature_validation_level)) {
      throw new errors.InvalidParameterError(`Bad parameter: signature_validation_level must be of type String, received ${getType(params.signature_validation_level)}`)
    }

    if (params.server_certificate !== undefined && params.server_certificate !== null && !isString(params.server_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(params.server_certificate)}`)
    }

    if (params.default_mime_type !== undefined && params.default_mime_type !== null && !isString(params.default_mime_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_mime_type must be of type String, received ${getType(params.default_mime_type)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.uri !== undefined && params.uri !== null && !isString(params.uri)) {
      throw new errors.InvalidParameterError(`Bad parameter: uri must be of type String, received ${getType(params.uri)}`)
    }

    if (params.public_certificate !== undefined && params.public_certificate !== null && !isString(params.public_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params.public_certificate)}`)
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

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/as2_partners/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await As2Partner.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `as2_station_id` or `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `as2_station_id` and `workspace_id`. Valid field combinations are `[ workspace_id, as2_station_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/as2_partners', 'GET', params, options)

    return response?.data?.map(obj => new As2Partner(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    As2Partner.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      As2Partner.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - As2 Partner ID.
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

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new As2Partner(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    As2Partner.find(id, params, options)

  // Parameters:
  //   enable_dedicated_ips - boolean - If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  //   http_auth_username - string - Username to send to server for HTTP Authentication.
  //   http_auth_password - string - Password to send to server for HTTP Authentication.
  //   mdn_validation_level - string - How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates. `auto`: Automatically set the correct value for this setting based on next mdn received.
  //   signature_validation_level - string - Should Files.com require signatures on incoming AS2 messages?  `normal`: require that incoming messages are signed with a valid matching signature. `none`: Unsigned incoming messages are allowed. `auto`: A one-time starting state. The next message received is always accepted and switches this to `normal` if it carries a valid signature, or `none` if it does not.
  //   server_certificate - string - Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS? (This only applies to Outgoing AS2 message from Files.com to a Partner.)
  //   default_mime_type - string - Default mime type of the file attached to the encrypted message
  //   additional_http_headers - object - Additional HTTP Headers for outgoing message sent to this partner.
  //   as2_station_id (required) - int64 - ID of the AS2 Station associated with this partner.
  //   name (required) - string - The partner's formal AS2 name.
  //   uri (required) - string - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  //   public_certificate - string - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
  //   pkcs12 - string - Base64-encoded PKCS#12 (.pfx or .p12) file containing the partner's public certificate. Provide this instead of public_certificate. Any private key in the file is discarded. A public-only file must contain exactly one certificate.
  //   pkcs12_password - string - Password for pkcs12. The file and password are used only for import; the extracted public certificate is stored as PEM.
  static create = async (params = {}, options = {}) => {
    if (!params.as2_station_id) {
      throw new errors.MissingParameterError('Parameter missing: as2_station_id')
    }

    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.uri) {
      throw new errors.MissingParameterError('Parameter missing: uri')
    }

    if (isArray(params.enable_dedicated_ips) || isObject(params.enable_dedicated_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: enable_dedicated_ips must be of type Boolean, received ${getType(params.enable_dedicated_ips)}`)
    }

    if (params.http_auth_username !== undefined && params.http_auth_username !== null && !isString(params.http_auth_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_username must be of type String, received ${getType(params.http_auth_username)}`)
    }

    if (params.http_auth_password !== undefined && params.http_auth_password !== null && !isString(params.http_auth_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_password must be of type String, received ${getType(params.http_auth_password)}`)
    }

    if (params.mdn_validation_level !== undefined && params.mdn_validation_level !== null && !isString(params.mdn_validation_level)) {
      throw new errors.InvalidParameterError(`Bad parameter: mdn_validation_level must be of type String, received ${getType(params.mdn_validation_level)}`)
    }

    if (params.signature_validation_level !== undefined && params.signature_validation_level !== null && !isString(params.signature_validation_level)) {
      throw new errors.InvalidParameterError(`Bad parameter: signature_validation_level must be of type String, received ${getType(params.signature_validation_level)}`)
    }

    if (params.server_certificate !== undefined && params.server_certificate !== null && !isString(params.server_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(params.server_certificate)}`)
    }

    if (params.default_mime_type !== undefined && params.default_mime_type !== null && !isString(params.default_mime_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_mime_type must be of type String, received ${getType(params.default_mime_type)}`)
    }

    if (params.as2_station_id !== undefined && params.as2_station_id !== null && !isInt(params.as2_station_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: as2_station_id must be of type Int, received ${getType(params.as2_station_id)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.uri !== undefined && params.uri !== null && !isString(params.uri)) {
      throw new errors.InvalidParameterError(`Bad parameter: uri must be of type String, received ${getType(params.uri)}`)
    }

    if (params.public_certificate !== undefined && params.public_certificate !== null && !isString(params.public_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params.public_certificate)}`)
    }

    if (params.pkcs12 !== undefined && params.pkcs12 !== null && !isString(params.pkcs12)) {
      throw new errors.InvalidParameterError(`Bad parameter: pkcs12 must be of type String, received ${getType(params.pkcs12)}`)
    }

    if (params.pkcs12_password !== undefined && params.pkcs12_password !== null && !isString(params.pkcs12_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: pkcs12_password must be of type String, received ${getType(params.pkcs12_password)}`)
    }

    const response = await Api.sendRequest('/as2_partners', 'POST', params, options)

    return new As2Partner(response?.data, retainedOptions(options))
  }
}

export default As2Partner

module.exports = As2Partner
module.exports.default = As2Partner
