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
 * Class Folder
 */
class Folder {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.path

  // string # File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // int64 # User ID of the User who created the file/folder
  getCreatedById = () => this.attributes.created_by_id

  setCreatedById = value => {
    this.attributes.created_by_id = value
    exposeAttributes(this, ['created_by_id'])
  }

  // int64 # ID of the API key that created the file/folder
  getCreatedByApiKeyId = () => this.attributes.created_by_api_key_id

  setCreatedByApiKeyId = value => {
    this.attributes.created_by_api_key_id = value
    exposeAttributes(this, ['created_by_api_key_id'])
  }

  // int64 # ID of the AS2 Incoming Message that created the file/folder
  getCreatedByAs2IncomingMessageId = () => this.attributes.created_by_as2_incoming_message_id

  setCreatedByAs2IncomingMessageId = value => {
    this.attributes.created_by_as2_incoming_message_id = value
    exposeAttributes(this, ['created_by_as2_incoming_message_id'])
  }

  // int64 # ID of the Automation that created the file/folder
  getCreatedByAutomationId = () => this.attributes.created_by_automation_id

  setCreatedByAutomationId = value => {
    this.attributes.created_by_automation_id = value
    exposeAttributes(this, ['created_by_automation_id'])
  }

  // int64 # ID of the Bundle Registration that created the file/folder
  getCreatedByBundleRegistrationId = () => this.attributes.created_by_bundle_registration_id

  setCreatedByBundleRegistrationId = value => {
    this.attributes.created_by_bundle_registration_id = value
    exposeAttributes(this, ['created_by_bundle_registration_id'])
  }

  // int64 # ID of the Inbox that created the file/folder
  getCreatedByInboxId = () => this.attributes.created_by_inbox_id

  setCreatedByInboxId = value => {
    this.attributes.created_by_inbox_id = value
    exposeAttributes(this, ['created_by_inbox_id'])
  }

  // int64 # ID of the Remote Server that created the file/folder
  getCreatedByRemoteServerId = () => this.attributes.created_by_remote_server_id

  setCreatedByRemoteServerId = value => {
    this.attributes.created_by_remote_server_id = value
    exposeAttributes(this, ['created_by_remote_server_id'])
  }

  // int64 # ID of the Sync that created the file/folder
  getCreatedBySyncId = () => this.attributes.created_by_sync_id

  setCreatedBySyncId = value => {
    this.attributes.created_by_sync_id = value
    exposeAttributes(this, ['created_by_sync_id'])
  }

  // object # Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  getCustomMetadata = () => this.attributes.custom_metadata

  setCustomMetadata = value => {
    this.attributes.custom_metadata = value
    exposeAttributes(this, ['custom_metadata'])
  }

  // string # File/Folder display name
  getDisplayName = () => this.attributes.display_name

  setDisplayName = value => {
    this.attributes.display_name = value
    exposeAttributes(this, ['display_name'])
  }

  // string # Type: `directory` or `file`.
  getType = () => this.attributes.type

  setType = value => {
    this.attributes.type = value
    exposeAttributes(this, ['type'])
  }

  // int64 # File/Folder size
  getSize = () => this.attributes.size

  setSize = value => {
    this.attributes.size = value
    exposeAttributes(this, ['size'])
  }

  // date-time # File created date/time
  getCreatedAt = () => this.attributes.created_at

  // int64 # User ID of the User who last modified the file/folder
  getLastModifiedById = () => this.attributes.last_modified_by_id

  setLastModifiedById = value => {
    this.attributes.last_modified_by_id = value
    exposeAttributes(this, ['last_modified_by_id'])
  }

  // int64 # ID of the API key that last modified the file/folder
  getLastModifiedByApiKeyId = () => this.attributes.last_modified_by_api_key_id

  setLastModifiedByApiKeyId = value => {
    this.attributes.last_modified_by_api_key_id = value
    exposeAttributes(this, ['last_modified_by_api_key_id'])
  }

  // int64 # ID of the Automation that last modified the file/folder
  getLastModifiedByAutomationId = () => this.attributes.last_modified_by_automation_id

  setLastModifiedByAutomationId = value => {
    this.attributes.last_modified_by_automation_id = value
    exposeAttributes(this, ['last_modified_by_automation_id'])
  }

  // int64 # ID of the Bundle Registration that last modified the file/folder
  getLastModifiedByBundleRegistrationId = () => this.attributes.last_modified_by_bundle_registration_id

