import Files from './Files'

/**
 * An error of the SDK: a failed API response (a `FilesApiError`), or an error the SDK itself detects, such as an
 * invalid parameter or a request that failed or timed out. A download's errors, and those of its stream, can be other
 * values.
 */
export declare class FilesError extends Error {
  constructor(message?: string, code?: number)

  /**
   * The HTTP status of the failed response the error comes from, or 0 if it had none; undefined for an error that
   * does not come from a response.
   */
  code: number | undefined

  /**
   * A lockout region mismatch the SDK did not follow, when the error is one: the typed
   * `not-authenticated/lockout-region-mismatch` error, or a `FilesError` for the legacy plain-text one. Absent for any
   * other error (see `Files.NetworkOptions.followRegionMismatch`).
   */
  regionMismatch?: Files.RegionMismatch

  /**
   * Set on the error an upload fails with when the request that completes it failed. `true` when that failure leaves it
   * unknown whether the upload completed, as a server error, a timeout, a broken connection, or a failure or 429 after
   * the API answered with a redirect does: the request is not sent again, and the file may or may not be at its
   * destination, so check it before uploading again. `false` when the API refused the completion outright, with a 4xx
   * other than 429. Absent for any other error; its absence never shows that an upload completed.
   */
  completionUnknown?: boolean

  /**
   * Set only on a `FilesError` that `FileAction.waitForCompletion()` makes itself: for a File Migration that failed or
   * was cancelled, a status or answer that cannot confirm completion, or its `timeoutMs` running out. It is the action as
   * the API reported it, such as its `status` and `file_migration_id`. Absent for any other error, those the wait passes
   * on as they came included: a poll's own failure and an invalid option's `InvalidParameterError`.
   */
  fileAction?: { [field: string]: unknown; status?: unknown; file_migration_id?: unknown }

  /**
   * Set beside `fileAction` once the wait has taken a poll's answer before the error: the File Migration's data as last
   * taken, such as its `status` and `failure_message`.
   */
  fileMigration?: unknown
}

/** A failed API response, with the error details the API returned. */
export declare class FilesApiError extends FilesError {
  constructor(message?: string, code?: number, errorData?: ApiErrorData)

  /** The API's error type, such as `'not-authenticated/invalid-credentials'`. */
  type?: string

  title?: string

  /** The error message. */
  error?: string

  detail?: string

  httpCode?: number

  instance?: string

  errors?: unknown

  modelErrors?: unknown

  data?: unknown
}

/** An API error response body, as the API returns it. */
export interface ApiErrorData {
  type?: string
  title?: string
  error?: string
  detail?: string
  'http-code'?: number
  instance?: string
  errors?: unknown
  'model-errors'?: unknown
  data?: unknown
}

/** What `handleErrorResponse()` reads: a failed response, as `Api` normalizes it, or an error with a message. */
export interface ErrorResponseSource {
  message?: unknown
  response?: { data?: unknown; status?: number; statusText?: string; reason?: string } | null | undefined
}

/** Throws the error for a failed request: the API error class for the response's error type, otherwise a `FilesError`. */
export declare function handleErrorResponse(error: ErrorResponseSource): never

// general errors

/** The SDK's configuration is missing or invalid, such as a missing API key. */
export declare class ConfigurationError extends FilesError {
  constructor(message?: string)
}

/** An object is missing a property that a method needs, such as its `path`. */
export declare class EmptyPropertyError extends FilesError {
  constructor(message?: string)
}

/** A parameter has the wrong type. */
export declare class InvalidParameterError extends FilesError {
  constructor(message?: string)
}

/** A required parameter is missing. */
export declare class MissingParameterError extends FilesError {
  constructor(message?: string)
}

/** The operation is not available, such as a disk transfer in a browser. */
export declare class NotImplementedError extends FilesError {
  constructor(message?: string)
}

// api error groups

/** Bad Request */
export declare class BadRequestError extends FilesApiError {}

export declare class NotAuthenticatedError extends FilesApiError {}

