import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Preview
 */
class Preview {
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
  // int64 # Preview ID
  getId = () => this.attributes.id

  // string # Preview status.  Can be invalid, not_generated, generating, complete, or file_too_large
  getStatus = () => this.attributes.status

  // string # Link to download preview
  getDownloadUri = () => this.attributes.download_uri

  // string # Preview type. Can be image, pdf, pdf_native, video, or audio
  getType = () => this.attributes.type

  // string # Preview size
  getSize = () => this.attributes.size

}

export default Preview
