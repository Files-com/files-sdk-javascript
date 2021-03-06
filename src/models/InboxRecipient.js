import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class InboxRecipient
 */
class InboxRecipient {
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

  // string # A note sent to the recipient with the inbox.
  getNote = () => this.attributes.note

  setNote = value => {
    this.attributes.note = value
  }

  // string # The recipient's email address.
  getRecipient = () => this.attributes.recipient

  setRecipient = value => {
    this.attributes.recipient = value
  }

  // date-time # When the Inbox was shared with this recipient.
  getSentAt = () => this.attributes.sent_at

  setSentAt = value => {
    this.attributes.sent_at = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // int64 # Inbox to share.
  getInboxId = () => this.attributes.inbox_id

  setInboxId = value => {
    this.attributes.inbox_id = value
  }

  // boolean # Set to true to share the link with the recipient upon creation.
  getShareAfterCreate = () => this.attributes.share_after_create

  setShareAfterCreate = value => {
    this.attributes.share_after_create = value
  }


  save = () => {
      if (this.attributes['id']) {
        throw new Error('The InboxRecipient object doesn\'t support updates.')
      } else {
        const newObject = InboxRecipient.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

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
  //   inbox_id (required) - int64 - List recipients for the inbox with this ID.
  static list = async (params = {}, options = {}) => {
    if (!params['inbox_id']) {
      throw new Error('Parameter missing: inbox_id')
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

    if (params['inbox_id'] && !isInt(params['inbox_id'])) {
      throw new Error(`Bad parameter: inbox_id must be of type Int, received ${getType(inbox_id)}`)
    }

    const response = await Api.sendRequest(`/inbox_recipients`, 'GET', params, options)

    return response?.data?.map(obj => new InboxRecipient(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    InboxRecipient.list(params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   inbox_id (required) - int64 - Inbox to share.
  //   recipient (required) - string - Email address to share this inbox with.
  //   name - string - Name of recipient.
  //   company - string - Company of recipient.
  //   note - string - Note to include in email.
  //   share_after_create - boolean - Set to true to share the link with the recipient upon creation.
  static create = async (params = {}, options = {}) => {
    if (!params['inbox_id']) {
      throw new Error('Parameter missing: inbox_id')
    }

    if (!params['recipient']) {
      throw new Error('Parameter missing: recipient')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['inbox_id'] && !isInt(params['inbox_id'])) {
      throw new Error(`Bad parameter: inbox_id must be of type Int, received ${getType(inbox_id)}`)
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

    const response = await Api.sendRequest(`/inbox_recipients`, 'POST', params, options)

    return new InboxRecipient(response?.data, options)
  }
}

export default InboxRecipient
