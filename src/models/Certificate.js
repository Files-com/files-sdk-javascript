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
 * Class Certificate
 */
class Certificate {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Certificate ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Descriptive name of certificate
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // int64 # Custom Domain that owns this certificate, including while the certificate is inactive.
  getCustomDomainId = () => this.attributes.custom_domain_id

  setCustomDomainId = value => {
    this.attributes.custom_domain_id = value
    exposeAttributes(this, ['custom_domain_id'])
  }

  // string # Full text of SSL certificate
  getCertificate = () => this.attributes.certificate

  setCertificate = value => {
    this.attributes.certificate = value
    exposeAttributes(this, ['certificate'])
  }

  // date-time # Certificate created at
  getCreatedAt = () => this.attributes.created_at

  // string # Certificate status. (One of `Request Generated`, `New`, `Active`, `Active/Expired`, `Expired`, or `Available`)
  getDisplayStatus = () => this.attributes.display_status

  setDisplayStatus = value => {
    this.attributes.display_status = value
    exposeAttributes(this, ['display_status'])
  }

  // array(string) # Domains on this certificate other than files.com domains
  getDomains = () => this.attributes.domains

  setDomains = value => {
    this.attributes.domains = value
    exposeAttributes(this, ['domains'])
  }

  // date-time # Certificate expiration date/time
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
    exposeAttributes(this, ['expires_at'])
  }

  // boolean # Is this certificate automatically managed and renewed by Files.com?
  getBrickManaged = () => this.attributes.brick_managed

  setBrickManaged = value => {
    this.attributes.brick_managed = value
    exposeAttributes(this, ['brick_managed'])
  }

  // string # Intermediate certificates
  getIntermediates = () => this.attributes.intermediates

  setIntermediates = value => {
    this.attributes.intermediates = value
    exposeAttributes(this, ['intermediates'])
  }

  // array(string) # A list of IP addresses associated with this SSL Certificate
  getIpAddresses = () => this.attributes.ip_addresses

  setIpAddresses = value => {
    this.attributes.ip_addresses = value
    exposeAttributes(this, ['ip_addresses'])
  }

  // string # X509 issuer
  getIssuer = () => this.attributes.issuer

  setIssuer = value => {
    this.attributes.issuer = value
    exposeAttributes(this, ['issuer'])
  }

  // string # Type of key
  getKeyType = () => this.attributes.key_type

  setKeyType = value => {
    this.attributes.key_type = value
    exposeAttributes(this, ['key_type'])
  }

  // string # Certificate signing request text
  getRequest = () => this.attributes.request

  setRequest = value => {
    this.attributes.request = value
    exposeAttributes(this, ['request'])
  }

  // string # Certificate status (Request Generated, New, Active, Active/Expired, Expired, or Available)
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // string # X509 Subject name
  getSubject = () => this.attributes.subject

  setSubject = value => {
    this.attributes.subject = value
    exposeAttributes(this, ['subject'])
  }

  // string # Domain for certificate.
  getCertificateDomain = () => this.attributes.certificate_domain

  setCertificateDomain = value => {
    this.attributes.certificate_domain = value
    exposeAttributes(this, ['certificate_domain'])
  }

  // array(string) # Additional domains for the certificate CSR.
  getCertificateExtraDomains = () => this.attributes.certificate_extra_domains

  setCertificateExtraDomains = value => {
    this.attributes.certificate_extra_domains = value
    exposeAttributes(this, ['certificate_extra_domains'])
  }

  // string # Country.
  getCertificateCountry = () => this.attributes.certificate_country

  setCertificateCountry = value => {
    this.attributes.certificate_country = value
    exposeAttributes(this, ['certificate_country'])
  }

  // string # State or province.
  getCertificateStateOrProvince = () => this.attributes.certificate_state_or_province

  setCertificateStateOrProvince = value => {
    this.attributes.certificate_state_or_province = value
    exposeAttributes(this, ['certificate_state_or_province'])
  }

  // string # City or locale.
  getCertificateCityOrLocale = () => this.attributes.certificate_city_or_locale

  setCertificateCityOrLocale = value => {
    this.attributes.certificate_city_or_locale = value
    exposeAttributes(this, ['certificate_city_or_locale'])
  }

  // string # Company name.
  getCertificateCompanyName = () => this.attributes.certificate_company_name

  setCertificateCompanyName = value => {
    this.attributes.certificate_company_name = value
    exposeAttributes(this, ['certificate_company_name'])
  }

  // string # Department name or organization unit 1
  getCsrOu1 = () => this.attributes.csr_ou1

  setCsrOu1 = value => {
    this.attributes.csr_ou1 = value
    exposeAttributes(this, ['csr_ou1'])
  }

  // string # Department name or organization unit 2
  getCsrOu2 = () => this.attributes.csr_ou2

  setCsrOu2 = value => {
    this.attributes.csr_ou2 = value
    exposeAttributes(this, ['csr_ou2'])
  }

  // string # Department name or organization unit 3
  getCsrOu3 = () => this.attributes.csr_ou3

  setCsrOu3 = value => {
    this.attributes.csr_ou3 = value
    exposeAttributes(this, ['csr_ou3'])
  }

  // string # Email address for the certificate owner.
  getCertificateEmailAddress = () => this.attributes.certificate_email_address

  setCertificateEmailAddress = value => {
    this.attributes.certificate_email_address = value
    exposeAttributes(this, ['certificate_email_address'])
  }

  // string # Certificate private key.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
    exposeAttributes(this, ['private_key'])
  }

  // string # Certificate password.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
    exposeAttributes(this, ['password'])
  }

  // Activate SSL Certificate
  //
  // Parameters:
  //   replace_cert - string - Leave blank or set to `any` to replace any currently active certificate, if applicable.  Set to `new_ips` to activate this certificate as an additional certificate on your Site by allocating a new set of Dedicated IPs (may require a Plan upgrade).  Set to the ID of a currently active certificate to replace that certificate on its set of dedicated IPs.  A certificate belonging to a Custom Domain activates only for that domain: leave blank, use `any`, or specify that domain's current certificate ID.
  activate = async (params = {}) => {
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

    if (params.replace_cert !== undefined && params.replace_cert !== null && !isString(params.replace_cert)) {
      throw new errors.InvalidParameterError(`Bad parameter: replace_cert must be of type String, received ${getType(params.replace_cert)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/certificates/${encodeURIComponent(params.id)}/activate`, 'POST', params, this.options)
  }

  // Deactivate SSL Certificate
  deactivate = async (params = {}) => {
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

    await Api.sendRequest(`/certificates/${encodeURIComponent(params.id)}/deactivate`, 'POST', params, this.options)
  }

  // Replace this active custom SSL Certificate for the Primary Custom Domain with a Files.com SSL Certificate.  The Primary Custom Domain's CNAME record must point at the Site's subdomain.  The Files.com certificate is issued and activated in the background
  replaceWithFiles = async (params = {}) => {
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

    await Api.sendRequest(`/certificates/${encodeURIComponent(params.id)}/replace_with_files_certificate`, 'POST', params, this.options)
  }

  // Parameters:
  //   name - string - Internal certificate name.
  //   intermediates - string - Any intermediate certificates.  PEM or PKCS7 formats accepted.
  //   certificate - string - The certificate.  PEM or PKCS7 formats accepted.
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

    if (params.intermediates !== undefined && params.intermediates !== null && !isString(params.intermediates)) {
      throw new errors.InvalidParameterError(`Bad parameter: intermediates must be of type String, received ${getType(params.intermediates)}`)
    }

    if (params.certificate !== undefined && params.certificate !== null && !isString(params.certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate must be of type String, received ${getType(params.certificate)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/certificates/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/certificates/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Certificate.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/certificates', 'GET', params, options)

    return response?.data?.map(obj => new Certificate(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Certificate.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Certificate.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Certificate ID.
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

    const response = await Api.sendRequest(`/certificates/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Certificate(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Certificate.find(id, params, options)

  // Parameters:
  //   name (required) - string - Internal name of the SSL certificate.
  //   certificate_domain - string - Domain for certificate.
  //   certificate_extra_domains - array(string) - Additional domains for the certificate CSR.
  //   certificate_country - string - Country.
  //   certificate_state_or_province - string - State or province.
  //   certificate_city_or_locale - string - City or locale.
  //   certificate_company_name - string - Company name.
  //   csr_ou1 - string - Department name or organization unit 1
  //   csr_ou2 - string - Department name or organization unit 2
  //   csr_ou3 - string - Department name or organization unit 3
  //   certificate_email_address - string - Email address for the certificate owner.
  //   key_type - string - Any supported key type.  Defaults to `RSA-4096`.
  //   certificate - string - The certificate.  PEM or PKCS7 formats accepted.
  //   private_key - string - Certificate private key.
  //   password - string - Certificate password.
  //   intermediates - string - Intermediate certificates.  PEM or PKCS7 formats accepted.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.certificate_domain !== undefined && params.certificate_domain !== null && !isString(params.certificate_domain)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_domain must be of type String, received ${getType(params.certificate_domain)}`)
    }

    if (params.certificate_extra_domains !== undefined && params.certificate_extra_domains !== null && !isArray(params.certificate_extra_domains)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_extra_domains must be of type Array, received ${getType(params.certificate_extra_domains)}`)
    }

    if (params.certificate_country !== undefined && params.certificate_country !== null && !isString(params.certificate_country)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_country must be of type String, received ${getType(params.certificate_country)}`)
    }

    if (params.certificate_state_or_province !== undefined && params.certificate_state_or_province !== null && !isString(params.certificate_state_or_province)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_state_or_province must be of type String, received ${getType(params.certificate_state_or_province)}`)
    }

    if (params.certificate_city_or_locale !== undefined && params.certificate_city_or_locale !== null && !isString(params.certificate_city_or_locale)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_city_or_locale must be of type String, received ${getType(params.certificate_city_or_locale)}`)
    }

    if (params.certificate_company_name !== undefined && params.certificate_company_name !== null && !isString(params.certificate_company_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_company_name must be of type String, received ${getType(params.certificate_company_name)}`)
    }

    if (params.csr_ou1 !== undefined && params.csr_ou1 !== null && !isString(params.csr_ou1)) {
      throw new errors.InvalidParameterError(`Bad parameter: csr_ou1 must be of type String, received ${getType(params.csr_ou1)}`)
    }

    if (params.csr_ou2 !== undefined && params.csr_ou2 !== null && !isString(params.csr_ou2)) {
      throw new errors.InvalidParameterError(`Bad parameter: csr_ou2 must be of type String, received ${getType(params.csr_ou2)}`)
    }

    if (params.csr_ou3 !== undefined && params.csr_ou3 !== null && !isString(params.csr_ou3)) {
      throw new errors.InvalidParameterError(`Bad parameter: csr_ou3 must be of type String, received ${getType(params.csr_ou3)}`)
    }

    if (params.certificate_email_address !== undefined && params.certificate_email_address !== null && !isString(params.certificate_email_address)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate_email_address must be of type String, received ${getType(params.certificate_email_address)}`)
    }

    if (params.key_type !== undefined && params.key_type !== null && !isString(params.key_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: key_type must be of type String, received ${getType(params.key_type)}`)
    }

    if (params.certificate !== undefined && params.certificate !== null && !isString(params.certificate)) {
      throw new errors.InvalidParameterError(`Bad parameter: certificate must be of type String, received ${getType(params.certificate)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.password !== undefined && params.password !== null && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (params.intermediates !== undefined && params.intermediates !== null && !isString(params.intermediates)) {
      throw new errors.InvalidParameterError(`Bad parameter: intermediates must be of type String, received ${getType(params.intermediates)}`)
    }

    const response = await Api.sendRequest('/certificates', 'POST', params, options)

    return new Certificate(response?.data, retainedOptions(options))
  }
}

export default Certificate

module.exports = Certificate
module.exports.default = Certificate
