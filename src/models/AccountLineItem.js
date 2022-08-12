import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class AccountLineItem
 */
class AccountLineItem {
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
  // int64 # Line item Id
  getId = () => this.attributes.id

  // double # Line item amount
  getAmount = () => this.attributes.amount

  // double # Line item balance
  getBalance = () => this.attributes.balance

  // date-time # Line item created at
  getCreatedAt = () => this.attributes.created_at

  // string # Line item currency
  getCurrency = () => this.attributes.currency

  // string # Line item download uri
  getDownloadUri = () => this.attributes.download_uri

  // array # Associated invoice line items
  getInvoiceLineItems = () => this.attributes.invoice_line_items

  // string # Line item payment method
  getMethod = () => this.attributes.method

  // array # Associated payment line items
  getPaymentLineItems = () => this.attributes.payment_line_items

  // date-time # Date/time payment was reversed if applicable
  getPaymentReversedAt = () => this.attributes.payment_reversed_at

  // string # Type of payment if applicable
  getPaymentType = () => this.attributes.payment_type

  // string # Site name this line item is for
  getSiteName = () => this.attributes.site_name

  // string # Type of line item, either payment or invoice
  getType = () => this.attributes.type

  // date-time # Line item updated at
  getUpdatedAt = () => this.attributes.updated_at

}

export default AccountLineItem
