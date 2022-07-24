import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

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

  // date-time # Invoice line item updated date/time
  getUpdatedAt = () => this.attributes.updated_at

  // string # Plan name
  getPlan = () => this.attributes.plan

  // string # Site name
  getSite = () => this.attributes.site

}

export default InvoiceLineItem
