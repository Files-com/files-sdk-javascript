/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import { getType, isArray, isInt, isObject, isString } from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class FileAction
 */
class FileAction {
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
  // string # Status of file operation.
  getStatus = () => this.attributes.status

  // int64 # If status is pending, this is the id of the FileMigration to check for status updates.
  getFileMigrationId = () => this.attributes.file_migration_id

}

export default FileAction

module.exports = FileAction
module.exports.default = FileAction
