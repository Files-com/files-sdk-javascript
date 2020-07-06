import Api from '../Api'
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

  // int64 # Status http code
  getCode = () => this.attributes.code

  // string # Error message
  getMessage = () => this.attributes.message

  // string # Status message
  getStatus = () => this.attributes.status

  // Additional data
  getData = () => this.attributes.data

  // array # A list of api errors
  getErrors = () => this.attributes.errors

}

export default Status
