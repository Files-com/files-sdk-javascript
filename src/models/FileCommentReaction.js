import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FileCommentReaction
 */
class FileCommentReaction {
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

  // int64 # ID of file comment to attach reaction to.
  getFileCommentId = () => this.attributes.file_comment_id

  setFileCommentId = value => {
    this.attributes.file_comment_id = value
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

    const response = await Api.sendRequest(`/file_comment_reactions/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        throw new errors.NotImplementedError('The FileCommentReaction object doesn\'t support updates.')
      } else {
        const newObject = FileCommentReaction.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   file_comment_id (required) - int64 - ID of file comment to attach reaction to.
  //   emoji (required) - string - Emoji to react with.
  static create = async (params = {}, options = {}) => {
    if (!params['file_comment_id']) {
      throw new errors.MissingParameterError('Parameter missing: file_comment_id')
    }

    if (!params['emoji']) {
      throw new errors.MissingParameterError('Parameter missing: emoji')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['file_comment_id'] && !isInt(params['file_comment_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: file_comment_id must be of type Int, received ${getType(params['file_comment_id'])}`)
    }

    if (params['emoji'] && !isString(params['emoji'])) {
      throw new errors.InvalidParameterError(`Bad parameter: emoji must be of type String, received ${getType(params['emoji'])}`)
    }

    const response = await Api.sendRequest(`/file_comment_reactions`, 'POST', params, options)

    return new FileCommentReaction(response?.data, options)
  }
}

export default FileCommentReaction
