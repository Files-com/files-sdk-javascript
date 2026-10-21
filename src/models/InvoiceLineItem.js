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
 * Class InvoiceLineItem
 */
class InvoiceLineItem {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Invoice Line item Id
  getId = () => this.attributes.id

  // decimal # Invoice line item amount
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