export declare class NotAuthorizedError extends FilesApiError {}

/** Not Found */
export declare class NotFoundError extends FilesApiError {}

/** Processing Failure */
export declare class ProcessingFailureError extends FilesApiError {}

export declare class RateLimitedError extends FilesApiError {}

export declare class ServiceUnavailableError extends FilesApiError {}

export declare class SiteConfigurationError extends FilesApiError {}

// grouped api errors

/** Agent Upgrade Required */
export declare class BadRequest_AgentUpgradeRequiredError extends BadRequestError {}

/** Attachment Too Large */
export declare class BadRequest_AttachmentTooLargeError extends BadRequestError {}

/** Cannot Download Directory */
export declare class BadRequest_CannotDownloadDirectoryError extends BadRequestError {}

/** Cant Move With Multiple Locations */
export declare class BadRequest_CantMoveWithMultipleLocationsError extends BadRequestError {}

/** Datetime Parse */
export declare class BadRequest_DatetimeParseError extends BadRequestError {}

/** Destination Same */
export declare class BadRequest_DestinationSameError extends BadRequestError {}

/** Destination Site Mismatch */
export declare class BadRequest_DestinationSiteMismatchError extends BadRequestError {}

/** Does Not Support Sorting */
export declare class BadRequest_DoesNotSupportSortingError extends BadRequestError {}

/** Folder Must Not Be A File */
export declare class BadRequest_FolderMustNotBeAFileError extends BadRequestError {}

/** Folders Not Allowed */
export declare class BadRequest_FoldersNotAllowedError extends BadRequestError {}

/** Internal General Error */
export declare class BadRequest_InternalGeneralErrorError extends BadRequestError {}

/** Invalid Body */
export declare class BadRequest_InvalidBodyError extends BadRequestError {}

/** Invalid Cursor */
export declare class BadRequest_InvalidCursorError extends BadRequestError {}

/** Invalid Cursor Type For Sort */
export declare class BadRequest_InvalidCursorTypeForSortError extends BadRequestError {}

/** Invalid Etags */
export declare class BadRequest_InvalidEtagsError extends BadRequestError {}

/** Invalid Filter Alias Combination */
export declare class BadRequest_InvalidFilterAliasCombinationError extends BadRequestError {}

/** Invalid Filter Field */
export declare class BadRequest_InvalidFilterFieldError extends BadRequestError {}

/** Invalid Filter Param */
export declare class BadRequest_InvalidFilterParamError extends BadRequestError {}

/** Invalid Filter Param Format */
export declare class BadRequest_InvalidFilterParamFormatError extends BadRequestError {}

/** Invalid Filter Param Value */
export declare class BadRequest_InvalidFilterParamValueError extends BadRequestError {}

/** Invalid Input Encoding */
export declare class BadRequest_InvalidInputEncodingError extends BadRequestError {}

/** Invalid Interface */
export declare class BadRequest_InvalidInterfaceError extends BadRequestError {}

/** Invalid Oauth Provider */
export declare class BadRequest_InvalidOauthProviderError extends BadRequestError {}

/** Invalid Path */
export declare class BadRequest_InvalidPathError extends BadRequestError {}

/** Invalid Return To Url */
export declare class BadRequest_InvalidReturnToUrlError extends BadRequestError {}

/** Invalid Search Query */
export declare class BadRequest_InvalidSearchQueryError extends BadRequestError {}

/** Invalid Sort Field */
export declare class BadRequest_InvalidSortFieldError extends BadRequestError {}

/** Invalid Sort Filter Combination */
export declare class BadRequest_InvalidSortFilterCombinationError extends BadRequestError {}

/** Invalid Upload Offset */
export declare class BadRequest_InvalidUploadOffsetError extends BadRequestError {}

/** Invalid Upload Part Gap */
export declare class BadRequest_InvalidUploadPartGapError extends BadRequestError {}

/** Invalid Upload Part Size */
export declare class BadRequest_InvalidUploadPartSizeError extends BadRequestError {}

