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
 * Class Bundle
 */
class Bundle {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # Bundle code.  This code forms the end part of the Public URL.
  getCode = () => this.attributes.code

  setCode = value => {
    this.attributes.code = value
    exposeAttributes(this, ['code'])
  }

  // string # Page link and button color
  getColorLeft = () => this.attributes.color_left

  setColorLeft = value => {
    this.attributes.color_left = value
    exposeAttributes(this, ['color_left'])
  }

  // string # Top bar link color
  getColorLink = () => this.attributes.color_link

  setColorLink = value => {
    this.attributes.color_link = value
    exposeAttributes(this, ['color_link'])
  }

  // string # Page link and button color
  getColorText = () => this.attributes.color_text

  setColorText = value => {
    this.attributes.color_text = value
    exposeAttributes(this, ['color_text'])
  }

  // string # Top bar background color
  getColorTop = () => this.attributes.color_top

  setColorTop = value => {
    this.attributes.color_top = value
    exposeAttributes(this, ['color_top'])
  }

  // string # Top bar text color
  getColorTopText = () => this.attributes.color_top_text

  setColorTopText = value => {
    this.attributes.color_top_text = value
    exposeAttributes(this, ['color_top_text'])
  }

  // string # Public URL of Share Link
  getUrl = () => this.attributes.url

  setUrl = value => {
    this.attributes.url = value
    exposeAttributes(this, ['url'])
  }

  // string # Public description
  getDescription = () => this.attributes.description

  setDescription = value => {
    this.attributes.description = value
    exposeAttributes(this, ['description'])
  }

  // date-time # Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply.
  getExpiresAt = () => this.attributes.expires_at

  setExpiresAt = value => {
    this.attributes.expires_at = value
    exposeAttributes(this, ['expires_at'])
  }

  // boolean # Is this bundle password protected?
  getPasswordProtected = () => this.attributes.password_protected

  setPasswordProtected = value => {
    this.attributes.password_protected = value
    exposeAttributes(this, ['password_protected'])
  }

  // string # Permissions that apply to Folders in this Share Link.
  getPermissions = () => this.attributes.permissions

  setPermissions = value => {
    this.attributes.permissions = value
    exposeAttributes(this, ['permissions'])
  }

  // boolean
  getPreviewOnly = () => this.attributes.preview_only

  setPreviewOnly = value => {
    this.attributes.preview_only = value
    exposeAttributes(this, ['preview_only'])
  }

  // boolean # Show a registration page that captures the downloader's name and email address?
  getRequireRegistration = () => this.attributes.require_registration

  setRequireRegistration = value => {
    this.attributes.require_registration = value
    exposeAttributes(this, ['require_registration'])
  }

  // boolean # Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  getRequireShareRecipient = () => this.attributes.require_share_recipient

  setRequireShareRecipient = value => {
    this.attributes.require_share_recipient = value
    exposeAttributes(this, ['require_share_recipient'])
  }

  // boolean # If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log back in every time they visit the page.
  getRequireLogout = () => this.attributes.require_logout

  setRequireLogout = value => {
    this.attributes.require_logout = value
    exposeAttributes(this, ['require_logout'])
  }

  // string # Legal text that must be agreed to prior to accessing Bundle.
  getClickwrapBody = () => this.attributes.clickwrap_body

  setClickwrapBody = value => {
    this.attributes.clickwrap_body = value
    exposeAttributes(this, ['clickwrap_body'])
  }

  // FormFieldSet # Custom Form to use
  getFormFieldSet = () => this.attributes.form_field_set

  setFormFieldSet = value => {
    this.attributes.form_field_set = value
    exposeAttributes(this, ['form_field_set'])
  }

  // boolean # BundleRegistrations can be saved without providing name?
  getSkipName = () => this.attributes.skip_name

  setSkipName = value => {
    this.attributes.skip_name = value
    exposeAttributes(this, ['skip_name'])
  }

  // boolean # BundleRegistrations can be saved without providing email?
  getSkipEmail = () => this.attributes.skip_email

  setSkipEmail = value => {
    this.attributes.skip_email = value
    exposeAttributes(this, ['skip_email'])
  }

  // date-time # Date when share will start to be accessible. If `nil` access granted right after create.
  getStartAccessOnDate = () => this.attributes.start_access_on_date

