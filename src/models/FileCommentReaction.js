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

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
const retainedOptions = options => {
  if (!options?.client) {
    return options
  }

  const { signal, ...context } = options
  return context
}

/**
 * Class FileCommentReaction
 */
class FileCommentReaction {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Reaction ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Emoji used in the reaction.
  getEmoji = () => this.attributes.emoji

  setEmoji = value => {
    this.attributes.emoji = value
    exposeAttributes(this, ['emoji'])
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // int64 # ID of file comment to attach reaction to.
  getFileCommentId = () => this.attributes.file_comment_id

  setFileCommentId = value => {
    this.attributes.file_comment_id = value
    exposeAttributes(this, ['file_comment_id'])
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/file_comment_reactions/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The FileCommentReaction object doesn\'t support updates.')
    } else {
      const newObject = await FileCommentReaction.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   file_comment_id (required) - int64 - ID of file comment to attach reaction to.
  //   emoji (required) - string - Emoji to react with.
  static create = async (params = {}, options = {}) => {
    if (!params.file_comment_id) {
      throw new errors.MissingParameterError('Parameter missing: file_comment_id')
    }

    if (!params.emoji) {
      throw new errors.MissingParameterError('Parameter missing: emoji')
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.file_comment_id !== undefined && params.file_comment_id !== null && !isInt(params.file_comment_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_comment_id must be of type Int, received ${getType(params.file_comment_id)}`)
    }

    if (params.emoji !== undefined && params.emoji !== null && !isString(params.emoji)) {
      throw new errors.InvalidParameterError(`Bad parameter: emoji must be of type String, received ${getType(params.emoji)}`)
    }

    const response = await Api.sendRequest('/file_comment_reactions', 'POST', params, options)

    return new FileCommentReaction(response?.data, retainedOptions(options))
  }
}

export default FileCommentReaction

module.exports = FileCommentReaction
module.exports.default = FileCommentReaction
