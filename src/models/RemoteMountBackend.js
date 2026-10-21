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
 * Class RemoteMountBackend
 */
class RemoteMountBackend {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # Path to the canary file used for health checks.
  getCanaryFilePath = () => this.attributes.canary_file_path

  setCanaryFilePath = value => {
    this.attributes.canary_file_path = value
    exposeAttributes(this, ['canary_file_path'])
  }

  // boolean # True if this backend is enabled.
  getEnabled = () => this.attributes.enabled

  setEnabled = value => {
    this.attributes.enabled = value
    exposeAttributes(this, ['enabled'])
  }

  // int64 # Number of consecutive failures before considering the backend unhealthy.
  getFall = () => this.attributes.fall

  setFall = value => {
    this.attributes.fall = value
    exposeAttributes(this, ['fall'])
  }

  // boolean # True if health checks are enabled for this backend.
  getHealthCheckEnabled = () => this.attributes.health_check_enabled

  setHealthCheckEnabled = value => {
    this.attributes.health_check_enabled = value
    exposeAttributes(this, ['health_check_enabled'])
  }

  // array(object) # Array of recent health check results.
  getHealthCheckResults = () => this.attributes.health_check_results

  setHealthCheckResults = value => {
    this.attributes.health_check_results = value
    exposeAttributes(this, ['health_check_results'])
  }

  // string # Type of health check to perform.
  getHealthCheckType = () => this.attributes.health_check_type

  setHealthCheckType = value => {
    this.attributes.health_check_type = value
    exposeAttributes(this, ['health_check_type'])
  }

  // int64 # Unique identifier for this backend.
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // int64 # Interval in seconds between health checks.
  getInterval = () => this.attributes.interval

  setInterval = value => {
    this.attributes.interval = value
    exposeAttributes(this, ['interval'])
  }

  // decimal # Minimum free CPU percentage required for this backend to be considered healthy.
  getMinFreeCpu = () => this.attributes.min_free_cpu

  setMinFreeCpu = value => {
    this.attributes.min_free_cpu = value
    exposeAttributes(this, ['min_free_cpu'])
  }

  // decimal # Minimum free memory percentage required for this backend to be considered healthy.
  getMinFreeMem = () => this.attributes.min_free_mem

  setMinFreeMem = value => {
    this.attributes.min_free_mem = value
    exposeAttributes(this, ['min_free_mem'])
  }

  // int64 # Priority of this backend.
  getPriority = () => this.attributes.priority

  setPriority = value => {
    this.attributes.priority = value
    exposeAttributes(this, ['priority'])
  }

  // string # Path on the remote server to treat as the root of this mount.
  getRemotePath = () => this.attributes.remote_path

  setRemotePath = value => {
    this.attributes.remote_path = value
    exposeAttributes(this, ['remote_path'])
  }

  // int64 # The remote server that this backend is associated with.
  getRemoteServerId = () => this.attributes.remote_server_id

  setRemoteServerId = value => {
    this.attributes.remote_server_id = value
    exposeAttributes(this, ['remote_server_id'])
  }

  // int64 # The mount ID of the Remote Server Mount that this backend is associated with.
  getRemoteServerMountId = () => this.attributes.remote_server_mount_id

  setRemoteServerMountId = value => {
    this.attributes.remote_server_mount_id = value
    exposeAttributes(this, ['remote_server_mount_id'])
  }

  // int64 # Number of consecutive successes before considering the backend healthy.
  getRise = () => this.attributes.rise

  setRise = value => {
    this.attributes.rise = value
    exposeAttributes(this, ['rise'])
  }

  // string # Status of this backend.
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // boolean # True if this backend is undergoing maintenance.
  getUndergoingMaintenance = () => this.attributes.undergoing_maintenance

  setUndergoingMaintenance = value => {
    this.attributes.undergoing_maintenance = value
    exposeAttributes(this, ['undergoing_maintenance'])
  }

  // Reset backend status to healthy
  resetStatus = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (isArray(params.enabled) || isObject(params.enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: enabled must be of type Boolean, received ${getType(params.enabled)}`)
    }

    if (params.fall !== undefined && params.fall !== null && !isInt(params.fall)) {
      throw new errors.InvalidParameterError(`Bad parameter: fall must be of type Int, received ${getType(params.fall)}`)
    }

    if (isArray(params.health_check_enabled) || isObject(params.health_check_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: health_check_enabled must be of type Boolean, received ${getType(params.health_check_enabled)}`)
    }

