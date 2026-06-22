/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class ChatMessage
 */
class ChatMessage {
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

  // int64 # Chat Message ID.
  getId = () => this.attributes.id

  // string # Message role.
  getRole = () => this.attributes.role

  // string # Message content.
  getContent = () => this.attributes.content

  // date-time # Message creation date/time.
  getCreatedAt = () => this.attributes.created_at
}

export default ChatMessage

module.exports = ChatMessage
module.exports.default = ChatMessage