  setStartAccessOnDate = value => {
    this.attributes.start_access_on_date = value
    exposeAttributes(this, ['start_access_on_date'])
  }

  // boolean # BundleRegistrations can be saved without providing company?
  getSkipCompany = () => this.attributes.skip_company

  setSkipCompany = value => {
    this.attributes.skip_company = value
    exposeAttributes(this, ['skip_company'])
  }

  // int64 # Bundle ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // boolean # If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this.
  getBypassesSiteExpirationRules = () => this.attributes.bypasses_site_expiration_rules

  setBypassesSiteExpirationRules = value => {
    this.attributes.bypasses_site_expiration_rules = value
    exposeAttributes(this, ['bypasses_site_expiration_rules'])
  }

  // date-time # Bundle created at date/time
  getCreatedAt = () => this.attributes.created_at

  // boolean # Indicates if the bundle has been deleted.
  getDeleted = () => this.attributes.deleted

  setDeleted = value => {
    this.attributes.deleted = value
    exposeAttributes(this, ['deleted'])
  }

  // date-time # Bundle deleted at date/time
  getDeletedAt = () => this.attributes.deleted_at

  setDeletedAt = value => {
    this.attributes.deleted_at = value
    exposeAttributes(this, ['deleted_at'])
  }

  // boolean # Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  getDontSeparateSubmissionsByFolder = () => this.attributes.dont_separate_submissions_by_folder

  setDontSeparateSubmissionsByFolder = value => {
    this.attributes.dont_separate_submissions_by_folder = value
    exposeAttributes(this, ['dont_separate_submissions_by_folder'])
  }

  // date-time # Read-only expiration date/time, using the explicit expiration or the site-wide setting when applicable. Null when the Share Link does not expire.
  getEffectiveExpiresAt = () => this.attributes.effective_expires_at

  setEffectiveExpiresAt = value => {
    this.attributes.effective_expires_at = value
    exposeAttributes(this, ['effective_expires_at'])
  }

  // int64 # Maximum number of times bundle can be accessed
  getMaxUses = () => this.attributes.max_uses

  setMaxUses = value => {
    this.attributes.max_uses = value
    exposeAttributes(this, ['max_uses'])
  }

  // string # Internal name for identifying this Share Link.
  getInternalName = () => this.attributes.internal_name

  setInternalName = value => {
    this.attributes.internal_name = value
    exposeAttributes(this, ['internal_name'])
  }

  // string # Bundle internal note
  getNote = () => this.attributes.note

  setNote = value => {
    this.attributes.note = value
    exposeAttributes(this, ['note'])
  }

  // string # Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime` directives, and any custom form data.
  getPathTemplate = () => this.attributes.path_template

  setPathTemplate = value => {
    this.attributes.path_template = value
    exposeAttributes(this, ['path_template'])
  }

  // string # Timezone to use when rendering timestamps in path templates.
  getPathTemplateTimeZone = () => this.attributes.path_template_time_zone

  setPathTemplateTimeZone = value => {
    this.attributes.path_template_time_zone = value
    exposeAttributes(this, ['path_template_time_zone'])
  }

  // boolean # Send delivery receipt to the uploader. Note: For writable share only
  getSendEmailReceiptToUploader = () => this.attributes.send_email_receipt_to_uploader

  setSendEmailReceiptToUploader = value => {
    this.attributes.send_email_receipt_to_uploader = value
    exposeAttributes(this, ['send_email_receipt_to_uploader'])
  }

  // int64 # ID of the snapshot containing this bundle's contents.
  getSnapshotId = () => this.attributes.snapshot_id

  setSnapshotId = value => {
    this.attributes.snapshot_id = value
    exposeAttributes(this, ['snapshot_id'])
  }

  // int64 # Bundle creator user ID
  getUserId = () => this.attributes.user_id

  setUserId = value => {
    this.attributes.user_id = value
    exposeAttributes(this, ['user_id'])
  }

