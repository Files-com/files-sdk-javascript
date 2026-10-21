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
 * Class InboxRecipient
 */
class InboxRecipient {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # The recipient's company.
  getCompany = () => this.attributes.company

  setCompany = value => {
    this.attributes.company = value
    exposeAttributes(this, ['company'])
  }

  // string # The recipient's name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # A note sent to the recipient with the inbox.
  getNote = () => this.attributes.note

  setNote = value => {
    this.attributes.note = value
    exposeAttributes(this, ['note'])
  }

  // string # The recipient's email address.
  getRecipient = () => this.attributes.recipient

  setRecipient = value => {
    this.attributes.recipient = value
    exposeAttributes(this, ['recipient'])
  }

  // date-time # When the Inbox was shared with this recipient.
  getSentAt = () => this.attributes.sent_at

  setSentAt = value => {
    this.attributes.sent_at = value
    exposeAttributes(this, ['sent_at'])
  }

  // int64 # Inbox to share.
  getInboxId = () => this.attributes.inbox_id

  setInboxId = value => {
    this.attributes.inbox_id = value
    exposeAttributes(this, ['inbox_id'])
  }

  // boolean # Set to true to share the link with the recipient upon creation.
  getShareAfterCreate = () => this.attributes.share_after_create

  setShareAfterCreate = value => {
    this.attributes.share_after_create = value
    exposeAttributes(this, ['share_after_create'])
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The InboxRecipient object doesn\'t support updates.')
    } else {
      const newObject = await InboxRecipient.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `has_registrations`.
  //   inbox_id (required) - int64 - List recipients for the inbox with this ID.
  static list = async (params = {}, options = {}) => {
    if (!params.inbox_id) {
      throw new errors.MissingParameterError('Parameter missing: inbox_id')
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.inbox_id !== undefined && params.inbox_id !== null && !isInt(params.inbox_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: inbox_id must be of type Int, received ${getType(params.inbox_id)}`)
    }

    const response = await Api.sendRequest('/inbox_recipients', 'GET', params, options)

    return response?.data?.map(obj => new InboxRecipient(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    InboxRecipient.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      InboxRecipient.list(pageParams, pageOptions))

  // Parameters:
  //   inbox_id (required) - int64 - Inbox to share.
  //   recipient (required) - string - Email address to share this inbox with.
  //   name - string - Name of recipient.
  //   company - string - Company of recipient.
  //   note - string - Note to include in email.
  //   share_after_create - boolean - Set to true to share the link with the recipient upon creation.
  static create = async (params = {}, options = {}) => {
    if (!params.inbox_id) {
      throw new errors.MissingParameterError('Parameter missing: inbox_id')
    }

    if (!params.recipient) {
      throw new errors.MissingParameterError('Parameter missing: recipient')
    }

    if (params.inbox_id !== undefined && params.inbox_id !== null && !isInt(params.inbox_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: inbox_id must be of type Int, received ${getType(params.inbox_id)}`)
    }

    if (params.recipient !== undefined && params.recipient !== null && !isString(params.recipient)) {
      throw new errors.InvalidParameterError(`Bad parameter: recipient must be of type String, received ${getType(params.recipient)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.company !== undefined && params.company !== null && !isString(params.company)) {
      throw new errors.InvalidParameterError(`Bad parameter: company must be of type String, received ${getType(params.company)}`)
    }

    if (params.note !== undefined && params.note !== null && !isString(params.note)) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(params.note)}`)
    }

    if (isArray(params.share_after_create) || isObject(params.share_after_create)) {
      throw new errors.InvalidParameterError(`Bad parameter: share_after_create must be of type Boolean, received ${getType(params.share_after_create)}`)
    }

    const response = await Api.sendRequest('/inbox_recipients', 'POST', params, options)

    return new InboxRecipient(response?.data, retainedOptions(options))
  }
}

export default InboxRecipient

module.exports = InboxRecipient
module.exports.default = InboxRecipient
