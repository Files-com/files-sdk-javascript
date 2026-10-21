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
 * Class Style
 */
class Style {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.path

  // int64 # Style ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // Image # Logo
  getLogo = () => this.attributes.logo

  setLogo = value => {
    this.attributes.logo = value
    exposeAttributes(this, ['logo'])
  }

  // string # URL to open when a public visitor clicks the logo
  getLogoClickHref = () => this.attributes.logo_click_href

  setLogoClickHref = value => {
    this.attributes.logo_click_href = value
    exposeAttributes(this, ['logo_click_href'])
  }

  // Image # Logo thumbnail
  getThumbnail = () => this.attributes.thumbnail

  setThumbnail = value => {
    this.attributes.thumbnail = value
    exposeAttributes(this, ['thumbnail'])
  }

  // file # Logo for custom branding. Required when creating a new style.
  getFile = () => this.attributes.file

  setFile = value => {
    this.attributes.file = value
    exposeAttributes(this, ['file'])
  }

  // Parameters:
  //   file - file - Logo for custom branding. Required when creating a new style.
  //   logo_click_href - string - URL to open when a public visitor clicks the logo.
  update = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.logo_click_href !== undefined && params.logo_click_href !== null && !isString(params.logo_click_href)) {
      throw new errors.InvalidParameterError(`Bad parameter: logo_click_href must be of type String, received ${getType(params.logo_click_href)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/styles/${encodeURIComponent(params.path)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
  }

  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    await Api.sendRequest(`/styles/${encodeURIComponent(params.path)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    await this.update(this.attributes)
    return true
  }

  // Parameters:
  //   path (required) - string - Style path.
  static find = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    const response = await Api.sendRequest(`/styles/${encodeURIComponent(params.path)}`, 'GET', params, options)

    return new Style(response?.data, retainedOptions(options))
  }

  static get = (path, params = {}, options = {}) =>
    Style.find(path, params, options)
}

export default Style

module.exports = Style
module.exports.default = Style
