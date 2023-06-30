import Readable from 'readable-stream'
import { Buffer } from 'safe-buffer'

import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'
import FileAction from './FileAction'
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
  static _openUpload = async (path, paramsRaw, options) => {
    const params = { ...paramsRaw, action: 'put' }
    const response = await Api.sendRequest(`/files/${encodeURIComponent(path)}`, 'POST', params, options)

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

  static _continueUpload = async (path, partNumber, firstFileUploadPart, options) => {
    const params = {
      action: 'put',
      part: partNumber,
      ref: firstFileUploadPart.ref,
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(path)}`, 'POST', params, options)

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

  static _completeUpload = async (firstFileUploadPart, options) => {
    const params = {
      action: 'end',
      ref: firstFileUploadPart.ref,
    }

    return Api.sendRequest(`/files/${encodeURIComponent(firstFileUploadPart.path)}`, 'POST', params, options)
  }

  static _determinePartUploadUri = fileUploadPart => {
    return fileUploadPart.upload_uri
  }

  /**
   * @note see File.copy() for list of supported params
   */
  static uploadStream = async (destinationPath, readableStream, params, options) => {
    const firstFileUploadPart = await File._openUpload(destinationPath, params, options)

    if (!firstFileUploadPart) {
      return
    }

    try {
      const file = await new Promise((resolve, reject) => {
        let part = 0
        let chunks = []
        let length = 0
        const concurrentUploads = []

        readableStream.on('error', error => { reject(error) })

        readableStream.on('data', async chunk => {
          try {
            const nextLength = length + chunk.length
            const excessLength = nextLength - firstFileUploadPart.partsize

            const chunkBuffer = Buffer.from(chunk)

            if (excessLength > 0) {
              readableStream.pause()

              // the amount to append this last part with to make it exactly the full partsize
              const tailLength = chunkBuffer.length - excessLength

              const lastChunkForPart = chunkBuffer.subarray(0, tailLength)
              const firstChunkForNextPart = chunkBuffer.subarray(tailLength)

              chunks.push(lastChunkForPart)

              const buffer = Buffer.concat(chunks)
              const nextFileUploadPart = await File._continueUpload(destinationPath, ++part, firstFileUploadPart, options)

              const upload_uri = this._determinePartUploadUri(nextFileUploadPart)
              const uploadPromise = Api.sendFilePart(upload_uri, 'PUT', buffer)

              if (firstFileUploadPart.parallel_parts) {
                concurrentUploads.push(uploadPromise)
              } else {
                await uploadPromise
              }

              chunks = [firstChunkForNextPart]
              length = firstChunkForNextPart.length

              readableStream.resume()
            } else {
              chunks.push(chunkBuffer)
              length += chunk.length
            }
          } catch (error) {
            reject(error)
          }
        })

        readableStream.on('end', async () => {
          try {
            if (chunks.length > 0) {
              const buffer = Buffer.concat(chunks)
              const nextFileUploadPart = await File._continueUpload(destinationPath, ++part, firstFileUploadPart, options)

              const upload_uri = this._determinePartUploadUri(nextFileUploadPart)
              concurrentUploads.push(Api.sendFilePart(upload_uri, 'PUT', buffer))
            }

            await Promise.all(concurrentUploads)

            const response = await File._completeUpload(firstFileUploadPart, options)
            const createdFile = new File(response.data, options)

            resolve(createdFile)
          } catch (error) {
            reject(error)
          }
        })
      })

      return file
    } catch (error) {
      errors.handleErrorResponse(error)
    }
  }

  /**
   * data - string, Buffer, Stream, any object implementing Symbol.iterator or Symbol.asyncIterator
   * @note see File.copy() for list of supported params
   */
  static uploadData = async (destinationPath, data, params, options) => {
    if (!data) {
      throw new errors.MissingParameterError('Upload data was not provided')
    }

    return File.uploadStream(destinationPath, Readable.from(data), params, options)
  }

  /**
   * @note see File.copy() for list of supported params
   */
  static uploadFile = async (destinationPath, sourceFilePath, params, options) => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Disk file uploads are only available in a NodeJS environment')
    }

    const { openDiskFileReadStream } = require('../isomorphic/File.node.js')
    const stream = openDiskFileReadStream(sourceFilePath)

    return File.uploadStream(destinationPath, stream, params, options)
  }

  downloadToStream = async writableStream => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Stream downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new errors.EmptyPropertyError('Current object has no download URI')
    }

    const { saveUrlToStream } = require('../isomorphic/File.node.js')
    return saveUrlToStream(downloadUri, writableStream)
  }

  downloadToString = async () => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('String downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new errors.EmptyPropertyError('Current object has no download URI')
    }

    const { saveUrlToString } = require('../isomorphic/File.node.js')
    return saveUrlToString(downloadUri)
  }

  downloadToFile = async destinationPath => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Disk file downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new errors.EmptyPropertyError('Current object has no download URI')
    }

    const { saveUrlToFile } = require('../isomorphic/File.node.js')
    return saveUrlToFile(downloadUri, destinationPath)
  }

  copyTo = async (destinationFilePath, options) => {
    const params = { destination: destinationFilePath }
    return Api.sendRequest(`/file_actions/copy/${encodeURIComponent(this.path)}`, 'POST', params, options)
  }

  moveTo = async (destinationFilePath, options) => {
    const params = { destination: destinationFilePath }
    return Api.sendRequest(`/file_actions/move/${encodeURIComponent(this.path)}`, 'POST', params, options)
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
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['action'] && !isString(params['action'])) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }
    if (params['preview_size'] && !isString(params['preview_size'])) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(preview_size)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params['path'])}`, 'GET', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   provided_mtime - string - Modified time of file.
  //   priority_color - string - Priority/Bookmark color of file.
  update = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['provided_mtime'] && !isString(params['provided_mtime'])) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(provided_mtime)}`)
    }
    if (params['priority_color'] && !isString(params['priority_color'])) {
      throw new errors.InvalidParameterError(`Bad parameter: priority_color must be of type String, received ${getType(priority_color)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params['path'])}`, 'PATCH', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   recursive - boolean - If true, will recursively delete folers.  Otherwise, will error on non-empty folders.
  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params['path'])}`, 'DELETE', params, this.options)

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
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params['destination']) {
      if (this.attributes.destination) {
        params['destination'] = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest(`/file_actions/copy/${encodeURIComponent(params['path'])}`, 'POST', params, this.options)

    return new FileAction(response?.data, this.options)
  }

  // Move file/folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  move = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['destination'] && !isString(params['destination'])) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(destination)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params['destination']) {
      if (this.attributes.destination) {
        params['destination'] = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest(`/file_actions/move/${encodeURIComponent(params['path'])}`, 'POST', params, this.options)

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
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(path)}`)
    }
    if (params['part'] && !isInt(params['part'])) {
      throw new errors.InvalidParameterError(`Bad parameter: part must be of type Int, received ${getType(part)}`)
    }
    if (params['parts'] && !isInt(params['parts'])) {
      throw new errors.InvalidParameterError(`Bad parameter: parts must be of type Int, received ${getType(parts)}`)
    }
    if (params['ref'] && !isString(params['ref'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ref must be of type String, received ${getType(ref)}`)
    }
    if (params['restart'] && !isInt(params['restart'])) {
      throw new errors.InvalidParameterError(`Bad parameter: restart must be of type Int, received ${getType(restart)}`)
    }
    if (params['size'] && !isInt(params['size'])) {
      throw new errors.InvalidParameterError(`Bad parameter: size must be of type Int, received ${getType(size)}`)
    }

    if (!params['path']) {
      if (this.attributes.path) {
        params['path'] = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/file_actions/begin_upload/${encodeURIComponent(params['path'])}`, 'POST', params, this.options)

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
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['path'] = path

    if (!params['path']) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params['path'] && !isString(params['path'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params['path'])}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params['action'])}`)
    }

    if (params['length'] && !isInt(params['length'])) {
      throw new errors.InvalidParameterError(`Bad parameter: length must be of type Int, received ${getType(params['length'])}`)
    }

    if (params['part'] && !isInt(params['part'])) {
      throw new errors.InvalidParameterError(`Bad parameter: part must be of type Int, received ${getType(params['part'])}`)
    }

    if (params['parts'] && !isInt(params['parts'])) {
      throw new errors.InvalidParameterError(`Bad parameter: parts must be of type Int, received ${getType(params['parts'])}`)
    }

    if (params['provided_mtime'] && !isString(params['provided_mtime'])) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params['provided_mtime'])}`)
    }

    if (params['ref'] && !isString(params['ref'])) {
      throw new errors.InvalidParameterError(`Bad parameter: ref must be of type String, received ${getType(params['ref'])}`)
    }

    if (params['restart'] && !isInt(params['restart'])) {
      throw new errors.InvalidParameterError(`Bad parameter: restart must be of type Int, received ${getType(params['restart'])}`)
    }

    if (params['size'] && !isInt(params['size'])) {
      throw new errors.InvalidParameterError(`Bad parameter: size must be of type Int, received ${getType(params['size'])}`)
    }

    if (params['structure'] && !isString(params['structure'])) {
      throw new errors.InvalidParameterError(`Bad parameter: structure must be of type String, received ${getType(params['structure'])}`)
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params['path'])}`, 'POST', params, options)

    return new File(response?.data, options)
  }

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  static find = async (path, params = {}, options = {}) => {
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

    if (params['preview_size'] && !isString(params['preview_size'])) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params['preview_size'])}`)
    }

    const response = await Api.sendRequest(`/file_actions/metadata/${encodeURIComponent(params['path'])}`, 'GET', params, options)

    return new File(response?.data, options)
  }

  static get = (path, params = {}, options = {}) =>
    File.find(path, params, options)
}

export default File
