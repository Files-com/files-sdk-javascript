/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class PartnerChannel
 */
class PartnerChannel {
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

  // int64 # The unique ID of the Partner Channel.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # ID of the Workspace associated with this Partner Channel.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // int64 # ID of the Partner this Channel belongs to.
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
  }

  // string # Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # Optional Channel-level to-Partner folder name override.
  getToPartnerFolderName = () => this.attributes.to_partner_folder_name

  setToPartnerFolderName = value => {
    this.attributes.to_partner_folder_name = value
  }

  // string # Optional Channel-level from-Partner folder name override.
  getFromPartnerFolderName = () => this.attributes.from_partner_folder_name

  setFromPartnerFolderName = value => {
    this.attributes.from_partner_folder_name = value
  }

  // string # Optional route path for files uploaded by the Partner.
  getFromPartnerRoutePath = () => this.attributes.from_partner_route_path

  setFromPartnerRoutePath = value => {
    this.attributes.from_partner_route_path = value
  }

  // string # Optional route path for files delivered to the Partner.
  getToPartnerRoutePath = () => this.attributes.to_partner_route_path

  setToPartnerRoutePath = value => {
    this.attributes.to_partner_route_path = value
  }

  // string # Resolved to-Partner folder name after Channel override and default.
  getEffectiveToPartnerFolderName = () => this.attributes.effective_to_partner_folder_name

  setEffectiveToPartnerFolderName = value => {
    this.attributes.effective_to_partner_folder_name = value
  }

  // string # Resolved from-Partner folder name after Channel override and default.
  getEffectiveFromPartnerFolderName = () => this.attributes.effective_from_partner_folder_name

  setEffectiveFromPartnerFolderName = value => {
    this.attributes.effective_from_partner_folder_name = value
  }

  // string # Resolved Channel folder path.
  getChannelPath = () => this.attributes.channel_path

  setChannelPath = value => {
    this.attributes.channel_path = value
  }

  // string # Resolved to-Partner folder path.
  getToPartnerFolderPath = () => this.attributes.to_partner_folder_path

  setToPartnerFolderPath = value => {
    this.attributes.to_partner_folder_path = value
  }

  // string # Resolved from-Partner folder path.
  getFromPartnerFolderPath = () => this.attributes.from_partner_folder_path

  setFromPartnerFolderPath = value => {
    this.attributes.from_partner_folder_path = value
  }

  // Parameters:
  //   from_partner_folder_name - string - Optional Channel-level from-Partner folder name override.
  //   from_partner_route_path - string - Optional route path for files uploaded by the Partner.
  //   to_partner_folder_name - string - Optional Channel-level to-Partner folder name override.
  //   to_partner_route_path - string - Optional route path for files delivered to the Partner.
  //   path - string - Channel path relative to the Partner root folder.
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

    if (params.from_partner_folder_name && !isString(params.from_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_folder_name must be of type String, received ${getType(params.from_partner_folder_name)}`)
    }

    if (params.from_partner_route_path && !isString(params.from_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_route_path must be of type String, received ${getType(params.from_partner_route_path)}`)
    }

    if (params.to_partner_folder_name && !isString(params.to_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_folder_name must be of type String, received ${getType(params.to_partner_folder_name)}`)
    }

    if (params.to_partner_route_path && !isString(params.to_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_route_path must be of type String, received ${getType(params.to_partner_route_path)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/partner_channels/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new PartnerChannel(response?.data, this.options)
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

    await Api.sendRequest(`/partner_channels/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await PartnerChannel.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `path` or `partner_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `partner_id` and `workspace_id`. Valid field combinations are `[ workspace_id, partner_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partner_channels', 'GET', params, options)

    return response?.data?.map(obj => new PartnerChannel(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    PartnerChannel.list(params, options)

  // Parameters:
  //   id (required) - int64 - Partner Channel ID.
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

    const response = await Api.sendRequest(`/partner_channels/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new PartnerChannel(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    PartnerChannel.find(id, params, options)

  // Parameters:
  //   from_partner_folder_name - string - Optional Channel-level from-Partner folder name override.
  //   from_partner_route_path - string - Optional route path for files uploaded by the Partner.
  //   to_partner_folder_name - string - Optional Channel-level to-Partner folder name override.
  //   to_partner_route_path - string - Optional route path for files delivered to the Partner.
  //   partner_id (required) - int64 - ID of the Partner this Channel belongs to.
  //   path (required) - string - Channel path relative to the Partner root folder.
  //   workspace_id - int64 - ID of the Workspace associated with this Partner Channel.
  static create = async (params = {}, options = {}) => {
    if (!params.partner_id) {
      throw new errors.MissingParameterError('Parameter missing: partner_id')
    }

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.from_partner_folder_name && !isString(params.from_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_folder_name must be of type String, received ${getType(params.from_partner_folder_name)}`)
    }

    if (params.from_partner_route_path && !isString(params.from_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_route_path must be of type String, received ${getType(params.from_partner_route_path)}`)
    }

    if (params.to_partner_folder_name && !isString(params.to_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_folder_name must be of type String, received ${getType(params.to_partner_folder_name)}`)
    }

    if (params.to_partner_route_path && !isString(params.to_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_route_path must be of type String, received ${getType(params.to_partner_route_path)}`)
    }

    if (params.partner_id && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/partner_channels', 'POST', params, options)

    return new PartnerChannel(response?.data, options)
  }
}

export default PartnerChannel

module.exports = PartnerChannel
module.exports.default = PartnerChannel
