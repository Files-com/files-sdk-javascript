/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // int64 # ID of the user who performed this access
  getUserId = () => this.attributes.user_id

  // string # Username of the user who performed this access
  getUsername = () => this.attributes.username

  // string # The protocol and cipher employed
  getProtocolCipher = () => this.attributes.protocol_cipher

  // date-time # The earliest recorded use of this combination of interface and protocol and cipher (for this user)
  getCreatedAt = () => this.attributes.created_at

  // boolean # Is this cipher considered insecure?
  getInsecure = () => this.attributes.insecure

  // string # The interface accessed
  getInterface = () => this.attributes.interface

  // date-time # The most recent use of this combination of interface and protocol and cipher (for this user)
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   user_id - int64 - User ID. If provided, will return uses for this user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `updated_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `insecure` and `updated_at`. Valid field combinations are `[ insecure, updated_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `updated_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `updated_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `updated_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `updated_at`.
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

    const response = await Api.sendRequest('/user_cipher_uses', 'GET', params, options)

    return response?.data?.map(obj => new UserCipherUse(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserCipherUse.list(params, options)
}

export default UserCipherUse

module.exports = UserCipherUse
module.exports.default = UserCipherUse
