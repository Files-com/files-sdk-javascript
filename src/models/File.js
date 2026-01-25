import Readable from 'readable-stream'
import { Buffer } from 'safe-buffer'

/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  isBrowser, getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

    const FileUploadPart = require('./FileUploadPart.js').default
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

    const FileUploadPart = require('./FileUploadPart.js').default
    return new FileUploadPart(partData)
  }

  static _completeUpload = async (firstFileUploadPart, options) => {
    const params = {
      action: 'end',
      ref: firstFileUploadPart.ref,
    }

    return Api.sendRequest(`/files/${encodeURIComponent(firstFileUploadPart.path)}`, 'POST', params, options)
  }

  /**
   * @note see File.copy() for list of supported params
   */
  static uploadStream = async (destinationPath, readableStream, params, optionsRaw) => {
    const { determinePartUploadUri: determinePartUploadUriRaw, ...options } = optionsRaw || {}

    const firstFileUploadPart = await File._openUpload(destinationPath, params, options)

    if (!firstFileUploadPart) {
      return null
    }

    const determinePartUploadUri = determinePartUploadUriRaw || (fileUploadPart => fileUploadPart.upload_uri)

    try {
      const file = await new Promise((resolve, reject) => {
        let part = 0
        let chunks = []
        let length = 0
        const concurrentUploads = []

        let chunkBuffer = null
        let streamEnded = false

        const handleStreamEnd = async () => {
          if (chunkBuffer !== null || !streamEnded) {
            return
          }

          try {
            if (chunks.length > 0) {
              const buffer = Buffer.concat(chunks)
              const nextFileUploadPart = await File._continueUpload(destinationPath, ++part, firstFileUploadPart, options)

              const uploadUri = determinePartUploadUri(nextFileUploadPart)

              // instantiate an httpsAgent dynamically if needed
              const agent = options.getAgentForUrl?.(uploadUri) || options?.agent

              concurrentUploads.push(Api.sendFilePart(uploadUri, 'PUT', buffer, { agent }))
            }

            await Promise.all(concurrentUploads)

            const response = await File._completeUpload(firstFileUploadPart, options)
            const createdFile = new File(response.data, options)

            resolve(createdFile)
          } catch (error) {
            reject(error)
          }
        }

        readableStream.on('error', error => { reject(error) })

        // note that for a network stream, each chunk is typically less than partsize * 2, but
        // if a stream has been created based on very large data, it's possible for a chunk to
        // contain the entire file and we could get a single chunk with length >= partsize * 3
        readableStream.on('data', async chunk => {
          try {
            let excessLength = (length + chunk.length) - firstFileUploadPart.partsize

            chunkBuffer = Buffer.from(chunk)

            if (excessLength > 0) {
              readableStream.pause()

              while (chunkBuffer) {
                // the amount to append this last part with to make it exactly the full partsize
                const lengthForEndOfCurrentPart = chunkBuffer.length - excessLength

                const lastChunkForCurrentPart = chunkBuffer.subarray(0, lengthForEndOfCurrentPart)
                const chunkBufferAfterCurrentPart = chunkBuffer.subarray(lengthForEndOfCurrentPart)

                chunks.push(lastChunkForCurrentPart)

                const buffer = Buffer.concat(chunks)
                /* eslint-disable-next-line no-await-in-loop */
                const nextFileUploadPart = await File._continueUpload(destinationPath, ++part, firstFileUploadPart, options)

                const uploadUri = determinePartUploadUri(nextFileUploadPart)

                // instantiate an httpsAgent dynamically if needed
                const agent = options.getAgentForUrl?.(uploadUri) || options?.agent

                const uploadPromise = Api.sendFilePart(uploadUri, 'PUT', buffer, { agent })

                if (firstFileUploadPart.parallel_parts) {
                  concurrentUploads.push(uploadPromise)
                } else {
                  /* eslint-disable-next-line no-await-in-loop */
                  await uploadPromise
                }

                // determine if the remainder of the excess chunk data is too large to be a single part
                const isNextChunkAtLeastOnePart = chunkBufferAfterCurrentPart.length >= firstFileUploadPart.partsize

                // the excess data contains >= 1 full part, so we'll loop again to enqueue
                // the next part for upload and continue processing any excess beyond that
                if (isNextChunkAtLeastOnePart) {
                  chunks = []
                  length = 0

                  chunkBuffer = chunkBufferAfterCurrentPart
                  excessLength = chunkBuffer.length - firstFileUploadPart.partsize
                // the excess data is less than a full part, so we'll enqueue it
                } else if (chunkBufferAfterCurrentPart.length > 0) {
                  chunks = [chunkBufferAfterCurrentPart]
                  length = chunkBufferAfterCurrentPart.length

                  chunkBuffer = null
                } else {
                  chunkBuffer = null
                }
              }

              readableStream.resume()
            } else {
              chunks.push(chunkBuffer)
              length += chunk.length

              chunkBuffer = null
            }

            if (streamEnded) {
              handleStreamEnd()
            }
          } catch (error) {
            reject(error)
          }
        })

        // note that this event may occur while there is still data being processed above
        readableStream.on('end', () => {
          streamEnded = true

          handleStreamEnd()
        })
      })

      return file
    } catch (error) {
      errors.handleErrorResponse(error)
      return null
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

  // string # File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
  }

  // int64 # User ID of the User who created the file/folder
  getCreatedById = () => this.attributes.created_by_id

  setCreatedById = value => {
    this.attributes.created_by_id = value
  }

  // int64 # ID of the API key that created the file/folder
  getCreatedByApiKeyId = () => this.attributes.created_by_api_key_id

  setCreatedByApiKeyId = value => {
    this.attributes.created_by_api_key_id = value
  }

  // int64 # ID of the AS2 Incoming Message that created the file/folder
  getCreatedByAs2IncomingMessageId = () => this.attributes.created_by_as2_incoming_message_id

  setCreatedByAs2IncomingMessageId = value => {
    this.attributes.created_by_as2_incoming_message_id = value
  }

  // int64 # ID of the Automation that created the file/folder
  getCreatedByAutomationId = () => this.attributes.created_by_automation_id

  setCreatedByAutomationId = value => {
    this.attributes.created_by_automation_id = value
  }

  // int64 # ID of the Bundle Registration that created the file/folder
  getCreatedByBundleRegistrationId = () => this.attributes.created_by_bundle_registration_id

  setCreatedByBundleRegistrationId = value => {
    this.attributes.created_by_bundle_registration_id = value
  }

  // int64 # ID of the Inbox that created the file/folder
  getCreatedByInboxId = () => this.attributes.created_by_inbox_id

  setCreatedByInboxId = value => {
    this.attributes.created_by_inbox_id = value
  }

  // int64 # ID of the Remote Server that created the file/folder
  getCreatedByRemoteServerId = () => this.attributes.created_by_remote_server_id

  setCreatedByRemoteServerId = value => {
    this.attributes.created_by_remote_server_id = value
  }

  // int64 # ID of the Sync that created the file/folder
  getCreatedBySyncId = () => this.attributes.created_by_sync_id

  setCreatedBySyncId = value => {
    this.attributes.created_by_sync_id = value
  }

  // object # Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  getCustomMetadata = () => this.attributes.custom_metadata

  setCustomMetadata = value => {
    this.attributes.custom_metadata = value
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

  // int64 # User ID of the User who last modified the file/folder
  getLastModifiedById = () => this.attributes.last_modified_by_id

  setLastModifiedById = value => {
    this.attributes.last_modified_by_id = value
  }

  // int64 # ID of the API key that last modified the file/folder
  getLastModifiedByApiKeyId = () => this.attributes.last_modified_by_api_key_id

  setLastModifiedByApiKeyId = value => {
    this.attributes.last_modified_by_api_key_id = value
  }

  // int64 # ID of the Automation that last modified the file/folder
  getLastModifiedByAutomationId = () => this.attributes.last_modified_by_automation_id

  setLastModifiedByAutomationId = value => {
    this.attributes.last_modified_by_automation_id = value
  }

  // int64 # ID of the Bundle Registration that last modified the file/folder
  getLastModifiedByBundleRegistrationId = () => this.attributes.last_modified_by_bundle_registration_id

  setLastModifiedByBundleRegistrationId = value => {
    this.attributes.last_modified_by_bundle_registration_id = value
  }

  // int64 # ID of the Remote Server that last modified the file/folder
  getLastModifiedByRemoteServerId = () => this.attributes.last_modified_by_remote_server_id

  setLastModifiedByRemoteServerId = value => {
    this.attributes.last_modified_by_remote_server_id = value
  }

  // int64 # ID of the Sync that last modified the file/folder
  getLastModifiedBySyncId = () => this.attributes.last_modified_by_sync_id

  setLastModifiedBySyncId = value => {
    this.attributes.last_modified_by_sync_id = value
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

  // string # File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getSha1 = () => this.attributes.sha1

  setSha1 = value => {
    this.attributes.sha1 = value
  }

  // string # File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getSha256 = () => this.attributes.sha256

  setSha256 = value => {
    this.attributes.sha256 = value
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

  // string # A short string representing the current user's permissions.  Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List) or any combination
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

  // boolean # If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  getBufferedUpload = () => this.attributes.buffered_upload

  setBufferedUpload = value => {
    this.attributes.buffered_upload = value
  }

  // Download File
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
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.action && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.preview_size && !isString(params.preview_size)) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params.preview_size)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'GET', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   custom_metadata - object - Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
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
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.provided_mtime && !isString(params.provided_mtime)) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params.provided_mtime)}`)
    }

    if (params.priority_color && !isString(params.priority_color)) {
      throw new errors.InvalidParameterError(`Bad parameter: priority_color must be of type String, received ${getType(params.priority_color)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'PATCH', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   recursive - boolean - If true, will recursively delete folders.  Otherwise, will error on non-empty folders.
  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  // List the contents of a ZIP file
  zipListContents = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/file_actions/zip_list/${encodeURIComponent(params.path)}`, 'GET', params, this.options)

    const ZipListEntry = require('./ZipListEntry.js').default
    return response?.data?.map(obj => new ZipListEntry(obj, this.options)) || []
  }

  // Copy File/Folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   structure - boolean - Copy structure only?
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  copy = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest(`/file_actions/copy/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return new FileAction(response?.data, this.options)
  }

  // Move File/Folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  move = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest(`/file_actions/move/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return new FileAction(response?.data, this.options)
  }

  // Extract a ZIP file to a destination folder
  //
  // Parameters:
  //   destination (required) - string - Destination folder path for extracted files.
  //   filename - string - Optional single entry filename to extract.
  //   overwrite - boolean - Overwrite existing files in the destination?
  unzip = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = this.attributes.path
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.filename && !isString(params.filename)) {
      throw new errors.InvalidParameterError(`Bad parameter: filename must be of type String, received ${getType(params.filename)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const response = await Api.sendRequest('/file_actions/unzip', 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return new FileAction(response?.data, this.options)
  }

  // Begin File Upload
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
    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.part && !isInt(params.part)) {
      throw new errors.InvalidParameterError(`Bad parameter: part must be of type Int, received ${getType(params.part)}`)
    }

    if (params.parts && !isInt(params.parts)) {
      throw new errors.InvalidParameterError(`Bad parameter: parts must be of type Int, received ${getType(params.parts)}`)
    }

    if (params.ref && !isString(params.ref)) {
      throw new errors.InvalidParameterError(`Bad parameter: ref must be of type String, received ${getType(params.ref)}`)
    }

    if (params.restart && !isInt(params.restart)) {
      throw new errors.InvalidParameterError(`Bad parameter: restart must be of type Int, received ${getType(params.restart)}`)
    }

    if (params.size && !isInt(params.size)) {
      throw new errors.InvalidParameterError(`Bad parameter: size must be of type Int, received ${getType(params.size)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/file_actions/begin_upload/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileUploadPart = require('./FileUploadPart.js').default
    return response?.data?.map(obj => new FileUploadPart(obj, this.options)) || []
  }

  save = async () => {
    const newObject = await File.create(this.attributes.path, this.attributes, this.options)
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
  //   buffered_upload - boolean - If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.action && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.length && !isInt(params.length)) {
      throw new errors.InvalidParameterError(`Bad parameter: length must be of type Int, received ${getType(params.length)}`)
    }

    if (params.part && !isInt(params.part)) {
      throw new errors.InvalidParameterError(`Bad parameter: part must be of type Int, received ${getType(params.part)}`)
    }

    if (params.parts && !isInt(params.parts)) {
      throw new errors.InvalidParameterError(`Bad parameter: parts must be of type Int, received ${getType(params.parts)}`)
    }

    if (params.provided_mtime && !isString(params.provided_mtime)) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params.provided_mtime)}`)
    }

    if (params.ref && !isString(params.ref)) {
      throw new errors.InvalidParameterError(`Bad parameter: ref must be of type String, received ${getType(params.ref)}`)
    }

    if (params.restart && !isInt(params.restart)) {
      throw new errors.InvalidParameterError(`Bad parameter: restart must be of type Int, received ${getType(params.restart)}`)
    }

    if (params.size && !isInt(params.size)) {
      throw new errors.InvalidParameterError(`Bad parameter: size must be of type Int, received ${getType(params.size)}`)
    }

    if (params.structure && !isString(params.structure)) {
      throw new errors.InvalidParameterError(`Bad parameter: structure must be of type String, received ${getType(params.structure)}`)
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'POST', params, options)

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

    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.preview_size && !isString(params.preview_size)) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params.preview_size)}`)
    }

    const response = await Api.sendRequest(`/file_actions/metadata/${encodeURIComponent(params.path)}`, 'GET', params, options)

    return new File(response?.data, options)
  }

  static get = (path, params = {}, options = {}) =>
    File.find(path, params, options)

  // Parameters:
  //   paths (required) - array(string) - Paths to include in the ZIP.
  //   destination (required) - string - Destination file path for the ZIP.
  //   overwrite - boolean - Overwrite existing file in the destination?
  static zip = async (params = {}, options = {}) => {
    if (!params.paths) {
      throw new errors.MissingParameterError('Parameter missing: paths')
    }

    if (!params.destination) {
      throw new errors.MissingParameterError('Parameter missing: destination')
    }

    if (params.paths && !isArray(params.paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(params.paths)}`)
    }

    if (params.destination && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    const response = await Api.sendRequest('/file_actions/zip', 'POST', params, options)

    const FileAction = require('./FileAction.js').default
    return new FileAction(response?.data, options)
  }
}

export default File

module.exports = File
module.exports.default = File
