/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AgentPushUpdate
 */
class AgentPushUpdate {
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

  // string # Pushed agent version
  getVersion = () => this.attributes.version

  // string # Update accepted or reason
  getMessage = () => this.attributes.message

  // string # Installed agent version
  getCurrentVersion = () => this.attributes.current_version

  // string # Pending agent version or null
  getPendingVersion = () => this.attributes.pending_version

  // string # Last error message or null
  getLastError = () => this.attributes.last_error

  // string # Error code
  getError = () => this.attributes.error
}

export default AgentPushUpdate

module.exports = AgentPushUpdate
module.exports.default = AgentPushUpdate
