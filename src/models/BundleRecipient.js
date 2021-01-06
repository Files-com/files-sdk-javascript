import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class BundleRecipient
 */
class BundleRecipient {
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
  // string # The recipient's company.
  getCompany = () => this.attributes.company

  // string # The recipient's name.
  getName = () => this.attributes.name

  // string # A note sent to the recipient with the bundle.
  getNote = () => this.attributes.note

  // string # The recipient's email address.
  getRecipient = () => this.attributes.recipient

  // date-time # When the Bundle was shared with this recipient.
  getSentAt = () => this.attributes.sent_at


  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `has_registrations`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `has_registrations`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `has_registrations`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `has_registrations`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `has_registrations`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `has_registrations`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `has_registrations`.
  //   bundle_id (required) - int64 - List recipients for the bundle with this ID.
  static list = async (params = {}, options = {}) => {
    if (!params['bundle_id']) {
      throw new Error('Parameter missing: bundle_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['bundle_id'] && !isInt(params['bundle_id'])) {
      throw new Error(`Bad parameter: bundle_id must be of type Int, received ${getType(bundle_id)}`)
    }

    const response = await Api.sendRequest(`/bundle_recipients`, 'GET', params, options)

    return response?.data?.map(obj => new BundleRecipient(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BundleRecipient.list(params, options)
}

export default BundleRecipient
