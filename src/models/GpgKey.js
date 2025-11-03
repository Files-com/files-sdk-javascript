/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // int64 # Partner ID who owns this GPG Key, if applicable.
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
  }

  // string # Name of the Partner who owns this GPG Key, if applicable.
  getPartnerName = () => this.attributes.partner_name

  setPartnerName = value => {
    this.attributes.partner_name = value
  }

  // int64 # User ID who owns this GPG Key, if applicable.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # MD5 hash of your GPG public key
  getPublicKeyMd5 = () => this.attributes.public_key_md5

  setPublicKeyMd5 = value => {
    this.attributes.public_key_md5 = value
  }

  // string # MD5 hash of your GPG private key.
  getPrivateKeyMd5 = () => this.attributes.private_key_md5

  setPrivateKeyMd5 = value => {
    this.attributes.private_key_md5 = value
  }

  // string # Your GPG public key
  getGeneratedPublicKey = () => this.attributes.generated_public_key

  setGeneratedPublicKey = value => {
    this.attributes.generated_public_key = value
  }

  // string # Your GPG private key.
  getGeneratedPrivateKey = () => this.attributes.generated_private_key

  setGeneratedPrivateKey = value => {
    this.attributes.generated_private_key = value
  }

  // string # Your GPG private key password. Only required for password protected keys.
  getPrivateKeyPasswordMd5 = () => this.attributes.private_key_password_md5

  setPrivateKeyPasswordMd5 = value => {
    this.attributes.private_key_password_md5 = value
  }

  // string # MD5 hash of your GPG public key
  getPublicKey = () => this.attributes.public_key

  setPublicKey = value => {
    this.attributes.public_key = value
  }

  // string # MD5 hash of your GPG private key.
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
  }

  // string # Your GPG private key password. Only required for password protected keys.
  getPrivateKeyPassword = () => this.attributes.private_key_password

  setPrivateKeyPassword = value => {
    this.attributes.private_key_password = value
  }

  // string # Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  getGenerateExpiresAt = () => this.attributes.generate_expires_at

  setGenerateExpiresAt = value => {
    this.attributes.generate_expires_at = value
  }

  // boolean # If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
  getGenerateKeypair = () => this.attributes.generate_keypair

  setGenerateKeypair = value => {
    this.attributes.generate_keypair = value
  }

  // string # Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  getGenerateFullName = () => this.attributes.generate_full_name

  setGenerateFullName = value => {
    this.attributes.generate_full_name = value
  }

  // string # Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  getGenerateEmail = () => this.attributes.generate_email

  setGenerateEmail = value => {
    this.attributes.generate_email = value
  }

  // Parameters:
  //   partner_id - int64 - Partner ID who owns this GPG Key, if applicable.
  //   public_key - string - MD5 hash of your GPG public key
  //   private_key - string - MD5 hash of your GPG private key.
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
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.partner_id && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.public_key && !isString(params.public_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(params.public_key)}`)
    }

    if (params.private_key && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_password && !isString(params.private_key_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params.private_key_password)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await GpgKey.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name` and `expires_at`.
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

    const response = await Api.sendRequest('/gpg_keys', 'GET', params, options)

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

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new GpgKey(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    GpgKey.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   partner_id - int64 - Partner ID who owns this GPG Key, if applicable.
  //   public_key - string - MD5 hash of your GPG public key
  //   private_key - string - MD5 hash of your GPG private key.
  //   private_key_password - string - Your GPG private key password. Only required for password protected keys.
  //   name (required) - string - Your GPG key name.
  //   generate_expires_at - string - Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  //   generate_keypair - boolean - If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
  //   generate_full_name - string - Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  //   generate_email - string - Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.partner_id && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.public_key && !isString(params.public_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(params.public_key)}`)
    }

    if (params.private_key && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_password && !isString(params.private_key_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params.private_key_password)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.generate_expires_at && !isString(params.generate_expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_expires_at must be of type String, received ${getType(params.generate_expires_at)}`)
    }

    if (params.generate_full_name && !isString(params.generate_full_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_full_name must be of type String, received ${getType(params.generate_full_name)}`)
    }

    if (params.generate_email && !isString(params.generate_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_email must be of type String, received ${getType(params.generate_email)}`)
    }

    const response = await Api.sendRequest('/gpg_keys', 'POST', params, options)

    return new GpgKey(response?.data, options)
  }
}

export default GpgKey

module.exports = GpgKey
module.exports.default = GpgKey
