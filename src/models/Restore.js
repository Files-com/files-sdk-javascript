/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class Restore
 */
class Restore {
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

  // date-time # Restore all files deleted after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
  getEarliestDate = () => this.attributes.earliest_date

  setEarliestDate = value => {
    this.attributes.earliest_date = value
  }

  // int64 # Restore Record ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Number of directories that were successfully restored.
  getDirsRestored = () => this.attributes.dirs_restored

  setDirsRestored = value => {
    this.attributes.dirs_restored = value
  }

  // int64 # Number of directories that were not able to be restored.
  getDirsErrored = () => this.attributes.dirs_errored

  setDirsErrored = value => {
    this.attributes.dirs_errored = value
  }

  // int64 # Total number of directories processed.
  getDirsTotal = () => this.attributes.dirs_total

  setDirsTotal = value => {
    this.attributes.dirs_total = value
  }

  // int64 # Number of files successfully restored.
  getFilesRestored = () => this.attributes.files_restored

  setFilesRestored = value => {
    this.attributes.files_restored = value
  }

  // int64 # Number of files that were not able to be restored.
  getFilesErrored = () => this.attributes.files_errored

  setFilesErrored = value => {
    this.attributes.files_errored = value
  }

  // int64 # Total number of files processed.
  getFilesTotal = () => this.attributes.files_total

  setFilesTotal = value => {
    this.attributes.files_total = value
  }

  // string # Prefix of the files/folders to restore. To restore a folder, add a trailing slash to the folder name. Do not use a leading slash. To restore all deleted items, specify an empty string (`''`) in the prefix field or omit the field from the request.
  getPrefix = () => this.attributes.prefix

  setPrefix = value => {
    this.attributes.prefix = value
  }

  // boolean # If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
  getRestoreInPlace = () => this.attributes.restore_in_place

  setRestoreInPlace = value => {
    this.attributes.restore_in_place = value
  }

  // boolean # If true, we will also restore any Permissions that match the same path prefix from the same dates.
  getRestoreDeletedPermissions = () => this.attributes.restore_deleted_permissions

  setRestoreDeletedPermissions = value => {
    this.attributes.restore_deleted_permissions = value
  }

  // string # Status of the restoration process.
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // boolean # If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
  getUpdateTimestamps = () => this.attributes.update_timestamps

  setUpdateTimestamps = value => {
    this.attributes.update_timestamps = value
  }

  // array(string) # Error messages received while restoring files and/or directories. Only present if there were errors.
  getErrorMessages = () => this.attributes.error_messages

  setErrorMessages = value => {
    this.attributes.error_messages = value
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The Restore object doesn\'t support updates.')
    } else {
      const newObject = await Restore.create(this.attributes, this.options)
      this.attributes = { ...newObject.attributes }
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/restores', 'GET', params, options)

    return response?.data?.map(obj => new Restore(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Restore.list(params, options)

  // Parameters:
  //   earliest_date (required) - string - Restore all files deleted after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
  //   prefix - string - Prefix of the files/folders to restore. To restore a folder, add a trailing slash to the folder name. Do not use a leading slash. To restore all deleted items, specify an empty string (`''`) in the prefix field or omit the field from the request.
  //   restore_deleted_permissions - boolean - If true, we will also restore any Permissions that match the same path prefix from the same dates.
  //   restore_in_place - boolean - If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
  //   update_timestamps - boolean - If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
  static create = async (params = {}, options = {}) => {
    if (!params.earliest_date) {
      throw new errors.MissingParameterError('Parameter missing: earliest_date')
    }

    if (params.earliest_date && !isString(params.earliest_date)) {
      throw new errors.InvalidParameterError(`Bad parameter: earliest_date must be of type String, received ${getType(params.earliest_date)}`)
    }

    if (params.prefix && !isString(params.prefix)) {
      throw new errors.InvalidParameterError(`Bad parameter: prefix must be of type String, received ${getType(params.prefix)}`)
    }

    const response = await Api.sendRequest('/restores', 'POST', params, options)

    return new Restore(response?.data, options)
  }
}

export default Restore

module.exports = Restore
module.exports.default = Restore
