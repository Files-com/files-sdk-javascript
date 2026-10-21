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
 * Class SftpHostKey
 */
class SftpHostKey {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // boolean # If true, use this SFTP Host Key.
  getActive = () => this.attributes.active

  setActive = value => {
    this.attributes.active = value
    exposeAttributes(this, ['active'])
  }

  // int64 # Custom Domain ID. If set, this key is used only for that Custom Domain.
  getCustomDomainId = () => this.attributes.custom_domain_id

  setCustomDomainId = value => {
    this.attributes.custom_domain_id = value
    exposeAttributes(this, ['custom_domain_id'])
  }

  // int64 # SFTP Host Key ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # The friendly name of this SFTP Host Key.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # SSH key type
  getKeyType = () => this.attributes.key_type

  setKeyType = value => {
    this.attributes.key_type = value
    exposeAttributes(this, ['key_type'])
  }

  // string # MD5 Fingerprint of the public key
  getFingerprintMd5 = () => this.attributes.fingerprint_md5

  setFingerprintMd5 = value => {
    this.attributes.fingerprint_md5 = value
    exposeAttributes(this, ['fingerprint_md5'])
  }

  // string # SHA256 Fingerprint of the public key
  getFingerprintSha256 = () => this.attributes.fingerprint_sha256

  setFingerprintSha256 = value => {
    this.attributes.fingerprint_sha256 = value
    exposeAttributes(this, ['fingerprint_sha256'])
  }

  // string # The private key data.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
    exposeAttributes(this, ['private_key'])
  }

  // Parameters:
  //   active - boolean - If true, use this SFTP Host Key.
  //   custom_domain_id - int64 - Custom Domain ID. If set, this key is used only for that Custom Domain.
  //   name - string - The friendly name of this SFTP Host Key.
  //   private_key - string - The private key data.
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

    if (isArray(params.active) || isObject(params.active)) {
      throw new errors.InvalidParameterError(`Bad parameter: active must be of type Boolean, received ${getType(params.active)}`)
    }

    if (params.custom_domain_id !== undefined && params.custom_domain_id !== null && !isInt(params.custom_domain_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: custom_domain_id must be of type Int, received ${getType(params.custom_domain_id)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/sftp_host_keys/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/sftp_host_keys/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await SftpHostKey.create(this.attributes, this.options)
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

    const response = await Api.sendRequest('/sftp_host_keys', 'GET', params, options)

    return response?.data?.map(obj => new SftpHostKey(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    SftpHostKey.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      SftpHostKey.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Sftp Host Key ID.
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

    const response = await Api.sendRequest(`/sftp_host_keys/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new SftpHostKey(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    SftpHostKey.find(id, params, options)

  // Parameters:
  //   active - boolean - If true, use this SFTP Host Key.
  //   custom_domain_id - int64 - Custom Domain ID. If set, this key is used only for that Custom Domain.
  //   name - string - The friendly name of this SFTP Host Key.
  //   private_key - string - The private key data.
  static create = async (params = {}, options = {}) => {
    if (isArray(params.active) || isObject(params.active)) {
      throw new errors.InvalidParameterError(`Bad parameter: active must be of type Boolean, received ${getType(params.active)}`)
    }

    if (params.custom_domain_id !== undefined && params.custom_domain_id !== null && !isInt(params.custom_domain_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: custom_domain_id must be of type Int, received ${getType(params.custom_domain_id)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    const response = await Api.sendRequest('/sftp_host_keys', 'POST', params, options)

    return new SftpHostKey(response?.data, retainedOptions(options))
  }
}

export default SftpHostKey

module.exports = SftpHostKey
module.exports.default = SftpHostKey
