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
 * Class AiAssistantPersonality
 */
class AiAssistantPersonality {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # AI Assistant Personality ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # AI Assistant Personality name.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # System prompt injected into the in-app AI Assistant.
  getSystemPrompt = () => this.attributes.system_prompt

  setSystemPrompt = value => {
    this.attributes.system_prompt = value
    exposeAttributes(this, ['system_prompt'])
  }

  // boolean # Whether this personality is the default personality for the Workspace.
  getUseByDefault = () => this.attributes.use_by_default

  setUseByDefault = value => {
    this.attributes.use_by_default = value
    exposeAttributes(this, ['use_by_default'])
  }

  // boolean # If true, this default-workspace personality can apply to users in all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
    exposeAttributes(this, ['apply_to_all_workspaces'])
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   apply_to_all_workspaces - boolean - If true, this default-workspace personality can apply to users in all workspaces.
  //   name - string - AI Assistant Personality name.
  //   system_prompt - string - System prompt injected into the in-app AI Assistant.
  //   use_by_default - boolean - Whether this personality is the default personality for the Workspace.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
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

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.system_prompt !== undefined && params.system_prompt !== null && !isString(params.system_prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: system_prompt must be of type String, received ${getType(params.system_prompt)}`)
    }

    if (isArray(params.use_by_default) || isObject(params.use_by_default)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_by_default must be of type Boolean, received ${getType(params.use_by_default)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/ai_assistant_personalities/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/ai_assistant_personalities/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await AiAssistantPersonality.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/ai_assistant_personalities', 'GET', params, options)

    return response?.data?.map(obj => new AiAssistantPersonality(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    AiAssistantPersonality.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      AiAssistantPersonality.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Ai Assistant Personality ID.
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

    const response = await Api.sendRequest(`/ai_assistant_personalities/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AiAssistantPersonality(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    AiAssistantPersonality.find(id, params, options)

  // Parameters:
  //   apply_to_all_workspaces - boolean - If true, this default-workspace personality can apply to users in all workspaces.
  //   name (required) - string - AI Assistant Personality name.
  //   system_prompt (required) - string - System prompt injected into the in-app AI Assistant.
  //   use_by_default - boolean - Whether this personality is the default personality for the Workspace.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (!params.system_prompt) {
      throw new errors.MissingParameterError('Parameter missing: system_prompt')
    }

    if (isArray(params.apply_to_all_workspaces) || isObject(params.apply_to_all_workspaces)) {
      throw new errors.InvalidParameterError(`Bad parameter: apply_to_all_workspaces must be of type Boolean, received ${getType(params.apply_to_all_workspaces)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.system_prompt !== undefined && params.system_prompt !== null && !isString(params.system_prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: system_prompt must be of type String, received ${getType(params.system_prompt)}`)
    }

    if (isArray(params.use_by_default) || isObject(params.use_by_default)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_by_default must be of type Boolean, received ${getType(params.use_by_default)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/ai_assistant_personalities', 'POST', params, options)

    return new AiAssistantPersonality(response?.data, retainedOptions(options))
  }
}

export default AiAssistantPersonality

module.exports = AiAssistantPersonality
module.exports.default = AiAssistantPersonality
