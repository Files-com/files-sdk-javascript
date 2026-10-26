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
 * Class ApiKey
 */
class ApiKey {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # API Key ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Unique label that describes this API key.  Useful for external systems where you may have API keys from multiple accounts and want a human-readable label for each key.
  getDescriptiveLabel = () => this.attributes.descriptive_label

  setDescriptiveLabel = value => {
    this.attributes.descriptive_label = value
    exposeAttributes(this, ['descriptive_label'])
  }

  // string # User-supplied description of API key.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // date-time # Time which API Key was created
  getCreatedAt = () => this.attributes.created_at

  // date-time # API Key expiration date
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
    exposeAttributes(this, ['expires_at'])
  }

  // string # API Key actual key string
  getKey = () => this.attributes.key

  setKey = value => {
    this.attributes.key = value
    exposeAttributes(this, ['key'])
  }

  // boolean # If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  getAwsStyleCredentials = () => this.attributes.aws_style_credentials

  setAwsStyleCredentials = value => {
    this.attributes.aws_style_credentials = value
    exposeAttributes(this, ['aws_style_credentials'])
  }

  // string # AWS Access Key ID to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  getAwsAccessKeyId = () => this.attributes.aws_access_key_id

  setAwsAccessKeyId = value => {
    this.attributes.aws_access_key_id = value
    exposeAttributes(this, ['aws_access_key_id'])
  }

  // string # AWS Secret Key to use with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  getAwsSecretKey = () => this.attributes.aws_secret_key

  setAwsSecretKey = value => {
    this.attributes.aws_secret_key = value
    exposeAttributes(this, ['aws_secret_key'])
  }

  // date-time # API Key last used - note this value is only updated once per 3 hour period, so the 'actual' time of last use may be up to 3 hours later than this timestamp.
  getLastUseAt = () => this.attributes.last_use_at

  setLastUseAt = value => {
    this.attributes.last_use_at = value
    exposeAttributes(this, ['last_use_at'])
  }

  // string # Internal name for the API Key.  For your use.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user. Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
  getPermissionSet = () => this.attributes.permission_set

  setPermissionSet = value => {
    this.attributes.permission_set = value
    exposeAttributes(this, ['permission_set'])
  }

  // string # If this API key represents a Desktop app, what platform was it created on?
  getPlatform = () => this.attributes.platform

  setPlatform = value => {
    this.attributes.platform = value
    exposeAttributes(this, ['platform'])
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
    exposeAttributes(this, ['site_id'])
  }

  // string # Site Name
  getSiteName = () => this.attributes.site_name

  setSiteName = value => {
    this.attributes.site_name = value
    exposeAttributes(this, ['site_name'])
  }

  // string # URL for API host.
  getUrl = () => this.attributes.url

  setUrl = value => {
    this.attributes.url = value
    exposeAttributes(this, ['url'])
  }

  // int64 # User ID for the owner of this API Key.  May be blank for Site-wide API Keys.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // int64 # Workspace ID for this API Key. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // string # Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET /file_migrations/{id}`, a key with a path can read only migrations it started. Does not grant access beyond the owning user's permissions. Optional for `files_only` keys and required for `office_integration` keys, which need a path the owning user can read. Keys with any other permission set cannot have a path.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // Parameters:
  //   description - string - User-supplied description of API key.
  //   expires_at - string - API Key expiration date
  //   name - string - Internal name for the API Key.  For your use.
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

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.expires_at !== undefined && params.expires_at !== null && !isString(params.expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params.expires_at)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/api_keys/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/api_keys/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await ApiKey.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `site_id` and `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `aws_style_credentials` and `expires_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `expires_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `expires_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `expires_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `expires_at`.
  static list = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/api_keys', 'GET', params, options)

    return response?.data?.map(obj => new ApiKey(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    ApiKey.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      ApiKey.list(pageParams, pageOptions))

  static findCurrent = async (options = {}) => {
    const response = await Api.sendRequest('/api_key', 'GET', {}, options)

    return new ApiKey(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   id (required) - int64 - Api Key ID.
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

    const response = await Api.sendRequest(`/api_keys/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new ApiKey(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    ApiKey.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   description - string - User-supplied description of API key.
  //   expires_at - string - API Key expiration date
  //   name (required) - string - Internal name for the API Key.  For your use.
  //   aws_style_credentials - boolean - If `true`, this API key will be usable with AWS-compatible endpoints, such as our Inbound S3-compatible endpoint.
  //   path - string - Restricts the file and folder operations made with this key, meaning the files, folders, and file_actions endpoints, to the specified folder and its descendants, including copy and move destinations. For `GET /file_migrations/{id}`, a key with a path can read only migrations it started. Does not grant access beyond the owning user's permissions. Optional for `files_only` keys and required for `office_integration` keys, which need a path the owning user can read. Keys with any other permission set cannot have a path.
  //   permission_set - string - Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user. Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
  //   workspace_id - int64 - Workspace ID for this API Key. `0` means the default workspace.
  static create = async (params = {}, options = {}) => {
    if (!params.name) {
      throw new errors.MissingParameterError('Parameter missing: name')
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.expires_at !== undefined && params.expires_at !== null && !isString(params.expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params.expires_at)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (isArray(params.aws_style_credentials) || isObject(params.aws_style_credentials)) {
      throw new errors.InvalidParameterError(`Bad parameter: aws_style_credentials must be of type Boolean, received ${getType(params.aws_style_credentials)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.permission_set !== undefined && params.permission_set !== null && !isString(params.permission_set)) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(params.permission_set)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/api_keys', 'POST', params, options)

    return new ApiKey(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   expires_at - string - API Key expiration date
  //   name - string - Internal name for the API Key.  For your use.
  //   permission_set - string - Permissions for this API Key. Keys with the `desktop_app` permission set only have the ability to do the functions provided in our Desktop App (File and Share Link operations). Keys with the `mobile_app` permission set can only perform the functions provided by our Mobile App (File and Share Link operations). Keys with the `office_integration` permission set are auto generated, and automatically expire, to allow users to interact with office integration platforms. Keys with the `files_only` permission set can use only the files, folders, and file_actions endpoints, excluding the GPG Encrypt and GPG Decrypt file actions, where they perform file operations as a full-access file user in the key's workspace scope, along with `GET /file_migrations/{id}` and `GET /api_key`. On the migration lookup, any key with a `path` can read only migrations it started. Without a `path`, user-owned keys retain user-scoped access; site-wide Workspace-bound keys can read only migrations whose source and destination are both in their Workspace. Every `files_only` key is Workspace-bound, including Workspace `0`, as is a full-access key in a named Workspace. A full-access site-wide key in the default Workspace retains Site-wide migration access. Migrations outside the caller's visibility return `not-found`. Keys with `files_only` cannot use site admin, workspace admin, folder admin, group admin, partner admin, or billing privileges from the owning user. Both GPG file actions and every other endpoint deny them with `not-authorized/api-key-only-for-file-operations`. Folder-configured GPG encryption and decryption still apply to files uploaded with a `files_only` key.
  static updateCurrent = async (params = {}, options = {}) => {
    if (params.expires_at !== undefined && params.expires_at !== null && !isString(params.expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params.expires_at)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.permission_set !== undefined && params.permission_set !== null && !isString(params.permission_set)) {
      throw new errors.InvalidParameterError(`Bad parameter: permission_set must be of type String, received ${getType(params.permission_set)}`)
    }

    const response = await Api.sendRequest('/api_key', 'PATCH', params, options)

    return new ApiKey(response?.data, retainedOptions(options))
  }

  static deleteCurrent = async (options = {}) => {
    await Api.sendRequest('/api_key', 'DELETE', {}, options)
  }
}

export default ApiKey

module.exports = ApiKey
module.exports.default = ApiKey
