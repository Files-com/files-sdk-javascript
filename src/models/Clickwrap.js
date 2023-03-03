import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Clickwrap
 */
class Clickwrap {
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
  // int64 # Clickwrap ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Body text of Clickwrap (supports Markdown formatting).
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
  }

  // string # Use this Clickwrap for User Registrations?  Note: This only applies to User Registrations where the User is invited to your Files.com site using an E-Mail invitation process where they then set their own password.
  getUseWithUsers = () => this.attributes.use_with_users

  setUseWithUsers = value => {
    this.attributes.use_with_users = value
  }

  // string # Use this Clickwrap for Bundles?
  getUseWithBundles = () => this.attributes.use_with_bundles

  setUseWithBundles = value => {
    this.attributes.use_with_bundles = value
  }

  // string # Use this Clickwrap for Inboxes?
  getUseWithInboxes = () => this.attributes.use_with_inboxes

  setUseWithInboxes = value => {
    this.attributes.use_with_inboxes = value
  }


  // Parameters:
  //   name - string - Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
  //   body - string - Body text of Clickwrap (supports Markdown formatting).
  //   use_with_bundles - string - Use this Clickwrap for Bundles?
  //   use_with_inboxes - string - Use this Clickwrap for Inboxes?
  //   use_with_users - string - Use this Clickwrap for User Registrations?  Note: This only applies to User Registrations where the User is invited to your Files.com site using an E-Mail invitation process where they then set their own password.
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
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(name)}`)
    }
    if (params['body'] && !isString(params['body'])) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(body)}`)
    }
    if (params['use_with_bundles'] && !isString(params['use_with_bundles'])) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_bundles must be of type String, received ${getType(use_with_bundles)}`)
    }
    if (params['use_with_inboxes'] && !isString(params['use_with_inboxes'])) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_inboxes must be of type String, received ${getType(use_with_inboxes)}`)
    }
    if (params['use_with_users'] && !isString(params['use_with_users'])) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_users must be of type String, received ${getType(use_with_users)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/clickwraps/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new Clickwrap(response?.data, this.options)
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

    const response = await Api.sendRequest(`/clickwraps/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Clickwrap.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/clickwraps`, 'GET', params, options)

    return response?.data?.map(obj => new Clickwrap(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Clickwrap.list(params, options)

  // Parameters:
  //   id (required) - int64 - Clickwrap ID.
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

    const response = await Api.sendRequest(`/clickwraps/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Clickwrap(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Clickwrap.find(id, params, options)

  // Parameters:
  //   name - string - Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
  //   body - string - Body text of Clickwrap (supports Markdown formatting).
  //   use_with_bundles - string - Use this Clickwrap for Bundles?
  //   use_with_inboxes - string - Use this Clickwrap for Inboxes?
  //   use_with_users - string - Use this Clickwrap for User Registrations?  Note: This only applies to User Registrations where the User is invited to your Files.com site using an E-Mail invitation process where they then set their own password.
  static create = async (params = {}, options = {}) => {
    if (params['name'] && !isString(params['name'])) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params['name'])}`)
    }

    if (params['body'] && !isString(params['body'])) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params['body'])}`)
    }

    if (params['use_with_bundles'] && !isString(params['use_with_bundles'])) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_bundles must be of type String, received ${getType(params['use_with_bundles'])}`)
    }

    if (params['use_with_inboxes'] && !isString(params['use_with_inboxes'])) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_inboxes must be of type String, received ${getType(params['use_with_inboxes'])}`)
    }

    if (params['use_with_users'] && !isString(params['use_with_users'])) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_users must be of type String, received ${getType(params['use_with_users'])}`)
    }

    const response = await Api.sendRequest(`/clickwraps`, 'POST', params, options)

    return new Clickwrap(response?.data, options)
  }
}

export default Clickwrap
