/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AutomationAuthoringSchema
 */
class AutomationAuthoringSchema {
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

  // object # JSON Schema for active Automation v2 graph definitions.
  getDefinitionSchema = () => this.attributes.definition_schema

  // array(object) # Typed error families accepted by Automation v2 on_error rules.
  getErrorFamilies = () => this.attributes.error_families

  // array(object) # Active Automation v2 node authoring metadata.
  getNodes = () => this.attributes.nodes
}

export default AutomationAuthoringSchema

module.exports = AutomationAuthoringSchema
module.exports.default = AutomationAuthoringSchema
