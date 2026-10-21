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
 * Class BundleRegistration
 */
class BundleRegistration {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # Registration cookie code
  getCode = () => this.attributes.code

  // string # Registrant name
  getName = () => this.attributes.name

  // string # Registrant company name
  getCompany = () => this.attributes.company

  // string # Registrant email address
  getEmail = () => this.attributes.email

  // string # Registrant IP Address
  getIp = () => this.attributes.ip

  // string # InboxRegistration cookie code, if there is an associated InboxRegistration
  getInboxCode = () => this.attributes.inbox_code

  // string # Clickwrap text that was shown to the registrant
  getClickwrapBody = () => this.attributes.clickwrap_body

  // int64 # Id of associated form field set
  getFormFieldSetId = () => this.attributes.form_field_set_id

  // object # Data for form field set with form field ids as keys and user data as values
  getFormFieldData = () => this.attributes.form_field_data

  // string # Bundle URL code
  getBundleCode = () => this.attributes.bundle_code

  // int64 # Id of associated bundle
  getBundleId = () => this.attributes.bundle_id

  // int64 # Id of associated bundle recipient
  getBundleRecipientId = () => this.attributes.bundle_recipient_id

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  // date-time # Registration creation date/time
  getCreatedAt = () => this.attributes.created_at

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `bundle_id` or `created_at`.
  //   bundle_id - int64 - ID of the associated Bundle
  static list = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.bundle_id !== undefined && params.bundle_id !== null && !isInt(params.bundle_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_id must be of type Int, received ${getType(params.bundle_id)}`)
    }

    const response = await Api.sendRequest('/bundle_registrations', 'GET', params, options)

    return response?.data?.map(obj => new BundleRegistration(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    BundleRegistration.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      BundleRegistration.list(pageParams, pageOptions))
}

export default BundleRegistration

module.exports = BundleRegistration
module.exports.default = BundleRegistration
