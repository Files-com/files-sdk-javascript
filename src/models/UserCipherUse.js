import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class UserCipherUse
 */
class UserCipherUse {
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
  // int64 # UserCipherUse ID
  getId = () => this.attributes.id

  // string # The protocol and cipher employed
  getProtocolCipher = () => this.attributes.protocol_cipher

  // date-time # The earliest recorded use of this combination of interface and protocol and cipher (for this user)
  getCreatedAt = () => this.attributes.created_at

  // string # The interface accessed
  getInterface = () => this.attributes.interface

  // date-time # The most recent use of this combination of interface and protocol and cipher (for this user)
  getUpdatedAt = () => this.attributes.updated_at

  // int64 # ID of the user who performed this access
  getUserId = () => this.attributes.user_id


  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
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

    const response = await Api.sendRequest(`/user_cipher_uses`, 'GET', params, options)

    return response?.data?.map(obj => new UserCipherUse(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserCipherUse.list(params, options)
}

export default UserCipherUse
