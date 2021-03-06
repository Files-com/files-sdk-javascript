import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Bundle
 */
class Bundle {
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
  // string # Bundle code.  This code forms the end part of the Public URL.
  getCode = () => this.attributes.code

  setCode = value => {
    this.attributes.code = value
  }

  // string # Public URL of Share Link
  getUrl = () => this.attributes.url

  setUrl = value => {
    this.attributes.url = value
  }

  // string # Public description
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
  }

  // boolean # Is this bundle password protected?
  getPasswordProtected = () => this.attributes.password_protected

  setPasswordProtected = value => {
    this.attributes.password_protected = value
  }

  // boolean # Restrict users to previewing files only?
  getPreviewOnly = () => this.attributes.preview_only

  setPreviewOnly = value => {
    this.attributes.preview_only = value
  }

  // boolean # Show a registration page that captures the downloader's name and email address?
  getRequireRegistration = () => this.attributes.require_registration

  setRequireRegistration = value => {
    this.attributes.require_registration = value
  }

  // boolean # Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  getRequireShareRecipient = () => this.attributes.require_share_recipient

  setRequireShareRecipient = value => {
    this.attributes.require_share_recipient = value
  }

  // string # Legal text that must be agreed to prior to accessing Bundle.
  getClickwrapBody = () => this.attributes.clickwrap_body

  setClickwrapBody = value => {
    this.attributes.clickwrap_body = value
  }

  // Custom Form to use
  getFormFieldSet = () => this.attributes.form_field_set

  setFormFieldSet = value => {
    this.attributes.form_field_set = value
  }

  // int64 # Bundle ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // date-time # Bundle created at date/time
  getCreatedAt = () => this.attributes.created_at

  // date-time # Bundle expiration date/time
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
  }

  // int64 # Maximum number of times bundle can be accessed
  getMaxUses = () => this.attributes.max_uses

  setMaxUses = value => {
    this.attributes.max_uses = value
  }

  // string # Bundle internal note
  getNote = () => this.attributes.note

  setNote = value => {
    this.attributes.note = value
  }

  // int64 # Bundle creator user ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
  }

  // string # Bundle creator username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // int64 # ID of the clickwrap to use with this bundle.
  getClickwrapId = () => this.attributes.clickwrap_id

  setClickwrapId = value => {
    this.attributes.clickwrap_id = value
  }

  // int64 # ID of the associated inbox, if available.
  getInboxId = () => this.attributes.inbox_id

  setInboxId = value => {
    this.attributes.inbox_id = value
  }

  // boolean # Does this bundle have an associated inbox?
  getHasInbox = () => this.attributes.has_inbox

  setHasInbox = value => {
    this.attributes.has_inbox = value
  }

  // array # A list of paths in this bundle
  getPaths = () => this.attributes.paths

  setPaths = value => {
    this.attributes.paths = value
  }

  // string # Password for this bundle.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
  }

  // int64 # Id of Form Field Set to use with this bundle
  getFormFieldSetId = () => this.attributes.form_field_set_id

  setFormFieldSetId = value => {
    this.attributes.form_field_set_id = value
  }


  // Send email(s) with a link to bundle
  //
  // Parameters:
  //   to - array(string) - A list of email addresses to share this bundle with. Required unless `recipients` is used.
  //   note - string - Note to include in email.
  //   recipients - array(object) - A list of recipients to share this bundle with. Required unless `to` is used.
  share = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['to'] && !isArray(params['to'])) {
      throw new Error(`Bad parameter: to must be of type Array, received ${getType(to)}`)
    }
    if (params['note'] && !isString(params['note'])) {
      throw new Error(`Bad parameter: note must be of type String, received ${getType(note)}`)
    }
    if (params['recipients'] && !isArray(params['recipients'])) {
      throw new Error(`Bad parameter: recipients must be of type Array, received ${getType(recipients)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/bundles/${params['id']}/share`, 'POST', params, this.options)
  }

  // Parameters:
  //   paths - array(string) - A list of paths to include in this bundle.
  //   password - string - Password for this bundle.
  //   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
  //   clickwrap_id - int64 - ID of the clickwrap to use with this bundle.
  //   code - string - Bundle code.  This code forms the end part of the Public URL.
  //   description - string - Public description
  //   expires_at - string - Bundle expiration date/time
  //   inbox_id - int64 - ID of the associated inbox, if available.
  //   max_uses - int64 - Maximum number of times bundle can be accessed
  //   note - string - Bundle internal note
  //   preview_only - boolean - Restrict users to previewing files only?
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
    }

    if (!isObject(params)) {
      throw new Error(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params['id'] && !isInt(params['id'])) {
      throw new Error(`Bad parameter: id must be of type Int, received ${getType(id)}`)
    }
    if (params['paths'] && !isArray(params['paths'])) {
      throw new Error(`Bad parameter: paths must be of type Array, received ${getType(paths)}`)
    }
    if (params['password'] && !isString(params['password'])) {
      throw new Error(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }
    if (params['form_field_set_id'] && !isInt(params['form_field_set_id'])) {
      throw new Error(`Bad parameter: form_field_set_id must be of type Int, received ${getType(form_field_set_id)}`)
    }
    if (params['clickwrap_id'] && !isInt(params['clickwrap_id'])) {
      throw new Error(`Bad parameter: clickwrap_id must be of type Int, received ${getType(clickwrap_id)}`)
    }
    if (params['code'] && !isString(params['code'])) {
      throw new Error(`Bad parameter: code must be of type String, received ${getType(code)}`)
    }
    if (params['description'] && !isString(params['description'])) {
      throw new Error(`Bad parameter: description must be of type String, received ${getType(description)}`)
    }
    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new Error(`Bad parameter: expires_at must be of type String, received ${getType(expires_at)}`)
    }
    if (params['inbox_id'] && !isInt(params['inbox_id'])) {
      throw new Error(`Bad parameter: inbox_id must be of type Int, received ${getType(inbox_id)}`)
    }
    if (params['max_uses'] && !isInt(params['max_uses'])) {
      throw new Error(`Bad parameter: max_uses must be of type Int, received ${getType(max_uses)}`)
    }
    if (params['note'] && !isString(params['note'])) {
      throw new Error(`Bad parameter: note must be of type String, received ${getType(note)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new Error('Parameter missing: id')
      }
    }

    return Api.sendRequest(`/bundles/${params['id']}`, 'PATCH', params, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new Error('Current object has no id')
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

    return Api.sendRequest(`/bundles/${params['id']}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = () => {
      if (this.attributes['id']) {
        return this.update(this.attributes)
      } else {
        const newObject = Bundle.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either 'asc' or 'desc' direction (e.g. sort_by[last_login_at]=desc). Valid fields are `created_at` and `code`.
  //   filter - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `created_at`.
  //   filter_gt - object - If set, return records where the specifiied field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specifiied field is greater than or equal to the supplied value. Valid fields are `created_at`.
  //   filter_like - object - If set, return records where the specifiied field is equal to the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specifiied field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specifiied field is less than or equal to the supplied value. Valid fields are `created_at`.
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    const response = await Api.sendRequest(`/bundles`, 'GET', params, options)

    return response?.data?.map(obj => new Bundle(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Bundle.list(params, options)

  // Parameters:
  //   id (required) - int64 - Bundle ID.
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

    const response = await Api.sendRequest(`/bundles/${params['id']}`, 'GET', params, options)

    return new Bundle(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Bundle.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   paths (required) - array(string) - A list of paths to include in this bundle.
  //   password - string - Password for this bundle.
  //   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
  //   expires_at - string - Bundle expiration date/time
  //   max_uses - int64 - Maximum number of times bundle can be accessed
  //   description - string - Public description
  //   note - string - Bundle internal note
  //   code - string - Bundle code.  This code forms the end part of the Public URL.
  //   preview_only - boolean - Restrict users to previewing files only?
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   clickwrap_id - int64 - ID of the clickwrap to use with this bundle.
  //   inbox_id - int64 - ID of the associated inbox, if available.
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  static create = async (params = {}, options = {}) => {
    if (!params['paths']) {
      throw new Error('Parameter missing: paths')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['paths'] && !isArray(params['paths'])) {
      throw new Error(`Bad parameter: paths must be of type Array, received ${getType(paths)}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new Error(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }

    if (params['form_field_set_id'] && !isInt(params['form_field_set_id'])) {
      throw new Error(`Bad parameter: form_field_set_id must be of type Int, received ${getType(form_field_set_id)}`)
    }

    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new Error(`Bad parameter: expires_at must be of type String, received ${getType(expires_at)}`)
    }

    if (params['max_uses'] && !isInt(params['max_uses'])) {
      throw new Error(`Bad parameter: max_uses must be of type Int, received ${getType(max_uses)}`)
    }

    if (params['description'] && !isString(params['description'])) {
      throw new Error(`Bad parameter: description must be of type String, received ${getType(description)}`)
    }

    if (params['note'] && !isString(params['note'])) {
      throw new Error(`Bad parameter: note must be of type String, received ${getType(note)}`)
    }

    if (params['code'] && !isString(params['code'])) {
      throw new Error(`Bad parameter: code must be of type String, received ${getType(code)}`)
    }

    if (params['clickwrap_id'] && !isInt(params['clickwrap_id'])) {
      throw new Error(`Bad parameter: clickwrap_id must be of type Int, received ${getType(clickwrap_id)}`)
    }

    if (params['inbox_id'] && !isInt(params['inbox_id'])) {
      throw new Error(`Bad parameter: inbox_id must be of type Int, received ${getType(inbox_id)}`)
    }

    const response = await Api.sendRequest(`/bundles`, 'POST', params, options)

    return new Bundle(response?.data, options)
  }
}

export default Bundle
