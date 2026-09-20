/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class PartnerConnection
 */
class PartnerConnection {
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

  // int64 # Relationship ID used with DELETE /partner_sites/:id to disconnect.
  getId = () => this.attributes.id

  // string # This Partner's role in this connection. A host shares local files with the connected site; a guest accesses files shared by the connected site.
  getRole = () => this.attributes.role

  // int64 # ID of the connected site.
  getSiteId = () => this.attributes.site_id

  // string # Name of the connected site.
  getSiteName = () => this.attributes.site_name

  // string # File API path to the connected Host's mount on this site when role is guest. Null when role is host. File access remains subject to the caller's permissions and the Host Partner's grants.
  getMountPath = () => this.attributes.mount_path
}

export default PartnerConnection

module.exports = PartnerConnection
module.exports.default = PartnerConnection
