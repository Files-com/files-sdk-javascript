/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class SyncRunLiveTransfer
 */
class SyncRunLiveTransfer {
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

  // string # The file path being transferred. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # Status of this individual transfer
  getStatus = () => this.attributes.status

  // int64 # Bytes transferred so far
  getBytesCopied = () => this.attributes.bytes_copied

  // int64 # Total bytes of the file being transferred
  getBytesTotal = () => this.attributes.bytes_total

  // double # Transfer progress from 0.0 to 1.0
  getPercentage = () => this.attributes.percentage

  // string # Estimated time remaining (human-readable)
  getEta = () => this.attributes.eta

  // string # When this individual transfer started
  getStartedAt = () => this.attributes.started_at
}

export default SyncRunLiveTransfer

module.exports = SyncRunLiveTransfer
module.exports.default = SyncRunLiveTransfer