/** Invalid Workspace Id Header */
export declare class BadRequest_InvalidWorkspaceIdHeaderError extends BadRequestError {}

/** Method Not Allowed */
export declare class BadRequest_MethodNotAllowedError extends BadRequestError {}

/** Multiple Sort Params Not Allowed */
export declare class BadRequest_MultipleSortParamsNotAllowedError extends BadRequestError {}

/** No Valid Input Params */
export declare class BadRequest_NoValidInputParamsError extends BadRequestError {}

/** Offset Upload Not Allowed With Malware Scanning */
export declare class BadRequest_OffsetUploadNotAllowedWithMalwareScanningError extends BadRequestError {}

/** Part Number Too Large */
export declare class BadRequest_PartNumberTooLargeError extends BadRequestError {}

/** Path Cannot Have Trailing Whitespace */
export declare class BadRequest_PathCannotHaveTrailingWhitespaceError extends BadRequestError {}

/** Reauthentication Needed Fields */
export declare class BadRequest_ReauthenticationNeededFieldsError extends BadRequestError {}

/** Request Body Too Large */
export declare class BadRequest_RequestBodyTooLargeError extends BadRequestError {}

/** Request Params Contain Invalid Character */
export declare class BadRequest_RequestParamsContainInvalidCharacterError extends BadRequestError {}

/** Request Params Invalid */
export declare class BadRequest_RequestParamsInvalidError extends BadRequestError {}

/** Request Params Required */
export declare class BadRequest_RequestParamsRequiredError extends BadRequestError {}

/** Search All On Child Path */
export declare class BadRequest_SearchAllOnChildPathError extends BadRequestError {}

/** Unrecognized Sort Index */
export declare class BadRequest_UnrecognizedSortIndexError extends BadRequestError {}

/** Unsupported Currency */
export declare class BadRequest_UnsupportedCurrencyError extends BadRequestError {}

/** Unsupported Http Response Format */
export declare class BadRequest_UnsupportedHttpResponseFormatError extends BadRequestError {}

/** Unsupported Media Type */
export declare class BadRequest_UnsupportedMediaTypeError extends BadRequestError {}

/** User Id Invalid */
export declare class BadRequest_UserIdInvalidError extends BadRequestError {}

/** User Id On User Endpoint */
export declare class BadRequest_UserIdOnUserEndpointError extends BadRequestError {}

/** User Required */
export declare class BadRequest_UserRequiredError extends BadRequestError {}

/** Additional Authentication Required */
export declare class NotAuthenticated_AdditionalAuthenticationRequiredError extends NotAuthenticatedError {}

/** Api Key Sessions Not Supported */
export declare class NotAuthenticated_ApiKeySessionsNotSupportedError extends NotAuthenticatedError {}

/** Authentication Required */
export declare class NotAuthenticated_AuthenticationRequiredError extends NotAuthenticatedError {}

/** Bundle Registration Code Failed */
export declare class NotAuthenticated_BundleRegistrationCodeFailedError extends NotAuthenticatedError {}

/** Inbox Registration Code Failed */
export declare class NotAuthenticated_InboxRegistrationCodeFailedError extends NotAuthenticatedError {}

/** Invalid Credentials */
export declare class NotAuthenticated_InvalidCredentialsError extends NotAuthenticatedError {}

/** Invalid Oauth */
export declare class NotAuthenticated_InvalidOauthError extends NotAuthenticatedError {}

/** Invalid Or Expired Code */
export declare class NotAuthenticated_InvalidOrExpiredCodeError extends NotAuthenticatedError {}

/** Invalid Session */
export declare class NotAuthenticated_InvalidSessionError extends NotAuthenticatedError {}

/** Invalid Username Or Password */
export declare class NotAuthenticated_InvalidUsernameOrPasswordError extends NotAuthenticatedError {}

/** Locked Out */
export declare class NotAuthenticated_LockedOutError extends NotAuthenticatedError {}

