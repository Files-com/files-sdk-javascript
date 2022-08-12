import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Status
 */
class Status {
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
  // int64 # Status HTTP code
  getCode = () => this.attributes.code

  // string # Error message
  getMessage = () => this.attributes.message

  // string # Status message
  getStatus = () => this.attributes.status

  // Auto # Additional data
  getData = () => this.attributes.data

  // array # A list of api errors
  getErrors = () => this.attributes.errors

  // int64 # Required Clickwrap id
  getClickwrapId = () => this.attributes.clickwrap_id

  // string # Required Clickwrap body
  getClickwrapBody = () => this.attributes.clickwrap_body

}

export default Status
