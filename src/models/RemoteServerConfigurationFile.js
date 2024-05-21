/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
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

  // boolean # Follow symlinks when traversing directories
  getFollowLinks = () => this.attributes.follow_links

  // string # Preferred network protocol ['udp', 'tcp']
  getPreferProtocol = () => this.attributes.prefer_protocol

  // string # DNS lookup method ['auto','doh','system']
  getDns = () => this.attributes.dns

  // boolean # Proxy all outbound traffic through files.com proxy server
  getProxyAllOutbound = () => this.attributes.proxy_all_outbound

  // string # Custom site endpoint URL
  getEndpointOverride = () => this.attributes.endpoint_override

  // string # Log file name and location
  getLogFile = () => this.attributes.log_file

  // string # Log level for the agent logs ['debug', 'info', 'warn', 'error', 'fatal']
  getLogLevel = () => this.attributes.log_level

  // int64 # Log route for agent logs. (default 5)
  getLogRotateNum = () => this.attributes.log_rotate_num

  // int64 # Log route size in MB for agent logs. (default 20MB)
  getLogRotateSize = () => this.attributes.log_rotate_size

  // int64 # Maximum number of concurrent jobs (default CPU Count * 4)
  getMaxConcurrentJobs = () => this.attributes.max_concurrent_jobs

  // int64 # Graceful shutdown timeout in seconds
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
