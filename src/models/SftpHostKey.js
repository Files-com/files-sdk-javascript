import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class SftpHostKey
 */
class SftpHostKey {
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
  // int64 # Sftp Host Key ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # The friendly name of this SFTP Host Key.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # MD5 Fingerpint of the public key
  getFingerprintMd5 = () => this.attributes.fingerprint_md5

  setFingerprintMd5 = value => {
    this.attributes.fingerprint_md5 = value
  }

  // string # SHA256 Fingerpint of the public key
  getFingerprintSha256 = () => this.attributes.fingerprint_sha256

  setFingerprintSha256 = value => {
    this.attributes.fingerprint_sha256 = value
  }

  // string # The private key data.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
  }


  // Parameters:
  //   name - string - The friendly name of this SFTP Host Key.
  //   private_key - string - The private key data.
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
    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/sftp_host_keys/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new SftpHostKey(response?.data, this.options)
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

    const response = await Api.sendRequest(`/sftp_host_keys/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = SftpHostKey.create(this.attributes, this.options)
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

    const response = await Api.sendRequest(`/sftp_host_keys`, 'GET', params, options)

    return response?.data?.map(obj => new SftpHostKey(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SftpHostKey.list(params, options)

  // Parameters:
  //   id (required) - int64 - Sftp Host Key ID.
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

    const response = await Api.sendRequest(`/sftp_host_keys/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new SftpHostKey(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    SftpHostKey.find(id, params, options)

  // Parameters:
  //   name - string - The friendly name of this SFTP Host Key.
  //   private_key - string - The private key data.
  static create = async (params = {}, options = {}) => {
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params['private_key'])}`)
    }

    const response = await Api.sendRequest(`/sftp_host_keys`, 'POST', params, options)

    return new SftpHostKey(response?.data, options)
  }
}

export default SftpHostKey
