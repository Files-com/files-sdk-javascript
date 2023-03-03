import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Invoice
 */
class Invoice {
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


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/invoices`, 'GET', params, options)

    return response?.data?.map(obj => new AccountLineItem(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Invoice.list(params, options)

  // Parameters:
  //   id (required) - int64 - Invoice ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/invoices/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new AccountLineItem(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Invoice.find(id, params, options)
}

export default Invoice
