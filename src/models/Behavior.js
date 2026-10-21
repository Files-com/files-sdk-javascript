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
 * Class Behavior
 */
class Behavior {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Folder behavior ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Folder path.  Note that Behavior paths cannot be updated once initially set.  You will need to remove and re-create the behavior on the new path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // string # URL for attached file
  getAttachmentUrl = () => this.attributes.attachment_url

  setAttachmentUrl = value => {
    this.attributes.attachment_url = value
    exposeAttributes(this, ['attachment_url'])
  }

  // string # Behavior type.
  getBehavior = () => this.attributes.behavior

  setBehavior = value => {
    this.attributes.behavior = value
    exposeAttributes(this, ['behavior'])
  }

  // string # Name for this behavior.
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
    exposeAttributes(this, ['name'])
  }

  // string # Description for this behavior.
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // object # Settings for this behavior.  See the section above for an example value to provide here.  Formatting is different for each Behavior type.  May be sent as nested JSON or a single JSON-encoded string.  If using XML encoding for the API call, this data must be sent as a JSON-encoded string.
  getValue = () => this.attributes.value

  setValue = value => {
    this.attributes.value = value
    exposeAttributes(this, ['value'])
  }

  // string # Public URL for this publicly hosted folder when the `Serve Publicly` behavior has a key configured. When a Custom Domain with `public_hosting` destination is attached to this behavior, the URL uses that domain. Otherwise it uses the site's `subdomain.hosted-by-files.com` host, unless `custom_domain_only` is enabled, in which case no URL is returned.
  getPublicHostingUrl = () => this.attributes.public_hosting_url

  setPublicHostingUrl = value => {
    this.attributes.public_hosting_url = value
    exposeAttributes(this, ['public_hosting_url'])
  }

  // boolean # If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that child folders may override, and requires recursive to be true. Rejected for all other behavior types.
  getDisableParentFolderBehavior = () => this.attributes.disable_parent_folder_behavior

  setDisableParentFolderBehavior = value => {
    this.attributes.disable_parent_folder_behavior = value
    exposeAttributes(this, ['disable_parent_folder_behavior'])
  }

  // boolean # Whether this behavior is recursive for this record. `always` behaviors are always `true`, `never` behaviors are always `false`, and `sometimes` behaviors may be either value.
  getRecursive = () => this.attributes.recursive

  setRecursive = value => {
    this.attributes.recursive = value
    exposeAttributes(this, ['recursive'])
  }

  // boolean # If true, this behavior is inherited from a higher scope rather than owned by the requested workspace.
  getInherited = () => this.attributes.inherited

  setInherited = value => {
    this.attributes.inherited = value
    exposeAttributes(this, ['inherited'])
  }

  // boolean # If true, this behavior is controlled by a parent-site policy and cannot be modified locally.
  getManaged = () => this.attributes.managed

  setManaged = value => {
    this.attributes.managed = value
    exposeAttributes(this, ['managed'])
  }

  // boolean # If true, this behavior may only be modified by a site admin because it is at the site root or disables a root behavior.
  getRootBehaviorSiteAdminOnly = () => this.attributes.root_behavior_site_admin_only

  setRootBehaviorSiteAdminOnly = value => {
    this.attributes.root_behavior_site_admin_only = value
    exposeAttributes(this, ['root_behavior_site_admin_only'])
  }

  // file # Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach that file here.
  getAttachmentFile = () => this.attributes.attachment_file

  setAttachmentFile = value => {
    this.attributes.attachment_file = value
    exposeAttributes(this, ['attachment_file'])
  }

  // boolean # If `true`, delete the file stored in `attachment`.
  getAttachmentDelete = () => this.attributes.attachment_delete

  setAttachmentDelete = value => {
    this.attributes.attachment_delete = value
    exposeAttributes(this, ['attachment_delete'])
  }

  // Parameters:
  //   value - object - This field stores data specific to the type of behavior. See The Behavior Types section for the accepted value for each type of behavior.
  //   attachment_file - file - Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach that file here.
  //   disable_parent_folder_behavior - boolean - If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that child folders may override, and requires recursive to be true. Rejected for all other behavior types.
  //   recursive - boolean - Whether the behavior should apply to child folders. This is only configurable for behavior types whose recursion mode is `sometimes`; `always` behaviors stay recursive and `never` behaviors stay non-recursive.
  //   name - string - Name for this behavior.
  //   description - string - Description for this behavior.
  //   attachment_delete - boolean - If `true`, delete the file stored in `attachment`.
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

    if (isArray(params.disable_parent_folder_behavior) || isObject(params.disable_parent_folder_behavior)) {
      throw new errors.InvalidParameterError(`Bad parameter: disable_parent_folder_behavior must be of type Boolean, received ${getType(params.disable_parent_folder_behavior)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (isArray(params.attachment_delete) || isObject(params.attachment_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: attachment_delete must be of type Boolean, received ${getType(params.attachment_delete)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/behaviors/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/behaviors/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Behavior.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `behavior`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `clickwrap_id`, `form_field_set_id`, `impacts_ui`, `remote_server_id` or `behavior`. Valid field combinations are `[ impacts_ui, behavior ]` and `[ behavior, remote_server_id ]`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/behaviors', 'GET', params, options)

    return response?.data?.map(obj => new Behavior(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Behavior.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Behavior.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Behavior ID.
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

    const response = await Api.sendRequest(`/behaviors/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Behavior(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Behavior.find(id, params, options)

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `behavior`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `impacts_ui` and `behavior`. Valid field combinations are `[ impacts_ui, behavior ]`.
  //   path (required) - string - Path to operate on.
  //   ancestor_behaviors - boolean - If `true`, behaviors above this path are shown.
  static listFor = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.ancestor_behaviors) || isObject(params.ancestor_behaviors)) {
      throw new errors.InvalidParameterError(`Bad parameter: ancestor_behaviors must be of type Boolean, received ${getType(params.ancestor_behaviors)}`)
    }

    const response = await Api.sendRequest(`/behaviors/folders/${encodeURIComponent(params.path)}`, 'GET', params, options)

    return response?.data?.map(obj => new Behavior(obj, retainedOptions(options))) || []
  }

  // The items listFor() lists, one at a time: an async iterator that requests each page
  // through listFor() only once the items before it have been taken (see Api._iterate).
  static listForIterator = (path, params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Behavior.listFor(path, pageParams, pageOptions))

  // Parameters:
  //   value - object - This field stores data specific to the type of behavior. See The Behavior Types section for the accepted value for each type of behavior.
  //   attachment_file - file - Certain behaviors may require a file, for instance, the `watermark` behavior requires a watermark image. Attach that file here.
  //   disable_parent_folder_behavior - boolean - If true, disables the inherited behavior for this folder and its children. Valid only for behavior types that child folders may override, and requires recursive to be true. Rejected for all other behavior types.
  //   recursive - boolean - Whether the behavior should apply to child folders. This is only configurable for behavior types whose recursion mode is `sometimes`; `always` behaviors stay recursive and `never` behaviors stay non-recursive.
  //   name - string - Name for this behavior.
  //   description - string - Description for this behavior.
  //   path (required) - string - Path where this behavior should apply.
  //   behavior (required) - string - Behavior type.
  static create = async (params = {}, options = {}) => {
    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (!params.behavior) {
      throw new errors.MissingParameterError('Parameter missing: behavior')
    }

    if (isArray(params.disable_parent_folder_behavior) || isObject(params.disable_parent_folder_behavior)) {
      throw new errors.InvalidParameterError(`Bad parameter: disable_parent_folder_behavior must be of type Boolean, received ${getType(params.disable_parent_folder_behavior)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (params.name !== undefined && params.name !== null && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.behavior !== undefined && params.behavior !== null && !isString(params.behavior)) {
      throw new errors.InvalidParameterError(`Bad parameter: behavior must be of type String, received ${getType(params.behavior)}`)
    }

    const response = await Api.sendRequest('/behaviors', 'POST', params, options)

    return new Behavior(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   url (required) - string - URL for testing the webhook.
  //   method - string - HTTP request method (GET or POST).
  //   encoding - string - Encoding type for the webhook payload. Can be JSON, XML, or RAW (form data).
  //   headers - object - Additional request headers to send via HTTP.
  //   body - object - Additional body parameters to include in the webhook payload.
  //   action - string - Action for test body.
  static webhookTest = async (params = {}, options = {}) => {
    if (!params.url) {
      throw new errors.MissingParameterError('Parameter missing: url')
    }

    if (params.url !== undefined && params.url !== null && !isString(params.url)) {
      throw new errors.InvalidParameterError(`Bad parameter: url must be of type String, received ${getType(params.url)}`)
    }

    if (params.method !== undefined && params.method !== null && !isString(params.method)) {
      throw new errors.InvalidParameterError(`Bad parameter: method must be of type String, received ${getType(params.method)}`)
    }

    if (params.encoding !== undefined && params.encoding !== null && !isString(params.encoding)) {
      throw new errors.InvalidParameterError(`Bad parameter: encoding must be of type String, received ${getType(params.encoding)}`)
    }

    if (params.action !== undefined && params.action !== null && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    await Api.sendRequest('/behaviors/webhook/test', 'POST', params, options)
  }
}

export default Behavior

module.exports = Behavior
module.exports.default = Behavior
