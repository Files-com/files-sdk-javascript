import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Style
 */
class Style {
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

  isLoaded = () => !!this.attributes.path
  // int64 # Style ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Folder path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // Logo
  getLogo = () => this.attributes.logo

  setLogo = value => {
    this.attributes.logo = value
  }

  // Logo thumbnail
  getThumbnail = () => this.attributes.thumbnail

  setThumbnail = value => {
    this.attributes.thumbnail = value
  }

  // file # Logo for custom branding.
  getFile = () => this.attributes.file

  setFile = value => {
    this.attributes.file = value
  }


  // Parameters:
  //   file (required) - file - Logo for custom branding.
  update = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    if (!params['file']) {
      if (this.attributes.file) {
        params['file'] = this.file
      } else {
        throw new Error('Parameter missing: file')
      }
    }

    return Api.sendRequest(`/styles/${params['path']}`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    return Api.sendRequest(`/styles/${params['path']}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () =>
    this.update(this.attributes)

  // Parameters:
  //   path (required) - string - Style path.
  static find = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    const response = await Api.sendRequest(`/styles/${params['path']}`, 'GET', params, options)

    return new Style(response?.data, options)
  }

  static get = (path, params = {}, options = {}) =>
    Style.find(path, params, options)
}

export default Style
