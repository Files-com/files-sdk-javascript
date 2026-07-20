/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class UserAdditionalEmailRecipient
 */
class UserAdditionalEmailRecipient {
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

  // int64 # User additional email recipient ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // int64 # Workspace ID (0 for default workspace).
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # Additional email recipient address
  getEmail = () => this.attributes.email

  setEmail = value => {
    this.attributes.email = value
  }

  // date-time # Created at date/time
  getCreatedAt = () => this.attributes.created_at

  // Parameters:
  //   email - string - Additional email recipient address
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

    if (params.email && !isString(params.email)) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params.email)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/user_additional_email_recipients/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new UserAdditionalEmailRecipient(response?.data, this.options)
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

    await Api.sendRequest(`/user_additional_email_recipients/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await UserAdditionalEmailRecipient.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `email`, `user_id` or `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `email` and `workspace_id`. Valid field combinations are `[ workspace_id, email ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `email`.
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

    const response = await Api.sendRequest('/user_additional_email_recipients', 'GET', params, options)

    return response?.data?.map(obj => new UserAdditionalEmailRecipient(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    UserAdditionalEmailRecipient.list(params, options)

  // Parameters:
  //   id (required) - int64 - User Additional Email Recipient ID.
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

    const response = await Api.sendRequest(`/user_additional_email_recipients/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new UserAdditionalEmailRecipient(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    UserAdditionalEmailRecipient.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   email (required) - string - Additional email recipient address
  static create = async (params = {}, options = {}) => {
    if (!params.email) {
      throw new errors.MissingParameterError('Parameter missing: email')
    }

    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.email && !isString(params.email)) {
      throw new errors.InvalidParameterError(`Bad parameter: email must be of type String, received ${getType(params.email)}`)
    }

    const response = await Api.sendRequest('/user_additional_email_recipients', 'POST', params, options)

    return new UserAdditionalEmailRecipient(response?.data, options)
  }
}

export default UserAdditionalEmailRecipient

module.exports = UserAdditionalEmailRecipient
module.exports.default = UserAdditionalEmailRecipient
