/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AgentNode
 */
class AgentNode {
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
