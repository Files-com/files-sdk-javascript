import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class PublicIpAddress
 */
class PublicIpAddress {
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
  // string # The public IP address.
  getIpAddress = () => this.attributes.ip_address

  // string # The name of the frontend server.
  getServerName = () => this.attributes.server_name

  // boolean
  getFtpEnabled = () => this.attributes.ftp_enabled

  // boolean
  getSftpEnabled = () => this.attributes.sftp_enabled

}

export default PublicIpAddress