/** Lockout Region Mismatch */
export declare class NotAuthenticated_LockoutRegionMismatchError extends NotAuthenticatedError {}

/** One Time Password Incorrect */
export declare class NotAuthenticated_OneTimePasswordIncorrectError extends NotAuthenticatedError {}

/** Two Factor Authentication Error */
export declare class NotAuthenticated_TwoFactorAuthenticationErrorError extends NotAuthenticatedError {}

/** Two Factor Authentication Setup Expired */
export declare class NotAuthenticated_TwoFactorAuthenticationSetupExpiredError extends NotAuthenticatedError {}

/** Api Key Is Disabled */
export declare class NotAuthorized_ApiKeyIsDisabledError extends NotAuthorizedError {}

/** Api Key Is Path Restricted */
export declare class NotAuthorized_ApiKeyIsPathRestrictedError extends NotAuthorizedError {}

/** Api Key Only For Desktop App */
export declare class NotAuthorized_ApiKeyOnlyForDesktopAppError extends NotAuthorizedError {}

/** Api Key Only For File Operations */
export declare class NotAuthorized_ApiKeyOnlyForFileOperationsError extends NotAuthorizedError {}

/** Api Key Only For Mobile App */
export declare class NotAuthorized_ApiKeyOnlyForMobileAppError extends NotAuthorizedError {}

/** Api Key Only For Office Integration */
export declare class NotAuthorized_ApiKeyOnlyForOfficeIntegrationError extends NotAuthorizedError {}

/** Billing Information Hidden */
export declare class NotAuthorized_BillingInformationHiddenError extends NotAuthorizedError {}

/** Billing Permission Required */
export declare class NotAuthorized_BillingPermissionRequiredError extends NotAuthorizedError {}

/** Bundle Maximum Uses Reached */
export declare class NotAuthorized_BundleMaximumUsesReachedError extends NotAuthorizedError {}

/** Bundle Permission Required */
export declare class NotAuthorized_BundlePermissionRequiredError extends NotAuthorizedError {}

/** Cannot Administer Higher Level User */
export declare class NotAuthorized_CannotAdministerHigherLevelUserError extends NotAuthorizedError {}

/** Cannot Login While Using Key */
export declare class NotAuthorized_CannotLoginWhileUsingKeyError extends NotAuthorizedError {}

/** Cant Act For Other User */
export declare class NotAuthorized_CantActForOtherUserError extends NotAuthorizedError {}

/** Contact Admin For Password Change Help */
export declare class NotAuthorized_ContactAdminForPasswordChangeHelpError extends NotAuthorizedError {}

/** Files Agent Failed Authorization */
export declare class NotAuthorized_FilesAgentFailedAuthorizationError extends NotAuthorizedError {}

/** Folder Admin Or Billing Permission Required */
export declare class NotAuthorized_FolderAdminOrBillingPermissionRequiredError extends NotAuthorizedError {}

/** Folder Admin Permission Required */
export declare class NotAuthorized_FolderAdminPermissionRequiredError extends NotAuthorizedError {}

/** Full Permission Required */
export declare class NotAuthorized_FullPermissionRequiredError extends NotAuthorizedError {}

/** History Permission Required */
export declare class NotAuthorized_HistoryPermissionRequiredError extends NotAuthorizedError {}

/** In App Ai Assistant Unavailable */
export declare class NotAuthorized_InAppAiAssistantUnavailableError extends NotAuthorizedError {}

/** Insufficient Permission For Params */
export declare class NotAuthorized_InsufficientPermissionForParamsError extends NotAuthorizedError {}

/** Insufficient Permission For Site */
export declare class NotAuthorized_InsufficientPermissionForSiteError extends NotAuthorizedError {}

/** Mover Access Denied */
export declare class NotAuthorized_MoverAccessDeniedError extends NotAuthorizedError {}

/** Mover Package Required */
export declare class NotAuthorized_MoverPackageRequiredError extends NotAuthorizedError {}

