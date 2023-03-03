import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FileComment
 */
class FileComment {
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
  // int64 # File Comment ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Comment body.
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
  }

  // array # Reactions to this comment.
  getReactions = () => this.attributes.reactions

  setReactions = value => {
    this.attributes.reactions = value
  }

  // string # File path.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }


  // Parameters:
  //   body (required) - string - Comment body.
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

    if (!params['body']) {
      if (this.attributes.body) {
        params['body'] = this.body
      } else {
        throw new errors.MissingParameterError('Parameter missing: body')
      }
    }

    const response = await Api.sendRequest(`/file_comments/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new FileComment(response?.data, this.options)
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

    const response = await Api.sendRequest(`/file_comments/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = FileComment.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   path (required) - string - Path to operate on.
  static listFor = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/file_comments/files/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return response?.data?.map(obj => new FileComment(obj, options)) || []
  }

  // Parameters:
  //   body (required) - string - Comment body.
  //   path (required) - string - File path.
  static create = async (params = {}, options = {}) => {
    if (!params['body']) {
      throw new errors.MissingParameterError('Parameter missing: body')
    }

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['body'] && !isString(params['body'])) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params['body'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    const response = await Api.sendRequest(`/file_comments`, 'POST', params, options)

    return new FileComment(response?.data, options)
  }
}

export default FileComment
