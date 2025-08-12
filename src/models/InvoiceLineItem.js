/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class InvoiceLineItem
 */
class InvoiceLineItem {
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

  // int64 # Invoice Line item Id
  getId = () => this.attributes.id

  // double # Invoice line item amount
  getAmount = () => this.attributes.amount

  // date-time # Invoice line item created at date/time
  getCreatedAt = () => this.attributes.created_at

  // string # Invoice line item description
  getDescription = () => this.attributes.description

  // string # Invoice line item type
  getType = () => this.attributes.type

  // date-time # Invoice line item service end date/time
  getServiceEndAt = () => this.attributes.service_end_at

  // date-time # Invoice line item service start date/time
  getServiceStartAt = () => this.attributes.service_start_at

  // string # Plan name
  getPlan = () => this.attributes.plan

  // string # Site name
  getSite = () => this.attributes.site

  // int64 # Prepaid bytes purchased for this invoice line item
  getPrepaidBytes = () => this.attributes.prepaid_bytes

  // date-time # When the prepaid bytes expire
  getPrepaidBytesExpireAt = () => this.attributes.prepaid_bytes_expire_at

  // int64 # Total prepaid bytes used for this invoice line item
  getPrepaidBytesUsed = () => this.attributes.prepaid_bytes_used

  // int64 # Available prepaid bytes for this invoice line item
  getPrepaidBytesAvailable = () => this.attributes.prepaid_bytes_available
}

export default InvoiceLineItem

module.exports = InvoiceLineItem
module.exports.default = InvoiceLineItem
