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

/**
 * Class AutomationExecutionNode
 */
class AutomationExecutionNode {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # Node ID from the pinned Automation definition.
  getNodeId = () => this.attributes.node_id

  // string # Node type.
  getNodeType = () => this.attributes.node_type

  // string # Node status.
  getStatus = () => this.attributes.status

  // string # Current node execution stage.
  getRunStage = () => this.attributes.run_stage

  // boolean # Whether this node reused persisted output from an earlier run.
  getReused = () => this.attributes.reused

  // int64 # Count of successful operations in this node.
  getSuccessfulOperations = () => this.attributes.successful_operations

  // int64 # Count of failed operations in this node.
  getFailedOperations = () => this.attributes.failed_operations

  // date-time # When this node started.
  getStartedAt = () => this.attributes.started_at

  // date-time # When this node completed.
  getCompletedAt = () => this.attributes.completed_at

  // int64 # Node runtime in milliseconds.
  getDurationMs = () => this.attributes.duration_ms

  // array(object) # Ordered inbound edge references.
  getInputs = () => this.attributes.inputs

  // object # Output counts, item kinds, and typed-error summaries by outlet.
  getOutputs = () => this.attributes.outputs

  // object # Materialized input items currently available, grouped by inlet.
  getInputItems = () => this.attributes.input_items

  // object # Materialized output items grouped by outlet.
  getOutputItems = () => this.attributes.output_items
}

export default AutomationExecutionNode

module.exports = AutomationExecutionNode
module.exports.default = AutomationExecutionNode
