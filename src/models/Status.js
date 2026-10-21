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
 * Class Status
 */
class Status {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
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

  // array(object) # A list of api errors
  getErrors = () => this.attributes.errors

  // int64 # Required Clickwrap id
  getClickwrapId = () => this.attributes.clickwrap_id

  // string # Required Clickwrap body
  getClickwrapBody = () => this.attributes.clickwrap_body
}

export default Status

module.exports = Status
module.exports.default = Status
