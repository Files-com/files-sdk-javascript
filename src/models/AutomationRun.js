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
 * Class AutomationRun
 */
class AutomationRun {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # ID.
  getId = () => this.attributes.id

  // int64 # ID of the associated Automation.
  getAutomationId = () => this.attributes.automation_id

  // int64 # ID of the immutable Automation version pinned by this run.
  getAutomationVersionId = () => this.attributes.automation_version_id

  // int64 # Pinned Automation v2 definition version.
  getVersion = () => this.attributes.version

  // int64 # Workspace ID.
  getWorkspaceId = () => this.attributes.workspace_id

  // date-time # Date/time at which cancellation was requested.
  getCancelRequestedAt = () => this.attributes.cancel_requested_at

  // date-time # Automation run completion/failure date/time.
  getCompletedAt = () => this.attributes.completed_at

  // date-time # Automation run start date/time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # If set, this automation will be retried at this date/time due to `failure` or `partial_failure`.
  getRetryAt = () => this.attributes.retry_at

  // date-time # If set, this Automation run was retried due to `failure` or `partial_failure`.
  getRetriedAt = () => this.attributes.retried_at

  // int64 # ID of the run that is or will be retrying this run.
  getRetriedInRunId = () => this.attributes.retried_in_run_id

  // int64 # ID of the original run that this run is retrying.
  getRetryOfRunId = () => this.attributes.retry_of_run_id

  // int64 # ID of the run whose persisted node outputs this run reused.
  getRerunOfRunId = () => this.attributes.rerun_of_run_id

  // string # Node at which this run resumed execution.
  getRerunFromNodeId = () => this.attributes.rerun_from_node_id

  // double # Automation run runtime.
  getRuntime = () => this.attributes.runtime

  // string # The status of the AutomationRun. One of `queued`, `running`, `success`, `partial_failure`, `failure`, `skipped`, or `canceled`.
  getStatus = () => this.attributes.status

  // int64 # Count of successful operations.
  getSuccessfulOperations = () => this.attributes.successful_operations

  // int64 # Count of failed operations.
  getFailedOperations = () => this.attributes.failed_operations

  // object # Automation definition snapshot pinned by this run. For performance reasons, this is not provided when listing Automation runs.
  getDefinition = () => this.attributes.definition

  // object # Status and execution stage for each node in this run. For performance reasons, this is not provided when listing Automation runs.
  getNodeStates = () => this.attributes.node_states

  // array(object) # Execution status, timing, and bounded output summaries for each node. For performance reasons, this is not provided when listing Automation runs.
  getExecutionNodes = () => this.attributes.execution_nodes

  // string # Link to the run journal artifact.
  getJournalUrl = () => this.attributes.journal_url

  // string # Link to status messages log file.
  getStatusMessagesUrl = () => this.attributes.status_messages_url

  // Cancel Automation Run
  cancel = async (params = {}) => {
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

    const response = await Api.sendRequest(`/automation_runs/${encodeURIComponent(params.id)}/cancel`, 'POST', params, this.options)

    return new AutomationRun(response?.data, this.options)
  }

  // Re-run Automation from Node
  //
  // Parameters:
  //   node_id (required) - string - Node ID at which execution should resume.
  rerun = async (params = {}) => {
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

    if (params.node_id !== undefined && params.node_id !== null && !isString(params.node_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: node_id must be of type String, received ${getType(params.node_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params.node_id) {
      if (this.attributes.node_id) {
        params.node_id = this.node_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: node_id')
      }
    }

    const response = await Api.sendRequest(`/automation_runs/${encodeURIComponent(params.id)}/rerun`, 'POST', params, this.options)

    return new AutomationRun(response?.data, this.options)
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `automation_id`, `created_at` or `status`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `status`, `workspace_id` or `automation_id`. Valid field combinations are `[ workspace_id, status ]`, `[ automation_id, status ]`, `[ workspace_id, automation_id ]` or `[ workspace_id, automation_id, status ]`.
  //   automation_id (required) - int64 - ID of the associated Automation.
  static list = async (params = {}, options = {}) => {
    if (!params.automation_id) {
      throw new errors.MissingParameterError('Parameter missing: automation_id')
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
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

    const response = await Api.sendRequest('/automation_runs', 'GET', params, options)

    return response?.data?.map(obj => new AutomationRun(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    AutomationRun.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      AutomationRun.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Automation Run ID.
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

    const response = await Api.sendRequest(`/automation_runs/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AutomationRun(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    AutomationRun.find(id, params, options)

  // Parameters:
  //   id (required) - int64 - Automation Run ID.
  //   node_id (required) - string - Node ID from the pinned Automation definition.
  static findNode = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (!params.node_id) {
      throw new errors.MissingParameterError('Parameter missing: node_id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.node_id !== undefined && params.node_id !== null && !isString(params.node_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: node_id must be of type String, received ${getType(params.node_id)}`)
    }

    const response = await Api.sendRequest(`/automation_runs/${encodeURIComponent(params.id)}/node`, 'GET', params, options)

    const AutomationExecutionNode = require('./AutomationExecutionNode.js').default
    return new AutomationExecutionNode(response?.data, retainedOptions(options))
  }
}

export default AutomationRun

module.exports = AutomationRun
module.exports.default = AutomationRun
