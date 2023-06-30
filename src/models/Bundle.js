import Api from '../Api'
import * as errors from '../Errors'
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

  // date-time # Bundle expiration date/time
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
  }

  // boolean # Is this bundle password protected?
  getPasswordProtected = () => this.attributes.password_protected

  setPasswordProtected = value => {
    this.attributes.password_protected = value
  }

  // string # Permissions that apply to Folders in this Share Link.
  getPermissions = () => this.attributes.permissions

  setPermissions = value => {
    this.attributes.permissions = value
  }

  // boolean # DEPRECATED: Restrict users to previewing files only. Use `permissions` instead.
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

  // boolean # If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log back in every time they visit the page.
  getRequireLogout = () => this.attributes.require_logout

  setRequireLogout = value => {
    this.attributes.require_logout = value
  }

  // string # Legal text that must be agreed to prior to accessing Bundle.
  getClickwrapBody = () => this.attributes.clickwrap_body

  setClickwrapBody = value => {
    this.attributes.clickwrap_body = value
  }

  // FormFieldSet # Custom Form to use
  getFormFieldSet = () => this.attributes.form_field_set

  setFormFieldSet = value => {
    this.attributes.form_field_set = value
  }

  // boolean # BundleRegistrations can be saved without providing name?
  getSkipName = () => this.attributes.skip_name

  setSkipName = value => {
    this.attributes.skip_name = value
  }

  // boolean # BundleRegistrations can be saved without providing email?
  getSkipEmail = () => this.attributes.skip_email

  setSkipEmail = value => {
    this.attributes.skip_email = value
  }

  // boolean # BundleRegistrations can be saved without providing company?
  getSkipCompany = () => this.attributes.skip_company

  setSkipCompany = value => {
    this.attributes.skip_company = value
  }

  // int64 # Bundle ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // date-time # Bundle created at date/time
  getCreatedAt = () => this.attributes.created_at

  // boolean # Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  getDontSeparateSubmissionsByFolder = () => this.attributes.dont_separate_submissions_by_folder

  setDontSeparateSubmissionsByFolder = value => {
    this.attributes.dont_separate_submissions_by_folder = value
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

  // string # Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, and any custom form data.
  getPathTemplate = () => this.attributes.path_template

  setPathTemplate = value => {
    this.attributes.path_template = value
  }

  // boolean # Send delivery receipt to the uploader. Note: For writable share only
  getSendEmailReceiptToUploader = () => this.attributes.send_email_receipt_to_uploader

  setSendEmailReceiptToUploader = value => {
    this.attributes.send_email_receipt_to_uploader = value
  }

  // int64 # ID of the snapshot containing this bundle's contents.
  getSnapshotId = () => this.attributes.snapshot_id

  setSnapshotId = value => {
    this.attributes.snapshot_id = value
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

  // Image # Preview watermark image applied to all bundle items.
  getWatermarkAttachment = () => this.attributes.watermark_attachment

  setWatermarkAttachment = value => {
    this.attributes.watermark_attachment = value
  }

  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  getWatermarkValue = () => this.attributes.watermark_value

  setWatermarkValue = value => {
    this.attributes.watermark_value = value
  }

  // boolean # Does this bundle have an associated inbox?
  getHasInbox = () => this.attributes.has_inbox

  setHasInbox = value => {
    this.attributes.has_inbox = value
  }

  // array # A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles.
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

  // boolean # If true, create a snapshot of this bundle's contents.
  getCreateSnapshot = () => this.attributes.create_snapshot

  setCreateSnapshot = value => {
    this.attributes.create_snapshot = value
  }

  // boolean # If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  getFinalizeSnapshot = () => this.attributes.finalize_snapshot

  setFinalizeSnapshot = value => {
    this.attributes.finalize_snapshot = value
  }

  // file # Preview watermark image applied to all bundle items.
  getWatermarkAttachmentFile = () => this.attributes.watermark_attachment_file

  setWatermarkAttachmentFile = value => {
    this.attributes.watermark_attachment_file = value
  }

  // boolean # If true, will delete the file stored in watermark_attachment
  getWatermarkAttachmentDelete = () => this.attributes.watermark_attachment_delete

  setWatermarkAttachmentDelete = value => {
    this.attributes.watermark_attachment_delete = value
  }


  // Send email(s) with a link to bundle
  //
  // Parameters:
  //   to - array(string) - A list of email addresses to share this bundle with. Required unless `recipients` is used.
  //   note - string - Note to include in email.
  //   recipients - array(object) - A list of recipients to share this bundle with. Required unless `to` is used.
  share = async (params = {}) => {
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
    if (params['to'] && !isArray(params['to'])) {
      throw new errors.InvalidParameterError(`Bad parameter: to must be of type Array, received ${getType(to)}`)
    }
    if (params['note'] && !isString(params['note'])) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(note)}`)
    }
    if (params['recipients'] && !isArray(params['recipients'])) {
      throw new errors.InvalidParameterError(`Bad parameter: recipients must be of type Array, received ${getType(recipients)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/bundles/${encodeURIComponent(params['id'])}/share`, 'POST', params, this.options)

    return response?.data
  }

  // Parameters:
  //   paths - array(string) - A list of paths to include in this bundle.
  //   password - string - Password for this bundle.
  //   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
  //   clickwrap_id - int64 - ID of the clickwrap to use with this bundle.
  //   code - string - Bundle code.  This code forms the end part of the Public URL.
  //   create_snapshot - boolean - If true, create a snapshot of this bundle's contents.
  //   description - string - Public description
  //   dont_separate_submissions_by_folder - boolean - Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  //   expires_at - string - Bundle expiration date/time
  //   finalize_snapshot - boolean - If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  //   inbox_id - int64 - ID of the associated inbox, if available.
  //   max_uses - int64 - Maximum number of times bundle can be accessed
  //   note - string - Bundle internal note
  //   path_template - string - Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, and any custom form data.
  //   permissions - string - Permissions that apply to Folders in this Share Link.
  //   preview_only - boolean - DEPRECATED: Restrict users to previewing files only. Use `permissions` instead.
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  //   send_email_receipt_to_uploader - boolean - Send delivery receipt to the uploader. Note: For writable share only
  //   skip_company - boolean - BundleRegistrations can be saved without providing company?
  //   skip_email - boolean - BundleRegistrations can be saved without providing email?
  //   skip_name - boolean - BundleRegistrations can be saved without providing name?
  //   watermark_attachment_delete - boolean - If true, will delete the file stored in watermark_attachment
  //   watermark_attachment_file - file - Preview watermark image applied to all bundle items.
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
    if (params['paths'] && !isArray(params['paths'])) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(paths)}`)
    }
    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }
    if (params['form_field_set_id'] && !isInt(params['form_field_set_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: form_field_set_id must be of type Int, received ${getType(form_field_set_id)}`)
    }
    if (params['clickwrap_id'] && !isInt(params['clickwrap_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: clickwrap_id must be of type Int, received ${getType(clickwrap_id)}`)
    }
    if (params['code'] && !isString(params['code'])) {
      throw new errors.InvalidParameterError(`Bad parameter: code must be of type String, received ${getType(code)}`)
    }
    if (params['description'] && !isString(params['description'])) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(description)}`)
    }
    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(expires_at)}`)
    }
    if (params['inbox_id'] && !isInt(params['inbox_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: inbox_id must be of type Int, received ${getType(inbox_id)}`)
    }
    if (params['max_uses'] && !isInt(params['max_uses'])) {
      throw new errors.InvalidParameterError(`Bad parameter: max_uses must be of type Int, received ${getType(max_uses)}`)
    }
    if (params['note'] && !isString(params['note'])) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(note)}`)
    }
    if (params['path_template'] && !isString(params['path_template'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path_template must be of type String, received ${getType(path_template)}`)
    }
    if (params['permissions'] && !isString(params['permissions'])) {
      throw new errors.InvalidParameterError(`Bad parameter: permissions must be of type String, received ${getType(permissions)}`)
    }

    if (!params['id']) {
      if (this.attributes.id) {
        params['id'] = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/bundles/${encodeURIComponent(params['id'])}`, 'PATCH', params, this.options)

    return new Bundle(response?.data, this.options)
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

    const response = await Api.sendRequest(`/bundles/${encodeURIComponent(params['id'])}`, 'DELETE', params, this.options)

    return response?.data
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
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[created_at]=desc`). Valid fields are `created_at` and `code`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at`.
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

    const response = await Api.sendRequest(`/bundles`, 'GET', params, options)

    return response?.data?.map(obj => new Bundle(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    Bundle.list(params, options)

  // Parameters:
  //   id (required) - int64 - Bundle ID.
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

    const response = await Api.sendRequest(`/bundles/${encodeURIComponent(params['id'])}`, 'GET', params, options)

    return new Bundle(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    Bundle.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   paths (required) - array(string) - A list of paths to include in this bundle.
  //   password - string - Password for this bundle.
  //   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
  //   create_snapshot - boolean - If true, create a snapshot of this bundle's contents.
  //   dont_separate_submissions_by_folder - boolean - Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  //   expires_at - string - Bundle expiration date/time
  //   finalize_snapshot - boolean - If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  //   max_uses - int64 - Maximum number of times bundle can be accessed
  //   description - string - Public description
  //   note - string - Bundle internal note
  //   code - string - Bundle code.  This code forms the end part of the Public URL.
  //   path_template - string - Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, and any custom form data.
  //   permissions - string - Permissions that apply to Folders in this Share Link.
  //   preview_only - boolean - DEPRECATED: Restrict users to previewing files only. Use `permissions` instead.
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   clickwrap_id - int64 - ID of the clickwrap to use with this bundle.
  //   inbox_id - int64 - ID of the associated inbox, if available.
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  //   send_email_receipt_to_uploader - boolean - Send delivery receipt to the uploader. Note: For writable share only
  //   skip_email - boolean - BundleRegistrations can be saved without providing email?
  //   skip_name - boolean - BundleRegistrations can be saved without providing name?
  //   skip_company - boolean - BundleRegistrations can be saved without providing company?
  //   snapshot_id - int64 - ID of the snapshot containing this bundle's contents.
  //   watermark_attachment_file - file - Preview watermark image applied to all bundle items.
  static create = async (params = {}, options = {}) => {
    if (!params['paths']) {
      throw new errors.MissingParameterError('Parameter missing: paths')
    }

    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params['user_id'])}`)
    }

    if (params['paths'] && !isArray(params['paths'])) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(params['paths'])}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params['password'])}`)
    }

    if (params['form_field_set_id'] && !isInt(params['form_field_set_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: form_field_set_id must be of type Int, received ${getType(params['form_field_set_id'])}`)
    }

    if (params['expires_at'] && !isString(params['expires_at'])) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params['expires_at'])}`)
    }

    if (params['max_uses'] && !isInt(params['max_uses'])) {
      throw new errors.InvalidParameterError(`Bad parameter: max_uses must be of type Int, received ${getType(params['max_uses'])}`)
    }

    if (params['description'] && !isString(params['description'])) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params['description'])}`)
    }

    if (params['note'] && !isString(params['note'])) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(params['note'])}`)
    }

    if (params['code'] && !isString(params['code'])) {
      throw new errors.InvalidParameterError(`Bad parameter: code must be of type String, received ${getType(params['code'])}`)
    }

    if (params['path_template'] && !isString(params['path_template'])) {
      throw new errors.InvalidParameterError(`Bad parameter: path_template must be of type String, received ${getType(params['path_template'])}`)
    }

    if (params['permissions'] && !isString(params['permissions'])) {
      throw new errors.InvalidParameterError(`Bad parameter: permissions must be of type String, received ${getType(params['permissions'])}`)
    }

    if (params['clickwrap_id'] && !isInt(params['clickwrap_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: clickwrap_id must be of type Int, received ${getType(params['clickwrap_id'])}`)
    }

    if (params['inbox_id'] && !isInt(params['inbox_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: inbox_id must be of type Int, received ${getType(params['inbox_id'])}`)
    }

    if (params['snapshot_id'] && !isInt(params['snapshot_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: snapshot_id must be of type Int, received ${getType(params['snapshot_id'])}`)
    }

    const response = await Api.sendRequest(`/bundles`, 'POST', params, options)

    return new Bundle(response?.data, options)
  }
}

export default Bundle
