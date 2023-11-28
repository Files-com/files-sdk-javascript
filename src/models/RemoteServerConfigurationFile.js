/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import { getType, isArray, isInt, isObject, isString } from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class RemoteServerConfigurationFile
 */
class RemoteServerConfigurationFile {
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
  // int64 # Agent ID
  getId = () => this.attributes.id

  // string #
  getPermissionSet = () => this.attributes.permission_set

  // string # private key
  getPrivateKey = () => this.attributes.private_key

  // string
  getSubdomain = () => this.attributes.subdomain

  // string # Agent local root path
  getRoot = () => this.attributes.root

  // string # Files Agent API Token
  getApiToken = () => this.attributes.api_token

  // int64 # Incoming port for files agent connections
  getPort = () => this.attributes.port

  // string
  getHostname = () => this.attributes.hostname

  // string # public key
  getPublicKey = () => this.attributes.public_key

  // string # either running or shutdown
  getStatus = () => this.attributes.status

  // string
  getServerHostKey = () => this.attributes.server_host_key

  // string # agent config version
  getConfigVersion = () => this.attributes.config_version

}

export default RemoteServerConfigurationFile

module.exports = RemoteServerConfigurationFile
module.exports.default = RemoteServerConfigurationFile