    if (params.health_check_type !== undefined && params.health_check_type !== null && !isString(params.health_check_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: health_check_type must be of type String, received ${getType(params.health_check_type)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isInt(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type Int, received ${getType(params.interval)}`)
    }

    if (params.priority !== undefined && params.priority !== null && !isInt(params.priority)) {
      throw new errors.InvalidParameterError(`Bad parameter: priority must be of type Int, received ${getType(params.priority)}`)
    }

    if (params.remote_path !== undefined && params.remote_path !== null && !isString(params.remote_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_path must be of type String, received ${getType(params.remote_path)}`)
    }

    if (params.rise !== undefined && params.rise !== null && !isInt(params.rise)) {
      throw new errors.InvalidParameterError(`Bad parameter: rise must be of type Int, received ${getType(params.rise)}`)
    }

    if (params.canary_file_path !== undefined && params.canary_file_path !== null && !isString(params.canary_file_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: canary_file_path must be of type String, received ${getType(params.canary_file_path)}`)
    }

    if (params.remote_server_id !== undefined && params.remote_server_id !== null && !isInt(params.remote_server_id)) {
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

    adoptAttributes(this, response?.data)
    return this
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
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
      await this.update(this.attributes)
      return true
    }

    const newObject = await RemoteMountBackend.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `remote_server_mount_id`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/remote_mount_backends', 'GET', params, options)

    return response?.data?.map(obj => new RemoteMountBackend(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    RemoteMountBackend.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      RemoteMountBackend.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Remote Mount Backend ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/remote_mount_backends/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new RemoteMountBackend(response?.data, retainedOptions(options))
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

    if (isArray(params.enabled) || isObject(params.enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: enabled must be of type Boolean, received ${getType(params.enabled)}`)
    }

    if (params.fall !== undefined && params.fall !== null && !isInt(params.fall)) {
      throw new errors.InvalidParameterError(`Bad parameter: fall must be of type Int, received ${getType(params.fall)}`)
    }

    if (isArray(params.health_check_enabled) || isObject(params.health_check_enabled)) {
      throw new errors.InvalidParameterError(`Bad parameter: health_check_enabled must be of type Boolean, received ${getType(params.health_check_enabled)}`)
    }

    if (params.health_check_type !== undefined && params.health_check_type !== null && !isString(params.health_check_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: health_check_type must be of type String, received ${getType(params.health_check_type)}`)
    }

    if (params.interval !== undefined && params.interval !== null && !isInt(params.interval)) {
      throw new errors.InvalidParameterError(`Bad parameter: interval must be of type Int, received ${getType(params.interval)}`)
    }

    if (params.priority !== undefined && params.priority !== null && !isInt(params.priority)) {
      throw new errors.InvalidParameterError(`Bad parameter: priority must be of type Int, received ${getType(params.priority)}`)
    }

    if (params.remote_path !== undefined && params.remote_path !== null && !isString(params.remote_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_path must be of type String, received ${getType(params.remote_path)}`)
    }

    if (params.rise !== undefined && params.rise !== null && !isInt(params.rise)) {
      throw new errors.InvalidParameterError(`Bad parameter: rise must be of type Int, received ${getType(params.rise)}`)
    }

    if (params.canary_file_path !== undefined && params.canary_file_path !== null && !isString(params.canary_file_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: canary_file_path must be of type String, received ${getType(params.canary_file_path)}`)
    }

    if (params.remote_server_mount_id !== undefined && params.remote_server_mount_id !== null && !isInt(params.remote_server_mount_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_server_mount_id must be of type Int, received ${getType(params.remote_server_mount_id)}`)
    }

    if (params.remote_server_id !== undefined && params.remote_server_id !== null && !isInt(params.remote_server_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: remote_server_id must be of type Int, received ${getType(params.remote_server_id)}`)
    }

    const response = await Api.sendRequest('/remote_mount_backends', 'POST', params, options)

    return new RemoteMountBackend(response?.data, retainedOptions(options))
  }
}

export default RemoteMountBackend

module.exports = RemoteMountBackend
module.exports.default = RemoteMountBackend
