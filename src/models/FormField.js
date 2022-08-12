import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FormField
 */
class FormField {
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

  // array # Options to display for radio and dropdown
  getOptionsForSelect = () => this.attributes.options_for_select

  // string # Default option for radio and dropdown
  getDefaultOption = () => this.attributes.default_option

  // int64 # Form field set id
  getFormFieldSetId = () => this.attributes.form_field_set_id

}

export default FormField
