import Logger from './Logger'

export class FilesError extends Error {
  constructor(message) {
    super(message)
    this.name = 'FilesError'
  }
}

export class FilesApiError extends FilesError {
  constructor(message, code) {
    super(message)
    this.name = 'FilesApiError'
    this.code = code
  }
}

const errorClasses = {
  FilesApiError: FilesApiError,
}

const toPascalCase = string =>
  string.replace(/-/g, ' ').split(' ')
    .map(part => part[0].toUpperCase() + part.substring(1))
    .join('')

export const handleErrorResponse = error => {
  const response = error.response
  let errorData = response?.data

  const message = errorData?.error || response?.statusText || error.message
  const code = response?.status || errorData?.['http-code'] || 0

  if (!errorData) {
    Logger.error('FilesApiError Exception >', code, message)
    throw new FilesApiError(message, code)
  }

  if (Array.isArray(errorData)) {
    errorData = errorData[0]
  }

  if (!errorData.type) {
    Logger.error('FilesApiError Exception >', code, message)
    throw new FilesApiError(message, code)
  }

  const parts = errorData.type.split('/')

  let className
  
  if (parts.length > 1) {
    const [errorFamily, errorType] = parts.map(toPascalCase)
    className = `${errorFamily}_${errorType}Error`
  } else {
    const errorType = toPascalCase(parts[0])
    className = `${errorType}Error`
  }

  const ErrorClass = errorClasses[className] || FilesApiError

  if (!errorClasses[className]) {
    Logger.debug(`Unable to find exception with name of ${className} - falling back to FilesApiError`)
  }

  Logger.error(`${ErrorClass.name} Exception >`, code, message)
  throw new ErrorClass(message, code)
}
  
// general errors
export class ConfigurationError extends FilesError { constructor(message) { super(message); this.name = 'ConfigurationError' } } errorClasses.ConfigurationError = ConfigurationError
export class EmptyPropertyError extends FilesError { constructor(message) { super(message); this.name = 'EmptyPropertyError' } } errorClasses.EmptyPropertyError = EmptyPropertyError
export class InvalidParameterError extends FilesError { constructor(message) { super(message); this.name = 'InvalidParameterError' } } errorClasses.InvalidParameterError = InvalidParameterError
export class MissingParameterError extends FilesError { constructor(message) { super(message); this.name = 'MissingParameterError' } } errorClasses.MissingParameterError = MissingParameterError
export class NotImplementedError extends FilesError { constructor(message) { super(message); this.name = 'NotImplementedError' } } errorClasses.NotImplementedError = NotImplementedError

// api error groups
export class BadRequestError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'BadRequestError' } } errorClasses.BadRequestError = BadRequestError
export class NotAuthenticatedError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticatedError' } } errorClasses.NotAuthenticatedError = NotAuthenticatedError
export class NotAuthorizedError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'NotAuthorizedError' } } errorClasses.NotAuthorizedError = NotAuthorizedError
export class NotFoundError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'NotFoundError' } } errorClasses.NotFoundError = NotFoundError
export class ProcessingFailureError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailureError' } } errorClasses.ProcessingFailureError = ProcessingFailureError
export class RateLimitedError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'RateLimitedError' } } errorClasses.RateLimitedError = RateLimitedError
export class ServiceUnavailableError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'ServiceUnavailableError' } } errorClasses.ServiceUnavailableError = ServiceUnavailableError
export class SiteConfigurationError extends FilesApiError { constructor(message, code) { super(message, code); this.name = 'SiteConfigurationError' } } errorClasses.SiteConfigurationError = SiteConfigurationError