  setLastModifiedByBundleRegistrationId = value => {
    this.attributes.last_modified_by_bundle_registration_id = value
    exposeAttributes(this, ['last_modified_by_bundle_registration_id'])
  }

  // int64 # ID of the Remote Server that last modified the file/folder
  getLastModifiedByRemoteServerId = () => this.attributes.last_modified_by_remote_server_id

  setLastModifiedByRemoteServerId = value => {
    this.attributes.last_modified_by_remote_server_id = value
    exposeAttributes(this, ['last_modified_by_remote_server_id'])
  }

  // int64 # ID of the Sync that last modified the file/folder
  getLastModifiedBySyncId = () => this.attributes.last_modified_by_sync_id

  setLastModifiedBySyncId = value => {
    this.attributes.last_modified_by_sync_id = value
    exposeAttributes(this, ['last_modified_by_sync_id'])
  }

  // date-time # File last modified date/time, according to the server.  This is the timestamp of the last Files.com operation of the file, regardless of what modified timestamp was sent.
  getMtime = () => this.attributes.mtime

  setMtime = value => {
    this.attributes.mtime = value
    exposeAttributes(this, ['mtime'])
  }

  // date-time # File last modified date/time, according to the client who set it.  Files.com allows desktop, FTP, SFTP, and WebDAV clients to set modified at times.  This allows Desktop<->Cloud syncing to preserve modified at times.
  getProvidedMtime = () => this.attributes.provided_mtime

  setProvidedMtime = value => {
    this.attributes.provided_mtime = value
    exposeAttributes(this, ['provided_mtime'])
  }

  // string # File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getCrc32 = () => this.attributes.crc32

  setCrc32 = value => {
    this.attributes.crc32 = value
    exposeAttributes(this, ['crc32'])
  }

  // string # File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getMd5 = () => this.attributes.md5

  setMd5 = value => {
    this.attributes.md5 = value
    exposeAttributes(this, ['md5'])
  }

  // string # File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getSha1 = () => this.attributes.sha1

  setSha1 = value => {
    this.attributes.sha1 = value
    exposeAttributes(this, ['sha1'])
  }

  // string # File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getSha256 = () => this.attributes.sha256

  setSha256 = value => {
    this.attributes.sha256 = value
    exposeAttributes(this, ['sha256'])
  }

  // string # MIME Type.  This is determined by the filename extension and is not stored separately internally.
  getMimeType = () => this.attributes.mime_type

  setMimeType = value => {
    this.attributes.mime_type = value
    exposeAttributes(this, ['mime_type'])
  }

  // string # Region location
  getRegion = () => this.attributes.region

  setRegion = value => {
    this.attributes.region = value
    exposeAttributes(this, ['region'])
  }

  // string # A short string representing the current user's permissions.  Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List) or any combination
  getPermissions = () => this.attributes.permissions

  setPermissions = value => {
    this.attributes.permissions = value
    exposeAttributes(this, ['permissions'])
  }

  // boolean # Are subfolders locked and unable to be modified?
  getSubfoldersLocked = () => this.attributes.subfolders_locked

  setSubfoldersLocked = value => {
    this.attributes.subfolders_locked = value
    exposeAttributes(this, ['subfolders_locked'])
  }

  // boolean # Is this folder locked and unable to be modified?
  getIsLocked = () => this.attributes.is_locked

  setIsLocked = value => {
    this.attributes.is_locked = value
    exposeAttributes(this, ['is_locked'])
  }

  // string # Link to download file. Provided only in response to a download request.
  getDownloadUri = () => this.attributes.download_uri

  setDownloadUri = value => {
    this.attributes.download_uri = value
    exposeAttributes(this, ['download_uri'])
  }

  // DirectConnectionInfo # Optional direct connection information for direct Agent transfer attempts
  getDirectConnectionInfo = () => this.attributes.direct_connection_info

  setDirectConnectionInfo = value => {
    this.attributes.direct_connection_info = value
    exposeAttributes(this, ['direct_connection_info'])
  }

  // string # Bookmark/priority color of file/folder
  getPriorityColor = () => this.attributes.priority_color

  setPriorityColor = value => {
    this.attributes.priority_color = value
    exposeAttributes(this, ['priority_color'])
  }

  // int64 # File preview ID
  getPreviewId = () => this.attributes.preview_id

  setPreviewId = value => {
    this.attributes.preview_id = value
    exposeAttributes(this, ['preview_id'])
  }

  // Preview # File preview
  getPreview = () => this.attributes.preview

  setPreview = value => {
    this.attributes.preview = value
    exposeAttributes(this, ['preview'])
  }

