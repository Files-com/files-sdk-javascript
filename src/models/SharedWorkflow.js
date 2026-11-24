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
 * Class SharedWorkflow
 */
class SharedWorkflow {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Shared Workflow ID.
  getId = () => this.attributes.id

  // string # Name displayed to recipients.
  getName = () => this.attributes.name

  // string # Description displayed to recipients.
  getDescription = () => this.attributes.description

  // string # Revision required when submitting a Shared Workflow run.
  getSubmissionRevision = () => this.attributes.submission_revision

  // array(object) # Current custom questions in display order.
  getFormFields = () => this.attributes.form_fields

  // Run a Shared Workflow
  //
  // Parameters:
  //   submission_revision (required) - string - Revision returned when opening the Shared Workflow.
  //   submission_id (required) - string - Client-generated UUID used to retry the same submission without starting another run.
  //   file_path (required) - string - Path of a file the recipient can read, including a file uploaded to a Snapshot created for this workflow.
  runWorkflow = async (params = {}) => {
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

    if (params.submission_revision !== undefined && params.submission_revision !== null && !isString(params.submission_revision)) {
      throw new errors.InvalidParameterError(`Bad parameter: submission_revision must be of type String, received ${getType(params.submission_revision)}`)
    }

    if (params.submission_id !== undefined && params.submission_id !== null && !isString(params.submission_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: submission_id must be of type String, received ${getType(params.submission_id)}`)
    }

    if (params.file_path !== undefined && params.file_path !== null && !isString(params.file_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_path must be of type String, received ${getType(params.file_path)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params.submission_revision) {
      if (this.attributes.submission_revision) {
        params.submission_revision = this.submission_revision
      } else {
        throw new errors.MissingParameterError('Parameter missing: submission_revision')
      }
    }

    if (!params.submission_id) {
      if (this.attributes.submission_id) {
        params.submission_id = this.submission_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: submission_id')
      }
    }

    if (!params.file_path) {
      if (this.attributes.file_path) {
        params.file_path = this.file_path
      } else {
        throw new errors.MissingParameterError('Parameter missing: file_path')
      }
    }

    const response = await Api.sendRequest(`/shared_workflows/${encodeURIComponent(params.id)}/run_workflow`, 'POST', params, this.options)

    const AutomationRun = require('./AutomationRun.js').default
    return new AutomationRun(response?.data, this.options)
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/shared_workflows', 'GET', params, options)

    return response?.data?.map(obj => new SharedWorkflow(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    SharedWorkflow.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      SharedWorkflow.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Shared Workflow ID.
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

    const response = await Api.sendRequest(`/shared_workflows/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new SharedWorkflow(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    SharedWorkflow.find(id, params, options)

  // Parameters:
  //   id (required) - int64 - Shared Workflow ID.
  //   run_id (required) - int64 - ID of the run returned by the Shared Workflow submission.
  static findRun = async (id, runId, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id
    params.run_id = runId

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (!params.run_id) {
      throw new errors.MissingParameterError('Parameter missing: run_id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.run_id !== undefined && params.run_id !== null && !isInt(params.run_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: run_id must be of type Int, received ${getType(params.run_id)}`)
    }

    const response = await Api.sendRequest(`/shared_workflows/${encodeURIComponent(params.id)}/runs/${encodeURIComponent(params.run_id)}`, 'GET', params, options)

    const AutomationRun = require('./AutomationRun.js').default
    return new AutomationRun(response?.data, retainedOptions(options))
  }
}

export default SharedWorkflow

module.exports = SharedWorkflow
module.exports.default = SharedWorkflow
