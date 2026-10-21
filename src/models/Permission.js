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
 * Class Permission
 */
class Permission {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Permission ID
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

  // int64 # User ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // string # Username (if applicable)
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
    exposeAttributes(this, ['username'])
  }

  // int64 # Group ID
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
    exposeAttributes(this, ['group_id'])
  }

  // string # Group name (if applicable)
  getGroupName = () => this.attributes.group_name

  setGroupName = value => {
    this.attributes.group_name = value
    exposeAttributes(this, ['group_name'])
  }

  // array(int64) # Group IDs when this Permission requires membership in every listed group.
  getGroupIds = () => this.attributes.group_ids

  setGroupIds = value => {
    this.attributes.group_ids = value
    exposeAttributes(this, ['group_ids'])
  }

  // array(string) # Group names when this permission requires multiple groups
  getGroupNames = () => this.attributes.group_names

  setGroupNames = value => {
    this.attributes.group_names = value
    exposeAttributes(this, ['group_names'])
  }

  // int64 # Partner ID (if applicable)
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
    exposeAttributes(this, ['partner_id'])
  }

  // string # Partner name (if applicable)
  getPartnerName = () => this.attributes.partner_name

  setPartnerName = value => {
    this.attributes.partner_name = value
    exposeAttributes(this, ['partner_name'])
  }

  // string # Permission type.  See the table referenced in the documentation for an explanation of each permission.
  getPermission = () => this.attributes.permission

  setPermission = value => {
    this.attributes.permission = value
    exposeAttributes(this, ['permission'])
  }

  // boolean # Whether this Permission applies to subfolders. Must be true for `admin` Permissions.
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
    exposeAttributes(this, ['recursive'])
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
    exposeAttributes(this, ['site_id'])
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

    await Api.sendRequest(`/permissions/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The Permission object doesn\'t support updates.')
    } else {
      const newObject = await Permission.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id`, `group_id`, `path`, `user_id`, `partner_id` or `id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `path`, `group_id`, `partner_id` or `user_id`. Valid field combinations are `[ group_id, path ]`, `[ partner_id, path ]`, `[ user_id, path ]`, `[ user_id, group_id ]`, `[ user_id, group_id, path ]`, `[ user_id, group_id, partner_id ]` or `[ user_id, group_id, partner_id, path ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `path`.
  //   path - string - Permission path.  If provided, will scope all permissions(including upward) to this path.
  //   include_groups - boolean - If searching by user or group, also include user's permissions that are inherited from its groups?
  //   group_id - string
  //   partner_id - string
  //   user_id - string
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.include_groups) || isObject(params.include_groups)) {
      throw new errors.InvalidParameterError(`Bad parameter: include_groups must be of type Boolean, received ${getType(params.include_groups)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isString(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type String, received ${getType(params.group_id)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isString(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type String, received ${getType(params.partner_id)}`)
    }

    if (params.user_id !== undefined && params.user_id !== null && !isString(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type String, received ${getType(params.user_id)}`)
    }

    const response = await Api.sendRequest('/permissions', 'GET', params, options)

    return response?.data?.map(obj => new Permission(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Permission.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Permission.list(pageParams, pageOptions))

  // Parameters:
  //   path (required) - string - Folder path
  //   group_id - int64 - Group ID. Provide `group_name` or `group_id`
  //   group_ids - string - Group IDs when the Permission requires membership in every listed group. If sent as a string, it should be comma-delimited.
  //   permission - string - Permission type.  Can be `admin`, `full`, `readonly`, `writeonly`, `list`, or `history`
  //   recursive - boolean - Apply to subfolders recursively? Must be true for `admin` Permissions.
  //   partner_id - int64 - Partner ID if this Permission belongs to a partner.
  //   user_id - int64 - User ID.  Provide `username` or `user_id`
  //   username - string - User username.  Provide `username` or `user_id`
  //   group_name - string - Group name.  Provide `group_name` or `group_id`
  //   site_id - int64 - Site ID. If not provided, will default to current site. Used when creating a permission for a child site.
  static create = async (params = {}, options = {}) => {
    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.group_ids !== undefined && params.group_ids !== null && !isString(params.group_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_ids must be of type String, received ${getType(params.group_ids)}`)
    }

    if (params.permission !== undefined && params.permission !== null && !isString(params.permission)) {
      throw new errors.InvalidParameterError(`Bad parameter: permission must be of type String, received ${getType(params.permission)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.username !== undefined && params.username !== null && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.group_name !== undefined && params.group_name !== null && !isString(params.group_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_name must be of type String, received ${getType(params.group_name)}`)
    }

    if (params.site_id !== undefined && params.site_id !== null && !isInt(params.site_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: site_id must be of type Int, received ${getType(params.site_id)}`)
    }

    const response = await Api.sendRequest('/permissions', 'POST', params, options)

    return new Permission(response?.data, retainedOptions(options))
  }
}

export default Permission

module.exports = Permission
module.exports.default = Permission