/** Must Authenticate With Api Key */
export declare class NotAuthorized_MustAuthenticateWithApiKeyError extends NotAuthorizedError {}

/** Need Admin Permission For Inbox */
export declare class NotAuthorized_NeedAdminPermissionForInboxError extends NotAuthorizedError {}

/** Non Admins Must Query By Folder Or Path */
export declare class NotAuthorized_NonAdminsMustQueryByFolderOrPathError extends NotAuthorizedError {}

/** Not Allowed To Create Bundle */
export declare class NotAuthorized_NotAllowedToCreateBundleError extends NotAuthorizedError {}

/** Not Enqueuable Sync */
export declare class NotAuthorized_NotEnqueuableSyncError extends NotAuthorizedError {}

/** Password Change Not Required */
export declare class NotAuthorized_PasswordChangeNotRequiredError extends NotAuthorizedError {}

/** Password Change Required */
export declare class NotAuthorized_PasswordChangeRequiredError extends NotAuthorizedError {}

/** Payment Method Error */
export declare class NotAuthorized_PaymentMethodErrorError extends NotAuthorizedError {}

/** Preview Only Permission Cannot Download */
export declare class NotAuthorized_PreviewOnlyPermissionCannotDownloadError extends NotAuthorizedError {}

/** Read Only Session */
export declare class NotAuthorized_ReadOnlySessionError extends NotAuthorizedError {}

/** Read Permission Required */
export declare class NotAuthorized_ReadPermissionRequiredError extends NotAuthorizedError {}

/** Reauthentication Failed */
export declare class NotAuthorized_ReauthenticationFailedError extends NotAuthorizedError {}

/** Reauthentication Failed Final */
export declare class NotAuthorized_ReauthenticationFailedFinalError extends NotAuthorizedError {}

/** Reauthentication Needed Action */
export declare class NotAuthorized_ReauthenticationNeededActionError extends NotAuthorizedError {}

/** Recaptcha Failed */
export declare class NotAuthorized_RecaptchaFailedError extends NotAuthorizedError {}

/** Remote Desktop Debug Logging Disabled */
export declare class NotAuthorized_RemoteDesktopDebugLoggingDisabledError extends NotAuthorizedError {}

/** Root Folder Behavior Site Admin Required */
export declare class NotAuthorized_RootFolderBehaviorSiteAdminRequiredError extends NotAuthorizedError {}

/** Root Folder Behavior Skip Site Admin Required */
export declare class NotAuthorized_RootFolderBehaviorSkipSiteAdminRequiredError extends NotAuthorizedError {}

/** Self Managed Required */
export declare class NotAuthorized_SelfManagedRequiredError extends NotAuthorizedError {}

/** Site Admin Or Partner Admin Permission Required */
export declare class NotAuthorized_SiteAdminOrPartnerAdminPermissionRequiredError extends NotAuthorizedError {}

/** Site Admin Or Workspace Admin Or Folder Admin Permission Required */
export declare class NotAuthorized_SiteAdminOrWorkspaceAdminOrFolderAdminPermissionRequiredError extends NotAuthorizedError {}

/** Site Admin Or Workspace Admin Or Partner Admin Or Folder Admin Permission Required */
export declare class NotAuthorized_SiteAdminOrWorkspaceAdminOrPartnerAdminOrFolderAdminPermissionRequiredError extends NotAuthorizedError {}

/** Site Admin Or Workspace Admin Or Partner Admin Permission Required */
export declare class NotAuthorized_SiteAdminOrWorkspaceAdminOrPartnerAdminPermissionRequiredError extends NotAuthorizedError {}

/** Site Admin Or Workspace Admin Permission Required */
export declare class NotAuthorized_SiteAdminOrWorkspaceAdminPermissionRequiredError extends NotAuthorizedError {}

/** Site Admin Required */
export declare class NotAuthorized_SiteAdminRequiredError extends NotAuthorizedError {}

/** Site Files Are Immutable */
export declare class NotAuthorized_SiteFilesAreImmutableError extends NotAuthorizedError {}

