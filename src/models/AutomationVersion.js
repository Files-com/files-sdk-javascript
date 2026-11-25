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
 * Class AutomationVersion
 */
class AutomationVersion {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Automation revision ID.
  getId = () => this.attributes.id

  // int64 # ID of the Automation that owns this revision.
  getAutomationId = () => this.attributes.automation_id

  // int64 # Workspace that owns the Automation. Zero is the Default Workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  // int64 # Revision number within the Automation.
  getVersion = () => this.attributes.version

  // date-time # Time the revision was saved.
  getCreatedAt = () => this.attributes.created_at

  // int64 # ID of the user who saved the revision, when available.
  getUserId = () => this.attributes.user_id

  // string # Username recorded when the revision was saved, when available.
  getUsername = () => this.attributes.username

  // int64 # ID of the API key used to save the revision, when available.
  getApiKeyId = () => this.attributes.api_key_id

  // object # Saved Automation v2 graph definition. Included when retrieving a single revision.
  getDefinition = () => this.attributes.definition

  // object # Normalized application action metadata keyed by pinned action fingerprint.
  getApplicationActions = () => this.attributes.application_actions

  // Restore an Automation v2 definition as a new current version
  restore = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/automation_versions/${encodeURIComponent(params.id)}/restore`, 'POST', params, this.options)

    const Automation = require('./Automation.js').default
    return new Automation(response?.data, this.options)
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  //   automation_id (required) - int64 - ID of the Automation that owns this revision.
  static list = async (params = {}, options = {}) => {
    if (!params.automation_id) {
      throw new errors.MissingParameterError('Parameter missing: automation_id')
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.automation_id !== undefined && params.automation_id !== null && !isInt(params.automation_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: automation_id must be of type Int, received ${getType(params.automation_id)}`)
    }

    const response = await Api.sendRequest('/automation_versions', 'GET', params, options)

    return response?.data?.map(obj => new AutomationVersion(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    AutomationVersion.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      AutomationVersion.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Automation Version ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/automation_versions/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AutomationVersion(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    AutomationVersion.find(id, params, options)
}

export default AutomationVersion

module.exports = AutomationVersion
module.exports.default = AutomationVersion