  // string # Bundle creator username
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
    exposeAttributes(this, ['username'])
  }

  // int64 # Owning group ID. If set, members of this group can view, edit, and share this Share Link.
  getGroupId = () => this.attributes.group_id

  setGroupId = value => {
    this.attributes.group_id = value
    exposeAttributes(this, ['group_id'])
  }

  // int64 # ID of the clickwrap to use with this bundle.
  getClickwrapId = () => this.attributes.clickwrap_id

  setClickwrapId = value => {
    this.attributes.clickwrap_id = value
    exposeAttributes(this, ['clickwrap_id'])
  }

  // int64 # ID of the associated inbox, if available.
  getInboxId = () => this.attributes.inbox_id

  setInboxId = value => {
    this.attributes.inbox_id = value
    exposeAttributes(this, ['inbox_id'])
  }

  // Image # Preview watermark image applied to all bundle items.
  getWatermarkAttachment = () => this.attributes.watermark_attachment

  setWatermarkAttachment = value => {
    this.attributes.watermark_attachment = value
    exposeAttributes(this, ['watermark_attachment'])
  }

  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  getWatermarkValue = () => this.attributes.watermark_value

  setWatermarkValue = value => {
    this.attributes.watermark_value = value
    exposeAttributes(this, ['watermark_value'])
  }

  // boolean # If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot be enabled if the bundle has a password set.
  getSendOneTimePasswordToRecipientAtRegistration = () => this.attributes.send_one_time_password_to_recipient_at_registration

  setSendOneTimePasswordToRecipientAtRegistration = value => {
    this.attributes.send_one_time_password_to_recipient_at_registration = value
    exposeAttributes(this, ['send_one_time_password_to_recipient_at_registration'])
  }

  // int64 # Workspace ID. `0` means the default workspace.
  getWorkspaceId = () => this.attributes.workspace_id

  setWorkspaceId = value => {
    this.attributes.workspace_id = value
    exposeAttributes(this, ['workspace_id'])
  }

  // boolean # Does this bundle have an associated inbox?
  getHasInbox = () => this.attributes.has_inbox

  setHasInbox = value => {
    this.attributes.has_inbox = value
    exposeAttributes(this, ['has_inbox'])
  }

  // boolean # Should folder uploads be prevented?
  getDontAllowFoldersInUploads = () => this.attributes.dont_allow_folders_in_uploads

  setDontAllowFoldersInUploads = value => {
    this.attributes.dont_allow_folders_in_uploads = value
    exposeAttributes(this, ['dont_allow_folders_in_uploads'])
  }

  // array(object) # Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination subfolder name.
  getRequestedUploadSlots = () => this.attributes.requested_upload_slots

  setRequestedUploadSlots = value => {
    this.attributes.requested_upload_slots = value
    exposeAttributes(this, ['requested_upload_slots'])
  }

  // array(string) # A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles.
  getPaths = () => this.attributes.paths

  setPaths = value => {
    this.attributes.paths = value
    exposeAttributes(this, ['paths'])
  }

  // array(object) # A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles.
  getBundlepaths = () => this.attributes.bundlepaths

  setBundlepaths = value => {
    this.attributes.bundlepaths = value
    exposeAttributes(this, ['bundlepaths'])
  }

  // string # Password for this bundle.
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
    exposeAttributes(this, ['password'])
  }

  // int64 # Id of Form Field Set to use with this bundle
  getFormFieldSetId = () => this.attributes.form_field_set_id

  setFormFieldSetId = value => {
    this.attributes.form_field_set_id = value
    exposeAttributes(this, ['form_field_set_id'])
  }

  // boolean # If true, create a snapshot of this bundle's contents.
  getCreateSnapshot = () => this.attributes.create_snapshot

  setCreateSnapshot = value => {
    this.attributes.create_snapshot = value
    exposeAttributes(this, ['create_snapshot'])
  }

  // boolean # If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  getFinalizeSnapshot = () => this.attributes.finalize_snapshot

  setFinalizeSnapshot = value => {
    this.attributes.finalize_snapshot = value
    exposeAttributes(this, ['finalize_snapshot'])
  }

  // file # Preview watermark image applied to all bundle items.
  getWatermarkAttachmentFile = () => this.attributes.watermark_attachment_file

  setWatermarkAttachmentFile = value => {
    this.attributes.watermark_attachment_file = value
    exposeAttributes(this, ['watermark_attachment_file'])
  }

  // boolean # If true, will delete the file stored in watermark_attachment
  getWatermarkAttachmentDelete = () => this.attributes.watermark_attachment_delete

  setWatermarkAttachmentDelete = value => {
    this.attributes.watermark_attachment_delete = value
    exposeAttributes(this, ['watermark_attachment_delete'])
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

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.id = this.attributes.id
    if (params.id !== undefined && params.id !== null && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.to !== undefined && params.to !== null && !isArray(params.to)) {
      throw new errors.InvalidParameterError(`Bad parameter: to must be of type Array, received ${getType(params.to)}`)
    }

    if (params.note !== undefined && params.note !== null && !isString(params.note)) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(params.note)}`)
    }

    if (params.recipients !== undefined && params.recipients !== null && !isArray(params.recipients)) {
      throw new errors.InvalidParameterError(`Bad parameter: recipients must be of type Array, received ${getType(params.recipients)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/bundles/${encodeURIComponent(params.id)}/share`, 'POST', params, this.options)
  }

  // Parameters:
  //   paths - array(string) - A list of paths to include in this bundle.
  //   password - string - Password for this bundle.
  //   bypasses_site_expiration_rules - boolean - If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this.
  //   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
  //   clickwrap_id - int64 - ID of the clickwrap to use with this bundle.
  //   code - string - Bundle code.  This code forms the end part of the Public URL.
  //   create_snapshot - boolean - If true, create a snapshot of this bundle's contents.
  //   description - string - Public description
  //   dont_separate_submissions_by_folder - boolean - Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  //   expires_at - string - Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply.
  //   finalize_snapshot - boolean - If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  //   inbox_id - int64 - ID of the associated inbox, if available.
  //   max_uses - int64 - Maximum number of times bundle can be accessed
  //   group_id - int64 - Owning group ID. If set, members of this group can view, edit, and share this Share Link.
  //   internal_name - string - Internal name for identifying this Share Link.
  //   note - string - Bundle internal note
  //   path_template - string - Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime` directives, and any custom form data.
  //   path_template_time_zone - string - Timezone to use when rendering timestamps in path templates.
  //   permissions - string - Permissions that apply to Folders in this Share Link.
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  //   send_one_time_password_to_recipient_at_registration - boolean - If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot be enabled if the bundle has a password set.
  //   send_email_receipt_to_uploader - boolean - Send delivery receipt to the uploader. Note: For writable share only
  //   skip_company - boolean - BundleRegistrations can be saved without providing company?
  //   start_access_on_date - string - Date when share will start to be accessible. If `nil` access granted right after create.
  //   skip_email - boolean - BundleRegistrations can be saved without providing email?
  //   skip_name - boolean - BundleRegistrations can be saved without providing name?
  //   user_id - int64 - The owning user id. Only site admins can set this.
  //   watermark_attachment_delete - boolean - If true, will delete the file stored in watermark_attachment
  //   watermark_attachment_file - file - Preview watermark image applied to all bundle items.
  //   watermark_value - object - Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
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

    if (params.paths !== undefined && params.paths !== null && !isArray(params.paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(params.paths)}`)
    }

    if (params.password !== undefined && params.password !== null && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (isArray(params.bypasses_site_expiration_rules) || isObject(params.bypasses_site_expiration_rules)) {
      throw new errors.InvalidParameterError(`Bad parameter: bypasses_site_expiration_rules must be of type Boolean, received ${getType(params.bypasses_site_expiration_rules)}`)
    }

    if (params.form_field_set_id !== undefined && params.form_field_set_id !== null && !isInt(params.form_field_set_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: form_field_set_id must be of type Int, received ${getType(params.form_field_set_id)}`)
    }

    if (params.clickwrap_id !== undefined && params.clickwrap_id !== null && !isInt(params.clickwrap_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: clickwrap_id must be of type Int, received ${getType(params.clickwrap_id)}`)
    }

    if (params.code !== undefined && params.code !== null && !isString(params.code)) {
      throw new errors.InvalidParameterError(`Bad parameter: code must be of type String, received ${getType(params.code)}`)
    }

    if (isArray(params.create_snapshot) || isObject(params.create_snapshot)) {
      throw new errors.InvalidParameterError(`Bad parameter: create_snapshot must be of type Boolean, received ${getType(params.create_snapshot)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (isArray(params.dont_separate_submissions_by_folder) || isObject(params.dont_separate_submissions_by_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: dont_separate_submissions_by_folder must be of type Boolean, received ${getType(params.dont_separate_submissions_by_folder)}`)
    }

    if (params.expires_at !== undefined && params.expires_at !== null && !isString(params.expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params.expires_at)}`)
    }

    if (isArray(params.finalize_snapshot) || isObject(params.finalize_snapshot)) {
      throw new errors.InvalidParameterError(`Bad parameter: finalize_snapshot must be of type Boolean, received ${getType(params.finalize_snapshot)}`)
    }

    if (params.inbox_id !== undefined && params.inbox_id !== null && !isInt(params.inbox_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: inbox_id must be of type Int, received ${getType(params.inbox_id)}`)
    }

    if (params.max_uses !== undefined && params.max_uses !== null && !isInt(params.max_uses)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_uses must be of type Int, received ${getType(params.max_uses)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.internal_name !== undefined && params.internal_name !== null && !isString(params.internal_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: internal_name must be of type String, received ${getType(params.internal_name)}`)
    }

    if (params.note !== undefined && params.note !== null && !isString(params.note)) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(params.note)}`)
    }

    if (params.path_template !== undefined && params.path_template !== null && !isString(params.path_template)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_template must be of type String, received ${getType(params.path_template)}`)
    }

    if (params.path_template_time_zone !== undefined && params.path_template_time_zone !== null && !isString(params.path_template_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_template_time_zone must be of type String, received ${getType(params.path_template_time_zone)}`)
    }

    if (params.permissions !== undefined && params.permissions !== null && !isString(params.permissions)) {
      throw new errors.InvalidParameterError(`Bad parameter: permissions must be of type String, received ${getType(params.permissions)}`)
    }

    if (isArray(params.require_registration) || isObject(params.require_registration)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_registration must be of type Boolean, received ${getType(params.require_registration)}`)
    }

    if (isArray(params.require_share_recipient) || isObject(params.require_share_recipient)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_share_recipient must be of type Boolean, received ${getType(params.require_share_recipient)}`)
    }

    if (isArray(params.send_one_time_password_to_recipient_at_registration) || isObject(params.send_one_time_password_to_recipient_at_registration)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_one_time_password_to_recipient_at_registration must be of type Boolean, received ${getType(params.send_one_time_password_to_recipient_at_registration)}`)
    }

    if (isArray(params.send_email_receipt_to_uploader) || isObject(params.send_email_receipt_to_uploader)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_email_receipt_to_uploader must be of type Boolean, received ${getType(params.send_email_receipt_to_uploader)}`)
    }

    if (isArray(params.skip_company) || isObject(params.skip_company)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_company must be of type Boolean, received ${getType(params.skip_company)}`)
    }

    if (params.start_access_on_date !== undefined && params.start_access_on_date !== null && !isString(params.start_access_on_date)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_access_on_date must be of type String, received ${getType(params.start_access_on_date)}`)
    }

    if (isArray(params.skip_email) || isObject(params.skip_email)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_email must be of type Boolean, received ${getType(params.skip_email)}`)
    }

    if (isArray(params.skip_name) || isObject(params.skip_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: skip_name must be of type Boolean, received ${getType(params.skip_name)}`)
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (isArray(params.watermark_attachment_delete) || isObject(params.watermark_attachment_delete)) {
      throw new errors.InvalidParameterError(`Bad parameter: watermark_attachment_delete must be of type Boolean, received ${getType(params.watermark_attachment_delete)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/bundles/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

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

    await Api.sendRequest(`/bundles/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      await this.update(this.attributes)
      return true
    }

    const newObject = await Bundle.create(this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `expires_at`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `expires_at`, `code`, `group_id`, `user_id` or `bypasses_site_expiration_rules`. Valid field combinations are `[ group_id, expires_at ]` and `[ user_id, expires_at ]`.
  //   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at` and `expires_at`.
  //   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at` and `expires_at`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `code`.
  //   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at` and `expires_at`.
  //   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at` and `expires_at`.
  //   deleted - boolean - If true, only list deleted Share Links.
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

    if (isArray(params.deleted) || isObject(params.deleted)) {
      throw new errors.InvalidParameterError(`Bad parameter: deleted must be of type Boolean, received ${getType(params.deleted)}`)
    }

    const response = await Api.sendRequest('/bundles', 'GET', params, options)

    return response?.data?.map(obj => new Bundle(obj, retainedOptions(options))) || []
  }

  static all = (params = {}, options = {}) =>
    Bundle.list(params, options)

  // The items list() lists, one at a time: an async iterator that requests each page
  // through list() only once the items before it have been taken (see Api._iterate).
  static listIterator = (params = {}, options = {}) =>
    Api._iterate(params, options, (pageParams, pageOptions) =>
      Bundle.list(pageParams, pageOptions))

  // Parameters:
  //   id (required) - int64 - Bundle ID.
  //   deleted - boolean - If true, show a deleted Share Link.
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

    if (isArray(params.deleted) || isObject(params.deleted)) {
      throw new errors.InvalidParameterError(`Bad parameter: deleted must be of type Boolean, received ${getType(params.deleted)}`)
    }

    const response = await Api.sendRequest(`/bundles/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new Bundle(response?.data, retainedOptions(options))
  }

  static get = (id, params = {}, options = {}) =>
    Bundle.find(id, params, options)

  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   paths (required) - array(string) - A list of paths to include in this bundle.
  //   password - string - Password for this bundle.
  //   bypasses_site_expiration_rules - boolean - If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this.
  //   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
  //   create_snapshot - boolean - If true, create a snapshot of this bundle's contents.
  //   dont_separate_submissions_by_folder - boolean - Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  //   expires_at - string - Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply.
  //   finalize_snapshot - boolean - If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  //   max_uses - int64 - Maximum number of times bundle can be accessed
  //   group_id - int64 - Owning group ID. If set, members of this group can view, edit, and share this Share Link.
  //   internal_name - string - Internal name for identifying this Share Link.
  //   description - string - Public description
  //   note - string - Bundle internal note
  //   code - string - Bundle code.  This code forms the end part of the Public URL.
  //   path_template - string - Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime` directives, and any custom form data.
  //   path_template_time_zone - string - Timezone to use when rendering timestamps in path templates.
  //   permissions - string - Permissions that apply to Folders in this Share Link.
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   clickwrap_id - int64 - ID of the clickwrap to use with this bundle.
  //   inbox_id - int64 - ID of the associated inbox, if available.
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  //   send_one_time_password_to_recipient_at_registration - boolean - If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot be enabled if the bundle has a password set.
  //   send_email_receipt_to_uploader - boolean - Send delivery receipt to the uploader. Note: For writable share only
  //   skip_email - boolean - BundleRegistrations can be saved without providing email?
  //   skip_name - boolean - BundleRegistrations can be saved without providing name?
  //   skip_company - boolean - BundleRegistrations can be saved without providing company?
  //   start_access_on_date - string - Date when share will start to be accessible. If `nil` access granted right after create.
  //   snapshot_id - int64 - ID of the snapshot containing this bundle's contents.
  //   workspace_id - int64 - Workspace ID. `0` means the default workspace.
  //   watermark_attachment_file - file - Preview watermark image applied to all bundle items.
  //   watermark_value - object - Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  static create = async (params = {}, options = {}) => {
    if (!params.paths) {
      throw new errors.MissingParameterError('Parameter missing: paths')
    }

    if (params.user_id !== undefined && params.user_id !== null && !isInt(params.user_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: user_id must be of type Int, received ${getType(params.user_id)}`)
    }

    if (params.paths !== undefined && params.paths !== null && !isArray(params.paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(params.paths)}`)
    }

    if (params.password !== undefined && params.password !== null && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (isArray(params.bypasses_site_expiration_rules) || isObject(params.bypasses_site_expiration_rules)) {
      throw new errors.InvalidParameterError(`Bad parameter: bypasses_site_expiration_rules must be of type Boolean, received ${getType(params.bypasses_site_expiration_rules)}`)
    }

    if (params.form_field_set_id !== undefined && params.form_field_set_id !== null && !isInt(params.form_field_set_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: form_field_set_id must be of type Int, received ${getType(params.form_field_set_id)}`)
    }

    if (isArray(params.create_snapshot) || isObject(params.create_snapshot)) {
      throw new errors.InvalidParameterError(`Bad parameter: create_snapshot must be of type Boolean, received ${getType(params.create_snapshot)}`)
    }

    if (isArray(params.dont_separate_submissions_by_folder) || isObject(params.dont_separate_submissions_by_folder)) {
      throw new errors.InvalidParameterError(`Bad parameter: dont_separate_submissions_by_folder must be of type Boolean, received ${getType(params.dont_separate_submissions_by_folder)}`)
    }

    if (params.expires_at !== undefined && params.expires_at !== null && !isString(params.expires_at)) {
      throw new errors.InvalidParameterError(`Bad parameter: expires_at must be of type String, received ${getType(params.expires_at)}`)
    }

    if (isArray(params.finalize_snapshot) || isObject(params.finalize_snapshot)) {
      throw new errors.InvalidParameterError(`Bad parameter: finalize_snapshot must be of type Boolean, received ${getType(params.finalize_snapshot)}`)
    }

    if (params.max_uses !== undefined && params.max_uses !== null && !isInt(params.max_uses)) {
      throw new errors.InvalidParameterError(`Bad parameter: max_uses must be of type Int, received ${getType(params.max_uses)}`)
    }

    if (params.group_id !== undefined && params.group_id !== null && !isInt(params.group_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: group_id must be of type Int, received ${getType(params.group_id)}`)
    }

    if (params.internal_name !== undefined && params.internal_name !== null && !isString(params.internal_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: internal_name must be of type String, received ${getType(params.internal_name)}`)
    }

    if (params.description !== undefined && params.description !== null && !isString(params.description)) {
      throw new errors.InvalidParameterError(`Bad parameter: description must be of type String, received ${getType(params.description)}`)
    }

    if (params.note !== undefined && params.note !== null && !isString(params.note)) {
      throw new errors.InvalidParameterError(`Bad parameter: note must be of type String, received ${getType(params.note)}`)
    }

    if (params.code !== undefined && params.code !== null && !isString(params.code)) {
      throw new errors.InvalidParameterError(`Bad parameter: code must be of type String, received ${getType(params.code)}`)
    }

    if (params.path_template !== undefined && params.path_template !== null && !isString(params.path_template)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_template must be of type String, received ${getType(params.path_template)}`)
    }

    if (params.path_template_time_zone !== undefined && params.path_template_time_zone !== null && !isString(params.path_template_time_zone)) {
      throw new errors.InvalidParameterError(`Bad parameter: path_template_time_zone must be of type String, received ${getType(params.path_template_time_zone)}`)
    }

    if (params.permissions !== undefined && params.permissions !== null && !isString(params.permissions)) {
      throw new errors.InvalidParameterError(`Bad parameter: permissions must be of type String, received ${getType(params.permissions)}`)
    }

    if (isArray(params.require_registration) || isObject(params.require_registration)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_registration must be of type Boolean, received ${getType(params.require_registration)}`)
    }

    if (params.clickwrap_id !== undefined && params.clickwrap_id !== null && !isInt(params.clickwrap_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: clickwrap_id must be of type Int, received ${getType(params.clickwrap_id)}`)
    }

    if (params.inbox_id !== undefined && params.inbox_id !== null && !isInt(params.inbox_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: inbox_id must be of type Int, received ${getType(params.inbox_id)}`)
    }

    if (isArray(params.require_share_recipient) || isObject(params.require_share_recipient)) {
      throw new errors.InvalidParameterError(`Bad parameter: require_share_recipient must be of type Boolean, received ${getType(params.require_share_recipient)}`)
    }

    if (isArray(params.send_one_time_password_to_recipient_at_registration) || isObject(params.send_one_time_password_to_recipient_at_registration)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_one_time_password_to_recipient_at_registration must be of type Boolean, received ${getType(params.send_one_time_password_to_recipient_at_registration)}`)
    }

    if (isArray(params.send_email_receipt_to_uploader) || isObject(params.send_email_receipt_to_uploader)) {
      throw new errors.InvalidParameterError(`Bad parameter: send_email_receipt_to_uploader must be of type Boolean, received ${getType(params.send_email_receipt_to_uploader)}`)
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

    if (params.start_access_on_date !== undefined && params.start_access_on_date !== null && !isString(params.start_access_on_date)) {
      throw new errors.InvalidParameterError(`Bad parameter: start_access_on_date must be of type String, received ${getType(params.start_access_on_date)}`)
    }

    if (params.snapshot_id !== undefined && params.snapshot_id !== null && !isInt(params.snapshot_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: snapshot_id must be of type Int, received ${getType(params.snapshot_id)}`)
    }

    if (params.workspace_id !== undefined && params.workspace_id !== null && !isInt(params.workspace_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: workspace_id must be of type Int, received ${getType(params.workspace_id)}`)
    }

    const response = await Api.sendRequest('/bundles', 'POST', params, options)

    return new Bundle(response?.data, retainedOptions(options))
  }
}

export default Bundle

module.exports = Bundle
module.exports.default = Bundle