  // boolean # Create parent directories if they do not exist?
  getMkdirParents = () => this.attributes.mkdir_parents

  setMkdirParents = value => {
    this.attributes.mkdir_parents = value
    exposeAttributes(this, ['mkdir_parents'])
  }

  save = async () => {
    const newObject = await Folder.create(this.attributes.path, this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   path (required) - string - Path to operate on.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   sort_by - object - Search by field and direction. Valid fields are `path`, `size`, `modified_at_datetime`, `provided_modified_at`.  Valid directions are `asc` and `desc`.  Defaults to `{"path":"asc"}`.
  //   search - string - If specified, will search the folders/files list by name. Ignores text before last `/`. This is the same API used by the search bar in the web UI when running 'Search This Folder'.  Search results are a best effort, not real time, and not guaranteed to perfectly match the latest folder listing.  Results may be truncated if more than 1,000 possible matches exist.  This field should only be used for ad-hoc (human) searching, and not as part of an automated process.
  //   search_custom_metadata_key - string - If provided, the search string in `search` will search for files where this custom metadata key matches the value sent in `search`.  Set this to `*` to allow any metadata key to match the value sent in `search`.
  //   search_all - boolean - Search entire site?  If true, we will search the entire site.  Do not provide a path when using this parameter.  This is the same API used by the search bar in the web UI when running 'Search All Files'.  Search results are a best effort, not real time, and not guaranteed to match every file.  This field should only be used for ad-hoc (human) searching, and not as part of an automated process.
  //   with_previews - boolean - Include file previews?
  //   with_priority_color - boolean - Include file priority color information?
  //   type - string - Type of objects to return.  Can be `folder` or `file`.
  //   modified_at_datetime - string - If provided, will only return files/folders modified after this time. Can be used only in combination with `type` filter.
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

    if (params.preview_size !== undefined && params.preview_size !== null && !isString(params.preview_size)) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params.preview_size)}`)
    }

    if (params.search !== undefined && params.search !== null && !isString(params.search)) {
      throw new errors.InvalidParameterError(`Bad parameter: search must be of type String, received ${getType(params.search)}`)
    }

    if (params.search_custom_metadata_key !== undefined && params.search_custom_metadata_key !== null && !isString(params.search_custom_metadata_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: search_custom_metadata_key must be of type String, received ${getType(params.search_custom_metadata_key)}`)
    }

    if (isArray(params.search_all) || isObject(params.search_all)) {
      throw new errors.InvalidParameterError(`Bad parameter: search_all must be of type Boolean, received ${getType(params.search_all)}`)
    }

    if (isArray(params.with_previews) || isObject(params.with_previews)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_previews must be of type Boolean, received ${getType(params.with_previews)}`)
    }

    if (isArray(params.with_priority_color) || isObject(params.with_priority_color)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_priority_color must be of type Boolean, received ${getType(params.with_priority_color)}`)
    }

    if (params.type !== undefined && params.type !== null && !isString(params.type)) {
      throw new errors.InvalidParameterError(`Bad parameter: type must be of type String, received ${getType(params.type)}`)
    }

    if (params.modified_at_datetime !== undefined && params.modified_at_datetime !== null && !isString(params.modified_at_datetime)) {
      throw new errors.InvalidParameterError(`Bad parameter: modified_at_datetime must be of type String, received ${getType(params.modified_at_datetime)}`)
    }

    const response = await Api.sendRequest(`/folders/${encodeURIComponent(params.path)}`, 'GET', params, options)

    const File = require('./File.js').default
    return response?.data?.map(obj => new File(obj, retainedOptions(options))) || []
  }

  // The items listFor() lists, one at a time: an async iterator that requests each page
  // through listFor() only once the items before it have been taken (see Api._iterate).
  static listForIterator = (path, params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Folder.listFor(path, pageParams, pageOptions))

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   provided_mtime - string - User provided modification time.
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.mkdir_parents) || isObject(params.mkdir_parents)) {
      throw new errors.InvalidParameterError(`Bad parameter: mkdir_parents must be of type Boolean, received ${getType(params.mkdir_parents)}`)
    }

    if (params.provided_mtime !== undefined && params.provided_mtime !== null && !isString(params.provided_mtime)) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params.provided_mtime)}`)
    }

    const response = await Api.sendRequest(`/folders/${encodeURIComponent(params.path)}`, 'POST', params, options)

    const File = require('./File.js').default
    return new File(response?.data, retainedOptions(options))
  }
}

export default Folder

module.exports = Folder
module.exports.default = Folder
