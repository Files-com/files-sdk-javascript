"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.NotFound_ApiKeyNotFoundError = exports.NotFoundError = exports.NotAuthorized_ZipDownloadIpMismatchError = exports.NotAuthorized_WritePermissionRequiredError = exports.NotAuthorized_WriteAndBundlePermissionRequiredError = exports.NotAuthorized_UserIdWithoutSiteAdminError = exports.NotAuthorized_TwoFactorAuthenticationRequiredError = exports.NotAuthorized_SiteFilesAreImmutableError = exports.NotAuthorized_SiteAdminRequiredError = exports.NotAuthorized_SelfManagedRequiredError = exports.NotAuthorized_RecaptchaFailedError = exports.NotAuthorized_ReauthenticationNeededActionError = exports.NotAuthorized_ReauthenticationFailedFinalError = exports.NotAuthorized_ReauthenticationFailedError = exports.NotAuthorized_ReadPermissionRequiredError = exports.NotAuthorized_ReadOnlySessionError = exports.NotAuthorized_PasswordChangeRequiredError = exports.NotAuthorized_PasswordChangeNotRequiredError = exports.NotAuthorized_NotAllowedToCreateBundleError = exports.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = exports.NotAuthorized_NeedAdminPermissionForInboxError = exports.NotAuthorized_MustAuthenticateWithApiKeyError = exports.NotAuthorized_InsufficientPermissionForParamsError = exports.NotAuthorized_HistoryPermissionRequiredError = exports.NotAuthorized_FullPermissionRequiredError = exports.NotAuthorized_FolderAdminPermissionRequiredError = exports.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = exports.NotAuthorized_FilesAgentFailedAuthorizationError = exports.NotAuthorized_ContactAdminForPasswordChangeHelpError = exports.NotAuthorized_CantActForOtherUserError = exports.NotAuthorized_CannotLoginWhileUsingKeyError = exports.NotAuthorized_BundleMaximumUsesReachedError = exports.NotAuthorized_BillingPermissionRequiredError = exports.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = exports.NotAuthorized_ApiKeyOnlyForMobileAppError = exports.NotAuthorized_ApiKeyOnlyForDesktopAppError = exports.NotAuthorized_ApiKeyIsPathRestrictedError = exports.NotAuthorized_ApiKeyIsDisabledError = exports.NotAuthorizedError = exports.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = exports.NotAuthenticated_TwoFactorAuthenticationErrorError = exports.NotAuthenticated_OneTimePasswordIncorrectError = exports.NotAuthenticated_LockoutRegionMismatchError = exports.NotAuthenticated_LockedOutError = exports.NotAuthenticated_InvalidUsernameOrPasswordError = exports.NotAuthenticated_InvalidOrExpiredCodeError = exports.NotAuthenticated_InvalidOauthError = exports.NotAuthenticated_InvalidCredentialsError = exports.NotAuthenticated_InboxRegistrationCodeFailedError = exports.NotAuthenticated_FilesAgentTokenFailedError = exports.NotAuthenticated_BundleRegistrationCodeFailedError = exports.NotAuthenticated_AuthenticationRequiredError = exports.NotAuthenticatedError = exports.MissingParameterError = exports.InvalidParameterError = exports.FilesError = exports.FilesApiError = exports.EmptyPropertyError = exports.ConfigurationError = exports.BadRequest_UserRequiredError = exports.BadRequest_UserIdOnUserEndpointError = exports.BadRequest_UserIdInvalidError = exports.BadRequest_UnsupportedMediaTypeError = exports.BadRequest_UnsupportedHttpResponseFormatError = exports.BadRequest_UnsupportedCurrencyError = exports.BadRequest_SearchAllOnChildPathError = exports.BadRequest_RequestParamsRequiredError = exports.BadRequest_RequestParamsInvalidError = exports.BadRequest_RequestParamsContainInvalidCharacterError = exports.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = exports.BadRequest_ReauthenticationNeededFieldsError = exports.BadRequest_PartNumberTooLargeError = exports.BadRequest_OperationOnNonScimResourceError = exports.BadRequest_NoValidInputParamsError = exports.BadRequest_MethodNotAllowedError = exports.BadRequest_InvalidUploadPartSizeError = exports.BadRequest_InvalidUploadPartGapError = exports.BadRequest_InvalidUploadOffsetError = exports.BadRequest_InvalidReturnToUrlError = exports.BadRequest_InvalidPathError = exports.BadRequest_InvalidOauthProviderError = exports.BadRequest_InvalidInterfaceError = exports.BadRequest_InvalidInputEncodingError = exports.BadRequest_InvalidFilterParamValueError = exports.BadRequest_InvalidFilterParamError = exports.BadRequest_InvalidFilterFieldError = exports.BadRequest_InvalidFilterCombinationError = exports.BadRequest_InvalidFilterAliasCombinationError = exports.BadRequest_InvalidEtagsError = exports.BadRequest_InvalidCursorTypeForSortError = exports.BadRequest_InvalidCursorError = exports.BadRequest_InvalidBodyError = exports.BadRequest_FolderMustNotBeAFileError = exports.BadRequest_DestinationSameError = exports.BadRequest_DatetimeParseError = exports.BadRequest_CantMoveWithMultipleLocationsError = exports.BadRequest_CannotDownloadDirectoryError = exports.BadRequest_AttachmentTooLargeError = exports.BadRequest_AgentUpgradeRequiredError = exports.BadRequestError = void 0;
exports.handleErrorResponse = exports.SiteConfiguration_UserRequestsEnabledRequiredError = exports.SiteConfiguration_TrialLockedError = exports.SiteConfiguration_TrialExpiredError = exports.SiteConfiguration_SiteWasRemovedError = exports.SiteConfiguration_NoAccountForSiteError = exports.SiteConfiguration_AccountOverdueError = exports.SiteConfiguration_AccountAlreadyExistsError = exports.SiteConfigurationError = exports.ServiceUnavailable_UploadsUnavailableError = exports.ServiceUnavailable_AutomationsUnavailableError = exports.ServiceUnavailable_AgentUnavailableError = exports.ServiceUnavailableError = exports.RateLimited_TooManySharesError = exports.RateLimited_TooManyRequestsError = exports.RateLimited_TooManyLoginAttemptsError = exports.RateLimited_TooManyConcurrentRequestsError = exports.RateLimited_ReauthenticationRateLimitedError = exports.RateLimited_DuplicateShareRecipientError = exports.RateLimitedError = exports.ProcessingFailure_UpdatesNotAllowedForRemotesError = exports.ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError = exports.ProcessingFailure_TwoFactorAuthenticationGeneralErrorError = exports.ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError = exports.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = exports.ProcessingFailure_SubfolderLockedError = exports.ProcessingFailure_ResourceLockedError = exports.ProcessingFailure_RemoteServerErrorError = exports.ProcessingFailure_RecipientAlreadySharedError = exports.ProcessingFailure_PathTooLongError = exports.ProcessingFailure_MultipleProcessingErrorsError = exports.ProcessingFailure_ModelSaveErrorError = exports.ProcessingFailure_InvalidRangeError = exports.ProcessingFailure_InvalidFilenameError = exports.ProcessingFailure_InvalidFileTypeError = exports.ProcessingFailure_InvalidBundleCodeError = exports.ProcessingFailure_HistoryUnavailableError = exports.ProcessingFailure_FolderNotEmptyError = exports.ProcessingFailure_FolderLockedError = exports.ProcessingFailure_FilenameTooLongError = exports.ProcessingFailure_FileUploadedToWrongRegionError = exports.ProcessingFailure_FileTooBigToEncryptError = exports.ProcessingFailure_FileTooBigToDecryptError = exports.ProcessingFailure_FilePendingProcessingError = exports.ProcessingFailure_FileNotUploadedError = exports.ProcessingFailure_FileLockedError = exports.ProcessingFailure_FailedToChangePasswordError = exports.ProcessingFailure_ExportNotReadyError = exports.ProcessingFailure_ExportFailureError = exports.ProcessingFailure_ExpiredPublicKeyError = exports.ProcessingFailure_ExpiredPrivateKeyError = exports.ProcessingFailure_DestinationParentDoesNotExistError = exports.ProcessingFailure_DestinationParentConflictError = exports.ProcessingFailure_DestinationFolderLimitedError = exports.ProcessingFailure_DestinationExistsError = exports.ProcessingFailure_CouldNotCreateParentError = exports.ProcessingFailure_BundleOperationRequiresSubfolderError = exports.ProcessingFailure_BundleOnlyAllowsPreviewsError = exports.ProcessingFailure_AutomationCannotBeRunManuallyError = exports.ProcessingFailure_AlreadyCompletedError = exports.ProcessingFailureError = exports.NotImplementedError = exports.NotFound_UserNotFoundError = exports.NotFound_SiteNotFoundError = exports.NotFound_PlanNotFoundError = exports.NotFound_NestedNotFoundError = exports.NotFound_InboxNotFoundError = exports.NotFound_GroupNotFoundError = exports.NotFound_FolderNotFoundError = exports.NotFound_FileUploadNotFoundError = exports.NotFound_FileNotFoundError = exports.NotFound_CodeNotFoundError = exports.NotFound_BundleRegistrationNotFoundError = exports.NotFound_BundlePathNotFoundError = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));
var _Logger = _interopRequireDefault(require("./Logger"));
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable camelcase, max-classes-per-file */
var FilesError = exports.FilesError = /*#__PURE__*/function (_Error) {
  function FilesError(message, code) {
    var _this;
    (0, _classCallCheck2.default)(this, FilesError);
    _this = _callSuper(this, FilesError, [message]);
    _this.name = 'FilesError';
    _this.code = code;
    return _this;
  }
  (0, _inherits2.default)(FilesError, _Error);
  return (0, _createClass2.default)(FilesError);
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
var FilesApiError = exports.FilesApiError = /*#__PURE__*/function (_FilesError) {
  function FilesApiError(message, code, errorData) {
    var _this2;
    (0, _classCallCheck2.default)(this, FilesApiError);
    _this2 = _callSuper(this, FilesApiError, [message, code]);
    _this2.name = 'FilesApiError';
    if (errorData) {
      _this2.detail = errorData.detail;
      _this2.error = errorData.error;
      _this2.errors = errorData.errors;
      _this2.httpCode = errorData['http-code'];
      _this2.instance = errorData.instance;
      _this2.modelErrors = errorData['model-errors'];
      _this2.title = errorData.title;
      _this2.type = errorData.type;
      _this2.data = errorData.data;
    }
    return _this2;
  }
  (0, _inherits2.default)(FilesApiError, _FilesError);
  return (0, _createClass2.default)(FilesApiError);
}(FilesError);
var errorClasses = {
  FilesApiError: FilesApiError
};
var toPascalCase = function toPascalCase(string) {
  return string.replace(/-/g, ' ').split(' ').map(function (part) {
    return part[0].toUpperCase() + part.substring(1);
  }).join('');
};
var handleErrorResponse = exports.handleErrorResponse = function handleErrorResponse(error) {
  var _errorData, _errorData2;
  var response = error.response;
  var errorData = response === null || response === void 0 ? void 0 : response.data;
  var message = ((_errorData = errorData) === null || _errorData === void 0 ? void 0 : _errorData.error) || (response === null || response === void 0 ? void 0 : response.statusText) || error.message;
  var code = (response === null || response === void 0 ? void 0 : response.status) || ((_errorData2 = errorData) === null || _errorData2 === void 0 ? void 0 : _errorData2['http-code']) || 0;
  if (!errorData) {
    _Logger.default.debug('FilesApiError Exception:', code, message);
    throw new FilesError(message, code);
  }
  if (Array.isArray(errorData)) {
    var _errorData3 = errorData;
    var _errorData4 = (0, _slicedToArray2.default)(_errorData3, 1);
    errorData = _errorData4[0];
  }
  if (!errorData.type) {
    _Logger.default.debug('FilesApiError Exception:', code, message);
    throw new FilesError(message, code);
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
  _Logger.default.debug("".concat(ErrorClass.name, " Exception >"), code, message);
  throw new ErrorClass(message, code, errorData);
};

// general errors
var ConfigurationError = exports.ConfigurationError = /*#__PURE__*/function (_FilesError2) {
  function ConfigurationError(message) {
    var _this3;
    (0, _classCallCheck2.default)(this, ConfigurationError);
    _this3 = _callSuper(this, ConfigurationError, [message]);
    _this3.name = 'ConfigurationError';
    return _this3;
  }
  (0, _inherits2.default)(ConfigurationError, _FilesError2);
  return (0, _createClass2.default)(ConfigurationError);
}(FilesError);
errorClasses.ConfigurationError = ConfigurationError;
var EmptyPropertyError = exports.EmptyPropertyError = /*#__PURE__*/function (_FilesError3) {
  function EmptyPropertyError(message) {
    var _this4;
    (0, _classCallCheck2.default)(this, EmptyPropertyError);
    _this4 = _callSuper(this, EmptyPropertyError, [message]);
    _this4.name = 'EmptyPropertyError';
    return _this4;
  }
  (0, _inherits2.default)(EmptyPropertyError, _FilesError3);
  return (0, _createClass2.default)(EmptyPropertyError);
}(FilesError);
errorClasses.EmptyPropertyError = EmptyPropertyError;
var InvalidParameterError = exports.InvalidParameterError = /*#__PURE__*/function (_FilesError4) {
  function InvalidParameterError(message) {
    var _this5;
    (0, _classCallCheck2.default)(this, InvalidParameterError);
    _this5 = _callSuper(this, InvalidParameterError, [message]);
    _this5.name = 'InvalidParameterError';
    return _this5;
  }
  (0, _inherits2.default)(InvalidParameterError, _FilesError4);
  return (0, _createClass2.default)(InvalidParameterError);
}(FilesError);
errorClasses.InvalidParameterError = InvalidParameterError;
var MissingParameterError = exports.MissingParameterError = /*#__PURE__*/function (_FilesError5) {
  function MissingParameterError(message) {
    var _this6;
    (0, _classCallCheck2.default)(this, MissingParameterError);
    _this6 = _callSuper(this, MissingParameterError, [message]);
    _this6.name = 'MissingParameterError';
    return _this6;
  }
  (0, _inherits2.default)(MissingParameterError, _FilesError5);
  return (0, _createClass2.default)(MissingParameterError);
}(FilesError);
errorClasses.MissingParameterError = MissingParameterError;
var NotImplementedError = exports.NotImplementedError = /*#__PURE__*/function (_FilesError6) {
  function NotImplementedError(message) {
    var _this7;
    (0, _classCallCheck2.default)(this, NotImplementedError);
    _this7 = _callSuper(this, NotImplementedError, [message]);
    _this7.name = 'NotImplementedError';
    return _this7;
  }
  (0, _inherits2.default)(NotImplementedError, _FilesError6);
  return (0, _createClass2.default)(NotImplementedError);
}(FilesError);
errorClasses.NotImplementedError = NotImplementedError;

// api error groups
var BadRequestError = exports.BadRequestError = /*#__PURE__*/function (_FilesApiError) {
  function BadRequestError(message, code, errorData) {
    var _this8;
    (0, _classCallCheck2.default)(this, BadRequestError);
    _this8 = _callSuper(this, BadRequestError, [message, code, errorData]);
    _this8.name = 'BadRequestError';
    return _this8;
  }
  (0, _inherits2.default)(BadRequestError, _FilesApiError);
  return (0, _createClass2.default)(BadRequestError);
}(FilesApiError);
errorClasses.BadRequestError = BadRequestError;
var NotAuthenticatedError = exports.NotAuthenticatedError = /*#__PURE__*/function (_FilesApiError2) {
  function NotAuthenticatedError(message, code, errorData) {
    var _this9;
    (0, _classCallCheck2.default)(this, NotAuthenticatedError);
    _this9 = _callSuper(this, NotAuthenticatedError, [message, code, errorData]);
    _this9.name = 'NotAuthenticatedError';
    return _this9;
  }
  (0, _inherits2.default)(NotAuthenticatedError, _FilesApiError2);
  return (0, _createClass2.default)(NotAuthenticatedError);
}(FilesApiError);
errorClasses.NotAuthenticatedError = NotAuthenticatedError;
var NotAuthorizedError = exports.NotAuthorizedError = /*#__PURE__*/function (_FilesApiError3) {
  function NotAuthorizedError(message, code, errorData) {
    var _this10;
    (0, _classCallCheck2.default)(this, NotAuthorizedError);
    _this10 = _callSuper(this, NotAuthorizedError, [message, code, errorData]);
    _this10.name = 'NotAuthorizedError';
    return _this10;
  }
  (0, _inherits2.default)(NotAuthorizedError, _FilesApiError3);
  return (0, _createClass2.default)(NotAuthorizedError);
}(FilesApiError);
errorClasses.NotAuthorizedError = NotAuthorizedError;
var NotFoundError = exports.NotFoundError = /*#__PURE__*/function (_FilesApiError4) {
  function NotFoundError(message, code, errorData) {
    var _this11;
    (0, _classCallCheck2.default)(this, NotFoundError);
    _this11 = _callSuper(this, NotFoundError, [message, code, errorData]);
    _this11.name = 'NotFoundError';
    return _this11;
  }
  (0, _inherits2.default)(NotFoundError, _FilesApiError4);
  return (0, _createClass2.default)(NotFoundError);
}(FilesApiError);
errorClasses.NotFoundError = NotFoundError;
var ProcessingFailureError = exports.ProcessingFailureError = /*#__PURE__*/function (_FilesApiError5) {
  function ProcessingFailureError(message, code, errorData) {
    var _this12;
    (0, _classCallCheck2.default)(this, ProcessingFailureError);
    _this12 = _callSuper(this, ProcessingFailureError, [message, code, errorData]);
    _this12.name = 'ProcessingFailureError';
    return _this12;
  }
  (0, _inherits2.default)(ProcessingFailureError, _FilesApiError5);
  return (0, _createClass2.default)(ProcessingFailureError);
}(FilesApiError);
errorClasses.ProcessingFailureError = ProcessingFailureError;
var RateLimitedError = exports.RateLimitedError = /*#__PURE__*/function (_FilesApiError6) {
  function RateLimitedError(message, code, errorData) {
    var _this13;
    (0, _classCallCheck2.default)(this, RateLimitedError);
    _this13 = _callSuper(this, RateLimitedError, [message, code, errorData]);
    _this13.name = 'RateLimitedError';
    return _this13;
  }
  (0, _inherits2.default)(RateLimitedError, _FilesApiError6);
  return (0, _createClass2.default)(RateLimitedError);
}(FilesApiError);
errorClasses.RateLimitedError = RateLimitedError;
var ServiceUnavailableError = exports.ServiceUnavailableError = /*#__PURE__*/function (_FilesApiError7) {
  function ServiceUnavailableError(message, code, errorData) {
    var _this14;
    (0, _classCallCheck2.default)(this, ServiceUnavailableError);
    _this14 = _callSuper(this, ServiceUnavailableError, [message, code, errorData]);
    _this14.name = 'ServiceUnavailableError';
    return _this14;
  }
  (0, _inherits2.default)(ServiceUnavailableError, _FilesApiError7);
  return (0, _createClass2.default)(ServiceUnavailableError);
}(FilesApiError);
errorClasses.ServiceUnavailableError = ServiceUnavailableError;
var SiteConfigurationError = exports.SiteConfigurationError = /*#__PURE__*/function (_FilesApiError8) {
  function SiteConfigurationError(message, code, errorData) {
    var _this15;
    (0, _classCallCheck2.default)(this, SiteConfigurationError);
    _this15 = _callSuper(this, SiteConfigurationError, [message, code, errorData]);
    _this15.name = 'SiteConfigurationError';
    return _this15;
  }
  (0, _inherits2.default)(SiteConfigurationError, _FilesApiError8);
  return (0, _createClass2.default)(SiteConfigurationError);
}(FilesApiError);
errorClasses.SiteConfigurationError = SiteConfigurationError;

// grouped api errors
var BadRequest_AgentUpgradeRequiredError = exports.BadRequest_AgentUpgradeRequiredError = /*#__PURE__*/function (_BadRequestError) {
  function BadRequest_AgentUpgradeRequiredError(message, code, errorData) {
    var _this16;
    (0, _classCallCheck2.default)(this, BadRequest_AgentUpgradeRequiredError);
    _this16 = _callSuper(this, BadRequest_AgentUpgradeRequiredError, [message, code, errorData]);
    _this16.name = 'BadRequest_AgentUpgradeRequiredError';
    return _this16;
  }
  (0, _inherits2.default)(BadRequest_AgentUpgradeRequiredError, _BadRequestError);
  return (0, _createClass2.default)(BadRequest_AgentUpgradeRequiredError);
}(BadRequestError);
errorClasses.BadRequest_AgentUpgradeRequiredError = BadRequest_AgentUpgradeRequiredError;
var BadRequest_AttachmentTooLargeError = exports.BadRequest_AttachmentTooLargeError = /*#__PURE__*/function (_BadRequestError2) {
  function BadRequest_AttachmentTooLargeError(message, code, errorData) {
    var _this17;
    (0, _classCallCheck2.default)(this, BadRequest_AttachmentTooLargeError);
    _this17 = _callSuper(this, BadRequest_AttachmentTooLargeError, [message, code, errorData]);
    _this17.name = 'BadRequest_AttachmentTooLargeError';
    return _this17;
  }
  (0, _inherits2.default)(BadRequest_AttachmentTooLargeError, _BadRequestError2);
  return (0, _createClass2.default)(BadRequest_AttachmentTooLargeError);
}(BadRequestError);
errorClasses.BadRequest_AttachmentTooLargeError = BadRequest_AttachmentTooLargeError;
var BadRequest_CannotDownloadDirectoryError = exports.BadRequest_CannotDownloadDirectoryError = /*#__PURE__*/function (_BadRequestError3) {
  function BadRequest_CannotDownloadDirectoryError(message, code, errorData) {
    var _this18;
    (0, _classCallCheck2.default)(this, BadRequest_CannotDownloadDirectoryError);
    _this18 = _callSuper(this, BadRequest_CannotDownloadDirectoryError, [message, code, errorData]);
    _this18.name = 'BadRequest_CannotDownloadDirectoryError';
    return _this18;
  }
  (0, _inherits2.default)(BadRequest_CannotDownloadDirectoryError, _BadRequestError3);
  return (0, _createClass2.default)(BadRequest_CannotDownloadDirectoryError);
}(BadRequestError);
errorClasses.BadRequest_CannotDownloadDirectoryError = BadRequest_CannotDownloadDirectoryError;
var BadRequest_CantMoveWithMultipleLocationsError = exports.BadRequest_CantMoveWithMultipleLocationsError = /*#__PURE__*/function (_BadRequestError4) {
  function BadRequest_CantMoveWithMultipleLocationsError(message, code, errorData) {
    var _this19;
    (0, _classCallCheck2.default)(this, BadRequest_CantMoveWithMultipleLocationsError);
    _this19 = _callSuper(this, BadRequest_CantMoveWithMultipleLocationsError, [message, code, errorData]);
    _this19.name = 'BadRequest_CantMoveWithMultipleLocationsError';
    return _this19;
  }
  (0, _inherits2.default)(BadRequest_CantMoveWithMultipleLocationsError, _BadRequestError4);
  return (0, _createClass2.default)(BadRequest_CantMoveWithMultipleLocationsError);
}(BadRequestError);
errorClasses.BadRequest_CantMoveWithMultipleLocationsError = BadRequest_CantMoveWithMultipleLocationsError;
var BadRequest_DatetimeParseError = exports.BadRequest_DatetimeParseError = /*#__PURE__*/function (_BadRequestError5) {
  function BadRequest_DatetimeParseError(message, code, errorData) {
    var _this20;
    (0, _classCallCheck2.default)(this, BadRequest_DatetimeParseError);
    _this20 = _callSuper(this, BadRequest_DatetimeParseError, [message, code, errorData]);
    _this20.name = 'BadRequest_DatetimeParseError';
    return _this20;
  }
  (0, _inherits2.default)(BadRequest_DatetimeParseError, _BadRequestError5);
  return (0, _createClass2.default)(BadRequest_DatetimeParseError);
}(BadRequestError);
errorClasses.BadRequest_DatetimeParseError = BadRequest_DatetimeParseError;
var BadRequest_DestinationSameError = exports.BadRequest_DestinationSameError = /*#__PURE__*/function (_BadRequestError6) {
  function BadRequest_DestinationSameError(message, code, errorData) {
    var _this21;
    (0, _classCallCheck2.default)(this, BadRequest_DestinationSameError);
    _this21 = _callSuper(this, BadRequest_DestinationSameError, [message, code, errorData]);
    _this21.name = 'BadRequest_DestinationSameError';
    return _this21;
  }
  (0, _inherits2.default)(BadRequest_DestinationSameError, _BadRequestError6);
  return (0, _createClass2.default)(BadRequest_DestinationSameError);
}(BadRequestError);
errorClasses.BadRequest_DestinationSameError = BadRequest_DestinationSameError;
var BadRequest_FolderMustNotBeAFileError = exports.BadRequest_FolderMustNotBeAFileError = /*#__PURE__*/function (_BadRequestError7) {
  function BadRequest_FolderMustNotBeAFileError(message, code, errorData) {
    var _this22;
    (0, _classCallCheck2.default)(this, BadRequest_FolderMustNotBeAFileError);
    _this22 = _callSuper(this, BadRequest_FolderMustNotBeAFileError, [message, code, errorData]);
    _this22.name = 'BadRequest_FolderMustNotBeAFileError';
    return _this22;
  }
  (0, _inherits2.default)(BadRequest_FolderMustNotBeAFileError, _BadRequestError7);
  return (0, _createClass2.default)(BadRequest_FolderMustNotBeAFileError);
}(BadRequestError);
errorClasses.BadRequest_FolderMustNotBeAFileError = BadRequest_FolderMustNotBeAFileError;
var BadRequest_InvalidBodyError = exports.BadRequest_InvalidBodyError = /*#__PURE__*/function (_BadRequestError8) {
  function BadRequest_InvalidBodyError(message, code, errorData) {
    var _this23;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidBodyError);
    _this23 = _callSuper(this, BadRequest_InvalidBodyError, [message, code, errorData]);
    _this23.name = 'BadRequest_InvalidBodyError';
    return _this23;
  }
  (0, _inherits2.default)(BadRequest_InvalidBodyError, _BadRequestError8);
  return (0, _createClass2.default)(BadRequest_InvalidBodyError);
}(BadRequestError);
errorClasses.BadRequest_InvalidBodyError = BadRequest_InvalidBodyError;
var BadRequest_InvalidCursorError = exports.BadRequest_InvalidCursorError = /*#__PURE__*/function (_BadRequestError9) {
  function BadRequest_InvalidCursorError(message, code, errorData) {
    var _this24;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidCursorError);
    _this24 = _callSuper(this, BadRequest_InvalidCursorError, [message, code, errorData]);
    _this24.name = 'BadRequest_InvalidCursorError';
    return _this24;
  }
  (0, _inherits2.default)(BadRequest_InvalidCursorError, _BadRequestError9);
  return (0, _createClass2.default)(BadRequest_InvalidCursorError);
}(BadRequestError);
errorClasses.BadRequest_InvalidCursorError = BadRequest_InvalidCursorError;
var BadRequest_InvalidCursorTypeForSortError = exports.BadRequest_InvalidCursorTypeForSortError = /*#__PURE__*/function (_BadRequestError10) {
  function BadRequest_InvalidCursorTypeForSortError(message, code, errorData) {
    var _this25;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidCursorTypeForSortError);
    _this25 = _callSuper(this, BadRequest_InvalidCursorTypeForSortError, [message, code, errorData]);
    _this25.name = 'BadRequest_InvalidCursorTypeForSortError';
    return _this25;
  }
  (0, _inherits2.default)(BadRequest_InvalidCursorTypeForSortError, _BadRequestError10);
  return (0, _createClass2.default)(BadRequest_InvalidCursorTypeForSortError);
}(BadRequestError);
errorClasses.BadRequest_InvalidCursorTypeForSortError = BadRequest_InvalidCursorTypeForSortError;
var BadRequest_InvalidEtagsError = exports.BadRequest_InvalidEtagsError = /*#__PURE__*/function (_BadRequestError11) {
  function BadRequest_InvalidEtagsError(message, code, errorData) {
    var _this26;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidEtagsError);
    _this26 = _callSuper(this, BadRequest_InvalidEtagsError, [message, code, errorData]);
    _this26.name = 'BadRequest_InvalidEtagsError';
    return _this26;
  }
  (0, _inherits2.default)(BadRequest_InvalidEtagsError, _BadRequestError11);
  return (0, _createClass2.default)(BadRequest_InvalidEtagsError);
}(BadRequestError);
errorClasses.BadRequest_InvalidEtagsError = BadRequest_InvalidEtagsError;
var BadRequest_InvalidFilterAliasCombinationError = exports.BadRequest_InvalidFilterAliasCombinationError = /*#__PURE__*/function (_BadRequestError12) {
  function BadRequest_InvalidFilterAliasCombinationError(message, code, errorData) {
    var _this27;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterAliasCombinationError);
    _this27 = _callSuper(this, BadRequest_InvalidFilterAliasCombinationError, [message, code, errorData]);
    _this27.name = 'BadRequest_InvalidFilterAliasCombinationError';
    return _this27;
  }
  (0, _inherits2.default)(BadRequest_InvalidFilterAliasCombinationError, _BadRequestError12);
  return (0, _createClass2.default)(BadRequest_InvalidFilterAliasCombinationError);
}(BadRequestError);
errorClasses.BadRequest_InvalidFilterAliasCombinationError = BadRequest_InvalidFilterAliasCombinationError;
var BadRequest_InvalidFilterCombinationError = exports.BadRequest_InvalidFilterCombinationError = /*#__PURE__*/function (_BadRequestError13) {
  function BadRequest_InvalidFilterCombinationError(message, code, errorData) {
    var _this28;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterCombinationError);
    _this28 = _callSuper(this, BadRequest_InvalidFilterCombinationError, [message, code, errorData]);
    _this28.name = 'BadRequest_InvalidFilterCombinationError';
    return _this28;
  }
  (0, _inherits2.default)(BadRequest_InvalidFilterCombinationError, _BadRequestError13);
  return (0, _createClass2.default)(BadRequest_InvalidFilterCombinationError);
}(BadRequestError);
errorClasses.BadRequest_InvalidFilterCombinationError = BadRequest_InvalidFilterCombinationError;
var BadRequest_InvalidFilterFieldError = exports.BadRequest_InvalidFilterFieldError = /*#__PURE__*/function (_BadRequestError14) {
  function BadRequest_InvalidFilterFieldError(message, code, errorData) {
    var _this29;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterFieldError);
    _this29 = _callSuper(this, BadRequest_InvalidFilterFieldError, [message, code, errorData]);
    _this29.name = 'BadRequest_InvalidFilterFieldError';
    return _this29;
  }
  (0, _inherits2.default)(BadRequest_InvalidFilterFieldError, _BadRequestError14);
  return (0, _createClass2.default)(BadRequest_InvalidFilterFieldError);
}(BadRequestError);
errorClasses.BadRequest_InvalidFilterFieldError = BadRequest_InvalidFilterFieldError;
var BadRequest_InvalidFilterParamError = exports.BadRequest_InvalidFilterParamError = /*#__PURE__*/function (_BadRequestError15) {
  function BadRequest_InvalidFilterParamError(message, code, errorData) {
    var _this30;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterParamError);
    _this30 = _callSuper(this, BadRequest_InvalidFilterParamError, [message, code, errorData]);
    _this30.name = 'BadRequest_InvalidFilterParamError';
    return _this30;
  }
  (0, _inherits2.default)(BadRequest_InvalidFilterParamError, _BadRequestError15);
  return (0, _createClass2.default)(BadRequest_InvalidFilterParamError);
}(BadRequestError);
errorClasses.BadRequest_InvalidFilterParamError = BadRequest_InvalidFilterParamError;
var BadRequest_InvalidFilterParamValueError = exports.BadRequest_InvalidFilterParamValueError = /*#__PURE__*/function (_BadRequestError16) {
  function BadRequest_InvalidFilterParamValueError(message, code, errorData) {
    var _this31;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidFilterParamValueError);
    _this31 = _callSuper(this, BadRequest_InvalidFilterParamValueError, [message, code, errorData]);
    _this31.name = 'BadRequest_InvalidFilterParamValueError';
    return _this31;
  }
  (0, _inherits2.default)(BadRequest_InvalidFilterParamValueError, _BadRequestError16);
  return (0, _createClass2.default)(BadRequest_InvalidFilterParamValueError);
}(BadRequestError);
errorClasses.BadRequest_InvalidFilterParamValueError = BadRequest_InvalidFilterParamValueError;
var BadRequest_InvalidInputEncodingError = exports.BadRequest_InvalidInputEncodingError = /*#__PURE__*/function (_BadRequestError17) {
  function BadRequest_InvalidInputEncodingError(message, code, errorData) {
    var _this32;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidInputEncodingError);
    _this32 = _callSuper(this, BadRequest_InvalidInputEncodingError, [message, code, errorData]);
    _this32.name = 'BadRequest_InvalidInputEncodingError';
    return _this32;
  }
  (0, _inherits2.default)(BadRequest_InvalidInputEncodingError, _BadRequestError17);
  return (0, _createClass2.default)(BadRequest_InvalidInputEncodingError);
}(BadRequestError);
errorClasses.BadRequest_InvalidInputEncodingError = BadRequest_InvalidInputEncodingError;
var BadRequest_InvalidInterfaceError = exports.BadRequest_InvalidInterfaceError = /*#__PURE__*/function (_BadRequestError18) {
  function BadRequest_InvalidInterfaceError(message, code, errorData) {
    var _this33;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidInterfaceError);
    _this33 = _callSuper(this, BadRequest_InvalidInterfaceError, [message, code, errorData]);
    _this33.name = 'BadRequest_InvalidInterfaceError';
    return _this33;
  }
  (0, _inherits2.default)(BadRequest_InvalidInterfaceError, _BadRequestError18);
  return (0, _createClass2.default)(BadRequest_InvalidInterfaceError);
}(BadRequestError);
errorClasses.BadRequest_InvalidInterfaceError = BadRequest_InvalidInterfaceError;
var BadRequest_InvalidOauthProviderError = exports.BadRequest_InvalidOauthProviderError = /*#__PURE__*/function (_BadRequestError19) {
  function BadRequest_InvalidOauthProviderError(message, code, errorData) {
    var _this34;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidOauthProviderError);
    _this34 = _callSuper(this, BadRequest_InvalidOauthProviderError, [message, code, errorData]);
    _this34.name = 'BadRequest_InvalidOauthProviderError';
    return _this34;
  }
  (0, _inherits2.default)(BadRequest_InvalidOauthProviderError, _BadRequestError19);
  return (0, _createClass2.default)(BadRequest_InvalidOauthProviderError);
}(BadRequestError);
errorClasses.BadRequest_InvalidOauthProviderError = BadRequest_InvalidOauthProviderError;
var BadRequest_InvalidPathError = exports.BadRequest_InvalidPathError = /*#__PURE__*/function (_BadRequestError20) {
  function BadRequest_InvalidPathError(message, code, errorData) {
    var _this35;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidPathError);
    _this35 = _callSuper(this, BadRequest_InvalidPathError, [message, code, errorData]);
    _this35.name = 'BadRequest_InvalidPathError';
    return _this35;
  }
  (0, _inherits2.default)(BadRequest_InvalidPathError, _BadRequestError20);
  return (0, _createClass2.default)(BadRequest_InvalidPathError);
}(BadRequestError);
errorClasses.BadRequest_InvalidPathError = BadRequest_InvalidPathError;
var BadRequest_InvalidReturnToUrlError = exports.BadRequest_InvalidReturnToUrlError = /*#__PURE__*/function (_BadRequestError21) {
  function BadRequest_InvalidReturnToUrlError(message, code, errorData) {
    var _this36;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidReturnToUrlError);
    _this36 = _callSuper(this, BadRequest_InvalidReturnToUrlError, [message, code, errorData]);
    _this36.name = 'BadRequest_InvalidReturnToUrlError';
    return _this36;
  }
  (0, _inherits2.default)(BadRequest_InvalidReturnToUrlError, _BadRequestError21);
  return (0, _createClass2.default)(BadRequest_InvalidReturnToUrlError);
}(BadRequestError);
errorClasses.BadRequest_InvalidReturnToUrlError = BadRequest_InvalidReturnToUrlError;
var BadRequest_InvalidUploadOffsetError = exports.BadRequest_InvalidUploadOffsetError = /*#__PURE__*/function (_BadRequestError22) {
  function BadRequest_InvalidUploadOffsetError(message, code, errorData) {
    var _this37;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidUploadOffsetError);
    _this37 = _callSuper(this, BadRequest_InvalidUploadOffsetError, [message, code, errorData]);
    _this37.name = 'BadRequest_InvalidUploadOffsetError';
    return _this37;
  }
  (0, _inherits2.default)(BadRequest_InvalidUploadOffsetError, _BadRequestError22);
  return (0, _createClass2.default)(BadRequest_InvalidUploadOffsetError);
}(BadRequestError);
errorClasses.BadRequest_InvalidUploadOffsetError = BadRequest_InvalidUploadOffsetError;
var BadRequest_InvalidUploadPartGapError = exports.BadRequest_InvalidUploadPartGapError = /*#__PURE__*/function (_BadRequestError23) {
  function BadRequest_InvalidUploadPartGapError(message, code, errorData) {
    var _this38;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidUploadPartGapError);
    _this38 = _callSuper(this, BadRequest_InvalidUploadPartGapError, [message, code, errorData]);
    _this38.name = 'BadRequest_InvalidUploadPartGapError';
    return _this38;
  }
  (0, _inherits2.default)(BadRequest_InvalidUploadPartGapError, _BadRequestError23);
  return (0, _createClass2.default)(BadRequest_InvalidUploadPartGapError);
}(BadRequestError);
errorClasses.BadRequest_InvalidUploadPartGapError = BadRequest_InvalidUploadPartGapError;
var BadRequest_InvalidUploadPartSizeError = exports.BadRequest_InvalidUploadPartSizeError = /*#__PURE__*/function (_BadRequestError24) {
  function BadRequest_InvalidUploadPartSizeError(message, code, errorData) {
    var _this39;
    (0, _classCallCheck2.default)(this, BadRequest_InvalidUploadPartSizeError);
    _this39 = _callSuper(this, BadRequest_InvalidUploadPartSizeError, [message, code, errorData]);
    _this39.name = 'BadRequest_InvalidUploadPartSizeError';
    return _this39;
  }
  (0, _inherits2.default)(BadRequest_InvalidUploadPartSizeError, _BadRequestError24);
  return (0, _createClass2.default)(BadRequest_InvalidUploadPartSizeError);
}(BadRequestError);
errorClasses.BadRequest_InvalidUploadPartSizeError = BadRequest_InvalidUploadPartSizeError;
var BadRequest_MethodNotAllowedError = exports.BadRequest_MethodNotAllowedError = /*#__PURE__*/function (_BadRequestError25) {
  function BadRequest_MethodNotAllowedError(message, code, errorData) {
    var _this40;
    (0, _classCallCheck2.default)(this, BadRequest_MethodNotAllowedError);
    _this40 = _callSuper(this, BadRequest_MethodNotAllowedError, [message, code, errorData]);
    _this40.name = 'BadRequest_MethodNotAllowedError';
    return _this40;
  }
  (0, _inherits2.default)(BadRequest_MethodNotAllowedError, _BadRequestError25);
  return (0, _createClass2.default)(BadRequest_MethodNotAllowedError);
}(BadRequestError);
errorClasses.BadRequest_MethodNotAllowedError = BadRequest_MethodNotAllowedError;
var BadRequest_NoValidInputParamsError = exports.BadRequest_NoValidInputParamsError = /*#__PURE__*/function (_BadRequestError26) {
  function BadRequest_NoValidInputParamsError(message, code, errorData) {
    var _this41;
    (0, _classCallCheck2.default)(this, BadRequest_NoValidInputParamsError);
    _this41 = _callSuper(this, BadRequest_NoValidInputParamsError, [message, code, errorData]);
    _this41.name = 'BadRequest_NoValidInputParamsError';
    return _this41;
  }
  (0, _inherits2.default)(BadRequest_NoValidInputParamsError, _BadRequestError26);
  return (0, _createClass2.default)(BadRequest_NoValidInputParamsError);
}(BadRequestError);
errorClasses.BadRequest_NoValidInputParamsError = BadRequest_NoValidInputParamsError;
var BadRequest_OperationOnNonScimResourceError = exports.BadRequest_OperationOnNonScimResourceError = /*#__PURE__*/function (_BadRequestError27) {
  function BadRequest_OperationOnNonScimResourceError(message, code, errorData) {
    var _this42;
    (0, _classCallCheck2.default)(this, BadRequest_OperationOnNonScimResourceError);
    _this42 = _callSuper(this, BadRequest_OperationOnNonScimResourceError, [message, code, errorData]);
    _this42.name = 'BadRequest_OperationOnNonScimResourceError';
    return _this42;
  }
  (0, _inherits2.default)(BadRequest_OperationOnNonScimResourceError, _BadRequestError27);
  return (0, _createClass2.default)(BadRequest_OperationOnNonScimResourceError);
}(BadRequestError);
errorClasses.BadRequest_OperationOnNonScimResourceError = BadRequest_OperationOnNonScimResourceError;
var BadRequest_PartNumberTooLargeError = exports.BadRequest_PartNumberTooLargeError = /*#__PURE__*/function (_BadRequestError28) {
  function BadRequest_PartNumberTooLargeError(message, code, errorData) {
    var _this43;
    (0, _classCallCheck2.default)(this, BadRequest_PartNumberTooLargeError);
    _this43 = _callSuper(this, BadRequest_PartNumberTooLargeError, [message, code, errorData]);
    _this43.name = 'BadRequest_PartNumberTooLargeError';
    return _this43;
  }
  (0, _inherits2.default)(BadRequest_PartNumberTooLargeError, _BadRequestError28);
  return (0, _createClass2.default)(BadRequest_PartNumberTooLargeError);
}(BadRequestError);
errorClasses.BadRequest_PartNumberTooLargeError = BadRequest_PartNumberTooLargeError;
var BadRequest_ReauthenticationNeededFieldsError = exports.BadRequest_ReauthenticationNeededFieldsError = /*#__PURE__*/function (_BadRequestError29) {
  function BadRequest_ReauthenticationNeededFieldsError(message, code, errorData) {
    var _this44;
    (0, _classCallCheck2.default)(this, BadRequest_ReauthenticationNeededFieldsError);
    _this44 = _callSuper(this, BadRequest_ReauthenticationNeededFieldsError, [message, code, errorData]);
    _this44.name = 'BadRequest_ReauthenticationNeededFieldsError';
    return _this44;
  }
  (0, _inherits2.default)(BadRequest_ReauthenticationNeededFieldsError, _BadRequestError29);
  return (0, _createClass2.default)(BadRequest_ReauthenticationNeededFieldsError);
}(BadRequestError);
errorClasses.BadRequest_ReauthenticationNeededFieldsError = BadRequest_ReauthenticationNeededFieldsError;
var BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = exports.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = /*#__PURE__*/function (_BadRequestError30) {
  function BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError(message, code, errorData) {
    var _this45;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError);
    _this45 = _callSuper(this, BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError, [message, code, errorData]);
    _this45.name = 'BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError';
    return _this45;
  }
  (0, _inherits2.default)(BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError, _BadRequestError30);
  return (0, _createClass2.default)(BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError);
}(BadRequestError);
errorClasses.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError;
var BadRequest_RequestParamsContainInvalidCharacterError = exports.BadRequest_RequestParamsContainInvalidCharacterError = /*#__PURE__*/function (_BadRequestError31) {
  function BadRequest_RequestParamsContainInvalidCharacterError(message, code, errorData) {
    var _this46;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamsContainInvalidCharacterError);
    _this46 = _callSuper(this, BadRequest_RequestParamsContainInvalidCharacterError, [message, code, errorData]);
    _this46.name = 'BadRequest_RequestParamsContainInvalidCharacterError';
    return _this46;
  }
  (0, _inherits2.default)(BadRequest_RequestParamsContainInvalidCharacterError, _BadRequestError31);
  return (0, _createClass2.default)(BadRequest_RequestParamsContainInvalidCharacterError);
}(BadRequestError);
errorClasses.BadRequest_RequestParamsContainInvalidCharacterError = BadRequest_RequestParamsContainInvalidCharacterError;
var BadRequest_RequestParamsInvalidError = exports.BadRequest_RequestParamsInvalidError = /*#__PURE__*/function (_BadRequestError32) {
  function BadRequest_RequestParamsInvalidError(message, code, errorData) {
    var _this47;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamsInvalidError);
    _this47 = _callSuper(this, BadRequest_RequestParamsInvalidError, [message, code, errorData]);
    _this47.name = 'BadRequest_RequestParamsInvalidError';
    return _this47;
  }
  (0, _inherits2.default)(BadRequest_RequestParamsInvalidError, _BadRequestError32);
  return (0, _createClass2.default)(BadRequest_RequestParamsInvalidError);
}(BadRequestError);
errorClasses.BadRequest_RequestParamsInvalidError = BadRequest_RequestParamsInvalidError;
var BadRequest_RequestParamsRequiredError = exports.BadRequest_RequestParamsRequiredError = /*#__PURE__*/function (_BadRequestError33) {
  function BadRequest_RequestParamsRequiredError(message, code, errorData) {
    var _this48;
    (0, _classCallCheck2.default)(this, BadRequest_RequestParamsRequiredError);
    _this48 = _callSuper(this, BadRequest_RequestParamsRequiredError, [message, code, errorData]);
    _this48.name = 'BadRequest_RequestParamsRequiredError';
    return _this48;
  }
  (0, _inherits2.default)(BadRequest_RequestParamsRequiredError, _BadRequestError33);
  return (0, _createClass2.default)(BadRequest_RequestParamsRequiredError);
}(BadRequestError);
errorClasses.BadRequest_RequestParamsRequiredError = BadRequest_RequestParamsRequiredError;
var BadRequest_SearchAllOnChildPathError = exports.BadRequest_SearchAllOnChildPathError = /*#__PURE__*/function (_BadRequestError34) {
  function BadRequest_SearchAllOnChildPathError(message, code, errorData) {
    var _this49;
    (0, _classCallCheck2.default)(this, BadRequest_SearchAllOnChildPathError);
    _this49 = _callSuper(this, BadRequest_SearchAllOnChildPathError, [message, code, errorData]);
    _this49.name = 'BadRequest_SearchAllOnChildPathError';
    return _this49;
  }
  (0, _inherits2.default)(BadRequest_SearchAllOnChildPathError, _BadRequestError34);
  return (0, _createClass2.default)(BadRequest_SearchAllOnChildPathError);
}(BadRequestError);
errorClasses.BadRequest_SearchAllOnChildPathError = BadRequest_SearchAllOnChildPathError;
var BadRequest_UnsupportedCurrencyError = exports.BadRequest_UnsupportedCurrencyError = /*#__PURE__*/function (_BadRequestError35) {
  function BadRequest_UnsupportedCurrencyError(message, code, errorData) {
    var _this50;
    (0, _classCallCheck2.default)(this, BadRequest_UnsupportedCurrencyError);
    _this50 = _callSuper(this, BadRequest_UnsupportedCurrencyError, [message, code, errorData]);
    _this50.name = 'BadRequest_UnsupportedCurrencyError';
    return _this50;
  }
  (0, _inherits2.default)(BadRequest_UnsupportedCurrencyError, _BadRequestError35);
  return (0, _createClass2.default)(BadRequest_UnsupportedCurrencyError);
}(BadRequestError);
errorClasses.BadRequest_UnsupportedCurrencyError = BadRequest_UnsupportedCurrencyError;
var BadRequest_UnsupportedHttpResponseFormatError = exports.BadRequest_UnsupportedHttpResponseFormatError = /*#__PURE__*/function (_BadRequestError36) {
  function BadRequest_UnsupportedHttpResponseFormatError(message, code, errorData) {
    var _this51;
    (0, _classCallCheck2.default)(this, BadRequest_UnsupportedHttpResponseFormatError);
    _this51 = _callSuper(this, BadRequest_UnsupportedHttpResponseFormatError, [message, code, errorData]);
    _this51.name = 'BadRequest_UnsupportedHttpResponseFormatError';
    return _this51;
  }
  (0, _inherits2.default)(BadRequest_UnsupportedHttpResponseFormatError, _BadRequestError36);
  return (0, _createClass2.default)(BadRequest_UnsupportedHttpResponseFormatError);
}(BadRequestError);
errorClasses.BadRequest_UnsupportedHttpResponseFormatError = BadRequest_UnsupportedHttpResponseFormatError;
var BadRequest_UnsupportedMediaTypeError = exports.BadRequest_UnsupportedMediaTypeError = /*#__PURE__*/function (_BadRequestError37) {
  function BadRequest_UnsupportedMediaTypeError(message, code, errorData) {
    var _this52;
    (0, _classCallCheck2.default)(this, BadRequest_UnsupportedMediaTypeError);
    _this52 = _callSuper(this, BadRequest_UnsupportedMediaTypeError, [message, code, errorData]);
    _this52.name = 'BadRequest_UnsupportedMediaTypeError';
    return _this52;
  }
  (0, _inherits2.default)(BadRequest_UnsupportedMediaTypeError, _BadRequestError37);
  return (0, _createClass2.default)(BadRequest_UnsupportedMediaTypeError);
}(BadRequestError);
errorClasses.BadRequest_UnsupportedMediaTypeError = BadRequest_UnsupportedMediaTypeError;
var BadRequest_UserIdInvalidError = exports.BadRequest_UserIdInvalidError = /*#__PURE__*/function (_BadRequestError38) {
  function BadRequest_UserIdInvalidError(message, code, errorData) {
    var _this53;
    (0, _classCallCheck2.default)(this, BadRequest_UserIdInvalidError);
    _this53 = _callSuper(this, BadRequest_UserIdInvalidError, [message, code, errorData]);
    _this53.name = 'BadRequest_UserIdInvalidError';
    return _this53;
  }
  (0, _inherits2.default)(BadRequest_UserIdInvalidError, _BadRequestError38);
  return (0, _createClass2.default)(BadRequest_UserIdInvalidError);
}(BadRequestError);
errorClasses.BadRequest_UserIdInvalidError = BadRequest_UserIdInvalidError;
var BadRequest_UserIdOnUserEndpointError = exports.BadRequest_UserIdOnUserEndpointError = /*#__PURE__*/function (_BadRequestError39) {
  function BadRequest_UserIdOnUserEndpointError(message, code, errorData) {
    var _this54;
    (0, _classCallCheck2.default)(this, BadRequest_UserIdOnUserEndpointError);
    _this54 = _callSuper(this, BadRequest_UserIdOnUserEndpointError, [message, code, errorData]);
    _this54.name = 'BadRequest_UserIdOnUserEndpointError';
    return _this54;
  }
  (0, _inherits2.default)(BadRequest_UserIdOnUserEndpointError, _BadRequestError39);
  return (0, _createClass2.default)(BadRequest_UserIdOnUserEndpointError);
}(BadRequestError);
errorClasses.BadRequest_UserIdOnUserEndpointError = BadRequest_UserIdOnUserEndpointError;
var BadRequest_UserRequiredError = exports.BadRequest_UserRequiredError = /*#__PURE__*/function (_BadRequestError40) {
  function BadRequest_UserRequiredError(message, code, errorData) {
    var _this55;
    (0, _classCallCheck2.default)(this, BadRequest_UserRequiredError);
    _this55 = _callSuper(this, BadRequest_UserRequiredError, [message, code, errorData]);
    _this55.name = 'BadRequest_UserRequiredError';
    return _this55;
  }
  (0, _inherits2.default)(BadRequest_UserRequiredError, _BadRequestError40);
  return (0, _createClass2.default)(BadRequest_UserRequiredError);
}(BadRequestError);
errorClasses.BadRequest_UserRequiredError = BadRequest_UserRequiredError;
var NotAuthenticated_AuthenticationRequiredError = exports.NotAuthenticated_AuthenticationRequiredError = /*#__PURE__*/function (_NotAuthenticatedErro) {
  function NotAuthenticated_AuthenticationRequiredError(message, code, errorData) {
    var _this56;
    (0, _classCallCheck2.default)(this, NotAuthenticated_AuthenticationRequiredError);
    _this56 = _callSuper(this, NotAuthenticated_AuthenticationRequiredError, [message, code, errorData]);
    _this56.name = 'NotAuthenticated_AuthenticationRequiredError';
    return _this56;
  }
  (0, _inherits2.default)(NotAuthenticated_AuthenticationRequiredError, _NotAuthenticatedErro);
  return (0, _createClass2.default)(NotAuthenticated_AuthenticationRequiredError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_AuthenticationRequiredError = NotAuthenticated_AuthenticationRequiredError;
var NotAuthenticated_BundleRegistrationCodeFailedError = exports.NotAuthenticated_BundleRegistrationCodeFailedError = /*#__PURE__*/function (_NotAuthenticatedErro2) {
  function NotAuthenticated_BundleRegistrationCodeFailedError(message, code, errorData) {
    var _this57;
    (0, _classCallCheck2.default)(this, NotAuthenticated_BundleRegistrationCodeFailedError);
    _this57 = _callSuper(this, NotAuthenticated_BundleRegistrationCodeFailedError, [message, code, errorData]);
    _this57.name = 'NotAuthenticated_BundleRegistrationCodeFailedError';
    return _this57;
  }
  (0, _inherits2.default)(NotAuthenticated_BundleRegistrationCodeFailedError, _NotAuthenticatedErro2);
  return (0, _createClass2.default)(NotAuthenticated_BundleRegistrationCodeFailedError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_BundleRegistrationCodeFailedError = NotAuthenticated_BundleRegistrationCodeFailedError;
var NotAuthenticated_FilesAgentTokenFailedError = exports.NotAuthenticated_FilesAgentTokenFailedError = /*#__PURE__*/function (_NotAuthenticatedErro3) {
  function NotAuthenticated_FilesAgentTokenFailedError(message, code, errorData) {
    var _this58;
    (0, _classCallCheck2.default)(this, NotAuthenticated_FilesAgentTokenFailedError);
    _this58 = _callSuper(this, NotAuthenticated_FilesAgentTokenFailedError, [message, code, errorData]);
    _this58.name = 'NotAuthenticated_FilesAgentTokenFailedError';
    return _this58;
  }
  (0, _inherits2.default)(NotAuthenticated_FilesAgentTokenFailedError, _NotAuthenticatedErro3);
  return (0, _createClass2.default)(NotAuthenticated_FilesAgentTokenFailedError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_FilesAgentTokenFailedError = NotAuthenticated_FilesAgentTokenFailedError;
var NotAuthenticated_InboxRegistrationCodeFailedError = exports.NotAuthenticated_InboxRegistrationCodeFailedError = /*#__PURE__*/function (_NotAuthenticatedErro4) {
  function NotAuthenticated_InboxRegistrationCodeFailedError(message, code, errorData) {
    var _this59;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InboxRegistrationCodeFailedError);
    _this59 = _callSuper(this, NotAuthenticated_InboxRegistrationCodeFailedError, [message, code, errorData]);
    _this59.name = 'NotAuthenticated_InboxRegistrationCodeFailedError';
    return _this59;
  }
  (0, _inherits2.default)(NotAuthenticated_InboxRegistrationCodeFailedError, _NotAuthenticatedErro4);
  return (0, _createClass2.default)(NotAuthenticated_InboxRegistrationCodeFailedError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_InboxRegistrationCodeFailedError = NotAuthenticated_InboxRegistrationCodeFailedError;
var NotAuthenticated_InvalidCredentialsError = exports.NotAuthenticated_InvalidCredentialsError = /*#__PURE__*/function (_NotAuthenticatedErro5) {
  function NotAuthenticated_InvalidCredentialsError(message, code, errorData) {
    var _this60;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidCredentialsError);
    _this60 = _callSuper(this, NotAuthenticated_InvalidCredentialsError, [message, code, errorData]);
    _this60.name = 'NotAuthenticated_InvalidCredentialsError';
    return _this60;
  }
  (0, _inherits2.default)(NotAuthenticated_InvalidCredentialsError, _NotAuthenticatedErro5);
  return (0, _createClass2.default)(NotAuthenticated_InvalidCredentialsError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_InvalidCredentialsError = NotAuthenticated_InvalidCredentialsError;
var NotAuthenticated_InvalidOauthError = exports.NotAuthenticated_InvalidOauthError = /*#__PURE__*/function (_NotAuthenticatedErro6) {
  function NotAuthenticated_InvalidOauthError(message, code, errorData) {
    var _this61;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidOauthError);
    _this61 = _callSuper(this, NotAuthenticated_InvalidOauthError, [message, code, errorData]);
    _this61.name = 'NotAuthenticated_InvalidOauthError';
    return _this61;
  }
  (0, _inherits2.default)(NotAuthenticated_InvalidOauthError, _NotAuthenticatedErro6);
  return (0, _createClass2.default)(NotAuthenticated_InvalidOauthError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_InvalidOauthError = NotAuthenticated_InvalidOauthError;
var NotAuthenticated_InvalidOrExpiredCodeError = exports.NotAuthenticated_InvalidOrExpiredCodeError = /*#__PURE__*/function (_NotAuthenticatedErro7) {
  function NotAuthenticated_InvalidOrExpiredCodeError(message, code, errorData) {
    var _this62;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidOrExpiredCodeError);
    _this62 = _callSuper(this, NotAuthenticated_InvalidOrExpiredCodeError, [message, code, errorData]);
    _this62.name = 'NotAuthenticated_InvalidOrExpiredCodeError';
    return _this62;
  }
  (0, _inherits2.default)(NotAuthenticated_InvalidOrExpiredCodeError, _NotAuthenticatedErro7);
  return (0, _createClass2.default)(NotAuthenticated_InvalidOrExpiredCodeError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_InvalidOrExpiredCodeError = NotAuthenticated_InvalidOrExpiredCodeError;
var NotAuthenticated_InvalidUsernameOrPasswordError = exports.NotAuthenticated_InvalidUsernameOrPasswordError = /*#__PURE__*/function (_NotAuthenticatedErro8) {
  function NotAuthenticated_InvalidUsernameOrPasswordError(message, code, errorData) {
    var _this63;
    (0, _classCallCheck2.default)(this, NotAuthenticated_InvalidUsernameOrPasswordError);
    _this63 = _callSuper(this, NotAuthenticated_InvalidUsernameOrPasswordError, [message, code, errorData]);
    _this63.name = 'NotAuthenticated_InvalidUsernameOrPasswordError';
    return _this63;
  }
  (0, _inherits2.default)(NotAuthenticated_InvalidUsernameOrPasswordError, _NotAuthenticatedErro8);
  return (0, _createClass2.default)(NotAuthenticated_InvalidUsernameOrPasswordError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_InvalidUsernameOrPasswordError = NotAuthenticated_InvalidUsernameOrPasswordError;
var NotAuthenticated_LockedOutError = exports.NotAuthenticated_LockedOutError = /*#__PURE__*/function (_NotAuthenticatedErro9) {
  function NotAuthenticated_LockedOutError(message, code, errorData) {
    var _this64;
    (0, _classCallCheck2.default)(this, NotAuthenticated_LockedOutError);
    _this64 = _callSuper(this, NotAuthenticated_LockedOutError, [message, code, errorData]);
    _this64.name = 'NotAuthenticated_LockedOutError';
    return _this64;
  }
  (0, _inherits2.default)(NotAuthenticated_LockedOutError, _NotAuthenticatedErro9);
  return (0, _createClass2.default)(NotAuthenticated_LockedOutError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_LockedOutError = NotAuthenticated_LockedOutError;
var NotAuthenticated_LockoutRegionMismatchError = exports.NotAuthenticated_LockoutRegionMismatchError = /*#__PURE__*/function (_NotAuthenticatedErro10) {
  function NotAuthenticated_LockoutRegionMismatchError(message, code, errorData) {
    var _this65;
    (0, _classCallCheck2.default)(this, NotAuthenticated_LockoutRegionMismatchError);
    _this65 = _callSuper(this, NotAuthenticated_LockoutRegionMismatchError, [message, code, errorData]);
    _this65.name = 'NotAuthenticated_LockoutRegionMismatchError';
    return _this65;
  }
  (0, _inherits2.default)(NotAuthenticated_LockoutRegionMismatchError, _NotAuthenticatedErro10);
  return (0, _createClass2.default)(NotAuthenticated_LockoutRegionMismatchError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_LockoutRegionMismatchError = NotAuthenticated_LockoutRegionMismatchError;
var NotAuthenticated_OneTimePasswordIncorrectError = exports.NotAuthenticated_OneTimePasswordIncorrectError = /*#__PURE__*/function (_NotAuthenticatedErro11) {
  function NotAuthenticated_OneTimePasswordIncorrectError(message, code, errorData) {
    var _this66;
    (0, _classCallCheck2.default)(this, NotAuthenticated_OneTimePasswordIncorrectError);
    _this66 = _callSuper(this, NotAuthenticated_OneTimePasswordIncorrectError, [message, code, errorData]);
    _this66.name = 'NotAuthenticated_OneTimePasswordIncorrectError';
    return _this66;
  }
  (0, _inherits2.default)(NotAuthenticated_OneTimePasswordIncorrectError, _NotAuthenticatedErro11);
  return (0, _createClass2.default)(NotAuthenticated_OneTimePasswordIncorrectError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_OneTimePasswordIncorrectError = NotAuthenticated_OneTimePasswordIncorrectError;
var NotAuthenticated_TwoFactorAuthenticationErrorError = exports.NotAuthenticated_TwoFactorAuthenticationErrorError = /*#__PURE__*/function (_NotAuthenticatedErro12) {
  function NotAuthenticated_TwoFactorAuthenticationErrorError(message, code, errorData) {
    var _this67;
    (0, _classCallCheck2.default)(this, NotAuthenticated_TwoFactorAuthenticationErrorError);
    _this67 = _callSuper(this, NotAuthenticated_TwoFactorAuthenticationErrorError, [message, code, errorData]);
    _this67.name = 'NotAuthenticated_TwoFactorAuthenticationErrorError';
    return _this67;
  }
  (0, _inherits2.default)(NotAuthenticated_TwoFactorAuthenticationErrorError, _NotAuthenticatedErro12);
  return (0, _createClass2.default)(NotAuthenticated_TwoFactorAuthenticationErrorError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_TwoFactorAuthenticationErrorError = NotAuthenticated_TwoFactorAuthenticationErrorError;
var NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = exports.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = /*#__PURE__*/function (_NotAuthenticatedErro13) {
  function NotAuthenticated_TwoFactorAuthenticationSetupExpiredError(message, code, errorData) {
    var _this68;
    (0, _classCallCheck2.default)(this, NotAuthenticated_TwoFactorAuthenticationSetupExpiredError);
    _this68 = _callSuper(this, NotAuthenticated_TwoFactorAuthenticationSetupExpiredError, [message, code, errorData]);
    _this68.name = 'NotAuthenticated_TwoFactorAuthenticationSetupExpiredError';
    return _this68;
  }
  (0, _inherits2.default)(NotAuthenticated_TwoFactorAuthenticationSetupExpiredError, _NotAuthenticatedErro13);
  return (0, _createClass2.default)(NotAuthenticated_TwoFactorAuthenticationSetupExpiredError);
}(NotAuthenticatedError);
errorClasses.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = NotAuthenticated_TwoFactorAuthenticationSetupExpiredError;
var NotAuthorized_ApiKeyIsDisabledError = exports.NotAuthorized_ApiKeyIsDisabledError = /*#__PURE__*/function (_NotAuthorizedError) {
  function NotAuthorized_ApiKeyIsDisabledError(message, code, errorData) {
    var _this69;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyIsDisabledError);
    _this69 = _callSuper(this, NotAuthorized_ApiKeyIsDisabledError, [message, code, errorData]);
    _this69.name = 'NotAuthorized_ApiKeyIsDisabledError';
    return _this69;
  }
  (0, _inherits2.default)(NotAuthorized_ApiKeyIsDisabledError, _NotAuthorizedError);
  return (0, _createClass2.default)(NotAuthorized_ApiKeyIsDisabledError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ApiKeyIsDisabledError = NotAuthorized_ApiKeyIsDisabledError;
var NotAuthorized_ApiKeyIsPathRestrictedError = exports.NotAuthorized_ApiKeyIsPathRestrictedError = /*#__PURE__*/function (_NotAuthorizedError2) {
  function NotAuthorized_ApiKeyIsPathRestrictedError(message, code, errorData) {
    var _this70;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyIsPathRestrictedError);
    _this70 = _callSuper(this, NotAuthorized_ApiKeyIsPathRestrictedError, [message, code, errorData]);
    _this70.name = 'NotAuthorized_ApiKeyIsPathRestrictedError';
    return _this70;
  }
  (0, _inherits2.default)(NotAuthorized_ApiKeyIsPathRestrictedError, _NotAuthorizedError2);
  return (0, _createClass2.default)(NotAuthorized_ApiKeyIsPathRestrictedError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ApiKeyIsPathRestrictedError = NotAuthorized_ApiKeyIsPathRestrictedError;
var NotAuthorized_ApiKeyOnlyForDesktopAppError = exports.NotAuthorized_ApiKeyOnlyForDesktopAppError = /*#__PURE__*/function (_NotAuthorizedError3) {
  function NotAuthorized_ApiKeyOnlyForDesktopAppError(message, code, errorData) {
    var _this71;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyOnlyForDesktopAppError);
    _this71 = _callSuper(this, NotAuthorized_ApiKeyOnlyForDesktopAppError, [message, code, errorData]);
    _this71.name = 'NotAuthorized_ApiKeyOnlyForDesktopAppError';
    return _this71;
  }
  (0, _inherits2.default)(NotAuthorized_ApiKeyOnlyForDesktopAppError, _NotAuthorizedError3);
  return (0, _createClass2.default)(NotAuthorized_ApiKeyOnlyForDesktopAppError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ApiKeyOnlyForDesktopAppError = NotAuthorized_ApiKeyOnlyForDesktopAppError;
var NotAuthorized_ApiKeyOnlyForMobileAppError = exports.NotAuthorized_ApiKeyOnlyForMobileAppError = /*#__PURE__*/function (_NotAuthorizedError4) {
  function NotAuthorized_ApiKeyOnlyForMobileAppError(message, code, errorData) {
    var _this72;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyOnlyForMobileAppError);
    _this72 = _callSuper(this, NotAuthorized_ApiKeyOnlyForMobileAppError, [message, code, errorData]);
    _this72.name = 'NotAuthorized_ApiKeyOnlyForMobileAppError';
    return _this72;
  }
  (0, _inherits2.default)(NotAuthorized_ApiKeyOnlyForMobileAppError, _NotAuthorizedError4);
  return (0, _createClass2.default)(NotAuthorized_ApiKeyOnlyForMobileAppError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ApiKeyOnlyForMobileAppError = NotAuthorized_ApiKeyOnlyForMobileAppError;
var NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = exports.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = /*#__PURE__*/function (_NotAuthorizedError5) {
  function NotAuthorized_ApiKeyOnlyForOfficeIntegrationError(message, code, errorData) {
    var _this73;
    (0, _classCallCheck2.default)(this, NotAuthorized_ApiKeyOnlyForOfficeIntegrationError);
    _this73 = _callSuper(this, NotAuthorized_ApiKeyOnlyForOfficeIntegrationError, [message, code, errorData]);
    _this73.name = 'NotAuthorized_ApiKeyOnlyForOfficeIntegrationError';
    return _this73;
  }
  (0, _inherits2.default)(NotAuthorized_ApiKeyOnlyForOfficeIntegrationError, _NotAuthorizedError5);
  return (0, _createClass2.default)(NotAuthorized_ApiKeyOnlyForOfficeIntegrationError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = NotAuthorized_ApiKeyOnlyForOfficeIntegrationError;
var NotAuthorized_BillingPermissionRequiredError = exports.NotAuthorized_BillingPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError6) {
  function NotAuthorized_BillingPermissionRequiredError(message, code, errorData) {
    var _this74;
    (0, _classCallCheck2.default)(this, NotAuthorized_BillingPermissionRequiredError);
    _this74 = _callSuper(this, NotAuthorized_BillingPermissionRequiredError, [message, code, errorData]);
    _this74.name = 'NotAuthorized_BillingPermissionRequiredError';
    return _this74;
  }
  (0, _inherits2.default)(NotAuthorized_BillingPermissionRequiredError, _NotAuthorizedError6);
  return (0, _createClass2.default)(NotAuthorized_BillingPermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_BillingPermissionRequiredError = NotAuthorized_BillingPermissionRequiredError;
var NotAuthorized_BundleMaximumUsesReachedError = exports.NotAuthorized_BundleMaximumUsesReachedError = /*#__PURE__*/function (_NotAuthorizedError7) {
  function NotAuthorized_BundleMaximumUsesReachedError(message, code, errorData) {
    var _this75;
    (0, _classCallCheck2.default)(this, NotAuthorized_BundleMaximumUsesReachedError);
    _this75 = _callSuper(this, NotAuthorized_BundleMaximumUsesReachedError, [message, code, errorData]);
    _this75.name = 'NotAuthorized_BundleMaximumUsesReachedError';
    return _this75;
  }
  (0, _inherits2.default)(NotAuthorized_BundleMaximumUsesReachedError, _NotAuthorizedError7);
  return (0, _createClass2.default)(NotAuthorized_BundleMaximumUsesReachedError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_BundleMaximumUsesReachedError = NotAuthorized_BundleMaximumUsesReachedError;
var NotAuthorized_CannotLoginWhileUsingKeyError = exports.NotAuthorized_CannotLoginWhileUsingKeyError = /*#__PURE__*/function (_NotAuthorizedError8) {
  function NotAuthorized_CannotLoginWhileUsingKeyError(message, code, errorData) {
    var _this76;
    (0, _classCallCheck2.default)(this, NotAuthorized_CannotLoginWhileUsingKeyError);
    _this76 = _callSuper(this, NotAuthorized_CannotLoginWhileUsingKeyError, [message, code, errorData]);
    _this76.name = 'NotAuthorized_CannotLoginWhileUsingKeyError';
    return _this76;
  }
  (0, _inherits2.default)(NotAuthorized_CannotLoginWhileUsingKeyError, _NotAuthorizedError8);
  return (0, _createClass2.default)(NotAuthorized_CannotLoginWhileUsingKeyError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_CannotLoginWhileUsingKeyError = NotAuthorized_CannotLoginWhileUsingKeyError;
var NotAuthorized_CantActForOtherUserError = exports.NotAuthorized_CantActForOtherUserError = /*#__PURE__*/function (_NotAuthorizedError9) {
  function NotAuthorized_CantActForOtherUserError(message, code, errorData) {
    var _this77;
    (0, _classCallCheck2.default)(this, NotAuthorized_CantActForOtherUserError);
    _this77 = _callSuper(this, NotAuthorized_CantActForOtherUserError, [message, code, errorData]);
    _this77.name = 'NotAuthorized_CantActForOtherUserError';
    return _this77;
  }
  (0, _inherits2.default)(NotAuthorized_CantActForOtherUserError, _NotAuthorizedError9);
  return (0, _createClass2.default)(NotAuthorized_CantActForOtherUserError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_CantActForOtherUserError = NotAuthorized_CantActForOtherUserError;
var NotAuthorized_ContactAdminForPasswordChangeHelpError = exports.NotAuthorized_ContactAdminForPasswordChangeHelpError = /*#__PURE__*/function (_NotAuthorizedError10) {
  function NotAuthorized_ContactAdminForPasswordChangeHelpError(message, code, errorData) {
    var _this78;
    (0, _classCallCheck2.default)(this, NotAuthorized_ContactAdminForPasswordChangeHelpError);
    _this78 = _callSuper(this, NotAuthorized_ContactAdminForPasswordChangeHelpError, [message, code, errorData]);
    _this78.name = 'NotAuthorized_ContactAdminForPasswordChangeHelpError';
    return _this78;
  }
  (0, _inherits2.default)(NotAuthorized_ContactAdminForPasswordChangeHelpError, _NotAuthorizedError10);
  return (0, _createClass2.default)(NotAuthorized_ContactAdminForPasswordChangeHelpError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ContactAdminForPasswordChangeHelpError = NotAuthorized_ContactAdminForPasswordChangeHelpError;
var NotAuthorized_FilesAgentFailedAuthorizationError = exports.NotAuthorized_FilesAgentFailedAuthorizationError = /*#__PURE__*/function (_NotAuthorizedError11) {
  function NotAuthorized_FilesAgentFailedAuthorizationError(message, code, errorData) {
    var _this79;
    (0, _classCallCheck2.default)(this, NotAuthorized_FilesAgentFailedAuthorizationError);
    _this79 = _callSuper(this, NotAuthorized_FilesAgentFailedAuthorizationError, [message, code, errorData]);
    _this79.name = 'NotAuthorized_FilesAgentFailedAuthorizationError';
    return _this79;
  }
  (0, _inherits2.default)(NotAuthorized_FilesAgentFailedAuthorizationError, _NotAuthorizedError11);
  return (0, _createClass2.default)(NotAuthorized_FilesAgentFailedAuthorizationError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_FilesAgentFailedAuthorizationError = NotAuthorized_FilesAgentFailedAuthorizationError;
var NotAuthorized_FolderAdminOrBillingPermissionRequiredError = exports.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError12) {
  function NotAuthorized_FolderAdminOrBillingPermissionRequiredError(message, code, errorData) {
    var _this80;
    (0, _classCallCheck2.default)(this, NotAuthorized_FolderAdminOrBillingPermissionRequiredError);
    _this80 = _callSuper(this, NotAuthorized_FolderAdminOrBillingPermissionRequiredError, [message, code, errorData]);
    _this80.name = 'NotAuthorized_FolderAdminOrBillingPermissionRequiredError';
    return _this80;
  }
  (0, _inherits2.default)(NotAuthorized_FolderAdminOrBillingPermissionRequiredError, _NotAuthorizedError12);
  return (0, _createClass2.default)(NotAuthorized_FolderAdminOrBillingPermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = NotAuthorized_FolderAdminOrBillingPermissionRequiredError;
var NotAuthorized_FolderAdminPermissionRequiredError = exports.NotAuthorized_FolderAdminPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError13) {
  function NotAuthorized_FolderAdminPermissionRequiredError(message, code, errorData) {
    var _this81;
    (0, _classCallCheck2.default)(this, NotAuthorized_FolderAdminPermissionRequiredError);
    _this81 = _callSuper(this, NotAuthorized_FolderAdminPermissionRequiredError, [message, code, errorData]);
    _this81.name = 'NotAuthorized_FolderAdminPermissionRequiredError';
    return _this81;
  }
  (0, _inherits2.default)(NotAuthorized_FolderAdminPermissionRequiredError, _NotAuthorizedError13);
  return (0, _createClass2.default)(NotAuthorized_FolderAdminPermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_FolderAdminPermissionRequiredError = NotAuthorized_FolderAdminPermissionRequiredError;
var NotAuthorized_FullPermissionRequiredError = exports.NotAuthorized_FullPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError14) {
  function NotAuthorized_FullPermissionRequiredError(message, code, errorData) {
    var _this82;
    (0, _classCallCheck2.default)(this, NotAuthorized_FullPermissionRequiredError);
    _this82 = _callSuper(this, NotAuthorized_FullPermissionRequiredError, [message, code, errorData]);
    _this82.name = 'NotAuthorized_FullPermissionRequiredError';
    return _this82;
  }
  (0, _inherits2.default)(NotAuthorized_FullPermissionRequiredError, _NotAuthorizedError14);
  return (0, _createClass2.default)(NotAuthorized_FullPermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_FullPermissionRequiredError = NotAuthorized_FullPermissionRequiredError;
var NotAuthorized_HistoryPermissionRequiredError = exports.NotAuthorized_HistoryPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError15) {
  function NotAuthorized_HistoryPermissionRequiredError(message, code, errorData) {
    var _this83;
    (0, _classCallCheck2.default)(this, NotAuthorized_HistoryPermissionRequiredError);
    _this83 = _callSuper(this, NotAuthorized_HistoryPermissionRequiredError, [message, code, errorData]);
    _this83.name = 'NotAuthorized_HistoryPermissionRequiredError';
    return _this83;
  }
  (0, _inherits2.default)(NotAuthorized_HistoryPermissionRequiredError, _NotAuthorizedError15);
  return (0, _createClass2.default)(NotAuthorized_HistoryPermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_HistoryPermissionRequiredError = NotAuthorized_HistoryPermissionRequiredError;
var NotAuthorized_InsufficientPermissionForParamsError = exports.NotAuthorized_InsufficientPermissionForParamsError = /*#__PURE__*/function (_NotAuthorizedError16) {
  function NotAuthorized_InsufficientPermissionForParamsError(message, code, errorData) {
    var _this84;
    (0, _classCallCheck2.default)(this, NotAuthorized_InsufficientPermissionForParamsError);
    _this84 = _callSuper(this, NotAuthorized_InsufficientPermissionForParamsError, [message, code, errorData]);
    _this84.name = 'NotAuthorized_InsufficientPermissionForParamsError';
    return _this84;
  }
  (0, _inherits2.default)(NotAuthorized_InsufficientPermissionForParamsError, _NotAuthorizedError16);
  return (0, _createClass2.default)(NotAuthorized_InsufficientPermissionForParamsError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_InsufficientPermissionForParamsError = NotAuthorized_InsufficientPermissionForParamsError;
var NotAuthorized_MustAuthenticateWithApiKeyError = exports.NotAuthorized_MustAuthenticateWithApiKeyError = /*#__PURE__*/function (_NotAuthorizedError17) {
  function NotAuthorized_MustAuthenticateWithApiKeyError(message, code, errorData) {
    var _this85;
    (0, _classCallCheck2.default)(this, NotAuthorized_MustAuthenticateWithApiKeyError);
    _this85 = _callSuper(this, NotAuthorized_MustAuthenticateWithApiKeyError, [message, code, errorData]);
    _this85.name = 'NotAuthorized_MustAuthenticateWithApiKeyError';
    return _this85;
  }
  (0, _inherits2.default)(NotAuthorized_MustAuthenticateWithApiKeyError, _NotAuthorizedError17);
  return (0, _createClass2.default)(NotAuthorized_MustAuthenticateWithApiKeyError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_MustAuthenticateWithApiKeyError = NotAuthorized_MustAuthenticateWithApiKeyError;
var NotAuthorized_NeedAdminPermissionForInboxError = exports.NotAuthorized_NeedAdminPermissionForInboxError = /*#__PURE__*/function (_NotAuthorizedError18) {
  function NotAuthorized_NeedAdminPermissionForInboxError(message, code, errorData) {
    var _this86;
    (0, _classCallCheck2.default)(this, NotAuthorized_NeedAdminPermissionForInboxError);
    _this86 = _callSuper(this, NotAuthorized_NeedAdminPermissionForInboxError, [message, code, errorData]);
    _this86.name = 'NotAuthorized_NeedAdminPermissionForInboxError';
    return _this86;
  }
  (0, _inherits2.default)(NotAuthorized_NeedAdminPermissionForInboxError, _NotAuthorizedError18);
  return (0, _createClass2.default)(NotAuthorized_NeedAdminPermissionForInboxError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_NeedAdminPermissionForInboxError = NotAuthorized_NeedAdminPermissionForInboxError;
var NotAuthorized_NonAdminsMustQueryByFolderOrPathError = exports.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = /*#__PURE__*/function (_NotAuthorizedError19) {
  function NotAuthorized_NonAdminsMustQueryByFolderOrPathError(message, code, errorData) {
    var _this87;
    (0, _classCallCheck2.default)(this, NotAuthorized_NonAdminsMustQueryByFolderOrPathError);
    _this87 = _callSuper(this, NotAuthorized_NonAdminsMustQueryByFolderOrPathError, [message, code, errorData]);
    _this87.name = 'NotAuthorized_NonAdminsMustQueryByFolderOrPathError';
    return _this87;
  }
  (0, _inherits2.default)(NotAuthorized_NonAdminsMustQueryByFolderOrPathError, _NotAuthorizedError19);
  return (0, _createClass2.default)(NotAuthorized_NonAdminsMustQueryByFolderOrPathError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = NotAuthorized_NonAdminsMustQueryByFolderOrPathError;
var NotAuthorized_NotAllowedToCreateBundleError = exports.NotAuthorized_NotAllowedToCreateBundleError = /*#__PURE__*/function (_NotAuthorizedError20) {
  function NotAuthorized_NotAllowedToCreateBundleError(message, code, errorData) {
    var _this88;
    (0, _classCallCheck2.default)(this, NotAuthorized_NotAllowedToCreateBundleError);
    _this88 = _callSuper(this, NotAuthorized_NotAllowedToCreateBundleError, [message, code, errorData]);
    _this88.name = 'NotAuthorized_NotAllowedToCreateBundleError';
    return _this88;
  }
  (0, _inherits2.default)(NotAuthorized_NotAllowedToCreateBundleError, _NotAuthorizedError20);
  return (0, _createClass2.default)(NotAuthorized_NotAllowedToCreateBundleError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_NotAllowedToCreateBundleError = NotAuthorized_NotAllowedToCreateBundleError;
var NotAuthorized_PasswordChangeNotRequiredError = exports.NotAuthorized_PasswordChangeNotRequiredError = /*#__PURE__*/function (_NotAuthorizedError21) {
  function NotAuthorized_PasswordChangeNotRequiredError(message, code, errorData) {
    var _this89;
    (0, _classCallCheck2.default)(this, NotAuthorized_PasswordChangeNotRequiredError);
    _this89 = _callSuper(this, NotAuthorized_PasswordChangeNotRequiredError, [message, code, errorData]);
    _this89.name = 'NotAuthorized_PasswordChangeNotRequiredError';
    return _this89;
  }
  (0, _inherits2.default)(NotAuthorized_PasswordChangeNotRequiredError, _NotAuthorizedError21);
  return (0, _createClass2.default)(NotAuthorized_PasswordChangeNotRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_PasswordChangeNotRequiredError = NotAuthorized_PasswordChangeNotRequiredError;
var NotAuthorized_PasswordChangeRequiredError = exports.NotAuthorized_PasswordChangeRequiredError = /*#__PURE__*/function (_NotAuthorizedError22) {
  function NotAuthorized_PasswordChangeRequiredError(message, code, errorData) {
    var _this90;
    (0, _classCallCheck2.default)(this, NotAuthorized_PasswordChangeRequiredError);
    _this90 = _callSuper(this, NotAuthorized_PasswordChangeRequiredError, [message, code, errorData]);
    _this90.name = 'NotAuthorized_PasswordChangeRequiredError';
    return _this90;
  }
  (0, _inherits2.default)(NotAuthorized_PasswordChangeRequiredError, _NotAuthorizedError22);
  return (0, _createClass2.default)(NotAuthorized_PasswordChangeRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_PasswordChangeRequiredError = NotAuthorized_PasswordChangeRequiredError;
var NotAuthorized_ReadOnlySessionError = exports.NotAuthorized_ReadOnlySessionError = /*#__PURE__*/function (_NotAuthorizedError23) {
  function NotAuthorized_ReadOnlySessionError(message, code, errorData) {
    var _this91;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReadOnlySessionError);
    _this91 = _callSuper(this, NotAuthorized_ReadOnlySessionError, [message, code, errorData]);
    _this91.name = 'NotAuthorized_ReadOnlySessionError';
    return _this91;
  }
  (0, _inherits2.default)(NotAuthorized_ReadOnlySessionError, _NotAuthorizedError23);
  return (0, _createClass2.default)(NotAuthorized_ReadOnlySessionError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ReadOnlySessionError = NotAuthorized_ReadOnlySessionError;
var NotAuthorized_ReadPermissionRequiredError = exports.NotAuthorized_ReadPermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError24) {
  function NotAuthorized_ReadPermissionRequiredError(message, code, errorData) {
    var _this92;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReadPermissionRequiredError);
    _this92 = _callSuper(this, NotAuthorized_ReadPermissionRequiredError, [message, code, errorData]);
    _this92.name = 'NotAuthorized_ReadPermissionRequiredError';
    return _this92;
  }
  (0, _inherits2.default)(NotAuthorized_ReadPermissionRequiredError, _NotAuthorizedError24);
  return (0, _createClass2.default)(NotAuthorized_ReadPermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ReadPermissionRequiredError = NotAuthorized_ReadPermissionRequiredError;
var NotAuthorized_ReauthenticationFailedError = exports.NotAuthorized_ReauthenticationFailedError = /*#__PURE__*/function (_NotAuthorizedError25) {
  function NotAuthorized_ReauthenticationFailedError(message, code, errorData) {
    var _this93;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReauthenticationFailedError);
    _this93 = _callSuper(this, NotAuthorized_ReauthenticationFailedError, [message, code, errorData]);
    _this93.name = 'NotAuthorized_ReauthenticationFailedError';
    return _this93;
  }
  (0, _inherits2.default)(NotAuthorized_ReauthenticationFailedError, _NotAuthorizedError25);
  return (0, _createClass2.default)(NotAuthorized_ReauthenticationFailedError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ReauthenticationFailedError = NotAuthorized_ReauthenticationFailedError;
var NotAuthorized_ReauthenticationFailedFinalError = exports.NotAuthorized_ReauthenticationFailedFinalError = /*#__PURE__*/function (_NotAuthorizedError26) {
  function NotAuthorized_ReauthenticationFailedFinalError(message, code, errorData) {
    var _this94;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReauthenticationFailedFinalError);
    _this94 = _callSuper(this, NotAuthorized_ReauthenticationFailedFinalError, [message, code, errorData]);
    _this94.name = 'NotAuthorized_ReauthenticationFailedFinalError';
    return _this94;
  }
  (0, _inherits2.default)(NotAuthorized_ReauthenticationFailedFinalError, _NotAuthorizedError26);
  return (0, _createClass2.default)(NotAuthorized_ReauthenticationFailedFinalError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ReauthenticationFailedFinalError = NotAuthorized_ReauthenticationFailedFinalError;
var NotAuthorized_ReauthenticationNeededActionError = exports.NotAuthorized_ReauthenticationNeededActionError = /*#__PURE__*/function (_NotAuthorizedError27) {
  function NotAuthorized_ReauthenticationNeededActionError(message, code, errorData) {
    var _this95;
    (0, _classCallCheck2.default)(this, NotAuthorized_ReauthenticationNeededActionError);
    _this95 = _callSuper(this, NotAuthorized_ReauthenticationNeededActionError, [message, code, errorData]);
    _this95.name = 'NotAuthorized_ReauthenticationNeededActionError';
    return _this95;
  }
  (0, _inherits2.default)(NotAuthorized_ReauthenticationNeededActionError, _NotAuthorizedError27);
  return (0, _createClass2.default)(NotAuthorized_ReauthenticationNeededActionError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ReauthenticationNeededActionError = NotAuthorized_ReauthenticationNeededActionError;
var NotAuthorized_RecaptchaFailedError = exports.NotAuthorized_RecaptchaFailedError = /*#__PURE__*/function (_NotAuthorizedError28) {
  function NotAuthorized_RecaptchaFailedError(message, code, errorData) {
    var _this96;
    (0, _classCallCheck2.default)(this, NotAuthorized_RecaptchaFailedError);
    _this96 = _callSuper(this, NotAuthorized_RecaptchaFailedError, [message, code, errorData]);
    _this96.name = 'NotAuthorized_RecaptchaFailedError';
    return _this96;
  }
  (0, _inherits2.default)(NotAuthorized_RecaptchaFailedError, _NotAuthorizedError28);
  return (0, _createClass2.default)(NotAuthorized_RecaptchaFailedError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_RecaptchaFailedError = NotAuthorized_RecaptchaFailedError;
var NotAuthorized_SelfManagedRequiredError = exports.NotAuthorized_SelfManagedRequiredError = /*#__PURE__*/function (_NotAuthorizedError29) {
  function NotAuthorized_SelfManagedRequiredError(message, code, errorData) {
    var _this97;
    (0, _classCallCheck2.default)(this, NotAuthorized_SelfManagedRequiredError);
    _this97 = _callSuper(this, NotAuthorized_SelfManagedRequiredError, [message, code, errorData]);
    _this97.name = 'NotAuthorized_SelfManagedRequiredError';
    return _this97;
  }
  (0, _inherits2.default)(NotAuthorized_SelfManagedRequiredError, _NotAuthorizedError29);
  return (0, _createClass2.default)(NotAuthorized_SelfManagedRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_SelfManagedRequiredError = NotAuthorized_SelfManagedRequiredError;
var NotAuthorized_SiteAdminRequiredError = exports.NotAuthorized_SiteAdminRequiredError = /*#__PURE__*/function (_NotAuthorizedError30) {
  function NotAuthorized_SiteAdminRequiredError(message, code, errorData) {
    var _this98;
    (0, _classCallCheck2.default)(this, NotAuthorized_SiteAdminRequiredError);
    _this98 = _callSuper(this, NotAuthorized_SiteAdminRequiredError, [message, code, errorData]);
    _this98.name = 'NotAuthorized_SiteAdminRequiredError';
    return _this98;
  }
  (0, _inherits2.default)(NotAuthorized_SiteAdminRequiredError, _NotAuthorizedError30);
  return (0, _createClass2.default)(NotAuthorized_SiteAdminRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_SiteAdminRequiredError = NotAuthorized_SiteAdminRequiredError;
var NotAuthorized_SiteFilesAreImmutableError = exports.NotAuthorized_SiteFilesAreImmutableError = /*#__PURE__*/function (_NotAuthorizedError31) {
  function NotAuthorized_SiteFilesAreImmutableError(message, code, errorData) {
    var _this99;
    (0, _classCallCheck2.default)(this, NotAuthorized_SiteFilesAreImmutableError);
    _this99 = _callSuper(this, NotAuthorized_SiteFilesAreImmutableError, [message, code, errorData]);
    _this99.name = 'NotAuthorized_SiteFilesAreImmutableError';
    return _this99;
  }
  (0, _inherits2.default)(NotAuthorized_SiteFilesAreImmutableError, _NotAuthorizedError31);
  return (0, _createClass2.default)(NotAuthorized_SiteFilesAreImmutableError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_SiteFilesAreImmutableError = NotAuthorized_SiteFilesAreImmutableError;
var NotAuthorized_TwoFactorAuthenticationRequiredError = exports.NotAuthorized_TwoFactorAuthenticationRequiredError = /*#__PURE__*/function (_NotAuthorizedError32) {
  function NotAuthorized_TwoFactorAuthenticationRequiredError(message, code, errorData) {
    var _this100;
    (0, _classCallCheck2.default)(this, NotAuthorized_TwoFactorAuthenticationRequiredError);
    _this100 = _callSuper(this, NotAuthorized_TwoFactorAuthenticationRequiredError, [message, code, errorData]);
    _this100.name = 'NotAuthorized_TwoFactorAuthenticationRequiredError';
    return _this100;
  }
  (0, _inherits2.default)(NotAuthorized_TwoFactorAuthenticationRequiredError, _NotAuthorizedError32);
  return (0, _createClass2.default)(NotAuthorized_TwoFactorAuthenticationRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_TwoFactorAuthenticationRequiredError = NotAuthorized_TwoFactorAuthenticationRequiredError;
var NotAuthorized_UserIdWithoutSiteAdminError = exports.NotAuthorized_UserIdWithoutSiteAdminError = /*#__PURE__*/function (_NotAuthorizedError33) {
  function NotAuthorized_UserIdWithoutSiteAdminError(message, code, errorData) {
    var _this101;
    (0, _classCallCheck2.default)(this, NotAuthorized_UserIdWithoutSiteAdminError);
    _this101 = _callSuper(this, NotAuthorized_UserIdWithoutSiteAdminError, [message, code, errorData]);
    _this101.name = 'NotAuthorized_UserIdWithoutSiteAdminError';
    return _this101;
  }
  (0, _inherits2.default)(NotAuthorized_UserIdWithoutSiteAdminError, _NotAuthorizedError33);
  return (0, _createClass2.default)(NotAuthorized_UserIdWithoutSiteAdminError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_UserIdWithoutSiteAdminError = NotAuthorized_UserIdWithoutSiteAdminError;
var NotAuthorized_WriteAndBundlePermissionRequiredError = exports.NotAuthorized_WriteAndBundlePermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError34) {
  function NotAuthorized_WriteAndBundlePermissionRequiredError(message, code, errorData) {
    var _this102;
    (0, _classCallCheck2.default)(this, NotAuthorized_WriteAndBundlePermissionRequiredError);
    _this102 = _callSuper(this, NotAuthorized_WriteAndBundlePermissionRequiredError, [message, code, errorData]);
    _this102.name = 'NotAuthorized_WriteAndBundlePermissionRequiredError';
    return _this102;
  }
  (0, _inherits2.default)(NotAuthorized_WriteAndBundlePermissionRequiredError, _NotAuthorizedError34);
  return (0, _createClass2.default)(NotAuthorized_WriteAndBundlePermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_WriteAndBundlePermissionRequiredError = NotAuthorized_WriteAndBundlePermissionRequiredError;
var NotAuthorized_WritePermissionRequiredError = exports.NotAuthorized_WritePermissionRequiredError = /*#__PURE__*/function (_NotAuthorizedError35) {
  function NotAuthorized_WritePermissionRequiredError(message, code, errorData) {
    var _this103;
    (0, _classCallCheck2.default)(this, NotAuthorized_WritePermissionRequiredError);
    _this103 = _callSuper(this, NotAuthorized_WritePermissionRequiredError, [message, code, errorData]);
    _this103.name = 'NotAuthorized_WritePermissionRequiredError';
    return _this103;
  }
  (0, _inherits2.default)(NotAuthorized_WritePermissionRequiredError, _NotAuthorizedError35);
  return (0, _createClass2.default)(NotAuthorized_WritePermissionRequiredError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_WritePermissionRequiredError = NotAuthorized_WritePermissionRequiredError;
var NotAuthorized_ZipDownloadIpMismatchError = exports.NotAuthorized_ZipDownloadIpMismatchError = /*#__PURE__*/function (_NotAuthorizedError36) {
  function NotAuthorized_ZipDownloadIpMismatchError(message, code, errorData) {
    var _this104;
    (0, _classCallCheck2.default)(this, NotAuthorized_ZipDownloadIpMismatchError);
    _this104 = _callSuper(this, NotAuthorized_ZipDownloadIpMismatchError, [message, code, errorData]);
    _this104.name = 'NotAuthorized_ZipDownloadIpMismatchError';
    return _this104;
  }
  (0, _inherits2.default)(NotAuthorized_ZipDownloadIpMismatchError, _NotAuthorizedError36);
  return (0, _createClass2.default)(NotAuthorized_ZipDownloadIpMismatchError);
}(NotAuthorizedError);
errorClasses.NotAuthorized_ZipDownloadIpMismatchError = NotAuthorized_ZipDownloadIpMismatchError;
var NotFound_ApiKeyNotFoundError = exports.NotFound_ApiKeyNotFoundError = /*#__PURE__*/function (_NotFoundError) {
  function NotFound_ApiKeyNotFoundError(message, code, errorData) {
    var _this105;
    (0, _classCallCheck2.default)(this, NotFound_ApiKeyNotFoundError);
    _this105 = _callSuper(this, NotFound_ApiKeyNotFoundError, [message, code, errorData]);
    _this105.name = 'NotFound_ApiKeyNotFoundError';
    return _this105;
  }
  (0, _inherits2.default)(NotFound_ApiKeyNotFoundError, _NotFoundError);
  return (0, _createClass2.default)(NotFound_ApiKeyNotFoundError);
}(NotFoundError);
errorClasses.NotFound_ApiKeyNotFoundError = NotFound_ApiKeyNotFoundError;
var NotFound_BundlePathNotFoundError = exports.NotFound_BundlePathNotFoundError = /*#__PURE__*/function (_NotFoundError2) {
  function NotFound_BundlePathNotFoundError(message, code, errorData) {
    var _this106;
    (0, _classCallCheck2.default)(this, NotFound_BundlePathNotFoundError);
    _this106 = _callSuper(this, NotFound_BundlePathNotFoundError, [message, code, errorData]);
    _this106.name = 'NotFound_BundlePathNotFoundError';
    return _this106;
  }
  (0, _inherits2.default)(NotFound_BundlePathNotFoundError, _NotFoundError2);
  return (0, _createClass2.default)(NotFound_BundlePathNotFoundError);
}(NotFoundError);
errorClasses.NotFound_BundlePathNotFoundError = NotFound_BundlePathNotFoundError;
var NotFound_BundleRegistrationNotFoundError = exports.NotFound_BundleRegistrationNotFoundError = /*#__PURE__*/function (_NotFoundError3) {
  function NotFound_BundleRegistrationNotFoundError(message, code, errorData) {
    var _this107;
    (0, _classCallCheck2.default)(this, NotFound_BundleRegistrationNotFoundError);
    _this107 = _callSuper(this, NotFound_BundleRegistrationNotFoundError, [message, code, errorData]);
    _this107.name = 'NotFound_BundleRegistrationNotFoundError';
    return _this107;
  }
  (0, _inherits2.default)(NotFound_BundleRegistrationNotFoundError, _NotFoundError3);
  return (0, _createClass2.default)(NotFound_BundleRegistrationNotFoundError);
}(NotFoundError);
errorClasses.NotFound_BundleRegistrationNotFoundError = NotFound_BundleRegistrationNotFoundError;
var NotFound_CodeNotFoundError = exports.NotFound_CodeNotFoundError = /*#__PURE__*/function (_NotFoundError4) {
  function NotFound_CodeNotFoundError(message, code, errorData) {
    var _this108;
    (0, _classCallCheck2.default)(this, NotFound_CodeNotFoundError);
    _this108 = _callSuper(this, NotFound_CodeNotFoundError, [message, code, errorData]);
    _this108.name = 'NotFound_CodeNotFoundError';
    return _this108;
  }
  (0, _inherits2.default)(NotFound_CodeNotFoundError, _NotFoundError4);
  return (0, _createClass2.default)(NotFound_CodeNotFoundError);
}(NotFoundError);
errorClasses.NotFound_CodeNotFoundError = NotFound_CodeNotFoundError;
var NotFound_FileNotFoundError = exports.NotFound_FileNotFoundError = /*#__PURE__*/function (_NotFoundError5) {
  function NotFound_FileNotFoundError(message, code, errorData) {
    var _this109;
    (0, _classCallCheck2.default)(this, NotFound_FileNotFoundError);
    _this109 = _callSuper(this, NotFound_FileNotFoundError, [message, code, errorData]);
    _this109.name = 'NotFound_FileNotFoundError';
    return _this109;
  }
  (0, _inherits2.default)(NotFound_FileNotFoundError, _NotFoundError5);
  return (0, _createClass2.default)(NotFound_FileNotFoundError);
}(NotFoundError);
errorClasses.NotFound_FileNotFoundError = NotFound_FileNotFoundError;
var NotFound_FileUploadNotFoundError = exports.NotFound_FileUploadNotFoundError = /*#__PURE__*/function (_NotFoundError6) {
  function NotFound_FileUploadNotFoundError(message, code, errorData) {
    var _this110;
    (0, _classCallCheck2.default)(this, NotFound_FileUploadNotFoundError);
    _this110 = _callSuper(this, NotFound_FileUploadNotFoundError, [message, code, errorData]);
    _this110.name = 'NotFound_FileUploadNotFoundError';
    return _this110;
  }
  (0, _inherits2.default)(NotFound_FileUploadNotFoundError, _NotFoundError6);
  return (0, _createClass2.default)(NotFound_FileUploadNotFoundError);
}(NotFoundError);
errorClasses.NotFound_FileUploadNotFoundError = NotFound_FileUploadNotFoundError;
var NotFound_FolderNotFoundError = exports.NotFound_FolderNotFoundError = /*#__PURE__*/function (_NotFoundError7) {
  function NotFound_FolderNotFoundError(message, code, errorData) {
    var _this111;
    (0, _classCallCheck2.default)(this, NotFound_FolderNotFoundError);
    _this111 = _callSuper(this, NotFound_FolderNotFoundError, [message, code, errorData]);
    _this111.name = 'NotFound_FolderNotFoundError';
    return _this111;
  }
  (0, _inherits2.default)(NotFound_FolderNotFoundError, _NotFoundError7);
  return (0, _createClass2.default)(NotFound_FolderNotFoundError);
}(NotFoundError);
errorClasses.NotFound_FolderNotFoundError = NotFound_FolderNotFoundError;
var NotFound_GroupNotFoundError = exports.NotFound_GroupNotFoundError = /*#__PURE__*/function (_NotFoundError8) {
  function NotFound_GroupNotFoundError(message, code, errorData) {
    var _this112;
    (0, _classCallCheck2.default)(this, NotFound_GroupNotFoundError);
    _this112 = _callSuper(this, NotFound_GroupNotFoundError, [message, code, errorData]);
    _this112.name = 'NotFound_GroupNotFoundError';
    return _this112;
  }
  (0, _inherits2.default)(NotFound_GroupNotFoundError, _NotFoundError8);
  return (0, _createClass2.default)(NotFound_GroupNotFoundError);
}(NotFoundError);
errorClasses.NotFound_GroupNotFoundError = NotFound_GroupNotFoundError;
var NotFound_InboxNotFoundError = exports.NotFound_InboxNotFoundError = /*#__PURE__*/function (_NotFoundError9) {
  function NotFound_InboxNotFoundError(message, code, errorData) {
    var _this113;
    (0, _classCallCheck2.default)(this, NotFound_InboxNotFoundError);
    _this113 = _callSuper(this, NotFound_InboxNotFoundError, [message, code, errorData]);
    _this113.name = 'NotFound_InboxNotFoundError';
    return _this113;
  }
  (0, _inherits2.default)(NotFound_InboxNotFoundError, _NotFoundError9);
  return (0, _createClass2.default)(NotFound_InboxNotFoundError);
}(NotFoundError);
errorClasses.NotFound_InboxNotFoundError = NotFound_InboxNotFoundError;
var NotFound_NestedNotFoundError = exports.NotFound_NestedNotFoundError = /*#__PURE__*/function (_NotFoundError10) {
  function NotFound_NestedNotFoundError(message, code, errorData) {
    var _this114;
    (0, _classCallCheck2.default)(this, NotFound_NestedNotFoundError);
    _this114 = _callSuper(this, NotFound_NestedNotFoundError, [message, code, errorData]);
    _this114.name = 'NotFound_NestedNotFoundError';
    return _this114;
  }
  (0, _inherits2.default)(NotFound_NestedNotFoundError, _NotFoundError10);
  return (0, _createClass2.default)(NotFound_NestedNotFoundError);
}(NotFoundError);
errorClasses.NotFound_NestedNotFoundError = NotFound_NestedNotFoundError;
var NotFound_PlanNotFoundError = exports.NotFound_PlanNotFoundError = /*#__PURE__*/function (_NotFoundError11) {
  function NotFound_PlanNotFoundError(message, code, errorData) {
    var _this115;
    (0, _classCallCheck2.default)(this, NotFound_PlanNotFoundError);
    _this115 = _callSuper(this, NotFound_PlanNotFoundError, [message, code, errorData]);
    _this115.name = 'NotFound_PlanNotFoundError';
    return _this115;
  }
  (0, _inherits2.default)(NotFound_PlanNotFoundError, _NotFoundError11);
  return (0, _createClass2.default)(NotFound_PlanNotFoundError);
}(NotFoundError);
errorClasses.NotFound_PlanNotFoundError = NotFound_PlanNotFoundError;
var NotFound_SiteNotFoundError = exports.NotFound_SiteNotFoundError = /*#__PURE__*/function (_NotFoundError12) {
  function NotFound_SiteNotFoundError(message, code, errorData) {
    var _this116;
    (0, _classCallCheck2.default)(this, NotFound_SiteNotFoundError);
    _this116 = _callSuper(this, NotFound_SiteNotFoundError, [message, code, errorData]);
    _this116.name = 'NotFound_SiteNotFoundError';
    return _this116;
  }
  (0, _inherits2.default)(NotFound_SiteNotFoundError, _NotFoundError12);
  return (0, _createClass2.default)(NotFound_SiteNotFoundError);
}(NotFoundError);
errorClasses.NotFound_SiteNotFoundError = NotFound_SiteNotFoundError;
var NotFound_UserNotFoundError = exports.NotFound_UserNotFoundError = /*#__PURE__*/function (_NotFoundError13) {
  function NotFound_UserNotFoundError(message, code, errorData) {
    var _this117;
    (0, _classCallCheck2.default)(this, NotFound_UserNotFoundError);
    _this117 = _callSuper(this, NotFound_UserNotFoundError, [message, code, errorData]);
    _this117.name = 'NotFound_UserNotFoundError';
    return _this117;
  }
  (0, _inherits2.default)(NotFound_UserNotFoundError, _NotFoundError13);
  return (0, _createClass2.default)(NotFound_UserNotFoundError);
}(NotFoundError);
errorClasses.NotFound_UserNotFoundError = NotFound_UserNotFoundError;
var ProcessingFailure_AlreadyCompletedError = exports.ProcessingFailure_AlreadyCompletedError = /*#__PURE__*/function (_ProcessingFailureErr) {
  function ProcessingFailure_AlreadyCompletedError(message, code, errorData) {
    var _this118;
    (0, _classCallCheck2.default)(this, ProcessingFailure_AlreadyCompletedError);
    _this118 = _callSuper(this, ProcessingFailure_AlreadyCompletedError, [message, code, errorData]);
    _this118.name = 'ProcessingFailure_AlreadyCompletedError';
    return _this118;
  }
  (0, _inherits2.default)(ProcessingFailure_AlreadyCompletedError, _ProcessingFailureErr);
  return (0, _createClass2.default)(ProcessingFailure_AlreadyCompletedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_AlreadyCompletedError = ProcessingFailure_AlreadyCompletedError;
var ProcessingFailure_AutomationCannotBeRunManuallyError = exports.ProcessingFailure_AutomationCannotBeRunManuallyError = /*#__PURE__*/function (_ProcessingFailureErr2) {
  function ProcessingFailure_AutomationCannotBeRunManuallyError(message, code, errorData) {
    var _this119;
    (0, _classCallCheck2.default)(this, ProcessingFailure_AutomationCannotBeRunManuallyError);
    _this119 = _callSuper(this, ProcessingFailure_AutomationCannotBeRunManuallyError, [message, code, errorData]);
    _this119.name = 'ProcessingFailure_AutomationCannotBeRunManuallyError';
    return _this119;
  }
  (0, _inherits2.default)(ProcessingFailure_AutomationCannotBeRunManuallyError, _ProcessingFailureErr2);
  return (0, _createClass2.default)(ProcessingFailure_AutomationCannotBeRunManuallyError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_AutomationCannotBeRunManuallyError = ProcessingFailure_AutomationCannotBeRunManuallyError;
var ProcessingFailure_BundleOnlyAllowsPreviewsError = exports.ProcessingFailure_BundleOnlyAllowsPreviewsError = /*#__PURE__*/function (_ProcessingFailureErr3) {
  function ProcessingFailure_BundleOnlyAllowsPreviewsError(message, code, errorData) {
    var _this120;
    (0, _classCallCheck2.default)(this, ProcessingFailure_BundleOnlyAllowsPreviewsError);
    _this120 = _callSuper(this, ProcessingFailure_BundleOnlyAllowsPreviewsError, [message, code, errorData]);
    _this120.name = 'ProcessingFailure_BundleOnlyAllowsPreviewsError';
    return _this120;
  }
  (0, _inherits2.default)(ProcessingFailure_BundleOnlyAllowsPreviewsError, _ProcessingFailureErr3);
  return (0, _createClass2.default)(ProcessingFailure_BundleOnlyAllowsPreviewsError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_BundleOnlyAllowsPreviewsError = ProcessingFailure_BundleOnlyAllowsPreviewsError;
var ProcessingFailure_BundleOperationRequiresSubfolderError = exports.ProcessingFailure_BundleOperationRequiresSubfolderError = /*#__PURE__*/function (_ProcessingFailureErr4) {
  function ProcessingFailure_BundleOperationRequiresSubfolderError(message, code, errorData) {
    var _this121;
    (0, _classCallCheck2.default)(this, ProcessingFailure_BundleOperationRequiresSubfolderError);
    _this121 = _callSuper(this, ProcessingFailure_BundleOperationRequiresSubfolderError, [message, code, errorData]);
    _this121.name = 'ProcessingFailure_BundleOperationRequiresSubfolderError';
    return _this121;
  }
  (0, _inherits2.default)(ProcessingFailure_BundleOperationRequiresSubfolderError, _ProcessingFailureErr4);
  return (0, _createClass2.default)(ProcessingFailure_BundleOperationRequiresSubfolderError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_BundleOperationRequiresSubfolderError = ProcessingFailure_BundleOperationRequiresSubfolderError;
var ProcessingFailure_CouldNotCreateParentError = exports.ProcessingFailure_CouldNotCreateParentError = /*#__PURE__*/function (_ProcessingFailureErr5) {
  function ProcessingFailure_CouldNotCreateParentError(message, code, errorData) {
    var _this122;
    (0, _classCallCheck2.default)(this, ProcessingFailure_CouldNotCreateParentError);
    _this122 = _callSuper(this, ProcessingFailure_CouldNotCreateParentError, [message, code, errorData]);
    _this122.name = 'ProcessingFailure_CouldNotCreateParentError';
    return _this122;
  }
  (0, _inherits2.default)(ProcessingFailure_CouldNotCreateParentError, _ProcessingFailureErr5);
  return (0, _createClass2.default)(ProcessingFailure_CouldNotCreateParentError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_CouldNotCreateParentError = ProcessingFailure_CouldNotCreateParentError;
var ProcessingFailure_DestinationExistsError = exports.ProcessingFailure_DestinationExistsError = /*#__PURE__*/function (_ProcessingFailureErr6) {
  function ProcessingFailure_DestinationExistsError(message, code, errorData) {
    var _this123;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationExistsError);
    _this123 = _callSuper(this, ProcessingFailure_DestinationExistsError, [message, code, errorData]);
    _this123.name = 'ProcessingFailure_DestinationExistsError';
    return _this123;
  }
  (0, _inherits2.default)(ProcessingFailure_DestinationExistsError, _ProcessingFailureErr6);
  return (0, _createClass2.default)(ProcessingFailure_DestinationExistsError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_DestinationExistsError = ProcessingFailure_DestinationExistsError;
var ProcessingFailure_DestinationFolderLimitedError = exports.ProcessingFailure_DestinationFolderLimitedError = /*#__PURE__*/function (_ProcessingFailureErr7) {
  function ProcessingFailure_DestinationFolderLimitedError(message, code, errorData) {
    var _this124;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationFolderLimitedError);
    _this124 = _callSuper(this, ProcessingFailure_DestinationFolderLimitedError, [message, code, errorData]);
    _this124.name = 'ProcessingFailure_DestinationFolderLimitedError';
    return _this124;
  }
  (0, _inherits2.default)(ProcessingFailure_DestinationFolderLimitedError, _ProcessingFailureErr7);
  return (0, _createClass2.default)(ProcessingFailure_DestinationFolderLimitedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_DestinationFolderLimitedError = ProcessingFailure_DestinationFolderLimitedError;
var ProcessingFailure_DestinationParentConflictError = exports.ProcessingFailure_DestinationParentConflictError = /*#__PURE__*/function (_ProcessingFailureErr8) {
  function ProcessingFailure_DestinationParentConflictError(message, code, errorData) {
    var _this125;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationParentConflictError);
    _this125 = _callSuper(this, ProcessingFailure_DestinationParentConflictError, [message, code, errorData]);
    _this125.name = 'ProcessingFailure_DestinationParentConflictError';
    return _this125;
  }
  (0, _inherits2.default)(ProcessingFailure_DestinationParentConflictError, _ProcessingFailureErr8);
  return (0, _createClass2.default)(ProcessingFailure_DestinationParentConflictError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_DestinationParentConflictError = ProcessingFailure_DestinationParentConflictError;
var ProcessingFailure_DestinationParentDoesNotExistError = exports.ProcessingFailure_DestinationParentDoesNotExistError = /*#__PURE__*/function (_ProcessingFailureErr9) {
  function ProcessingFailure_DestinationParentDoesNotExistError(message, code, errorData) {
    var _this126;
    (0, _classCallCheck2.default)(this, ProcessingFailure_DestinationParentDoesNotExistError);
    _this126 = _callSuper(this, ProcessingFailure_DestinationParentDoesNotExistError, [message, code, errorData]);
    _this126.name = 'ProcessingFailure_DestinationParentDoesNotExistError';
    return _this126;
  }
  (0, _inherits2.default)(ProcessingFailure_DestinationParentDoesNotExistError, _ProcessingFailureErr9);
  return (0, _createClass2.default)(ProcessingFailure_DestinationParentDoesNotExistError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_DestinationParentDoesNotExistError = ProcessingFailure_DestinationParentDoesNotExistError;
var ProcessingFailure_ExpiredPrivateKeyError = exports.ProcessingFailure_ExpiredPrivateKeyError = /*#__PURE__*/function (_ProcessingFailureErr10) {
  function ProcessingFailure_ExpiredPrivateKeyError(message, code, errorData) {
    var _this127;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExpiredPrivateKeyError);
    _this127 = _callSuper(this, ProcessingFailure_ExpiredPrivateKeyError, [message, code, errorData]);
    _this127.name = 'ProcessingFailure_ExpiredPrivateKeyError';
    return _this127;
  }
  (0, _inherits2.default)(ProcessingFailure_ExpiredPrivateKeyError, _ProcessingFailureErr10);
  return (0, _createClass2.default)(ProcessingFailure_ExpiredPrivateKeyError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_ExpiredPrivateKeyError = ProcessingFailure_ExpiredPrivateKeyError;
var ProcessingFailure_ExpiredPublicKeyError = exports.ProcessingFailure_ExpiredPublicKeyError = /*#__PURE__*/function (_ProcessingFailureErr11) {
  function ProcessingFailure_ExpiredPublicKeyError(message, code, errorData) {
    var _this128;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExpiredPublicKeyError);
    _this128 = _callSuper(this, ProcessingFailure_ExpiredPublicKeyError, [message, code, errorData]);
    _this128.name = 'ProcessingFailure_ExpiredPublicKeyError';
    return _this128;
  }
  (0, _inherits2.default)(ProcessingFailure_ExpiredPublicKeyError, _ProcessingFailureErr11);
  return (0, _createClass2.default)(ProcessingFailure_ExpiredPublicKeyError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_ExpiredPublicKeyError = ProcessingFailure_ExpiredPublicKeyError;
var ProcessingFailure_ExportFailureError = exports.ProcessingFailure_ExportFailureError = /*#__PURE__*/function (_ProcessingFailureErr12) {
  function ProcessingFailure_ExportFailureError(message, code, errorData) {
    var _this129;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExportFailureError);
    _this129 = _callSuper(this, ProcessingFailure_ExportFailureError, [message, code, errorData]);
    _this129.name = 'ProcessingFailure_ExportFailureError';
    return _this129;
  }
  (0, _inherits2.default)(ProcessingFailure_ExportFailureError, _ProcessingFailureErr12);
  return (0, _createClass2.default)(ProcessingFailure_ExportFailureError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_ExportFailureError = ProcessingFailure_ExportFailureError;
var ProcessingFailure_ExportNotReadyError = exports.ProcessingFailure_ExportNotReadyError = /*#__PURE__*/function (_ProcessingFailureErr13) {
  function ProcessingFailure_ExportNotReadyError(message, code, errorData) {
    var _this130;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ExportNotReadyError);
    _this130 = _callSuper(this, ProcessingFailure_ExportNotReadyError, [message, code, errorData]);
    _this130.name = 'ProcessingFailure_ExportNotReadyError';
    return _this130;
  }
  (0, _inherits2.default)(ProcessingFailure_ExportNotReadyError, _ProcessingFailureErr13);
  return (0, _createClass2.default)(ProcessingFailure_ExportNotReadyError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_ExportNotReadyError = ProcessingFailure_ExportNotReadyError;
var ProcessingFailure_FailedToChangePasswordError = exports.ProcessingFailure_FailedToChangePasswordError = /*#__PURE__*/function (_ProcessingFailureErr14) {
  function ProcessingFailure_FailedToChangePasswordError(message, code, errorData) {
    var _this131;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FailedToChangePasswordError);
    _this131 = _callSuper(this, ProcessingFailure_FailedToChangePasswordError, [message, code, errorData]);
    _this131.name = 'ProcessingFailure_FailedToChangePasswordError';
    return _this131;
  }
  (0, _inherits2.default)(ProcessingFailure_FailedToChangePasswordError, _ProcessingFailureErr14);
  return (0, _createClass2.default)(ProcessingFailure_FailedToChangePasswordError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FailedToChangePasswordError = ProcessingFailure_FailedToChangePasswordError;
var ProcessingFailure_FileLockedError = exports.ProcessingFailure_FileLockedError = /*#__PURE__*/function (_ProcessingFailureErr15) {
  function ProcessingFailure_FileLockedError(message, code, errorData) {
    var _this132;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileLockedError);
    _this132 = _callSuper(this, ProcessingFailure_FileLockedError, [message, code, errorData]);
    _this132.name = 'ProcessingFailure_FileLockedError';
    return _this132;
  }
  (0, _inherits2.default)(ProcessingFailure_FileLockedError, _ProcessingFailureErr15);
  return (0, _createClass2.default)(ProcessingFailure_FileLockedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FileLockedError = ProcessingFailure_FileLockedError;
var ProcessingFailure_FileNotUploadedError = exports.ProcessingFailure_FileNotUploadedError = /*#__PURE__*/function (_ProcessingFailureErr16) {
  function ProcessingFailure_FileNotUploadedError(message, code, errorData) {
    var _this133;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileNotUploadedError);
    _this133 = _callSuper(this, ProcessingFailure_FileNotUploadedError, [message, code, errorData]);
    _this133.name = 'ProcessingFailure_FileNotUploadedError';
    return _this133;
  }
  (0, _inherits2.default)(ProcessingFailure_FileNotUploadedError, _ProcessingFailureErr16);
  return (0, _createClass2.default)(ProcessingFailure_FileNotUploadedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FileNotUploadedError = ProcessingFailure_FileNotUploadedError;
var ProcessingFailure_FilePendingProcessingError = exports.ProcessingFailure_FilePendingProcessingError = /*#__PURE__*/function (_ProcessingFailureErr17) {
  function ProcessingFailure_FilePendingProcessingError(message, code, errorData) {
    var _this134;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FilePendingProcessingError);
    _this134 = _callSuper(this, ProcessingFailure_FilePendingProcessingError, [message, code, errorData]);
    _this134.name = 'ProcessingFailure_FilePendingProcessingError';
    return _this134;
  }
  (0, _inherits2.default)(ProcessingFailure_FilePendingProcessingError, _ProcessingFailureErr17);
  return (0, _createClass2.default)(ProcessingFailure_FilePendingProcessingError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FilePendingProcessingError = ProcessingFailure_FilePendingProcessingError;
var ProcessingFailure_FileTooBigToDecryptError = exports.ProcessingFailure_FileTooBigToDecryptError = /*#__PURE__*/function (_ProcessingFailureErr18) {
  function ProcessingFailure_FileTooBigToDecryptError(message, code, errorData) {
    var _this135;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileTooBigToDecryptError);
    _this135 = _callSuper(this, ProcessingFailure_FileTooBigToDecryptError, [message, code, errorData]);
    _this135.name = 'ProcessingFailure_FileTooBigToDecryptError';
    return _this135;
  }
  (0, _inherits2.default)(ProcessingFailure_FileTooBigToDecryptError, _ProcessingFailureErr18);
  return (0, _createClass2.default)(ProcessingFailure_FileTooBigToDecryptError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FileTooBigToDecryptError = ProcessingFailure_FileTooBigToDecryptError;
var ProcessingFailure_FileTooBigToEncryptError = exports.ProcessingFailure_FileTooBigToEncryptError = /*#__PURE__*/function (_ProcessingFailureErr19) {
  function ProcessingFailure_FileTooBigToEncryptError(message, code, errorData) {
    var _this136;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileTooBigToEncryptError);
    _this136 = _callSuper(this, ProcessingFailure_FileTooBigToEncryptError, [message, code, errorData]);
    _this136.name = 'ProcessingFailure_FileTooBigToEncryptError';
    return _this136;
  }
  (0, _inherits2.default)(ProcessingFailure_FileTooBigToEncryptError, _ProcessingFailureErr19);
  return (0, _createClass2.default)(ProcessingFailure_FileTooBigToEncryptError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FileTooBigToEncryptError = ProcessingFailure_FileTooBigToEncryptError;
var ProcessingFailure_FileUploadedToWrongRegionError = exports.ProcessingFailure_FileUploadedToWrongRegionError = /*#__PURE__*/function (_ProcessingFailureErr20) {
  function ProcessingFailure_FileUploadedToWrongRegionError(message, code, errorData) {
    var _this137;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FileUploadedToWrongRegionError);
    _this137 = _callSuper(this, ProcessingFailure_FileUploadedToWrongRegionError, [message, code, errorData]);
    _this137.name = 'ProcessingFailure_FileUploadedToWrongRegionError';
    return _this137;
  }
  (0, _inherits2.default)(ProcessingFailure_FileUploadedToWrongRegionError, _ProcessingFailureErr20);
  return (0, _createClass2.default)(ProcessingFailure_FileUploadedToWrongRegionError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FileUploadedToWrongRegionError = ProcessingFailure_FileUploadedToWrongRegionError;
var ProcessingFailure_FilenameTooLongError = exports.ProcessingFailure_FilenameTooLongError = /*#__PURE__*/function (_ProcessingFailureErr21) {
  function ProcessingFailure_FilenameTooLongError(message, code, errorData) {
    var _this138;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FilenameTooLongError);
    _this138 = _callSuper(this, ProcessingFailure_FilenameTooLongError, [message, code, errorData]);
    _this138.name = 'ProcessingFailure_FilenameTooLongError';
    return _this138;
  }
  (0, _inherits2.default)(ProcessingFailure_FilenameTooLongError, _ProcessingFailureErr21);
  return (0, _createClass2.default)(ProcessingFailure_FilenameTooLongError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FilenameTooLongError = ProcessingFailure_FilenameTooLongError;
var ProcessingFailure_FolderLockedError = exports.ProcessingFailure_FolderLockedError = /*#__PURE__*/function (_ProcessingFailureErr22) {
  function ProcessingFailure_FolderLockedError(message, code, errorData) {
    var _this139;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FolderLockedError);
    _this139 = _callSuper(this, ProcessingFailure_FolderLockedError, [message, code, errorData]);
    _this139.name = 'ProcessingFailure_FolderLockedError';
    return _this139;
  }
  (0, _inherits2.default)(ProcessingFailure_FolderLockedError, _ProcessingFailureErr22);
  return (0, _createClass2.default)(ProcessingFailure_FolderLockedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FolderLockedError = ProcessingFailure_FolderLockedError;
var ProcessingFailure_FolderNotEmptyError = exports.ProcessingFailure_FolderNotEmptyError = /*#__PURE__*/function (_ProcessingFailureErr23) {
  function ProcessingFailure_FolderNotEmptyError(message, code, errorData) {
    var _this140;
    (0, _classCallCheck2.default)(this, ProcessingFailure_FolderNotEmptyError);
    _this140 = _callSuper(this, ProcessingFailure_FolderNotEmptyError, [message, code, errorData]);
    _this140.name = 'ProcessingFailure_FolderNotEmptyError';
    return _this140;
  }
  (0, _inherits2.default)(ProcessingFailure_FolderNotEmptyError, _ProcessingFailureErr23);
  return (0, _createClass2.default)(ProcessingFailure_FolderNotEmptyError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_FolderNotEmptyError = ProcessingFailure_FolderNotEmptyError;
var ProcessingFailure_HistoryUnavailableError = exports.ProcessingFailure_HistoryUnavailableError = /*#__PURE__*/function (_ProcessingFailureErr24) {
  function ProcessingFailure_HistoryUnavailableError(message, code, errorData) {
    var _this141;
    (0, _classCallCheck2.default)(this, ProcessingFailure_HistoryUnavailableError);
    _this141 = _callSuper(this, ProcessingFailure_HistoryUnavailableError, [message, code, errorData]);
    _this141.name = 'ProcessingFailure_HistoryUnavailableError';
    return _this141;
  }
  (0, _inherits2.default)(ProcessingFailure_HistoryUnavailableError, _ProcessingFailureErr24);
  return (0, _createClass2.default)(ProcessingFailure_HistoryUnavailableError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_HistoryUnavailableError = ProcessingFailure_HistoryUnavailableError;
var ProcessingFailure_InvalidBundleCodeError = exports.ProcessingFailure_InvalidBundleCodeError = /*#__PURE__*/function (_ProcessingFailureErr25) {
  function ProcessingFailure_InvalidBundleCodeError(message, code, errorData) {
    var _this142;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidBundleCodeError);
    _this142 = _callSuper(this, ProcessingFailure_InvalidBundleCodeError, [message, code, errorData]);
    _this142.name = 'ProcessingFailure_InvalidBundleCodeError';
    return _this142;
  }
  (0, _inherits2.default)(ProcessingFailure_InvalidBundleCodeError, _ProcessingFailureErr25);
  return (0, _createClass2.default)(ProcessingFailure_InvalidBundleCodeError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_InvalidBundleCodeError = ProcessingFailure_InvalidBundleCodeError;
var ProcessingFailure_InvalidFileTypeError = exports.ProcessingFailure_InvalidFileTypeError = /*#__PURE__*/function (_ProcessingFailureErr26) {
  function ProcessingFailure_InvalidFileTypeError(message, code, errorData) {
    var _this143;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidFileTypeError);
    _this143 = _callSuper(this, ProcessingFailure_InvalidFileTypeError, [message, code, errorData]);
    _this143.name = 'ProcessingFailure_InvalidFileTypeError';
    return _this143;
  }
  (0, _inherits2.default)(ProcessingFailure_InvalidFileTypeError, _ProcessingFailureErr26);
  return (0, _createClass2.default)(ProcessingFailure_InvalidFileTypeError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_InvalidFileTypeError = ProcessingFailure_InvalidFileTypeError;
var ProcessingFailure_InvalidFilenameError = exports.ProcessingFailure_InvalidFilenameError = /*#__PURE__*/function (_ProcessingFailureErr27) {
  function ProcessingFailure_InvalidFilenameError(message, code, errorData) {
    var _this144;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidFilenameError);
    _this144 = _callSuper(this, ProcessingFailure_InvalidFilenameError, [message, code, errorData]);
    _this144.name = 'ProcessingFailure_InvalidFilenameError';
    return _this144;
  }
  (0, _inherits2.default)(ProcessingFailure_InvalidFilenameError, _ProcessingFailureErr27);
  return (0, _createClass2.default)(ProcessingFailure_InvalidFilenameError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_InvalidFilenameError = ProcessingFailure_InvalidFilenameError;
var ProcessingFailure_InvalidRangeError = exports.ProcessingFailure_InvalidRangeError = /*#__PURE__*/function (_ProcessingFailureErr28) {
  function ProcessingFailure_InvalidRangeError(message, code, errorData) {
    var _this145;
    (0, _classCallCheck2.default)(this, ProcessingFailure_InvalidRangeError);
    _this145 = _callSuper(this, ProcessingFailure_InvalidRangeError, [message, code, errorData]);
    _this145.name = 'ProcessingFailure_InvalidRangeError';
    return _this145;
  }
  (0, _inherits2.default)(ProcessingFailure_InvalidRangeError, _ProcessingFailureErr28);
  return (0, _createClass2.default)(ProcessingFailure_InvalidRangeError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_InvalidRangeError = ProcessingFailure_InvalidRangeError;
var ProcessingFailure_ModelSaveErrorError = exports.ProcessingFailure_ModelSaveErrorError = /*#__PURE__*/function (_ProcessingFailureErr29) {
  function ProcessingFailure_ModelSaveErrorError(message, code, errorData) {
    var _this146;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ModelSaveErrorError);
    _this146 = _callSuper(this, ProcessingFailure_ModelSaveErrorError, [message, code, errorData]);
    _this146.name = 'ProcessingFailure_ModelSaveErrorError';
    return _this146;
  }
  (0, _inherits2.default)(ProcessingFailure_ModelSaveErrorError, _ProcessingFailureErr29);
  return (0, _createClass2.default)(ProcessingFailure_ModelSaveErrorError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_ModelSaveErrorError = ProcessingFailure_ModelSaveErrorError;
var ProcessingFailure_MultipleProcessingErrorsError = exports.ProcessingFailure_MultipleProcessingErrorsError = /*#__PURE__*/function (_ProcessingFailureErr30) {
  function ProcessingFailure_MultipleProcessingErrorsError(message, code, errorData) {
    var _this147;
    (0, _classCallCheck2.default)(this, ProcessingFailure_MultipleProcessingErrorsError);
    _this147 = _callSuper(this, ProcessingFailure_MultipleProcessingErrorsError, [message, code, errorData]);
    _this147.name = 'ProcessingFailure_MultipleProcessingErrorsError';
    return _this147;
  }
  (0, _inherits2.default)(ProcessingFailure_MultipleProcessingErrorsError, _ProcessingFailureErr30);
  return (0, _createClass2.default)(ProcessingFailure_MultipleProcessingErrorsError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_MultipleProcessingErrorsError = ProcessingFailure_MultipleProcessingErrorsError;
var ProcessingFailure_PathTooLongError = exports.ProcessingFailure_PathTooLongError = /*#__PURE__*/function (_ProcessingFailureErr31) {
  function ProcessingFailure_PathTooLongError(message, code, errorData) {
    var _this148;
    (0, _classCallCheck2.default)(this, ProcessingFailure_PathTooLongError);
    _this148 = _callSuper(this, ProcessingFailure_PathTooLongError, [message, code, errorData]);
    _this148.name = 'ProcessingFailure_PathTooLongError';
    return _this148;
  }
  (0, _inherits2.default)(ProcessingFailure_PathTooLongError, _ProcessingFailureErr31);
  return (0, _createClass2.default)(ProcessingFailure_PathTooLongError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_PathTooLongError = ProcessingFailure_PathTooLongError;
var ProcessingFailure_RecipientAlreadySharedError = exports.ProcessingFailure_RecipientAlreadySharedError = /*#__PURE__*/function (_ProcessingFailureErr32) {
  function ProcessingFailure_RecipientAlreadySharedError(message, code, errorData) {
    var _this149;
    (0, _classCallCheck2.default)(this, ProcessingFailure_RecipientAlreadySharedError);
    _this149 = _callSuper(this, ProcessingFailure_RecipientAlreadySharedError, [message, code, errorData]);
    _this149.name = 'ProcessingFailure_RecipientAlreadySharedError';
    return _this149;
  }
  (0, _inherits2.default)(ProcessingFailure_RecipientAlreadySharedError, _ProcessingFailureErr32);
  return (0, _createClass2.default)(ProcessingFailure_RecipientAlreadySharedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_RecipientAlreadySharedError = ProcessingFailure_RecipientAlreadySharedError;
var ProcessingFailure_RemoteServerErrorError = exports.ProcessingFailure_RemoteServerErrorError = /*#__PURE__*/function (_ProcessingFailureErr33) {
  function ProcessingFailure_RemoteServerErrorError(message, code, errorData) {
    var _this150;
    (0, _classCallCheck2.default)(this, ProcessingFailure_RemoteServerErrorError);
    _this150 = _callSuper(this, ProcessingFailure_RemoteServerErrorError, [message, code, errorData]);
    _this150.name = 'ProcessingFailure_RemoteServerErrorError';
    return _this150;
  }
  (0, _inherits2.default)(ProcessingFailure_RemoteServerErrorError, _ProcessingFailureErr33);
  return (0, _createClass2.default)(ProcessingFailure_RemoteServerErrorError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_RemoteServerErrorError = ProcessingFailure_RemoteServerErrorError;
var ProcessingFailure_ResourceLockedError = exports.ProcessingFailure_ResourceLockedError = /*#__PURE__*/function (_ProcessingFailureErr34) {
  function ProcessingFailure_ResourceLockedError(message, code, errorData) {
    var _this151;
    (0, _classCallCheck2.default)(this, ProcessingFailure_ResourceLockedError);
    _this151 = _callSuper(this, ProcessingFailure_ResourceLockedError, [message, code, errorData]);
    _this151.name = 'ProcessingFailure_ResourceLockedError';
    return _this151;
  }
  (0, _inherits2.default)(ProcessingFailure_ResourceLockedError, _ProcessingFailureErr34);
  return (0, _createClass2.default)(ProcessingFailure_ResourceLockedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_ResourceLockedError = ProcessingFailure_ResourceLockedError;
var ProcessingFailure_SubfolderLockedError = exports.ProcessingFailure_SubfolderLockedError = /*#__PURE__*/function (_ProcessingFailureErr35) {
  function ProcessingFailure_SubfolderLockedError(message, code, errorData) {
    var _this152;
    (0, _classCallCheck2.default)(this, ProcessingFailure_SubfolderLockedError);
    _this152 = _callSuper(this, ProcessingFailure_SubfolderLockedError, [message, code, errorData]);
    _this152.name = 'ProcessingFailure_SubfolderLockedError';
    return _this152;
  }
  (0, _inherits2.default)(ProcessingFailure_SubfolderLockedError, _ProcessingFailureErr35);
  return (0, _createClass2.default)(ProcessingFailure_SubfolderLockedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_SubfolderLockedError = ProcessingFailure_SubfolderLockedError;
var ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = exports.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = /*#__PURE__*/function (_ProcessingFailureErr36) {
  function ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError(message, code, errorData) {
    var _this153;
    (0, _classCallCheck2.default)(this, ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError);
    _this153 = _callSuper(this, ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError, [message, code, errorData]);
    _this153.name = 'ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError';
    return _this153;
  }
  (0, _inherits2.default)(ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError, _ProcessingFailureErr36);
  return (0, _createClass2.default)(ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError;
var ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError = exports.ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError = /*#__PURE__*/function (_ProcessingFailureErr37) {
  function ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError(message, code, errorData) {
    var _this154;
    (0, _classCallCheck2.default)(this, ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError);
    _this154 = _callSuper(this, ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError, [message, code, errorData]);
    _this154.name = 'ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError';
    return _this154;
  }
  (0, _inherits2.default)(ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError, _ProcessingFailureErr37);
  return (0, _createClass2.default)(ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError = ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError;
var ProcessingFailure_TwoFactorAuthenticationGeneralErrorError = exports.ProcessingFailure_TwoFactorAuthenticationGeneralErrorError = /*#__PURE__*/function (_ProcessingFailureErr38) {
  function ProcessingFailure_TwoFactorAuthenticationGeneralErrorError(message, code, errorData) {
    var _this155;
    (0, _classCallCheck2.default)(this, ProcessingFailure_TwoFactorAuthenticationGeneralErrorError);
    _this155 = _callSuper(this, ProcessingFailure_TwoFactorAuthenticationGeneralErrorError, [message, code, errorData]);
    _this155.name = 'ProcessingFailure_TwoFactorAuthenticationGeneralErrorError';
    return _this155;
  }
  (0, _inherits2.default)(ProcessingFailure_TwoFactorAuthenticationGeneralErrorError, _ProcessingFailureErr38);
  return (0, _createClass2.default)(ProcessingFailure_TwoFactorAuthenticationGeneralErrorError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_TwoFactorAuthenticationGeneralErrorError = ProcessingFailure_TwoFactorAuthenticationGeneralErrorError;
var ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError = exports.ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError = /*#__PURE__*/function (_ProcessingFailureErr39) {
  function ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError(message, code, errorData) {
    var _this156;
    (0, _classCallCheck2.default)(this, ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError);
    _this156 = _callSuper(this, ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError, [message, code, errorData]);
    _this156.name = 'ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError';
    return _this156;
  }
  (0, _inherits2.default)(ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError, _ProcessingFailureErr39);
  return (0, _createClass2.default)(ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError = ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError;
var ProcessingFailure_UpdatesNotAllowedForRemotesError = exports.ProcessingFailure_UpdatesNotAllowedForRemotesError = /*#__PURE__*/function (_ProcessingFailureErr40) {
  function ProcessingFailure_UpdatesNotAllowedForRemotesError(message, code, errorData) {
    var _this157;
    (0, _classCallCheck2.default)(this, ProcessingFailure_UpdatesNotAllowedForRemotesError);
    _this157 = _callSuper(this, ProcessingFailure_UpdatesNotAllowedForRemotesError, [message, code, errorData]);
    _this157.name = 'ProcessingFailure_UpdatesNotAllowedForRemotesError';
    return _this157;
  }
  (0, _inherits2.default)(ProcessingFailure_UpdatesNotAllowedForRemotesError, _ProcessingFailureErr40);
  return (0, _createClass2.default)(ProcessingFailure_UpdatesNotAllowedForRemotesError);
}(ProcessingFailureError);
errorClasses.ProcessingFailure_UpdatesNotAllowedForRemotesError = ProcessingFailure_UpdatesNotAllowedForRemotesError;
var RateLimited_DuplicateShareRecipientError = exports.RateLimited_DuplicateShareRecipientError = /*#__PURE__*/function (_RateLimitedError) {
  function RateLimited_DuplicateShareRecipientError(message, code, errorData) {
    var _this158;
    (0, _classCallCheck2.default)(this, RateLimited_DuplicateShareRecipientError);
    _this158 = _callSuper(this, RateLimited_DuplicateShareRecipientError, [message, code, errorData]);
    _this158.name = 'RateLimited_DuplicateShareRecipientError';
    return _this158;
  }
  (0, _inherits2.default)(RateLimited_DuplicateShareRecipientError, _RateLimitedError);
  return (0, _createClass2.default)(RateLimited_DuplicateShareRecipientError);
}(RateLimitedError);
errorClasses.RateLimited_DuplicateShareRecipientError = RateLimited_DuplicateShareRecipientError;
var RateLimited_ReauthenticationRateLimitedError = exports.RateLimited_ReauthenticationRateLimitedError = /*#__PURE__*/function (_RateLimitedError2) {
  function RateLimited_ReauthenticationRateLimitedError(message, code, errorData) {
    var _this159;
    (0, _classCallCheck2.default)(this, RateLimited_ReauthenticationRateLimitedError);
    _this159 = _callSuper(this, RateLimited_ReauthenticationRateLimitedError, [message, code, errorData]);
    _this159.name = 'RateLimited_ReauthenticationRateLimitedError';
    return _this159;
  }
  (0, _inherits2.default)(RateLimited_ReauthenticationRateLimitedError, _RateLimitedError2);
  return (0, _createClass2.default)(RateLimited_ReauthenticationRateLimitedError);
}(RateLimitedError);
errorClasses.RateLimited_ReauthenticationRateLimitedError = RateLimited_ReauthenticationRateLimitedError;
var RateLimited_TooManyConcurrentRequestsError = exports.RateLimited_TooManyConcurrentRequestsError = /*#__PURE__*/function (_RateLimitedError3) {
  function RateLimited_TooManyConcurrentRequestsError(message, code, errorData) {
    var _this160;
    (0, _classCallCheck2.default)(this, RateLimited_TooManyConcurrentRequestsError);
    _this160 = _callSuper(this, RateLimited_TooManyConcurrentRequestsError, [message, code, errorData]);
    _this160.name = 'RateLimited_TooManyConcurrentRequestsError';
    return _this160;
  }
  (0, _inherits2.default)(RateLimited_TooManyConcurrentRequestsError, _RateLimitedError3);
  return (0, _createClass2.default)(RateLimited_TooManyConcurrentRequestsError);
}(RateLimitedError);
errorClasses.RateLimited_TooManyConcurrentRequestsError = RateLimited_TooManyConcurrentRequestsError;
var RateLimited_TooManyLoginAttemptsError = exports.RateLimited_TooManyLoginAttemptsError = /*#__PURE__*/function (_RateLimitedError4) {
  function RateLimited_TooManyLoginAttemptsError(message, code, errorData) {
    var _this161;
    (0, _classCallCheck2.default)(this, RateLimited_TooManyLoginAttemptsError);
    _this161 = _callSuper(this, RateLimited_TooManyLoginAttemptsError, [message, code, errorData]);
    _this161.name = 'RateLimited_TooManyLoginAttemptsError';
    return _this161;
  }
  (0, _inherits2.default)(RateLimited_TooManyLoginAttemptsError, _RateLimitedError4);
  return (0, _createClass2.default)(RateLimited_TooManyLoginAttemptsError);
}(RateLimitedError);
errorClasses.RateLimited_TooManyLoginAttemptsError = RateLimited_TooManyLoginAttemptsError;
var RateLimited_TooManyRequestsError = exports.RateLimited_TooManyRequestsError = /*#__PURE__*/function (_RateLimitedError5) {
  function RateLimited_TooManyRequestsError(message, code, errorData) {
    var _this162;
    (0, _classCallCheck2.default)(this, RateLimited_TooManyRequestsError);
    _this162 = _callSuper(this, RateLimited_TooManyRequestsError, [message, code, errorData]);
    _this162.name = 'RateLimited_TooManyRequestsError';
    return _this162;
  }
  (0, _inherits2.default)(RateLimited_TooManyRequestsError, _RateLimitedError5);
  return (0, _createClass2.default)(RateLimited_TooManyRequestsError);
}(RateLimitedError);
errorClasses.RateLimited_TooManyRequestsError = RateLimited_TooManyRequestsError;
var RateLimited_TooManySharesError = exports.RateLimited_TooManySharesError = /*#__PURE__*/function (_RateLimitedError6) {
  function RateLimited_TooManySharesError(message, code, errorData) {
    var _this163;
    (0, _classCallCheck2.default)(this, RateLimited_TooManySharesError);
    _this163 = _callSuper(this, RateLimited_TooManySharesError, [message, code, errorData]);
    _this163.name = 'RateLimited_TooManySharesError';
    return _this163;
  }
  (0, _inherits2.default)(RateLimited_TooManySharesError, _RateLimitedError6);
  return (0, _createClass2.default)(RateLimited_TooManySharesError);
}(RateLimitedError);
errorClasses.RateLimited_TooManySharesError = RateLimited_TooManySharesError;
var ServiceUnavailable_AgentUnavailableError = exports.ServiceUnavailable_AgentUnavailableError = /*#__PURE__*/function (_ServiceUnavailableEr) {
  function ServiceUnavailable_AgentUnavailableError(message, code, errorData) {
    var _this164;
    (0, _classCallCheck2.default)(this, ServiceUnavailable_AgentUnavailableError);
    _this164 = _callSuper(this, ServiceUnavailable_AgentUnavailableError, [message, code, errorData]);
    _this164.name = 'ServiceUnavailable_AgentUnavailableError';
    return _this164;
  }
  (0, _inherits2.default)(ServiceUnavailable_AgentUnavailableError, _ServiceUnavailableEr);
  return (0, _createClass2.default)(ServiceUnavailable_AgentUnavailableError);
}(ServiceUnavailableError);
errorClasses.ServiceUnavailable_AgentUnavailableError = ServiceUnavailable_AgentUnavailableError;
var ServiceUnavailable_AutomationsUnavailableError = exports.ServiceUnavailable_AutomationsUnavailableError = /*#__PURE__*/function (_ServiceUnavailableEr2) {
  function ServiceUnavailable_AutomationsUnavailableError(message, code, errorData) {
    var _this165;
    (0, _classCallCheck2.default)(this, ServiceUnavailable_AutomationsUnavailableError);
    _this165 = _callSuper(this, ServiceUnavailable_AutomationsUnavailableError, [message, code, errorData]);
    _this165.name = 'ServiceUnavailable_AutomationsUnavailableError';
    return _this165;
  }
  (0, _inherits2.default)(ServiceUnavailable_AutomationsUnavailableError, _ServiceUnavailableEr2);
  return (0, _createClass2.default)(ServiceUnavailable_AutomationsUnavailableError);
}(ServiceUnavailableError);
errorClasses.ServiceUnavailable_AutomationsUnavailableError = ServiceUnavailable_AutomationsUnavailableError;
var ServiceUnavailable_UploadsUnavailableError = exports.ServiceUnavailable_UploadsUnavailableError = /*#__PURE__*/function (_ServiceUnavailableEr3) {
  function ServiceUnavailable_UploadsUnavailableError(message, code, errorData) {
    var _this166;
    (0, _classCallCheck2.default)(this, ServiceUnavailable_UploadsUnavailableError);
    _this166 = _callSuper(this, ServiceUnavailable_UploadsUnavailableError, [message, code, errorData]);
    _this166.name = 'ServiceUnavailable_UploadsUnavailableError';
    return _this166;
  }
  (0, _inherits2.default)(ServiceUnavailable_UploadsUnavailableError, _ServiceUnavailableEr3);
  return (0, _createClass2.default)(ServiceUnavailable_UploadsUnavailableError);
}(ServiceUnavailableError);
errorClasses.ServiceUnavailable_UploadsUnavailableError = ServiceUnavailable_UploadsUnavailableError;
var SiteConfiguration_AccountAlreadyExistsError = exports.SiteConfiguration_AccountAlreadyExistsError = /*#__PURE__*/function (_SiteConfigurationErr) {
  function SiteConfiguration_AccountAlreadyExistsError(message, code, errorData) {
    var _this167;
    (0, _classCallCheck2.default)(this, SiteConfiguration_AccountAlreadyExistsError);
    _this167 = _callSuper(this, SiteConfiguration_AccountAlreadyExistsError, [message, code, errorData]);
    _this167.name = 'SiteConfiguration_AccountAlreadyExistsError';
    return _this167;
  }
  (0, _inherits2.default)(SiteConfiguration_AccountAlreadyExistsError, _SiteConfigurationErr);
  return (0, _createClass2.default)(SiteConfiguration_AccountAlreadyExistsError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_AccountAlreadyExistsError = SiteConfiguration_AccountAlreadyExistsError;
var SiteConfiguration_AccountOverdueError = exports.SiteConfiguration_AccountOverdueError = /*#__PURE__*/function (_SiteConfigurationErr2) {
  function SiteConfiguration_AccountOverdueError(message, code, errorData) {
    var _this168;
    (0, _classCallCheck2.default)(this, SiteConfiguration_AccountOverdueError);
    _this168 = _callSuper(this, SiteConfiguration_AccountOverdueError, [message, code, errorData]);
    _this168.name = 'SiteConfiguration_AccountOverdueError';
    return _this168;
  }
  (0, _inherits2.default)(SiteConfiguration_AccountOverdueError, _SiteConfigurationErr2);
  return (0, _createClass2.default)(SiteConfiguration_AccountOverdueError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_AccountOverdueError = SiteConfiguration_AccountOverdueError;
var SiteConfiguration_NoAccountForSiteError = exports.SiteConfiguration_NoAccountForSiteError = /*#__PURE__*/function (_SiteConfigurationErr3) {
  function SiteConfiguration_NoAccountForSiteError(message, code, errorData) {
    var _this169;
    (0, _classCallCheck2.default)(this, SiteConfiguration_NoAccountForSiteError);
    _this169 = _callSuper(this, SiteConfiguration_NoAccountForSiteError, [message, code, errorData]);
    _this169.name = 'SiteConfiguration_NoAccountForSiteError';
    return _this169;
  }
  (0, _inherits2.default)(SiteConfiguration_NoAccountForSiteError, _SiteConfigurationErr3);
  return (0, _createClass2.default)(SiteConfiguration_NoAccountForSiteError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_NoAccountForSiteError = SiteConfiguration_NoAccountForSiteError;
var SiteConfiguration_SiteWasRemovedError = exports.SiteConfiguration_SiteWasRemovedError = /*#__PURE__*/function (_SiteConfigurationErr4) {
  function SiteConfiguration_SiteWasRemovedError(message, code, errorData) {
    var _this170;
    (0, _classCallCheck2.default)(this, SiteConfiguration_SiteWasRemovedError);
    _this170 = _callSuper(this, SiteConfiguration_SiteWasRemovedError, [message, code, errorData]);
    _this170.name = 'SiteConfiguration_SiteWasRemovedError';
    return _this170;
  }
  (0, _inherits2.default)(SiteConfiguration_SiteWasRemovedError, _SiteConfigurationErr4);
  return (0, _createClass2.default)(SiteConfiguration_SiteWasRemovedError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_SiteWasRemovedError = SiteConfiguration_SiteWasRemovedError;
var SiteConfiguration_TrialExpiredError = exports.SiteConfiguration_TrialExpiredError = /*#__PURE__*/function (_SiteConfigurationErr5) {
  function SiteConfiguration_TrialExpiredError(message, code, errorData) {
    var _this171;
    (0, _classCallCheck2.default)(this, SiteConfiguration_TrialExpiredError);
    _this171 = _callSuper(this, SiteConfiguration_TrialExpiredError, [message, code, errorData]);
    _this171.name = 'SiteConfiguration_TrialExpiredError';
    return _this171;
  }
  (0, _inherits2.default)(SiteConfiguration_TrialExpiredError, _SiteConfigurationErr5);
  return (0, _createClass2.default)(SiteConfiguration_TrialExpiredError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_TrialExpiredError = SiteConfiguration_TrialExpiredError;
var SiteConfiguration_TrialLockedError = exports.SiteConfiguration_TrialLockedError = /*#__PURE__*/function (_SiteConfigurationErr6) {
  function SiteConfiguration_TrialLockedError(message, code, errorData) {
    var _this172;
    (0, _classCallCheck2.default)(this, SiteConfiguration_TrialLockedError);
    _this172 = _callSuper(this, SiteConfiguration_TrialLockedError, [message, code, errorData]);
    _this172.name = 'SiteConfiguration_TrialLockedError';
    return _this172;
  }
  (0, _inherits2.default)(SiteConfiguration_TrialLockedError, _SiteConfigurationErr6);
  return (0, _createClass2.default)(SiteConfiguration_TrialLockedError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_TrialLockedError = SiteConfiguration_TrialLockedError;
var SiteConfiguration_UserRequestsEnabledRequiredError = exports.SiteConfiguration_UserRequestsEnabledRequiredError = /*#__PURE__*/function (_SiteConfigurationErr7) {
  function SiteConfiguration_UserRequestsEnabledRequiredError(message, code, errorData) {
    var _this173;
    (0, _classCallCheck2.default)(this, SiteConfiguration_UserRequestsEnabledRequiredError);
    _this173 = _callSuper(this, SiteConfiguration_UserRequestsEnabledRequiredError, [message, code, errorData]);
    _this173.name = 'SiteConfiguration_UserRequestsEnabledRequiredError';
    return _this173;
  }
  (0, _inherits2.default)(SiteConfiguration_UserRequestsEnabledRequiredError, _SiteConfigurationErr7);
  return (0, _createClass2.default)(SiteConfiguration_UserRequestsEnabledRequiredError);
}(SiteConfigurationError);
errorClasses.SiteConfiguration_UserRequestsEnabledRequiredError = SiteConfiguration_UserRequestsEnabledRequiredError;