/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AgentNodeConnection
 */
class AgentNodeConnection {
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

  // string # How the Agent process uses this proxy connection
  getMode = () => this.attributes.mode

  // string # Whether this connection was observed recently and has not disconnected
  getStatus = () => this.attributes.status

  // date-time # Most recent successful observation for this connection
  getLastSeenAt = () => this.attributes.last_seen_at
}

export default AgentNodeConnection

module.exports = AgentNodeConnection
module.exports.default = AgentNodeConnection
