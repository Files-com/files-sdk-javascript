import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class SyncJob
 */
class SyncJob {
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
  // date-time # Job enqueued at
  getQueuedAt = () => this.attributes.queued_at

  // date-time # Job updated at
  getUpdatedAt = () => this.attributes.updated_at

  // string # Status of the job
  getStatus = () => this.attributes.status

  // string # Most recent reported status of sync worker
  getRegionalWorkerStatus = () => this.attributes.regional_worker_status

  // string #
  getUuid = () => this.attributes.uuid

  // int64 #
  getFolderBehaviorId = () => this.attributes.folder_behavior_id


  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/sync_jobs`, 'GET', params, options)

    return response?.data?.map(obj => new SyncJob(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SyncJob.list(params, options)
}

export default SyncJob
