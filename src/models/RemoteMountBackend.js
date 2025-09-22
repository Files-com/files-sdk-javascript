/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class RemoteMountBackend
 */
class RemoteMountBackend {
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

  // string # Path to the canary file used for health checks.
  getCanaryFilePath = () => this.attributes.canary_file_path

  setCanaryFilePath = value => {
    this.attributes.canary_file_path = value
  }

  // boolean # True if this backend is enabled.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
  }

  // int64 # Number of consecutive failures before considering the backend unhealthy.
  getFall = () => this.attributes.fall

  setFall = value => {
    this.attributes.fall = value
  }

  // boolean # True if health checks are enabled for this backend.
  getHealthCheckEnabled = () => this.attributes.health_check_enabled

  setHealthCheckEnabled = value => {
    this.attributes.health_check_enabled = value
  }

  // array(object) # Array of recent health check results.
  getHealthCheckResults = () => this.attributes.health_check_results

  setHealthCheckResults = value => {
    this.attributes.health_check_results = value
  }

  // string # Type of health check to perform.
  getHealthCheckType = () => this.attributes.health_check_type

  setHealthCheckType = value => {
    this.attributes.health_check_type = value
  }

  // int64 # Unique identifier for this backend.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // int64 # Interval in seconds between health checks.
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
  }

  // double # Minimum free CPU percentage required for this backend to be considered healthy.
  getMinFreeCpu = () => this.attributes.min_free_cpu

  setMinFreeCpu = value => {
    this.attributes.min_free_cpu = value
  }

  // double # Minimum free memory percentage required for this backend to be considered healthy.
  getMinFreeMem = () => this.attributes.min_free_mem

  setMinFreeMem = value => {
    this.attributes.min_free_mem = value
  }

  // int64 # Priority of this backend.
  getPriority = () => this.attributes.priority

  setPriority = value => {
    this.attributes.priority = value
  }

  // string # Path on the remote server to treat as the root of this mount.
  getRemotePath = () => this.attributes.remote_path

  setRemotePath = value => {
    this.attributes.remote_path = value
  }

  // int64 # The remote server that this backend is associated with.
  getRemoteServerId = () => this.attributes.remote_server_id

  setRemoteServerId = value => {
    this.attributes.remote_server_id = value
  }

  // int64 # The mount ID of the Remote Server Mount that this backend is associated with.
  getRemoteServerMountId = () => this.attributes.remote_server_mount_id

  setRemoteServerMountId = value => {
    this.attributes.remote_server_mount_id = value
  }

  // int64 # Number of consecutive successes before considering the backend healthy.
  getRise = () => this.attributes.rise

  setRise = value => {
    this.attributes.rise = value
  }

  // string # Status of this backend.
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // boolean # True if this backend is undergoing maintenance.
  getUndergoingMaintenance = () => this.attributes.undergoing_maintenance

  setUndergoingMaintenance = value => {
    this.attributes.undergoing_maintenance = value
  }

  // Reset backend status to healthy
  resetStatus = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/remote_mount_backends/${encodeURIComponent(params.id)}/reset_status`, 'POST', params, this.options)
  }

  // Parameters:
  //   enabled - boolean - True if this backend is enabled.
  //   fall - int64 - Number of consecutive failures before considering the backend unhealthy.
  //   health_check_enabled - boolean - True if health checks are enabled for this backend.
  //   health_check_type - string - Type of health check to perform.
  //   interval - int64 - Interval in seconds between health checks.
  //   min_free_cpu - double - Minimum free CPU percentage required for this backend to be considered healthy.
  //   min_free_mem - double - Minimum free memory percentage required for this backend to be considered healthy.
  //   priority - int64 - Priority of this backend.
  //   remote_path - string - Path on the remote server to treat as the root of this mount.
  //   rise - int64 - Number of consecutive successes before considering the backend healthy.
  //   canary_file_path - string - Path to the canary file used for health checks.
  //   remote_server_id - int64 - The remote server that this backend is associated with.
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.fall && !isInt(params.fall)) {
      throw new errors.InvalidParameterError(`Bad parameter: fall must be of type Int, received ${getType(params.fall)}`)
    }

    if (params.health_check_type && !isString(params.health_check_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: health_check_type must be of type String, received ${getType(params.health_check_type)}`)
    }

    if (params.interval && !isInt(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type Int, received ${getType(params.interval)}`)
    }

    if (params.priority && !isInt(params.priority)) {
      throw new errors.InvalidParameterError(`Bad parameter: priority must be of type Int, received ${getType(params.priority)}`)
    }

    if (params.remote_path && !isString(params.remote_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_path must be of type String, received ${getType(params.remote_path)}`)
    }

    if (params.rise && !isInt(params.rise)) {
      throw new errors.InvalidParameterError(`Bad parameter: rise must be of type Int, received ${getType(params.rise)}`)
    }

    if (params.canary_file_path && !isString(params.canary_file_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: canary_file_path must be of type String, received ${getType(params.canary_file_path)}`)
    }

    if (params.remote_server_id && !isInt(params.remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_server_id must be of type Int, received ${getType(params.remote_server_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/remote_mount_backends/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new RemoteMountBackend(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/remote_mount_backends/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await RemoteMountBackend.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `remote_server_mount_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/remote_mount_backends', 'GET', params, options)

    return response?.data?.map(obj => new RemoteMountBackend(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    RemoteMountBackend.list(params, options)

  // Parameters:
  //   id (required) - int64 - Remote Mount Backend ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/remote_mount_backends/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new RemoteMountBackend(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    RemoteMountBackend.find(id, params, options)

  // Parameters:
  //   enabled - boolean - True if this backend is enabled.
  //   fall - int64 - Number of consecutive failures before considering the backend unhealthy.
  //   health_check_enabled - boolean - True if health checks are enabled for this backend.
  //   health_check_type - string - Type of health check to perform.
  //   interval - int64 - Interval in seconds between health checks.
  //   min_free_cpu - double - Minimum free CPU percentage required for this backend to be considered healthy.
  //   min_free_mem - double - Minimum free memory percentage required for this backend to be considered healthy.
  //   priority - int64 - Priority of this backend.
  //   remote_path - string - Path on the remote server to treat as the root of this mount.
  //   rise - int64 - Number of consecutive successes before considering the backend healthy.
  //   canary_file_path (required) - string - Path to the canary file used for health checks.
  //   remote_server_mount_id (required) - int64 - The mount ID of the Remote Server Mount that this backend is associated with.
  //   remote_server_id (required) - int64 - The remote server that this backend is associated with.
  static create = async (params = {}, options = {}) => {
    if (!params.canary_file_path) {
      throw new errors.MissingParameterError('Parameter missing: canary_file_path')
    }

    if (!params.remote_server_mount_id) {
      throw new errors.MissingParameterError('Parameter missing: remote_server_mount_id')
    }

    if (!params.remote_server_id) {
      throw new errors.MissingParameterError('Parameter missing: remote_server_id')
    }

    if (params.fall && !isInt(params.fall)) {
      throw new errors.InvalidParameterError(`Bad parameter: fall must be of type Int, received ${getType(params.fall)}`)
    }

    if (params.health_check_type && !isString(params.health_check_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: health_check_type must be of type String, received ${getType(params.health_check_type)}`)
    }

    if (params.interval && !isInt(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type Int, received ${getType(params.interval)}`)
    }

    if (params.priority && !isInt(params.priority)) {
      throw new errors.InvalidParameterError(`Bad parameter: priority must be of type Int, received ${getType(params.priority)}`)
    }

    if (params.remote_path && !isString(params.remote_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_path must be of type String, received ${getType(params.remote_path)}`)
    }

    if (params.rise && !isInt(params.rise)) {
      throw new errors.InvalidParameterError(`Bad parameter: rise must be of type Int, received ${getType(params.rise)}`)
    }

    if (params.canary_file_path && !isString(params.canary_file_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: canary_file_path must be of type String, received ${getType(params.canary_file_path)}`)
    }

    if (params.remote_server_mount_id && !isInt(params.remote_server_mount_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_server_mount_id must be of type Int, received ${getType(params.remote_server_mount_id)}`)
    }

    if (params.remote_server_id && !isInt(params.remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_server_id must be of type Int, received ${getType(params.remote_server_id)}`)
    }

    const response = await Api.sendRequest('/remote_mount_backends', 'POST', params, options)

    return new RemoteMountBackend(response?.data, options)
  }
}

export default RemoteMountBackend

module.exports = RemoteMountBackend
module.exports.default = RemoteMountBackend
