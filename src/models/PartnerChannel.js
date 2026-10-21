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
 * Class PartnerChannel
 */
class PartnerChannel {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # The unique ID of the Partner Channel.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # ID of the Workspace associated with this Partner Channel.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner` enables incoming uploads.
  getDirection = () => this.attributes.direction

  setDirection = value => {
    this.attributes.direction = value
    exposeAttributes(this, ['direction'])
  }

  // boolean # Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder name overrides must be blank when enabled, and the Channel must remain one-way.
  getUseChannelRoot = () => this.attributes.use_channel_root

  setUseChannelRoot = value => {
    this.attributes.use_channel_root = value
    exposeAttributes(this, ['use_channel_root'])
  }

  // int64 # ID of the Partner this Channel belongs to.
  getPartnerId = () => this.attributes.partner_id

  setPartnerId = value => {
    this.attributes.partner_id = value
    exposeAttributes(this, ['partner_id'])
  }

  // int64 # ID of the Partner Channel Template that manages this Channel, if any.
  getPartnerChannelTemplateId = () => this.attributes.partner_channel_template_id

  setPartnerChannelTemplateId = value => {
    this.attributes.partner_channel_template_id = value
    exposeAttributes(this, ['partner_channel_template_id'])
  }

  // string # Channel path relative to the Partner root folder. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // string # Optional Channel-level to-Partner folder name override.
  getToPartnerFolderName = () => this.attributes.to_partner_folder_name

  setToPartnerFolderName = value => {
    this.attributes.to_partner_folder_name = value
    exposeAttributes(this, ['to_partner_folder_name'])
  }

  // string # Optional Channel-level from-Partner folder name override.
  getFromPartnerFolderName = () => this.attributes.from_partner_folder_name

  setFromPartnerFolderName = value => {
    this.attributes.from_partner_folder_name = value
    exposeAttributes(this, ['from_partner_folder_name'])
  }

  // string # Optional route path for files uploaded by the Partner.
  getFromPartnerRoutePath = () => this.attributes.from_partner_route_path

  setFromPartnerRoutePath = value => {
    this.attributes.from_partner_route_path = value
    exposeAttributes(this, ['from_partner_route_path'])
  }

  // string # Optional route path for files delivered to the Partner.
  getToPartnerRoutePath = () => this.attributes.to_partner_route_path

  setToPartnerRoutePath = value => {
    this.attributes.to_partner_route_path = value
    exposeAttributes(this, ['to_partner_route_path'])
  }

  // array(string) # Managed folder paths inside the to-Partner folder.
  getToPartnerManagedFolderPaths = () => this.attributes.to_partner_managed_folder_paths

  setToPartnerManagedFolderPaths = value => {
    this.attributes.to_partner_managed_folder_paths = value
    exposeAttributes(this, ['to_partner_managed_folder_paths'])
  }

  // array(string) # Managed folder paths inside the from-Partner folder.
  getFromPartnerManagedFolderPaths = () => this.attributes.from_partner_managed_folder_paths

  setFromPartnerManagedFolderPaths = value => {
    this.attributes.from_partner_managed_folder_paths = value
    exposeAttributes(this, ['from_partner_managed_folder_paths'])
  }

  // string # Resolved to-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly.
  getEffectiveToPartnerFolderName = () => this.attributes.effective_to_partner_folder_name

  setEffectiveToPartnerFolderName = value => {
    this.attributes.effective_to_partner_folder_name = value
    exposeAttributes(this, ['effective_to_partner_folder_name'])
  }

  // string # Resolved from-Partner subfolder name. Null when the direction is disabled or uses the Channel folder directly.
  getEffectiveFromPartnerFolderName = () => this.attributes.effective_from_partner_folder_name

  setEffectiveFromPartnerFolderName = value => {
    this.attributes.effective_from_partner_folder_name = value
    exposeAttributes(this, ['effective_from_partner_folder_name'])
  }

  // string # Resolved Channel folder path.
  getChannelPath = () => this.attributes.channel_path

  setChannelPath = value => {
    this.attributes.channel_path = value
    exposeAttributes(this, ['channel_path'])
  }

  // string # Resolved to-Partner folder path.
  getToPartnerFolderPath = () => this.attributes.to_partner_folder_path

  setToPartnerFolderPath = value => {
    this.attributes.to_partner_folder_path = value
    exposeAttributes(this, ['to_partner_folder_path'])
  }

  // string # Resolved from-Partner folder path.
  getFromPartnerFolderPath = () => this.attributes.from_partner_folder_path

  setFromPartnerFolderPath = value => {
    this.attributes.from_partner_folder_path = value
    exposeAttributes(this, ['from_partner_folder_path'])
  }

  // Parameters:
  //   direction - string - Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner` enables incoming uploads.
  //   use_channel_root - boolean - Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder name overrides must be blank when enabled, and the Channel must remain one-way.
  //   from_partner_folder_name - string - Optional Channel-level from-Partner folder name override.
  //   from_partner_managed_folder_paths - array(string) - Managed folder paths inside the from-Partner folder.
  //   from_partner_route_path - string - Optional route path for files uploaded by the Partner.
  //   to_partner_folder_name - string - Optional Channel-level to-Partner folder name override.
  //   to_partner_managed_folder_paths - array(string) - Managed folder paths inside the to-Partner folder.
  //   to_partner_route_path - string - Optional route path for files delivered to the Partner.
  //   path - string - Channel path relative to the Partner root folder.
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

