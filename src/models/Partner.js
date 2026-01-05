/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Partner
 */
class Partner {
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

  // boolean # Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users.
  getAllowBypassing2faPolicies = () => this.attributes.allow_bypassing_2fa_policies

  setAllowBypassing2faPolicies = value => {
    this.attributes.allow_bypassing_2fa_policies = value
  }

  // boolean # Allow Partner Admins to change or reset credentials for users belonging to this Partner.
  getAllowCredentialChanges = () => this.attributes.allow_credential_changes

  setAllowCredentialChanges = value => {
    this.attributes.allow_credential_changes = value
  }

  // boolean # Allow Partner Admins to provide GPG keys.
  getAllowProvidingGpgKeys = () => this.attributes.allow_providing_gpg_keys

  setAllowProvidingGpgKeys = value => {
    this.attributes.allow_providing_gpg_keys = value
  }

  // boolean # Allow Partner Admins to create users.
  getAllowUserCreation = () => this.attributes.allow_user_creation

  setAllowUserCreation = value => {
    this.attributes.allow_user_creation = value
  }

  // int64 # The unique ID of the Partner.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # ID of the Workspace associated with this Partner.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # The name of the Partner.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Notes about this Partner.
  getNotes = () => this.attributes.notes

  setNotes = value => {
    this.attributes.notes = value
  }

  // array(int64) # Array of User IDs that are Partner Admins for this Partner.
  getPartnerAdminIds = () => this.attributes.partner_admin_ids

  setPartnerAdminIds = value => {
    this.attributes.partner_admin_ids = value
  }

  // string # The root folder path for this Partner.
  getRootFolder = () => this.attributes.root_folder

  setRootFolder = value => {
    this.attributes.root_folder = value
  }

  // string # Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  getTags = () => this.attributes.tags

  setTags = value => {
    this.attributes.tags = value
  }

  // array(int64) # Array of User IDs that belong to this Partner.
  getUserIds = () => this.attributes.user_ids

  setUserIds = value => {
    this.attributes.user_ids = value
  }

  // Parameters:
  //   allow_bypassing_2fa_policies - boolean - Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users.
  //   allow_credential_changes - boolean - Allow Partner Admins to change or reset credentials for users belonging to this Partner.
  //   allow_providing_gpg_keys - boolean - Allow Partner Admins to provide GPG keys.
  //   allow_user_creation - boolean - Allow Partner Admins to create users.
  //   notes - string - Notes about this Partner.
  //   root_folder - string - The root folder path for this Partner.
  //   tags - string - Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  //   name - string - The name of the Partner.
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

    if (params.notes && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (params.root_folder && !isString(params.root_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: root_folder must be of type String, received ${getType(params.root_folder)}`)
    }

    if (params.tags && !isString(params.tags)) {
      throw new errors.InvalidParameterError(`Bad parameter: tags must be of type String, received ${getType(params.tags)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/partners/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new Partner(response?.data, this.options)
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

    await Api.sendRequest(`/partners/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await Partner.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `name`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partners', 'GET', params, options)

    return response?.data?.map(obj => new Partner(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Partner.list(params, options)

  // Parameters:
  //   id (required) - int64 - Partner ID.
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

    const response = await Api.sendRequest(`/partners/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Partner(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Partner.find(id, params, options)

  // Parameters:
  //   allow_bypassing_2fa_policies - boolean - Allow Partner Admins to change Two-Factor Authentication requirements for Partner Users.
  //   allow_credential_changes - boolean - Allow Partner Admins to change or reset credentials for users belonging to this Partner.
  //   allow_providing_gpg_keys - boolean - Allow Partner Admins to provide GPG keys.
  //   allow_user_creation - boolean - Allow Partner Admins to create users.
  //   notes - string - Notes about this Partner.
  //   root_folder - string - The root folder path for this Partner.
  //   tags - string - Comma-separated list of Tags for this Partner. Tags are used for other features, such as UserLifecycleRules, which can target specific tags.  Tags must only contain lowercase letters, numbers, and hyphens.
  //   name (required) - string - The name of the Partner.
  //   workspace_id - int64 - ID of the Workspace associated with this Partner.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.notes && !isString(params.notes)) {
      throw new errors.InvalidParameterError(`Bad parameter: notes must be of type String, received ${getType(params.notes)}`)
    }

    if (params.root_folder && !isString(params.root_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: root_folder must be of type String, received ${getType(params.root_folder)}`)
    }

    if (params.tags && !isString(params.tags)) {
      throw new errors.InvalidParameterError(`Bad parameter: tags must be of type String, received ${getType(params.tags)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/partners', 'POST', params, options)

    return new Partner(response?.data, options)
  }
}

export default Partner

module.exports = Partner
module.exports.default = Partner