/** Two Factor Authentication Required */
export declare class NotAuthorized_TwoFactorAuthenticationRequiredError extends NotAuthorizedError {}

/** User Id Without Site Admin */
export declare class NotAuthorized_UserIdWithoutSiteAdminError extends NotAuthorizedError {}

/** Write And Bundle Permission Required */
export declare class NotAuthorized_WriteAndBundlePermissionRequiredError extends NotAuthorizedError {}

/** Write Permission Required */
export declare class NotAuthorized_WritePermissionRequiredError extends NotAuthorizedError {}

/** Api Key Not Found */
export declare class NotFound_ApiKeyNotFoundError extends NotFoundError {}

/** Bundle Path Not Found */
export declare class NotFound_BundlePathNotFoundError extends NotFoundError {}

/** Bundle Registration Not Found */
export declare class NotFound_BundleRegistrationNotFoundError extends NotFoundError {}

/** Code Not Found */
export declare class NotFound_CodeNotFoundError extends NotFoundError {}

/** File Not Found */
export declare class NotFound_FileNotFoundError extends NotFoundError {}

/** File Upload Not Found */
export declare class NotFound_FileUploadNotFoundError extends NotFoundError {}

/** Group Not Found */
export declare class NotFound_GroupNotFoundError extends NotFoundError {}

/** Inbox Not Found */
export declare class NotFound_InboxNotFoundError extends NotFoundError {}

/** Nested Not Found */
export declare class NotFound_NestedNotFoundError extends NotFoundError {}

/** Plan Not Found */
export declare class NotFound_PlanNotFoundError extends NotFoundError {}

/** Site Not Found */
export declare class NotFound_SiteNotFoundError extends NotFoundError {}

/** User Not Found */
export declare class NotFound_UserNotFoundError extends NotFoundError {}

/** Agent Push Update Blocked */
export declare class ProcessingFailure_AgentPushUpdateBlockedError extends ProcessingFailureError {}

/** Agent Unavailable */
export declare class ProcessingFailure_AgentUnavailableError extends ProcessingFailureError {}

/** Ai Task Cannot Be Run Manually */
export declare class ProcessingFailure_AiTaskCannotBeRunManuallyError extends ProcessingFailureError {}

/** Already Completed */
export declare class ProcessingFailure_AlreadyCompletedError extends ProcessingFailureError {}

/** Automation Cannot Be Run Manually */
export declare class ProcessingFailure_AutomationCannotBeRunManuallyError extends ProcessingFailureError {}

/** Behavior Not Allowed On Remote Server */
export declare class ProcessingFailure_BehaviorNotAllowedOnRemoteServerError extends ProcessingFailureError {}

/** Buffered Upload Disabled For This Destination */
export declare class ProcessingFailure_BufferedUploadDisabledForThisDestinationError extends ProcessingFailureError {}

/** Bundle Only Allows Previews */
export declare class ProcessingFailure_BundleOnlyAllowsPreviewsError extends ProcessingFailureError {}

/** Bundle Operation Requires Subfolder */
export declare class ProcessingFailure_BundleOperationRequiresSubfolderError extends ProcessingFailureError {}

/** Configuration Locked Path */
export declare class ProcessingFailure_ConfigurationLockedPathError extends ProcessingFailureError {}

/** Could Not Create Parent */
export declare class ProcessingFailure_CouldNotCreateParentError extends ProcessingFailureError {}

/** Destination Exists */
export declare class ProcessingFailure_DestinationExistsError extends ProcessingFailureError {}

/** Destination Folder Limited */
export declare class ProcessingFailure_DestinationFolderLimitedError extends ProcessingFailureError {}

/** Destination Parent Conflict */
export declare class ProcessingFailure_DestinationParentConflictError extends ProcessingFailureError {}

/** Destination Parent Does Not Exist */
export declare class ProcessingFailure_DestinationParentDoesNotExistError extends ProcessingFailureError {}