// grouped api errors
export class BadRequest_AgentUpgradeRequiredError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_AgentUpgradeRequiredError' } } errorClasses.BadRequest_AgentUpgradeRequiredError = BadRequest_AgentUpgradeRequiredError
export class BadRequest_AttachmentTooLargeError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_AttachmentTooLargeError' } } errorClasses.BadRequest_AttachmentTooLargeError = BadRequest_AttachmentTooLargeError
export class BadRequest_CannotDownloadDirectoryError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_CannotDownloadDirectoryError' } } errorClasses.BadRequest_CannotDownloadDirectoryError = BadRequest_CannotDownloadDirectoryError
export class BadRequest_CantMoveWithMultipleLocationsError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_CantMoveWithMultipleLocationsError' } } errorClasses.BadRequest_CantMoveWithMultipleLocationsError = BadRequest_CantMoveWithMultipleLocationsError
export class BadRequest_DatetimeParseError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_DatetimeParseError' } } errorClasses.BadRequest_DatetimeParseError = BadRequest_DatetimeParseError
export class BadRequest_DestinationSameError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_DestinationSameError' } } errorClasses.BadRequest_DestinationSameError = BadRequest_DestinationSameError
export class BadRequest_FolderMustNotBeAFileError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_FolderMustNotBeAFileError' } } errorClasses.BadRequest_FolderMustNotBeAFileError = BadRequest_FolderMustNotBeAFileError
export class BadRequest_InvalidBodyError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidBodyError' } } errorClasses.BadRequest_InvalidBodyError = BadRequest_InvalidBodyError
export class BadRequest_InvalidCursorError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidCursorError' } } errorClasses.BadRequest_InvalidCursorError = BadRequest_InvalidCursorError
export class BadRequest_InvalidCursorTypeForSortError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidCursorTypeForSortError' } } errorClasses.BadRequest_InvalidCursorTypeForSortError = BadRequest_InvalidCursorTypeForSortError
export class BadRequest_InvalidEtagsError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidEtagsError' } } errorClasses.BadRequest_InvalidEtagsError = BadRequest_InvalidEtagsError
export class BadRequest_InvalidFilterAliasCombinationError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidFilterAliasCombinationError' } } errorClasses.BadRequest_InvalidFilterAliasCombinationError = BadRequest_InvalidFilterAliasCombinationError
export class BadRequest_InvalidFilterCombinationError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidFilterCombinationError' } } errorClasses.BadRequest_InvalidFilterCombinationError = BadRequest_InvalidFilterCombinationError
export class BadRequest_InvalidFilterFieldError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidFilterFieldError' } } errorClasses.BadRequest_InvalidFilterFieldError = BadRequest_InvalidFilterFieldError
export class BadRequest_InvalidFilterParamError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidFilterParamError' } } errorClasses.BadRequest_InvalidFilterParamError = BadRequest_InvalidFilterParamError
export class BadRequest_InvalidInputEncodingError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidInputEncodingError' } } errorClasses.BadRequest_InvalidInputEncodingError = BadRequest_InvalidInputEncodingError
export class BadRequest_InvalidInterfaceError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidInterfaceError' } } errorClasses.BadRequest_InvalidInterfaceError = BadRequest_InvalidInterfaceError
export class BadRequest_InvalidOauthProviderError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidOauthProviderError' } } errorClasses.BadRequest_InvalidOauthProviderError = BadRequest_InvalidOauthProviderError
export class BadRequest_InvalidPathError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidPathError' } } errorClasses.BadRequest_InvalidPathError = BadRequest_InvalidPathError
export class BadRequest_InvalidReturnToUrlError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidReturnToUrlError' } } errorClasses.BadRequest_InvalidReturnToUrlError = BadRequest_InvalidReturnToUrlError
export class BadRequest_InvalidUploadOffsetError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidUploadOffsetError' } } errorClasses.BadRequest_InvalidUploadOffsetError = BadRequest_InvalidUploadOffsetError
export class BadRequest_InvalidUploadPartGapError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidUploadPartGapError' } } errorClasses.BadRequest_InvalidUploadPartGapError = BadRequest_InvalidUploadPartGapError
export class BadRequest_InvalidUploadPartSizeError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_InvalidUploadPartSizeError' } } errorClasses.BadRequest_InvalidUploadPartSizeError = BadRequest_InvalidUploadPartSizeError
export class BadRequest_MethodNotAllowedError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_MethodNotAllowedError' } } errorClasses.BadRequest_MethodNotAllowedError = BadRequest_MethodNotAllowedError
export class BadRequest_NoValidInputParamsError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_NoValidInputParamsError' } } errorClasses.BadRequest_NoValidInputParamsError = BadRequest_NoValidInputParamsError
export class BadRequest_OperationOnNonScimResourceError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_OperationOnNonScimResourceError' } } errorClasses.BadRequest_OperationOnNonScimResourceError = BadRequest_OperationOnNonScimResourceError
export class BadRequest_PartNumberTooLargeError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_PartNumberTooLargeError' } } errorClasses.BadRequest_PartNumberTooLargeError = BadRequest_PartNumberTooLargeError
export class BadRequest_ReauthenticationNeededFieldsError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_ReauthenticationNeededFieldsError' } } errorClasses.BadRequest_ReauthenticationNeededFieldsError = BadRequest_ReauthenticationNeededFieldsError
export class BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError' } } errorClasses.BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError = BadRequest_RequestParamPathCannotHaveTrailingWhitespaceError
export class BadRequest_RequestParamsContainInvalidCharacterError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_RequestParamsContainInvalidCharacterError' } } errorClasses.BadRequest_RequestParamsContainInvalidCharacterError = BadRequest_RequestParamsContainInvalidCharacterError
export class BadRequest_RequestParamsInvalidError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_RequestParamsInvalidError' } } errorClasses.BadRequest_RequestParamsInvalidError = BadRequest_RequestParamsInvalidError
export class BadRequest_RequestParamsRequiredError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_RequestParamsRequiredError' } } errorClasses.BadRequest_RequestParamsRequiredError = BadRequest_RequestParamsRequiredError
export class BadRequest_SearchAllOnChildPathError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_SearchAllOnChildPathError' } } errorClasses.BadRequest_SearchAllOnChildPathError = BadRequest_SearchAllOnChildPathError
export class BadRequest_UnsupportedCurrencyError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_UnsupportedCurrencyError' } } errorClasses.BadRequest_UnsupportedCurrencyError = BadRequest_UnsupportedCurrencyError
export class BadRequest_UnsupportedHttpResponseFormatError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_UnsupportedHttpResponseFormatError' } } errorClasses.BadRequest_UnsupportedHttpResponseFormatError = BadRequest_UnsupportedHttpResponseFormatError
export class BadRequest_UnsupportedMediaTypeError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_UnsupportedMediaTypeError' } } errorClasses.BadRequest_UnsupportedMediaTypeError = BadRequest_UnsupportedMediaTypeError
export class BadRequest_UserIdInvalidError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_UserIdInvalidError' } } errorClasses.BadRequest_UserIdInvalidError = BadRequest_UserIdInvalidError
export class BadRequest_UserIdOnUserEndpointError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_UserIdOnUserEndpointError' } } errorClasses.BadRequest_UserIdOnUserEndpointError = BadRequest_UserIdOnUserEndpointError
export class BadRequest_UserRequiredError extends BadRequestError { constructor(message, code) { super(message, code); this.name = 'BadRequest_UserRequiredError' } } errorClasses.BadRequest_UserRequiredError = BadRequest_UserRequiredError
export class NotAuthenticated_AuthenticationRequiredError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_AuthenticationRequiredError' } } errorClasses.NotAuthenticated_AuthenticationRequiredError = NotAuthenticated_AuthenticationRequiredError
export class NotAuthenticated_BundleRegistrationCodeFailedError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_BundleRegistrationCodeFailedError' } } errorClasses.NotAuthenticated_BundleRegistrationCodeFailedError = NotAuthenticated_BundleRegistrationCodeFailedError
export class NotAuthenticated_FilesAgentTokenFailedError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_FilesAgentTokenFailedError' } } errorClasses.NotAuthenticated_FilesAgentTokenFailedError = NotAuthenticated_FilesAgentTokenFailedError
export class NotAuthenticated_InboxRegistrationCodeFailedError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_InboxRegistrationCodeFailedError' } } errorClasses.NotAuthenticated_InboxRegistrationCodeFailedError = NotAuthenticated_InboxRegistrationCodeFailedError
export class NotAuthenticated_InvalidCredentialsError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_InvalidCredentialsError' } } errorClasses.NotAuthenticated_InvalidCredentialsError = NotAuthenticated_InvalidCredentialsError
export class NotAuthenticated_InvalidOauthError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_InvalidOauthError' } } errorClasses.NotAuthenticated_InvalidOauthError = NotAuthenticated_InvalidOauthError
export class NotAuthenticated_InvalidOrExpiredCodeError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_InvalidOrExpiredCodeError' } } errorClasses.NotAuthenticated_InvalidOrExpiredCodeError = NotAuthenticated_InvalidOrExpiredCodeError
export class NotAuthenticated_InvalidUsernameOrPasswordError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_InvalidUsernameOrPasswordError' } } errorClasses.NotAuthenticated_InvalidUsernameOrPasswordError = NotAuthenticated_InvalidUsernameOrPasswordError
export class NotAuthenticated_LockedOutError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_LockedOutError' } } errorClasses.NotAuthenticated_LockedOutError = NotAuthenticated_LockedOutError
export class NotAuthenticated_LockoutRegionMismatchError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_LockoutRegionMismatchError' } } errorClasses.NotAuthenticated_LockoutRegionMismatchError = NotAuthenticated_LockoutRegionMismatchError
export class NotAuthenticated_OneTimePasswordIncorrectError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_OneTimePasswordIncorrectError' } } errorClasses.NotAuthenticated_OneTimePasswordIncorrectError = NotAuthenticated_OneTimePasswordIncorrectError
export class NotAuthenticated_TwoFactorAuthenticationErrorError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_TwoFactorAuthenticationErrorError' } } errorClasses.NotAuthenticated_TwoFactorAuthenticationErrorError = NotAuthenticated_TwoFactorAuthenticationErrorError
export class NotAuthenticated_TwoFactorAuthenticationSetupExpiredError extends NotAuthenticatedError { constructor(message, code) { super(message, code); this.name = 'NotAuthenticated_TwoFactorAuthenticationSetupExpiredError' } } errorClasses.NotAuthenticated_TwoFactorAuthenticationSetupExpiredError = NotAuthenticated_TwoFactorAuthenticationSetupExpiredError
export class NotAuthorized_ApiKeyIsDisabledError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ApiKeyIsDisabledError' } } errorClasses.NotAuthorized_ApiKeyIsDisabledError = NotAuthorized_ApiKeyIsDisabledError
export class NotAuthorized_ApiKeyIsPathRestrictedError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ApiKeyIsPathRestrictedError' } } errorClasses.NotAuthorized_ApiKeyIsPathRestrictedError = NotAuthorized_ApiKeyIsPathRestrictedError
export class NotAuthorized_ApiKeyOnlyForDesktopAppError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ApiKeyOnlyForDesktopAppError' } } errorClasses.NotAuthorized_ApiKeyOnlyForDesktopAppError = NotAuthorized_ApiKeyOnlyForDesktopAppError
export class NotAuthorized_ApiKeyOnlyForMobileAppError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ApiKeyOnlyForMobileAppError' } } errorClasses.NotAuthorized_ApiKeyOnlyForMobileAppError = NotAuthorized_ApiKeyOnlyForMobileAppError
export class NotAuthorized_ApiKeyOnlyForOfficeIntegrationError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ApiKeyOnlyForOfficeIntegrationError' } } errorClasses.NotAuthorized_ApiKeyOnlyForOfficeIntegrationError = NotAuthorized_ApiKeyOnlyForOfficeIntegrationError
export class NotAuthorized_BillingPermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_BillingPermissionRequiredError' } } errorClasses.NotAuthorized_BillingPermissionRequiredError = NotAuthorized_BillingPermissionRequiredError
export class NotAuthorized_BundleMaximumUsesReachedError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_BundleMaximumUsesReachedError' } } errorClasses.NotAuthorized_BundleMaximumUsesReachedError = NotAuthorized_BundleMaximumUsesReachedError
export class NotAuthorized_CannotLoginWhileUsingKeyError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_CannotLoginWhileUsingKeyError' } } errorClasses.NotAuthorized_CannotLoginWhileUsingKeyError = NotAuthorized_CannotLoginWhileUsingKeyError
export class NotAuthorized_CantActForOtherUserError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_CantActForOtherUserError' } } errorClasses.NotAuthorized_CantActForOtherUserError = NotAuthorized_CantActForOtherUserError
export class NotAuthorized_ContactAdminForPasswordChangeHelpError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ContactAdminForPasswordChangeHelpError' } } errorClasses.NotAuthorized_ContactAdminForPasswordChangeHelpError = NotAuthorized_ContactAdminForPasswordChangeHelpError
export class NotAuthorized_FolderAdminOrBillingPermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_FolderAdminOrBillingPermissionRequiredError' } } errorClasses.NotAuthorized_FolderAdminOrBillingPermissionRequiredError = NotAuthorized_FolderAdminOrBillingPermissionRequiredError
export class NotAuthorized_FolderAdminPermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_FolderAdminPermissionRequiredError' } } errorClasses.NotAuthorized_FolderAdminPermissionRequiredError = NotAuthorized_FolderAdminPermissionRequiredError
export class NotAuthorized_FullPermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_FullPermissionRequiredError' } } errorClasses.NotAuthorized_FullPermissionRequiredError = NotAuthorized_FullPermissionRequiredError
export class NotAuthorized_HistoryPermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_HistoryPermissionRequiredError' } } errorClasses.NotAuthorized_HistoryPermissionRequiredError = NotAuthorized_HistoryPermissionRequiredError
export class NotAuthorized_InsufficientPermissionForParamsError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_InsufficientPermissionForParamsError' } } errorClasses.NotAuthorized_InsufficientPermissionForParamsError = NotAuthorized_InsufficientPermissionForParamsError
export class NotAuthorized_MustAuthenticateWithApiKeyError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_MustAuthenticateWithApiKeyError' } } errorClasses.NotAuthorized_MustAuthenticateWithApiKeyError = NotAuthorized_MustAuthenticateWithApiKeyError
export class NotAuthorized_NeedAdminPermissionForInboxError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_NeedAdminPermissionForInboxError' } } errorClasses.NotAuthorized_NeedAdminPermissionForInboxError = NotAuthorized_NeedAdminPermissionForInboxError
export class NotAuthorized_NonAdminsMustQueryByFolderOrPathError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_NonAdminsMustQueryByFolderOrPathError' } } errorClasses.NotAuthorized_NonAdminsMustQueryByFolderOrPathError = NotAuthorized_NonAdminsMustQueryByFolderOrPathError
export class NotAuthorized_NotAllowedToCreateBundleError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_NotAllowedToCreateBundleError' } } errorClasses.NotAuthorized_NotAllowedToCreateBundleError = NotAuthorized_NotAllowedToCreateBundleError
export class NotAuthorized_PasswordChangeNotRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_PasswordChangeNotRequiredError' } } errorClasses.NotAuthorized_PasswordChangeNotRequiredError = NotAuthorized_PasswordChangeNotRequiredError
export class NotAuthorized_PasswordChangeRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_PasswordChangeRequiredError' } } errorClasses.NotAuthorized_PasswordChangeRequiredError = NotAuthorized_PasswordChangeRequiredError
export class NotAuthorized_ReadOnlySessionError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ReadOnlySessionError' } } errorClasses.NotAuthorized_ReadOnlySessionError = NotAuthorized_ReadOnlySessionError
export class NotAuthorized_ReadPermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ReadPermissionRequiredError' } } errorClasses.NotAuthorized_ReadPermissionRequiredError = NotAuthorized_ReadPermissionRequiredError
export class NotAuthorized_ReauthenticationFailedError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ReauthenticationFailedError' } } errorClasses.NotAuthorized_ReauthenticationFailedError = NotAuthorized_ReauthenticationFailedError
export class NotAuthorized_ReauthenticationFailedFinalError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ReauthenticationFailedFinalError' } } errorClasses.NotAuthorized_ReauthenticationFailedFinalError = NotAuthorized_ReauthenticationFailedFinalError
export class NotAuthorized_ReauthenticationNeededActionError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ReauthenticationNeededActionError' } } errorClasses.NotAuthorized_ReauthenticationNeededActionError = NotAuthorized_ReauthenticationNeededActionError
export class NotAuthorized_SelfManagedRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_SelfManagedRequiredError' } } errorClasses.NotAuthorized_SelfManagedRequiredError = NotAuthorized_SelfManagedRequiredError
export class NotAuthorized_SiteAdminRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_SiteAdminRequiredError' } } errorClasses.NotAuthorized_SiteAdminRequiredError = NotAuthorized_SiteAdminRequiredError
export class NotAuthorized_SiteFilesAreImmutableError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_SiteFilesAreImmutableError' } } errorClasses.NotAuthorized_SiteFilesAreImmutableError = NotAuthorized_SiteFilesAreImmutableError
export class NotAuthorized_TwoFactorAuthenticationRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_TwoFactorAuthenticationRequiredError' } } errorClasses.NotAuthorized_TwoFactorAuthenticationRequiredError = NotAuthorized_TwoFactorAuthenticationRequiredError
export class NotAuthorized_UserIdWithoutSiteAdminError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_UserIdWithoutSiteAdminError' } } errorClasses.NotAuthorized_UserIdWithoutSiteAdminError = NotAuthorized_UserIdWithoutSiteAdminError
export class NotAuthorized_WriteAndBundlePermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_WriteAndBundlePermissionRequiredError' } } errorClasses.NotAuthorized_WriteAndBundlePermissionRequiredError = NotAuthorized_WriteAndBundlePermissionRequiredError
export class NotAuthorized_WritePermissionRequiredError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_WritePermissionRequiredError' } } errorClasses.NotAuthorized_WritePermissionRequiredError = NotAuthorized_WritePermissionRequiredError
export class NotAuthorized_ZipDownloadIpMismatchError extends NotAuthorizedError { constructor(message, code) { super(message, code); this.name = 'NotAuthorized_ZipDownloadIpMismatchError' } } errorClasses.NotAuthorized_ZipDownloadIpMismatchError = NotAuthorized_ZipDownloadIpMismatchError
export class NotFound_ApiKeyNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_ApiKeyNotFoundError' } } errorClasses.NotFound_ApiKeyNotFoundError = NotFound_ApiKeyNotFoundError
export class NotFound_BundlePathNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_BundlePathNotFoundError' } } errorClasses.NotFound_BundlePathNotFoundError = NotFound_BundlePathNotFoundError
export class NotFound_BundleRegistrationNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_BundleRegistrationNotFoundError' } } errorClasses.NotFound_BundleRegistrationNotFoundError = NotFound_BundleRegistrationNotFoundError
export class NotFound_CodeNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_CodeNotFoundError' } } errorClasses.NotFound_CodeNotFoundError = NotFound_CodeNotFoundError
export class NotFound_FileNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_FileNotFoundError' } } errorClasses.NotFound_FileNotFoundError = NotFound_FileNotFoundError
export class NotFound_FileUploadNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_FileUploadNotFoundError' } } errorClasses.NotFound_FileUploadNotFoundError = NotFound_FileUploadNotFoundError
export class NotFound_FolderNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_FolderNotFoundError' } } errorClasses.NotFound_FolderNotFoundError = NotFound_FolderNotFoundError
export class NotFound_GroupNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_GroupNotFoundError' } } errorClasses.NotFound_GroupNotFoundError = NotFound_GroupNotFoundError
export class NotFound_InboxNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_InboxNotFoundError' } } errorClasses.NotFound_InboxNotFoundError = NotFound_InboxNotFoundError
export class NotFound_NestedNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_NestedNotFoundError' } } errorClasses.NotFound_NestedNotFoundError = NotFound_NestedNotFoundError
export class NotFound_PlanNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_PlanNotFoundError' } } errorClasses.NotFound_PlanNotFoundError = NotFound_PlanNotFoundError
export class NotFound_SiteNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_SiteNotFoundError' } } errorClasses.NotFound_SiteNotFoundError = NotFound_SiteNotFoundError
export class NotFound_UserNotFoundError extends NotFoundError { constructor(message, code) { super(message, code); this.name = 'NotFound_UserNotFoundError' } } errorClasses.NotFound_UserNotFoundError = NotFound_UserNotFoundError
export class ProcessingFailure_AutomationCannotBeRunManuallyError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_AutomationCannotBeRunManuallyError' } } errorClasses.ProcessingFailure_AutomationCannotBeRunManuallyError = ProcessingFailure_AutomationCannotBeRunManuallyError
export class ProcessingFailure_BundleOnlyAllowsPreviewsError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_BundleOnlyAllowsPreviewsError' } } errorClasses.ProcessingFailure_BundleOnlyAllowsPreviewsError = ProcessingFailure_BundleOnlyAllowsPreviewsError
export class ProcessingFailure_BundleOperationRequiresSubfolderError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_BundleOperationRequiresSubfolderError' } } errorClasses.ProcessingFailure_BundleOperationRequiresSubfolderError = ProcessingFailure_BundleOperationRequiresSubfolderError
export class ProcessingFailure_CouldNotCreateParentError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_CouldNotCreateParentError' } } errorClasses.ProcessingFailure_CouldNotCreateParentError = ProcessingFailure_CouldNotCreateParentError
export class ProcessingFailure_DestinationExistsError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_DestinationExistsError' } } errorClasses.ProcessingFailure_DestinationExistsError = ProcessingFailure_DestinationExistsError
export class ProcessingFailure_DestinationFolderLimitedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_DestinationFolderLimitedError' } } errorClasses.ProcessingFailure_DestinationFolderLimitedError = ProcessingFailure_DestinationFolderLimitedError
export class ProcessingFailure_DestinationParentConflictError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_DestinationParentConflictError' } } errorClasses.ProcessingFailure_DestinationParentConflictError = ProcessingFailure_DestinationParentConflictError
export class ProcessingFailure_DestinationParentDoesNotExistError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_DestinationParentDoesNotExistError' } } errorClasses.ProcessingFailure_DestinationParentDoesNotExistError = ProcessingFailure_DestinationParentDoesNotExistError
export class ProcessingFailure_ExpiredPrivateKeyError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_ExpiredPrivateKeyError' } } errorClasses.ProcessingFailure_ExpiredPrivateKeyError = ProcessingFailure_ExpiredPrivateKeyError
export class ProcessingFailure_ExpiredPublicKeyError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_ExpiredPublicKeyError' } } errorClasses.ProcessingFailure_ExpiredPublicKeyError = ProcessingFailure_ExpiredPublicKeyError
export class ProcessingFailure_ExportFailureError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_ExportFailureError' } } errorClasses.ProcessingFailure_ExportFailureError = ProcessingFailure_ExportFailureError
export class ProcessingFailure_ExportNotReadyError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_ExportNotReadyError' } } errorClasses.ProcessingFailure_ExportNotReadyError = ProcessingFailure_ExportNotReadyError
export class ProcessingFailure_FailedToChangePasswordError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FailedToChangePasswordError' } } errorClasses.ProcessingFailure_FailedToChangePasswordError = ProcessingFailure_FailedToChangePasswordError
export class ProcessingFailure_FileLockedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FileLockedError' } } errorClasses.ProcessingFailure_FileLockedError = ProcessingFailure_FileLockedError
export class ProcessingFailure_FileNotUploadedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FileNotUploadedError' } } errorClasses.ProcessingFailure_FileNotUploadedError = ProcessingFailure_FileNotUploadedError
export class ProcessingFailure_FilePendingProcessingError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FilePendingProcessingError' } } errorClasses.ProcessingFailure_FilePendingProcessingError = ProcessingFailure_FilePendingProcessingError
export class ProcessingFailure_FileTooBigToDecryptError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FileTooBigToDecryptError' } } errorClasses.ProcessingFailure_FileTooBigToDecryptError = ProcessingFailure_FileTooBigToDecryptError
export class ProcessingFailure_FileTooBigToEncryptError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FileTooBigToEncryptError' } } errorClasses.ProcessingFailure_FileTooBigToEncryptError = ProcessingFailure_FileTooBigToEncryptError
export class ProcessingFailure_FileUploadedToWrongRegionError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FileUploadedToWrongRegionError' } } errorClasses.ProcessingFailure_FileUploadedToWrongRegionError = ProcessingFailure_FileUploadedToWrongRegionError
export class ProcessingFailure_FolderLockedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FolderLockedError' } } errorClasses.ProcessingFailure_FolderLockedError = ProcessingFailure_FolderLockedError
export class ProcessingFailure_FolderNotEmptyError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_FolderNotEmptyError' } } errorClasses.ProcessingFailure_FolderNotEmptyError = ProcessingFailure_FolderNotEmptyError
export class ProcessingFailure_HistoryUnavailableError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_HistoryUnavailableError' } } errorClasses.ProcessingFailure_HistoryUnavailableError = ProcessingFailure_HistoryUnavailableError
export class ProcessingFailure_InvalidBundleCodeError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_InvalidBundleCodeError' } } errorClasses.ProcessingFailure_InvalidBundleCodeError = ProcessingFailure_InvalidBundleCodeError
export class ProcessingFailure_InvalidFileTypeError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_InvalidFileTypeError' } } errorClasses.ProcessingFailure_InvalidFileTypeError = ProcessingFailure_InvalidFileTypeError
export class ProcessingFailure_InvalidFilenameError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_InvalidFilenameError' } } errorClasses.ProcessingFailure_InvalidFilenameError = ProcessingFailure_InvalidFilenameError
export class ProcessingFailure_InvalidRangeError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_InvalidRangeError' } } errorClasses.ProcessingFailure_InvalidRangeError = ProcessingFailure_InvalidRangeError
export class ProcessingFailure_ModelSaveErrorError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_ModelSaveErrorError' } } errorClasses.ProcessingFailure_ModelSaveErrorError = ProcessingFailure_ModelSaveErrorError
export class ProcessingFailure_MultipleProcessingErrorsError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_MultipleProcessingErrorsError' } } errorClasses.ProcessingFailure_MultipleProcessingErrorsError = ProcessingFailure_MultipleProcessingErrorsError
export class ProcessingFailure_PathTooLongError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_PathTooLongError' } } errorClasses.ProcessingFailure_PathTooLongError = ProcessingFailure_PathTooLongError
export class ProcessingFailure_RecipientAlreadySharedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_RecipientAlreadySharedError' } } errorClasses.ProcessingFailure_RecipientAlreadySharedError = ProcessingFailure_RecipientAlreadySharedError
export class ProcessingFailure_RemoteServerErrorError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_RemoteServerErrorError' } } errorClasses.ProcessingFailure_RemoteServerErrorError = ProcessingFailure_RemoteServerErrorError
export class ProcessingFailure_ResourceLockedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_ResourceLockedError' } } errorClasses.ProcessingFailure_ResourceLockedError = ProcessingFailure_ResourceLockedError
export class ProcessingFailure_SubfolderLockedError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_SubfolderLockedError' } } errorClasses.ProcessingFailure_SubfolderLockedError = ProcessingFailure_SubfolderLockedError
export class ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError' } } errorClasses.ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError = ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError
export class ProcessingFailure_UpdatesNotAllowedForRemotesError extends ProcessingFailureError { constructor(message, code) { super(message, code); this.name = 'ProcessingFailure_UpdatesNotAllowedForRemotesError' } } errorClasses.ProcessingFailure_UpdatesNotAllowedForRemotesError = ProcessingFailure_UpdatesNotAllowedForRemotesError
export class RateLimited_DuplicateShareRecipientError extends RateLimitedError { constructor(message, code) { super(message, code); this.name = 'RateLimited_DuplicateShareRecipientError' } } errorClasses.RateLimited_DuplicateShareRecipientError = RateLimited_DuplicateShareRecipientError
export class RateLimited_ReauthenticationRateLimitedError extends RateLimitedError { constructor(message, code) { super(message, code); this.name = 'RateLimited_ReauthenticationRateLimitedError' } } errorClasses.RateLimited_ReauthenticationRateLimitedError = RateLimited_ReauthenticationRateLimitedError
export class RateLimited_TooManyConcurrentRequestsError extends RateLimitedError { constructor(message, code) { super(message, code); this.name = 'RateLimited_TooManyConcurrentRequestsError' } } errorClasses.RateLimited_TooManyConcurrentRequestsError = RateLimited_TooManyConcurrentRequestsError
export class RateLimited_TooManyLoginAttemptsError extends RateLimitedError { constructor(message, code) { super(message, code); this.name = 'RateLimited_TooManyLoginAttemptsError' } } errorClasses.RateLimited_TooManyLoginAttemptsError = RateLimited_TooManyLoginAttemptsError
export class RateLimited_TooManyRequestsError extends RateLimitedError { constructor(message, code) { super(message, code); this.name = 'RateLimited_TooManyRequestsError' } } errorClasses.RateLimited_TooManyRequestsError = RateLimited_TooManyRequestsError
export class RateLimited_TooManySharesError extends RateLimitedError { constructor(message, code) { super(message, code); this.name = 'RateLimited_TooManySharesError' } } errorClasses.RateLimited_TooManySharesError = RateLimited_TooManySharesError
export class ServiceUnavailable_UploadsUnavailableError extends ServiceUnavailableError { constructor(message, code) { super(message, code); this.name = 'ServiceUnavailable_UploadsUnavailableError' } } errorClasses.ServiceUnavailable_UploadsUnavailableError = ServiceUnavailable_UploadsUnavailableError
export class SiteConfiguration_AccountAlreadyExistsError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_AccountAlreadyExistsError' } } errorClasses.SiteConfiguration_AccountAlreadyExistsError = SiteConfiguration_AccountAlreadyExistsError
export class SiteConfiguration_AccountOverdueError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_AccountOverdueError' } } errorClasses.SiteConfiguration_AccountOverdueError = SiteConfiguration_AccountOverdueError
export class SiteConfiguration_NoAccountForSiteError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_NoAccountForSiteError' } } errorClasses.SiteConfiguration_NoAccountForSiteError = SiteConfiguration_NoAccountForSiteError
export class SiteConfiguration_SiteWasRemovedError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_SiteWasRemovedError' } } errorClasses.SiteConfiguration_SiteWasRemovedError = SiteConfiguration_SiteWasRemovedError
export class SiteConfiguration_TrialExpiredError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_TrialExpiredError' } } errorClasses.SiteConfiguration_TrialExpiredError = SiteConfiguration_TrialExpiredError
export class SiteConfiguration_TrialLockedError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_TrialLockedError' } } errorClasses.SiteConfiguration_TrialLockedError = SiteConfiguration_TrialLockedError
export class SiteConfiguration_UserRequestsEnabledRequiredError extends SiteConfigurationError { constructor(message, code) { super(message, code); this.name = 'SiteConfiguration_UserRequestsEnabledRequiredError' } } errorClasses.SiteConfiguration_UserRequestsEnabledRequiredError = SiteConfiguration_UserRequestsEnabledRequiredError
