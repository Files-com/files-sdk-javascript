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
 * Class Restore
 */
class Restore {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // date-time # Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
  getEarliestDate = () => this.attributes.earliest_date

  setEarliestDate = value => {
    this.attributes.earliest_date = value
    exposeAttributes(this, ['earliest_date'])
  }

  // int64 # Restore Record ID.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Number of directories that were successfully restored.
  getDirsRestored = () => this.attributes.dirs_restored

  setDirsRestored = value => {
    this.attributes.dirs_restored = value
    exposeAttributes(this, ['dirs_restored'])
  }

  // int64 # Number of directories that were not able to be restored.
  getDirsErrored = () => this.attributes.dirs_errored

  setDirsErrored = value => {
    this.attributes.dirs_errored = value
    exposeAttributes(this, ['dirs_errored'])
  }

  // int64 # Total number of directories processed.
  getDirsTotal = () => this.attributes.dirs_total

  setDirsTotal = value => {
    this.attributes.dirs_total = value
    exposeAttributes(this, ['dirs_total'])
  }

  // int64 # Number of files successfully restored.
  getFilesRestored = () => this.attributes.files_restored

  setFilesRestored = value => {
    this.attributes.files_restored = value
    exposeAttributes(this, ['files_restored'])
  }

  // int64 # Number of files that were not able to be restored.
  getFilesErrored = () => this.attributes.files_errored

  setFilesErrored = value => {
    this.attributes.files_errored = value
    exposeAttributes(this, ['files_errored'])
  }

  // int64 # Total number of files processed.
  getFilesTotal = () => this.attributes.files_total

  setFilesTotal = value => {
    this.attributes.files_total = value
    exposeAttributes(this, ['files_total'])
  }

  // string # Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not use a leading slash. To restore all deleted items of the selected restoration type within the selected site or workspace scope, specify an empty string (`''`) or omit the field.
  getPrefix = () => this.attributes.prefix

  setPrefix = value => {
    this.attributes.prefix = value
    exposeAttributes(this, ['prefix'])
  }

  // string # Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
  getRestorationType = () => this.attributes.restoration_type

  setRestorationType = value => {
    this.attributes.restoration_type = value
    exposeAttributes(this, ['restoration_type'])
  }

  // boolean # If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
  getRestoreInPlace = () => this.attributes.restore_in_place

  setRestoreInPlace = value => {
    this.attributes.restore_in_place = value
    exposeAttributes(this, ['restore_in_place'])
  }

  // boolean # If true, a user restore restores permissions deleted along with the selected users, including permissions removed independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`, remain deleted. An in-place file restore restores user and group permissions on returned folders and their subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including permissions removed independently within that window. File restores into a new folder do not restore permissions.
  getRestoreDeletedPermissions = () => this.attributes.restore_deleted_permissions

  setRestoreDeletedPermissions = value => {
    this.attributes.restore_deleted_permissions = value
    exposeAttributes(this, ['restore_deleted_permissions'])
  }

  // int64 # Number of users successfully restored (only present for `restoration_type=users`).
  getUsersRestored = () => this.attributes.users_restored

  setUsersRestored = value => {
    this.attributes.users_restored = value
    exposeAttributes(this, ['users_restored'])
  }

  // int64 # Number of users that failed to restore (only present for `restoration_type=users`).
  getUsersErrored = () => this.attributes.users_errored

  setUsersErrored = value => {
    this.attributes.users_errored = value
    exposeAttributes(this, ['users_errored'])
  }

  // int64 # Total number of users processed (only present for `restoration_type=users`).
  getUsersTotal = () => this.attributes.users_total

  setUsersTotal = value => {
    this.attributes.users_total = value
    exposeAttributes(this, ['users_total'])
  }

  // int64 # Number of API keys restored (only present for `restoration_type=users`).
  getApiKeysRestored = () => this.attributes.api_keys_restored

  setApiKeysRestored = value => {
    this.attributes.api_keys_restored = value
    exposeAttributes(this, ['api_keys_restored'])
  }

  // int64 # Number of public keys restored (only present for `restoration_type=users`).
  getPublicKeysRestored = () => this.attributes.public_keys_restored

  setPublicKeysRestored = value => {
    this.attributes.public_keys_restored = value
    exposeAttributes(this, ['public_keys_restored'])
  }

  // int64 # Number of two factor authentication methods restored (only present for `restoration_type=users`).
  getTwoFactorAuthenticationMethodsRestored = () => this.attributes.two_factor_authentication_methods_restored

