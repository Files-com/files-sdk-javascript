/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class AiAssistantPersonality
 */
class AiAssistantPersonality {
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

  // int64 # AI Assistant Personality ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
  }

  // string # System prompt injected into the in-app AI Assistant.
  getSystemPrompt = () => this.attributes.system_prompt

  setSystemPrompt = value => {
    this.attributes.system_prompt = value
  }

  // boolean # Whether this personality is the default personality for the Workspace.
  getUseByDefault = () => this.attributes.use_by_default

  setUseByDefault = value => {
    this.attributes.use_by_default = value
  }

  // boolean # If true, this default-workspace personality can apply to users in all workspaces.
  getApplyToAllWorkspaces = () => this.attributes.apply_to_all_workspaces

  setApplyToAllWorkspaces = value => {
    this.attributes.apply_to_all_workspaces = value
  }

  // date-time # Creation time.
  getCreatedAt = () => this.attributes.created_at

  // date-time # Last update time.
  getUpdatedAt = () => this.attributes.updated_at

  // Parameters:
  //   apply_to_all_workspaces - boolean - If true, this default-workspace personality can apply to users in all workspaces.
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

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.system_prompt && !isString(params.system_prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: system_prompt must be of type String, received ${getType(params.system_prompt)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
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

    return new AiAssistantPersonality(response?.data, this.options)
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

    await Api.sendRequest(`/ai_assistant_personalities/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await AiAssistantPersonality.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id` and `id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/ai_assistant_personalities', 'GET', params, options)

    return response?.data?.map(obj => new AiAssistantPersonality(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    AiAssistantPersonality.list(params, options)

  // Parameters:
  //   id (required) - int64 - Ai Assistant Personality ID.
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

    const response = await Api.sendRequest(`/ai_assistant_personalities/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new AiAssistantPersonality(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    AiAssistantPersonality.find(id, params, options)

  // Parameters:
  //   apply_to_all_workspaces - boolean - If true, this default-workspace personality can apply to users in all workspaces.
  //   system_prompt (required) - string - System prompt injected into the in-app AI Assistant.
  //   use_by_default - boolean - Whether this personality is the default personality for the Workspace.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (!params.system_prompt) {
      throw new errors.MissingParameterError('Parameter missing: system_prompt')
    }

    if (params.system_prompt && !isString(params.system_prompt)) {
      throw new errors.InvalidParameterError(`Bad parameter: system_prompt must be of type String, received ${getType(params.system_prompt)}`)
    }

    if (params.workspace_id && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/ai_assistant_personalities', 'POST', params, options)

    return new AiAssistantPersonality(response?.data, options)
  }
}

export default AiAssistantPersonality

module.exports = AiAssistantPersonality
module.exports.default = AiAssistantPersonality
