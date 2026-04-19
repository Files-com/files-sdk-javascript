/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class MetadataCategory
 */
class MetadataCategory {
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

  // int64 # Metadata Category ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Name of the metadata category.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // hash(string,array(string)) # Map of key names to arrays of allowed values. An empty array means free-form text.
  getDefinitions = () => this.attributes.definitions

  setDefinitions = value => {
    this.attributes.definitions = value
  }

  // array(string) # Metadata keys that should appear as columns in the UI by default.
  getDefaultColumns = () => this.attributes.default_columns

  setDefaultColumns = value => {
    this.attributes.default_columns = value
  }

  // Parameters:
  //   name - string - Name of the metadata category.
  //   default_columns - array(string) - Metadata keys that should appear as columns in the UI by default.
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.default_columns && !isArray(params.default_columns)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_columns must be of type Array, received ${getType(params.default_columns)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/metadata_categories/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new MetadataCategory(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/metadata_categories/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await MetadataCategory.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are .
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/metadata_categories', 'GET', params, options)

    return response?.data?.map(obj => new MetadataCategory(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    MetadataCategory.list(params, options)

  // Parameters:
  //   id (required) - int64 - Metadata Category ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/metadata_categories/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new MetadataCategory(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    MetadataCategory.find(id, params, options)

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   path (required) - string - Path to operate on.
  static listFor = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    const response = await Api.sendRequest(`/metadata_categories/list_by_path/${encodeURIComponent(params.path)}`, 'GET', params, options)

    return response?.data?.map(obj => new MetadataCategory(obj, options)) || []
  }

  // Parameters:
  //   name (required) - string - Name of the metadata category.
  //   default_columns - array(string) - Metadata keys that should appear as columns in the UI by default.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.default_columns && !isArray(params.default_columns)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_columns must be of type Array, received ${getType(params.default_columns)}`)
    }

    const response = await Api.sendRequest('/metadata_categories', 'POST', params, options)

    return new MetadataCategory(response?.data, options)
  }
}

export default MetadataCategory

module.exports = MetadataCategory
module.exports.default = MetadataCategory
