"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _Bundle;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
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
  });
  // string # Page link and button color
  (0, _defineProperty2.default)(this, "getColorLeft", function () {
    return _this.attributes.color_left;
  });
  (0, _defineProperty2.default)(this, "setColorLeft", function (value) {
    _this.attributes.color_left = value;
  });
  // string # Top bar link color
  (0, _defineProperty2.default)(this, "getColorLink", function () {
    return _this.attributes.color_link;
  });
  (0, _defineProperty2.default)(this, "setColorLink", function (value) {
    _this.attributes.color_link = value;
  });
  // string # Page link and button color
  (0, _defineProperty2.default)(this, "getColorText", function () {
    return _this.attributes.color_text;
  });
  (0, _defineProperty2.default)(this, "setColorText", function (value) {
    _this.attributes.color_text = value;
  });
  // string # Top bar background color
  (0, _defineProperty2.default)(this, "getColorTop", function () {
    return _this.attributes.color_top;
  });
  (0, _defineProperty2.default)(this, "setColorTop", function (value) {
    _this.attributes.color_top = value;
  });
  // string # Top bar text color
  (0, _defineProperty2.default)(this, "getColorTopText", function () {
    return _this.attributes.color_top_text;
  });
  (0, _defineProperty2.default)(this, "setColorTopText", function (value) {
    _this.attributes.color_top_text = value;
  });
  // string # Public URL of Share Link
  (0, _defineProperty2.default)(this, "getUrl", function () {
    return _this.attributes.url;
  });
  (0, _defineProperty2.default)(this, "setUrl", function (value) {
    _this.attributes.url = value;
  });
  // string # Public description
  (0, _defineProperty2.default)(this, "getDescription", function () {
    return _this.attributes.description;
  });
  (0, _defineProperty2.default)(this, "setDescription", function (value) {
    _this.attributes.description = value;
  });
  // date-time # Bundle expiration date/time
  (0, _defineProperty2.default)(this, "getExpiresAt", function () {
    return _this.attributes.expires_at;
  });
  (0, _defineProperty2.default)(this, "setExpiresAt", function (value) {
    _this.attributes.expires_at = value;
  });
  // boolean # Is this bundle password protected?
  (0, _defineProperty2.default)(this, "getPasswordProtected", function () {
    return _this.attributes.password_protected;
  });
  (0, _defineProperty2.default)(this, "setPasswordProtected", function (value) {
    _this.attributes.password_protected = value;
  });
  // string # Permissions that apply to Folders in this Share Link.
  (0, _defineProperty2.default)(this, "getPermissions", function () {
    return _this.attributes.permissions;
  });
  (0, _defineProperty2.default)(this, "setPermissions", function (value) {
    _this.attributes.permissions = value;
  });
  // boolean
  (0, _defineProperty2.default)(this, "getPreviewOnly", function () {
    return _this.attributes.preview_only;
  });
  (0, _defineProperty2.default)(this, "setPreviewOnly", function (value) {
    _this.attributes.preview_only = value;
  });
  // boolean # Show a registration page that captures the downloader's name and email address?
  (0, _defineProperty2.default)(this, "getRequireRegistration", function () {
    return _this.attributes.require_registration;
  });
  (0, _defineProperty2.default)(this, "setRequireRegistration", function (value) {
    _this.attributes.require_registration = value;
  });
  // boolean # Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  (0, _defineProperty2.default)(this, "getRequireShareRecipient", function () {
    return _this.attributes.require_share_recipient;
  });
  (0, _defineProperty2.default)(this, "setRequireShareRecipient", function (value) {
    _this.attributes.require_share_recipient = value;
  });
  // boolean # If true, we will hide the 'Remember Me' box on the Bundle registration page, requiring that the user logout and log back in every time they visit the page.
  (0, _defineProperty2.default)(this, "getRequireLogout", function () {
    return _this.attributes.require_logout;
  });
  (0, _defineProperty2.default)(this, "setRequireLogout", function (value) {
    _this.attributes.require_logout = value;
  });
  // string # Legal text that must be agreed to prior to accessing Bundle.
  (0, _defineProperty2.default)(this, "getClickwrapBody", function () {
    return _this.attributes.clickwrap_body;
  });
  (0, _defineProperty2.default)(this, "setClickwrapBody", function (value) {
    _this.attributes.clickwrap_body = value;
  });
  // FormFieldSet # Custom Form to use
  (0, _defineProperty2.default)(this, "getFormFieldSet", function () {
    return _this.attributes.form_field_set;
  });
  (0, _defineProperty2.default)(this, "setFormFieldSet", function (value) {
    _this.attributes.form_field_set = value;
  });
  // boolean # BundleRegistrations can be saved without providing name?
  (0, _defineProperty2.default)(this, "getSkipName", function () {
    return _this.attributes.skip_name;
  });
  (0, _defineProperty2.default)(this, "setSkipName", function (value) {
    _this.attributes.skip_name = value;
  });
  // boolean # BundleRegistrations can be saved without providing email?
  (0, _defineProperty2.default)(this, "getSkipEmail", function () {
    return _this.attributes.skip_email;
  });
  (0, _defineProperty2.default)(this, "setSkipEmail", function (value) {
    _this.attributes.skip_email = value;
  });
  // date-time # Date when share will start to be accessible. If `nil` access granted right after create.
  (0, _defineProperty2.default)(this, "getStartAccessOnDate", function () {
    return _this.attributes.start_access_on_date;
  });
  (0, _defineProperty2.default)(this, "setStartAccessOnDate", function (value) {
    _this.attributes.start_access_on_date = value;
  });
  // boolean # BundleRegistrations can be saved without providing company?
  (0, _defineProperty2.default)(this, "getSkipCompany", function () {
    return _this.attributes.skip_company;
  });
  (0, _defineProperty2.default)(this, "setSkipCompany", function (value) {
    _this.attributes.skip_company = value;
  });
  // int64 # Bundle ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // date-time # Bundle created at date/time
  (0, _defineProperty2.default)(this, "getCreatedAt", function () {
    return _this.attributes.created_at;
  });
  // boolean # Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
  (0, _defineProperty2.default)(this, "getDontSeparateSubmissionsByFolder", function () {
    return _this.attributes.dont_separate_submissions_by_folder;
  });
  (0, _defineProperty2.default)(this, "setDontSeparateSubmissionsByFolder", function (value) {
    _this.attributes.dont_separate_submissions_by_folder = value;
  });
  // int64 # Maximum number of times bundle can be accessed
  (0, _defineProperty2.default)(this, "getMaxUses", function () {
    return _this.attributes.max_uses;
  });
  (0, _defineProperty2.default)(this, "setMaxUses", function (value) {
    _this.attributes.max_uses = value;
  });
  // string # Bundle internal note
  (0, _defineProperty2.default)(this, "getNote", function () {
    return _this.attributes.note;
  });
  (0, _defineProperty2.default)(this, "setNote", function (value) {
    _this.attributes.note = value;
  });
  // string # Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime` directives, and any custom form data.
  (0, _defineProperty2.default)(this, "getPathTemplate", function () {
    return _this.attributes.path_template;
  });
  (0, _defineProperty2.default)(this, "setPathTemplate", function (value) {
    _this.attributes.path_template = value;
  });
  // string # Timezone to use when rendering timestamps in path templates.
  (0, _defineProperty2.default)(this, "getPathTemplateTimeZone", function () {
    return _this.attributes.path_template_time_zone;
  });
  (0, _defineProperty2.default)(this, "setPathTemplateTimeZone", function (value) {
    _this.attributes.path_template_time_zone = value;
  });
  // boolean # Send delivery receipt to the uploader. Note: For writable share only
  (0, _defineProperty2.default)(this, "getSendEmailReceiptToUploader", function () {
    return _this.attributes.send_email_receipt_to_uploader;
  });
  (0, _defineProperty2.default)(this, "setSendEmailReceiptToUploader", function (value) {
    _this.attributes.send_email_receipt_to_uploader = value;
  });
  // int64 # ID of the snapshot containing this bundle's contents.
  (0, _defineProperty2.default)(this, "getSnapshotId", function () {
    return _this.attributes.snapshot_id;
  });
  (0, _defineProperty2.default)(this, "setSnapshotId", function (value) {
    _this.attributes.snapshot_id = value;
  });
  // int64 # Bundle creator user ID
  (0, _defineProperty2.default)(this, "getUserId", function () {
    return _this.attributes.user_id;
  });
  (0, _defineProperty2.default)(this, "setUserId", function (value) {
    _this.attributes.user_id = value;
  });
  // string # Bundle creator username
  (0, _defineProperty2.default)(this, "getUsername", function () {
    return _this.attributes.username;
  });
  (0, _defineProperty2.default)(this, "setUsername", function (value) {
    _this.attributes.username = value;
  });
  // int64 # ID of the clickwrap to use with this bundle.
  (0, _defineProperty2.default)(this, "getClickwrapId", function () {
    return _this.attributes.clickwrap_id;
  });
  (0, _defineProperty2.default)(this, "setClickwrapId", function (value) {
    _this.attributes.clickwrap_id = value;
  });
  // int64 # ID of the associated inbox, if available.
  (0, _defineProperty2.default)(this, "getInboxId", function () {
    return _this.attributes.inbox_id;
  });
  (0, _defineProperty2.default)(this, "setInboxId", function (value) {
    _this.attributes.inbox_id = value;
  });
  // Image # Preview watermark image applied to all bundle items.
  (0, _defineProperty2.default)(this, "getWatermarkAttachment", function () {
    return _this.attributes.watermark_attachment;
  });
  (0, _defineProperty2.default)(this, "setWatermarkAttachment", function (value) {
    _this.attributes.watermark_attachment = value;
  });
  // object # Preview watermark settings applied to all bundle items. Uses the same keys as Behavior.value
  (0, _defineProperty2.default)(this, "getWatermarkValue", function () {
    return _this.attributes.watermark_value;
  });
  (0, _defineProperty2.default)(this, "setWatermarkValue", function (value) {
    _this.attributes.watermark_value = value;
  });
  // boolean # Does this bundle have an associated inbox?
  (0, _defineProperty2.default)(this, "getHasInbox", function () {
    return _this.attributes.has_inbox;
  });
  (0, _defineProperty2.default)(this, "setHasInbox", function (value) {
    _this.attributes.has_inbox = value;
  });
  // boolean # Should folder uploads be prevented?
  (0, _defineProperty2.default)(this, "getDontAllowFoldersInUploads", function () {
    return _this.attributes.dont_allow_folders_in_uploads;
  });
  (0, _defineProperty2.default)(this, "setDontAllowFoldersInUploads", function (value) {
    _this.attributes.dont_allow_folders_in_uploads = value;
  });
  // array(string) # A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles.
  (0, _defineProperty2.default)(this, "getPaths", function () {
    return _this.attributes.paths;
  });
  (0, _defineProperty2.default)(this, "setPaths", function (value) {
    _this.attributes.paths = value;
  });
  // array(object) # A list of bundlepaths in this bundle.  For performance reasons, this is not provided when listing bundles.
  (0, _defineProperty2.default)(this, "getBundlepaths", function () {
    return _this.attributes.bundlepaths;
  });
  (0, _defineProperty2.default)(this, "setBundlepaths", function (value) {
    _this.attributes.bundlepaths = value;
  });
  // string # Password for this bundle.
  (0, _defineProperty2.default)(this, "getPassword", function () {
    return _this.attributes.password;
  });
  (0, _defineProperty2.default)(this, "setPassword", function (value) {
    _this.attributes.password = value;
  });
  // int64 # Id of Form Field Set to use with this bundle
  (0, _defineProperty2.default)(this, "getFormFieldSetId", function () {
    return _this.attributes.form_field_set_id;
  });
  (0, _defineProperty2.default)(this, "setFormFieldSetId", function (value) {
    _this.attributes.form_field_set_id = value;
  });
  // boolean # If true, create a snapshot of this bundle's contents.
  (0, _defineProperty2.default)(this, "getCreateSnapshot", function () {
    return _this.attributes.create_snapshot;
  });
  (0, _defineProperty2.default)(this, "setCreateSnapshot", function (value) {
    _this.attributes.create_snapshot = value;
  });
  // boolean # If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
  (0, _defineProperty2.default)(this, "getFinalizeSnapshot", function () {
    return _this.attributes.finalize_snapshot;
  });
  (0, _defineProperty2.default)(this, "setFinalizeSnapshot", function (value) {
    _this.attributes.finalize_snapshot = value;
  });
  // file # Preview watermark image applied to all bundle items.
  (0, _defineProperty2.default)(this, "getWatermarkAttachmentFile", function () {
    return _this.attributes.watermark_attachment_file;
  });
  (0, _defineProperty2.default)(this, "setWatermarkAttachmentFile", function (value) {
    _this.attributes.watermark_attachment_file = value;
  });
  // boolean # If true, will delete the file stored in watermark_attachment
  (0, _defineProperty2.default)(this, "getWatermarkAttachmentDelete", function () {
    return _this.attributes.watermark_attachment_delete;
  });
  (0, _defineProperty2.default)(this, "setWatermarkAttachmentDelete", function (value) {
    _this.attributes.watermark_attachment_delete = value;
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.to && !(0, _utils.isArray)(params.to))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: to must be of type Array, received ".concat((0, _utils.getType)(params.to)));
        case 4:
          if (!(params.note && !(0, _utils.isString)(params.note))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
        case 5:
          if (!(params.recipients && !(0, _utils.isArray)(params.recipients))) {
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
  //   path_template - string - Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, `strftime` directives, and any custom form data.
  //   path_template_time_zone - string - Timezone to use when rendering timestamps in path templates.
  //   permissions - string - Permissions that apply to Folders in this Share Link.
  //   require_registration - boolean - Show a registration page that captures the downloader's name and email address?
  //   require_share_recipient - boolean - Only allow access to recipients who have explicitly received the share via an email sent through the Files.com UI?
  //   send_email_receipt_to_uploader - boolean - Send delivery receipt to the uploader. Note: For writable share only
  //   skip_company - boolean - BundleRegistrations can be saved without providing company?
  //   start_access_on_date - string - Date when share will start to be accessible. If `nil` access granted right after create.
  //   skip_email - boolean - BundleRegistrations can be saved without providing email?
  //   skip_name - boolean - BundleRegistrations can be saved without providing name?
  //   watermark_attachment_delete - boolean - If true, will delete the file stored in watermark_attachment
  //   watermark_attachment_file - file - Preview watermark image applied to all bundle items.
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.paths && !(0, _utils.isArray)(params.paths))) {
            _context2.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(params.paths)));
        case 4:
          if (!(params.password && !(0, _utils.isString)(params.password))) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
        case 5:
          if (!(params.form_field_set_id && !(0, _utils.isInt)(params.form_field_set_id))) {
            _context2.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: form_field_set_id must be of type Int, received ".concat((0, _utils.getType)(params.form_field_set_id)));
        case 6:
          if (!(params.clickwrap_id && !(0, _utils.isInt)(params.clickwrap_id))) {
            _context2.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: clickwrap_id must be of type Int, received ".concat((0, _utils.getType)(params.clickwrap_id)));
        case 7:
          if (!(params.code && !(0, _utils.isString)(params.code))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: code must be of type String, received ".concat((0, _utils.getType)(params.code)));
        case 8:
          if (!(params.description && !(0, _utils.isString)(params.description))) {
            _context2.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
        case 9:
          if (!(params.expires_at && !(0, _utils.isString)(params.expires_at))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
        case 10:
          if (!(params.inbox_id && !(0, _utils.isInt)(params.inbox_id))) {
            _context2.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params.inbox_id)));
        case 11:
          if (!(params.max_uses && !(0, _utils.isInt)(params.max_uses))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: max_uses must be of type Int, received ".concat((0, _utils.getType)(params.max_uses)));
        case 12:
          if (!(params.note && !(0, _utils.isString)(params.note))) {
            _context2.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
        case 13:
          if (!(params.path_template && !(0, _utils.isString)(params.path_template))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_template must be of type String, received ".concat((0, _utils.getType)(params.path_template)));
        case 14:
          if (!(params.path_template_time_zone && !(0, _utils.isString)(params.path_template_time_zone))) {
            _context2.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_template_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_template_time_zone)));
        case 15:
          if (!(params.permissions && !(0, _utils.isString)(params.permissions))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permissions must be of type String, received ".concat((0, _utils.getType)(params.permissions)));
        case 16:
          if (!(params.start_access_on_date && !(0, _utils.isString)(params.start_access_on_date))) {
            _context2.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: start_access_on_date must be of type String, received ".concat((0, _utils.getType)(params.start_access_on_date)));
        case 17:
          if (params.id) {
            _context2.next = 19;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 18;
            break;
          }
          params.id = _this.id;
          _context2.next = 19;
          break;
        case 18:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 19:
          _context2.next = 20;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 20:
          response = _context2.sent;
          return _context2.abrupt("return", new Bundle(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 21:
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
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
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
    var _newObject, newObject;
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
          _newObject = _context4.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context4.abrupt("return", true);
        case 2:
          _context4.next = 3;
          return Bundle.create(_this.attributes, _this.options);
        case 3:
          newObject = _context4.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context4.abrupt("return", true);
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  })));
  Object.entries(attributes).forEach(function (_ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_Bundle = Bundle;
// Parameters:
//   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
//   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `expires_at`.
//   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `created_at`, `expires_at`, `code` or `user_id`. Valid field combinations are `[ user_id, expires_at ]`.
//   filter_gt - object - If set, return records where the specified field is greater than the supplied value. Valid fields are `created_at` and `expires_at`.
//   filter_gteq - object - If set, return records where the specified field is greater than or equal the supplied value. Valid fields are `created_at` and `expires_at`.
//   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `code`.
//   filter_lt - object - If set, return records where the specified field is less than the supplied value. Valid fields are `created_at` and `expires_at`.
//   filter_lteq - object - If set, return records where the specified field is less than or equal the supplied value. Valid fields are `created_at` and `expires_at`.
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
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context5.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 1:
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context5.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 2:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context5.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 3:
        _context5.next = 4;
        return _Api.default.sendRequest('/bundles', 'GET', params, options);
      case 4:
        response = _context5.sent;
        return _context5.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _Bundle(obj, options);
        })) || []);
      case 5:
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
// Parameters:
//   id (required) - int64 - Bundle ID.
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
          params.id = id;
          if (params.id) {
            _context6.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context6.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context6.next = 4;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context6.sent;
          return _context6.abrupt("return", new _Bundle(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
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
//   form_field_set_id - int64 - Id of Form Field Set to use with this bundle
//   create_snapshot - boolean - If true, create a snapshot of this bundle's contents.
//   dont_separate_submissions_by_folder - boolean - Do not create subfolders for files uploaded to this share. Note: there are subtle security pitfalls with allowing anonymous uploads from multiple users to live in the same folder. We strongly discourage use of this option unless absolutely required.
//   expires_at - string - Bundle expiration date/time
//   finalize_snapshot - boolean - If true, finalize the snapshot of this bundle's contents. Note that `create_snapshot` must also be true.
//   max_uses - int64 - Maximum number of times bundle can be accessed
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
//   send_email_receipt_to_uploader - boolean - Send delivery receipt to the uploader. Note: For writable share only
//   skip_email - boolean - BundleRegistrations can be saved without providing email?
//   skip_name - boolean - BundleRegistrations can be saved without providing name?
//   skip_company - boolean - BundleRegistrations can be saved without providing company?
//   start_access_on_date - string - Date when share will start to be accessible. If `nil` access granted right after create.
//   snapshot_id - int64 - ID of the snapshot containing this bundle's contents.
//   watermark_attachment_file - file - Preview watermark image applied to all bundle items.
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
        if (!(params.user_id && !(0, _utils.isInt)(params.user_id))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params.user_id)));
      case 2:
        if (!(params.paths && !(0, _utils.isArray)(params.paths))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(params.paths)));
      case 3:
        if (!(params.password && !(0, _utils.isString)(params.password))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params.password)));
      case 4:
        if (!(params.form_field_set_id && !(0, _utils.isInt)(params.form_field_set_id))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: form_field_set_id must be of type Int, received ".concat((0, _utils.getType)(params.form_field_set_id)));
      case 5:
        if (!(params.expires_at && !(0, _utils.isString)(params.expires_at))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params.expires_at)));
      case 6:
        if (!(params.max_uses && !(0, _utils.isInt)(params.max_uses))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_uses must be of type Int, received ".concat((0, _utils.getType)(params.max_uses)));
      case 7:
        if (!(params.description && !(0, _utils.isString)(params.description))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params.description)));
      case 8:
        if (!(params.note && !(0, _utils.isString)(params.note))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params.note)));
      case 9:
        if (!(params.code && !(0, _utils.isString)(params.code))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: code must be of type String, received ".concat((0, _utils.getType)(params.code)));
      case 10:
        if (!(params.path_template && !(0, _utils.isString)(params.path_template))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_template must be of type String, received ".concat((0, _utils.getType)(params.path_template)));
      case 11:
        if (!(params.path_template_time_zone && !(0, _utils.isString)(params.path_template_time_zone))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_template_time_zone must be of type String, received ".concat((0, _utils.getType)(params.path_template_time_zone)));
      case 12:
        if (!(params.permissions && !(0, _utils.isString)(params.permissions))) {
          _context7.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permissions must be of type String, received ".concat((0, _utils.getType)(params.permissions)));
      case 13:
        if (!(params.clickwrap_id && !(0, _utils.isInt)(params.clickwrap_id))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: clickwrap_id must be of type Int, received ".concat((0, _utils.getType)(params.clickwrap_id)));
      case 14:
        if (!(params.inbox_id && !(0, _utils.isInt)(params.inbox_id))) {
          _context7.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params.inbox_id)));
      case 15:
        if (!(params.start_access_on_date && !(0, _utils.isString)(params.start_access_on_date))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: start_access_on_date must be of type String, received ".concat((0, _utils.getType)(params.start_access_on_date)));
      case 16:
        if (!(params.snapshot_id && !(0, _utils.isInt)(params.snapshot_id))) {
          _context7.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: snapshot_id must be of type Int, received ".concat((0, _utils.getType)(params.snapshot_id)));
      case 17:
        _context7.next = 18;
        return _Api.default.sendRequest('/bundles', 'POST', params, options);
      case 18:
        response = _context7.sent;
        return _context7.abrupt("return", new _Bundle(response === null || response === void 0 ? void 0 : response.data, options));
      case 19:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = Bundle;
module.exports = Bundle;
module.exports.default = Bundle;