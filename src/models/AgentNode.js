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
 * Class AgentNode
 */
class AgentNode {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # Stable Agent installation ID
  getNodeId = () => this.attributes.node_id

  // string # Customer-configured Agent node name
  getName = () => this.attributes.name

  // string # Hostname reported by the Agent
  getHostname = () => this.attributes.hostname

  // string # Configured traffic preference
  getAvailabilityRole = () => this.attributes.availability_role

  // string # Whether this node currently has an available Agent instance
  getStatus = () => this.attributes.status

  // boolean # Whether this node is the current default route for new unscoped work
  getIsDefault = () => this.attributes.is_default

  // boolean # Whether the proxy recently validated a direct connection to this Agent node. False means direct transfers are enabled but not currently available; null means disabled or unsupported.
  getDirectTransferAvailable = () => this.attributes.direct_transfer_available

  // date-time # Most recent successful node observation
  getLastSeenAt = () => this.attributes.last_seen_at

  // array(object) # Current Agent processes for this node
  getInstances = () => this.attributes.instances
}

export default AgentNode

module.exports = AgentNode
module.exports.default = AgentNode
