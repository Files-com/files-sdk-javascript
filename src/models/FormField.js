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
 * Class FormField
 */
class FormField {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Form field id
  getId = () => this.attributes.id

  // string # Label to be displayed
  getLabel = () => this.attributes.label

  // boolean # Is this a required field?
  getRequired = () => this.attributes.required

  // string # Help text to be displayed
  getHelpText = () => this.attributes.help_text

  // string # Type of Field
  getFieldType = () => this.attributes.field_type

  // array(string) # Options to display for radio and dropdown
  getOptionsForSelect = () => this.attributes.options_for_select

  // string # Default option for radio and dropdown
  getDefaultOption = () => this.attributes.default_option

  // int64 # Form field set id
  getFormFieldSetId = () => this.attributes.form_field_set_id
}

export default FormField

module.exports = FormField
module.exports.default = FormField
