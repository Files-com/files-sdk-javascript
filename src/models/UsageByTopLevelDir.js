/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class UsageByTopLevelDir
 */
class UsageByTopLevelDir {
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

  // string # Directory name
  getDir = () => this.attributes.dir

  // int64 # Usage
  getSize = () => this.attributes.size

  // int64 # File count
  getCount = () => this.attributes.count
}

export default UsageByTopLevelDir

module.exports = UsageByTopLevelDir
module.exports.default = UsageByTopLevelDir
