import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'
import File from './File'

/**
 * Class Folder
 */
class Folder {
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

  isLoaded = () => !!this.attributes.path
  // string # File/Folder path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // string # File/Folder display name
  getDisplayName = () => this.attributes.display_name

  setDisplayName = value => {
    this.attributes.display_name = value
  }

  // string # Type: `directory` or `file`.
  getType = () => this.attributes.type

  setType = value => {
    this.attributes.type = value
  }

  // int64 # File/Folder size
  getSize = () => this.attributes.size

  setSize = value => {
    this.attributes.size = value
  }

  // date-time # File created date/time
  getCreatedAt = () => this.attributes.created_at

  // date-time # File last modified date/time, according to the server.  This is the timestamp of the last Files.com operation of the file, regardless of what modified timestamp was sent.
  getMtime = () => this.attributes.mtime

  setMtime = value => {
    this.attributes.mtime = value
  }

  // date-time # File last modified date/time, according to the client who set it.  Files.com allows desktop, FTP, SFTP, and WebDAV clients to set modified at times.  This allows Desktop<->Cloud syncing to preserve modified at times.
  getProvidedMtime = () => this.attributes.provided_mtime

  setProvidedMtime = value => {
    this.attributes.provided_mtime = value
  }

  // string # File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getCrc32 = () => this.attributes.crc32

  setCrc32 = value => {
    this.attributes.crc32 = value
  }

  // string # File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getMd5 = () => this.attributes.md5

  setMd5 = value => {
    this.attributes.md5 = value
  }

  // string # MIME Type.  This is determined by the filename extension and is not stored separately internally.
  getMimeType = () => this.attributes.mime_type

  setMimeType = value => {
    this.attributes.mime_type = value
  }

  // string # Region location
  getRegion = () => this.attributes.region

  setRegion = value => {
    this.attributes.region = value
  }

  // string # A short string representing the current user's permissions.  Can be `r`,`w`,`d`, `l` or any combination
  getPermissions = () => this.attributes.permissions

  setPermissions = value => {
    this.attributes.permissions = value
  }

  // boolean # Are subfolders locked and unable to be modified?
  getSubfoldersLocked = () => this.attributes.subfolders_locked

  setSubfoldersLocked = value => {
    this.attributes.subfolders_locked = value
  }

  // boolean # Is this folder locked and unable to be modified?
  getIsLocked = () => this.attributes.is_locked

  setIsLocked = value => {
    this.attributes.is_locked = value
  }

  // string # Link to download file. Provided only in response to a download request.
  getDownloadUri = () => this.attributes.download_uri

  setDownloadUri = value => {
    this.attributes.download_uri = value
  }

  // string # Bookmark/priority color of file/folder
  getPriorityColor = () => this.attributes.priority_color

  setPriorityColor = value => {
    this.attributes.priority_color = value
  }

  // int64 # File preview ID
  getPreviewId = () => this.attributes.preview_id

  setPreviewId = value => {
    this.attributes.preview_id = value
  }

  // Preview # File preview
  getPreview = () => this.attributes.preview

  setPreview = value => {
    this.attributes.preview = value
  }

  // boolean # Create parent directories if they do not exist?
  getMkdirParents = () => this.attributes.mkdir_parents

  setMkdirParents = value => {
    this.attributes.mkdir_parents = value
  }


  save = () => {
      const newObject = Folder.create(this.attributes.path, this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
  }

  // Parameters:
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   path (required) - string - Path to operate on.
  //   filter - string - If specified, will filter folders/files list by name. Ignores text before last `/`. Wildcards of `*` and `?` are acceptable here.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   sort_by - object - Search by field and direction. Valid fields are `path`, `size`, `modified_at_datetime`, `provided_modified_at`.  Valid directions are `asc` and `desc`.  Defaults to `{"path":"asc"}`.
  //   search - string - If `search_all` is `true`, provide the search string here.  Otherwise, this parameter acts like an alias of `filter`.
  //   search_all - boolean - Search entire site?  If set, we will ignore the folder path provided and search the entire site.  This is the same API used by the search bar in the UI.  Search results are a best effort, not real time, and not guaranteed to match every file.  This field should only be used for ad-hoc (human) searching, and not as part of an automated process.
  //   with_previews - boolean - Include file previews?
  //   with_priority_color - boolean - Include file priority color information?
  static listFor = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['filter'] && !isString(params['filter'])) {
      throw new errors.InvalidParameterError(`Bad parameter: filter must be of type String, received ${getType(params['filter'])}`)
    }

    if (params['preview_size'] && !isString(params['preview_size'])) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params['preview_size'])}`)
    }

    if (params['search'] && !isString(params['search'])) {
      throw new errors.InvalidParameterError(`Bad parameter: search must be of type String, received ${getType(params['search'])}`)
    }

    const response = await Api.sendRequest(`/folders/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return response?.data?.map(obj => new File(obj, options)) || []
  }

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   provided_mtime - string - User provided modification time.
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['provided_mtime'] && !isString(params['provided_mtime'])) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params['provided_mtime'])}`)
    }

    const response = await Api.sendRequest(`/folders/${encodeURIComponent(params['path'])}`, 'POST', params, options)

    return new File(response?.data, options)
  }
}

export default Folder
