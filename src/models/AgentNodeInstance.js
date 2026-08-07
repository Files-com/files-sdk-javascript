/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AgentNodeInstance
 */
class AgentNodeInstance {
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

  // string # Ephemeral ID for this running Agent process
  getInstanceId = () => this.attributes.instance_id

  // string # Role of this process during an Agent update
  getProcessState = () => this.attributes.process_state

  // string # Whether this process has an available proxy connection
  getStatus = () => this.attributes.status

  // boolean # Whether this process receives new unscoped work for its node
  getIsDefault = () => this.attributes.is_default

  // string # Agent version reported by this process
  getAgentVersion = () => this.attributes.agent_version

  // date-time # Most recent successful observation for this process
  getLastSeenAt = () => this.attributes.last_seen_at

  // array(object) # Proxy connections observed for this process
  getConnections = () => this.attributes.connections
}

export default AgentNodeInstance

module.exports = AgentNodeInstance
module.exports.default = AgentNodeInstance
