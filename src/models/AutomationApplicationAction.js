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
 * Class AutomationApplicationAction
 */
class AutomationApplicationAction {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // AutomationApplication # Application that provides the action.
  getApplication = () => this.attributes.application

  // string # Stable action key within the application.
  getKey = () => this.attributes.key

  // string # Action display name.
  getName = () => this.attributes.name

  // string # What the action does.
  getDescription = () => this.attributes.description

  // string # Fingerprint of the action contract shown to the author.
  getFingerprint = () => this.attributes.fingerprint

  // array(object) # Normalized input fields.
  getFields = () => this.attributes.fields

  // object # Normalized output schema.
  getOutput = () => this.attributes.output

  // array(string) # HTTPS origins supported by this action.
  getOrigins = () => this.attributes.origins

  // array(object) # Authentication types accepted by this action.
  getAuthentication = () => this.attributes.authentication
}

export default AutomationApplicationAction

module.exports = AutomationApplicationAction
module.exports.default = AutomationApplicationAction
