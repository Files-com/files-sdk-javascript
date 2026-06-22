/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class ChatSession
 */
class ChatSession {
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

  // int64 # Chat Session ID.
  getId = () => this.attributes.id

  // int64 # User ID.
  getUserId = () => this.attributes.user_id

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  // date-time # Most recent chat activity date/time.
  getLastActiveAt = () => this.attributes.last_active_at

  // date-time # Chat session creation date/time.
  getCreatedAt = () => this.attributes.created_at

  // array(object) # Visible conversation messages in this chat session. For performance reasons, this is not provided when listing chat sessions.
  getMessages = () => this.attributes.messages

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/chat_sessions', 'GET', params, options)

    return response?.data?.map(obj => new ChatSession(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ChatSession.list(params, options)

  // Parameters:
  //   id (required) - int64 - Chat Session ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/chat_sessions/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ChatSession(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ChatSession.find(id, params, options)
}

export default ChatSession

module.exports = ChatSession
module.exports.default = ChatSession
