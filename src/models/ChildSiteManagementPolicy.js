/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class ChildSiteManagementPolicy
 */
class ChildSiteManagementPolicy {
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

  // int64 # ChildSiteManagementPolicy ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # ID of the Site managing the policy
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
  }

  // string # The name of the setting that is managed by the policy
  getSiteSettingName = () => this.attributes.site_setting_name

  setSiteSettingName = value => {
    this.attributes.site_setting_name = value
  }

  // string # The value for the setting that will be enforced for all child sites that are not exempt
  getManagedValue = () => this.attributes.managed_value

  setManagedValue = value => {
    this.attributes.managed_value = value
  }

  // array(int64) # The list of child site IDs that are exempt from this policy
  getSkipChildSiteIds = () => this.attributes.skip_child_site_ids

  setSkipChildSiteIds = value => {
    this.attributes.skip_child_site_ids = value
  }

  // Parameters:
  //   site_setting_name (required) - string - The name of the setting that is managed by the policy
  //   managed_value (required) - string - The value for the setting that will be enforced for all child sites that are not exempt
  //   skip_child_site_ids - array(int64) - The list of child site IDs that are exempt from this policy
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

    if (params.site_setting_name && !isString(params.site_setting_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_setting_name must be of type String, received ${getType(params.site_setting_name)}`)
    }

    if (params.managed_value && !isString(params.managed_value)) {
      throw new errors.InvalidParameterError(`Bad parameter: managed_value must be of type String, received ${getType(params.managed_value)}`)
    }

    if (params.skip_child_site_ids && !isArray(params.skip_child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_child_site_ids must be of type Array, received ${getType(params.skip_child_site_ids)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    if (!params.site_setting_name) {
      if (this.attributes.site_setting_name) {
        params.site_setting_name = this.site_setting_name
      } else {
        throw new errors.MissingParameterError('Parameter missing: site_setting_name')
      }
    }

    if (!params.managed_value) {
      if (this.attributes.managed_value) {
        params.managed_value = this.managed_value
      } else {
        throw new errors.MissingParameterError('Parameter missing: managed_value')
      }
    }

    const response = await Api.sendRequest(`/child_site_management_policies/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new ChildSiteManagementPolicy(response?.data, this.options)
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

    await Api.sendRequest(`/child_site_management_policies/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await ChildSiteManagementPolicy.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/child_site_management_policies', 'GET', params, options)

    return response?.data?.map(obj => new ChildSiteManagementPolicy(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    ChildSiteManagementPolicy.list(params, options)

  // Parameters:
  //   id (required) - int64 - Child Site Management Policy ID.
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

    const response = await Api.sendRequest(`/child_site_management_policies/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ChildSiteManagementPolicy(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    ChildSiteManagementPolicy.find(id, params, options)

  // Parameters:
  //   site_setting_name (required) - string - The name of the setting that is managed by the policy
  //   managed_value (required) - string - The value for the setting that will be enforced for all child sites that are not exempt
  //   skip_child_site_ids - array(int64) - The list of child site IDs that are exempt from this policy
  static create = async (params = {}, options = {}) => {
    if (!params.site_setting_name) {
      throw new errors.MissingParameterError('Parameter missing: site_setting_name')
    }

    if (!params.managed_value) {
      throw new errors.MissingParameterError('Parameter missing: managed_value')
    }

    if (params.site_setting_name && !isString(params.site_setting_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_setting_name must be of type String, received ${getType(params.site_setting_name)}`)
    }

    if (params.managed_value && !isString(params.managed_value)) {
      throw new errors.InvalidParameterError(`Bad parameter: managed_value must be of type String, received ${getType(params.managed_value)}`)
    }

    if (params.skip_child_site_ids && !isArray(params.skip_child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_child_site_ids must be of type Array, received ${getType(params.skip_child_site_ids)}`)
    }

    const response = await Api.sendRequest('/child_site_management_policies', 'POST', params, options)

    return new ChildSiteManagementPolicy(response?.data, options)
  }
}

export default ChildSiteManagementPolicy

module.exports = ChildSiteManagementPolicy
module.exports.default = ChildSiteManagementPolicy
