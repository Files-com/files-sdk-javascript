/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class PublicKey
 */
class PublicKey {
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

  // int64 # Public key ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Public key title
  getTitle = () => this.attributes.title

  setTitle = value => {
    this.attributes.title = value
  }

  // date-time # Public key created at date/time
  getCreatedAt = () => this.attributes.created_at

  // string # Public key fingerprint (MD5)
  getFingerprint = () => this.attributes.fingerprint

  setFingerprint = value => {
    this.attributes.fingerprint = value
  }

  // string # Public key fingerprint (SHA256)
  getFingerprintSha256 = () => this.attributes.fingerprint_sha256

  setFingerprintSha256 = value => {
    this.attributes.fingerprint_sha256 = value
  }

  // date-time # Key's most recent login time via SFTP
  getLastLoginAt = () => this.attributes.last_login_at

  setLastLoginAt = value => {
    this.attributes.last_login_at = value
  }

  // string # Username of the user this public key is associated with
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // int64 # User ID this public key is associated with
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Actual contents of SSH key.
  getPublicKey = () => this.attributes.public_key

  setPublicKey = value => {
    this.attributes.public_key = value
  }

  // Parameters:
  //   title (required) - string - Internal reference for key.
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

    if (params.title && !isString(params.title)) {
      throw new errors.InvalidParameterError(`Bad parameter: title must be of type String, received ${getType(params.title)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params.title) {
      if (this.attributes.title) {
        params.title = this.title
      } else {
        throw new errors.MissingParameterError('Parameter missing: title')
      }
    }

    const response = await Api.sendRequest(`/public_keys/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new PublicKey(response?.data, this.options)
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

    await Api.sendRequest(`/public_keys/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await PublicKey.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/public_keys', 'GET', params, options)

    return response?.data?.map(obj => new PublicKey(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    PublicKey.list(params, options)

  // Parameters:
  //   id (required) - int64 - Public Key ID.
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

    const response = await Api.sendRequest(`/public_keys/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new PublicKey(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    PublicKey.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   title (required) - string - Internal reference for key.
  //   public_key (required) - string - Actual contents of SSH key.
  static create = async (params = {}, options = {}) => {
    if (!params.title) {
      throw new errors.MissingParameterError('Parameter missing: title')
    }

    if (!params.public_key) {
      throw new errors.MissingParameterError('Parameter missing: public_key')
    }

    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.title && !isString(params.title)) {
      throw new errors.InvalidParameterError(`Bad parameter: title must be of type String, received ${getType(params.title)}`)
    }

    if (params.public_key && !isString(params.public_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(params.public_key)}`)
    }

    const response = await Api.sendRequest('/public_keys', 'POST', params, options)

    return new PublicKey(response?.data, options)
  }
}

export default PublicKey

module.exports = PublicKey
module.exports.default = PublicKey
