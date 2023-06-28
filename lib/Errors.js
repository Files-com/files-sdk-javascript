"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.NotFound_CodeNotFoundError = exports.NotFound_BundleRegistrationNotFoundError = exports.NotFound_BundlePathNotFoundError = exports.NotFound_ApiKeyNotFoundError = exports.NotFoundError = exports.NotAuthorized_ZipDownloadIpMismatchError = exports.NotAuthorized_WritePermissionRequiredError = exports.NotAuthorized_WriteAndBundlePermissionRequiredError = exports.NotAuthorized_UserIdWithoutSiteAdminError = exports.NotAuthorized_TwoFactorAuthenticationRequiredError = exports.NotAuthorized_SiteFilesAreImmutableError = exports.NotAuthorized_SiteAdminRequiredError = exports.NotAuthorized_SelfManagedRequiredError = exports.NotAuthorized_ReauthenticationNeededActionError = exports.NotAuthorized_ReauthenticationFailedFinalError = exports.NotAuthorized_ReauthenticationFailedError = exports.NotAuthorized_ReadPermissionRequiredError = exports.NotAuthorized_ReadOnlySessionError = exports.NotAuthorized_PasswordChangeRequiredError = exports.NotAuthorized_PasswordChangeNotRequiredError = exports.NotAuthorized_NotAllowedToCreateBundleError = exports.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = exports.NotAuthorized_NeedAdminPermissionForInboxError = exports.NotAuthorized_MustAuthenticateWithApiKeyError = exports.NotAuthorized_InsufficientPermissionForParamsError = exports.NotAuthorized_HistoryPermissionRequiredError = exports.NotAuthorized_FullPermissionRequiredError = exports.NotAuthorized_FolderAdminPermissionRequiredError = exports.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = exports.NotAuthorized_ContactAdminForPasswordChangeHelpError = exports.NotAuthorized_CantActForOtherUserError = exports.NotAuthorized_CannotLoginWhileUsingKeyError = exports.NotAuthorized_BundleMaximumUsesReachedError = exports.NotAuthorized_BillingPermissionRequiredError = exports.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = exports.NotAuthorized_ApiKeyOnlyForMobileAppError = exports.NotAuthorized_ApiKeyOnlyForDesktopAppError = exports.NotAuthorized_ApiKeyIsPathRestrictedError = exports.NotAuthorized_ApiKeyIsDisabledError = exports.NotAuthorizedError = exports.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = exports.NotAuthenticated_TwoFactorAuthenticationErrorError = exports.NotAuthenticated_OneTimePasswordIncorrectError = exports.NotAuthenticated_LockoutRegionMismatchError = exports.NotAuthenticated_LockedOutError = exports.NotAuthenticated_InvalidUsernameOrPasswordError = exports.NotAuthenticated_InvalidOrExpiredCodeError = exports.NotAuthenticated_InvalidOauthError = exports.NotAuthenticated_InvalidCredentialsError = exports.NotAuthenticated_InboxRegistrationCodeFailedError = exports.NotAuthenticated_FilesAgentTokenFailedError = exports.NotAuthenticated_BundleRegistrationCodeFailedError = exports.NotAuthenticated_AuthenticationRequiredError = exports.NotAuthenticatedError = exports.MissingParameterError = exports.InvalidParameterError = exports.FilesError = exports.FilesApiError = exports.EmptyPropertyError = exports.ConfigurationError = exports.BadRequest_UserRequiredError = exports.BadRequest_UserIdOnUserEndpointError = exports.BadRequest_UserIdInvalidError = exports.BadRequest_UnsupportedMediaTypeError = exports.BadRequest_UnsupportedHttpResponseFormatError = exports.BadRequest_UnsupportedCurrencyError = exports.BadRequest_SearchAllOnChildPathError = exports.BadRequest_RequestParamsRequiredError = exports.BadRequest_RequestParamsInvalidError = exports.BadRequest_RequestParamsContainInvalidCharacterError = exports.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = exports.BadRequest_ReauthenticationNeededFieldsError = exports.BadRequest_PartNumberTooLargeError = exports.BadRequest_OperationOnNonScimResourceError = exports.BadRequest_NoValidInputParamsError = exports.BadRequest_MethodNotAllowedError = exports.BadRequest_InvalidUploadPartSizeError = exports.BadRequest_InvalidUploadPartGapError = exports.BadRequest_InvalidUploadOffsetError = exports.BadRequest_InvalidReturnToUrlError = exports.BadRequest_InvalidPathError = exports.BadRequest_InvalidOauthProviderError = exports.BadRequest_InvalidInterfaceError = exports.BadRequest_InvalidInputEncodingError = exports.BadRequest_InvalidFilterParamError = exports.BadRequest_InvalidFilterFieldError = exports.BadRequest_InvalidFilterCombinationError = exports.BadRequest_InvalidFilterAliasCombinationError = exports.BadRequest_InvalidEtagsError = exports.BadRequest_InvalidCursorTypeForSortError = exports.BadRequest_InvalidCursorError = exports.BadRequest_InvalidBodyError = exports.BadRequest_FolderMustNotBeAFileError = exports.BadRequest_DestinationSameError = exports.BadRequest_DatetimeParseError = exports.BadRequest_CantMoveWithMultipleLocationsError = exports.BadRequest_CannotDownloadDirectoryError = exports.BadRequest_AttachmentTooLargeError = exports.BadRequest_AgentUpgradeRequiredError = exports.BadRequestError = void 0;
exports.handleErrorResponse = exports.SiteConfiguration_UserRequestsEnabledRequiredError = exports.SiteConfiguration_TrialLockedError = exports.SiteConfiguration_TrialExpiredError = exports.SiteConfiguration_SiteWasRemovedError = exports.SiteConfiguration_NoAccountForSiteError = exports.SiteConfiguration_AccountOverdueError = exports.SiteConfiguration_AccountAlreadyExistsError = exports.SiteConfigurationError = exports.ServiceUnavailable_UploadsUnavailableError = exports.ServiceUnavailableError = exports.RateLimited_TooManySharesError = exports.RateLimited_TooManyRequestsError = exports.RateLimited_TooManyLoginAttemptsError = exports.RateLimited_TooManyConcurrentRequestsError = exports.RateLimited_ReauthenticationRateLimitedError = exports.RateLimited_DuplicateShareRecipientError = exports.RateLimitedError = exports.ProcessingFailure_UpdatesNotAllowedForRemotesError = exports.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = exports.ProcessingFailure_SubfolderLockedError = exports.ProcessingFailure_ResourceLockedError = exports.ProcessingFailure_RemoteServerErrorError = exports.ProcessingFailure_RecipientAlreadySharedError = exports.ProcessingFailure_PathTooLongError = exports.ProcessingFailure_MultipleProcessingErrorsError = exports.ProcessingFailure_ModelSaveErrorError = exports.ProcessingFailure_InvalidRangeError = exports.ProcessingFailure_InvalidFilenameError = exports.ProcessingFailure_InvalidFileTypeError = exports.ProcessingFailure_InvalidBundleCodeError = exports.ProcessingFailure_HistoryUnavailableError = exports.ProcessingFailure_FolderNotEmptyError = exports.ProcessingFailure_FolderLockedError = exports.ProcessingFailure_FileUploadedToWrongRegionError = exports.ProcessingFailure_FileTooBigToEncryptError = exports.ProcessingFailure_FileTooBigToDecryptError = exports.ProcessingFailure_FilePendingProcessingError = exports.ProcessingFailure_FileNotUploadedError = exports.ProcessingFailure_FileLockedError = exports.ProcessingFailure_FailedToChangePasswordError = exports.ProcessingFailure_ExportNotReadyError = exports.ProcessingFailure_ExportFailureError = exports.ProcessingFailure_ExpiredPublicKeyError = exports.ProcessingFailure_ExpiredPrivateKeyError = exports.ProcessingFailure_DestinationParentDoesNotExistError = exports.ProcessingFailure_DestinationParentConflictError = exports.ProcessingFailure_DestinationFolderLimitedError = exports.ProcessingFailure_DestinationExistsError = exports.ProcessingFailure_CouldNotCreateParentError = exports.ProcessingFailure_BundleOperationRequiresSubfolderError = exports.ProcessingFailure_BundleOnlyAllowsPreviewsError = exports.ProcessingFailure_AutomationCannotBeRunManuallyError = exports.ProcessingFailureError = exports.NotImplementedError = exports.NotFound_UserNotFoundError = exports.NotFound_SiteNotFoundError = exports.NotFound_PlanNotFoundError = exports.NotFound_NestedNotFoundError = exports.NotFound_InboxNotFoundError = exports.NotFound_GroupNotFoundError = exports.NotFound_FolderNotFoundError = exports.NotFound_FileUploadNotFoundError = exports.NotFound_FileNotFoundError = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _Logger = _interopRequireDefault(require("./Logger"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FilesError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(FilesError, _Error);
  var _super = _createSuper(FilesError);
  function FilesError(message) {
    var _this;
    (0, _classCallCheck2.default)(this, FilesError);
    _this = _super.call(this, message);
    _this.name = 'FilesError';
    return _this;
  }
  return (0, _createClass2.default)(FilesError);
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
exports.FilesError = FilesError;
var FilesApiError = /*#__PURE__*/function (_FilesError) {
  (0, _inherits2.default)(FilesApiError, _FilesError);
  var _super2 = _createSuper(FilesApiError);
  function FilesApiError(message, code) {
    var _this2;
    (0, _classCallCheck2.default)(this, FilesApiError);
    _this2 = _super2.call(this, message);
    _this2.name = 'FilesApiError';
    _this2.code = code;
    return _this2;
  }
  return (0, _createClass2.default)(FilesApiError);
}(FilesError);
exports.FilesApiError = FilesApiError;
var errorClasses = {
  FilesApiError: FilesApiError
};
var toPascalCase = function toPascalCase(string) {
  return string.replace(/-/g, ' ').split(' ').map(function (part) {
    return part[0].toUpperCase() + part.substring(1);
  }).join('');
};
var handleErrorResponse = function handleErrorResponse(error) {
  var _errorData, _errorData2;
  var response = error.response;
  var errorData = response === null || response === void 0 ? void 0 : response.data;
  var message = ((_errorData = errorData) === null || _errorData === void 0 ? void 0 : _errorData.error) || (response === null || response === void 0 ? void 0 : response.statusText) || error.message;
  var code = (response === null || response === void 0 ? void 0 : response.status) || ((_errorData2 = errorData) === null || _errorData2 === void 0 ? void 0 : _errorData2['http-code']) || 0;
  if (!errorData) {
    _Logger.default.error('FilesApiError Exception >', code, message);
    throw new FilesApiError(message, code);
  }
  if (Array.isArray(errorData)) {
    errorData = errorData[0];
  }
  if (!errorData.type) {
    _Logger.default.error('FilesApiError Exception >', code, message);
    throw new FilesApiError(message, code);
  }
  var parts = errorData.type.split('/');
  var className;
  if (parts.length > 1) {
    var _parts$map = parts.map(toPascalCase),
      _parts$map2 = (0, _slicedToArray2.default)(_parts$map, 2),
      errorFamily = _parts$map2[0],
      errorType = _parts$map2[1];
    className = "".concat(errorFamily, "_").concat(errorType, "Error");
  } else {
    var _errorType = toPascalCase(parts[0]);
    className = "".concat(_errorType, "Error");
  }
  var ErrorClass = errorClasses[className] || FilesApiError;
  if (!errorClasses[className]) {
    _Logger.default.debug("Unable to find exception with name of ".concat(className, " - falling back to FilesApiError"));
  }
  _Logger.default.error("".concat(ErrorClass.name, " Exception >"), code, message);
  throw new ErrorClass(message, code);
};

// general errors
exports.handleErrorResponse = handleErrorResponse;
var ConfigurationError = /*#__PURE__*/function (_FilesError2) {
  (0, _inherits2.default)(ConfigurationError, _FilesError2);
  var _super3 = _createSuper(ConfigurationError);
  function ConfigurationError(message) {
    var _this3;
    (0, _classCallCheck2.default)(this, ConfigurationError);
    _this3 = _super3.call(this, message);
    _this3.name = 'ConfigurationError';
    return _this3;
  }
  return (0, _createClass2.default)(ConfigurationError);
}(FilesError);
exports.ConfigurationError = ConfigurationError;
errorClasses.ConfigurationError = ConfigurationError;
var EmptyPropertyError = /*#__PURE__*/function (_FilesError3) {
  (0, _inherits2.default)(EmptyPropertyError, _FilesError3);
  var _super4 = _createSuper(EmptyPropertyError);
  function EmptyPropertyError(message) {
    var _this4;
    (0, _classCallCheck2.default)(this, EmptyPropertyError);
    _this4 = _super4.call(this, message);
    _this4.name = 'EmptyPropertyError';
    return _this4;
  }
  return (0, _createClass2.default)(EmptyPropertyError);
}(FilesError);
exports.EmptyPropertyError = EmptyPropertyError;
errorClasses.EmptyPropertyError = EmptyPropertyError;
var InvalidParameterError = /*#__PURE__*/function (_FilesError4) {
  (0, _inherits2.default)(InvalidParameterError, _FilesError4);
  var _super5 = _createSuper(InvalidParameterError);
  function InvalidParameterError(message) {
    var _this5;
    (0, _classCallCheck2.default)(this, InvalidParameterError);
    _this5 = _super5.call(this, message);
    _this5.name = 'InvalidParameterError';
    return _this5;
  }
  return (0, _createClass2.default)(InvalidParameterError);
}(FilesError);
exports.InvalidParameterError = InvalidParameterError;
errorClasses.InvalidParameterError = InvalidParameterError;
var MissingParameterError = /*#__PURE__*/function (_FilesError5) {
  (0, _inherits2.default)(MissingParameterError, _FilesError5);
  var _super6 = _createSuper(MissingParameterError);
  function MissingParameterError(message) {
    var _this6;
    (0, _classCallCheck2.default)(this, MissingParameterError);
    _this6 = _super6.call(this, message);
    _this6.name = 'MissingParameterError';
    return _this6;
  }
  return (0, _createClass2.default)(MissingParameterError);
}(FilesError);
exports.MissingParameterError = MissingParameterError;
errorClasses.MissingParameterError = MissingParameterError;
var NotImplementedError = /*#__PURE__*/function (_FilesError6) {
  (0, _inherits2.default)(NotImplementedError, _FilesError6);
  var _super7 = _createSuper(NotImplementedError);
  function NotImplementedError(message) {
    var _this7;
    (0, _classCallCheck2.default)(this, NotImplementedError);
    _this7 = _super7.call(this, message);
    _this7.name = 'NotImplementedError';
    return _this7;
  }
  return (0, _createClass2.default)(NotImplementedError);
}(FilesError);
exports.NotImplementedError = NotImplementedError;
errorClasses.NotImplementedError = NotImplementedError;

// api error groups
var BadRequestError = /*#__PURE__*/function (_FilesApiError) {
  (0, _inherits2.default)(BadRequestError, _FilesApiError);
  var _super8 = _createSuper(BadRequestError);
  function BadRequestError(message, code) {
    var _this8;
    (0, _classCallCheck2.default)(this, BadRequestError);
    _this8 = _super8.call(this, message, code);
    _this8.name = 'BadRequestError';
    return _this8;
  }
  return (0, _createClass2.default)(BadRequestError);
}(FilesApiError);
exports.BadRequestError = BadRequestError;
errorClasses.BadRequestError = BadRequestError;
var NotAuthenticatedError = /*#__PURE__*/function (_FilesApiError2) {
  (0, _inherits2.default)(NotAuthenticatedError, _FilesApiError2);
  var _super9 = _createSuper(NotAuthenticatedError);
  function NotAuthenticatedError(message, code) {
    var _this9;
    (0, _classCallCheck2.default)(this, NotAuthenticatedError);
    _this9 = _super9.call(this, message, code);
    _this9.name = 'NotAuthenticatedError';
    return _this9;
  }
  return (0, _createClass2.default)(NotAuthenticatedError);
}(FilesApiError);
exports.NotAuthenticatedError = NotAuthenticatedError;
errorClasses.NotAuthenticatedError = NotAuthenticatedError;
var NotAuthorizedError = /*#__PURE__*/function (_FilesApiError3) {
  (0, _inherits2.default)(NotAuthorizedError, _FilesApiError3);
  var _super10 = _createSuper(NotAuthorizedError);
  function NotAuthorizedError(message, code) {
    var _this10;
    (0, _classCallCheck2.default)(this, NotAuthorizedError);
    _this10 = _super10.call(this, message, code);
    _this10.name = 'NotAuthorizedError';
    return _this10;
  }
  return (0, _createClass2.default)(NotAuthorizedError);
}(FilesApiError);
exports.NotAuthorizedError = NotAuthorizedError;
errorClasses.NotAuthorizedError = NotAuthorizedError;
var NotFoundError = /*#__PURE__*/function (_FilesApiError4) {
  (0, _inherits2.default)(NotFoundError, _FilesApiError4);
  var _super11 = _createSuper(NotFoundError);
  function NotFoundError(message, code) {
    var _this11;
    (0, _classCallCheck2.default)(this, NotFoundError);
    _this11 = _super11.call(this, message, code);
    _this11.name = 'NotFoundError';
    return _this11;
  }
  return (0, _createClass2.default)(NotFoundError);
}(FilesApiError);
exports.NotFoundError = NotFoundError;
errorClasses.NotFoundError = NotFoundError;
var ProcessingFailureError = /*#__PURE__*/function (_FilesApiError5) {
  (0, _inherits2.default)(ProcessingFailureError, _FilesApiError5);
  var _super12 = _createSuper(ProcessingFailureError);
  function ProcessingFailureError(message, code) {
    var _this12;
    (0, _classCallCheck2.default)(this, ProcessingFailureError);
    _this12 = _super12.call(this, message, code);
    _this12.name = 'ProcessingFailureError';
    return _this12;
  }
  return (0, _createClass2.default)(ProcessingFailureError);
}(FilesApiError);
exports.ProcessingFailureError = ProcessingFailureError;
errorClasses.ProcessingFailureError = ProcessingFailureError;
var RateLimitedError = /*#__PURE__*/function (_FilesApiError6) {
  (0, _inherits2.default)(RateLimitedError, _FilesApiError6);
  var _super13 = _createSuper(RateLimitedError);
  function RateLimitedError(message, code) {
    var _this13;
    (0, _classCallCheck2.default)(this, RateLimitedError);
    _this13 = _super13.call(this, message, code);
    _this13.name = 'RateLimitedError';
    return _this13;
  }
  return (0, _createClass2.default)(RateLimitedError);
}(FilesApiError);
exports.RateLimitedError = RateLimitedError;
errorClasses.RateLimitedError = RateLimitedError;
var ServiceUnavailableError = /*#__PURE__*/function (_FilesApiError7) {
  (0, _inherits2.default)(ServiceUnavailableError, _FilesApiError7);
  var _super14 = _createSuper(ServiceUnavailableError);
  function ServiceUnavailableError(message, code) {
    var _this14;
    (0, _classCallCheck2.default)(this, ServiceUnavailableError);
    _this14 = _super14.call(this, message, code);
    _this14.name = 'ServiceUnavailableError';
    return _this14;
  }
  return (0, _createClass2.default)(ServiceUnavailableError);
}(FilesApiError);
exports.ServiceUnavailableError = ServiceUnavailableError;
errorClasses.ServiceUnavailableError = ServiceUnavailableError;
var SiteConfigurationError = /*#__PURE__*/function (_FilesApiError8) {
  (0, _inherits2.default)(SiteConfigurationError, _FilesApiError8);
  var _super15 = _createSuper(SiteConfigurationError);
  function SiteConfigurationError(message, code) {
    var _this15;
    (0, _classCallCheck2.default)(this, SiteConfigurationError);
    _this15 = _super15.call(this, message, code);
    _this15.name = 'SiteConfigurationError';
    return _this15;
  }
  return (0, _createClass2.default)(SiteConfigurationError);
}(FilesApiError);
exports.SiteConfigurationError = SiteConfigurationError;
errorClasses.SiteConfigurationError = SiteConfigurationError;

// grouped api errors
var BadRequest_AgentUpgradeRequiredError = /*#__PURE__*/function (_BadRequestError) {
  (0, _inherits2.default)(BadRequest_AgentUpgradeRequiredError, _BadRequestError);
  var _super16 = _createSuper(BadRequest_AgentUpgradeRequiredError);
  function BadRequest_AgentUpgradeRequiredError(message, code) {
    var _this16;
    (0, _classCallCheck2.default)(this, BadRequest_AgentUpgradeRequiredError);
    _this16 = _super16.call(this, message, code);
    _this16.name = 'BadRequest_AgentUpgradeRequiredError';
    return _this16;
  }
  return (0, _createClass2.default)(BadRequest_AgentUpgradeRequiredError);
}(BadRequestError);
exports.BadRequest_AgentUpgradeRequiredError = BadRequest_AgentUpgradeRequiredError;
errorClasses.BadRequest_AgentUpgradeRequiredError = BadRequest_AgentUpgradeRequiredError;
var BadRequest_AttachmentTooLargeError = /*#__PURE__*/function (_BadRequestError2) {
  (0, _inherits2.default)(BadRequest_AttachmentTooLargeError, _BadRequestError2);
  var _super17 = _createSuper(BadRequest_AttachmentTooLargeError);
  function BadRequest_AttachmentTooLargeError(message, code) {
    var _this17;
    (0, _classCallCheck2.default)(this, BadRequest_AttachmentTooLargeError);
    _this17 = _super17.call(this, message, code);
    _this17.name = 'BadRequest_AttachmentTooLargeError';
    return _this17;
  }
  return (0, _createClass2.default)(BadRequest_AttachmentTooLargeError);
}(BadRequestError);
exports.BadRequest_AttachmentTooLargeError = BadRequest_AttachmentTooLargeError;
errorClasses.BadRequest_AttachmentTooLargeError = BadRequest_AttachmentTooLargeError;
var BadRequest_CannotDownloadDirectoryError = /*#__PURE__*/function (_BadRequestError3) {
  (0, _inherits2.default)(BadRequest_CannotDownloadDirectoryError, _BadRequestError3);
  var _super18 = _createSuper(BadRequest_CannotDownloadDirectoryError);
  function BadRequest_CannotDownloadDirectoryError(message, code) {
    var _this18;
    (0, _classCallCheck2.default)(this, BadRequest_CannotDownloadDirectoryError);
    _this18 = _super18.call(this, message, code);
    _this18.name = 'BadRequest_CannotDownloadDirectoryError';
    return _this18;
  }
  return (0, _createClass2.default)(BadRequest_CannotDownloadDirectoryError);
}(BadRequestError);
exports.BadRequest_CannotDownloadDirectoryError = BadRequest_CannotDownloadDirectoryError;
errorClasses.BadRequest_CannotDownloadDirectoryError = BadRequest_CannotDownloadDirectoryError;
var BadRequest_CantMoveWithMultipleLocationsError = /*#__PURE__*/function (_BadRequestError4) {
  (0, _inherits2.default)(BadRequest_CantMoveWithMultipleLocationsError, _BadRequestError4);
  var _super19 = _createSuper(BadRequest_CantMoveWithMultipleLocationsError);
  function BadRequest_CantMoveWithMultipleLocationsError(message, code) {
    var _this19;
    (0, _classCallCheck2.default)(this, BadRequest_CantMoveWithMultipleLocationsError);
    _this19 = _super19.call(this, message, code);
    _this19.name = 'BadRequest_CantMoveWithMultipleLocationsError';
    return _this19;
  }
  return (0, _createClass2.default)(BadRequest_CantMoveWithMultipleLocationsError);
}(BadRequestError);
exports.BadRequest_CantMoveWithMultipleLocationsError = BadRequest_CantMoveWithMultipleLocationsError;
errorClasses.BadRequest_CantMoveWithMultipleLocationsError = BadRequest_CantMoveWithMultipleLocationsError;
var BadRequest_DatetimeParseError = /*#__PURE__*/function (_BadRequestError5) {
  (0, _inherits2.default)(BadRequest_DatetimeParseError, _BadRequestError5);
  var _super20 = _createSuper(BadRequest_DatetimeParseError);
  function BadRequest_DatetimeParseError(message, code) {
    var _this20;
    (0, _classCallCheck2.default)(this, BadRequest_DatetimeParseError);
    _this20 = _super20.call(this, message, code);
    _this20.name = 'BadRequest_DatetimeParseError';
    return _this20;
  }
  return (0, _createClass2.default)(BadRequest_DatetimeParseError);
}(BadRequestError);
exports.BadRequest_DatetimeParseError = BadRequest_DatetimeParseError;
errorClasses.BadRequest_DatetimeParseError = BadRequest_DatetimeParseError;
var BadRequest_DestinationSameError = /*#__PURE__*/function (_BadRequestError6) {
  (0, _inherits2.default)(BadRequest_DestinationSameError, _BadRequestError6);
  var _super21 = _createSuper(BadRequest_DestinationSameError);
  function BadRequest_DestinationSameError(message, code) {
    var _this21;
    (0, _classCallCheck2.default)(this, BadRequest_DestinationSameError);
    _this21 = _super21.call(this, message, code);
    _this21.name = 'BadRequest_DestinationSameError';
    return _this21;
  }
  return (0, _createClass2.default)(BadRequest_DestinationSameError);
}(BadRequestError);
exports.BadRequest_DestinationSameError = BadRequest_DestinationSameError;
errorClasses.BadRequest_DestinationSameError = BadRequest_DestinationSameError;
var BadRequest_FolderMustNotBeAFileError = /*#__PURE__*/function (_BadRequestError7) {
  (0, _inherits2.default)(BadRequest_FolderMustNotBeAFileError, _BadRequestError7);
  var _super22 = _createSuper(BadRequest_FolderMustNotBeAFileError);
  function BadRequest_FolderMustNotBeAFileError(message, code) {
    var _this22;
    (0, _classCallCheck2.default)(this, BadRequest_FolderMustNotBeAFileError);
    _this22 = _super22.call(this, message, code);
    _this22.name = 'BadRequest_FolderMustNotBeAFileError';
    return _this22;
  }
  return (0, _createClass2.default)(BadRequest_FolderMustNotBeAFileError);
}(BadRequestError);
exports.BadRequest_FolderMustNotBeAFileError = BadRequest_FolderMustNotBeAFileError;
errorClasses.BadRequest_FolderMustNotBeAFileError = BadRequest_FolderMustNotBeAFileError;
var BadRequest_InvalidBodyError = /*#__PURE__*/function (_BadRequestError8) {
  (0, _inherits2.default)(BadRequest_InvalidBodyError, _BadRequestError8);
  var _super23 = _createSuper(BadRequest_InvalidBodyError);
  function BadRequest_InvalidBodyError(message, code) {
    var _this23;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidBodyError);
    _this23 = _super23.call(this, message, code);
    _this23.name = 'BadRequest_InvalidBodyError';
    return _this23;
  }
  return (0, _createClass2.default)(BadRequest_InvalidBodyError);
}(BadRequestError);
exports.BadRequest_InvalidBodyError = BadRequest_InvalidBodyError;
errorClasses.BadRequest_InvalidBodyError = BadRequest_InvalidBodyError;
var BadRequest_InvalidCursorError = /*#__PURE__*/function (_BadRequestError9) {
  (0, _inherits2.default)(BadRequest_InvalidCursorError, _BadRequestError9);
  var _super24 = _createSuper(BadRequest_InvalidCursorError);
  function BadRequest_InvalidCursorError(message, code) {
    var _this24;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidCursorError);
    _this24 = _super24.call(this, message, code);
    _this24.name = 'BadRequest_InvalidCursorError';
    return _this24;
  }
  return (0, _createClass2.default)(BadRequest_InvalidCursorError);
}(BadRequestError);
exports.BadRequest_InvalidCursorError = BadRequest_InvalidCursorError;
errorClasses.BadRequest_InvalidCursorError = BadRequest_InvalidCursorError;
var BadRequest_InvalidCursorTypeForSortError = /*#__PURE__*/function (_BadRequestError10) {
  (0, _inherits2.default)(BadRequest_InvalidCursorTypeForSortError, _BadRequestError10);
  var _super25 = _createSuper(BadRequest_InvalidCursorTypeForSortError);
  function BadRequest_InvalidCursorTypeForSortError(message, code) {
    var _this25;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidCursorTypeForSortError);
    _this25 = _super25.call(this, message, code);
    _this25.name = 'BadRequest_InvalidCursorTypeForSortError';
    return _this25;
  }
  return (0, _createClass2.default)(BadRequest_InvalidCursorTypeForSortError);
}(BadRequestError);
exports.BadRequest_InvalidCursorTypeForSortError = BadRequest_InvalidCursorTypeForSortError;
errorClasses.BadRequest_InvalidCursorTypeForSortError = BadRequest_InvalidCursorTypeForSortError;
var BadRequest_InvalidEtagsError = /*#__PURE__*/function (_BadRequestError11) {
  (0, _inherits2.default)(BadRequest_InvalidEtagsError, _BadRequestError11);
  var _super26 = _createSuper(BadRequest_InvalidEtagsError);
  function BadRequest_InvalidEtagsError(message, code) {
    var _this26;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidEtagsError);
    _this26 = _super26.call(this, message, code);
    _this26.name = 'BadRequest_InvalidEtagsError';
    return _this26;
  }
  return (0, _createClass2.default)(BadRequest_InvalidEtagsError);
}(BadRequestError);
exports.BadRequest_InvalidEtagsError = BadRequest_InvalidEtagsError;
errorClasses.BadRequest_InvalidEtagsError = BadRequest_InvalidEtagsError;
var BadRequest_InvalidFilterAliasCombinationError = /*#__PURE__*/function (_BadRequestError12) {
  (0, _inherits2.default)(BadRequest_InvalidFilterAliasCombinationError, _BadRequestError12);
  var _super27 = _createSuper(BadRequest_InvalidFilterAliasCombinationError);
  function BadRequest_InvalidFilterAliasCombinationError(message, code) {
    var _this27;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterAliasCombinationError);
    _this27 = _super27.call(this, message, code);
    _this27.name = 'BadRequest_InvalidFilterAliasCombinationError';
    return _this27;
  }
  return (0, _createClass2.default)(BadRequest_InvalidFilterAliasCombinationError);
}(BadRequestError);
exports.BadRequest_InvalidFilterAliasCombinationError = BadRequest_InvalidFilterAliasCombinationError;
errorClasses.BadRequest_InvalidFilterAliasCombinationError = BadRequest_InvalidFilterAliasCombinationError;
var BadRequest_InvalidFilterCombinationError = /*#__PURE__*/function (_BadRequestError13) {
  (0, _inherits2.default)(BadRequest_InvalidFilterCombinationError, _BadRequestError13);
  var _super28 = _createSuper(BadRequest_InvalidFilterCombinationError);
  function BadRequest_InvalidFilterCombinationError(message, code) {
    var _this28;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterCombinationError);
    _this28 = _super28.call(this, message, code);
    _this28.name = 'BadRequest_InvalidFilterCombinationError';
    return _this28;
  }
  return (0, _createClass2.default)(BadRequest_InvalidFilterCombinationError);
}(BadRequestError);
exports.BadRequest_InvalidFilterCombinationError = BadRequest_InvalidFilterCombinationError;
errorClasses.BadRequest_InvalidFilterCombinationError = BadRequest_InvalidFilterCombinationError;
var BadRequest_InvalidFilterFieldError = /*#__PURE__*/function (_BadRequestError14) {
  (0, _inherits2.default)(BadRequest_InvalidFilterFieldError, _BadRequestError14);
  var _super29 = _createSuper(BadRequest_InvalidFilterFieldError);
  function BadRequest_InvalidFilterFieldError(message, code) {
    var _this29;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterFieldError);
    _this29 = _super29.call(this, message, code);
    _this29.name = 'BadRequest_InvalidFilterFieldError';
    return _this29;
  }
  return (0, _createClass2.default)(BadRequest_InvalidFilterFieldError);
}(BadRequestError);
exports.BadRequest_InvalidFilterFieldError = BadRequest_InvalidFilterFieldError;
errorClasses.BadRequest_InvalidFilterFieldError = BadRequest_InvalidFilterFieldError;
var BadRequest_InvalidFilterParamError = /*#__PURE__*/function (_BadRequestError15) {
  (0, _inherits2.default)(BadRequest_InvalidFilterParamError, _BadRequestError15);
  var _super30 = _createSuper(BadRequest_InvalidFilterParamError);
  function BadRequest_InvalidFilterParamError(message, code) {
    var _this30;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterParamError);
    _this30 = _super30.call(this, message, code);
    _this30.name = 'BadRequest_InvalidFilterParamError';
    return _this30;
  }
  return (0, _createClass2.default)(BadRequest_InvalidFilterParamError);
}(BadRequestError);
exports.BadRequest_InvalidFilterParamError = BadRequest_InvalidFilterParamError;
errorClasses.BadRequest_InvalidFilterParamError = BadRequest_InvalidFilterParamError;
var BadRequest_InvalidInputEncodingError = /*#__PURE__*/function (_BadRequestError16) {
  (0, _inherits2.default)(BadRequest_InvalidInputEncodingError, _BadRequestError16);
  var _super31 = _createSuper(BadRequest_InvalidInputEncodingError);
  function BadRequest_InvalidInputEncodingError(message, code) {
    var _this31;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidInputEncodingError);
    _this31 = _super31.call(this, message, code);
    _this31.name = 'BadRequest_InvalidInputEncodingError';
    return _this31;
  }
  return (0, _createClass2.default)(BadRequest_InvalidInputEncodingError);
}(BadRequestError);
exports.BadRequest_InvalidInputEncodingError = BadRequest_InvalidInputEncodingError;
errorClasses.BadRequest_InvalidInputEncodingError = BadRequest_InvalidInputEncodingError;
var BadRequest_InvalidInterfaceError = /*#__PURE__*/function (_BadRequestError17) {
  (0, _inherits2.default)(BadRequest_InvalidInterfaceError, _BadRequestError17);
  var _super32 = _createSuper(BadRequest_InvalidInterfaceError);
  function BadRequest_InvalidInterfaceError(message, code) {
    var _this32;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidInterfaceError);
    _this32 = _super32.call(this, message, code);
    _this32.name = 'BadRequest_InvalidInterfaceError';
    return _this32;
  }
  return (0, _createClass2.default)(BadRequest_InvalidInterfaceError);
}(BadRequestError);
exports.BadRequest_InvalidInterfaceError = BadRequest_InvalidInterfaceError;
errorClasses.BadRequest_InvalidInterfaceError = BadRequest_InvalidInterfaceError;
var BadRequest_InvalidOauthProviderError = /*#__PURE__*/function (_BadRequestError18) {
  (0, _inherits2.default)(BadRequest_InvalidOauthProviderError, _BadRequestError18);
  var _super33 = _createSuper(BadRequest_InvalidOauthProviderError);
  function BadRequest_InvalidOauthProviderError(message, code) {
    var _this33;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidOauthProviderError);
    _this33 = _super33.call(this, message, code);
    _this33.name = 'BadRequest_InvalidOauthProviderError';
    return _this33;
  }
  return (0, _createClass2.default)(BadRequest_InvalidOauthProviderError);
}(BadRequestError);
exports.BadRequest_InvalidOauthProviderError = BadRequest_InvalidOauthProviderError;
errorClasses.BadRequest_InvalidOauthProviderError = BadRequest_InvalidOauthProviderError;
var BadRequest_InvalidPathError = /*#__PURE__*/function (_BadRequestError19) {
  (0, _inherits2.default)(BadRequest_InvalidPathError, _BadRequestError19);
  var _super34 = _createSuper(BadRequest_InvalidPathError);
  function BadRequest_InvalidPathError(message, code) {
    var _this34;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidPathError);
    _this34 = _super34.call(this, message, code);
    _this34.name = 'BadRequest_InvalidPathError';
    return _this34;
  }
  return (0, _createClass2.default)(BadRequest_InvalidPathError);
}(BadRequestError);
exports.BadRequest_InvalidPathError = BadRequest_InvalidPathError;
errorClasses.BadRequest_InvalidPathError = BadRequest_InvalidPathError;
var BadRequest_InvalidReturnToUrlError = /*#__PURE__*/function (_BadRequestError20) {
  (0, _inherits2.default)(BadRequest_InvalidReturnToUrlError, _BadRequestError20);
  var _super35 = _createSuper(BadRequest_InvalidReturnToUrlError);
  function BadRequest_InvalidReturnToUrlError(message, code) {
    var _this35;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidReturnToUrlError);
    _this35 = _super35.call(this, message, code);
    _this35.name = 'BadRequest_InvalidReturnToUrlError';
    return _this35;
  }
  return (0, _createClass2.default)(BadRequest_InvalidReturnToUrlError);
}(BadRequestError);
exports.BadRequest_InvalidReturnToUrlError = BadRequest_InvalidReturnToUrlError;
errorClasses.BadRequest_InvalidReturnToUrlError = BadRequest_InvalidReturnToUrlError;
var BadRequest_InvalidUploadOffsetError = /*#__PURE__*/function (_BadRequestError21) {
  (0, _inherits2.default)(BadRequest_InvalidUploadOffsetError, _BadRequestError21);
  var _super36 = _createSuper(BadRequest_InvalidUploadOffsetError);
  function BadRequest_InvalidUploadOffsetError(message, code) {
    var _this36;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidUploadOffsetError);
    _this36 = _super36.call(this, message, code);
    _this36.name = 'BadRequest_InvalidUploadOffsetError';
    return _this36;
  }
  return (0, _createClass2.default)(BadRequest_InvalidUploadOffsetError);
}(BadRequestError);
exports.BadRequest_InvalidUploadOffsetError = BadRequest_InvalidUploadOffsetError;
errorClasses.BadRequest_InvalidUploadOffsetError = BadRequest_InvalidUploadOffsetError;
var BadRequest_InvalidUploadPartGapError = /*#__PURE__*/function (_BadRequestError22) {
  (0, _inherits2.default)(BadRequest_InvalidUploadPartGapError, _BadRequestError22);
  var _super37 = _createSuper(BadRequest_InvalidUploadPartGapError);
  function BadRequest_InvalidUploadPartGapError(message, code) {
    var _this37;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidUploadPartGapError);
    _this37 = _super37.call(this, message, code);
    _this37.name = 'BadRequest_InvalidUploadPartGapError';
    return _this37;
  }
  return (0, _createClass2.default)(BadRequest_InvalidUploadPartGapError);
}(BadRequestError);
exports.BadRequest_InvalidUploadPartGapError = BadRequest_InvalidUploadPartGapError;
errorClasses.BadRequest_InvalidUploadPartGapError = BadRequest_InvalidUploadPartGapError;
var BadRequest_InvalidUploadPartSizeError = /*#__PURE__*/function (_BadRequestError23) {
  (0, _inherits2.default)(BadRequest_InvalidUploadPartSizeError, _BadRequestError23);
  var _super38 = _createSuper(BadRequest_InvalidUploadPartSizeError);
  function BadRequest_InvalidUploadPartSizeError(message, code) {
    var _this38;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidUploadPartSizeError);
    _this38 = _super38.call(this, message, code);
    _this38.name = 'BadRequest_InvalidUploadPartSizeError';
    return _this38;
  }
  return (0, _createClass2.default)(BadRequest_InvalidUploadPartSizeError);
}(BadRequestError);
exports.BadRequest_InvalidUploadPartSizeError = BadRequest_InvalidUploadPartSizeError;
errorClasses.BadRequest_InvalidUploadPartSizeError = BadRequest_InvalidUploadPartSizeError;
var BadRequest_MethodNotAllowedError = /*#__PURE__*/function (_BadRequestError24) {
  (0, _inherits2.default)(BadRequest_MethodNotAllowedError, _BadRequestError24);
  var _super39 = _createSuper(BadRequest_MethodNotAllowedError);
  function BadRequest_MethodNotAllowedError(message, code) {
    var _this39;
    (0, _classCallCheck2.default)(this, BadRequest_MethodNotAllowedError);
    _this39 = _super39.call(this, message, code);
    _this39.name = 'BadRequest_MethodNotAllowedError';
    return _this39;
  }
  return (0, _createClass2.default)(BadRequest_MethodNotAllowedError);
}(BadRequestError);
exports.BadRequest_MethodNotAllowedError = BadRequest_MethodNotAllowedError;
errorClasses.BadRequest_MethodNotAllowedError = BadRequest_MethodNotAllowedError;
var BadRequest_NoValidInputParamsError = /*#__PURE__*/function (_BadRequestError25) {
  (0, _inherits2.default)(BadRequest_NoValidInputParamsError, _BadRequestError25);
  var _super40 = _createSuper(BadRequest_NoValidInputParamsError);
  function BadRequest_NoValidInputParamsError(message, code) {
    var _this40;
    (0, _classCallCheck2.default)(this, BadRequest_NoValidInputParamsError);
    _this40 = _super40.call(this, message, code);
    _this40.name = 'BadRequest_NoValidInputParamsError';
    return _this40;
  }
  return (0, _createClass2.default)(BadRequest_NoValidInputParamsError);
}(BadRequestError);
exports.BadRequest_NoValidInputParamsError = BadRequest_NoValidInputParamsError;
errorClasses.BadRequest_NoValidInputParamsError = BadRequest_NoValidInputParamsError;
var BadRequest_OperationOnNonScimResourceError = /*#__PURE__*/function (_BadRequestError26) {
  (0, _inherits2.default)(BadRequest_OperationOnNonScimResourceError, _BadRequestError26);
  var _super41 = _createSuper(BadRequest_OperationOnNonScimResourceError);
  function BadRequest_OperationOnNonScimResourceError(message, code) {
    var _this41;
    (0, _classCallCheck2.default)(this, BadRequest_OperationOnNonScimResourceError);
    _this41 = _super41.call(this, message, code);
    _this41.name = 'BadRequest_OperationOnNonScimResourceError';
    return _this41;
  }
  return (0, _createClass2.default)(BadRequest_OperationOnNonScimResourceError);
}(BadRequestError);
exports.BadRequest_OperationOnNonScimResourceError = BadRequest_OperationOnNonScimResourceError;
errorClasses.BadRequest_OperationOnNonScimResourceError = BadRequest_OperationOnNonScimResourceError;
var BadRequest_PartNumberTooLargeError = /*#__PURE__*/function (_BadRequestError27) {
  (0, _inherits2.default)(BadRequest_PartNumberTooLargeError, _BadRequestError27);
  var _super42 = _createSuper(BadRequest_PartNumberTooLargeError);
  function BadRequest_PartNumberTooLargeError(message, code) {
    var _this42;
    (0, _classCallCheck2.default)(this, BadRequest_PartNumberTooLargeError);
    _this42 = _super42.call(this, message, code);
    _this42.name = 'BadRequest_PartNumberTooLargeError';
    return _this42;
  }
  return (0, _createClass2.default)(BadRequest_PartNumberTooLargeError);
}(BadRequestError);
exports.BadRequest_PartNumberTooLargeError = BadRequest_PartNumberTooLargeError;
errorClasses.BadRequest_PartNumberTooLargeError = BadRequest_PartNumberTooLargeError;
var BadRequest_ReauthenticationNeededFieldsError = /*#__PURE__*/function (_BadRequestError28) {
  (0, _inherits2.default)(BadRequest_ReauthenticationNeededFieldsError, _BadRequestError28);
  var _super43 = _createSuper(BadRequest_ReauthenticationNeededFieldsError);
  function BadRequest_ReauthenticationNeededFieldsError(message, code) {
    var _this43;
    (0, _classCallCheck2.default)(this, BadRequest_ReauthenticationNeededFieldsError);
    _this43 = _super43.call(this, message, code);
    _this43.name = 'BadRequest_ReauthenticationNeededFieldsError';
    return _this43;
  }
  return (0, _createClass2.default)(BadRequest_ReauthenticationNeededFieldsError);
}(BadRequestError);
exports.BadRequest_ReauthenticationNeededFieldsError = BadRequest_ReauthenticationNeededFieldsError;
errorClasses.BadRequest_ReauthenticationNeededFieldsError = BadRequest_ReauthenticationNeededFieldsError;
var BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = /*#__PURE__*/function (_BadRequestError29) {
  (0, _inherits2.default)(BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError, _BadRequestError29);
  var _super44 = _createSuper(BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError);
  function BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError(message, code) {
    var _this44;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError);
    _this44 = _super44.call(this, message, code);
    _this44.name = 'BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError';
    return _this44;
  }
  return (0, _createClass2.default)(BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError);
}(BadRequestError);
exports.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError;
errorClasses.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError;
var BadRequest_RequestParamsContainInvalidCharacterError = /*#__PURE__*/function (_BadRequestError30) {
  (0, _inherits2.default)(BadRequest_RequestParamsContainInvalidCharacterError, _BadRequestError30);
  var _super45 = _createSuper(BadRequest_RequestParamsContainInvalidCharacterError);
  function BadRequest_RequestParamsContainInvalidCharacterError(message, code) {
    var _this45;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamsContainInvalidCharacterError);
    _this45 = _super45.call(this, message, code);
    _this45.name = 'BadRequest_RequestParamsContainInvalidCharacterError';
    return _this45;
  }
  return (0, _createClass2.default)(BadRequest_RequestParamsContainInvalidCharacterError);
}(BadRequestError);
exports.BadRequest_RequestParamsContainInvalidCharacterError = BadRequest_RequestParamsContainInvalidCharacterError;
errorClasses.BadRequest_RequestParamsContainInvalidCharacterError = BadRequest_RequestParamsContainInvalidCharacterError;
var BadRequest_RequestParamsInvalidError = /*#__PURE__*/function (_BadRequestError31) {
  (0, _inherits2.default)(BadRequest_RequestParamsInvalidError, _BadRequestError31);
  var _super46 = _createSuper(BadRequest_RequestParamsInvalidError);
  function BadRequest_RequestParamsInvalidError(message, code) {
    var _this46;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamsInvalidError);
    _this46 = _super46.call(this, message, code);
    _this46.name = 'BadRequest_RequestParamsInvalidError';
    return _this46;
  }
  return (0, _createClass2.default)(BadRequest_RequestParamsInvalidError);
}(BadRequestError);
exports.BadRequest_RequestParamsInvalidError = BadRequest_RequestParamsInvalidError;
errorClasses.BadRequest_RequestParamsInvalidError = BadRequest_RequestParamsInvalidError;
var BadRequest_RequestParamsRequiredError = /*#__PURE__*/function (_BadRequestError32) {
  (0, _inherits2.default)(BadRequest_RequestParamsRequiredError, _BadRequestError32);
  var _super47 = _createSuper(BadRequest_RequestParamsRequiredError);
  function BadRequest_RequestParamsRequiredError(message, code) {
    var _this47;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamsRequiredError);
    _this47 = _super47.call(this, message, code);
    _this47.name = 'BadRequest_RequestParamsRequiredError';
    return _this47;
  }
  return (0, _createClass2.default)(BadRequest_RequestParamsRequiredError);
}(BadRequestError);
exports.BadRequest_RequestParamsRequiredError = BadRequest_RequestParamsRequiredError;
errorClasses.BadRequest_RequestParamsRequiredError = BadRequest_RequestParamsRequiredError;
var BadRequest_SearchAllOnChildPathError = /*#__PURE__*/function (_BadRequestError33) {
  (0, _inherits2.default)(BadRequest_SearchAllOnChildPathError, _BadRequestError33);
  var _super48 = _createSuper(BadRequest_SearchAllOnChildPathError);
  function BadRequest_SearchAllOnChildPathError(message, code) {
    var _this48;
    (0, _classCallCheck2.default)(this, BadRequest_SearchAllOnChildPathError);
    _this48 = _super48.call(this, message, code);
    _this48.name = 'BadRequest_SearchAllOnChildPathError';
    return _this48;
  }
  return (0, _createClass2.default)(BadRequest_SearchAllOnChildPathError);
}(BadRequestError);
exports.BadRequest_SearchAllOnChildPathError = BadRequest_SearchAllOnChildPathError;
errorClasses.BadRequest_SearchAllOnChildPathError = BadRequest_SearchAllOnChildPathError;
var BadRequest_UnsupportedCurrencyError = /*#__PURE__*/function (_BadRequestError34) {
  (0, _inherits2.default)(BadRequest_UnsupportedCurrencyError, _BadRequestError34);
  var _super49 = _createSuper(BadRequest_UnsupportedCurrencyError);
  function BadRequest_UnsupportedCurrencyError(message, code) {
    var _this49;
    (0, _classCallCheck2.default)(this, BadRequest_UnsupportedCurrencyError);
    _this49 = _super49.call(this, message, code);
    _this49.name = 'BadRequest_UnsupportedCurrencyError';
    return _this49;
  }
  return (0, _createClass2.default)(BadRequest_UnsupportedCurrencyError);
}(BadRequestError);
exports.BadRequest_UnsupportedCurrencyError = BadRequest_UnsupportedCurrencyError;
errorClasses.BadRequest_UnsupportedCurrencyError = BadRequest_UnsupportedCurrencyError;
var BadRequest_UnsupportedHttpResponseFormatError = /*#__PURE__*/function (_BadRequestError35) {
  (0, _inherits2.default)(BadRequest_UnsupportedHttpResponseFormatError, _BadRequestError35);
  var _super50 = _createSuper(BadRequest_UnsupportedHttpResponseFormatError);
  function BadRequest_UnsupportedHttpResponseFormatError(message, code) {
    var _this50;
    (0, _classCallCheck2.default)(this, BadRequest_UnsupportedHttpResponseFormatError);
    _this50 = _super50.call(this, message, code);
    _this50.name = 'BadRequest_UnsupportedHttpResponseFormatError';
    return _this50;
  }
  return (0, _createClass2.default)(BadRequest_UnsupportedHttpResponseFormatError);
}(BadRequestError);
exports.BadRequest_UnsupportedHttpResponseFormatError = BadRequest_UnsupportedHttpResponseFormatError;
errorClasses.BadRequest_UnsupportedHttpResponseFormatError = BadRequest_UnsupportedHttpResponseFormatError;
var BadRequest_UnsupportedMediaTypeError = /*#__PURE__*/function (_BadRequestError36) {
  (0, _inherits2.default)(BadRequest_UnsupportedMediaTypeError, _BadRequestError36);
  var _super51 = _createSuper(BadRequest_UnsupportedMediaTypeError);
  function BadRequest_UnsupportedMediaTypeError(message, code) {
    var _this51;
    (0, _classCallCheck2.default)(this, BadRequest_UnsupportedMediaTypeError);
    _this51 = _super51.call(this, message, code);
    _this51.name = 'BadRequest_UnsupportedMediaTypeError';
    return _this51;
  }
  return (0, _createClass2.default)(BadRequest_UnsupportedMediaTypeError);
}(BadRequestError);
exports.BadRequest_UnsupportedMediaTypeError = BadRequest_UnsupportedMediaTypeError;
errorClasses.BadRequest_UnsupportedMediaTypeError = BadRequest_UnsupportedMediaTypeError;
var BadRequest_UserIdInvalidError = /*#__PURE__*/function (_BadRequestError37) {
  (0, _inherits2.default)(BadRequest_UserIdInvalidError, _BadRequestError37);
  var _super52 = _createSuper(BadRequest_UserIdInvalidError);
  function BadRequest_UserIdInvalidError(message, code) {
    var _this52;
    (0, _classCallCheck2.default)(this, BadRequest_UserIdInvalidError);
    _this52 = _super52.call(this, message, code);
    _this52.name = 'BadRequest_UserIdInvalidError';
    return _this52;
  }
  return (0, _createClass2.default)(BadRequest_UserIdInvalidError);
}(BadRequestError);
exports.BadRequest_UserIdInvalidError = BadRequest_UserIdInvalidError;
errorClasses.BadRequest_UserIdInvalidError = BadRequest_UserIdInvalidError;
var BadRequest_UserIdOnUserEndpointError = /*#__PURE__*/function (_BadRequestError38) {
  (0, _inherits2.default)(BadRequest_UserIdOnUserEndpointError, _BadRequestError38);
  var _super53 = _createSuper(BadRequest_UserIdOnUserEndpointError);
  function BadRequest_UserIdOnUserEndpointError(message, code) {
    var _this53;
    (0, _classCallCheck2.default)(this, BadRequest_UserIdOnUserEndpointError);
    _this53 = _super53.call(this, message, code);
    _this53.name = 'BadRequest_UserIdOnUserEndpointError';
    return _this53;
  }
  return (0, _createClass2.default)(BadRequest_UserIdOnUserEndpointError);
}(BadRequestError);
exports.BadRequest_UserIdOnUserEndpointError = BadRequest_UserIdOnUserEndpointError;
errorClasses.BadRequest_UserIdOnUserEndpointError = BadRequest_UserIdOnUserEndpointError;
var BadRequest_UserRequiredError = /*#__PURE__*/function (_BadRequestError39) {
  (0, _inherits2.default)(BadRequest_UserRequiredError, _BadRequestError39);
  var _super54 = _createSuper(BadRequest_UserRequiredError);
  function BadRequest_UserRequiredError(message, code) {
    var _this54;
    (0, _classCallCheck2.default)(this, BadRequest_UserRequiredError);
    _this54 = _super54.call(this, message, code);
    _this54.name = 'BadRequest_UserRequiredError';
    return _this54;
  }
  return (0, _createClass2.default)(BadRequest_UserRequiredError);
}(BadRequestError);
exports.BadRequest_UserRequiredError = BadRequest_UserRequiredError;
errorClasses.BadRequest_UserRequiredError = BadRequest_UserRequiredError;
var NotAuthenticated_AuthenticationRequiredError = /*#__PURE__*/function (_NotAuthenticatedErro) {
  (0, _inherits2.default)(NotAuthenticated_AuthenticationRequiredError, _NotAuthenticatedErro);
  var _super55 = _createSuper(NotAuthenticated_AuthenticationRequiredError);
  function NotAuthenticated_AuthenticationRequiredError(message, code) {
    var _this55;
    (0, _classCallCheck2.default)(this, NotAuthenticated_AuthenticationRequiredError);
    _this55 = _super55.call(this, message, code);
    _this55.name = 'NotAuthenticated_AuthenticationRequiredError';
    return _this55;
  }
  return (0, _createClass2.default)(NotAuthenticated_AuthenticationRequiredError);
}(NotAuthenticatedError);
exports.NotAuthenticated_AuthenticationRequiredError = NotAuthenticated_AuthenticationRequiredError;
errorClasses.NotAuthenticated_AuthenticationRequiredError = NotAuthenticated_AuthenticationRequiredError;
var NotAuthenticated_BundleRegistrationCodeFailedError = /*#__PURE__*/function (_NotAuthenticatedErro2) {
  (0, _inherits2.default)(NotAuthenticated_BundleRegistrationCodeFailedError, _NotAuthenticatedErro2);
  var _super56 = _createSuper(NotAuthenticated_BundleRegistrationCodeFailedError);
  function NotAuthenticated_BundleRegistrationCodeFailedError(message, code) {
    var _this56;
    (0, _classCallCheck2.default)(this, NotAuthenticated_BundleRegistrationCodeFailedError);
    _this56 = _super56.call(this, message, code);
    _this56.name = 'NotAuthenticated_BundleRegistrationCodeFailedError';
    return _this56;
  }
  return (0, _createClass2.default)(NotAuthenticated_BundleRegistrationCodeFailedError);
}(NotAuthenticatedError);
exports.NotAuthenticated_BundleRegistrationCodeFailedError = NotAuthenticated_BundleRegistrationCodeFailedError;
errorClasses.NotAuthenticated_BundleRegistrationCodeFailedError = NotAuthenticated_BundleRegistrationCodeFailedError;
var NotAuthenticated_FilesAgentTokenFailedError = /*#__PURE__*/function (_NotAuthenticatedErro3) {
  (0, _inherits2.default)(NotAuthenticated_FilesAgentTokenFailedError, _NotAuthenticatedErro3);
  var _super57 = _createSuper(NotAuthenticated_FilesAgentTokenFailedError);
  function NotAuthenticated_FilesAgentTokenFailedError(message, code) {
    var _this57;
    (0, _classCallCheck2.default)(this, NotAuthenticated_FilesAgentTokenFailedError);
    _this57 = _super57.call(this, message, code);
    _this57.name = 'NotAuthenticated_FilesAgentTokenFailedError';
    return _this57;
  }
  return (0, _createClass2.default)(NotAuthenticated_FilesAgentTokenFailedError);
}(NotAuthenticatedError);
exports.NotAuthenticated_FilesAgentTokenFailedError = NotAuthenticated_FilesAgentTokenFailedError;
errorClasses.NotAuthenticated_FilesAgentTokenFailedError = NotAuthenticated_FilesAgentTokenFailedError;
var NotAuthenticated_InboxRegistrationCodeFailedError = /*#__PURE__*/function (_NotAuthenticatedErro4) {
  (0, _inherits2.default)(NotAuthenticated_InboxRegistrationCodeFailedError, _NotAuthenticatedErro4);
  var _super58 = _createSuper(NotAuthenticated_InboxRegistrationCodeFailedError);
  function NotAuthenticated_InboxRegistrationCodeFailedError(message, code) {
    var _this58;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InboxRegistrationCodeFailedError);
    _this58 = _super58.call(this, message, code);
    _this58.name = 'NotAuthenticated_InboxRegistrationCodeFailedError';
    return _this58;
  }
  return (0, _createClass2.default)(NotAuthenticated_InboxRegistrationCodeFailedError);
}(NotAuthenticatedError);
exports.NotAuthenticated_InboxRegistrationCodeFailedError = NotAuthenticated_InboxRegistrationCodeFailedError;
errorClasses.NotAuthenticated_InboxRegistrationCodeFailedError = NotAuthenticated_InboxRegistrationCodeFailedError;
var NotAuthenticated_InvalidCredentialsError = /*#__PURE__*/function (_NotAuthenticatedErro5) {
  (0, _inherits2.default)(NotAuthenticated_InvalidCredentialsError, _NotAuthenticatedErro5);
  var _super59 = _createSuper(NotAuthenticated_InvalidCredentialsError);
  function NotAuthenticated_InvalidCredentialsError(message, code) {
    var _this59;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidCredentialsError);
    _this59 = _super59.call(this, message, code);
    _this59.name = 'NotAuthenticated_InvalidCredentialsError';
    return _this59;
  }
  return (0, _createClass2.default)(NotAuthenticated_InvalidCredentialsError);
}(NotAuthenticatedError);
exports.NotAuthenticated_InvalidCredentialsError = NotAuthenticated_InvalidCredentialsError;
errorClasses.NotAuthenticated_InvalidCredentialsError = NotAuthenticated_InvalidCredentialsError;
var NotAuthenticated_InvalidOauthError = /*#__PURE__*/function (_NotAuthenticatedErro6) {
  (0, _inherits2.default)(NotAuthenticated_InvalidOauthError, _NotAuthenticatedErro6);
  var _super60 = _createSuper(NotAuthenticated_InvalidOauthError);
  function NotAuthenticated_InvalidOauthError(message, code) {
    var _this60;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidOauthError);
    _this60 = _super60.call(this, message, code);
    _this60.name = 'NotAuthenticated_InvalidOauthError';
    return _this60;
  }
  return (0, _createClass2.default)(NotAuthenticated_InvalidOauthError);
}(NotAuthenticatedError);
exports.NotAuthenticated_InvalidOauthError = NotAuthenticated_InvalidOauthError;
errorClasses.NotAuthenticated_InvalidOauthError = NotAuthenticated_InvalidOauthError;
var NotAuthenticated_InvalidOrExpiredCodeError = /*#__PURE__*/function (_NotAuthenticatedErro7) {
  (0, _inherits2.default)(NotAuthenticated_InvalidOrExpiredCodeError, _NotAuthenticatedErro7);
  var _super61 = _createSuper(NotAuthenticated_InvalidOrExpiredCodeError);
  function NotAuthenticated_InvalidOrExpiredCodeError(message, code) {
    var _this61;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidOrExpiredCodeError);
    _this61 = _super61.call(this, message, code);
    _this61.name = 'NotAuthenticated_InvalidOrExpiredCodeError';
    return _this61;
  }
  return (0, _createClass2.default)(NotAuthenticated_InvalidOrExpiredCodeError);
}(NotAuthenticatedError);
exports.NotAuthenticated_InvalidOrExpiredCodeError = NotAuthenticated_InvalidOrExpiredCodeError;
errorClasses.NotAuthenticated_InvalidOrExpiredCodeError = NotAuthenticated_InvalidOrExpiredCodeError;
var NotAuthenticated_InvalidUsernameOrPasswordError = /*#__PURE__*/function (_NotAuthenticatedErro8) {
  (0, _inherits2.default)(NotAuthenticated_InvalidUsernameOrPasswordError, _NotAuthenticatedErro8);
  var _super62 = _createSuper(NotAuthenticated_InvalidUsernameOrPasswordError);
  function NotAuthenticated_InvalidUsernameOrPasswordError(message, code) {
    var _this62;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidUsernameOrPasswordError);
    _this62 = _super62.call(this, message, code);
    _this62.name = 'NotAuthenticated_InvalidUsernameOrPasswordError';
    return _this62;
  }
  return (0, _createClass2.default)(NotAuthenticated_InvalidUsernameOrPasswordError);
}(NotAuthenticatedError);
exports.NotAuthenticated_InvalidUsernameOrPasswordError = NotAuthenticated_InvalidUsernameOrPasswordError;
errorClasses.NotAuthenticated_InvalidUsernameOrPasswordError = NotAuthenticated_InvalidUsernameOrPasswordError;
var NotAuthenticated_LockedOutError = /*#__PURE__*/function (_NotAuthenticatedErro9) {
  (0, _inherits2.default)(NotAuthenticated_LockedOutError, _NotAuthenticatedErro9);
  var _super63 = _createSuper(NotAuthenticated_LockedOutError);
  function NotAuthenticated_LockedOutError(message, code) {
    var _this63;
    (0, _classCallCheck2.default)(this, NotAuthenticated_LockedOutError);
    _this63 = _super63.call(this, message, code);
    _this63.name = 'NotAuthenticated_LockedOutError';
    return _this63;
  }
  return (0, _createClass2.default)(NotAuthenticated_LockedOutError);
}(NotAuthenticatedError);
exports.NotAuthenticated_LockedOutError = NotAuthenticated_LockedOutError;
errorClasses.NotAuthenticated_LockedOutError = NotAuthenticated_LockedOutError;
var NotAuthenticated_LockoutRegionMismatchError = /*#__PURE__*/function (_NotAuthenticatedErro10) {
  (0, _inherits2.default)(NotAuthenticated_LockoutRegionMismatchError, _NotAuthenticatedErro10);
  var _super64 = _createSuper(NotAuthenticated_LockoutRegionMismatchError);
  function NotAuthenticated_LockoutRegionMismatchError(message, code) {
    var _this64;
    (0, _classCallCheck2.default)(this, NotAuthenticated_LockoutRegionMismatchError);
    _this64 = _super64.call(this, message, code);
    _this64.name = 'NotAuthenticated_LockoutRegionMismatchError';
    return _this64;
  }
  return (0, _createClass2.default)(NotAuthenticated_LockoutRegionMismatchError);
}(NotAuthenticatedError);
exports.NotAuthenticated_LockoutRegionMismatchError = NotAuthenticated_LockoutRegionMismatchError;
errorClasses.NotAuthenticated_LockoutRegionMismatchError = NotAuthenticated_LockoutRegionMismatchError;
var NotAuthenticated_OneTimePasswordIncorrectError = /*#__PURE__*/function (_NotAuthenticatedErro11) {
  (0, _inherits2.default)(NotAuthenticated_OneTimePasswordIncorrectError, _NotAuthenticatedErro11);
  var _super65 = _createSuper(NotAuthenticated_OneTimePasswordIncorrectError);
  function NotAuthenticated_OneTimePasswordIncorrectError(message, code) {
    var _this65;
    (0, _classCallCheck2.default)(this, NotAuthenticated_OneTimePasswordIncorrectError);
    _this65 = _super65.call(this, message, code);
    _this65.name = 'NotAuthenticated_OneTimePasswordIncorrectError';
    return _this65;
  }
  return (0, _createClass2.default)(NotAuthenticated_OneTimePasswordIncorrectError);
}(NotAuthenticatedError);
exports.NotAuthenticated_OneTimePasswordIncorrectError = NotAuthenticated_OneTimePasswordIncorrectError;
errorClasses.NotAuthenticated_OneTimePasswordIncorrectError = NotAuthenticated_OneTimePasswordIncorrectError;
var NotAuthenticated_TwoFactorAuthenticationErrorError = /*#__PURE__*/function (_NotAuthenticatedErro12) {
  (0, _inherits2.default)(NotAuthenticated_TwoFactorAuthenticationErrorError, _NotAuthenticatedErro12);
  var _super66 = _createSuper(NotAuthenticated_TwoFactorAuthenticationErrorError);
  function NotAuthenticated_TwoFactorAuthenticationErrorError(message, code) {
    var _this66;
    (0, _classCallCheck2.default)(this, NotAuthenticated_TwoFactorAuthenticationErrorError);
    _this66 = _super66.call(this, message, code);
    _this66.name = 'NotAuthenticated_TwoFactorAuthenticationErrorError';
    return _this66;
  }
  return (0, _createClass2.default)(NotAuthenticated_TwoFactorAuthenticationErrorError);
}(NotAuthenticatedError);
exports.NotAuthenticated_TwoFactorAuthenticationErrorError = NotAuthenticated_TwoFactorAuthenticationErrorError;
errorClasses.NotAuthenticated_TwoFactorAuthenticationErrorError = NotAuthenticated_TwoFactorAuthenticationErrorError;
var NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = /*#__PURE__*/function (_NotAuthenticatedErro13) {
  (0, _inherits2.default)(NotAuthenticated_TwoFactorAuthenticationSetupExpiredError, _NotAuthenticatedErro13);
  var _super67 = _createSuper(NotAuthenticated_TwoFactorAuthenticationSetupExpiredError);
  function NotAuthenticated_TwoFactorAuthenticationSetupExpiredError(message, code) {
    var _this67;
    (0, _classCallCheck2.default)(this, NotAuthenticated_TwoFactorAuthenticationSetupExpiredError);
    _this67 = _super67.call(this, message, code);
    _this67.name = 'NotAuthenticated_TwoFactorAuthenticationSetupExpiredError';
    return _this67;
  }
  return (0, _createClass2.default)(NotAuthenticated_TwoFactorAuthenticationSetupExpiredError);
}(NotAuthenticatedError);
exports.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = NotAuthenticated_TwoFactorAuthenticationSetupExpiredError;
errorClasses.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = NotAuthenticated_TwoFactorAuthenticationSetupExpiredError;
var NotAuthorized_ApiKeyIsDisabledError = /*#__PURE__*/function (_NotAuthorizedError) {
  (0, _inherits2.default)(NotAuthorized_ApiKeyIsDisabledError, _NotAuthorizedError);
  var _super68 = _createSuper(NotAuthorized_ApiKeyIsDisabledError);
  function NotAuthorized_ApiKeyIsDisabledError(message, code) {
    var _this68;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyIsDisabledError);
    _this68 = _super68.call(this, message, code);
    _this68.name = 'NotAuthorized_ApiKeyIsDisabledError';
    return _this68;
  }
  return (0, _createClass2.default)(NotAuthorized_ApiKeyIsDisabledError);
}(NotAuthorizedError);
exports.NotAuthorized_ApiKeyIsDisabledError = NotAuthorized_ApiKeyIsDisabledError;
errorClasses.NotAuthorized_ApiKeyIsDisabledError = NotAuthorized_ApiKeyIsDisabledError;
var NotAuthorized_ApiKeyIsPathRestrictedError = /*#__PURE__*/function (_NotAuthorizedError2) {
  (0, _inherits2.default)(NotAuthorized_ApiKeyIsPathRestrictedError, _NotAuthorizedError2);
  var _super69 = _createSuper(NotAuthorized_ApiKeyIsPathRestrictedError);
  function NotAuthorized_ApiKeyIsPathRestrictedError(message, code) {
    var _this69;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyIsPathRestrictedError);
    _this69 = _super69.call(this, message, code);
    _this69.name = 'NotAuthorized_ApiKeyIsPathRestrictedError';
    return _this69;
  }
  return (0, _createClass2.default)(NotAuthorized_ApiKeyIsPathRestrictedError);
}(NotAuthorizedError);
exports.NotAuthorized_ApiKeyIsPathRestrictedError = NotAuthorized_ApiKeyIsPathRestrictedError;
errorClasses.NotAuthorized_ApiKeyIsPathRestrictedError = NotAuthorized_ApiKeyIsPathRestrictedError;
var NotAuthorized_ApiKeyOnlyForDesktopAppError = /*#__PURE__*/function (_NotAuthorizedError3) {
  (0, _inherits2.default)(NotAuthorized_ApiKeyOnlyForDesktopAppError, _NotAuthorizedError3);
  var _super70 = _createSuper(NotAuthorized_ApiKeyOnlyForDesktopAppError);
  function NotAuthorized_ApiKeyOnlyForDesktopAppError(message, code) {
    var _this70;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyOnlyForDesktopAppError);
    _this70 = _super70.call(this, message, code);
    _this70.name = 'NotAuthorized_ApiKeyOnlyForDesktopAppError';
    return _this70;
  }
  return (0, _createClass2.default)(NotAuthorized_ApiKeyOnlyForDesktopAppError);
}(NotAuthorizedError);
exports.NotAuthorized_ApiKeyOnlyForDesktopAppError = NotAuthorized_ApiKeyOnlyForDesktopAppError;
errorClasses.NotAuthorized_ApiKeyOnlyForDesktopAppError = NotAuthorized_ApiKeyOnlyForDesktopAppError;
var NotAuthorized_ApiKeyOnlyForMobileAppError = /*#__PURE__*/function (_NotAuthorizedError4) {
  (0, _inherits2.default)(NotAuthorized_ApiKeyOnlyForMobileAppError, _NotAuthorizedError4);
  var _super71 = _createSuper(NotAuthorized_ApiKeyOnlyForMobileAppError);
  function NotAuthorized_ApiKeyOnlyForMobileAppError(message, code) {
    var _this71;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyOnlyForMobileAppError);
    _this71 = _super71.call(this, message, code);
    _this71.name = 'NotAuthorized_ApiKeyOnlyForMobileAppError';
    return _this71;
  }
  return (0, _createClass2.default)(NotAuthorized_ApiKeyOnlyForMobileAppError);
}(NotAuthorizedError);
exports.NotAuthorized_ApiKeyOnlyForMobileAppError = NotAuthorized_ApiKeyOnlyForMobileAppError;
errorClasses.NotAuthorized_ApiKeyOnlyForMobileAppError = NotAuthorized_ApiKeyOnlyForMobileAppError;
var NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = /*#__PURE__*/function (_NotAuthorizedError5) {
  (0, _inherits2.default)(NotAuthorized_ApiKeyOnlyForOfficeIntegrationError, _NotAuthorizedError5);
  var _super72 = _createSuper(NotAuthorized_ApiKeyOnlyForOfficeIntegrationError);
  function NotAuthorized_ApiKeyOnlyForOfficeIntegrationError(message, code) {
    var _this72;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyOnlyForOfficeIntegrationError);
    _this72 = _super72.call(this, message, code);
    _this72.name = 'NotAuthorized_ApiKeyOnlyForOfficeIntegrationError';
    return _this72;
  }
  return (0, _createClass2.default)(NotAuthorized_ApiKeyOnlyForOfficeIntegrationError);
}(NotAuthorizedError);
exports.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = NotAuthorized_ApiKeyOnlyForOfficeIntegrationError;
errorClasses.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = NotAuthorized_ApiKeyOnlyForOfficeIntegrationError;
var NotAuthorized_BillingPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError6) {
  (0, _inherits2.default)(NotAuthorized_BillingPermissionRequiredError, _NotAuthorizedError6);
  var _super73 = _createSuper(NotAuthorized_BillingPermissionRequiredError);
  function NotAuthorized_BillingPermissionRequiredError(message, code) {
    var _this73;
    (0, _classCallCheck2.default)(this, NotAuthorized_BillingPermissionRequiredError);
    _this73 = _super73.call(this, message, code);
    _this73.name = 'NotAuthorized_BillingPermissionRequiredError';
    return _this73;
  }
  return (0, _createClass2.default)(NotAuthorized_BillingPermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_BillingPermissionRequiredError = NotAuthorized_BillingPermissionRequiredError;
errorClasses.NotAuthorized_BillingPermissionRequiredError = NotAuthorized_BillingPermissionRequiredError;
var NotAuthorized_BundleMaximumUsesReachedError = /*#__PURE__*/function (_NotAuthorizedError7) {
  (0, _inherits2.default)(NotAuthorized_BundleMaximumUsesReachedError, _NotAuthorizedError7);
  var _super74 = _createSuper(NotAuthorized_BundleMaximumUsesReachedError);
  function NotAuthorized_BundleMaximumUsesReachedError(message, code) {
    var _this74;
    (0, _classCallCheck2.default)(this, NotAuthorized_BundleMaximumUsesReachedError);
    _this74 = _super74.call(this, message, code);
    _this74.name = 'NotAuthorized_BundleMaximumUsesReachedError';
    return _this74;
  }
  return (0, _createClass2.default)(NotAuthorized_BundleMaximumUsesReachedError);
}(NotAuthorizedError);
exports.NotAuthorized_BundleMaximumUsesReachedError = NotAuthorized_BundleMaximumUsesReachedError;
errorClasses.NotAuthorized_BundleMaximumUsesReachedError = NotAuthorized_BundleMaximumUsesReachedError;
var NotAuthorized_CannotLoginWhileUsingKeyError = /*#__PURE__*/function (_NotAuthorizedError8) {
  (0, _inherits2.default)(NotAuthorized_CannotLoginWhileUsingKeyError, _NotAuthorizedError8);
  var _super75 = _createSuper(NotAuthorized_CannotLoginWhileUsingKeyError);
  function NotAuthorized_CannotLoginWhileUsingKeyError(message, code) {
    var _this75;
    (0, _classCallCheck2.default)(this, NotAuthorized_CannotLoginWhileUsingKeyError);
    _this75 = _super75.call(this, message, code);
    _this75.name = 'NotAuthorized_CannotLoginWhileUsingKeyError';
    return _this75;
  }
  return (0, _createClass2.default)(NotAuthorized_CannotLoginWhileUsingKeyError);
}(NotAuthorizedError);
exports.NotAuthorized_CannotLoginWhileUsingKeyError = NotAuthorized_CannotLoginWhileUsingKeyError;
errorClasses.NotAuthorized_CannotLoginWhileUsingKeyError = NotAuthorized_CannotLoginWhileUsingKeyError;
var NotAuthorized_CantActForOtherUserError = /*#__PURE__*/function (_NotAuthorizedError9) {
  (0, _inherits2.default)(NotAuthorized_CantActForOtherUserError, _NotAuthorizedError9);
  var _super76 = _createSuper(NotAuthorized_CantActForOtherUserError);
  function NotAuthorized_CantActForOtherUserError(message, code) {
    var _this76;
    (0, _classCallCheck2.default)(this, NotAuthorized_CantActForOtherUserError);
    _this76 = _super76.call(this, message, code);
    _this76.name = 'NotAuthorized_CantActForOtherUserError';
    return _this76;
  }
  return (0, _createClass2.default)(NotAuthorized_CantActForOtherUserError);
}(NotAuthorizedError);
exports.NotAuthorized_CantActForOtherUserError = NotAuthorized_CantActForOtherUserError;
errorClasses.NotAuthorized_CantActForOtherUserError = NotAuthorized_CantActForOtherUserError;
var NotAuthorized_ContactAdminForPasswordChangeHelpError = /*#__PURE__*/function (_NotAuthorizedError10) {
  (0, _inherits2.default)(NotAuthorized_ContactAdminForPasswordChangeHelpError, _NotAuthorizedError10);
  var _super77 = _createSuper(NotAuthorized_ContactAdminForPasswordChangeHelpError);
  function NotAuthorized_ContactAdminForPasswordChangeHelpError(message, code) {
    var _this77;
    (0, _classCallCheck2.default)(this, NotAuthorized_ContactAdminForPasswordChangeHelpError);
    _this77 = _super77.call(this, message, code);
    _this77.name = 'NotAuthorized_ContactAdminForPasswordChangeHelpError';
    return _this77;
  }
  return (0, _createClass2.default)(NotAuthorized_ContactAdminForPasswordChangeHelpError);
}(NotAuthorizedError);
exports.NotAuthorized_ContactAdminForPasswordChangeHelpError = NotAuthorized_ContactAdminForPasswordChangeHelpError;
errorClasses.NotAuthorized_ContactAdminForPasswordChangeHelpError = NotAuthorized_ContactAdminForPasswordChangeHelpError;
var NotAuthorized_FolderAdminOrBillingPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError11) {
  (0, _inherits2.default)(NotAuthorized_FolderAdminOrBillingPermissionRequiredError, _NotAuthorizedError11);
  var _super78 = _createSuper(NotAuthorized_FolderAdminOrBillingPermissionRequiredError);
  function NotAuthorized_FolderAdminOrBillingPermissionRequiredError(message, code) {
    var _this78;
    (0, _classCallCheck2.default)(this, NotAuthorized_FolderAdminOrBillingPermissionRequiredError);
    _this78 = _super78.call(this, message, code);
    _this78.name = 'NotAuthorized_FolderAdminOrBillingPermissionRequiredError';
    return _this78;
  }
  return (0, _createClass2.default)(NotAuthorized_FolderAdminOrBillingPermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = NotAuthorized_FolderAdminOrBillingPermissionRequiredError;
errorClasses.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = NotAuthorized_FolderAdminOrBillingPermissionRequiredError;
var NotAuthorized_FolderAdminPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError12) {
  (0, _inherits2.default)(NotAuthorized_FolderAdminPermissionRequiredError, _NotAuthorizedError12);
  var _super79 = _createSuper(NotAuthorized_FolderAdminPermissionRequiredError);
  function NotAuthorized_FolderAdminPermissionRequiredError(message, code) {
    var _this79;
    (0, _classCallCheck2.default)(this, NotAuthorized_FolderAdminPermissionRequiredError);
    _this79 = _super79.call(this, message, code);
    _this79.name = 'NotAuthorized_FolderAdminPermissionRequiredError';
    return _this79;
  }
  return (0, _createClass2.default)(NotAuthorized_FolderAdminPermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_FolderAdminPermissionRequiredError = NotAuthorized_FolderAdminPermissionRequiredError;
errorClasses.NotAuthorized_FolderAdminPermissionRequiredError = NotAuthorized_FolderAdminPermissionRequiredError;
var NotAuthorized_FullPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError13) {
  (0, _inherits2.default)(NotAuthorized_FullPermissionRequiredError, _NotAuthorizedError13);
  var _super80 = _createSuper(NotAuthorized_FullPermissionRequiredError);
  function NotAuthorized_FullPermissionRequiredError(message, code) {
    var _this80;
    (0, _classCallCheck2.default)(this, NotAuthorized_FullPermissionRequiredError);
    _this80 = _super80.call(this, message, code);
    _this80.name = 'NotAuthorized_FullPermissionRequiredError';
    return _this80;
  }
  return (0, _createClass2.default)(NotAuthorized_FullPermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_FullPermissionRequiredError = NotAuthorized_FullPermissionRequiredError;
errorClasses.NotAuthorized_FullPermissionRequiredError = NotAuthorized_FullPermissionRequiredError;
var NotAuthorized_HistoryPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError14) {
  (0, _inherits2.default)(NotAuthorized_HistoryPermissionRequiredError, _NotAuthorizedError14);
  var _super81 = _createSuper(NotAuthorized_HistoryPermissionRequiredError);
  function NotAuthorized_HistoryPermissionRequiredError(message, code) {
    var _this81;
    (0, _classCallCheck2.default)(this, NotAuthorized_HistoryPermissionRequiredError);
    _this81 = _super81.call(this, message, code);
    _this81.name = 'NotAuthorized_HistoryPermissionRequiredError';
    return _this81;
  }
  return (0, _createClass2.default)(NotAuthorized_HistoryPermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_HistoryPermissionRequiredError = NotAuthorized_HistoryPermissionRequiredError;
errorClasses.NotAuthorized_HistoryPermissionRequiredError = NotAuthorized_HistoryPermissionRequiredError;
var NotAuthorized_InsufficientPermissionForParamsError = /*#__PURE__*/function (_NotAuthorizedError15) {
  (0, _inherits2.default)(NotAuthorized_InsufficientPermissionForParamsError, _NotAuthorizedError15);
  var _super82 = _createSuper(NotAuthorized_InsufficientPermissionForParamsError);
  function NotAuthorized_InsufficientPermissionForParamsError(message, code) {
    var _this82;
    (0, _classCallCheck2.default)(this, NotAuthorized_InsufficientPermissionForParamsError);
    _this82 = _super82.call(this, message, code);
    _this82.name = 'NotAuthorized_InsufficientPermissionForParamsError';
    return _this82;
  }
  return (0, _createClass2.default)(NotAuthorized_InsufficientPermissionForParamsError);
}(NotAuthorizedError);
exports.NotAuthorized_InsufficientPermissionForParamsError = NotAuthorized_InsufficientPermissionForParamsError;
errorClasses.NotAuthorized_InsufficientPermissionForParamsError = NotAuthorized_InsufficientPermissionForParamsError;
var NotAuthorized_MustAuthenticateWithApiKeyError = /*#__PURE__*/function (_NotAuthorizedError16) {
  (0, _inherits2.default)(NotAuthorized_MustAuthenticateWithApiKeyError, _NotAuthorizedError16);
  var _super83 = _createSuper(NotAuthorized_MustAuthenticateWithApiKeyError);
  function NotAuthorized_MustAuthenticateWithApiKeyError(message, code) {
    var _this83;
    (0, _classCallCheck2.default)(this, NotAuthorized_MustAuthenticateWithApiKeyError);
    _this83 = _super83.call(this, message, code);
    _this83.name = 'NotAuthorized_MustAuthenticateWithApiKeyError';
    return _this83;
  }
  return (0, _createClass2.default)(NotAuthorized_MustAuthenticateWithApiKeyError);
}(NotAuthorizedError);
exports.NotAuthorized_MustAuthenticateWithApiKeyError = NotAuthorized_MustAuthenticateWithApiKeyError;
errorClasses.NotAuthorized_MustAuthenticateWithApiKeyError = NotAuthorized_MustAuthenticateWithApiKeyError;
var NotAuthorized_NeedAdminPermissionForInboxError = /*#__PURE__*/function (_NotAuthorizedError17) {
  (0, _inherits2.default)(NotAuthorized_NeedAdminPermissionForInboxError, _NotAuthorizedError17);
  var _super84 = _createSuper(NotAuthorized_NeedAdminPermissionForInboxError);
  function NotAuthorized_NeedAdminPermissionForInboxError(message, code) {
    var _this84;
    (0, _classCallCheck2.default)(this, NotAuthorized_NeedAdminPermissionForInboxError);
    _this84 = _super84.call(this, message, code);
    _this84.name = 'NotAuthorized_NeedAdminPermissionForInboxError';
    return _this84;
  }
  return (0, _createClass2.default)(NotAuthorized_NeedAdminPermissionForInboxError);
}(NotAuthorizedError);
exports.NotAuthorized_NeedAdminPermissionForInboxError = NotAuthorized_NeedAdminPermissionForInboxError;
errorClasses.NotAuthorized_NeedAdminPermissionForInboxError = NotAuthorized_NeedAdminPermissionForInboxError;
var NotAuthorized_NonAdminsMustQueryByFolderOrPathError = /*#__PURE__*/function (_NotAuthorizedError18) {
  (0, _inherits2.default)(NotAuthorized_NonAdminsMustQueryByFolderOrPathError, _NotAuthorizedError18);
  var _super85 = _createSuper(NotAuthorized_NonAdminsMustQueryByFolderOrPathError);
  function NotAuthorized_NonAdminsMustQueryByFolderOrPathError(message, code) {
    var _this85;
    (0, _classCallCheck2.default)(this, NotAuthorized_NonAdminsMustQueryByFolderOrPathError);
    _this85 = _super85.call(this, message, code);
    _this85.name = 'NotAuthorized_NonAdminsMustQueryByFolderOrPathError';
    return _this85;
  }
  return (0, _createClass2.default)(NotAuthorized_NonAdminsMustQueryByFolderOrPathError);
}(NotAuthorizedError);
exports.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = NotAuthorized_NonAdminsMustQueryByFolderOrPathError;
errorClasses.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = NotAuthorized_NonAdminsMustQueryByFolderOrPathError;
var NotAuthorized_NotAllowedToCreateBundleError = /*#__PURE__*/function (_NotAuthorizedError19) {
  (0, _inherits2.default)(NotAuthorized_NotAllowedToCreateBundleError, _NotAuthorizedError19);
  var _super86 = _createSuper(NotAuthorized_NotAllowedToCreateBundleError);
  function NotAuthorized_NotAllowedToCreateBundleError(message, code) {
    var _this86;
    (0, _classCallCheck2.default)(this, NotAuthorized_NotAllowedToCreateBundleError);
    _this86 = _super86.call(this, message, code);
    _this86.name = 'NotAuthorized_NotAllowedToCreateBundleError';
    return _this86;
  }
  return (0, _createClass2.default)(NotAuthorized_NotAllowedToCreateBundleError);
}(NotAuthorizedError);
exports.NotAuthorized_NotAllowedToCreateBundleError = NotAuthorized_NotAllowedToCreateBundleError;
errorClasses.NotAuthorized_NotAllowedToCreateBundleError = NotAuthorized_NotAllowedToCreateBundleError;
var NotAuthorized_PasswordChangeNotRequiredError = /*#__PURE__*/function (_NotAuthorizedError20) {
  (0, _inherits2.default)(NotAuthorized_PasswordChangeNotRequiredError, _NotAuthorizedError20);
  var _super87 = _createSuper(NotAuthorized_PasswordChangeNotRequiredError);
  function NotAuthorized_PasswordChangeNotRequiredError(message, code) {
    var _this87;
    (0, _classCallCheck2.default)(this, NotAuthorized_PasswordChangeNotRequiredError);
    _this87 = _super87.call(this, message, code);
    _this87.name = 'NotAuthorized_PasswordChangeNotRequiredError';
    return _this87;
  }
  return (0, _createClass2.default)(NotAuthorized_PasswordChangeNotRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_PasswordChangeNotRequiredError = NotAuthorized_PasswordChangeNotRequiredError;
errorClasses.NotAuthorized_PasswordChangeNotRequiredError = NotAuthorized_PasswordChangeNotRequiredError;
var NotAuthorized_PasswordChangeRequiredError = /*#__PURE__*/function (_NotAuthorizedError21) {
  (0, _inherits2.default)(NotAuthorized_PasswordChangeRequiredError, _NotAuthorizedError21);
  var _super88 = _createSuper(NotAuthorized_PasswordChangeRequiredError);
  function NotAuthorized_PasswordChangeRequiredError(message, code) {
    var _this88;
    (0, _classCallCheck2.default)(this, NotAuthorized_PasswordChangeRequiredError);
    _this88 = _super88.call(this, message, code);
    _this88.name = 'NotAuthorized_PasswordChangeRequiredError';
    return _this88;
  }
  return (0, _createClass2.default)(NotAuthorized_PasswordChangeRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_PasswordChangeRequiredError = NotAuthorized_PasswordChangeRequiredError;
errorClasses.NotAuthorized_PasswordChangeRequiredError = NotAuthorized_PasswordChangeRequiredError;
var NotAuthorized_ReadOnlySessionError = /*#__PURE__*/function (_NotAuthorizedError22) {
  (0, _inherits2.default)(NotAuthorized_ReadOnlySessionError, _NotAuthorizedError22);
  var _super89 = _createSuper(NotAuthorized_ReadOnlySessionError);
  function NotAuthorized_ReadOnlySessionError(message, code) {
    var _this89;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReadOnlySessionError);
    _this89 = _super89.call(this, message, code);
    _this89.name = 'NotAuthorized_ReadOnlySessionError';
    return _this89;
  }
  return (0, _createClass2.default)(NotAuthorized_ReadOnlySessionError);
}(NotAuthorizedError);
exports.NotAuthorized_ReadOnlySessionError = NotAuthorized_ReadOnlySessionError;
errorClasses.NotAuthorized_ReadOnlySessionError = NotAuthorized_ReadOnlySessionError;
var NotAuthorized_ReadPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError23) {
  (0, _inherits2.default)(NotAuthorized_ReadPermissionRequiredError, _NotAuthorizedError23);
  var _super90 = _createSuper(NotAuthorized_ReadPermissionRequiredError);
  function NotAuthorized_ReadPermissionRequiredError(message, code) {
    var _this90;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReadPermissionRequiredError);
    _this90 = _super90.call(this, message, code);
    _this90.name = 'NotAuthorized_ReadPermissionRequiredError';
    return _this90;
  }
  return (0, _createClass2.default)(NotAuthorized_ReadPermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_ReadPermissionRequiredError = NotAuthorized_ReadPermissionRequiredError;
errorClasses.NotAuthorized_ReadPermissionRequiredError = NotAuthorized_ReadPermissionRequiredError;
var NotAuthorized_ReauthenticationFailedError = /*#__PURE__*/function (_NotAuthorizedError24) {
  (0, _inherits2.default)(NotAuthorized_ReauthenticationFailedError, _NotAuthorizedError24);
  var _super91 = _createSuper(NotAuthorized_ReauthenticationFailedError);
  function NotAuthorized_ReauthenticationFailedError(message, code) {
    var _this91;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReauthenticationFailedError);
    _this91 = _super91.call(this, message, code);
    _this91.name = 'NotAuthorized_ReauthenticationFailedError';
    return _this91;
  }
  return (0, _createClass2.default)(NotAuthorized_ReauthenticationFailedError);
}(NotAuthorizedError);
exports.NotAuthorized_ReauthenticationFailedError = NotAuthorized_ReauthenticationFailedError;
errorClasses.NotAuthorized_ReauthenticationFailedError = NotAuthorized_ReauthenticationFailedError;
var NotAuthorized_ReauthenticationFailedFinalError = /*#__PURE__*/function (_NotAuthorizedError25) {
  (0, _inherits2.default)(NotAuthorized_ReauthenticationFailedFinalError, _NotAuthorizedError25);
  var _super92 = _createSuper(NotAuthorized_ReauthenticationFailedFinalError);
  function NotAuthorized_ReauthenticationFailedFinalError(message, code) {
    var _this92;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReauthenticationFailedFinalError);
    _this92 = _super92.call(this, message, code);
    _this92.name = 'NotAuthorized_ReauthenticationFailedFinalError';
    return _this92;
  }
  return (0, _createClass2.default)(NotAuthorized_ReauthenticationFailedFinalError);
}(NotAuthorizedError);
exports.NotAuthorized_ReauthenticationFailedFinalError = NotAuthorized_ReauthenticationFailedFinalError;
errorClasses.NotAuthorized_ReauthenticationFailedFinalError = NotAuthorized_ReauthenticationFailedFinalError;
var NotAuthorized_ReauthenticationNeededActionError = /*#__PURE__*/function (_NotAuthorizedError26) {
  (0, _inherits2.default)(NotAuthorized_ReauthenticationNeededActionError, _NotAuthorizedError26);
  var _super93 = _createSuper(NotAuthorized_ReauthenticationNeededActionError);
  function NotAuthorized_ReauthenticationNeededActionError(message, code) {
    var _this93;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReauthenticationNeededActionError);
    _this93 = _super93.call(this, message, code);
    _this93.name = 'NotAuthorized_ReauthenticationNeededActionError';
    return _this93;
  }
  return (0, _createClass2.default)(NotAuthorized_ReauthenticationNeededActionError);
}(NotAuthorizedError);
exports.NotAuthorized_ReauthenticationNeededActionError = NotAuthorized_ReauthenticationNeededActionError;
errorClasses.NotAuthorized_ReauthenticationNeededActionError = NotAuthorized_ReauthenticationNeededActionError;
var NotAuthorized_SelfManagedRequiredError = /*#__PURE__*/function (_NotAuthorizedError27) {
  (0, _inherits2.default)(NotAuthorized_SelfManagedRequiredError, _NotAuthorizedError27);
  var _super94 = _createSuper(NotAuthorized_SelfManagedRequiredError);
  function NotAuthorized_SelfManagedRequiredError(message, code) {
    var _this94;
    (0, _classCallCheck2.default)(this, NotAuthorized_SelfManagedRequiredError);
    _this94 = _super94.call(this, message, code);
    _this94.name = 'NotAuthorized_SelfManagedRequiredError';
    return _this94;
  }
  return (0, _createClass2.default)(NotAuthorized_SelfManagedRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_SelfManagedRequiredError = NotAuthorized_SelfManagedRequiredError;
errorClasses.NotAuthorized_SelfManagedRequiredError = NotAuthorized_SelfManagedRequiredError;
var NotAuthorized_SiteAdminRequiredError = /*#__PURE__*/function (_NotAuthorizedError28) {
  (0, _inherits2.default)(NotAuthorized_SiteAdminRequiredError, _NotAuthorizedError28);
  var _super95 = _createSuper(NotAuthorized_SiteAdminRequiredError);
  function NotAuthorized_SiteAdminRequiredError(message, code) {
    var _this95;
    (0, _classCallCheck2.default)(this, NotAuthorized_SiteAdminRequiredError);
    _this95 = _super95.call(this, message, code);
    _this95.name = 'NotAuthorized_SiteAdminRequiredError';
    return _this95;
  }
  return (0, _createClass2.default)(NotAuthorized_SiteAdminRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_SiteAdminRequiredError = NotAuthorized_SiteAdminRequiredError;
errorClasses.NotAuthorized_SiteAdminRequiredError = NotAuthorized_SiteAdminRequiredError;
var NotAuthorized_SiteFilesAreImmutableError = /*#__PURE__*/function (_NotAuthorizedError29) {
  (0, _inherits2.default)(NotAuthorized_SiteFilesAreImmutableError, _NotAuthorizedError29);
  var _super96 = _createSuper(NotAuthorized_SiteFilesAreImmutableError);
  function NotAuthorized_SiteFilesAreImmutableError(message, code) {
    var _this96;
    (0, _classCallCheck2.default)(this, NotAuthorized_SiteFilesAreImmutableError);
    _this96 = _super96.call(this, message, code);
    _this96.name = 'NotAuthorized_SiteFilesAreImmutableError';
    return _this96;
  }
  return (0, _createClass2.default)(NotAuthorized_SiteFilesAreImmutableError);
}(NotAuthorizedError);
exports.NotAuthorized_SiteFilesAreImmutableError = NotAuthorized_SiteFilesAreImmutableError;
errorClasses.NotAuthorized_SiteFilesAreImmutableError = NotAuthorized_SiteFilesAreImmutableError;
var NotAuthorized_TwoFactorAuthenticationRequiredError = /*#__PURE__*/function (_NotAuthorizedError30) {
  (0, _inherits2.default)(NotAuthorized_TwoFactorAuthenticationRequiredError, _NotAuthorizedError30);
  var _super97 = _createSuper(NotAuthorized_TwoFactorAuthenticationRequiredError);
  function NotAuthorized_TwoFactorAuthenticationRequiredError(message, code) {
    var _this97;
    (0, _classCallCheck2.default)(this, NotAuthorized_TwoFactorAuthenticationRequiredError);
    _this97 = _super97.call(this, message, code);
    _this97.name = 'NotAuthorized_TwoFactorAuthenticationRequiredError';
    return _this97;
  }
  return (0, _createClass2.default)(NotAuthorized_TwoFactorAuthenticationRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_TwoFactorAuthenticationRequiredError = NotAuthorized_TwoFactorAuthenticationRequiredError;
errorClasses.NotAuthorized_TwoFactorAuthenticationRequiredError = NotAuthorized_TwoFactorAuthenticationRequiredError;
var NotAuthorized_UserIdWithoutSiteAdminError = /*#__PURE__*/function (_NotAuthorizedError31) {
  (0, _inherits2.default)(NotAuthorized_UserIdWithoutSiteAdminError, _NotAuthorizedError31);
  var _super98 = _createSuper(NotAuthorized_UserIdWithoutSiteAdminError);
  function NotAuthorized_UserIdWithoutSiteAdminError(message, code) {
    var _this98;
    (0, _classCallCheck2.default)(this, NotAuthorized_UserIdWithoutSiteAdminError);
    _this98 = _super98.call(this, message, code);
    _this98.name = 'NotAuthorized_UserIdWithoutSiteAdminError';
    return _this98;
  }
  return (0, _createClass2.default)(NotAuthorized_UserIdWithoutSiteAdminError);
}(NotAuthorizedError);
exports.NotAuthorized_UserIdWithoutSiteAdminError = NotAuthorized_UserIdWithoutSiteAdminError;
errorClasses.NotAuthorized_UserIdWithoutSiteAdminError = NotAuthorized_UserIdWithoutSiteAdminError;
var NotAuthorized_WriteAndBundlePermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError32) {
  (0, _inherits2.default)(NotAuthorized_WriteAndBundlePermissionRequiredError, _NotAuthorizedError32);
  var _super99 = _createSuper(NotAuthorized_WriteAndBundlePermissionRequiredError);
  function NotAuthorized_WriteAndBundlePermissionRequiredError(message, code) {
    var _this99;
    (0, _classCallCheck2.default)(this, NotAuthorized_WriteAndBundlePermissionRequiredError);
    _this99 = _super99.call(this, message, code);
    _this99.name = 'NotAuthorized_WriteAndBundlePermissionRequiredError';
    return _this99;
  }
  return (0, _createClass2.default)(NotAuthorized_WriteAndBundlePermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_WriteAndBundlePermissionRequiredError = NotAuthorized_WriteAndBundlePermissionRequiredError;
errorClasses.NotAuthorized_WriteAndBundlePermissionRequiredError = NotAuthorized_WriteAndBundlePermissionRequiredError;
var NotAuthorized_WritePermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError33) {
  (0, _inherits2.default)(NotAuthorized_WritePermissionRequiredError, _NotAuthorizedError33);
  var _super100 = _createSuper(NotAuthorized_WritePermissionRequiredError);
  function NotAuthorized_WritePermissionRequiredError(message, code) {
    var _this100;
    (0, _classCallCheck2.default)(this, NotAuthorized_WritePermissionRequiredError);
    _this100 = _super100.call(this, message, code);
    _this100.name = 'NotAuthorized_WritePermissionRequiredError';
    return _this100;
  }
  return (0, _createClass2.default)(NotAuthorized_WritePermissionRequiredError);
}(NotAuthorizedError);
exports.NotAuthorized_WritePermissionRequiredError = NotAuthorized_WritePermissionRequiredError;
errorClasses.NotAuthorized_WritePermissionRequiredError = NotAuthorized_WritePermissionRequiredError;
var NotAuthorized_ZipDownloadIpMismatchError = /*#__PURE__*/function (_NotAuthorizedError34) {
  (0, _inherits2.default)(NotAuthorized_ZipDownloadIpMismatchError, _NotAuthorizedError34);
  var _super101 = _createSuper(NotAuthorized_ZipDownloadIpMismatchError);
  function NotAuthorized_ZipDownloadIpMismatchError(message, code) {
    var _this101;
    (0, _classCallCheck2.default)(this, NotAuthorized_ZipDownloadIpMismatchError);
    _this101 = _super101.call(this, message, code);
    _this101.name = 'NotAuthorized_ZipDownloadIpMismatchError';
    return _this101;
  }
  return (0, _createClass2.default)(NotAuthorized_ZipDownloadIpMismatchError);
}(NotAuthorizedError);
exports.NotAuthorized_ZipDownloadIpMismatchError = NotAuthorized_ZipDownloadIpMismatchError;
errorClasses.NotAuthorized_ZipDownloadIpMismatchError = NotAuthorized_ZipDownloadIpMismatchError;
var NotFound_ApiKeyNotFoundError = /*#__PURE__*/function (_NotFoundError) {
  (0, _inherits2.default)(NotFound_ApiKeyNotFoundError, _NotFoundError);
  var _super102 = _createSuper(NotFound_ApiKeyNotFoundError);
  function NotFound_ApiKeyNotFoundError(message, code) {
    var _this102;
    (0, _classCallCheck2.default)(this, NotFound_ApiKeyNotFoundError);
    _this102 = _super102.call(this, message, code);
    _this102.name = 'NotFound_ApiKeyNotFoundError';
    return _this102;
  }
  return (0, _createClass2.default)(NotFound_ApiKeyNotFoundError);
}(NotFoundError);
exports.NotFound_ApiKeyNotFoundError = NotFound_ApiKeyNotFoundError;
errorClasses.NotFound_ApiKeyNotFoundError = NotFound_ApiKeyNotFoundError;
var NotFound_BundlePathNotFoundError = /*#__PURE__*/function (_NotFoundError2) {
  (0, _inherits2.default)(NotFound_BundlePathNotFoundError, _NotFoundError2);
  var _super103 = _createSuper(NotFound_BundlePathNotFoundError);
  function NotFound_BundlePathNotFoundError(message, code) {
    var _this103;
    (0, _classCallCheck2.default)(this, NotFound_BundlePathNotFoundError);
    _this103 = _super103.call(this, message, code);
    _this103.name = 'NotFound_BundlePathNotFoundError';
    return _this103;
  }
  return (0, _createClass2.default)(NotFound_BundlePathNotFoundError);
}(NotFoundError);
exports.NotFound_BundlePathNotFoundError = NotFound_BundlePathNotFoundError;
errorClasses.NotFound_BundlePathNotFoundError = NotFound_BundlePathNotFoundError;
var NotFound_BundleRegistrationNotFoundError = /*#__PURE__*/function (_NotFoundError3) {
  (0, _inherits2.default)(NotFound_BundleRegistrationNotFoundError, _NotFoundError3);
  var _super104 = _createSuper(NotFound_BundleRegistrationNotFoundError);
  function NotFound_BundleRegistrationNotFoundError(message, code) {
    var _this104;
    (0, _classCallCheck2.default)(this, NotFound_BundleRegistrationNotFoundError);
    _this104 = _super104.call(this, message, code);
    _this104.name = 'NotFound_BundleRegistrationNotFoundError';
    return _this104;
  }
  return (0, _createClass2.default)(NotFound_BundleRegistrationNotFoundError);
}(NotFoundError);
exports.NotFound_BundleRegistrationNotFoundError = NotFound_BundleRegistrationNotFoundError;
errorClasses.NotFound_BundleRegistrationNotFoundError = NotFound_BundleRegistrationNotFoundError;
var NotFound_CodeNotFoundError = /*#__PURE__*/function (_NotFoundError4) {
  (0, _inherits2.default)(NotFound_CodeNotFoundError, _NotFoundError4);
  var _super105 = _createSuper(NotFound_CodeNotFoundError);
  function NotFound_CodeNotFoundError(message, code) {
    var _this105;
    (0, _classCallCheck2.default)(this, NotFound_CodeNotFoundError);
    _this105 = _super105.call(this, message, code);
    _this105.name = 'NotFound_CodeNotFoundError';
    return _this105;
  }
  return (0, _createClass2.default)(NotFound_CodeNotFoundError);
}(NotFoundError);
exports.NotFound_CodeNotFoundError = NotFound_CodeNotFoundError;
errorClasses.NotFound_CodeNotFoundError = NotFound_CodeNotFoundError;
var NotFound_FileNotFoundError = /*#__PURE__*/function (_NotFoundError5) {
  (0, _inherits2.default)(NotFound_FileNotFoundError, _NotFoundError5);
  var _super106 = _createSuper(NotFound_FileNotFoundError);
  function NotFound_FileNotFoundError(message, code) {
    var _this106;
    (0, _classCallCheck2.default)(this, NotFound_FileNotFoundError);
    _this106 = _super106.call(this, message, code);
    _this106.name = 'NotFound_FileNotFoundError';
    return _this106;
  }
  return (0, _createClass2.default)(NotFound_FileNotFoundError);
}(NotFoundError);
exports.NotFound_FileNotFoundError = NotFound_FileNotFoundError;
errorClasses.NotFound_FileNotFoundError = NotFound_FileNotFoundError;
var NotFound_FileUploadNotFoundError = /*#__PURE__*/function (_NotFoundError6) {
  (0, _inherits2.default)(NotFound_FileUploadNotFoundError, _NotFoundError6);
  var _super107 = _createSuper(NotFound_FileUploadNotFoundError);
  function NotFound_FileUploadNotFoundError(message, code) {
    var _this107;
    (0, _classCallCheck2.default)(this, NotFound_FileUploadNotFoundError);
    _this107 = _super107.call(this, message, code);
    _this107.name = 'NotFound_FileUploadNotFoundError';
    return _this107;
  }
  return (0, _createClass2.default)(NotFound_FileUploadNotFoundError);
}(NotFoundError);
exports.NotFound_FileUploadNotFoundError = NotFound_FileUploadNotFoundError;
errorClasses.NotFound_FileUploadNotFoundError = NotFound_FileUploadNotFoundError;
var NotFound_FolderNotFoundError = /*#__PURE__*/function (_NotFoundError7) {
  (0, _inherits2.default)(NotFound_FolderNotFoundError, _NotFoundError7);
  var _super108 = _createSuper(NotFound_FolderNotFoundError);
  function NotFound_FolderNotFoundError(message, code) {
    var _this108;
    (0, _classCallCheck2.default)(this, NotFound_FolderNotFoundError);
    _this108 = _super108.call(this, message, code);
    _this108.name = 'NotFound_FolderNotFoundError';
    return _this108;
  }
  return (0, _createClass2.default)(NotFound_FolderNotFoundError);
}(NotFoundError);
exports.NotFound_FolderNotFoundError = NotFound_FolderNotFoundError;
errorClasses.NotFound_FolderNotFoundError = NotFound_FolderNotFoundError;
var NotFound_GroupNotFoundError = /*#__PURE__*/function (_NotFoundError8) {
  (0, _inherits2.default)(NotFound_GroupNotFoundError, _NotFoundError8);
  var _super109 = _createSuper(NotFound_GroupNotFoundError);
  function NotFound_GroupNotFoundError(message, code) {
    var _this109;
    (0, _classCallCheck2.default)(this, NotFound_GroupNotFoundError);
    _this109 = _super109.call(this, message, code);
    _this109.name = 'NotFound_GroupNotFoundError';
    return _this109;
  }
  return (0, _createClass2.default)(NotFound_GroupNotFoundError);
}(NotFoundError);
exports.NotFound_GroupNotFoundError = NotFound_GroupNotFoundError;
errorClasses.NotFound_GroupNotFoundError = NotFound_GroupNotFoundError;
var NotFound_InboxNotFoundError = /*#__PURE__*/function (_NotFoundError9) {
  (0, _inherits2.default)(NotFound_InboxNotFoundError, _NotFoundError9);
  var _super110 = _createSuper(NotFound_InboxNotFoundError);
  function NotFound_InboxNotFoundError(message, code) {
    var _this110;
    (0, _classCallCheck2.default)(this, NotFound_InboxNotFoundError);
    _this110 = _super110.call(this, message, code);
    _this110.name = 'NotFound_InboxNotFoundError';
    return _this110;
  }
  return (0, _createClass2.default)(NotFound_InboxNotFoundError);
}(NotFoundError);
exports.NotFound_InboxNotFoundError = NotFound_InboxNotFoundError;
errorClasses.NotFound_InboxNotFoundError = NotFound_InboxNotFoundError;
var NotFound_NestedNotFoundError = /*#__PURE__*/function (_NotFoundError10) {
  (0, _inherits2.default)(NotFound_NestedNotFoundError, _NotFoundError10);
  var _super111 = _createSuper(NotFound_NestedNotFoundError);
  function NotFound_NestedNotFoundError(message, code) {
    var _this111;
    (0, _classCallCheck2.default)(this, NotFound_NestedNotFoundError);
    _this111 = _super111.call(this, message, code);
    _this111.name = 'NotFound_NestedNotFoundError';
    return _this111;
  }
  return (0, _createClass2.default)(NotFound_NestedNotFoundError);
}(NotFoundError);
exports.NotFound_NestedNotFoundError = NotFound_NestedNotFoundError;
errorClasses.NotFound_NestedNotFoundError = NotFound_NestedNotFoundError;
var NotFound_PlanNotFoundError = /*#__PURE__*/function (_NotFoundError11) {
  (0, _inherits2.default)(NotFound_PlanNotFoundError, _NotFoundError11);
  var _super112 = _createSuper(NotFound_PlanNotFoundError);
  function NotFound_PlanNotFoundError(message, code) {
    var _this112;
    (0, _classCallCheck2.default)(this, NotFound_PlanNotFoundError);
    _this112 = _super112.call(this, message, code);
    _this112.name = 'NotFound_PlanNotFoundError';
    return _this112;
  }
  return (0, _createClass2.default)(NotFound_PlanNotFoundError);
}(NotFoundError);
exports.NotFound_PlanNotFoundError = NotFound_PlanNotFoundError;
errorClasses.NotFound_PlanNotFoundError = NotFound_PlanNotFoundError;
var NotFound_SiteNotFoundError = /*#__PURE__*/function (_NotFoundError12) {
  (0, _inherits2.default)(NotFound_SiteNotFoundError, _NotFoundError12);
  var _super113 = _createSuper(NotFound_SiteNotFoundError);
  function NotFound_SiteNotFoundError(message, code) {
    var _this113;
    (0, _classCallCheck2.default)(this, NotFound_SiteNotFoundError);
    _this113 = _super113.call(this, message, code);
    _this113.name = 'NotFound_SiteNotFoundError';
    return _this113;
  }
  return (0, _createClass2.default)(NotFound_SiteNotFoundError);
}(NotFoundError);
exports.NotFound_SiteNotFoundError = NotFound_SiteNotFoundError;
errorClasses.NotFound_SiteNotFoundError = NotFound_SiteNotFoundError;
var NotFound_UserNotFoundError = /*#__PURE__*/function (_NotFoundError13) {
  (0, _inherits2.default)(NotFound_UserNotFoundError, _NotFoundError13);
  var _super114 = _createSuper(NotFound_UserNotFoundError);
  function NotFound_UserNotFoundError(message, code) {
    var _this114;
    (0, _classCallCheck2.default)(this, NotFound_UserNotFoundError);
    _this114 = _super114.call(this, message, code);
    _this114.name = 'NotFound_UserNotFoundError';
    return _this114;
  }
  return (0, _createClass2.default)(NotFound_UserNotFoundError);
}(NotFoundError);
exports.NotFound_UserNotFoundError = NotFound_UserNotFoundError;
errorClasses.NotFound_UserNotFoundError = NotFound_UserNotFoundError;
var ProcessingFailure_AutomationCannotBeRunManuallyError = /*#__PURE__*/function (_ProcessingFailureErr) {
  (0, _inherits2.default)(ProcessingFailure_AutomationCannotBeRunManuallyError, _ProcessingFailureErr);
  var _super115 = _createSuper(ProcessingFailure_AutomationCannotBeRunManuallyError);
  function ProcessingFailure_AutomationCannotBeRunManuallyError(message, code) {
    var _this115;
    (0, _classCallCheck2.default)(this, ProcessingFailure_AutomationCannotBeRunManuallyError);
    _this115 = _super115.call(this, message, code);
    _this115.name = 'ProcessingFailure_AutomationCannotBeRunManuallyError';
    return _this115;
  }
  return (0, _createClass2.default)(ProcessingFailure_AutomationCannotBeRunManuallyError);
}(ProcessingFailureError);
exports.ProcessingFailure_AutomationCannotBeRunManuallyError = ProcessingFailure_AutomationCannotBeRunManuallyError;
errorClasses.ProcessingFailure_AutomationCannotBeRunManuallyError = ProcessingFailure_AutomationCannotBeRunManuallyError;
var ProcessingFailure_BundleOnlyAllowsPreviewsError = /*#__PURE__*/function (_ProcessingFailureErr2) {
  (0, _inherits2.default)(ProcessingFailure_BundleOnlyAllowsPreviewsError, _ProcessingFailureErr2);
  var _super116 = _createSuper(ProcessingFailure_BundleOnlyAllowsPreviewsError);
  function ProcessingFailure_BundleOnlyAllowsPreviewsError(message, code) {
    var _this116;
    (0, _classCallCheck2.default)(this, ProcessingFailure_BundleOnlyAllowsPreviewsError);
    _this116 = _super116.call(this, message, code);
    _this116.name = 'ProcessingFailure_BundleOnlyAllowsPreviewsError';
    return _this116;
  }
  return (0, _createClass2.default)(ProcessingFailure_BundleOnlyAllowsPreviewsError);
}(ProcessingFailureError);
exports.ProcessingFailure_BundleOnlyAllowsPreviewsError = ProcessingFailure_BundleOnlyAllowsPreviewsError;
errorClasses.ProcessingFailure_BundleOnlyAllowsPreviewsError = ProcessingFailure_BundleOnlyAllowsPreviewsError;
var ProcessingFailure_BundleOperationRequiresSubfolderError = /*#__PURE__*/function (_ProcessingFailureErr3) {
  (0, _inherits2.default)(ProcessingFailure_BundleOperationRequiresSubfolderError, _ProcessingFailureErr3);
  var _super117 = _createSuper(ProcessingFailure_BundleOperationRequiresSubfolderError);
  function ProcessingFailure_BundleOperationRequiresSubfolderError(message, code) {
    var _this117;
    (0, _classCallCheck2.default)(this, ProcessingFailure_BundleOperationRequiresSubfolderError);
    _this117 = _super117.call(this, message, code);
    _this117.name = 'ProcessingFailure_BundleOperationRequiresSubfolderError';
    return _this117;
  }
  return (0, _createClass2.default)(ProcessingFailure_BundleOperationRequiresSubfolderError);
}(ProcessingFailureError);
exports.ProcessingFailure_BundleOperationRequiresSubfolderError = ProcessingFailure_BundleOperationRequiresSubfolderError;
errorClasses.ProcessingFailure_BundleOperationRequiresSubfolderError = ProcessingFailure_BundleOperationRequiresSubfolderError;
var ProcessingFailure_CouldNotCreateParentError = /*#__PURE__*/function (_ProcessingFailureErr4) {
  (0, _inherits2.default)(ProcessingFailure_CouldNotCreateParentError, _ProcessingFailureErr4);
  var _super118 = _createSuper(ProcessingFailure_CouldNotCreateParentError);
  function ProcessingFailure_CouldNotCreateParentError(message, code) {
    var _this118;
    (0, _classCallCheck2.default)(this, ProcessingFailure_CouldNotCreateParentError);
    _this118 = _super118.call(this, message, code);
    _this118.name = 'ProcessingFailure_CouldNotCreateParentError';
    return _this118;
  }
  return (0, _createClass2.default)(ProcessingFailure_CouldNotCreateParentError);
}(ProcessingFailureError);
exports.ProcessingFailure_CouldNotCreateParentError = ProcessingFailure_CouldNotCreateParentError;
errorClasses.ProcessingFailure_CouldNotCreateParentError = ProcessingFailure_CouldNotCreateParentError;
var ProcessingFailure_DestinationExistsError = /*#__PURE__*/function (_ProcessingFailureErr5) {
  (0, _inherits2.default)(ProcessingFailure_DestinationExistsError, _ProcessingFailureErr5);
  var _super119 = _createSuper(ProcessingFailure_DestinationExistsError);
  function ProcessingFailure_DestinationExistsError(message, code) {
    var _this119;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationExistsError);
    _this119 = _super119.call(this, message, code);
    _this119.name = 'ProcessingFailure_DestinationExistsError';
    return _this119;
  }
  return (0, _createClass2.default)(ProcessingFailure_DestinationExistsError);
}(ProcessingFailureError);
exports.ProcessingFailure_DestinationExistsError = ProcessingFailure_DestinationExistsError;
errorClasses.ProcessingFailure_DestinationExistsError = ProcessingFailure_DestinationExistsError;
var ProcessingFailure_DestinationFolderLimitedError = /*#__PURE__*/function (_ProcessingFailureErr6) {
  (0, _inherits2.default)(ProcessingFailure_DestinationFolderLimitedError, _ProcessingFailureErr6);
  var _super120 = _createSuper(ProcessingFailure_DestinationFolderLimitedError);
  function ProcessingFailure_DestinationFolderLimitedError(message, code) {
    var _this120;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationFolderLimitedError);
    _this120 = _super120.call(this, message, code);
    _this120.name = 'ProcessingFailure_DestinationFolderLimitedError';
    return _this120;
  }
  return (0, _createClass2.default)(ProcessingFailure_DestinationFolderLimitedError);
}(ProcessingFailureError);
exports.ProcessingFailure_DestinationFolderLimitedError = ProcessingFailure_DestinationFolderLimitedError;
errorClasses.ProcessingFailure_DestinationFolderLimitedError = ProcessingFailure_DestinationFolderLimitedError;
var ProcessingFailure_DestinationParentConflictError = /*#__PURE__*/function (_ProcessingFailureErr7) {
  (0, _inherits2.default)(ProcessingFailure_DestinationParentConflictError, _ProcessingFailureErr7);
  var _super121 = _createSuper(ProcessingFailure_DestinationParentConflictError);
  function ProcessingFailure_DestinationParentConflictError(message, code) {
    var _this121;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationParentConflictError);
    _this121 = _super121.call(this, message, code);
    _this121.name = 'ProcessingFailure_DestinationParentConflictError';
    return _this121;
  }
  return (0, _createClass2.default)(ProcessingFailure_DestinationParentConflictError);
}(ProcessingFailureError);
exports.ProcessingFailure_DestinationParentConflictError = ProcessingFailure_DestinationParentConflictError;
errorClasses.ProcessingFailure_DestinationParentConflictError = ProcessingFailure_DestinationParentConflictError;
var ProcessingFailure_DestinationParentDoesNotExistError = /*#__PURE__*/function (_ProcessingFailureErr8) {
  (0, _inherits2.default)(ProcessingFailure_DestinationParentDoesNotExistError, _ProcessingFailureErr8);
  var _super122 = _createSuper(ProcessingFailure_DestinationParentDoesNotExistError);
  function ProcessingFailure_DestinationParentDoesNotExistError(message, code) {
    var _this122;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationParentDoesNotExistError);
    _this122 = _super122.call(this, message, code);
    _this122.name = 'ProcessingFailure_DestinationParentDoesNotExistError';
    return _this122;
  }
  return (0, _createClass2.default)(ProcessingFailure_DestinationParentDoesNotExistError);
}(ProcessingFailureError);
exports.ProcessingFailure_DestinationParentDoesNotExistError = ProcessingFailure_DestinationParentDoesNotExistError;
errorClasses.ProcessingFailure_DestinationParentDoesNotExistError = ProcessingFailure_DestinationParentDoesNotExistError;
var ProcessingFailure_ExpiredPrivateKeyError = /*#__PURE__*/function (_ProcessingFailureErr9) {
  (0, _inherits2.default)(ProcessingFailure_ExpiredPrivateKeyError, _ProcessingFailureErr9);
  var _super123 = _createSuper(ProcessingFailure_ExpiredPrivateKeyError);
  function ProcessingFailure_ExpiredPrivateKeyError(message, code) {
    var _this123;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExpiredPrivateKeyError);
    _this123 = _super123.call(this, message, code);
    _this123.name = 'ProcessingFailure_ExpiredPrivateKeyError';
    return _this123;
  }
  return (0, _createClass2.default)(ProcessingFailure_ExpiredPrivateKeyError);
}(ProcessingFailureError);
exports.ProcessingFailure_ExpiredPrivateKeyError = ProcessingFailure_ExpiredPrivateKeyError;
errorClasses.ProcessingFailure_ExpiredPrivateKeyError = ProcessingFailure_ExpiredPrivateKeyError;
var ProcessingFailure_ExpiredPublicKeyError = /*#__PURE__*/function (_ProcessingFailureErr10) {
  (0, _inherits2.default)(ProcessingFailure_ExpiredPublicKeyError, _ProcessingFailureErr10);
  var _super124 = _createSuper(ProcessingFailure_ExpiredPublicKeyError);
  function ProcessingFailure_ExpiredPublicKeyError(message, code) {
    var _this124;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExpiredPublicKeyError);
    _this124 = _super124.call(this, message, code);
    _this124.name = 'ProcessingFailure_ExpiredPublicKeyError';
    return _this124;
  }
  return (0, _createClass2.default)(ProcessingFailure_ExpiredPublicKeyError);
}(ProcessingFailureError);
exports.ProcessingFailure_ExpiredPublicKeyError = ProcessingFailure_ExpiredPublicKeyError;
errorClasses.ProcessingFailure_ExpiredPublicKeyError = ProcessingFailure_ExpiredPublicKeyError;
var ProcessingFailure_ExportFailureError = /*#__PURE__*/function (_ProcessingFailureErr11) {
  (0, _inherits2.default)(ProcessingFailure_ExportFailureError, _ProcessingFailureErr11);
  var _super125 = _createSuper(ProcessingFailure_ExportFailureError);
  function ProcessingFailure_ExportFailureError(message, code) {
    var _this125;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExportFailureError);
    _this125 = _super125.call(this, message, code);
    _this125.name = 'ProcessingFailure_ExportFailureError';
    return _this125;
  }
  return (0, _createClass2.default)(ProcessingFailure_ExportFailureError);
}(ProcessingFailureError);
exports.ProcessingFailure_ExportFailureError = ProcessingFailure_ExportFailureError;
errorClasses.ProcessingFailure_ExportFailureError = ProcessingFailure_ExportFailureError;
var ProcessingFailure_ExportNotReadyError = /*#__PURE__*/function (_ProcessingFailureErr12) {
  (0, _inherits2.default)(ProcessingFailure_ExportNotReadyError, _ProcessingFailureErr12);
  var _super126 = _createSuper(ProcessingFailure_ExportNotReadyError);
  function ProcessingFailure_ExportNotReadyError(message, code) {
    var _this126;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExportNotReadyError);
    _this126 = _super126.call(this, message, code);
    _this126.name = 'ProcessingFailure_ExportNotReadyError';
    return _this126;
  }
  return (0, _createClass2.default)(ProcessingFailure_ExportNotReadyError);
}(ProcessingFailureError);
exports.ProcessingFailure_ExportNotReadyError = ProcessingFailure_ExportNotReadyError;
errorClasses.ProcessingFailure_ExportNotReadyError = ProcessingFailure_ExportNotReadyError;
var ProcessingFailure_FailedToChangePasswordError = /*#__PURE__*/function (_ProcessingFailureErr13) {
  (0, _inherits2.default)(ProcessingFailure_FailedToChangePasswordError, _ProcessingFailureErr13);
  var _super127 = _createSuper(ProcessingFailure_FailedToChangePasswordError);
  function ProcessingFailure_FailedToChangePasswordError(message, code) {
    var _this127;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FailedToChangePasswordError);
    _this127 = _super127.call(this, message, code);
    _this127.name = 'ProcessingFailure_FailedToChangePasswordError';
    return _this127;
  }
  return (0, _createClass2.default)(ProcessingFailure_FailedToChangePasswordError);
}(ProcessingFailureError);
exports.ProcessingFailure_FailedToChangePasswordError = ProcessingFailure_FailedToChangePasswordError;
errorClasses.ProcessingFailure_FailedToChangePasswordError = ProcessingFailure_FailedToChangePasswordError;
var ProcessingFailure_FileLockedError = /*#__PURE__*/function (_ProcessingFailureErr14) {
  (0, _inherits2.default)(ProcessingFailure_FileLockedError, _ProcessingFailureErr14);
  var _super128 = _createSuper(ProcessingFailure_FileLockedError);
  function ProcessingFailure_FileLockedError(message, code) {
    var _this128;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileLockedError);
    _this128 = _super128.call(this, message, code);
    _this128.name = 'ProcessingFailure_FileLockedError';
    return _this128;
  }
  return (0, _createClass2.default)(ProcessingFailure_FileLockedError);
}(ProcessingFailureError);
exports.ProcessingFailure_FileLockedError = ProcessingFailure_FileLockedError;
errorClasses.ProcessingFailure_FileLockedError = ProcessingFailure_FileLockedError;
var ProcessingFailure_FileNotUploadedError = /*#__PURE__*/function (_ProcessingFailureErr15) {
  (0, _inherits2.default)(ProcessingFailure_FileNotUploadedError, _ProcessingFailureErr15);
  var _super129 = _createSuper(ProcessingFailure_FileNotUploadedError);
  function ProcessingFailure_FileNotUploadedError(message, code) {
    var _this129;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileNotUploadedError);
    _this129 = _super129.call(this, message, code);
    _this129.name = 'ProcessingFailure_FileNotUploadedError';
    return _this129;
  }
  return (0, _createClass2.default)(ProcessingFailure_FileNotUploadedError);
}(ProcessingFailureError);
exports.ProcessingFailure_FileNotUploadedError = ProcessingFailure_FileNotUploadedError;
errorClasses.ProcessingFailure_FileNotUploadedError = ProcessingFailure_FileNotUploadedError;
var ProcessingFailure_FilePendingProcessingError = /*#__PURE__*/function (_ProcessingFailureErr16) {
  (0, _inherits2.default)(ProcessingFailure_FilePendingProcessingError, _ProcessingFailureErr16);
  var _super130 = _createSuper(ProcessingFailure_FilePendingProcessingError);
  function ProcessingFailure_FilePendingProcessingError(message, code) {
    var _this130;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FilePendingProcessingError);
    _this130 = _super130.call(this, message, code);
    _this130.name = 'ProcessingFailure_FilePendingProcessingError';
    return _this130;
  }
  return (0, _createClass2.default)(ProcessingFailure_FilePendingProcessingError);
}(ProcessingFailureError);
exports.ProcessingFailure_FilePendingProcessingError = ProcessingFailure_FilePendingProcessingError;
errorClasses.ProcessingFailure_FilePendingProcessingError = ProcessingFailure_FilePendingProcessingError;
var ProcessingFailure_FileTooBigToDecryptError = /*#__PURE__*/function (_ProcessingFailureErr17) {
  (0, _inherits2.default)(ProcessingFailure_FileTooBigToDecryptError, _ProcessingFailureErr17);
  var _super131 = _createSuper(ProcessingFailure_FileTooBigToDecryptError);
  function ProcessingFailure_FileTooBigToDecryptError(message, code) {
    var _this131;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileTooBigToDecryptError);
    _this131 = _super131.call(this, message, code);
    _this131.name = 'ProcessingFailure_FileTooBigToDecryptError';
    return _this131;
  }
  return (0, _createClass2.default)(ProcessingFailure_FileTooBigToDecryptError);
}(ProcessingFailureError);
exports.ProcessingFailure_FileTooBigToDecryptError = ProcessingFailure_FileTooBigToDecryptError;
errorClasses.ProcessingFailure_FileTooBigToDecryptError = ProcessingFailure_FileTooBigToDecryptError;
var ProcessingFailure_FileTooBigToEncryptError = /*#__PURE__*/function (_ProcessingFailureErr18) {
  (0, _inherits2.default)(ProcessingFailure_FileTooBigToEncryptError, _ProcessingFailureErr18);
  var _super132 = _createSuper(ProcessingFailure_FileTooBigToEncryptError);
  function ProcessingFailure_FileTooBigToEncryptError(message, code) {
    var _this132;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileTooBigToEncryptError);
    _this132 = _super132.call(this, message, code);
    _this132.name = 'ProcessingFailure_FileTooBigToEncryptError';
    return _this132;
  }
  return (0, _createClass2.default)(ProcessingFailure_FileTooBigToEncryptError);
}(ProcessingFailureError);
exports.ProcessingFailure_FileTooBigToEncryptError = ProcessingFailure_FileTooBigToEncryptError;
errorClasses.ProcessingFailure_FileTooBigToEncryptError = ProcessingFailure_FileTooBigToEncryptError;
var ProcessingFailure_FileUploadedToWrongRegionError = /*#__PURE__*/function (_ProcessingFailureErr19) {
  (0, _inherits2.default)(ProcessingFailure_FileUploadedToWrongRegionError, _ProcessingFailureErr19);
  var _super133 = _createSuper(ProcessingFailure_FileUploadedToWrongRegionError);
  function ProcessingFailure_FileUploadedToWrongRegionError(message, code) {
    var _this133;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileUploadedToWrongRegionError);
    _this133 = _super133.call(this, message, code);
    _this133.name = 'ProcessingFailure_FileUploadedToWrongRegionError';
    return _this133;
  }
  return (0, _createClass2.default)(ProcessingFailure_FileUploadedToWrongRegionError);
}(ProcessingFailureError);
exports.ProcessingFailure_FileUploadedToWrongRegionError = ProcessingFailure_FileUploadedToWrongRegionError;
errorClasses.ProcessingFailure_FileUploadedToWrongRegionError = ProcessingFailure_FileUploadedToWrongRegionError;
var ProcessingFailure_FolderLockedError = /*#__PURE__*/function (_ProcessingFailureErr20) {
  (0, _inherits2.default)(ProcessingFailure_FolderLockedError, _ProcessingFailureErr20);
  var _super134 = _createSuper(ProcessingFailure_FolderLockedError);
  function ProcessingFailure_FolderLockedError(message, code) {
    var _this134;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FolderLockedError);
    _this134 = _super134.call(this, message, code);
    _this134.name = 'ProcessingFailure_FolderLockedError';
    return _this134;
  }
  return (0, _createClass2.default)(ProcessingFailure_FolderLockedError);
}(ProcessingFailureError);
exports.ProcessingFailure_FolderLockedError = ProcessingFailure_FolderLockedError;
errorClasses.ProcessingFailure_FolderLockedError = ProcessingFailure_FolderLockedError;
var ProcessingFailure_FolderNotEmptyError = /*#__PURE__*/function (_ProcessingFailureErr21) {
  (0, _inherits2.default)(ProcessingFailure_FolderNotEmptyError, _ProcessingFailureErr21);
  var _super135 = _createSuper(ProcessingFailure_FolderNotEmptyError);
  function ProcessingFailure_FolderNotEmptyError(message, code) {
    var _this135;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FolderNotEmptyError);
    _this135 = _super135.call(this, message, code);
    _this135.name = 'ProcessingFailure_FolderNotEmptyError';
    return _this135;
  }
  return (0, _createClass2.default)(ProcessingFailure_FolderNotEmptyError);
}(ProcessingFailureError);
exports.ProcessingFailure_FolderNotEmptyError = ProcessingFailure_FolderNotEmptyError;
errorClasses.ProcessingFailure_FolderNotEmptyError = ProcessingFailure_FolderNotEmptyError;
var ProcessingFailure_HistoryUnavailableError = /*#__PURE__*/function (_ProcessingFailureErr22) {
  (0, _inherits2.default)(ProcessingFailure_HistoryUnavailableError, _ProcessingFailureErr22);
  var _super136 = _createSuper(ProcessingFailure_HistoryUnavailableError);
  function ProcessingFailure_HistoryUnavailableError(message, code) {
    var _this136;
    (0, _classCallCheck2.default)(this, ProcessingFailure_HistoryUnavailableError);
    _this136 = _super136.call(this, message, code);
    _this136.name = 'ProcessingFailure_HistoryUnavailableError';
    return _this136;
  }
  return (0, _createClass2.default)(ProcessingFailure_HistoryUnavailableError);
}(ProcessingFailureError);
exports.ProcessingFailure_HistoryUnavailableError = ProcessingFailure_HistoryUnavailableError;
errorClasses.ProcessingFailure_HistoryUnavailableError = ProcessingFailure_HistoryUnavailableError;
var ProcessingFailure_InvalidBundleCodeError = /*#__PURE__*/function (_ProcessingFailureErr23) {
  (0, _inherits2.default)(ProcessingFailure_InvalidBundleCodeError, _ProcessingFailureErr23);
  var _super137 = _createSuper(ProcessingFailure_InvalidBundleCodeError);
  function ProcessingFailure_InvalidBundleCodeError(message, code) {
    var _this137;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidBundleCodeError);
    _this137 = _super137.call(this, message, code);
    _this137.name = 'ProcessingFailure_InvalidBundleCodeError';
    return _this137;
  }
  return (0, _createClass2.default)(ProcessingFailure_InvalidBundleCodeError);
}(ProcessingFailureError);
exports.ProcessingFailure_InvalidBundleCodeError = ProcessingFailure_InvalidBundleCodeError;
errorClasses.ProcessingFailure_InvalidBundleCodeError = ProcessingFailure_InvalidBundleCodeError;
var ProcessingFailure_InvalidFileTypeError = /*#__PURE__*/function (_ProcessingFailureErr24) {
  (0, _inherits2.default)(ProcessingFailure_InvalidFileTypeError, _ProcessingFailureErr24);
  var _super138 = _createSuper(ProcessingFailure_InvalidFileTypeError);
  function ProcessingFailure_InvalidFileTypeError(message, code) {
    var _this138;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidFileTypeError);
    _this138 = _super138.call(this, message, code);
    _this138.name = 'ProcessingFailure_InvalidFileTypeError';
    return _this138;
  }
  return (0, _createClass2.default)(ProcessingFailure_InvalidFileTypeError);
}(ProcessingFailureError);
exports.ProcessingFailure_InvalidFileTypeError = ProcessingFailure_InvalidFileTypeError;
errorClasses.ProcessingFailure_InvalidFileTypeError = ProcessingFailure_InvalidFileTypeError;
var ProcessingFailure_InvalidFilenameError = /*#__PURE__*/function (_ProcessingFailureErr25) {
  (0, _inherits2.default)(ProcessingFailure_InvalidFilenameError, _ProcessingFailureErr25);
  var _super139 = _createSuper(ProcessingFailure_InvalidFilenameError);
  function ProcessingFailure_InvalidFilenameError(message, code) {
    var _this139;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidFilenameError);
    _this139 = _super139.call(this, message, code);
    _this139.name = 'ProcessingFailure_InvalidFilenameError';
    return _this139;
  }
  return (0, _createClass2.default)(ProcessingFailure_InvalidFilenameError);
}(ProcessingFailureError);
exports.ProcessingFailure_InvalidFilenameError = ProcessingFailure_InvalidFilenameError;
errorClasses.ProcessingFailure_InvalidFilenameError = ProcessingFailure_InvalidFilenameError;
var ProcessingFailure_InvalidRangeError = /*#__PURE__*/function (_ProcessingFailureErr26) {
  (0, _inherits2.default)(ProcessingFailure_InvalidRangeError, _ProcessingFailureErr26);
  var _super140 = _createSuper(ProcessingFailure_InvalidRangeError);
  function ProcessingFailure_InvalidRangeError(message, code) {
    var _this140;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidRangeError);
    _this140 = _super140.call(this, message, code);
    _this140.name = 'ProcessingFailure_InvalidRangeError';
    return _this140;
  }
  return (0, _createClass2.default)(ProcessingFailure_InvalidRangeError);
}(ProcessingFailureError);
exports.ProcessingFailure_InvalidRangeError = ProcessingFailure_InvalidRangeError;
errorClasses.ProcessingFailure_InvalidRangeError = ProcessingFailure_InvalidRangeError;
var ProcessingFailure_ModelSaveErrorError = /*#__PURE__*/function (_ProcessingFailureErr27) {
  (0, _inherits2.default)(ProcessingFailure_ModelSaveErrorError, _ProcessingFailureErr27);
  var _super141 = _createSuper(ProcessingFailure_ModelSaveErrorError);
  function ProcessingFailure_ModelSaveErrorError(message, code) {
    var _this141;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ModelSaveErrorError);
    _this141 = _super141.call(this, message, code);
    _this141.name = 'ProcessingFailure_ModelSaveErrorError';
    return _this141;
  }
  return (0, _createClass2.default)(ProcessingFailure_ModelSaveErrorError);
}(ProcessingFailureError);
exports.ProcessingFailure_ModelSaveErrorError = ProcessingFailure_ModelSaveErrorError;
errorClasses.ProcessingFailure_ModelSaveErrorError = ProcessingFailure_ModelSaveErrorError;
var ProcessingFailure_MultipleProcessingErrorsError = /*#__PURE__*/function (_ProcessingFailureErr28) {
  (0, _inherits2.default)(ProcessingFailure_MultipleProcessingErrorsError, _ProcessingFailureErr28);
  var _super142 = _createSuper(ProcessingFailure_MultipleProcessingErrorsError);
  function ProcessingFailure_MultipleProcessingErrorsError(message, code) {
    var _this142;
    (0, _classCallCheck2.default)(this, ProcessingFailure_MultipleProcessingErrorsError);
    _this142 = _super142.call(this, message, code);
    _this142.name = 'ProcessingFailure_MultipleProcessingErrorsError';
    return _this142;
  }
  return (0, _createClass2.default)(ProcessingFailure_MultipleProcessingErrorsError);
}(ProcessingFailureError);
exports.ProcessingFailure_MultipleProcessingErrorsError = ProcessingFailure_MultipleProcessingErrorsError;
errorClasses.ProcessingFailure_MultipleProcessingErrorsError = ProcessingFailure_MultipleProcessingErrorsError;
var ProcessingFailure_PathTooLongError = /*#__PURE__*/function (_ProcessingFailureErr29) {
  (0, _inherits2.default)(ProcessingFailure_PathTooLongError, _ProcessingFailureErr29);
  var _super143 = _createSuper(ProcessingFailure_PathTooLongError);
  function ProcessingFailure_PathTooLongError(message, code) {
    var _this143;
    (0, _classCallCheck2.default)(this, ProcessingFailure_PathTooLongError);
    _this143 = _super143.call(this, message, code);
    _this143.name = 'ProcessingFailure_PathTooLongError';
    return _this143;
  }
  return (0, _createClass2.default)(ProcessingFailure_PathTooLongError);
}(ProcessingFailureError);
exports.ProcessingFailure_PathTooLongError = ProcessingFailure_PathTooLongError;
errorClasses.ProcessingFailure_PathTooLongError = ProcessingFailure_PathTooLongError;
var ProcessingFailure_RecipientAlreadySharedError = /*#__PURE__*/function (_ProcessingFailureErr30) {
  (0, _inherits2.default)(ProcessingFailure_RecipientAlreadySharedError, _ProcessingFailureErr30);
  var _super144 = _createSuper(ProcessingFailure_RecipientAlreadySharedError);
  function ProcessingFailure_RecipientAlreadySharedError(message, code) {
    var _this144;
    (0, _classCallCheck2.default)(this, ProcessingFailure_RecipientAlreadySharedError);
    _this144 = _super144.call(this, message, code);
    _this144.name = 'ProcessingFailure_RecipientAlreadySharedError';
    return _this144;
  }
  return (0, _createClass2.default)(ProcessingFailure_RecipientAlreadySharedError);
}(ProcessingFailureError);
exports.ProcessingFailure_RecipientAlreadySharedError = ProcessingFailure_RecipientAlreadySharedError;
errorClasses.ProcessingFailure_RecipientAlreadySharedError = ProcessingFailure_RecipientAlreadySharedError;
var ProcessingFailure_RemoteServerErrorError = /*#__PURE__*/function (_ProcessingFailureErr31) {
  (0, _inherits2.default)(ProcessingFailure_RemoteServerErrorError, _ProcessingFailureErr31);
  var _super145 = _createSuper(ProcessingFailure_RemoteServerErrorError);
  function ProcessingFailure_RemoteServerErrorError(message, code) {
    var _this145;
    (0, _classCallCheck2.default)(this, ProcessingFailure_RemoteServerErrorError);
    _this145 = _super145.call(this, message, code);
    _this145.name = 'ProcessingFailure_RemoteServerErrorError';
    return _this145;
  }
  return (0, _createClass2.default)(ProcessingFailure_RemoteServerErrorError);
}(ProcessingFailureError);
exports.ProcessingFailure_RemoteServerErrorError = ProcessingFailure_RemoteServerErrorError;
errorClasses.ProcessingFailure_RemoteServerErrorError = ProcessingFailure_RemoteServerErrorError;
var ProcessingFailure_ResourceLockedError = /*#__PURE__*/function (_ProcessingFailureErr32) {
  (0, _inherits2.default)(ProcessingFailure_ResourceLockedError, _ProcessingFailureErr32);
  var _super146 = _createSuper(ProcessingFailure_ResourceLockedError);
  function ProcessingFailure_ResourceLockedError(message, code) {
    var _this146;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ResourceLockedError);
    _this146 = _super146.call(this, message, code);
    _this146.name = 'ProcessingFailure_ResourceLockedError';
    return _this146;
  }
  return (0, _createClass2.default)(ProcessingFailure_ResourceLockedError);
}(ProcessingFailureError);
exports.ProcessingFailure_ResourceLockedError = ProcessingFailure_ResourceLockedError;
errorClasses.ProcessingFailure_ResourceLockedError = ProcessingFailure_ResourceLockedError;
var ProcessingFailure_SubfolderLockedError = /*#__PURE__*/function (_ProcessingFailureErr33) {
  (0, _inherits2.default)(ProcessingFailure_SubfolderLockedError, _ProcessingFailureErr33);
  var _super147 = _createSuper(ProcessingFailure_SubfolderLockedError);
  function ProcessingFailure_SubfolderLockedError(message, code) {
    var _this147;
    (0, _classCallCheck2.default)(this, ProcessingFailure_SubfolderLockedError);
    _this147 = _super147.call(this, message, code);
    _this147.name = 'ProcessingFailure_SubfolderLockedError';
    return _this147;
  }
  return (0, _createClass2.default)(ProcessingFailure_SubfolderLockedError);
}(ProcessingFailureError);
exports.ProcessingFailure_SubfolderLockedError = ProcessingFailure_SubfolderLockedError;
errorClasses.ProcessingFailure_SubfolderLockedError = ProcessingFailure_SubfolderLockedError;
var ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = /*#__PURE__*/function (_ProcessingFailureErr34) {
  (0, _inherits2.default)(ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError, _ProcessingFailureErr34);
  var _super148 = _createSuper(ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError);
  function ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError(message, code) {
    var _this148;
    (0, _classCallCheck2.default)(this, ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError);
    _this148 = _super148.call(this, message, code);
    _this148.name = 'ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError';
    return _this148;
  }
  return (0, _createClass2.default)(ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError);
}(ProcessingFailureError);
exports.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError;
errorClasses.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError;
var ProcessingFailure_UpdatesNotAllowedForRemotesError = /*#__PURE__*/function (_ProcessingFailureErr35) {
  (0, _inherits2.default)(ProcessingFailure_UpdatesNotAllowedForRemotesError, _ProcessingFailureErr35);
  var _super149 = _createSuper(ProcessingFailure_UpdatesNotAllowedForRemotesError);
  function ProcessingFailure_UpdatesNotAllowedForRemotesError(message, code) {
    var _this149;
    (0, _classCallCheck2.default)(this, ProcessingFailure_UpdatesNotAllowedForRemotesError);
    _this149 = _super149.call(this, message, code);
    _this149.name = 'ProcessingFailure_UpdatesNotAllowedForRemotesError';
    return _this149;
  }
  return (0, _createClass2.default)(ProcessingFailure_UpdatesNotAllowedForRemotesError);
}(ProcessingFailureError);
exports.ProcessingFailure_UpdatesNotAllowedForRemotesError = ProcessingFailure_UpdatesNotAllowedForRemotesError;
errorClasses.ProcessingFailure_UpdatesNotAllowedForRemotesError = ProcessingFailure_UpdatesNotAllowedForRemotesError;
var RateLimited_DuplicateShareRecipientError = /*#__PURE__*/function (_RateLimitedError) {
  (0, _inherits2.default)(RateLimited_DuplicateShareRecipientError, _RateLimitedError);
  var _super150 = _createSuper(RateLimited_DuplicateShareRecipientError);
  function RateLimited_DuplicateShareRecipientError(message, code) {
    var _this150;
    (0, _classCallCheck2.default)(this, RateLimited_DuplicateShareRecipientError);
    _this150 = _super150.call(this, message, code);
    _this150.name = 'RateLimited_DuplicateShareRecipientError';
    return _this150;
  }
  return (0, _createClass2.default)(RateLimited_DuplicateShareRecipientError);
}(RateLimitedError);
exports.RateLimited_DuplicateShareRecipientError = RateLimited_DuplicateShareRecipientError;
errorClasses.RateLimited_DuplicateShareRecipientError = RateLimited_DuplicateShareRecipientError;
var RateLimited_ReauthenticationRateLimitedError = /*#__PURE__*/function (_RateLimitedError2) {
  (0, _inherits2.default)(RateLimited_ReauthenticationRateLimitedError, _RateLimitedError2);
  var _super151 = _createSuper(RateLimited_ReauthenticationRateLimitedError);
  function RateLimited_ReauthenticationRateLimitedError(message, code) {
    var _this151;
    (0, _classCallCheck2.default)(this, RateLimited_ReauthenticationRateLimitedError);
    _this151 = _super151.call(this, message, code);
    _this151.name = 'RateLimited_ReauthenticationRateLimitedError';
    return _this151;
  }
  return (0, _createClass2.default)(RateLimited_ReauthenticationRateLimitedError);
}(RateLimitedError);
exports.RateLimited_ReauthenticationRateLimitedError = RateLimited_ReauthenticationRateLimitedError;
errorClasses.RateLimited_ReauthenticationRateLimitedError = RateLimited_ReauthenticationRateLimitedError;
var RateLimited_TooManyConcurrentRequestsError = /*#__PURE__*/function (_RateLimitedError3) {
  (0, _inherits2.default)(RateLimited_TooManyConcurrentRequestsError, _RateLimitedError3);
  var _super152 = _createSuper(RateLimited_TooManyConcurrentRequestsError);
  function RateLimited_TooManyConcurrentRequestsError(message, code) {
    var _this152;
    (0, _classCallCheck2.default)(this, RateLimited_TooManyConcurrentRequestsError);
    _this152 = _super152.call(this, message, code);
    _this152.name = 'RateLimited_TooManyConcurrentRequestsError';
    return _this152;
  }
  return (0, _createClass2.default)(RateLimited_TooManyConcurrentRequestsError);
}(RateLimitedError);
exports.RateLimited_TooManyConcurrentRequestsError = RateLimited_TooManyConcurrentRequestsError;
errorClasses.RateLimited_TooManyConcurrentRequestsError = RateLimited_TooManyConcurrentRequestsError;
var RateLimited_TooManyLoginAttemptsError = /*#__PURE__*/function (_RateLimitedError4) {
  (0, _inherits2.default)(RateLimited_TooManyLoginAttemptsError, _RateLimitedError4);
  var _super153 = _createSuper(RateLimited_TooManyLoginAttemptsError);
  function RateLimited_TooManyLoginAttemptsError(message, code) {
    var _this153;
    (0, _classCallCheck2.default)(this, RateLimited_TooManyLoginAttemptsError);
    _this153 = _super153.call(this, message, code);
    _this153.name = 'RateLimited_TooManyLoginAttemptsError';
    return _this153;
  }
  return (0, _createClass2.default)(RateLimited_TooManyLoginAttemptsError);
}(RateLimitedError);
exports.RateLimited_TooManyLoginAttemptsError = RateLimited_TooManyLoginAttemptsError;
errorClasses.RateLimited_TooManyLoginAttemptsError = RateLimited_TooManyLoginAttemptsError;
var RateLimited_TooManyRequestsError = /*#__PURE__*/function (_RateLimitedError5) {
  (0, _inherits2.default)(RateLimited_TooManyRequestsError, _RateLimitedError5);
  var _super154 = _createSuper(RateLimited_TooManyRequestsError);
  function RateLimited_TooManyRequestsError(message, code) {
    var _this154;
    (0, _classCallCheck2.default)(this, RateLimited_TooManyRequestsError);
    _this154 = _super154.call(this, message, code);
    _this154.name = 'RateLimited_TooManyRequestsError';
    return _this154;
  }
  return (0, _createClass2.default)(RateLimited_TooManyRequestsError);
}(RateLimitedError);
exports.RateLimited_TooManyRequestsError = RateLimited_TooManyRequestsError;
errorClasses.RateLimited_TooManyRequestsError = RateLimited_TooManyRequestsError;
var RateLimited_TooManySharesError = /*#__PURE__*/function (_RateLimitedError6) {
  (0, _inherits2.default)(RateLimited_TooManySharesError, _RateLimitedError6);
  var _super155 = _createSuper(RateLimited_TooManySharesError);
  function RateLimited_TooManySharesError(message, code) {
    var _this155;
    (0, _classCallCheck2.default)(this, RateLimited_TooManySharesError);
    _this155 = _super155.call(this, message, code);
    _this155.name = 'RateLimited_TooManySharesError';
    return _this155;
  }
  return (0, _createClass2.default)(RateLimited_TooManySharesError);
}(RateLimitedError);
exports.RateLimited_TooManySharesError = RateLimited_TooManySharesError;
errorClasses.RateLimited_TooManySharesError = RateLimited_TooManySharesError;
var ServiceUnavailable_UploadsUnavailableError = /*#__PURE__*/function (_ServiceUnavailableEr) {
  (0, _inherits2.default)(ServiceUnavailable_UploadsUnavailableError, _ServiceUnavailableEr);
  var _super156 = _createSuper(ServiceUnavailable_UploadsUnavailableError);
  function ServiceUnavailable_UploadsUnavailableError(message, code) {
    var _this156;
    (0, _classCallCheck2.default)(this, ServiceUnavailable_UploadsUnavailableError);
    _this156 = _super156.call(this, message, code);
    _this156.name = 'ServiceUnavailable_UploadsUnavailableError';
    return _this156;
  }
  return (0, _createClass2.default)(ServiceUnavailable_UploadsUnavailableError);
}(ServiceUnavailableError);
exports.ServiceUnavailable_UploadsUnavailableError = ServiceUnavailable_UploadsUnavailableError;
errorClasses.ServiceUnavailable_UploadsUnavailableError = ServiceUnavailable_UploadsUnavailableError;
var SiteConfiguration_AccountAlreadyExistsError = /*#__PURE__*/function (_SiteConfigurationErr) {
  (0, _inherits2.default)(SiteConfiguration_AccountAlreadyExistsError, _SiteConfigurationErr);
  var _super157 = _createSuper(SiteConfiguration_AccountAlreadyExistsError);
  function SiteConfiguration_AccountAlreadyExistsError(message, code) {
    var _this157;
    (0, _classCallCheck2.default)(this, SiteConfiguration_AccountAlreadyExistsError);
    _this157 = _super157.call(this, message, code);
    _this157.name = 'SiteConfiguration_AccountAlreadyExistsError';
    return _this157;
  }
  return (0, _createClass2.default)(SiteConfiguration_AccountAlreadyExistsError);
}(SiteConfigurationError);
exports.SiteConfiguration_AccountAlreadyExistsError = SiteConfiguration_AccountAlreadyExistsError;
errorClasses.SiteConfiguration_AccountAlreadyExistsError = SiteConfiguration_AccountAlreadyExistsError;
var SiteConfiguration_AccountOverdueError = /*#__PURE__*/function (_SiteConfigurationErr2) {
  (0, _inherits2.default)(SiteConfiguration_AccountOverdueError, _SiteConfigurationErr2);
  var _super158 = _createSuper(SiteConfiguration_AccountOverdueError);
  function SiteConfiguration_AccountOverdueError(message, code) {
    var _this158;
    (0, _classCallCheck2.default)(this, SiteConfiguration_AccountOverdueError);
    _this158 = _super158.call(this, message, code);
    _this158.name = 'SiteConfiguration_AccountOverdueError';
    return _this158;
  }
  return (0, _createClass2.default)(SiteConfiguration_AccountOverdueError);
}(SiteConfigurationError);
exports.SiteConfiguration_AccountOverdueError = SiteConfiguration_AccountOverdueError;
errorClasses.SiteConfiguration_AccountOverdueError = SiteConfiguration_AccountOverdueError;
var SiteConfiguration_NoAccountForSiteError = /*#__PURE__*/function (_SiteConfigurationErr3) {
  (0, _inherits2.default)(SiteConfiguration_NoAccountForSiteError, _SiteConfigurationErr3);
  var _super159 = _createSuper(SiteConfiguration_NoAccountForSiteError);
  function SiteConfiguration_NoAccountForSiteError(message, code) {
    var _this159;
    (0, _classCallCheck2.default)(this, SiteConfiguration_NoAccountForSiteError);
    _this159 = _super159.call(this, message, code);
    _this159.name = 'SiteConfiguration_NoAccountForSiteError';
    return _this159;
  }
  return (0, _createClass2.default)(SiteConfiguration_NoAccountForSiteError);
}(SiteConfigurationError);
exports.SiteConfiguration_NoAccountForSiteError = SiteConfiguration_NoAccountForSiteError;
errorClasses.SiteConfiguration_NoAccountForSiteError = SiteConfiguration_NoAccountForSiteError;
var SiteConfiguration_SiteWasRemovedError = /*#__PURE__*/function (_SiteConfigurationErr4) {
  (0, _inherits2.default)(SiteConfiguration_SiteWasRemovedError, _SiteConfigurationErr4);
  var _super160 = _createSuper(SiteConfiguration_SiteWasRemovedError);
  function SiteConfiguration_SiteWasRemovedError(message, code) {
    var _this160;
    (0, _classCallCheck2.default)(this, SiteConfiguration_SiteWasRemovedError);
    _this160 = _super160.call(this, message, code);
    _this160.name = 'SiteConfiguration_SiteWasRemovedError';
    return _this160;
  }
  return (0, _createClass2.default)(SiteConfiguration_SiteWasRemovedError);
}(SiteConfigurationError);
exports.SiteConfiguration_SiteWasRemovedError = SiteConfiguration_SiteWasRemovedError;
errorClasses.SiteConfiguration_SiteWasRemovedError = SiteConfiguration_SiteWasRemovedError;
var SiteConfiguration_TrialExpiredError = /*#__PURE__*/function (_SiteConfigurationErr5) {
  (0, _inherits2.default)(SiteConfiguration_TrialExpiredError, _SiteConfigurationErr5);
  var _super161 = _createSuper(SiteConfiguration_TrialExpiredError);
  function SiteConfiguration_TrialExpiredError(message, code) {
    var _this161;
    (0, _classCallCheck2.default)(this, SiteConfiguration_TrialExpiredError);
    _this161 = _super161.call(this, message, code);
    _this161.name = 'SiteConfiguration_TrialExpiredError';
    return _this161;
  }
  return (0, _createClass2.default)(SiteConfiguration_TrialExpiredError);
}(SiteConfigurationError);
exports.SiteConfiguration_TrialExpiredError = SiteConfiguration_TrialExpiredError;
errorClasses.SiteConfiguration_TrialExpiredError = SiteConfiguration_TrialExpiredError;
var SiteConfiguration_TrialLockedError = /*#__PURE__*/function (_SiteConfigurationErr6) {
  (0, _inherits2.default)(SiteConfiguration_TrialLockedError, _SiteConfigurationErr6);
  var _super162 = _createSuper(SiteConfiguration_TrialLockedError);
  function SiteConfiguration_TrialLockedError(message, code) {
    var _this162;
    (0, _classCallCheck2.default)(this, SiteConfiguration_TrialLockedError);
    _this162 = _super162.call(this, message, code);
    _this162.name = 'SiteConfiguration_TrialLockedError';
    return _this162;
  }
  return (0, _createClass2.default)(SiteConfiguration_TrialLockedError);
}(SiteConfigurationError);
exports.SiteConfiguration_TrialLockedError = SiteConfiguration_TrialLockedError;
errorClasses.SiteConfiguration_TrialLockedError = SiteConfiguration_TrialLockedError;
var SiteConfiguration_UserRequestsEnabledRequiredError = /*#__PURE__*/function (_SiteConfigurationErr7) {
  (0, _inherits2.default)(SiteConfiguration_UserRequestsEnabledRequiredError, _SiteConfigurationErr7);
  var _super163 = _createSuper(SiteConfiguration_UserRequestsEnabledRequiredError);
  function SiteConfiguration_UserRequestsEnabledRequiredError(message, code) {
    var _this163;
    (0, _classCallCheck2.default)(this, SiteConfiguration_UserRequestsEnabledRequiredError);
    _this163 = _super163.call(this, message, code);
    _this163.name = 'SiteConfiguration_UserRequestsEnabledRequiredError';
    return _this163;
  }
  return (0, _createClass2.default)(SiteConfiguration_UserRequestsEnabledRequiredError);
}(SiteConfigurationError);
exports.SiteConfiguration_UserRequestsEnabledRequiredError = SiteConfiguration_UserRequestsEnabledRequiredError;
errorClasses.SiteConfiguration_UserRequestsEnabledRequiredError = SiteConfiguration_UserRequestsEnabledRequiredError;