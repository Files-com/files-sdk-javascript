# Errors

There are many custom `Error` classes defined by this SDK that you can test against in your code.

The library of errors can be imported as follows:

`import * as errors from 'files.com/lib/Errors'`

If using `require()` you can import using the following (note the lack of `.default`):

`const errors = require('files.com/lib/Errors')`

## Core Errors

### FilesError

This is the base class for all other errors defined by this SDK. It is never thrown directly.

### FilesApiError

This is the base class for failed API requests. Its properties include the message text and `code` associated with the network response.

## General Errors

The following errors may be thrown for general failures not related to an API request.

### ConfigurationError
### EmptyPropertyError
### InvalidParameterError
### MissingParameterError
### NotImplementedError

## API Error Groups

Each of these error classes is used as the base class for each associated error. These errors are never thrown directly.

### BadRequestError
### NotAuthenticatedError
### NotAuthorizedError
### NotFoundError
### ProcessingFailureError
### RateLimitedError
### ServiceUnavailableError
### SiteConfigurationError

## Grouped API Errors

These errors are derived from the error groups listed above.

### BadRequest_AgentUpgradeRequiredError
### BadRequest_AttachmentTooLargeError
### BadRequest_CannotDownloadDirectoryError
### BadRequest_CantMoveWithMultipleLocationsError
### BadRequest_DatetimeParseError
### BadRequest_DestinationSameError
### BadRequest_DoesNotSupportSortingError
### BadRequest_FolderMustNotBeAFileError
### BadRequest_FoldersNotAllowedError
### BadRequest_InvalidBodyError
### BadRequest_InvalidCursorError
### BadRequest_InvalidCursorTypeForSortError
### BadRequest_InvalidEtagsError
### BadRequest_InvalidFilterAliasCombinationError
### BadRequest_InvalidFilterFieldError
### BadRequest_InvalidFilterParamError
### BadRequest_InvalidFilterParamFormatError
### BadRequest_InvalidFilterParamValueError
### BadRequest_InvalidInputEncodingError
### BadRequest_InvalidInterfaceError
### BadRequest_InvalidOauthProviderError
### BadRequest_InvalidPathError
### BadRequest_InvalidReturnToUrlError
### BadRequest_InvalidSortFieldError
### BadRequest_InvalidSortFilterCombinationError
### BadRequest_InvalidUploadOffsetError
### BadRequest_InvalidUploadPartGapError
### BadRequest_InvalidUploadPartSizeError
### BadRequest_MethodNotAllowedError
### BadRequest_MultipleSortParamsNotAllowedError
### BadRequest_NoValidInputParamsError
### BadRequest_PartNumberTooLargeError
### BadRequest_PathCannotHaveTrailingWhitespaceError
### BadRequest_ReauthenticationNeededFieldsError
### BadRequest_RequestParamsContainInvalidCharacterError
### BadRequest_RequestParamsInvalidError
### BadRequest_RequestParamsRequiredError
### BadRequest_SearchAllOnChildPathError
### BadRequest_UnrecognizedSortIndexError
### BadRequest_UnsupportedCurrencyError
### BadRequest_UnsupportedHttpResponseFormatError
### BadRequest_UnsupportedMediaTypeError
### BadRequest_UserIdInvalidError
### BadRequest_UserIdOnUserEndpointError
### BadRequest_UserRequiredError
### NotAuthenticated_AdditionalAuthenticationRequiredError
### NotAuthenticated_ApiKeySessionsNotSupportedError
### NotAuthenticated_AuthenticationRequiredError
### NotAuthenticated_BundleRegistrationCodeFailedError
### NotAuthenticated_FilesAgentTokenFailedError
### NotAuthenticated_InboxRegistrationCodeFailedError
### NotAuthenticated_InvalidCredentialsError
### NotAuthenticated_InvalidOauthError
### NotAuthenticated_InvalidOrExpiredCodeError
### NotAuthenticated_InvalidSessionError
### NotAuthenticated_InvalidUsernameOrPasswordError
### NotAuthenticated_LockedOutError
### NotAuthenticated_LockoutRegionMismatchError
### NotAuthenticated_OneTimePasswordIncorrectError
### NotAuthenticated_TwoFactorAuthenticationErrorError
### NotAuthenticated_TwoFactorAuthenticationSetupExpiredError
### NotAuthorized_ApiKeyIsDisabledError
### NotAuthorized_ApiKeyIsPathRestrictedError
### NotAuthorized_ApiKeyOnlyForDesktopAppError
### NotAuthorized_ApiKeyOnlyForMobileAppError
### NotAuthorized_ApiKeyOnlyForOfficeIntegrationError
### NotAuthorized_BillingOrSiteAdminPermissionRequiredError
### NotAuthorized_BillingPermissionRequiredError
### NotAuthorized_BundleMaximumUsesReachedError
### NotAuthorized_BundlePermissionRequiredError
### NotAuthorized_CannotLoginWhileUsingKeyError
### NotAuthorized_CantActForOtherUserError
### NotAuthorized_ContactAdminForPasswordChangeHelpError
### NotAuthorized_FilesAgentFailedAuthorizationError
### NotAuthorized_FolderAdminOrBillingPermissionRequiredError
### NotAuthorized_FolderAdminPermissionRequiredError
### NotAuthorized_FullPermissionRequiredError
### NotAuthorized_HistoryPermissionRequiredError
### NotAuthorized_InsufficientPermissionForParamsError
### NotAuthorized_InsufficientPermissionForSiteError
### NotAuthorized_MoverAccessDeniedError
### NotAuthorized_MoverPackageRequiredError
### NotAuthorized_MustAuthenticateWithApiKeyError
### NotAuthorized_NeedAdminPermissionForInboxError
### NotAuthorized_NonAdminsMustQueryByFolderOrPathError
### NotAuthorized_NotAllowedToCreateBundleError
### NotAuthorized_NotEnqueuableSyncError
### NotAuthorized_PasswordChangeNotRequiredError
### NotAuthorized_PasswordChangeRequiredError
### NotAuthorized_PaymentMethodErrorError
### NotAuthorized_ReadOnlySessionError
### NotAuthorized_ReadPermissionRequiredError
### NotAuthorized_ReauthenticationFailedError
### NotAuthorized_ReauthenticationFailedFinalError
### NotAuthorized_ReauthenticationNeededActionError
### NotAuthorized_RecaptchaFailedError
### NotAuthorized_SelfManagedRequiredError
### NotAuthorized_SiteAdminRequiredError
### NotAuthorized_SiteFilesAreImmutableError
### NotAuthorized_TwoFactorAuthenticationRequiredError
### NotAuthorized_UserIdWithoutSiteAdminError
### NotAuthorized_WriteAndBundlePermissionRequiredError
### NotAuthorized_WritePermissionRequiredError
### NotFound_ApiKeyNotFoundError
### NotFound_BundlePathNotFoundError
### NotFound_BundleRegistrationNotFoundError
### NotFound_CodeNotFoundError
### NotFound_FileNotFoundError
### NotFound_FileUploadNotFoundError
### NotFound_GroupNotFoundError
### NotFound_InboxNotFoundError
### NotFound_NestedNotFoundError
### NotFound_PlanNotFoundError
### NotFound_SiteNotFoundError
### NotFound_UserNotFoundError
### ProcessingFailure_AgentUnavailableError
### ProcessingFailure_AlreadyCompletedError
### ProcessingFailure_AutomationCannotBeRunManuallyError
### ProcessingFailure_BehaviorNotAllowedOnRemoteServerError
### ProcessingFailure_BundleOnlyAllowsPreviewsError
### ProcessingFailure_BundleOperationRequiresSubfolderError
### ProcessingFailure_CouldNotCreateParentError
### ProcessingFailure_DestinationExistsError
### ProcessingFailure_DestinationFolderLimitedError
### ProcessingFailure_DestinationParentConflictError
### ProcessingFailure_DestinationParentDoesNotExistError
### ProcessingFailure_ExceededRuntimeLimitError
### ProcessingFailure_ExpiredPrivateKeyError
### ProcessingFailure_ExpiredPublicKeyError
### ProcessingFailure_ExportFailureError
### ProcessingFailure_ExportNotReadyError
### ProcessingFailure_FailedToChangePasswordError
### ProcessingFailure_FileLockedError
### ProcessingFailure_FileNotUploadedError
### ProcessingFailure_FilePendingProcessingError
### ProcessingFailure_FileProcessingErrorError
### ProcessingFailure_FileTooBigToDecryptError
### ProcessingFailure_FileTooBigToEncryptError
### ProcessingFailure_FileUploadedToWrongRegionError
### ProcessingFailure_FilenameTooLongError
### ProcessingFailure_FolderLockedError
### ProcessingFailure_FolderNotEmptyError
### ProcessingFailure_HistoryUnavailableError
### ProcessingFailure_InvalidBundleCodeError
### ProcessingFailure_InvalidFileTypeError
### ProcessingFailure_InvalidFilenameError
### ProcessingFailure_InvalidPriorityColorError
### ProcessingFailure_InvalidRangeError
### ProcessingFailure_InvalidSiteError
### ProcessingFailure_ModelSaveErrorError
### ProcessingFailure_MultipleProcessingErrorsError
### ProcessingFailure_PathTooLongError
### ProcessingFailure_RecipientAlreadySharedError
### ProcessingFailure_RemoteServerErrorError
### ProcessingFailure_ResourceBelongsToParentSiteError
### ProcessingFailure_ResourceLockedError
### ProcessingFailure_SubfolderLockedError
### ProcessingFailure_SyncInProgressError
### ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError
### ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError
### ProcessingFailure_TwoFactorAuthenticationGeneralErrorError
### ProcessingFailure_TwoFactorAuthenticationMethodUnsupportedErrorError
### ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError
### ProcessingFailure_UpdatesNotAllowedForRemotesError
### RateLimited_DuplicateShareRecipientError
### RateLimited_ReauthenticationRateLimitedError
### RateLimited_TooManyConcurrentLoginsError
### RateLimited_TooManyConcurrentRequestsError
### RateLimited_TooManyLoginAttemptsError
### RateLimited_TooManyRequestsError
### RateLimited_TooManySharesError
### ServiceUnavailable_AutomationsUnavailableError
### ServiceUnavailable_MigrationInProgressError
### ServiceUnavailable_SiteDisabledError
### ServiceUnavailable_UploadsUnavailableError
### SiteConfiguration_AccountAlreadyExistsError
### SiteConfiguration_AccountOverdueError
### SiteConfiguration_NoAccountForSiteError
### SiteConfiguration_SiteWasRemovedError
### SiteConfiguration_TrialExpiredError
### SiteConfiguration_TrialLockedError
### SiteConfiguration_UserRequestsEnabledRequiredError
