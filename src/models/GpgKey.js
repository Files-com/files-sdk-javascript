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
 * Class GpgKey
 */
class GpgKey {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # GPG key ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Workspace ID (0 for default workspace).
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // date-time # GPG key expiration date.
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
    exposeAttributes(this, ['expires_at'])
  }

  // string # GPG key name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // int64 # Partner ID who owns this GPG Key, if applicable.
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
    exposeAttributes(this, ['partner_id'])
  }

  // string # Name of the Partner who owns this GPG Key, if applicable.
  getPartnerName = () => this.attributes.partner_name

  setPartnerName = value => {
    this.attributes.partner_name = value
    exposeAttributes(this, ['partner_name'])
  }

  // int64 # User ID who owns this GPG Key, if applicable.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // string # MD5 hash of the GPG public key
  getPublicKeyMd5 = () => this.attributes.public_key_md5

  setPublicKeyMd5 = value => {
    this.attributes.public_key_md5 = value
    exposeAttributes(this, ['public_key_md5'])
  }

  // string # MD5 hash of the GPG private key.
  getPrivateKeyMd5 = () => this.attributes.private_key_md5

  setPrivateKeyMd5 = value => {
    this.attributes.private_key_md5 = value
    exposeAttributes(this, ['private_key_md5'])
  }

  // string # GPG public key
  getGeneratedPublicKey = () => this.attributes.generated_public_key

  setGeneratedPublicKey = value => {
    this.attributes.generated_public_key = value
    exposeAttributes(this, ['generated_public_key'])
  }

  // string # GPG private key.
  getGeneratedPrivateKey = () => this.attributes.generated_private_key

  setGeneratedPrivateKey = value => {
    this.attributes.generated_private_key = value
    exposeAttributes(this, ['generated_private_key'])
  }

  // string # GPG private key password. Only required for password protected keys.
  getPrivateKeyPasswordMd5 = () => this.attributes.private_key_password_md5

  setPrivateKeyPasswordMd5 = value => {
    this.attributes.private_key_password_md5 = value
    exposeAttributes(this, ['private_key_password_md5'])
  }

  // string # The GPG public key
  getPublicKey = () => this.attributes.public_key

  setPublicKey = value => {
    this.attributes.public_key = value
    exposeAttributes(this, ['public_key'])
  }

  // string # The GPG private key
  getPrivateKey = () => this.attributes.private_key

  setPrivateKey = value => {
    this.attributes.private_key = value
    exposeAttributes(this, ['private_key'])
  }

  // string # The GPG private key password
  getPrivateKeyPassword = () => this.attributes.private_key_password

  setPrivateKeyPassword = value => {
    this.attributes.private_key_password = value
    exposeAttributes(this, ['private_key_password'])
  }

  // string # Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  getGenerateExpiresAt = () => this.attributes.generate_expires_at

  setGenerateExpiresAt = value => {
    this.attributes.generate_expires_at = value
    exposeAttributes(this, ['generate_expires_at'])
  }

  // boolean # If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
  getGenerateKeypair = () => this.attributes.generate_keypair

  setGenerateKeypair = value => {
    this.attributes.generate_keypair = value
    exposeAttributes(this, ['generate_keypair'])
  }

  // string # Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  getGenerateFullName = () => this.attributes.generate_full_name

  setGenerateFullName = value => {
    this.attributes.generate_full_name = value
    exposeAttributes(this, ['generate_full_name'])
  }

  // string # Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  getGenerateEmail = () => this.attributes.generate_email

  setGenerateEmail = value => {
    this.attributes.generate_email = value
    exposeAttributes(this, ['generate_email'])
  }

  // Parameters:
  //   partner_id - int64 - Partner ID who owns this GPG Key, if applicable.
  //   public_key - string - The GPG public key
  //   private_key - string - The GPG private key
  //   private_key_password - string - The GPG private key password
  //   name - string - GPG key name.
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

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.public_key !== undefined && params.public_key !== null && !isString(params.public_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(params.public_key)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_password !== undefined && params.private_key_password !== null && !isString(params.private_key_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params.private_key_password)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
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

    await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await GpgKey.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `name` or `expires_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`, `partner_id` or `expires_at`. Valid field combinations are `[ workspace_id, partner_id ]`, `[ workspace_id, expires_at ]`, `[ partner_id, expires_at ]` or `[ workspace_id, partner_id, expires_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `expires_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `expires_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `expires_at`.
  static list = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/gpg_keys', 'GET', params, options)

    return response?.data?.map(obj => new GpgKey(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    GpgKey.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      GpgKey.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Gpg Key ID.
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

    const response = await Api.sendRequest(`/gpg_keys/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new GpgKey(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    GpgKey.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   partner_id - int64 - Partner ID who owns this GPG Key, if applicable.
  //   public_key - string - The GPG public key
  //   private_key - string - The GPG private key
  //   private_key_password - string - The GPG private key password
  //   name (required) - string - GPG key name.
  //   workspace_id - int64 - Workspace ID (0 for default workspace).
  //   generate_expires_at - string - Expiration date of the key. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  //   generate_keypair - boolean - If true, generate a new GPG key pair. Can not be used with `public_key`/`private_key`
  //   generate_full_name - string - Full name of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  //   generate_email - string - Email address of the key owner. Used for the generation of the key. Will be ignored if `generate_keypair` is false.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.public_key !== undefined && params.public_key !== null && !isString(params.public_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: public_key must be of type String, received ${getType(params.public_key)}`)
    }

    if (params.private_key !== undefined && params.private_key !== null && !isString(params.private_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key must be of type String, received ${getType(params.private_key)}`)
    }

    if (params.private_key_password !== undefined && params.private_key_password !== null && !isString(params.private_key_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: private_key_password must be of type String, received ${getType(params.private_key_password)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (params.generate_expires_at !== undefined && params.generate_expires_at !== null && !isString(params.generate_expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_expires_at must be of type String, received ${getType(params.generate_expires_at)}`)
    }

    if (isArray(params.generate_keypair) || isObject(params.generate_keypair)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_keypair must be of type Boolean, received ${getType(params.generate_keypair)}`)
    }

    if (params.generate_full_name !== undefined && params.generate_full_name !== null && !isString(params.generate_full_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_full_name must be of type String, received ${getType(params.generate_full_name)}`)
    }

    if (params.generate_email !== undefined && params.generate_email !== null && !isString(params.generate_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: generate_email must be of type String, received ${getType(params.generate_email)}`)
    }

    const response = await Api.sendRequest('/gpg_keys', 'POST', params, options)

    return new GpgKey(response?.data, retainedOptions(options))
  }
}

export default GpgKey

module.exports = GpgKey
module.exports.default = GpgKey
