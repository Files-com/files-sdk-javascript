import Readable from 'readable-stream'
import { Buffer } from 'safe-buffer'

import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'
import FileUploadPart from './FileUploadPart'

/**
 * Class File
 */
class File {
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
  static _openUpload = async path => {
    const params = { action: 'put' }
    const response = await Api.sendRequest(`/files/${encodeURIComponent(path)}`, 'POST', params)

    if (!response) {
      return null
    }

    const partData = {
      ...response.data,
      headers: response.headers,
      parameters: params,
    }

    return new FileUploadPart(partData)
  }

  static _continueUpload = async (path, partNumber, firstFileUploadPart) => {
    const params = {
      action: 'put',
      part: partNumber,
      ref: firstFileUploadPart.ref,
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(path)}`, 'POST', params)

    if (!response) {
      return null
    }

    const partData = {
      ...response.data,
      headers: response.headers,
      parameters: params,
    }

    return new FileUploadPart(partData)
  }

  static _completeUpload = async fileUploadPart => {
    const params = {
      action: 'end',
      ref: fileUploadPart.ref,
    }

    return Api.sendRequest(`/files/${encodeURIComponent(fileUploadPart.path)}`, 'POST', params)
  }

  static uploadStream = async (destinationPath, readableStream) => {
    const fileUploadPart = await File._openUpload(destinationPath)

    if (!fileUploadPart) {
      return
    }

    try {
      const file = await new Promise((resolve, reject) => {
        let part = 0
        let chunks = []
        let length = 0

        readableStream.on('error', error => { reject(error) })

        readableStream.on('data', async chunk => {
          length += chunk.length

          if (length > fileUploadPart.partsize) {
            readableStream.pause()

            const buffer = Buffer.concat(chunks)
            const nextFileUploadPart = await File._continueUpload(destinationPath, ++part, fileUploadPart)

            await Api.sendFilePart(nextFileUploadPart.upload_uri, 'PUT', buffer)

            chunks = []
            length = 0

            readableStream.resume()
          }

          chunks.push(Buffer.from(chunk))
        })

        readableStream.on('end', async () => {
          if (chunks.length > 0) {
            const buffer = Buffer.concat(chunks)
            const nextFileUploadPart = await File._continueUpload(destinationPath, ++part, fileUploadPart)

            await Api.sendFilePart(nextFileUploadPart.upload_uri, 'PUT', buffer)
          }

          const response = await File._completeUpload(fileUploadPart)
          const createdFile = new File(response.data)

          resolve(createdFile)
        })
      })

      return file
    } catch (error) {
      throw error
    }
  }

  /**
   * data - string, Buffer, Stream, any object implementing Symbol.iterator or Symbol.asyncIterator
   */
  static uploadData = async (destinationPath, data) => {
    if (!data) {
      throw new Error('Upload data was not provided')
    }

    return File.uploadStream(destinationPath, Readable.from(data))
  }

  static uploadFile = async (destinationPath, sourceFilePath) => {
    if (isBrowser()) {
      throw new Error('Disk file uploads are only available in a NodeJS environment')
    }

    const { openDiskFileReadStream } = require('../isomorphic/File.node.js')
    const stream = openDiskFileReadStream(sourceFilePath)

    return File.uploadStream(destinationPath, stream)
  }

  downloadToStream = async writableStream => {
    if (isBrowser()) {
      throw new Error('Stream downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new Error('Current object has no download URI')
    }

    const { saveUrlToStream } = require('../isomorphic/File.node.js')
    return saveUrlToStream(downloadUri, writableStream)
  }

  downloadToFile = async destinationPath => {
    if (isBrowser()) {
      throw new Error('Disk file downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new Error('Current object has no download URI')
    }

    const { saveUrlToFile } = require('../isomorphic/File.node.js')
    return saveUrlToFile(downloadUri, destinationPath)
  }

  copyTo = async destinationFilePath => {
    const params = { destination: destinationFilePath }
    return Api.sendRequest(`/file_actions/copy/${encodeURIComponent(this.path)}`, 'POST', params)
  }

  moveTo = async destinationFilePath => {
    const params = { destination: destinationFilePath }
    return Api.sendRequest(`/file_actions/move/${encodeURIComponent(this.path)}`, 'POST', params)
  }

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

  // string # The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
  getAction = () => this.attributes.action

  setAction = value => {
    this.attributes.action = value
  }

  // int64 # Length of file.
  getLength = () => this.attributes.length

  setLength = value => {
    this.attributes.length = value
  }

  // boolean # Create parent directories if they do not exist?
  getMkdirParents = () => this.attributes.mkdir_parents

  setMkdirParents = value => {
    this.attributes.mkdir_parents = value
  }

  // int64 # Part if uploading a part.
  getPart = () => this.attributes.part

  setPart = value => {
    this.attributes.part = value
  }

  // int64 # How many parts to fetch?
  getParts = () => this.attributes.parts

  setParts = value => {
    this.attributes.parts = value
  }

  // string #
  getRef = () => this.attributes.ref

  setRef = value => {
    this.attributes.ref = value
  }

  // int64 # File byte offset to restart from.
  getRestart = () => this.attributes.restart

  setRestart = value => {
    this.attributes.restart = value
  }

  // string # If copying folder, copy just the structure?
  getStructure = () => this.attributes.structure

  setStructure = value => {
    this.attributes.structure = value
  }

  // boolean # Allow file rename instead of overwrite?
  getWithRename = () => this.attributes.with_rename

  setWithRename = value => {
    this.attributes.with_rename = value
  }


  // Download file
  //
  // Parameters:
  //   action - string - Can be blank, `redirect` or `stat`.  If set to `stat`, we will return file information but without a download URL, and without logging a download.  If set to `redirect` we will serve a 302 redirect directly to the file.  This is used for integrations with Zapier, and is not recommended for most integrations.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  download = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }
    if (params['preview_size'] && !isString(params['preview_size'])) {
      throw new Error(`Bad parameter: preview_size must be of type String, received ${getType(preview_size)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${params['path']}`, 'GET', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   provided_mtime - string - Modified time of file.
  //   priority_color - string - Priority/Bookmark color of file.
  update = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['provided_mtime'] && !isString(params['provided_mtime'])) {
      throw new Error(`Bad parameter: provided_mtime must be of type String, received ${getType(provided_mtime)}`)
    }
    if (params['priority_color'] && !isString(params['priority_color'])) {
      throw new Error(`Bad parameter: priority_color must be of type String, received ${getType(priority_color)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${params['path']}`, 'PATCH', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   recursive - boolean - If true, will recursively delete folers.  Otherwise, will error on non-empty folders.
  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${params['path']}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  // Copy file/folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   structure - boolean - Copy structure only?
  copy = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new Error(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    if (!params['destination']) {
      if (this.attributes.destination) {
        params['destination'] = this.destination
      } else {
        throw new Error('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest(`/file_actions/copy/${params['path']}`, 'POST', params, this.options)

    return new FileAction(response?.data, this.options)
  }

  // Move file/folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  move = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new Error(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    if (!params['destination']) {
      if (this.attributes.destination) {
        params['destination'] = this.destination
      } else {
        throw new Error('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest(`/file_actions/move/${params['path']}`, 'POST', params, this.options)

    return new FileAction(response?.data, this.options)
  }

  // Begin file upload
  //
  // Parameters:
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Total bytes of file being uploaded (include bytes being retained if appending/restarting).
  //   with_rename - boolean - Allow file rename instead of overwrite?
  beginUpload = async (params = {}) => {
    if (!this.attributes.path) {
      throw new Error('Current object has no path')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['part'] && !isInt(params['part'])) {
      throw new Error(`Bad parameter: part must be of type Int, received ${getType(part)}`)
    }
    if (params['parts'] && !isInt(params['parts'])) {
      throw new Error(`Bad parameter: parts must be of type Int, received ${getType(parts)}`)
    }
    if (params['ref'] && !isString(params['ref'])) {
      throw new Error(`Bad parameter: ref must be of type String, received ${getType(ref)}`)
    }
    if (params['restart'] && !isInt(params['restart'])) {
      throw new Error(`Bad parameter: restart must be of type Int, received ${getType(restart)}`)
    }
    if (params['size'] && !isInt(params['size'])) {
      throw new Error(`Bad parameter: size must be of type Int, received ${getType(size)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new Error('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/file_actions/begin_upload/${params['path']}`, 'POST', params, this.options)

    return response?.data?.map(obj => new FileUploadPart(obj, this.options)) || []
  }

  save = () => {
      const newObject = File.create(this.attributes.path, this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
  }

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   action - string - The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
  //   etags[etag] (required) - array(string) - etag identifier.
  //   etags[part] (required) - array(int64) - Part number.
  //   length - int64 - Length of file.
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   provided_mtime - string - User provided modification time.
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Size of file.
  //   structure - string - If copying folder, copy just the structure?
  //   with_rename - boolean - Allow file rename instead of overwrite?
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    if (params['length'] && !isInt(params['length'])) {
      throw new Error(`Bad parameter: length must be of type Int, received ${getType(length)}`)
    }

    if (params['part'] && !isInt(params['part'])) {
      throw new Error(`Bad parameter: part must be of type Int, received ${getType(part)}`)
    }

    if (params['parts'] && !isInt(params['parts'])) {
      throw new Error(`Bad parameter: parts must be of type Int, received ${getType(parts)}`)
    }

    if (params['provided_mtime'] && !isString(params['provided_mtime'])) {
      throw new Error(`Bad parameter: provided_mtime must be of type String, received ${getType(provided_mtime)}`)
    }

    if (params['ref'] && !isString(params['ref'])) {
      throw new Error(`Bad parameter: ref must be of type String, received ${getType(ref)}`)
    }

    if (params['restart'] && !isInt(params['restart'])) {
      throw new Error(`Bad parameter: restart must be of type Int, received ${getType(restart)}`)
    }

    if (params['size'] && !isInt(params['size'])) {
      throw new Error(`Bad parameter: size must be of type Int, received ${getType(size)}`)
    }

    if (params['structure'] && !isString(params['structure'])) {
      throw new Error(`Bad parameter: structure must be of type String, received ${getType(structure)}`)
    }

    const response = await Api.sendRequest(`/files/${params['path']}`, 'POST', params, options)

    return new File(response?.data, options)
  }

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  static find = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new Error('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new Error(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (params['preview_size'] && !isString(params['preview_size'])) {
      throw new Error(`Bad parameter: preview_size must be of type String, received ${getType(preview_size)}`)
    }

    const response = await Api.sendRequest(`/file_actions/metadata/${params['path']}`, 'GET', params, options)

    return new File(response?.data, options)
  }

  static get = (path, params = {}, options = {}) =>
    File.find(path, params, options)
}

export default File
