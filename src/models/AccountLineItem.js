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
 * Class AccountLineItem
 */
class AccountLineItem {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Line item Id
  getId = () => this.attributes.id

  // decimal # Line item amount
  getAmount = () => this.attributes.amount

  // decimal # Line item balance
  getBalance = () => this.attributes.balance

  // date-time # Line item created at
  getCreatedAt = () => this.attributes.created_at

  // string # Line item currency
  getCurrency = () => this.attributes.currency

  // string # Line item download uri
  getDownloadUri = () => this.attributes.download_uri

  // array(object) # Associated invoice line items
  getInvoiceLineItems = () => this.attributes.invoice_line_items

  // string # Line item payment method
  getMethod = () => this.attributes.method

  // array(object) # Associated payment line items
  getPaymentLineItems = () => this.attributes.payment_line_items

  // date-time # Date/time payment was reversed if applicable
  getPaymentReversedAt = () => this.attributes.payment_reversed_at

  // string # Type of payment if applicable
  getPaymentType = () => this.attributes.payment_type

  // string # Site name this line item is for
  getSiteName = () => this.attributes.site_name

  // string # Type of line item, either payment or invoice
  getType = () => this.attributes.type
}

export default AccountLineItem

module.exports = AccountLineItem
module.exports.default = AccountLineItem
