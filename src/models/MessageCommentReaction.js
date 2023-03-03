import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class MessageCommentReaction
 */
class MessageCommentReaction {
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
  // int64 # Reaction ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Emoji used in the reaction.
  getEmoji = () => this.attributes.emoji

  setEmoji = value => {
    this.attributes.emoji = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }


  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/message_comment_reactions/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        throw new errors.NotImplementedError('The MessageCommentReaction object doesn\'t support updates.')
      } else {
        const newObject = MessageCommentReaction.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   message_comment_id (required) - int64 - Message comment to return reactions for.
  static list = async (params = {}, options = {}) => {
    if (!params['message_comment_id']) {
      throw new errors.MissingParameterError('Parameter missing: message_comment_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['message_comment_id'] && !isInt(params['message_comment_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: message_comment_id must be of type Int, received ${getType(params['message_comment_id'])}`)
    }

    const response = await Api.sendRequest(`/message_comment_reactions`, 'GET', params, options)

    return response?.data?.map(obj => new MessageCommentReaction(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    MessageCommentReaction.list(params, options)

  // Parameters:
  //   id (required) - int64 - Message Comment Reaction ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/message_comment_reactions/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new MessageCommentReaction(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    MessageCommentReaction.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   emoji (required) - string - Emoji to react with.
  static create = async (params = {}, options = {}) => {
    if (!params['emoji']) {
      throw new errors.MissingParameterError('Parameter missing: emoji')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['emoji'] && !isString(params['emoji'])) {
      throw new errors.InvalidParameterError(`Bad parameter: emoji must be of type String, received ${getType(params['emoji'])}`)
    }

    const response = await Api.sendRequest(`/message_comment_reactions`, 'POST', params, options)

    return new MessageCommentReaction(response?.data, options)
  }
}

export default MessageCommentReaction
