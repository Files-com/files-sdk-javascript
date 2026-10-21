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
 * Class FormFieldSet
 */
class FormFieldSet {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Form field set id
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Title to be displayed
  getTitle = () => this.attributes.title

  setTitle = value => {
    this.attributes.title = value
    exposeAttributes(this, ['title'])
  }

  // boolean # Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
  getRequireCompleteMetadataCapture = () => this.attributes.require_complete_metadata_capture

  setRequireCompleteMetadataCapture = value => {
    this.attributes.require_complete_metadata_capture = value
    exposeAttributes(this, ['require_complete_metadata_capture'])
  }

  // array(int64) # Layout of the form
  getFormLayout = () => this.attributes.form_layout

  setFormLayout = value => {
    this.attributes.form_layout = value
    exposeAttributes(this, ['form_layout'])
  }

  // array(object) # Associated form field definitions; authenticated form field set responses include historical definitions, while form_layout identifies current fields
  getFormFields = () => this.attributes.form_fields

  setFormFields = value => {
    this.attributes.form_fields = value
    exposeAttributes(this, ['form_fields'])
  }

  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing name
  getSkipName = () => this.attributes.skip_name

  setSkipName = value => {
    this.attributes.skip_name = value
    exposeAttributes(this, ['skip_name'])
  }

  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing email
  getSkipEmail = () => this.attributes.skip_email

  setSkipEmail = value => {
    this.attributes.skip_email = value
    exposeAttributes(this, ['skip_email'])
  }

  // boolean # Any associated InboxRegistrations or BundleRegistrations can be saved without providing company
  getSkipCompany = () => this.attributes.skip_company

  setSkipCompany = value => {
    this.attributes.skip_company = value
    exposeAttributes(this, ['skip_company'])
  }

  // boolean # Form Field Set is in use by an active Inbox / Bundle / Inbox Registration / Bundle Registration
  getInUse = () => this.attributes.in_use

  setInUse = value => {
    this.attributes.in_use = value
    exposeAttributes(this, ['in_use'])
  }

  // int64 # User ID.  Provide a value of `0` to operate the current session's user.
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // int64 # Workspace ID
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // Parameters:
  //   title - string - Title to be displayed
  //   require_complete_metadata_capture - boolean - Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
  //   workspace_id - int64 - Workspace ID
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.title !== undefined && params.title !== null && !isString(params.title)) {
      throw new errors.InvalidParameterError(`Bad parameter: title must be of type String, received ${getType(params.title)}`)
    }

    if (isArray(params.require_complete_metadata_capture) || isObject(params.require_complete_metadata_capture)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_complete_metadata_capture must be of type Boolean, received ${getType(params.require_complete_metadata_capture)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.skip_email) || isObject(params.skip_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_email must be of type Boolean, received ${getType(params.skip_email)}`)
    }

    if (isArray(params.skip_name) || isObject(params.skip_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_name must be of type Boolean, received ${getType(params.skip_name)}`)
    }

    if (isArray(params.skip_company) || isObject(params.skip_company)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_company must be of type Boolean, received ${getType(params.skip_company)}`)
    }

    if (params.form_fields !== undefined && params.form_fields !== null && !isArray(params.form_fields)) {
      throw new errors.InvalidParameterError(`Bad parameter: form_fields must be of type Array, received ${getType(params.form_fields)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/form_field_sets/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/form_field_sets/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await FormFieldSet.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.cursor !== undefined && params.cursor !== null && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page !== undefined && params.per_page !== null && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/form_field_sets', 'GET', params, options)

    return response?.data?.map(obj => new FormFieldSet(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    FormFieldSet.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      FormFieldSet.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Form Field Set ID.
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

    const response = await Api.sendRequest(`/form_field_sets/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new FormFieldSet(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    FormFieldSet.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   title - string - Title to be displayed
  //   require_complete_metadata_capture - boolean - Reject answers over 1024 characters or more than 32 answered custom fields to ensure complete file metadata capture
  //   workspace_id - int64 - Workspace ID
  //   skip_email - boolean - Skip validating form email
  //   skip_name - boolean - Skip validating form name
  //   skip_company - boolean - Skip validating company
  //   form_fields - array(object)
  static create = async (params = {}, options = {}) => {
    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.title !== undefined && params.title !== null && !isString(params.title)) {
      throw new errors.InvalidParameterError(`Bad parameter: title must be of type String, received ${getType(params.title)}`)
    }

    if (isArray(params.require_complete_metadata_capture) || isObject(params.require_complete_metadata_capture)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_complete_metadata_capture must be of type Boolean, received ${getType(params.require_complete_metadata_capture)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (isArray(params.skip_email) || isObject(params.skip_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_email must be of type Boolean, received ${getType(params.skip_email)}`)
    }

    if (isArray(params.skip_name) || isObject(params.skip_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_name must be of type Boolean, received ${getType(params.skip_name)}`)
    }

    if (isArray(params.skip_company) || isObject(params.skip_company)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_company must be of type Boolean, received ${getType(params.skip_company)}`)
    }

    if (params.form_fields !== undefined && params.form_fields !== null && !isArray(params.form_fields)) {
      throw new errors.InvalidParameterError(`Bad parameter: form_fields must be of type Array, received ${getType(params.form_fields)}`)
    }

    const response = await Api.sendRequest('/form_field_sets', 'POST', params, options)

    return new FormFieldSet(response?.data, retainedOptions(options))
  }
}

export default FormFieldSet

module.exports = FormFieldSet
module.exports.default = FormFieldSet