/** Exceeded Runtime Limit */
export declare class ProcessingFailure_ExceededRuntimeLimitError extends ProcessingFailureError {}

/** Expectation Already Has Open Window */
export declare class ProcessingFailure_ExpectationAlreadyHasOpenWindowError extends ProcessingFailureError {}

/** Expectation Not Manual Trigger */
export declare class ProcessingFailure_ExpectationNotManualTriggerError extends ProcessingFailureError {}

/** Expired Private Key */
export declare class ProcessingFailure_ExpiredPrivateKeyError extends ProcessingFailureError {}

/** Expired Public Key */
export declare class ProcessingFailure_ExpiredPublicKeyError extends ProcessingFailureError {}

/** Export Failure */
export declare class ProcessingFailure_ExportFailureError extends ProcessingFailureError {}

/** Export Not Ready */
export declare class ProcessingFailure_ExportNotReadyError extends ProcessingFailureError {}

/** Failed To Change Password */
export declare class ProcessingFailure_FailedToChangePasswordError extends ProcessingFailureError {}

/** File Locked */
export declare class ProcessingFailure_FileLockedError extends ProcessingFailureError {}

/** File Not Uploaded */
export declare class ProcessingFailure_FileNotUploadedError extends ProcessingFailureError {}

/** File Pending Processing */
export declare class ProcessingFailure_FilePendingProcessingError extends ProcessingFailureError {}

/** File Processing Error */
export declare class ProcessingFailure_FileProcessingErrorError extends ProcessingFailureError {}

/** File Too Big To Decrypt */
export declare class ProcessingFailure_FileTooBigToDecryptError extends ProcessingFailureError {}

/** File Too Big To Encrypt */
export declare class ProcessingFailure_FileTooBigToEncryptError extends ProcessingFailureError {}

/** File Uploaded To Wrong Region */
export declare class ProcessingFailure_FileUploadedToWrongRegionError extends ProcessingFailureError {}

/** Filename Too Long */
export declare class ProcessingFailure_FilenameTooLongError extends ProcessingFailureError {}

/** Folder Locked */
export declare class ProcessingFailure_FolderLockedError extends ProcessingFailureError {}

/** Folder Not Empty */
export declare class ProcessingFailure_FolderNotEmptyError extends ProcessingFailureError {}

/** History Unavailable */
export declare class ProcessingFailure_HistoryUnavailableError extends ProcessingFailureError {}

/** Invalid Bundle Code */
export declare class ProcessingFailure_InvalidBundleCodeError extends ProcessingFailureError {}

/** Invalid File Type */
export declare class ProcessingFailure_InvalidFileTypeError extends ProcessingFailureError {}

/** Invalid Filename */
export declare class ProcessingFailure_InvalidFilenameError extends ProcessingFailureError {}

/** Invalid Priority Color */
export declare class ProcessingFailure_InvalidPriorityColorError extends ProcessingFailureError {}

/** Invalid Range */
export declare class ProcessingFailure_InvalidRangeError extends ProcessingFailureError {}

/** Invalid Site */
export declare class ProcessingFailure_InvalidSiteError extends ProcessingFailureError {}

/** Invalid Zip File */
export declare class ProcessingFailure_InvalidZipFileError extends ProcessingFailureError {}

/** Metadata Not Supported On Remotes */
export declare class ProcessingFailure_MetadataNotSupportedOnRemotesError extends ProcessingFailureError {}

/** Model Save Error */
export declare class ProcessingFailure_ModelSaveErrorError extends ProcessingFailureError {}

/** Multiple Processing Errors */
export declare class ProcessingFailure_MultipleProcessingErrorsError extends ProcessingFailureError {}

/** Path Too Long */
export declare class ProcessingFailure_PathTooLongError extends ProcessingFailureError {}

/** Recipient Already Shared */
export declare class ProcessingFailure_RecipientAlreadySharedError extends ProcessingFailureError {}

/** Remote Entry Read Only */
export declare class ProcessingFailure_RemoteEntryReadOnlyError extends ProcessingFailureError {}

