"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _Bundle;
var _excluded = ["signal"];
/* eslint-disable no-unused-vars */
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, default: e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
var exposeAttributes = function exposeAttributes(model, names) {
  names.forEach(function (name) {
    if (!(name in model)) {
      Object.defineProperty(model, name, {
        get: function get() {
          return model.attributes[name];
        }
      });
    }
  });
};

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
var adoptAttributes = function adoptAttributes(model) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var adopted = {};
  Object.entries(attributes).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];
    adopted[key.replace('?', '')] = value;
  });
  model.attributes = adopted;
  exposeAttributes(model, Object.keys(adopted));
};

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
var retainedOptions = function retainedOptions(options) {
  if (!(options !== null && options !== void 0 && options.client)) {
    return options;
  }
  var signal = options.signal,
    context = (0, _objectWithoutProperties2.default)(options, _excluded);
  return context;
};

/**
 * Class Bundle
 */
var Bundle = /*#__PURE__*/(0, _createClass2.default)(function Bundle() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, Bundle);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // string # Bundle code.  This code forms the end part of the Public URL.
  (0, _defineProperty2.default)(this, "getCode", function () {
    return _this.attributes.code;
  });
  (0, _defineProperty2.default)(this, "setCode", function (value) {
    _this.attributes.code = value;
    exposeAttributes(_this, ['code']);
  });
  // string # Page link and button color
  (0, _defineProperty2.default)(this, "getColorLeft", function () {
    return _this.attributes.color_left;
  });
  (0, _defineProperty2.default)(this, "setColorLeft", function (value) {
    _this.attributes.color_left = value;
    exposeAttributes(_this, ['color_left']);
  });
  // string # Top bar link color
  (0, _defineProperty2.default)(this, "getColorLink", function () {
    return _this.attributes.color_link;
  });
  (0, _defineProperty2.default)(this, "setColorLink", function (value) {
    _this.attributes.color_link = value;
    exposeAttributes(_this, ['color_link']);
  });
  // string # Page link and button color
  (0, _defineProperty2.default)(this, "getColorText", function () {
    return _this.attributes.color_text;
  });
  (0, _defineProperty2.default)(this, "setColorText", function (value) {
    _this.attributes.color_text = value;
    exposeAttributes(_this, ['color_text']);
  });
  // string # Top bar background color
  (0, _defineProperty2.default)(this, "getColorTop", function () {
    return _this.attributes.color_top;
  });
  (0, _defineProperty2.default)(this, "setColorTop", function (value) {
    _this.attributes.color_top = value;
    exposeAttributes(_this, ['color_top']);
  });
  // string # Top bar text color
  (0, _defineProperty2.default)(this, "getColorTopText", function () {
    return _this.attributes.color_top_text;
  });
  (0, _defineProperty2.default)(this, "setColorTopText", function (value) {
    _this.attributes.color_top_text = value;
    exposeAttributes(_this, ['color_top_text']);
  });
  // string # Public URL of Share Link
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
    exposeAttributes(_this, ['url']);
  });
  // string # Public description
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
    exposeAttributes(_this, ['description']);
  });
  // date-time # Explicit Bundle expiration date/time. If not set, the site-wide expiration setting may apply.
  (0, _defineProperty2.default)(this, "getExpiresAt", function () {
    return _this.attributes.expires_at;
  });
  (0, _defineProperty2.default)(this, "setExpiresAt", function (value) {
    _this.attributes.expires_at = value;
    exposeAttributes(_this, ['expires_at']);
  });
  // boolean # Is this bundle password protected?
  (0, _defineProperty2.default)(this, "getPasswordProtected", function () {
    return _this.attributes.password_protected;
  });
  (0, _defineProperty2.default)(this, "setPasswordProtected", function (value) {
    _this.attributes.password_protected = value;
    exposeAttributes(_this, ['password_protected']);
  });
  // string # Permissions that apply to Folders in this Share Link.
  (0, _defineProperty2.default)(this, "getPermissions", function () {
    return _this.attributes.permissions;
  });
  (0, _defineProperty2.default)(this, "setPermissions", function (value) {
    _this.attributes.permissions = value;
    exposeAttributes(_this, ['permissions']);
  });
  // boolean
  (0, _defineProperty2.default)(this, "getPreviewOnly", function () {
    return _this.attributes.preview_only;
  });
  (0, _defineProperty2.default)(this, "setPreviewOnly", function (value) {
    _this.attributes.preview_only = value;
    exposeAttributes(_this, ['preview_only']);
  });
  // boolean # Show a registration page that captures the downloader's name and email address?
  (0, _defineProperty2.default)(this, "getRequireRegistration", function () {
    return _this.attributes.require_registration;
  });
  (0, _defineProperty2.default)(this, "setRequireRegistration", function (value) {
    _this.attributes.require_registration = value;
    exposeAttributes(_this, ['require_registration']);
  });
  // boolean # Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  (0, _defineProperty2.default)(this, "getRequireShareRecipient", function () {
    return _this.attributes.require_share_recipient;
  });
  (0, _defineProperty2.default)(this, "setRequireShareRecipient", function (value) {
    _this.attributes.require_share_recipient = value;
    exposeAttributes(_this, ['require_share_recipient']);
  });
  // boolean # If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log back in every time they visit the page.
  (0, _defineProperty2.default)(this, "getRequireLogout", function () {
    return _this.attributes.require_logout;
  });
  (0, _defineProperty2.default)(this, "setRequireLogout", function (value) {
    _this.attributes.require_logout = value;
    exposeAttributes(_this, ['require_logout']);
  });
  // string # Legal text that must be agreed to prior to accessing Bundle.
  (0, _defineProperty2.default)(this, "getClickwrapBody", function () {
    return _this.attributes.clickwrap_body;
  });
  (0, _defineProperty2.default)(this, "setClickwrapBody", function (value) {
    _this.attributes.clickwrap_body = value;
    exposeAttributes(_this, ['clickwrap_body']);
  });
  // FormFieldSet # Custom Form to use
  (0, _defineProperty2.default)(this, "getFormFieldSet", function () {
    return _this.attributes.form_field_set;
  });
  (0, _defineProperty2.default)(this, "setFormFieldSet", function (value) {
    _this.attributes.form_field_set = value;
    exposeAttributes(_this, ['form_field_set']);
  });
  // boolean # BundleRegistrations can be saved without providing name?
  (0, _defineProperty2.default)(this, "getSkipName", function () {
    return _this.attributes.skip_name;
  });
  (0, _defineProperty2.default)(this, "setSkipName", function (value) {
    _this.attributes.skip_name = value;
    exposeAttributes(_this, ['skip_name']);
  });
  // boolean # BundleRegistrations can be saved without providing email?
  (0, _defineProperty2.default)(this, "getSkipEmail", function () {
    return _this.attributes.skip_email;
  });
  (0, _defineProperty2.default)(this, "setSkipEmail", function (value) {
    _this.attributes.skip_email = value;
    exposeAttributes(_this, ['skip_email']);
  });
  // date-time # Date when share will start to be accessible. If `nil` access granted right after create.
  (0, _defineProperty2.default)(this, "getStartAccessOnDate", function () {
    return _this.attributes.start_access_on_date;
  });
  (0, _defineProperty2.default)(this, "setStartAccessOnDate", function (value) {
    _this.attributes.start_access_on_date = value;
    exposeAttributes(_this, ['start_access_on_date']);
  });
  // boolean # BundleRegistrations can be saved without providing company?
  (0, _defineProperty2.default)(this, "getSkipCompany", function () {
    return _this.attributes.skip_company;
  });
  (0, _defineProperty2.default)(this, "setSkipCompany", function (value) {
    _this.attributes.skip_company = value;
    exposeAttributes(_this, ['skip_company']);
  });
  // int64 # Bundle ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
    exposeAttributes(_this, ['id']);
  });
  // boolean # If true, this Share Link bypasses site-wide expiration rules. Only site admins may set this.
  (0, _defineProperty2.default)(this, "getBypassesSiteExpirationRules", function () {
    return _this.attributes.bypasses_site_expiration_rules;
  });
  (0, _defineProperty2.default)(this, "setBypassesSiteExpirationRules", function (value) {
    _this.attributes.bypasses_site_expiration_rules = value;
    exposeAttributes(_this, ['bypasses_site_expiration_rules']);
  });
  // date-time # Bundle created at date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // boolean # Indicates if the bundle has been deleted.
  (0, _defineProperty2.default)(this, "getDeleted", function () {
    return _this.attributes.deleted;
  });
  (0, _defineProperty2.default)(this, "setDeleted", function (value) {
    _this.attributes.deleted = value;
    exposeAttributes(_this, ['deleted']);
  });
  // date-time # Bundle deleted at date/time
  (0, _defineProperty2.default)(this, "getDeletedAt", function () {
    return _this.attributes.deleted_at;
  });
  (0, _defineProperty2.default)(this, "setDeletedAt", function (value) {
    _this.attributes.deleted_at = value;
    exposeAttributes(_this, ['deleted_at']);
  });
  // boolean # Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  (0, _defineProperty2.default)(this, "getDontSeparateSubmissionsByFolder", function () {
    return _this.attributes.dont_separate_submissions_by_folder;
  });
  (0, _defineProperty2.default)(this, "setDontSeparateSubmissionsByFolder", function (value) {
    _this.attributes.dont_separate_submissions_by_folder = value;
    exposeAttributes(_this, ['dont_separate_submissions_by_folder']);
  });
  // date-time # Read-only expiration date/time, using the explicit expiration or the site-wide setting when applicable. Null when the Share Link does not expire.
  (0, _defineProperty2.default)(this, "getEffectiveExpiresAt", function () {
    return _this.attributes.effective_expires_at;
  });
  (0, _defineProperty2.default)(this, "setEffectiveExpiresAt", function (value) {
    _this.attributes.effective_expires_at = value;
    exposeAttributes(_this, ['effective_expires_at']);
  });
  // int64 # Maximum number of times bundle can be accessed
  (0, _defineProperty2.default)(this, "getMaxUses", function () {
    return _this.attributes.max_uses;
  });
  (0, _defineProperty2.default)(this, "setMaxUses", function (value) {
    _this.attributes.max_uses = value;
    exposeAttributes(_this, ['max_uses']);
  });
  // string # Internal name for identifying this Share Link.
  (0, _defineProperty2.default)(this, "getInternalName", function () {
    return _this.attributes.internal_name;
  });
  (0, _defineProperty2.default)(this, "setInternalName", function (value) {
    _this.attributes.internal_name = value;
    exposeAttributes(_this, ['internal_name']);
  });
  // string # Bundle internal note
  (0, _defineProperty2.default)(this, "getNote", function () {
    return _this.attributes.note;
  });
  (0, _defineProperty2.default)(this, "setNote", function (value) {
    _this.attributes.note = value;
    exposeAttributes(_this, ['note']);
  });
  // string # Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime` directives, and any custom form data.
  (0, _defineProperty2.default)(this, "getPathTemplate", function () {
    return _this.attributes.path_template;
  });
  (0, _defineProperty2.default)(this, "setPathTemplate", function (value) {
    _this.attributes.path_template = value;
    exposeAttributes(_this, ['path_template']);
  });
  // string # Timezone to use when rendering timestamps in path templates.
  (0, _defineProperty2.default)(this, "getPathTemplateTimeZone", function () {
    return _this.attributes.path_template_time_zone;
  });
  (0, _defineProperty2.default)(this, "setPathTemplateTimeZone", function (value) {
    _this.attributes.path_template_time_zone = value;
    exposeAttributes(_this, ['path_template_time_zone']);
  });
  // boolean # Send delivery receipt to the uploader. Note: For writable share only
  (0, _defineProperty2.default)(this, "getSendEmailReceiptToUploader", function () {
    return _this.attributes.send_email_receipt_to_uploader;
  });
  (0, _defineProperty2.default)(this, "setSendEmailReceiptToUploader", function (value) {
    _this.attributes.send_email_receipt_to_uploader = value;
    exposeAttributes(_this, ['send_email_receipt_to_uploader']);
  });
  // int64 # ID of the snapshot containing this bundle's contents.
  (0, _defineProperty2.default)(this, "getSnapshotId", function () {
    return _this.attributes.snapshot_id;
  });
  (0, _defineProperty2.default)(this, "setSnapshotId", function (value) {
    _this.attributes.snapshot_id = value;
    exposeAttributes(_this, ['snapshot_id']);
  });
  // int64 # Bundle creator user ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
    exposeAttributes(_this, ['user_id']);
  });
  // string # Bundle creator username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
    exposeAttributes(_this, ['username']);
  });
  // int64 # Owning group ID. If set, members of this group can view, edit, and share this Share Link.
  (0, _defineProperty2.default)(this, "getGroupId", function () {
    return _this.attributes.group_id;
  });
  (0, _defineProperty2.default)(this, "setGroupId", function (value) {
    _this.attributes.group_id = value;
    exposeAttributes(_this, ['group_id']);
  });
  // int64 # ID of the clickwrap to use with this bundle.
  (0, _defineProperty2.default)(this, "getClickwrapId", function () {
    return _this.attributes.clickwrap_id;
  });
  (0, _defineProperty2.default)(this, "setClickwrapId", function (value) {
    _this.attributes.clickwrap_id = value;
    exposeAttributes(_this, ['clickwrap_id']);
  });
  // int64 # ID of the associated inbox, if available.
  (0, _defineProperty2.default)(this, "getInboxId", function () {
    return _this.attributes.inbox_id;
  });
  (0, _defineProperty2.default)(this, "setInboxId", function (value) {
    _this.attributes.inbox_id = value;
    exposeAttributes(_this, ['inbox_id']);
  });
  // Image # Preview watermark image applied to all bundle items.
  (0, _defineProperty2.default)(this, "getWatermarkAttachment", function () {
    return _this.attributes.watermark_attachment;
  });
  (0, _defineProperty2.default)(this, "setWatermarkAttachment", function (value) {
    _this.attributes.watermark_attachment = value;
    exposeAttributes(_this, ['watermark_attachment']);
  });
  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  (0, _defineProperty2.default)(this, "getWatermarkValue", function () {
    return _this.attributes.watermark_value;
  });
  (0, _defineProperty2.default)(this, "setWatermarkValue", function (value) {
    _this.attributes.watermark_value = value;
    exposeAttributes(_this, ['watermark_value']);
  });
  // boolean # If true, require_share_recipient bundles will send a one-time password to the recipient when they register. Cannot be enabled if the bundle has a password set.
  (0, _defineProperty2.default)(this, "getSendOneTimePasswordToRecipientAtRegistration", function () {
    return _this.attributes.send_one_time_password_to_recipient_at_registration;
  });
  (0, _defineProperty2.default)(this, "setSendOneTimePasswordToRecipientAtRegistration", function (value) {
    _this.attributes.send_one_time_password_to_recipient_at_registration = value;
    exposeAttributes(_this, ['send_one_time_password_to_recipient_at_registration']);
  });
  // int64 # Workspace ID. `0` means the default workspace.
  (0, _defineProperty2.default)(this, "getWorkspaceId", function () {
    return _this.attributes.workspace_id;
  });
  (0, _defineProperty2.default)(this, "setWorkspaceId", function (value) {
    _this.attributes.workspace_id = value;
    exposeAttributes(_this, ['workspace_id']);
  });
  // boolean # Does this bundle have an associated inbox?
  (0, _defineProperty2.default)(this, "getHasInbox", function () {
    return _this.attributes.has_inbox;
  });
  (0, _defineProperty2.default)(this, "setHasInbox", function (value) {
    _this.attributes.has_inbox = value;
    exposeAttributes(_this, ['has_inbox']);
  });
  // boolean # Should folder uploads be prevented?
  (0, _defineProperty2.default)(this, "getDontAllowFoldersInUploads", function () {
    return _this.attributes.dont_allow_folders_in_uploads;
  });
  (0, _defineProperty2.default)(this, "setDontAllowFoldersInUploads", function (value) {
    _this.attributes.dont_allow_folders_in_uploads = value;
    exposeAttributes(_this, ['dont_allow_folders_in_uploads']);
  });
  // array(object) # Upload slots requested by the associated Inbox. Each slot contains a name used as its label and destination subfolder name.
  (0, _defineProperty2.default)(this, "getRequestedUploadSlots", function () {
    return _this.attributes.requested_upload_slots;
  });
  (0, _defineProperty2.default)(this, "setRequestedUploadSlots", function (value) {
    _this.attributes.requested_upload_slots = value;
    exposeAttributes(_this, ['requested_upload_slots']);
  });
  // array(string) # A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles.
  (0, _defineProperty2.default)(this, "getPaths", function () {
    return _this.attributes.paths;
  });
  (0, _defineProperty2.default)(this, "setPaths", function (value) {
    _this.attributes.paths = value;
    exposeAttributes(_this, ['paths']);
  });
  // array(object) # A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles.
  (0, _defineProperty2.default)(this, "getBundlepaths", function () {
    return _this.attributes.bundlepaths;
  });
  (0, _defineProperty2.default)(this, "setBundlepaths", function (value) {
    _this.attributes.bundlepaths = value;
    exposeAttributes(_this, ['bundlepaths']);
  });
  // string # Password for this bundle.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
    exposeAttributes(_this, ['password']);
  });
  // int64 # Id of Form Field Set to use with this bundle
  (0, _defineProperty2.default)(this, "getFormFieldSetId", function () {
    return _this.attributes.form_field_set_id;
  });
  (0, _defineProperty2.default)(this, "setFormFieldSetId", function (value) {
    _this.attributes.form_field_set_id = value;
    exposeAttributes(_this, ['form_field_set_id']);
  });
  // boolean # If true, create a snapshot of this bundle's contents.
  (0, _defineProperty2.default)(this, "getCreateSnapshot", function () {
    return _this.attributes.create_snapshot;
  });
  (0, _defineProperty2.default)(this, "setCreateSnapshot", function (value) {
    _this.attributes.create_snapshot = value;
    exposeAttributes(_this, ['create_snapshot']);
  });
  // boolean # If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  (0, _defineProperty2.default)(this, "getFinalizeSnapshot", function () {
    return _this.attributes.finalize_snapshot;
  });
  (0, _defineProperty2.default)(this, "setFinalizeSnapshot", function (value) {
    _this.attributes.finalize_snapshot = value;
    exposeAttributes(_this, ['finalize_snapshot']);
  });
  // file # Preview watermark image applied to all bundle items.
  (0, _defineProperty2.default)(this, "getWatermarkAttachmentFile", function () {
    return _this.attributes.watermark_attachment_file;
  });
  (0, _defineProperty2.default)(this, "setWatermarkAttachmentFile", function (value) {
    _this.attributes.watermark_attachment_file = value;
    exposeAttributes(_this, ['watermark_attachment_file']);
  });
  // boolean # If true, will delete the file stored in watermark_attachment
  (0, _defineProperty2.default)(this, "getWatermarkAttachmentDelete", function () {
    return _this.attributes.watermark_attachment_delete;
  });
  (0, _defineProperty2.default)(this, "setWatermarkAttachmentDelete", function (value) {
    _this.attributes.watermark_attachment_delete = value;
    exposeAttributes(_this, ['watermark_attachment_delete']);
  });
  // Send email(s) with a link to bundle
  //
  // Parameters:
  //   to - array(string) - A list of email addresses to share this bundle with. Required unless `recipients` is used.
  //   note - string - Note to include in email.
  //   recipients - array(object) - A list of recipients to share this bundle with. Required unless `to` is used.
  (0, _defineProperty2.default)(this, "share", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.to !== undefined && params.to !== null && !(0, _utils.isArray)(params.to))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: to must be of type Array, received ".concat((0, _utils.getType)(params.to)));
        case 4:
          if (!(params.note !== undefined && params.note !== null && !(0, _utils.isString)(params.note))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
        case 5:
          if (!(params.recipients !== undefined && params.recipients !== null && !(0, _utils.isArray)(params.recipients))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recipients must be of type Array, received ".concat((0, _utils.getType)(params.recipients)));
        case 6:
          if (params.id) {
            _context.next = 8;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 7;
            break;
          }
          params.id = _this.id;
          _context.next = 8;
          break;
        case 7:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 8:
          _context.next = 9;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params.id), "/share"), 'POST', params, _this.options);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
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
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.paths !== undefined && params.paths !== null && !(0, _utils.isArray)(params.paths))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(params.paths)));
        case 4:
          if (!(params.password !== undefined && params.password !== null && !(0, _utils.isString)(params.password))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
        case 5:
          if (!((0, _utils.isArray)(params.bypasses_site_expiration_rules) || (0, _utils.isObject)(params.bypasses_site_expiration_rules))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: bypasses_site_expiration_rules must be of type Boolean, received ".concat((0, _utils.getType)(params.bypasses_site_expiration_rules)));
        case 6:
          if (!(params.form_field_set_id !== undefined && params.form_field_set_id !== null && !(0, _utils.isInt)(params.form_field_set_id))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: form_field_set_id must be of type Int, received ".concat((0, _utils.getType)(params.form_field_set_id)));
        case 7:
          if (!(params.clickwrap_id !== undefined && params.clickwrap_id !== null && !(0, _utils.isInt)(params.clickwrap_id))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: clickwrap_id must be of type Int, received ".concat((0, _utils.getType)(params.clickwrap_id)));
        case 8:
          if (!(params.code !== undefined && params.code !== null && !(0, _utils.isString)(params.code))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: code must be of type String, received ".concat((0, _utils.getType)(params.code)));
        case 9:
          if (!((0, _utils.isArray)(params.create_snapshot) || (0, _utils.isObject)(params.create_snapshot))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: create_snapshot must be of type Boolean, received ".concat((0, _utils.getType)(params.create_snapshot)));
        case 10:
          if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 11:
          if (!((0, _utils.isArray)(params.dont_separate_submissions_by_folder) || (0, _utils.isObject)(params.dont_separate_submissions_by_folder))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: dont_separate_submissions_by_folder must be of type Boolean, received ".concat((0, _utils.getType)(params.dont_separate_submissions_by_folder)));
        case 12:
          if (!(params.expires_at !== undefined && params.expires_at !== null && !(0, _utils.isString)(params.expires_at))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
        case 13:
          if (!((0, _utils.isArray)(params.finalize_snapshot) || (0, _utils.isObject)(params.finalize_snapshot))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: finalize_snapshot must be of type Boolean, received ".concat((0, _utils.getType)(params.finalize_snapshot)));
        case 14:
          if (!(params.inbox_id !== undefined && params.inbox_id !== null && !(0, _utils.isInt)(params.inbox_id))) {
            _context2.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params.inbox_id)));
        case 15:
          if (!(params.max_uses !== undefined && params.max_uses !== null && !(0, _utils.isInt)(params.max_uses))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: max_uses must be of type Int, received ".concat((0, _utils.getType)(params.max_uses)));
        case 16:
          if (!(params.group_id !== undefined && params.group_id !== null && !(0, _utils.isInt)(params.group_id))) {
            _context2.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params.group_id)));
        case 17:
          if (!(params.internal_name !== undefined && params.internal_name !== null && !(0, _utils.isString)(params.internal_name))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: internal_name must be of type String, received ".concat((0, _utils.getType)(params.internal_name)));
        case 18:
          if (!(params.note !== undefined && params.note !== null && !(0, _utils.isString)(params.note))) {
            _context2.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
        case 19:
          if (!(params.path_template !== undefined && params.path_template !== null && !(0, _utils.isString)(params.path_template))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_template must be of type String, received ".concat((0, _utils.getType)(params.path_template)));
        case 20:
          if (!(params.path_template_time_zone !== undefined && params.path_template_time_zone !== null && !(0, _utils.isString)(params.path_template_time_zone))) {
            _context2.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_template_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_template_time_zone)));
        case 21:
          if (!(params.permissions !== undefined && params.permissions !== null && !(0, _utils.isString)(params.permissions))) {
            _context2.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permissions must be of type String, received ".concat((0, _utils.getType)(params.permissions)));
        case 22:
          if (!((0, _utils.isArray)(params.require_registration) || (0, _utils.isObject)(params.require_registration))) {
            _context2.next = 23;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: require_registration must be of type Boolean, received ".concat((0, _utils.getType)(params.require_registration)));
        case 23:
          if (!((0, _utils.isArray)(params.require_share_recipient) || (0, _utils.isObject)(params.require_share_recipient))) {
            _context2.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: require_share_recipient must be of type Boolean, received ".concat((0, _utils.getType)(params.require_share_recipient)));
        case 24:
          if (!((0, _utils.isArray)(params.send_one_time_password_to_recipient_at_registration) || (0, _utils.isObject)(params.send_one_time_password_to_recipient_at_registration))) {
            _context2.next = 25;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: send_one_time_password_to_recipient_at_registration must be of type Boolean, received ".concat((0, _utils.getType)(params.send_one_time_password_to_recipient_at_registration)));
        case 25:
          if (!((0, _utils.isArray)(params.send_email_receipt_to_uploader) || (0, _utils.isObject)(params.send_email_receipt_to_uploader))) {
            _context2.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: send_email_receipt_to_uploader must be of type Boolean, received ".concat((0, _utils.getType)(params.send_email_receipt_to_uploader)));
        case 26:
          if (!((0, _utils.isArray)(params.skip_company) || (0, _utils.isObject)(params.skip_company))) {
            _context2.next = 27;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_company must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_company)));
        case 27:
          if (!(params.start_access_on_date !== undefined && params.start_access_on_date !== null && !(0, _utils.isString)(params.start_access_on_date))) {
            _context2.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: start_access_on_date must be of type String, received ".concat((0, _utils.getType)(params.start_access_on_date)));
        case 28:
          if (!((0, _utils.isArray)(params.skip_email) || (0, _utils.isObject)(params.skip_email))) {
            _context2.next = 29;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_email must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_email)));
        case 29:
          if (!((0, _utils.isArray)(params.skip_name) || (0, _utils.isObject)(params.skip_name))) {
            _context2.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: skip_name must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_name)));
        case 30:
          if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
            _context2.next = 31;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
        case 31:
          if (!((0, _utils.isArray)(params.watermark_attachment_delete) || (0, _utils.isObject)(params.watermark_attachment_delete))) {
            _context2.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: watermark_attachment_delete must be of type Boolean, received ".concat((0, _utils.getType)(params.watermark_attachment_delete)));
        case 32:
          if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
            _context2.next = 33;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
        case 33:
          if (params.id) {
            _context2.next = 35;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 34;
            break;
          }
          params.id = _this.id;
          _context2.next = 35;
          break;
        case 34:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 35:
          _context2.next = 36;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 36:
          response = _context2.sent;
          adoptAttributes(_this, response === null || response === void 0 ? void 0 : response.data);
          return _context2.abrupt("return", _this);
        case 37:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      _args3 = arguments;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          if (_this.attributes.id) {
            _context3.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context3.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
          params = _objectSpread({}, params);
          params.id = _this.attributes.id;
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context3.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context3.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 4;
            break;
          }
          params.id = _this.id;
          _context3.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context3.next = 6;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var newObject;
    return _regenerator.default.wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!_this.attributes.id) {
            _context4.next = 2;
            break;
          }
          _context4.next = 1;
          return _this.update(_this.attributes);
        case 1:
          return _context4.abrupt("return", true);
        case 2:
          _context4.next = 3;
          return Bundle.create(_this.attributes, _this.options);
        case 3:
          newObject = _context4.sent;
          adoptAttributes(_this, newObject.attributes);
          return _context4.abrupt("return", true);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  adoptAttributes(this, attributes);
  this.options = _objectSpread({}, options);
});
_Bundle = Bundle;
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
(0, _defineProperty2.default)(Bundle, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5() {
  var _response$data;
  var params,
    options,
    response,
    _args5 = arguments;
  return _regenerator.default.wrap(function (_context5) {
    while (1) switch (_context5.prev = _context5.next) {
      case 0:
        params = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
        options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor !== undefined && params.cursor !== null && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page !== undefined && params.per_page !== null && !(0, _utils.isInt)(params.per_page))) {
          _context5.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        if (!((0, _utils.isArray)(params.deleted) || (0, _utils.isObject)(params.deleted))) {
          _context5.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: deleted must be of type Boolean, received ".concat((0, _utils.getType)(params.deleted)));
      case 4:
        _context5.next = 5;
        return _Api.default.sendRequest('/bundles', 'GET', params, options);
      case 5:
        response = _context5.sent;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Bundle(obj, retainedOptions(options));
        })) || []);
      case 6:
      case "end":
        return _context5.stop();
    }
  }, _callee5);
})));
(0, _defineProperty2.default)(Bundle, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Bundle.list(params, options);
});
// The items list() lists, one at a time: an async iterator that requests each page
// through list() only once the items before it have been taken (see Api._iterate).
(0, _defineProperty2.default)(Bundle, "listIterator", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _Api.default._iterate(params, options, function (pageParams, pageOptions) {
    return _Bundle.list(pageParams, pageOptions);
  });
});
// Parameters:
//   id (required) - int64 - Bundle ID.
//   deleted - boolean - If true, show a deleted Share Link.
(0, _defineProperty2.default)(Bundle, "find", /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6(id) {
    var params,
      options,
      response,
      _args6 = arguments;
    return _regenerator.default.wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          params = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context6.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          // The request is prepared on a shallow copy, so the caller's params stay as they were.
          params = _objectSpread({}, params);
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id !== undefined && params.id !== null && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!((0, _utils.isArray)(params.deleted) || (0, _utils.isObject)(params.deleted))) {
            _context6.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: deleted must be of type Boolean, received ".concat((0, _utils.getType)(params.deleted)));
        case 4:
          _context6.next = 5;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 5:
          response = _context6.sent;
          return _context6.abrupt("return", new _Bundle(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x) {
    return _ref8.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Bundle, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _Bundle.find(id, params, options);
});
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
(0, _defineProperty2.default)(Bundle, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    response,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (params.paths) {
          _context7.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: paths');
      case 1:
        if (!(params.user_id !== undefined && params.user_id !== null && !(0, _utils.isInt)(params.user_id))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.paths !== undefined && params.paths !== null && !(0, _utils.isArray)(params.paths))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(params.paths)));
      case 3:
        if (!(params.password !== undefined && params.password !== null && !(0, _utils.isString)(params.password))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 4:
        if (!((0, _utils.isArray)(params.bypasses_site_expiration_rules) || (0, _utils.isObject)(params.bypasses_site_expiration_rules))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: bypasses_site_expiration_rules must be of type Boolean, received ".concat((0, _utils.getType)(params.bypasses_site_expiration_rules)));
      case 5:
        if (!(params.form_field_set_id !== undefined && params.form_field_set_id !== null && !(0, _utils.isInt)(params.form_field_set_id))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: form_field_set_id must be of type Int, received ".concat((0, _utils.getType)(params.form_field_set_id)));
      case 6:
        if (!((0, _utils.isArray)(params.create_snapshot) || (0, _utils.isObject)(params.create_snapshot))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: create_snapshot must be of type Boolean, received ".concat((0, _utils.getType)(params.create_snapshot)));
      case 7:
        if (!((0, _utils.isArray)(params.dont_separate_submissions_by_folder) || (0, _utils.isObject)(params.dont_separate_submissions_by_folder))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: dont_separate_submissions_by_folder must be of type Boolean, received ".concat((0, _utils.getType)(params.dont_separate_submissions_by_folder)));
      case 8:
        if (!(params.expires_at !== undefined && params.expires_at !== null && !(0, _utils.isString)(params.expires_at))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
      case 9:
        if (!((0, _utils.isArray)(params.finalize_snapshot) || (0, _utils.isObject)(params.finalize_snapshot))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: finalize_snapshot must be of type Boolean, received ".concat((0, _utils.getType)(params.finalize_snapshot)));
      case 10:
        if (!(params.max_uses !== undefined && params.max_uses !== null && !(0, _utils.isInt)(params.max_uses))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_uses must be of type Int, received ".concat((0, _utils.getType)(params.max_uses)));
      case 11:
        if (!(params.group_id !== undefined && params.group_id !== null && !(0, _utils.isInt)(params.group_id))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: group_id must be of type Int, received ".concat((0, _utils.getType)(params.group_id)));
      case 12:
        if (!(params.internal_name !== undefined && params.internal_name !== null && !(0, _utils.isString)(params.internal_name))) {
          _context7.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: internal_name must be of type String, received ".concat((0, _utils.getType)(params.internal_name)));
      case 13:
        if (!(params.description !== undefined && params.description !== null && !(0, _utils.isString)(params.description))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 14:
        if (!(params.note !== undefined && params.note !== null && !(0, _utils.isString)(params.note))) {
          _context7.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
      case 15:
        if (!(params.code !== undefined && params.code !== null && !(0, _utils.isString)(params.code))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: code must be of type String, received ".concat((0, _utils.getType)(params.code)));
      case 16:
        if (!(params.path_template !== undefined && params.path_template !== null && !(0, _utils.isString)(params.path_template))) {
          _context7.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_template must be of type String, received ".concat((0, _utils.getType)(params.path_template)));
      case 17:
        if (!(params.path_template_time_zone !== undefined && params.path_template_time_zone !== null && !(0, _utils.isString)(params.path_template_time_zone))) {
          _context7.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_template_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_template_time_zone)));
      case 18:
        if (!(params.permissions !== undefined && params.permissions !== null && !(0, _utils.isString)(params.permissions))) {
          _context7.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permissions must be of type String, received ".concat((0, _utils.getType)(params.permissions)));
      case 19:
        if (!((0, _utils.isArray)(params.require_registration) || (0, _utils.isObject)(params.require_registration))) {
          _context7.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_registration must be of type Boolean, received ".concat((0, _utils.getType)(params.require_registration)));
      case 20:
        if (!(params.clickwrap_id !== undefined && params.clickwrap_id !== null && !(0, _utils.isInt)(params.clickwrap_id))) {
          _context7.next = 21;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: clickwrap_id must be of type Int, received ".concat((0, _utils.getType)(params.clickwrap_id)));
      case 21:
        if (!(params.inbox_id !== undefined && params.inbox_id !== null && !(0, _utils.isInt)(params.inbox_id))) {
          _context7.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params.inbox_id)));
      case 22:
        if (!((0, _utils.isArray)(params.require_share_recipient) || (0, _utils.isObject)(params.require_share_recipient))) {
          _context7.next = 23;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: require_share_recipient must be of type Boolean, received ".concat((0, _utils.getType)(params.require_share_recipient)));
      case 23:
        if (!((0, _utils.isArray)(params.send_one_time_password_to_recipient_at_registration) || (0, _utils.isObject)(params.send_one_time_password_to_recipient_at_registration))) {
          _context7.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: send_one_time_password_to_recipient_at_registration must be of type Boolean, received ".concat((0, _utils.getType)(params.send_one_time_password_to_recipient_at_registration)));
      case 24:
        if (!((0, _utils.isArray)(params.send_email_receipt_to_uploader) || (0, _utils.isObject)(params.send_email_receipt_to_uploader))) {
          _context7.next = 25;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: send_email_receipt_to_uploader must be of type Boolean, received ".concat((0, _utils.getType)(params.send_email_receipt_to_uploader)));
      case 25:
        if (!((0, _utils.isArray)(params.skip_email) || (0, _utils.isObject)(params.skip_email))) {
          _context7.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_email must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_email)));
      case 26:
        if (!((0, _utils.isArray)(params.skip_name) || (0, _utils.isObject)(params.skip_name))) {
          _context7.next = 27;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_name must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_name)));
      case 27:
        if (!((0, _utils.isArray)(params.skip_company) || (0, _utils.isObject)(params.skip_company))) {
          _context7.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: skip_company must be of type Boolean, received ".concat((0, _utils.getType)(params.skip_company)));
      case 28:
        if (!(params.start_access_on_date !== undefined && params.start_access_on_date !== null && !(0, _utils.isString)(params.start_access_on_date))) {
          _context7.next = 29;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_access_on_date must be of type String, received ".concat((0, _utils.getType)(params.start_access_on_date)));
      case 29:
        if (!(params.snapshot_id !== undefined && params.snapshot_id !== null && !(0, _utils.isInt)(params.snapshot_id))) {
          _context7.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: snapshot_id must be of type Int, received ".concat((0, _utils.getType)(params.snapshot_id)));
      case 30:
        if (!(params.workspace_id !== undefined && params.workspace_id !== null && !(0, _utils.isInt)(params.workspace_id))) {
          _context7.next = 31;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: workspace_id must be of type Int, received ".concat((0, _utils.getType)(params.workspace_id)));
      case 31:
        _context7.next = 32;
        return _Api.default.sendRequest('/bundles', 'POST', params, options);
      case 32:
        response = _context7.sent;
        return _context7.abrupt("return", new _Bundle(response === null || response === void 0 ? void 0 : response.data, retainedOptions(options)));
      case 33:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = Bundle;
module.exports = Bundle;
module.exports.default = Bundle;