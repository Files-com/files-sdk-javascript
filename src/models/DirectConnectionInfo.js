/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class DirectConnectionInfo
 */
class DirectConnectionInfo {
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
