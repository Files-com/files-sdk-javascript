import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FileUploadPart
 */
class FileUploadPart {
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
  // object # Content-Type and File to send
  getSend = () => this.attributes.send

  // string # Type of upload
  getAction = () => this.attributes.action

  // boolean # If `true`, this file exists and you may wish to ask the user for overwrite confirmation
  getAskAboutOverwrites = () => this.attributes.ask_about_overwrites

  // int64 # Number of parts in the upload
  getAvailableParts = () => this.attributes.available_parts

  // string # Date/time of when this Upload part expires and the URL cannot be used any more
  getExpires = () => this.attributes.expires

  // object # Additional upload headers to provide as part of the upload
  getHeaders = () => this.attributes.headers

  // string # HTTP Method to use for uploading the part, usually `PUT`
  getHttpMethod = () => this.attributes.http_method

  // int64 # Size in bytes for this part
  getNextPartsize = () => this.attributes.next_partsize

  // boolean # If `true`, multiple parts may be uploaded in parallel.  If `false`, be sure to only upload one part at a time, in order.
  getParallelParts = () => this.attributes.parallel_parts

  // boolean # If `true`, parts may be retried. If `false`, a part cannot be retried and the upload should be restarted.
  getRetryParts = () => this.attributes.retry_parts

  // object # Additional HTTP parameters to send with the upload
  getParameters = () => this.attributes.parameters

  // int64 # Number of this upload part
  getPartNumber = () => this.attributes.part_number

  // int64 # Size in bytes for the next upload part
  getPartsize = () => this.attributes.partsize

  // string # New file path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # Reference name for this upload part
  getRef = () => this.attributes.ref

  // string # URI to upload this part to
  getUploadUri = () => this.attributes.upload_uri

}

export default FileUploadPart
