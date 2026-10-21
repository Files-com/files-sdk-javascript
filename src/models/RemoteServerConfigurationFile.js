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
 * Class RemoteServerConfigurationFile
 */
class RemoteServerConfigurationFile {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # The remote server ID of the agent
  getId = () => this.attributes.id

  // string # The permission set for the agent ['read_write', 'read_only', 'write_only']
  getPermissionSet = () => this.attributes.permission_set

  // string # The private key for the agent
  getPrivateKey = () => this.attributes.private_key

  // string # Files.com subdomain site name
  getSubdomain = () => this.attributes.subdomain

  // string # The root directory for the agent
  getRoot = () => this.attributes.root

  // string # Optional customer-facing name for this Agent installation
  getNodeName = () => this.attributes.node_name

  // boolean # Follow symlinks when traversing directories
  getFollowLinks = () => this.attributes.follow_links

  // string # Preferred network protocol ['udp', 'tcp'] (default udp)
  getPreferProtocol = () => this.attributes.prefer_protocol

  // string # DNS lookup method ['auto','doh','system'] (default auto)
  getDns = () => this.attributes.dns

  // boolean # Proxy all outbound traffic through files.com proxy server
  getProxyAllOutbound = () => this.attributes.proxy_all_outbound

  // string # Custom site endpoint URL
  getEndpointOverride = () => this.attributes.endpoint_override

  // string # Log file name and location
  getLogFile = () => this.attributes.log_file

  // string # Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal'] (default info)
  getLogLevel = () => this.attributes.log_level

  // int64 # Log route for agent logs. (default 5)
  getLogRotateNum = () => this.attributes.log_rotate_num

  // int64 # Log route size in MB for agent logs. (default 20)
  getLogRotateSize = () => this.attributes.log_rotate_size

  // int64 # Maximum number of concurrent jobs (default 500)
  getOverrideMaxConcurrentJobs = () => this.attributes.override_max_concurrent_jobs

  // int64 # Graceful shutdown timeout in seconds (default 15)
  getGracefulShutdownTimeout = () => this.attributes.graceful_shutdown_timeout

  // string # File transfer (upload/download) rate limit
  //  `<limit>-<period>`, with the given periods:
  // * 'S': second
  // * 'M': minute
  // * 'H': hour
  // * 'D': day
  // Examples:
  // * 5 requests/second: '5-S'
  // * 10 requests/minute: '10-M'
  // * 1000 requests/hour: '1000-H'
  // * 2000 requests/day: '2000-D'
  getTransferRateLimit = () => this.attributes.transfer_rate_limit

  // string # Auto update policy ['manual_trigger', 'critical_only', 'always', 'never'] (default always)
  getAutoUpdatePolicy = () => this.attributes.auto_update_policy
}

export default RemoteServerConfigurationFile

module.exports = RemoteServerConfigurationFile
module.exports.default = RemoteServerConfigurationFile
