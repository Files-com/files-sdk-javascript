import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class GpgKey
 */
class GpgKey {
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
  // int64 # Your GPG key ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // date-time # Your GPG key expiration date.
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
  }

  // string # Your GPG key name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // int64 # GPG owner's user id
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Your GPG public key
  getPublicKey = () => this.attributes.public_key

  setPublicKey = value => {
    this.attributes.public_key = value
  }

  // string # Your GPG private key.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
  }

  // string # Your GPG private key password. Only required for password protected keys.
  getPrivateKeyPassword = () => this.attributes.private_key_password

  setPrivateKeyPassword = value => {
    this.attributes.private_key_password = value
  }


  // Parameters:
  //   public_key - string - Your GPG public key
  //   private_key - string - Your GPG private key.
  //   private_key_password - string - Your GPG private key password. Only required for password protected keys.
  //   name - string - Your GPG key name.
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
    if (params['public_key'] && !isString(params['public_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(public_key)}`)
    }
    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(private_key)}`)
    }
    if (params['private_key_password'] && !isString(params['private_key_password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(private_key_password)}`)
    }
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new GpgKey(response?.data, this.options)
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

    const response = await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = GpgKey.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[name]=desc`). Valid fields are `name` and `expires_at`.
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/gpg_keys`, 'GET', params, options)

    return response?.data?.map(obj => new GpgKey(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    GpgKey.list(params, options)

  // Parameters:
  //   id (required) - int64 - Gpg Key ID.
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

    const response = await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new GpgKey(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    GpgKey.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   public_key - string - Your GPG public key
  //   private_key - string - Your GPG private key.
  //   private_key_password - string - Your GPG private key password. Only required for password protected keys.
  //   name (required) - string - Your GPG key name.
  static create = async (params = {}, options = {}) => {
    if (!params['name']) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['public_key'] && !isString(params['public_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(params['public_key'])}`)
    }

    if (params['private_key'] && !isString(params['private_key'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params['private_key'])}`)
    }

    if (params['private_key_password'] && !isString(params['private_key_password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params['private_key_password'])}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    const response = await Api.sendRequest(`/gpg_keys`, 'POST', params, options)

    return new GpgKey(response?.data, options)
  }
}

export default GpgKey

module.exports = GpgKey
module.exports.default = GpgKey
