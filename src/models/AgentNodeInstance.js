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
 * Class AgentNodeInstance
 */
class AgentNodeInstance {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
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
