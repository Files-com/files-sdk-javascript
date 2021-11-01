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

  setCompany = value => {
    this.attributes.company = value
  }

  // string # The recipient's name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # A note sent to the recipient with the bundle.
  getNote = () => this.attributes.note

  setNote = value => {
    this.attributes.note = value
  }

  // string # The recipient's email address.
  getRecipient = () => this.attributes.recipient

  setRecipient = value => {
    this.attributes.recipient = value
  }

  // date-time # When the Bundle was shared with this recipient.
  getSentAt = () => this.attributes.sent_at

  setSentAt = value => {
    this.attributes.sent_at = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // int64 # Bundle to share.
  getBundleId = () => this.attributes.bundle_id

  setBundleId = value => {
    this.attributes.bundle_id = value
  }

  // boolean # Set to true to share the link with the recipient upon creation.
  getShareAfterCreate = () => this.attributes.share_after_create

  setShareAfterCreate = value => {
    this.attributes.share_after_create = value
  }


  save = () => {
      if (this.attributes['id']) {
        throw new Error('The BundleRecipient object doesn\'t support updates.')
      } else {
        const newObject = BundleRecipient.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `has_registrations`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `has_registrations`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `has_registrations`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal to the supplied value. Valid fields are `has_registrations`.
  //   filter_like - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `has_registrations`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `has_registrations`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal to the supplied value. Valid fields are `has_registrations`.
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

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   bundle_id (required) - int64 - Bundle to share.
  //   recipient (required) - string - Email addresses to share this bundle with.
  //   name - string - Name of recipient.
  //   company - string - Company of recipient.
  //   note - string - Note to include in email.
  //   share_after_create - boolean - Set to true to share the link with the recipient upon creation.
  static create = async (params = {}, options = {}) => {
    if (!params['bundle_id']) {
      throw new Error('Parameter missing: bundle_id')
    }

    if (!params['recipient']) {
      throw new Error('Parameter missing: recipient')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['bundle_id'] && !isInt(params['bundle_id'])) {
      throw new Error(`Bad parameter: bundle_id must be of type Int, received ${getType(bundle_id)}`)
    }

    if (params['recipient'] && !isString(params['recipient'])) {
      throw new Error(`Bad parameter: recipient must be of type String, received ${getType(recipient)}`)
    }

    if (params['name'] && !isString(params['name'])) {
      throw new Error(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }

    if (params['company'] && !isString(params['company'])) {
      throw new Error(`Bad parameter: company must be of type String, received ${getType(company)}`)
    }

    if (params['note'] && !isString(params['note'])) {
      throw new Error(`Bad parameter: note must be of type String, received ${getType(note)}`)
    }

    const response = await Api.sendRequest(`/bundle_recipients`, 'POST', params, options)

    return new BundleRecipient(response?.data, options)
  }
}

export default BundleRecipient
