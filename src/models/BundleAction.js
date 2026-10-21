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
 * Class BundleAction
 */
class BundleAction {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
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

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  // string # Name of the registrant who performed the action
  getBundleRegistrationName = () => this.attributes.bundle_registration_name

  // string # Email of the registrant
  getBundleRegistrationEmail = () => this.attributes.bundle_registration_email

  // string # IP address of the registrant
  getBundleRegistrationIp = () => this.attributes.bundle_registration_ip

  // int64 # Id of associated form field set
  getFormFieldSetId = () => this.attributes.form_field_set_id

  // object # Data for form field set with form field ids as keys and user data as values
  getFormFieldData = () => this.attributes.form_field_data

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `created_at` or `bundle_registration_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `bundle_id` or `bundle_registration_id`. Valid field combinations are `[ bundle_id, created_at ]`, `[ bundle_registration_id, created_at ]`, `[ bundle_id, bundle_registration_id ]` or `[ bundle_id, bundle_registration_id, created_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  //   bundle_id - int64 - Bundle ID
  //   bundle_registration_id - int64 - Bundle Registration ID
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

    if (params.bundle_registration_id !== undefined && params.bundle_registration_id !== null && !isInt(params.bundle_registration_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_registration_id must be of type Int, received ${getType(params.bundle_registration_id)}`)
    }

    const response = await Api.sendRequest('/bundle_actions', 'GET', params, options)

    return response?.data?.map(obj => new BundleAction(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    BundleAction.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      BundleAction.list(pageParams, pageOptions))
}

export default BundleAction

module.exports = BundleAction
module.exports.default = BundleAction
