import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class ShareGroupMember
 */
class ShareGroupMember {
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
  // string # Name of the share group member
  getName = () => this.attributes.name

  // string # Company of the share group member
  getCompany = () => this.attributes.company

  // string # Email of the share group member
  getEmail = () => this.attributes.email

}

export default ShareGroupMember
