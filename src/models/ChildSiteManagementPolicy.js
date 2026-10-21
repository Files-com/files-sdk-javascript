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
 * Class ChildSiteManagementPolicy
 */
class ChildSiteManagementPolicy {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Policy ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Type of policy.  Valid values: `settings`.
  getPolicyType = () => this.attributes.policy_type

  setPolicyType = value => {
    this.attributes.policy_type = value
    exposeAttributes(this, ['policy_type'])
  }

  // string # Name for this policy.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Description for this policy.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // object # Policy configuration data. On a Child Site, contains only managed setting names with null values. Settings policies accept site settings plus an optional `folder_behaviors` array for parent-managed root behaviors on child sites. For more information, refer to the Value Hash section of the developer documentation.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
    exposeAttributes(this, ['value'])
  }

  // array(int64) # IDs of child sites that this policy has been applied to. This field is read-only.
  getAppliedChildSiteIds = () => this.attributes.applied_child_site_ids

  setAppliedChildSiteIds = value => {
    this.attributes.applied_child_site_ids = value
    exposeAttributes(this, ['applied_child_site_ids'])
  }

  // array(int64) # IDs of child sites excluded from this default policy.
  getSkipChildSiteIds = () => this.attributes.skip_child_site_ids

  setSkipChildSiteIds = value => {
    this.attributes.skip_child_site_ids = value
    exposeAttributes(this, ['skip_child_site_ids'])
  }

  // array(int64) # IDs of child sites explicitly assigned to this non-default policy.
  getChildSiteIds = () => this.attributes.child_site_ids

  setChildSiteIds = value => {
    this.attributes.child_site_ids = value
    exposeAttributes(this, ['child_site_ids'])
  }

  // boolean # Whether this policy applies to child sites not explicitly assigned to another policy.
  getDefaultPolicy = () => this.attributes.default_policy

  setDefaultPolicy = value => {
    this.attributes.default_policy = value
    exposeAttributes(this, ['default_policy'])
  }

  // date-time # When this policy was created.
  getCreatedAt = () => this.attributes.created_at

  // date-time # When this policy was last updated.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   value - object - Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash section of the developer documentation.
  //   skip_child_site_ids - array(int64) - IDs of child sites excluded from this default policy.
  //   child_site_ids - array(int64) - IDs of child sites explicitly assigned to this non-default policy.
  //   default_policy - boolean - Whether this policy applies to child sites not explicitly assigned to another policy.
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.skip_child_site_ids !== undefined && params.skip_child_site_ids !== null && !isArray(params.skip_child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_child_site_ids must be of type Array, received ${getType(params.skip_child_site_ids)}`)
    }

    if (params.child_site_ids !== undefined && params.child_site_ids !== null && !isArray(params.child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: child_site_ids must be of type Array, received ${getType(params.child_site_ids)}`)
    }

    if (isArray(params.default_policy) || isObject(params.default_policy)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_policy must be of type Boolean, received ${getType(params.default_policy)}`)
    }

    if (params.policy_type !== undefined && params.policy_type !== null && !isString(params.policy_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: policy_type must be of type String, received ${getType(params.policy_type)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
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

    await Api.sendRequest(`/child_site_management_policies/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await ChildSiteManagementPolicy.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/child_site_management_policies', 'GET', params, options)

    return response?.data?.map(obj => new ChildSiteManagementPolicy(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ChildSiteManagementPolicy.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ChildSiteManagementPolicy.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Child Site Management Policy ID.
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

    const response = await Api.sendRequest(`/child_site_management_policies/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ChildSiteManagementPolicy(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ChildSiteManagementPolicy.find(id, params, options)

  // Parameters:
  //   value - object - Policy configuration data. Attributes differ by policy type. For more information, refer to the Value Hash section of the developer documentation.
  //   skip_child_site_ids - array(int64) - IDs of child sites excluded from this default policy.
  //   child_site_ids - array(int64) - IDs of child sites explicitly assigned to this non-default policy.
  //   default_policy - boolean - Whether this policy applies to child sites not explicitly assigned to another policy.
  //   policy_type (required) - string - Type of policy.  Valid values: `settings`.
  //   name - string - Name for this policy.
  //   description - string - Description for this policy.
  static create = async (params = {}, options = {}) => {
    if (!params.policy_type) {
      throw new errors.MissingParameterError('Parameter missing: policy_type')
    }

    if (params.skip_child_site_ids !== undefined && params.skip_child_site_ids !== null && !isArray(params.skip_child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_child_site_ids must be of type Array, received ${getType(params.skip_child_site_ids)}`)
    }

    if (params.child_site_ids !== undefined && params.child_site_ids !== null && !isArray(params.child_site_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: child_site_ids must be of type Array, received ${getType(params.child_site_ids)}`)
    }

    if (isArray(params.default_policy) || isObject(params.default_policy)) {
      throw new errors.InvalidParameterError(`Bad parameter: default_policy must be of type Boolean, received ${getType(params.default_policy)}`)
    }

    if (params.policy_type !== undefined && params.policy_type !== null && !isString(params.policy_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: policy_type must be of type String, received ${getType(params.policy_type)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    const response = await Api.sendRequest('/child_site_management_policies', 'POST', params, options)

    return new ChildSiteManagementPolicy(response?.data, retainedOptions(options))
  }
}

export default ChildSiteManagementPolicy

module.exports = ChildSiteManagementPolicy
module.exports.default = ChildSiteManagementPolicy
