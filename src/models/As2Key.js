import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class As2Key
 */
class As2Key {
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

  // int64 # AS2 Key ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # AS2 Partnership Name
  getAs2PartnershipName = () => this.attributes.as2_partnership_name

  setAs2PartnershipName = value => {
    this.attributes.as2_partnership_name = value
  }

  // date-time # AS2 Key created at date/time
  getCreatedAt = () => this.attributes.created_at

  // string # Public key fingerprint
  getFingerprint = () => this.attributes.fingerprint

  setFingerprint = value => {
    this.attributes.fingerprint = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Actual contents of Public key.
  getPublicKey = () => this.attributes.public_key

  setPublicKey = value => {
    this.attributes.public_key = value
  }


  // Parameters:
  //   as2_partnership_name (required) - string - AS2 Partnership Name
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['as2_partnership_name'] && !isString(params['as2_partnership_name'])) {
      throw new Error(`Bad parameter: as2_partnership_name must be of type String, received ${getType(as2_partnership_name)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    if (!params['as2_partnership_name']) {
      if (this.attributes.as2_partnership_name) {
        params['as2_partnership_name'] = this.as2_partnership_name
      } else {
        throw new Error('Parameter missing: as2_partnership_name')
      }
    }

    return Api.sendRequest(`/as2_keys/' . params['id'] . '`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no ID')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/as2_keys/' . params['id'] . '`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = As2Key.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  //   cursor - string - Send cursor to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    const response = await Api.sendRequest(`/as2_keys`, 'GET', params, options)

    return response?.data?.map(obj => new As2Key(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    As2Key.list(params, options)

  // Parameters:
  //   id (required) - int64 - As2 Key ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new Error('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    const response = await Api.sendRequest(`/as2_keys/' . params['id'] . '`, 'GET', params, options)

    return new As2Key(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    As2Key.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   as2_partnership_name (required) - string - AS2 Partnership Name
  //   public_key (required) - string - Actual contents of Public key.
  static create = async (params = {}, options = {}) => {
    if (!params['as2_partnership_name']) {
      throw new Error('Parameter missing: as2_partnership_name')
    }

    if (!params['public_key']) {
      throw new Error('Parameter missing: public_key')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['as2_partnership_name'] && !isString(params['as2_partnership_name'])) {
      throw new Error(`Bad parameter: as2_partnership_name must be of type String, received ${getType(as2_partnership_name)}`)
    }

    if (params['public_key'] && !isString(params['public_key'])) {
      throw new Error(`Bad parameter: public_key must be of type String, received ${getType(public_key)}`)
    }

    const response = await Api.sendRequest(`/as2_keys`, 'POST', params, options)

    return new As2Key(response?.data, options)
  }
}

export default As2Key
