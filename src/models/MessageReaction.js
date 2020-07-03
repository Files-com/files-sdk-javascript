import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isInt, isObject, isString } from '../utils'

/**
 * Class MessageReaction
 */
class MessageReaction {
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
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/message_reactions/' . params['id'] . '`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
    if (this.attributes['id']) {
      throw new Error('The MessageReaction object doesn\'t support updates.')
    } else {
      const newObject = MessageReaction.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   message_id (required) - int64 - Message to return reactions for.
  static list = async (params = {}, options = {}) => {
    if (!params['message_id']) {
      throw new Error('Parameter missing: message_id')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    if (params['message_id'] && !isInt(params['message_id'])) {
      throw new Error(`Bad parameter: message_id must be of type Int, received ${getType(message_id)}`)
    }

    const response = await Api.sendRequest(`/message_reactions`, 'GET', params, options)

    return response?.data?.map(obj => new MessageReaction(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    MessageReaction.list(params, options)

  // Parameters:
  //   id (required) - int64 - Message Reaction ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/message_reactions/' . params['id'] . '`, 'GET', params, options)

    return new MessageReaction(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    MessageReaction.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   emoji (required) - string - Emoji to react with.
  static create = async (params = {}, options = {}) => {
    if (!params['emoji']) {
      throw new Error('Parameter missing: emoji')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['emoji'] && !isString(params['emoji'])) {
      throw new Error(`Bad parameter: emoji must be of type String, received ${getType(emoji)}`)
    }

    const response = await Api.sendRequest(`/message_reactions`, 'POST', params, options)

    return new MessageReaction(response?.data, options)
  }
}

export default MessageReaction