    if (params.direction !== undefined && params.direction !== null && !isString(params.direction)) {
      throw new errors.InvalidParameterError(`Bad parameter: direction must be of type String, received ${getType(params.direction)}`)
    }

    if (isArray(params.use_channel_root) || isObject(params.use_channel_root)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_channel_root must be of type Boolean, received ${getType(params.use_channel_root)}`)
    }

    if (params.from_partner_folder_name !== undefined && params.from_partner_folder_name !== null && !isString(params.from_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_folder_name must be of type String, received ${getType(params.from_partner_folder_name)}`)
    }

    if (params.from_partner_managed_folder_paths !== undefined && params.from_partner_managed_folder_paths !== null && !isArray(params.from_partner_managed_folder_paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_managed_folder_paths must be of type Array, received ${getType(params.from_partner_managed_folder_paths)}`)
    }

    if (params.from_partner_route_path !== undefined && params.from_partner_route_path !== null && !isString(params.from_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_route_path must be of type String, received ${getType(params.from_partner_route_path)}`)
    }

    if (params.to_partner_folder_name !== undefined && params.to_partner_folder_name !== null && !isString(params.to_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_folder_name must be of type String, received ${getType(params.to_partner_folder_name)}`)
    }

    if (params.to_partner_managed_folder_paths !== undefined && params.to_partner_managed_folder_paths !== null && !isArray(params.to_partner_managed_folder_paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_managed_folder_paths must be of type Array, received ${getType(params.to_partner_managed_folder_paths)}`)
    }

    if (params.to_partner_route_path !== undefined && params.to_partner_route_path !== null && !isString(params.to_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_route_path must be of type String, received ${getType(params.to_partner_route_path)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
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

    await Api.sendRequest(`/partner_channels/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await PartnerChannel.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`, `path` or `partner_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `partner_id` and `workspace_id`. Valid field combinations are `[ workspace_id, partner_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/partner_channels', 'GET', params, options)

    return response?.data?.map(obj => new PartnerChannel(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    PartnerChannel.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      PartnerChannel.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Partner Channel ID.
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

    const response = await Api.sendRequest(`/partner_channels/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new PartnerChannel(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    PartnerChannel.find(id, params, options)

  // Parameters:
  //   direction - string - Channel directions. `two_way` enables both directions, `to_partner` enables outgoing downloads, and `from_partner` enables incoming uploads.
  //   use_channel_root - boolean - Use the Channel folder directly for a one-way exchange. Defaults to false. Cannot be changed after creation. Folder name overrides must be blank when enabled, and the Channel must remain one-way.
  //   from_partner_folder_name - string - Optional Channel-level from-Partner folder name override.
  //   from_partner_managed_folder_paths - array(string) - Managed folder paths inside the from-Partner folder.
  //   from_partner_route_path - string - Optional route path for files uploaded by the Partner.
  //   to_partner_folder_name - string - Optional Channel-level to-Partner folder name override.
  //   to_partner_managed_folder_paths - array(string) - Managed folder paths inside the to-Partner folder.
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

    if (params.direction !== undefined && params.direction !== null && !isString(params.direction)) {
      throw new errors.InvalidParameterError(`Bad parameter: direction must be of type String, received ${getType(params.direction)}`)
    }

    if (isArray(params.use_channel_root) || isObject(params.use_channel_root)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_channel_root must be of type Boolean, received ${getType(params.use_channel_root)}`)
    }

    if (params.from_partner_folder_name !== undefined && params.from_partner_folder_name !== null && !isString(params.from_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_folder_name must be of type String, received ${getType(params.from_partner_folder_name)}`)
    }

    if (params.from_partner_managed_folder_paths !== undefined && params.from_partner_managed_folder_paths !== null && !isArray(params.from_partner_managed_folder_paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_managed_folder_paths must be of type Array, received ${getType(params.from_partner_managed_folder_paths)}`)
    }

    if (params.from_partner_route_path !== undefined && params.from_partner_route_path !== null && !isString(params.from_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: from_partner_route_path must be of type String, received ${getType(params.from_partner_route_path)}`)
    }

    if (params.to_partner_folder_name !== undefined && params.to_partner_folder_name !== null && !isString(params.to_partner_folder_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_folder_name must be of type String, received ${getType(params.to_partner_folder_name)}`)
    }

    if (params.to_partner_managed_folder_paths !== undefined && params.to_partner_managed_folder_paths !== null && !isArray(params.to_partner_managed_folder_paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_managed_folder_paths must be of type Array, received ${getType(params.to_partner_managed_folder_paths)}`)
    }

    if (params.to_partner_route_path !== undefined && params.to_partner_route_path !== null && !isString(params.to_partner_route_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: to_partner_route_path must be of type String, received ${getType(params.to_partner_route_path)}`)
    }

    if (params.partner_id !== undefined && params.partner_id !== null && !isInt(params.partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partner_id must be of type Int, received ${getType(params.partner_id)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/partner_channels', 'POST', params, options)

    return new PartnerChannel(response?.data, retainedOptions(options))
  }
}

export default PartnerChannel

module.exports = PartnerChannel
module.exports.default = PartnerChannel
