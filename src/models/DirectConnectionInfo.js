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
 * Class DirectConnectionInfo
 */
class DirectConnectionInfo {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Direct connection information schema version.
  getVersion = () => this.attributes.version

  // string # TLS server name (SNI and Host header) for the Agent's direct transfer listener.
  getServerName = () => this.attributes.server_name

  // array(string) # Validated ip:port candidates that may be dialed over TCP+TLS for this transfer.
  getAddresses = () => this.attributes.addresses

  // string # Signed HTTPS URI for direct Agent transfer traffic.
  getDirectUri = () => this.attributes.direct_uri

  // string # PEM-encoded CA certificate used to verify the Agent's direct transfer TLS certificate.
  getCaPem = () => this.attributes.ca_pem
}

export default DirectConnectionInfo

module.exports = DirectConnectionInfo
module.exports.default = DirectConnectionInfo
