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

  // int64 # Policy ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Type of policy.  Valid values: `settings`.
  getPolicyType = () => this.attributes.policy_type

  setPolicyType = value => {
    this.attributes.policy_type = value
  }

  // string # Name for this policy.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Description for this policy.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // object # Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash section of the developer documentation.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
  }

  // array(int64) # IDs of child sites that this policy has been applied to. This field is read-only.
  getAppliedChildSiteIds = () => this.attributes.applied_child_site_ids

  setAppliedChildSiteIds = value => {
    this.attributes.applied_child_site_ids = value
  }

  // array(int64) # IDs of child sites that this policy has been exempted from. If `skip_child_site_ids` is empty, the policy will be applied to all child sites. To apply a policy to a child site that has been exempted, remove it from `skip_child_site_ids` or set it to an empty array (`[]`).
  getSkipChildSiteIds = () => this.attributes.skip_child_site_ids

  setSkipChildSiteIds = value => {
    this.attributes.skip_child_site_ids = value
  }

  // date-time # When this policy was created.
  getCreatedAt = () => this.attributes.created_at

  // date-time # When this policy was last updated.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   value - string
  //   skip_child_site_ids - array(int64) - IDs of child sites that this policy has been exempted from. If `skip_child_site_ids` is empty, the policy will be applied to all child sites. To apply a policy to a child site that has been exempted, remove it from `skip_child_site_ids` or set it to an empty array (`[]`).
  //   policy_type - string - Type of policy.  Valid values: `settings`.
  //   name - string - Name for this policy.
  //   description - string - Description for this policy.
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

    if (params.value && !isString(params.value)) {
      throw new errors.InvalidParameterError(`Bad parameter: value must be of type String, received ${getType(params.value)}`)
    }

    if (params.skip_child_site_ids && !isArray(params.skip_child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_child_site_ids must be of type Array, received ${getType(params.skip_child_site_ids)}`)
    }

    if (params.policy_type && !isString(params.policy_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: policy_type must be of type String, received ${getType(params.policy_type)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
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
  //   value - string
  //   skip_child_site_ids - array(int64) - IDs of child sites that this policy has been exempted from. If `skip_child_site_ids` is empty, the policy will be applied to all child sites. To apply a policy to a child site that has been exempted, remove it from `skip_child_site_ids` or set it to an empty array (`[]`).
  //   policy_type (required) - string - Type of policy.  Valid values: `settings`.
  //   name - string - Name for this policy.
  //   description - string - Description for this policy.
  static create = async (params = {}, options = {}) => {
    if (!params.policy_type) {
      throw new errors.MissingParameterError('Parameter missing: policy_type')
    }

    if (params.value && !isString(params.value)) {
      throw new errors.InvalidParameterError(`Bad parameter: value must be of type String, received ${getType(params.value)}`)
    }

    if (params.skip_child_site_ids && !isArray(params.skip_child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_child_site_ids must be of type Array, received ${getType(params.skip_child_site_ids)}`)
    }

    if (params.policy_type && !isString(params.policy_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: policy_type must be of type String, received ${getType(params.policy_type)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    const response = await Api.sendRequest('/child_site_management_policies', 'POST', params, options)

    return new ChildSiteManagementPolicy(response?.data, options)
  }
}

export default ChildSiteManagementPolicy

module.exports = ChildSiteManagementPolicy
module.exports.default = ChildSiteManagementPolicy
