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
 * Class SyncRunLiveTransfer
 */
class SyncRunLiveTransfer {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
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
