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
 * Class Clickwrap
 */
class Clickwrap {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Clickwrap ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Body text of Clickwrap (supports Markdown formatting).
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
    exposeAttributes(this, ['body'])
  }

  // string # Use this Clickwrap for Users?  Values: `none`, `require` (new user signup via email invitation only), `require_all_users_once` (show to all users at their next web login; once accepted, not shown again), `require_all_users_always` (show to all users on every web login).
  getUseWithUsers = () => this.attributes.use_with_users

  setUseWithUsers = value => {
    this.attributes.use_with_users = value
    exposeAttributes(this, ['use_with_users'])
  }

  // string # Use this Clickwrap for Bundles?
  getUseWithBundles = () => this.attributes.use_with_bundles

  setUseWithBundles = value => {
    this.attributes.use_with_bundles = value
    exposeAttributes(this, ['use_with_bundles'])
  }

  // string # Use this Clickwrap for Inboxes?
  getUseWithInboxes = () => this.attributes.use_with_inboxes

  setUseWithInboxes = value => {
    this.attributes.use_with_inboxes = value
    exposeAttributes(this, ['use_with_inboxes'])
  }

  // Parameters:
  //   name - string - Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
  //   body - string - Body text of Clickwrap (supports Markdown formatting).
  //   use_with_bundles - string - Use this Clickwrap for Bundles?
  //   use_with_inboxes - string - Use this Clickwrap for Inboxes?
  //   use_with_users - string - Use this Clickwrap for Users?  Values: `none`, `require` (new user signup via email invitation only), `require_all_users_once` (show to all users at their next web login; once accepted, not shown again), `require_all_users_always` (show to all users on every web login).
  update = async (params = {}) => {
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

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.body !== undefined && params.body !== null && !isString(params.body)) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params.body)}`)
    }

    if (params.use_with_bundles !== undefined && params.use_with_bundles !== null && !isString(params.use_with_bundles)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_bundles must be of type String, received ${getType(params.use_with_bundles)}`)
    }

    if (params.use_with_inboxes !== undefined && params.use_with_inboxes !== null && !isString(params.use_with_inboxes)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_inboxes must be of type String, received ${getType(params.use_with_inboxes)}`)
    }

    if (params.use_with_users !== undefined && params.use_with_users !== null && !isString(params.use_with_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_users must be of type String, received ${getType(params.use_with_users)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/clickwraps/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
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

    await Api.sendRequest(`/clickwraps/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Clickwrap.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/clickwraps', 'GET', params, options)

    return response?.data?.map(obj => new Clickwrap(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Clickwrap.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Clickwrap.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Clickwrap ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/clickwraps/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Clickwrap(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Clickwrap.find(id, params, options)

  // Parameters:
  //   name - string - Name of the Clickwrap agreement (used when selecting from multiple Clickwrap agreements.)
  //   body - string - Body text of Clickwrap (supports Markdown formatting).
  //   use_with_bundles - string - Use this Clickwrap for Bundles?
  //   use_with_inboxes - string - Use this Clickwrap for Inboxes?
  //   use_with_users - string - Use this Clickwrap for Users?  Values: `none`, `require` (new user signup via email invitation only), `require_all_users_once` (show to all users at their next web login; once accepted, not shown again), `require_all_users_always` (show to all users on every web login).
  static create = async (params = {}, options = {}) => {
    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.body !== undefined && params.body !== null && !isString(params.body)) {
      throw new errors.InvalidParameterError(`Bad parameter: body must be of type String, received ${getType(params.body)}`)
    }

    if (params.use_with_bundles !== undefined && params.use_with_bundles !== null && !isString(params.use_with_bundles)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_bundles must be of type String, received ${getType(params.use_with_bundles)}`)
    }

    if (params.use_with_inboxes !== undefined && params.use_with_inboxes !== null && !isString(params.use_with_inboxes)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_inboxes must be of type String, received ${getType(params.use_with_inboxes)}`)
    }

    if (params.use_with_users !== undefined && params.use_with_users !== null && !isString(params.use_with_users)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_with_users must be of type String, received ${getType(params.use_with_users)}`)
    }

    const response = await Api.sendRequest('/clickwraps', 'POST', params, options)

    return new Clickwrap(response?.data, retainedOptions(options))
  }
}

export default Clickwrap

module.exports = Clickwrap
module.exports.default = Clickwrap
