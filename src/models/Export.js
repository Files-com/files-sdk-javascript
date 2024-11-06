/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Export
 */
class Export {
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

  // int64 # ID for this Export
  getId = () => this.attributes.id

  // string # Status of the Export
  getExportStatus = () => this.attributes.export_status

  // string # Type of data being exported
  getExportType = () => this.attributes.export_type

  // string # Link to download Export file.
  getDownloadUri = () => this.attributes.download_uri

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `export_status` and `export_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `export_status` and `export_type`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `export_type`.
  static list = async (params = {}, options = {}) => {
    if (params.user_id && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/exports', 'GET', params, options)

    return response?.data?.map(obj => new Export(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Export.list(params, options)

  // Parameters:
  //   id (required) - int64 - Export ID.
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

    const response = await Api.sendRequest(`/exports/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Export(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Export.find(id, params, options)
}

export default Export

module.exports = Export
module.exports.default = Export
