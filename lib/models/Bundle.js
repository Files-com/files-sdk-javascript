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
var _Logger = _interopRequireDefault(require("../Logger"));
var _utils = require("../utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  // boolean # DEPRECATED: Restrict users to previewing files only. Use `permissions` instead.
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
  // string # Template for creating submission subfolders. Can use the uploader's name, email address, ip, company, and any custom form data.
  (0, _defineProperty2.default)(this, "getPathTemplate", function () {
    return _this.attributes.path_template;
  });
  (0, _defineProperty2.default)(this, "setPathTemplate", function (value) {
    _this.attributes.path_template = value;
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
  // array # A list of paths in this bundle.  For performance reasons, this is not provided when listing bundles.
  (0, _defineProperty2.default)(this, "getPaths", function () {
    return _this.attributes.paths;
  });
  (0, _defineProperty2.default)(this, "setPaths", function (value) {
    _this.attributes.paths = value;
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
  (0, _defineProperty2.default)(this, "share", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (!(params['to'] && !(0, _utils.isArray)(params['to']))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: to must be of type Array, received ".concat((0, _utils.getType)(to)));
        case 10:
          if (!(params['note'] && !(0, _utils.isString)(params['note']))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(note)));
        case 12:
          if (!(params['recipients'] && !(0, _utils.isArray)(params['recipients']))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: recipients must be of type Array, received ".concat((0, _utils.getType)(recipients)));
        case 14:
          if (params['id']) {
            _context.next = 20;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 19;
            break;
          }
          params['id'] = _this.id;
          _context.next = 20;
          break;
        case 19:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 20:
          _context.next = 22;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params['id']), "/share"), 'POST', params, _this.options);
        case 22:
          response = _context.sent;
          return _context.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 24:
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
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      response,
      _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context2.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (!(params['paths'] && !(0, _utils.isArray)(params['paths']))) {
            _context2.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(paths)));
        case 10:
          if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
            _context2.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(password)));
        case 12:
          if (!(params['form_field_set_id'] && !(0, _utils.isInt)(params['form_field_set_id']))) {
            _context2.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: form_field_set_id must be of type Int, received ".concat((0, _utils.getType)(form_field_set_id)));
        case 14:
          if (!(params['clickwrap_id'] && !(0, _utils.isInt)(params['clickwrap_id']))) {
            _context2.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: clickwrap_id must be of type Int, received ".concat((0, _utils.getType)(clickwrap_id)));
        case 16:
          if (!(params['code'] && !(0, _utils.isString)(params['code']))) {
            _context2.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: code must be of type String, received ".concat((0, _utils.getType)(code)));
        case 18:
          if (!(params['description'] && !(0, _utils.isString)(params['description']))) {
            _context2.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(description)));
        case 20:
          if (!(params['expires_at'] && !(0, _utils.isString)(params['expires_at']))) {
            _context2.next = 22;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(expires_at)));
        case 22:
          if (!(params['inbox_id'] && !(0, _utils.isInt)(params['inbox_id']))) {
            _context2.next = 24;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(inbox_id)));
        case 24:
          if (!(params['max_uses'] && !(0, _utils.isInt)(params['max_uses']))) {
            _context2.next = 26;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: max_uses must be of type Int, received ".concat((0, _utils.getType)(max_uses)));
        case 26:
          if (!(params['note'] && !(0, _utils.isString)(params['note']))) {
            _context2.next = 28;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(note)));
        case 28:
          if (!(params['path_template'] && !(0, _utils.isString)(params['path_template']))) {
            _context2.next = 30;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: path_template must be of type String, received ".concat((0, _utils.getType)(path_template)));
        case 30:
          if (!(params['permissions'] && !(0, _utils.isString)(params['permissions']))) {
            _context2.next = 32;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: permissions must be of type String, received ".concat((0, _utils.getType)(permissions)));
        case 32:
          if (params['id']) {
            _context2.next = 38;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 37;
            break;
          }
          params['id'] = _this.id;
          _context2.next = 38;
          break;
        case 37:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 38:
          _context2.next = 40;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params['id'])), 'PATCH', params, _this.options);
        case 40:
          response = _context2.sent;
          return _context2.abrupt("return", new Bundle(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 42:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var params,
      response,
      _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          params = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
          if (_this.attributes.id) {
            _context3.next = 3;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 3:
          if ((0, _utils.isObject)(params)) {
            _context3.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 5:
          params.id = _this.attributes.id;
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context3.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(id)));
        case 8:
          if (params['id']) {
            _context3.next = 14;
            break;
          }
          if (!_this.attributes.id) {
            _context3.next = 13;
            break;
          }
          params['id'] = _this.id;
          _context3.next = 14;
          break;
        case 13:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 14:
          _context3.next = 16;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params['id'])), 'DELETE', params, _this.options);
        case 16:
          response = _context3.sent;
          return _context3.abrupt("return", response === null || response === void 0 ? void 0 : response.data);
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", function () {
    if (_this.attributes['id']) {
      return _this.update(_this.attributes);
    } else {
      var newObject = Bundle.create(_this.attributes, _this.options);
      _this.attributes = _objectSpread({}, newObject.attributes);
      return true;
    }
  });
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
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
(0, _defineProperty2.default)(Bundle, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function _callee4$(_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context4.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 4:
        if (!(params['cursor'] && !(0, _utils.isString)(params['cursor']))) {
          _context4.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params['cursor'])));
      case 6:
        if (!(params['per_page'] && !(0, _utils.isInt)(params['per_page']))) {
          _context4.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params['per_page'])));
      case 8:
        _context4.next = 10;
        return _Api.default.sendRequest("/bundles", 'GET', params, options);
      case 10:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 ? void 0 : (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new Bundle(obj, options);
        })) || []);
      case 12:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(Bundle, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Bundle.list(params, options);
});
// Parameters:
//   id (required) - int64 - Bundle ID.
(0, _defineProperty2.default)(Bundle, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 4:
          params['id'] = id;
          if (params['id']) {
            _context5.next = 7;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 7:
          if (!(params['id'] && !(0, _utils.isInt)(params['id']))) {
            _context5.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params['id'])));
        case 9:
          _context5.next = 11;
          return _Api.default.sendRequest("/bundles/".concat(encodeURIComponent(params['id'])), 'GET', params, options);
        case 11:
          response = _context5.sent;
          return _context5.abrupt("return", new Bundle(response === null || response === void 0 ? void 0 : response.data, options));
        case 13:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(Bundle, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Bundle.find(id, params, options);
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
(0, _defineProperty2.default)(Bundle, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function _callee6$(_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params['paths']) {
          _context6.next = 4;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: paths');
      case 4:
        if (!(params['user_id'] && !(0, _utils.isInt)(params['user_id']))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: user_id must be of type Int, received ".concat((0, _utils.getType)(params['user_id'])));
      case 6:
        if (!(params['paths'] && !(0, _utils.isArray)(params['paths']))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: paths must be of type Array, received ".concat((0, _utils.getType)(params['paths'])));
      case 8:
        if (!(params['password'] && !(0, _utils.isString)(params['password']))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: password must be of type String, received ".concat((0, _utils.getType)(params['password'])));
      case 10:
        if (!(params['form_field_set_id'] && !(0, _utils.isInt)(params['form_field_set_id']))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: form_field_set_id must be of type Int, received ".concat((0, _utils.getType)(params['form_field_set_id'])));
      case 12:
        if (!(params['expires_at'] && !(0, _utils.isString)(params['expires_at']))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: expires_at must be of type String, received ".concat((0, _utils.getType)(params['expires_at'])));
      case 14:
        if (!(params['max_uses'] && !(0, _utils.isInt)(params['max_uses']))) {
          _context6.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: max_uses must be of type Int, received ".concat((0, _utils.getType)(params['max_uses'])));
      case 16:
        if (!(params['description'] && !(0, _utils.isString)(params['description']))) {
          _context6.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: description must be of type String, received ".concat((0, _utils.getType)(params['description'])));
      case 18:
        if (!(params['note'] && !(0, _utils.isString)(params['note']))) {
          _context6.next = 20;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: note must be of type String, received ".concat((0, _utils.getType)(params['note'])));
      case 20:
        if (!(params['code'] && !(0, _utils.isString)(params['code']))) {
          _context6.next = 22;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: code must be of type String, received ".concat((0, _utils.getType)(params['code'])));
      case 22:
        if (!(params['path_template'] && !(0, _utils.isString)(params['path_template']))) {
          _context6.next = 24;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: path_template must be of type String, received ".concat((0, _utils.getType)(params['path_template'])));
      case 24:
        if (!(params['permissions'] && !(0, _utils.isString)(params['permissions']))) {
          _context6.next = 26;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: permissions must be of type String, received ".concat((0, _utils.getType)(params['permissions'])));
      case 26:
        if (!(params['clickwrap_id'] && !(0, _utils.isInt)(params['clickwrap_id']))) {
          _context6.next = 28;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: clickwrap_id must be of type Int, received ".concat((0, _utils.getType)(params['clickwrap_id'])));
      case 28:
        if (!(params['inbox_id'] && !(0, _utils.isInt)(params['inbox_id']))) {
          _context6.next = 30;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: inbox_id must be of type Int, received ".concat((0, _utils.getType)(params['inbox_id'])));
      case 30:
        if (!(params['snapshot_id'] && !(0, _utils.isInt)(params['snapshot_id']))) {
          _context6.next = 32;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: snapshot_id must be of type Int, received ".concat((0, _utils.getType)(params['snapshot_id'])));
      case 32:
        _context6.next = 34;
        return _Api.default.sendRequest("/bundles", 'POST', params, options);
      case 34:
        response = _context6.sent;
        return _context6.abrupt("return", new Bundle(response === null || response === void 0 ? void 0 : response.data, options));
      case 36:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
var _default = Bundle;
exports.default = _default;