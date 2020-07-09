import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FileAction
 */
class FileAction {
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


  // Copy file/folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   structure - boolean - Copy structure only?
  copy = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new Error(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    if (!params['destination']) {
      if (this.attributes.destination) {
        params['destination'] = this.destination
      } else {
        throw new Error('Parameter missing: destination')
      }
    }

    return Api.sendRequest(`/file_actions/copy/${encodeURIComponent(params['path'])}`, 'POST', params, this.options)
  }

  // Move file/folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  move = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new Error(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    if (!params['destination']) {
      if (this.attributes.destination) {
        params['destination'] = this.destination
      } else {
        throw new Error('Parameter missing: destination')
      }
    }

    return Api.sendRequest(`/file_actions/move/${encodeURIComponent(params['path'])}`, 'POST', params, this.options)
  }

  // Begin file upload
  //
  // Parameters:
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   with_rename - boolean - Allow file rename instead of overwrite?
  beginUpload = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['part'] && !isInt(params['part'])) {
      throw new Error(`Bad parameter: part must be of type Int, received ${getType(part)}`)
    }
    if (params['parts'] && !isInt(params['parts'])) {
      throw new Error(`Bad parameter: parts must be of type Int, received ${getType(parts)}`)
    }
    if (params['ref'] && !isString(params['ref'])) {
      throw new Error(`Bad parameter: ref must be of type String, received ${getType(ref)}`)
    }
    if (params['restart'] && !isInt(params['restart'])) {
      throw new Error(`Bad parameter: restart must be of type Int, received ${getType(restart)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    return Api.sendRequest(`/file_actions/begin_upload/${encodeURIComponent(params['path'])}`, 'POST', params, this.options)
  }
}

export default FileAction