  setTwoFactorAuthenticationMethodsRestored = value => {
    this.attributes.two_factor_authentication_methods_restored = value
    exposeAttributes(this, ['two_factor_authentication_methods_restored'])
  }

  // string # Status of the restoration process.
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // boolean # If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
  getUpdateTimestamps = () => this.attributes.update_timestamps

  setUpdateTimestamps = value => {
    this.attributes.update_timestamps = value
    exposeAttributes(this, ['update_timestamps'])
  }

  // int64 # Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // array(string) # Error messages received while restoring files and/or directories. Only present if there were errors.
  getErrorMessages = () => this.attributes.error_messages

  setErrorMessages = value => {
    this.attributes.error_messages = value
    exposeAttributes(this, ['error_messages'])
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The Restore object doesn\'t support updates.')
    } else {
      const newObject = await Restore.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `restoration_type`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/restores', 'GET', params, options)

    return response?.data?.map(obj => new Restore(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Restore.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Restore.list(pageParams, pageOptions))

  // Parameters:
  //   earliest_date (required) - string - Restore files or users deleted on or after this date/time. Don't set this earlier than you need. Can not be greater than 365 days prior to the restore request.
  //   prefix - string - Prefix of the files/folders to restore, or a case-insensitive username prefix for a user restore. A trailing slash selects that folder and its contents only; without it, the prefix matches any path beginning with that text. Do not use a leading slash. To restore all deleted items of the selected restoration type within the selected site or workspace scope, specify an empty string (`''`) or omit the field.
  //   restoration_type - string - Type of restoration to perform. `files` restores deleted filesystem items. `users` restores deleted users and associated authentication records, plus permissions when `restore_deleted_permissions=true`. A 5-minute grace period allows for batch deletion processes: associated records deleted within the 5 minutes before the user are included, even if removed independently. Records deleted earlier, or before `earliest_date`, remain deleted.
  //   restore_deleted_permissions - boolean - If true, a user restore restores permissions deleted along with the selected users, including permissions removed independently within the 5 minutes before user deletion. Permissions deleted earlier, or before `earliest_date`, remain deleted. An in-place file restore restores user and group permissions on returned folders and their subfolders that were deleted from the time of the folder's deletion through 24 hours afterward, including permissions removed independently within that window. File restores into a new folder do not restore permissions.
  //   restore_in_place - boolean - If true, we will restore the files in place (into their original paths). If false, we will create a new restoration folder in the root and restore files there.
  //   update_timestamps - boolean - If true, we will update the last modified timestamp of restored files to today's date. If false, we might trigger File Expiration to delete the file again.
  //   workspace_id - int64 - Workspace ID for a workspace-scoped restore. `0` means the default site-wide scope.
  static create = async (params = {}, options = {}) => {
    if (!params.earliest_date) {
      throw new errors.MissingParameterError('Parameter missing: earliest_date')
    }

    if (params.earliest_date !== undefined && params.earliest_date !== null && !isString(params.earliest_date)) {
      throw new errors.InvalidParameterError(`Bad parameter: earliest_date must be of type String, received ${getType(params.earliest_date)}`)
    }

    if (params.prefix !== undefined && params.prefix !== null && !isString(params.prefix)) {
      throw new errors.InvalidParameterError(`Bad parameter: prefix must be of type String, received ${getType(params.prefix)}`)
    }

    if (params.restoration_type !== undefined && params.restoration_type !== null && !isString(params.restoration_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: restoration_type must be of type String, received ${getType(params.restoration_type)}`)
    }

    if (isArray(params.restore_deleted_permissions) || isObject(params.restore_deleted_permissions)) {
      throw new errors.InvalidParameterError(`Bad parameter: restore_deleted_permissions must be of type Boolean, received ${getType(params.restore_deleted_permissions)}`)
    }

    if (isArray(params.restore_in_place) || isObject(params.restore_in_place)) {
      throw new errors.InvalidParameterError(`Bad parameter: restore_in_place must be of type Boolean, received ${getType(params.restore_in_place)}`)
    }

    if (isArray(params.update_timestamps) || isObject(params.update_timestamps)) {
      throw new errors.InvalidParameterError(`Bad parameter: update_timestamps must be of type Boolean, received ${getType(params.update_timestamps)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/restores', 'POST', params, options)

    return new Restore(response?.data, retainedOptions(options))
  }
}

export default Restore

module.exports = Restore
module.exports.default = Restore