/** Remote Server Error */
export declare class ProcessingFailure_RemoteServerErrorError extends ProcessingFailureError {}

/** Resource Belongs To Parent Site */
export declare class ProcessingFailure_ResourceBelongsToParentSiteError extends ProcessingFailureError {}

/** Resource Locked */
export declare class ProcessingFailure_ResourceLockedError extends ProcessingFailureError {}

/** Subfolder Locked */
export declare class ProcessingFailure_SubfolderLockedError extends ProcessingFailureError {}

/** Sync In Progress */
export declare class ProcessingFailure_SyncInProgressError extends ProcessingFailureError {}

/** Two Factor Authentication Code Already Sent */
export declare class ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError extends ProcessingFailureError {}

/** Two Factor Authentication Country Blacklisted */
export declare class ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError extends ProcessingFailureError {}

/** Two Factor Authentication General Error */
export declare class ProcessingFailure_TwoFactorAuthenticationGeneralErrorError extends ProcessingFailureError {}

/** Two Factor Authentication Method Unsupported Error */
export declare class ProcessingFailure_TwoFactorAuthenticationMethodUnsupportedErrorError extends ProcessingFailureError {}

/** Two Factor Authentication Unsubscribed Recipient */
export declare class ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError extends ProcessingFailureError {}

/** Updates Not Allowed For Remotes */
export declare class ProcessingFailure_UpdatesNotAllowedForRemotesError extends ProcessingFailureError {}

/** Duplicate Share Recipient */
export declare class RateLimited_DuplicateShareRecipientError extends RateLimitedError {}

/** Reauthentication Rate Limited */
export declare class RateLimited_ReauthenticationRateLimitedError extends RateLimitedError {}

/** Too Many Concurrent Logins */
export declare class RateLimited_TooManyConcurrentLoginsError extends RateLimitedError {}

/** Too Many Concurrent Requests */
export declare class RateLimited_TooManyConcurrentRequestsError extends RateLimitedError {}

/** Too Many Login Attempts */
export declare class RateLimited_TooManyLoginAttemptsError extends RateLimitedError {}

/** Too Many Requests */
export declare class RateLimited_TooManyRequestsError extends RateLimitedError {}

/** Too Many Shares */
export declare class RateLimited_TooManySharesError extends RateLimitedError {}

/** Automations Unavailable */
export declare class ServiceUnavailable_AutomationsUnavailableError extends ServiceUnavailableError {}

/** Lock Operation Busy */
export declare class ServiceUnavailable_LockOperationBusyError extends ServiceUnavailableError {}

/** Migration In Progress */
export declare class ServiceUnavailable_MigrationInProgressError extends ServiceUnavailableError {}

/** Search Unavailable */
export declare class ServiceUnavailable_SearchUnavailableError extends ServiceUnavailableError {}

/** Site Disabled */
export declare class ServiceUnavailable_SiteDisabledError extends ServiceUnavailableError {}

/** Uploads Unavailable */
export declare class ServiceUnavailable_UploadsUnavailableError extends ServiceUnavailableError {}

/** Account Already Exists */
export declare class SiteConfiguration_AccountAlreadyExistsError extends SiteConfigurationError {}

/** Account Overdue */
export declare class SiteConfiguration_AccountOverdueError extends SiteConfigurationError {}

/** No Account For Site */
export declare class SiteConfiguration_NoAccountForSiteError extends SiteConfigurationError {}

/** Site Was Removed */
export declare class SiteConfiguration_SiteWasRemovedError extends SiteConfigurationError {}

/** Trial Expired */
export declare class SiteConfiguration_TrialExpiredError extends SiteConfigurationError {}

/** Trial Locked */
export declare class SiteConfiguration_TrialLockedError extends SiteConfigurationError {}

/** User Requests Enabled Required */
export declare class SiteConfiguration_UserRequestsEnabledRequiredError extends SiteConfigurationError {}
