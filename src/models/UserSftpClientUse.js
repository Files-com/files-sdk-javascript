/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class UserSftpClientUse
 */
class UserSftpClientUse {
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

  // int64 # UserSftpClientUse ID
  getId = () => this.attributes.id

  // string # The SFTP client used
  getSftpClient = () => this.attributes.sftp_client

  // date-time # The earliest recorded use of this SFTP client (for this user)
  getCreatedAt = () => this.attributes.created_at

  // date-time # The most recent use of this SFTP client (for this user)
  getUpdatedAt = () => this.attributes.updated_at

  // int64 # ID of the user who performed this access
  getUserId = () => this.attributes.user_id

  // Parameters:
  //   user_id - int64 - User ID. If provided, will return uses for this user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
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

    const response = await Api.sendRequest('/user_sftp_client_uses', 'GET', params, options)

    return response?.data?.map(obj => new UserSftpClientUse(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserSftpClientUse.list(params, options)
}

export default UserSftpClientUse

module.exports = UserSftpClientUse
module.exports.default = UserSftpClientUse
