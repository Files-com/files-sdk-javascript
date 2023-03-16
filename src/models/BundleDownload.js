import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class BundleDownload
 */
class BundleDownload {
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
  // BundleRegistration
  getBundleRegistration = () => this.attributes.bundle_registration

  // string # Download method (file or full_zip)
  getDownloadMethod = () => this.attributes.download_method

  // string # Download path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // date-time # Download date/time
  getCreatedAt = () => this.attributes.created_at


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[created_at]=desc`). Valid fields are `created_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
  //   bundle_id - int64 - Bundle ID
  //   bundle_registration_id - int64 - BundleRegistration ID
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['bundle_id'] && !isInt(params['bundle_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_id must be of type Int, received ${getType(params['bundle_id'])}`)
    }

    if (params['bundle_registration_id'] && !isInt(params['bundle_registration_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: bundle_registration_id must be of type Int, received ${getType(params['bundle_registration_id'])}`)
    }

    const response = await Api.sendRequest(`/bundle_downloads`, 'GET', params, options)

    return response?.data?.map(obj => new BundleDownload(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BundleDownload.list(params, options)
}

export default BundleDownload
