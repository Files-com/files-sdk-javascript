import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Message
 */
class Message {
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
  // int64 # Message ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Message subject.
  getSubject = () => this.attributes.subject

  setSubject = value => {
    this.attributes.subject = value
  }

  // string # Message body.
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
  }

  // array # Comments.
  getComments = () => this.attributes.comments

  setComments = value => {
    this.attributes.comments = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // int64 # Project to which the message should be attached.
  getProjectId = () => this.attributes.project_id

  setProjectId = value => {
    this.attributes.project_id = value
  }


  // Parameters:
  //   project_id (required) - int64 - Project to which the message should be attached.
  //   subject (required) - string - Message subject.
  //   body (required) - string - Message body.
  update = async (params = {}) => {
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
    if (params['project_id'] && !isInt(params['project_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: project_id must be of type Int, received ${getType(project_id)}`)
    }
    if (params['subject'] && !isString(params['subject'])) {
      throw new errors.InvalidParameterError(`Bad parameter: subject must be of type String, received ${getType(subject)}`)
    }
    if (params['body'] && !isString(params['body'])) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(body)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params['project_id']) {
      if (this.attributes.project_id) {
        params['project_id'] = this.project_id
      } else {
        throw new errors.MissingParameterError('Parameter missing: project_id')
      }
    }

    if (!params['subject']) {
      if (this.attributes.subject) {
        params['subject'] = this.subject
      } else {
        throw new errors.MissingParameterError('Parameter missing: subject')
      }
    }

    if (!params['body']) {
      if (this.attributes.body) {
        params['body'] = this.body
      } else {
        throw new errors.MissingParameterError('Parameter missing: body')
      }
    }

    const response = await Api.sendRequest(`/messages/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new Message(response?.data, this.options)
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

    const response = await Api.sendRequest(`/messages/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Message.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   project_id (required) - int64 - Project for which to return messages.
  static list = async (params = {}, options = {}) => {
    if (!params['project_id']) {
      throw new errors.MissingParameterError('Parameter missing: project_id')
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

    if (params['project_id'] && !isInt(params['project_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: project_id must be of type Int, received ${getType(params['project_id'])}`)
    }

    const response = await Api.sendRequest(`/messages`, 'GET', params, options)

    return response?.data?.map(obj => new Message(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Message.list(params, options)

  // Parameters:
  //   id (required) - int64 - Message ID.
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

    const response = await Api.sendRequest(`/messages/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Message(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Message.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   project_id (required) - int64 - Project to which the message should be attached.
  //   subject (required) - string - Message subject.
  //   body (required) - string - Message body.
  static create = async (params = {}, options = {}) => {
    if (!params['project_id']) {
      throw new errors.MissingParameterError('Parameter missing: project_id')
    }

    if (!params['subject']) {
      throw new errors.MissingParameterError('Parameter missing: subject')
    }

    if (!params['body']) {
      throw new errors.MissingParameterError('Parameter missing: body')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['project_id'] && !isInt(params['project_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: project_id must be of type Int, received ${getType(params['project_id'])}`)
    }

    if (params['subject'] && !isString(params['subject'])) {
      throw new errors.InvalidParameterError(`Bad parameter: subject must be of type String, received ${getType(params['subject'])}`)
    }

    if (params['body'] && !isString(params['body'])) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params['body'])}`)
    }

    const response = await Api.sendRequest(`/messages`, 'POST', params, options)

    return new Message(response?.data, options)
  }
}

export default Message
