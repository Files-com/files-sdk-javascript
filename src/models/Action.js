/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Action
 */
class Action {
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

  // int64 # Action ID
  getId = () => this.attributes.id

  // string # Path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // date-time # Action occurrence date/time
  getWhen = () => this.attributes.when

  // string # The destination path for this action, if applicable
  getDestination = () => this.attributes.destination

  // string # Friendly displayed output
  getDisplay = () => this.attributes.display

  // string # IP Address that performed this action
  getIp = () => this.attributes.ip

  // string # The source path for this action, if applicable
  getSource = () => this.attributes.source

  // object # Targets
  getTargets = () => this.attributes.targets

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  // string # Username
  getUsername = () => this.attributes.username

  // boolean # true if this change was performed by a user on a parent site.
  getUserIsFromParentSite = () => this.attributes.user_is_from_parent_site

  // string # Type of action
  getAction = () => this.attributes.action

  // string # Failure type.  If action was a user login or session failure, why did it fail?
  getFailureType = () => this.attributes.failure_type

  // string # Interface on which this action occurred.
  getInterface = () => this.attributes.interface
}

export default Action

module.exports = Action
module.exports.default = Action
