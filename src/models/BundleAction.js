/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class BundleAction
 */
class BundleAction {
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

  // string # Type of action
  getAction = () => this.attributes.action

  // BundleRegistration # Object that contains bundle registration information
  getBundleRegistration = () => this.attributes.bundle_registration

  // date-time # Action occurrence date/time
  getCreatedAt = () => this.attributes.created_at

  // string # The destination path for this bundle action, if applicable
  getDestination = () => this.attributes.destination

  // string # Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # The source path for this bundle action, if applicable
  getSource = () => this.attributes.source

  // int64 # Identifier of the associated bundle registration
  getBundleRegistrationId = () => this.attributes.bundle_registration_id

  // string # Name of the registrant who performed the action
  getBundleRegistrationName = () => this.attributes.bundle_registration_name

  // string # Email of the registrant
  getBundleRegistrationEmail = () => this.attributes.bundle_registration_email

  // string # IP address of the registrant
  getBundleRegistrationIp = () => this.attributes.bundle_registration_ip

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `created_at` and `bundle_registration_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `bundle_id` or `bundle_registration_id`. Valid field combinations are `[ bundle_id, created_at ]`, `[ bundle_registration_id, created_at ]`, `[ bundle_id, bundle_registration_id ]` or `[ bundle_id, bundle_registration_id, created_at ]`.
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

    const response = await Api.sendRequest('/bundle_actions', 'GET', params, options)

    return response?.data?.map(obj => new BundleAction(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BundleAction.list(params, options)
}

export default BundleAction

module.exports = BundleAction
module.exports.default = BundleAction
