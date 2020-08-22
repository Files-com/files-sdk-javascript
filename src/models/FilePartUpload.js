import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FilePartUpload
 */
class FilePartUpload {
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

  // boolean # If false, rename conflicting files instead of asking for overwrite confirmation
  getAskAboutOverwrites = () => this.attributes.ask_about_overwrites

  // int64 # Currently unused
  getAvailableParts = () => this.attributes.available_parts

  // string # Currently unused
  getExpires = () => this.attributes.expires

  // object # Additional upload headers
  getHeaders = () => this.attributes.headers

  // string # Upload method, usually POST
  getHttpMethod = () => this.attributes.http_method

  // int64 # Currently unused
  getNextPartsize = () => this.attributes.next_partsize

  // boolean # If true, parts may be uploaded in parallel
  getParallelParts = () => this.attributes.parallel_parts

  // object # Additional upload parameters
  getParameters = () => this.attributes.parameters

  // int64 # Currently unused
  getPartNumber = () => this.attributes.part_number

  // int64 # Currently unused
  getPartsize = () => this.attributes.partsize

  // string # Upload path This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  // string # Reference name for this upload part
  getRef = () => this.attributes.ref

  // string # URI to upload this part to
  getUploadUri = () => this.attributes.upload_uri

}

export default FilePartUpload
