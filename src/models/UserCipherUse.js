import Api from '../Api'
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
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/user_cipher_uses`, 'GET', params, options)

    return response?.data?.map(obj => new UserCipherUse(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserCipherUse.list(params, options)
}

export default UserCipherUse
