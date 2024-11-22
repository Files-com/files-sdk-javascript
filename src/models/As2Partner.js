/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // int64 # ID of the AS2 Partner.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # ID of the AS2 Station associated with this partner.
  getAs2StationId = () => this.attributes.as2_station_id

  setAs2StationId = value => {
    this.attributes.as2_station_id = value
  }

  // string # The partner's formal AS2 name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  getUri = () => this.attributes.uri

  setUri = value => {
    this.attributes.uri = value
  }

  // string # Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS?
  getServerCertificate = () => this.attributes.server_certificate

  setServerCertificate = value => {
    this.attributes.server_certificate = value
  }

  // string # Username to send to server for HTTP Authentication.
  getHttpAuthUsername = () => this.attributes.http_auth_username

  setHttpAuthUsername = value => {
    this.attributes.http_auth_username = value
  }

  // object # Additional HTTP Headers for outgoing message sent to this partner.
  getAdditionalHttpHeaders = () => this.attributes.additional_http_headers

  setAdditionalHttpHeaders = value => {
    this.attributes.additional_http_headers = value
  }

  // string # Default mime type of the file attached to the encrypted message
  getDefaultMimeType = () => this.attributes.default_mime_type

  setDefaultMimeType = value => {
    this.attributes.default_mime_type = value
  }

  // string # How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates.
  getMdnValidationLevel = () => this.attributes.mdn_validation_level

  setMdnValidationLevel = value => {
    this.attributes.mdn_validation_level = value
  }

  // boolean # If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
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

  // string # Password to send to server for HTTP Authentication.
  getHttpAuthPassword = () => this.attributes.http_auth_password

  setHttpAuthPassword = value => {
    this.attributes.http_auth_password = value
  }

  // string # Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
  getPublicCertificate = () => this.attributes.public_certificate

  setPublicCertificate = value => {
    this.attributes.public_certificate = value
  }

  // Parameters:
  //   enable_dedicated_ips - boolean - If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  //   http_auth_username - string - Username to send to server for HTTP Authentication.
  //   http_auth_password - string - Password to send to server for HTTP Authentication.
  //   mdn_validation_level - string - How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates.
  //   server_certificate - string - Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS?
  //   default_mime_type - string - Default mime type of the file attached to the encrypted message
  //   additional_http_headers - object - Additional HTTP Headers for outgoing message sent to this partner.
  //   name - string - The partner's formal AS2 name.
  //   uri - string - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  //   public_certificate - string - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
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

    if (params.http_auth_username && !isString(params.http_auth_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_username must be of type String, received ${getType(params.http_auth_username)}`)
    }

    if (params.http_auth_password && !isString(params.http_auth_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_password must be of type String, received ${getType(params.http_auth_password)}`)
    }

    if (params.mdn_validation_level && !isString(params.mdn_validation_level)) {
      throw new errors.InvalidParameterError(`Bad parameter: mdn_validation_level must be of type String, received ${getType(params.mdn_validation_level)}`)
    }

    if (params.server_certificate && !isString(params.server_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(params.server_certificate)}`)
    }

    if (params.default_mime_type && !isString(params.default_mime_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_mime_type must be of type String, received ${getType(params.default_mime_type)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.uri && !isString(params.uri)) {
      throw new errors.InvalidParameterError(`Bad parameter: uri must be of type String, received ${getType(params.uri)}`)
    }

    if (params.public_certificate && !isString(params.public_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params.public_certificate)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/as2_partners/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await As2Partner.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
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

    const response = await Api.sendRequest('/as2_partners', 'GET', params, options)

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

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/as2_partners/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new As2Partner(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    As2Partner.find(id, params, options)

  // Parameters:
  //   enable_dedicated_ips - boolean - If `true`, we will use your site's dedicated IPs for all outbound connections to this AS2 Partner.
  //   http_auth_username - string - Username to send to server for HTTP Authentication.
  //   http_auth_password - string - Password to send to server for HTTP Authentication.
  //   mdn_validation_level - string - How should Files.com evaluate message transfer success based on a partner's MDN response?  This setting does not affect MDN storage; all MDNs received from a partner are always stored. `none`: MDN is stored for informational purposes only, a successful HTTPS transfer is a successful AS2 transfer. `weak`: Inspect the MDN for MIC and Disposition only. `normal`: `weak` plus validate MDN signature matches body, `strict`: `normal` but do not allow signatures from self-signed or incorrectly purposed certificates.
  //   server_certificate - string - Should we require that the remote HTTP server have a valid SSL Certificate for HTTPS?
  //   default_mime_type - string - Default mime type of the file attached to the encrypted message
  //   additional_http_headers - object - Additional HTTP Headers for outgoing message sent to this partner.
  //   as2_station_id (required) - int64 - ID of the AS2 Station associated with this partner.
  //   name (required) - string - The partner's formal AS2 name.
  //   uri (required) - string - Public URI where we will send the AS2 messages (via HTTP/HTTPS).
  //   public_certificate (required) - string - Public certificate for AS2 Partner.  Note: This is the certificate for AS2 message security, not a certificate used for HTTPS authentication.
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

    if (!params.public_certificate) {
      throw new errors.MissingParameterError('Parameter missing: public_certificate')
    }

    if (params.http_auth_username && !isString(params.http_auth_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_username must be of type String, received ${getType(params.http_auth_username)}`)
    }

    if (params.http_auth_password && !isString(params.http_auth_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: http_auth_password must be of type String, received ${getType(params.http_auth_password)}`)
    }

    if (params.mdn_validation_level && !isString(params.mdn_validation_level)) {
      throw new errors.InvalidParameterError(`Bad parameter: mdn_validation_level must be of type String, received ${getType(params.mdn_validation_level)}`)
    }

    if (params.server_certificate && !isString(params.server_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: server_certificate must be of type String, received ${getType(params.server_certificate)}`)
    }

    if (params.default_mime_type && !isString(params.default_mime_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_mime_type must be of type String, received ${getType(params.default_mime_type)}`)
    }

    if (params.as2_station_id && !isInt(params.as2_station_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: as2_station_id must be of type Int, received ${getType(params.as2_station_id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.uri && !isString(params.uri)) {
      throw new errors.InvalidParameterError(`Bad parameter: uri must be of type String, received ${getType(params.uri)}`)
    }

    if (params.public_certificate && !isString(params.public_certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_certificate must be of type String, received ${getType(params.public_certificate)}`)
    }

    const response = await Api.sendRequest('/as2_partners', 'POST', params, options)

    return new As2Partner(response?.data, options)
  }

  static createExport = async (options = {}) => {
    const response = await Api.sendRequest('/as2_partners/create_export', 'POST', {}, options)

    const Export = require('./Export.js').default
    return new Export(response?.data, options)
  }
}

export default As2Partner

module.exports = As2Partner
module.exports.default = As2Partner
