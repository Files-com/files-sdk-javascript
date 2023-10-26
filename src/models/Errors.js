/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import { getType, isArray, isInt, isObject, isString } from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Errors
 */
class Errors {
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
  // array # A list of fields where errors occur
  getFields = () => this.attributes.fields

  // array # A list of error messages
  getMessages = () => this.attributes.messages

}

export default Errors

module.exports = Errors
module.exports.default = Errors
