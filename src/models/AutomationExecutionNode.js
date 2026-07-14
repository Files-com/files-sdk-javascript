/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AutomationExecutionNode
 */
class AutomationExecutionNode {
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
