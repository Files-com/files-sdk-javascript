import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class FormFieldSet
 */
class FormFieldSet {
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
  // int64 # Form field set id
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Title to be displayed
  getTitle = () => this.attributes.title

  setTitle = value => {
    this.attributes.title = value
  }

  // array # Layout of the form
  getFormLayout = () => this.attributes.form_layout

  setFormLayout = value => {
    this.attributes.form_layout = value
  }

  // array # Associated form fields
  getFormFields = () => this.attributes.form_fields

  setFormFields = value => {
    this.attributes.form_fields = value
  }

  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing name
  getSkipName = () => this.attributes.skip_name

  setSkipName = value => {
    this.attributes.skip_name = value
  }

  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing email
  getSkipEmail = () => this.attributes.skip_email

  setSkipEmail = value => {
    this.attributes.skip_email = value
  }

  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing company
  getSkipCompany = () => this.attributes.skip_company

  setSkipCompany = value => {
    this.attributes.skip_company = value
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }


  // Parameters:
  //   title - string - Title to be displayed
  //   skip_email - boolean - Skip validating form email
  //   skip_name - boolean - Skip validating form name
  //   skip_company - boolean - Skip validating company
  //   form_fields - array(object)
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['title'] && !isString(params['title'])) {
      throw new errors.InvalidParameterError(`Bad parameter: title must be of type String, received ${getType(title)}`)
    }
    if (params['form_fields'] && !isArray(params['form_fields'])) {
      throw new errors.InvalidParameterError(`Bad parameter: form_fields must be of type Array, received ${getType(form_fields)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/form_field_sets/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new FormFieldSet(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/form_field_sets/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = FormFieldSet.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/form_field_sets`, 'GET', params, options)

    return response?.data?.map(obj => new FormFieldSet(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    FormFieldSet.list(params, options)

  // Parameters:
  //   id (required) - int64 - Form Field Set ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params['id'] = id

    if (!params['id']) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params['id'] && !isInt(params['id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params['id'])}`)
    }

    const response = await Api.sendRequest(`/form_field_sets/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new FormFieldSet(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    FormFieldSet.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   title - string - Title to be displayed
  //   skip_email - boolean - Skip validating form email
  //   skip_name - boolean - Skip validating form name
  //   skip_company - boolean - Skip validating company
  //   form_fields - array(object)
  static create = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['title'] && !isString(params['title'])) {
      throw new errors.InvalidParameterError(`Bad parameter: title must be of type String, received ${getType(params['title'])}`)
    }

    if (params['form_fields'] && !isArray(params['form_fields'])) {
      throw new errors.InvalidParameterError(`Bad parameter: form_fields must be of type Array, received ${getType(params['form_fields'])}`)
    }

    const response = await Api.sendRequest(`/form_field_sets`, 'POST', params, options)

    return new FormFieldSet(response?.data, options)
  }
}

export default FormFieldSet
