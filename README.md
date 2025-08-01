# Files.com JavaScript SDK

The content included here should be enough to get started, but please visit our
[Developer Documentation Website](https://developers.files.com/javascript/) for the complete documentation.

## Introduction

The Files.com JavaScript SDK provides convenient access to all aspects of Files.com from applications written in JavaScript.

This includes directly working with files and folders as well as performing management tasks such as adding/removing users, onboarding counterparties, retrieving information about automations and more.

The JavaScript SDK uses the Files.com RESTful APIs via the HTTPS protocol (port 443) to securely communicate and transfer files so no firewall changes should be required in order to allow connectivity to Files.com.

### JavaScript is a Core Focus at Files.com

This SDK is used internally by several Files.com integrations that we maintain, and we work hard to ensure that it is always up to date and performant.

It is also a very popular choice for Files.com customers looking to integrate with Files.com.

### Installation

To install the package, use `yarn` or `npm`:

```shell
yarn add files.com
```

or

```shell
npm install files.com
```

### Usage

#### Import and Initialize

```js
import Files from "files.com/lib/Files.js";
```

##### `require()` vs. `import`

The examples provided in the documentation here use the newer ES6 `import` syntax. To
instead use the older CommonJS module syntax with `require()`, ensure that `.default`
is included. For example:

```js
const Files = require("files.com/lib/Files.js").default;
const User = require("files.com/lib/models/User.js").default;

// destructure to directly assign a named export
const { LogLevel } = require("files.com/lib/Logger.js").default;
```

Explore the [files-sdk-javascript](https://github.com/Files-com/files-sdk-javascript) code on GitHub.

### Getting Support

The Files.com Support team provides official support for all of our official Files.com integration tools.

To initiate a support conversation, you can send an [Authenticated Support Request](https://www.files.com/docs/overview/requesting-support) or simply send an E-Mail to support@files.com.

## Authentication

There are two ways to authenticate: API Key authentication and Session-based authentication.

### Authenticate with an API Key

Authenticating with an API key is the recommended authentication method for most scenarios, and is
the method used in the examples on this site.

To use an API Key, first generate an API key from the [web
interface](https://www.files.com/docs/sdk-and-apis/api-keys) or [via the API or an
SDK](/javascript/resources/developers/api-keys).

Note that when using a user-specific API key, if the user is an administrator, you will have full
access to the entire API. If the user is not an administrator, you will only be able to access files
that user can access, and no access will be granted to site administration functions in the API.

```javascript title="Example Request"
import Files from 'files.com/lib/Files';
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

Files.setApiKey('YOUR_API_KEY');

try {
  // Alternatively, you can specify the API key on a per-object basis in the second parameter to a model constructor.
  const user = new User(params, { apiKey: 'YOUR_API_KEY' });

  // You may also specify the API key on a per-request basis in the final parameter to static methods.
  await User.find(id, params, { apiKey: 'YOUR_API_KEY' });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

Don't forget to replace the placeholder, `YOUR_API_KEY`, with your actual API key.

### Authenticate with a Session

You can also authenticate by creating a user session using the username and
password of an active user. If the user is an administrator, the session will have full access to
all capabilities of Files.com. Sessions created from regular user accounts will only be able to access files that
user can access, and no access will be granted to site administration functions.

Sessions use the exact same session timeout settings as web interface sessions. When a
session times out, simply create a new session and resume where you left off. This process is not
automatically handled by our SDKs because we do not want to store password information in memory without
your explicit consent.

#### Logging In

To create a session, the `create` method is called on the `Session` object with the user's username and
password.

This returns a session object that can be used to authenticate SDK method calls.

```javascript title="Example Request"
import Session from 'files.com/lib/models/Session';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  const session = await Session.create({ username: 'motor', password: 'vroom' });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

#### Using a Session

Once a session has been created, you can store the session globally, use the session per object, or use the session per request to authenticate SDK operations.

```javascript title="Example Request"
import Files from 'files.com/lib/Files';
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

// You may set the returned session ID to be used by default for subsequent requests.
Files.setSessionId(session.id);

try {
  // Alternatively, you can specify the session ID on a per-object basis in the second parameter to a model constructor.
  const user = new User(params, { session_id: session.id });

  // You may also specify the session ID on a per-request basis in the final parameter to static methods.
  await User.find(id, params, { session_id: session.id });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

#### Logging Out

User sessions can be ended calling the `destroy` method on the `session` object.

```javascript title="Example Request"
import Session from 'files.com/lib/models/Session';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  await Session.destroy();
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

## Configuration

Global configuration is performed by calling methods on the `Files` object.

### Configuration Options

#### Base URL

Setting the base URL for the API is required if your site is configured to disable global acceleration.
This can also be set to use a mock server in development or CI.

```javascript title="Example setting"
import Files from 'files.com/lib/Files';

Files.setBaseUrl("https://MY-SUBDOMAIN.files.com");
```

#### Log Level

Supported values:

* LogLevel.NONE
* LogLevel.ERROR
* LogLevel.WARN
* LogLevel.INFO (default)
* LogLevel.DEBUG

```javascript title="Example setting"
import Files from 'files.com/lib/Files';
import { LogLevel } from 'files.com/lib/Logger';

Files.setLogLevel(LogLevel.INFO);
```

#### Debugging

Enable debug logging of API requests and/or response headers. Both settings default to `false`.

```javascript title="Example setting"
import Files from 'files.com/lib/Files';

Files.configureDebugging({
  debugRequest: true,
  debugResponseHeaders: true,
});
```

#### Network Settings

```javascript title="Example setting"
import Files from 'files.com/lib/Files';

Files.configureNetwork({
  // max retries (default: 3)
  maxNetworkRetries: 3,

  // minimum delay in seconds before retrying (default: 0.5)
  minNetworkRetryDelay: 0.5,

  // max delay in seconds before retrying (default: 1.5)
  maxNetworkRetryDelay: 1.5,

  // network timeout in seconds (default: 30.0)
  networkTimeout: 30.0,

  // auto-fetch all pages when results span multiple pages (default: `true`)
  autoPaginate: true,
});
```

## Sort and Filter

Several of the Files.com API resources have list operations that return multiple instances of the
resource. The List operations can be sorted and filtered.

### Sorting

To sort the returned data, pass in the ```sort_by``` method argument.

Each resource supports a unique set of valid sort fields and can only be sorted by one field at a
time.

The argument value is a Javascript object that has a property of the resource field name sort on and
a value of either ```"asc"``` or ```"desc"``` to specify the sort order.

#### Special note about the List Folder Endpoint

For historical reasons, and to maintain compatibility
with a variety of other cloud-based MFT and EFSS services, Folders will always be listed before Files
when listing a Folder.  This applies regardless of the sorting parameters you provide.  These *will* be
used, after the initial sort application of Folders before Files.

```javascript title="Sort Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users, sorted by username in ascending order.
  const users = await User.list({
    sort_by: { username: "asc" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

### Filtering

Filters apply selection criteria to the underlying query that returns the results. They can be
applied individually or combined with other filters, and the resulting data can be sorted by a
single field.

Each resource supports a unique set of valid filter fields, filter combinations, and combinations of
filters and sort fields.

The passed in argument value is a Javascript object that has a property of the resource field name
to filter on and a passed in value to use in the filter comparison.

#### Filter Types

| Filter | Type | Description |
| --------- | --------- | --------- |
| `filter` | Exact | Find resources that have an exact field value match to a passed in value. (i.e., FIELD_VALUE = PASS_IN_VALUE). |
| `filter_prefix` | Pattern | Find resources where the specified field is prefixed by the supplied value. This is applicable to values that are strings. |
| `filter_gt` | Range | Find resources that have a field value that is greater than the passed in value.  (i.e., FIELD_VALUE > PASS_IN_VALUE). |
| `filter_gteq` | Range | Find resources that have a field value that is greater than or equal to the passed in value.  (i.e., FIELD_VALUE >=  PASS_IN_VALUE). |
| `filter_lt` | Range | Find resources that have a field value that is less than the passed in value.  (i.e., FIELD_VALUE < PASS_IN_VALUE). |
| `filter_lteq` | Range | Find resources that have a field value that is less than or equal to the passed in value.  (i.e., FIELD_VALUE \<= PASS_IN_VALUE). |

```javascript title="Exact Filter Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users who are not site admins.
  const users = await User.list({
    filter: { not_site_admin: true }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

```javascript title="Range Filter Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users who haven't logged in since 2024-01-01.
  const users = await User.list({
    filter_gteq: { last_login_at: "2024-01-01" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

```javascript title="Pattern Filter Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users whose usernames start with 'test'.
  const users = await User.list({
    filter_prefix: { username: "test" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

```javascript title="Combination Filter with Sort Example"
import User from 'files.com/lib/models/User';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  // Users whose usernames start with 'test' and are not site admins, sorted by last login date.
  const users = await User.list({
    filter_prefix: { username: "test" },
    filter: { not_site_admin: true },
    sort_by: { last_login_at: "asc" }
  });

  users.forEach(user => {
    console.log(user.username);
  });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

## Paths

Working with paths in Files.com involves several important considerations. Understanding how path comparisons are applied helps developers ensure consistency and accuracy across all interactions with the platform.
<div></div>

### Capitalization

Files.com compares paths in a **case-insensitive** manner. This means path segments are treated as equivalent regardless of letter casing.

For example, all of the following resolve to the same internal path:

| Path Variant                          | Interpreted As              |
|---------------------------------------|------------------------------|
| `Documents/Reports/Q1.pdf`            | `documents/reports/q1.pdf`  |
| `documents/reports/q1.PDF`            | `documents/reports/q1.pdf`  |
| `DOCUMENTS/REPORTS/Q1.PDF`            | `documents/reports/q1.pdf`  |

This behavior applies across:
- API requests
- Folder and file lookup operations
- Automations and workflows

See also: [Case Sensitivity Documentation](https://www.files.com/docs/files-and-folders/case-sensitivity/)

The `pathNormalizer.same` function in the Files.com SDK is designed to help you determine if two paths on
your native file system would be considered the same on Files.com. This is particularly important
when handling errors related to duplicate file names and when developing tools for folder
synchronization.

```javascript title="Compare Case-Insensitive Files and Paths"
import { pathNormalizer } from 'files.com/lib/utils';

if (pathNormalizer.same('Fïłèńämê.Txt', 'filename.txt')) {
  // the paths are the same
}
```

### Slashes

All path parameters in Files.com (API, SDKs, CLI, automations, integrations) must **omit leading and trailing slashes**. Paths are always treated as **absolute and slash-delimited**, so only internal `/` separators are used and never at the start or end of the string.

####  Path Slash Examples
| Path                              | Valid? | Notes                         |
|-----------------------------------|--------|-------------------------------|
| `folder/subfolder/file.txt`       |   ✅   | Correct, internal separators only |
| `/folder/subfolder/file.txt`      |   ❌   | Leading slash not allowed     |
| `folder/subfolder/file.txt/`      |   ❌   | Trailing slash not allowed    |
| `//folder//file.txt`              |   ❌   | Duplicate separators not allowed |

<div></div>

### Unicode Normalization

Files.com normalizes all paths using [Unicode NFC (Normalization Form C)](https://www.unicode.org/reports/tr15/#Norm_Forms) before comparison. This ensures consistency across different representations of the same characters.

For example, the following two paths are treated as equivalent after NFC normalization:

| Input                                  | Normalized Form       |
|----------------------------------------|------------------------|
| `uploads/\u0065\u0301.txt`             | `uploads/é.txt`        |
| `docs/Café/Report.txt`                 | `docs/Café/Report.txt` |

- All input must be UTF‑8 encoded.
- Precomposed and decomposed characters are unified.
- This affects search, deduplication, and comparisons across SDKs.

<div></div>

## Foreign Language Support

The Files.com Javascript SDK supports localized responses by using the `Files.setLanguage()` configuration method.
When configured, this guides the API in selecting a preferred language for applicable response content.

Language support currently applies to select human-facing fields only, such as notification messages
and error descriptions.

If the specified language is not supported or the value is omitted, the API defaults to English.

```javascript title="Example Request"
import Files from 'files.com/lib/Files';

Files.setLanguage('es');
```

## Errors

The Files.com JavaScript SDK will return errors by raising exceptions. There are many exception classes defined in the Files SDK that correspond
to specific errors.

The raised exceptions come from two categories:

1.  SDK Exceptions - errors that originate within the SDK
2.  API Exceptions - errors that occur due to the response from the Files.com API.  These errors are grouped into common error types.

There are several types of exceptions within each category.  Exception classes indicate different types of errors and are named in a
fashion that describe the general premise of the originating error.  More details can be found in the exception object message using the
`message` attribute.

Use standard Javascript exception handling to detect and deal with errors.  It is generally recommended to catch specific errors first, then
catch the general `FilesError` exception as a catch-all.

```javascript title="Example Error Handling"
import Session from 'files.com/lib/models/Session';
import * as FilesErrors from 'files.com/lib/Errors';

try {
  const session = await Session.create({ username: 'USERNAME', password: 'BADPASSWORD' });
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

### Error Types

#### SDK Errors

SDK errors are general errors that occur within the SDK code.  These errors generate exceptions.  Each of these
exception classes inherit from a standard `FilesError` base class.

```javascript title="Example SDK Exception Class Inheritance Structure"
import * as FilesErrors from 'files.com/lib/Errors'

FilesErrors.ConfigurationError ->
FilesErrors.FilesError ->
Error
```
##### SDK Exception Classes

| Exception Class Name| Description |
| --------------- | ------------ |
| `ConfigurationError`| Invalid SDK configuration parameters |
| `EmptyPropertyError`| Missing a required property |
| `InvalidParameterError`| A passed in parameter is invalid |
| `MissingParameterError`| A method parameter is missing |
| `NotImplementedError`| The called method has not be implemented by the SDK |

#### API Errors

API errors are errors returned by the Files.com API.  Each exception class inherits from an error group base class.
The error group base class indicates a particular type of error.

```javascript title="Example API Exception Class Inheritance Structure"
import * as FilesErrors from 'files.com/lib/Errors'

FilesErrors.NotAuthorized_FolderAdminPermissionRequiredError ->
FilesErrors.NotAuthorizedError ->
FilesErrors.FilesApiError  ->
FilesErrors.FilesError  ->
Error
```
##### API Exception Classes

| Exception Class Name | Error Group |
| --------- | --------- |
|     `BadRequest_AgentUpgradeRequiredError`|  `BadRequestError` |
|     `BadRequest_AttachmentTooLargeError`|  `BadRequestError` |
|     `BadRequest_CannotDownloadDirectoryError`|  `BadRequestError` |
|     `BadRequest_CantMoveWithMultipleLocationsError`|  `BadRequestError` |
|     `BadRequest_DatetimeParseError`|  `BadRequestError` |
|     `BadRequest_DestinationSameError`|  `BadRequestError` |
|     `BadRequest_DoesNotSupportSortingError`|  `BadRequestError` |
|     `BadRequest_FolderMustNotBeAFileError`|  `BadRequestError` |
|     `BadRequest_FoldersNotAllowedError`|  `BadRequestError` |
|     `BadRequest_InvalidBodyError`|  `BadRequestError` |
|     `BadRequest_InvalidCursorError`|  `BadRequestError` |
|     `BadRequest_InvalidCursorTypeForSortError`|  `BadRequestError` |
|     `BadRequest_InvalidEtagsError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterAliasCombinationError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterFieldError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterParamError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterParamFormatError`|  `BadRequestError` |
|     `BadRequest_InvalidFilterParamValueError`|  `BadRequestError` |
|     `BadRequest_InvalidInputEncodingError`|  `BadRequestError` |
|     `BadRequest_InvalidInterfaceError`|  `BadRequestError` |
|     `BadRequest_InvalidOauthProviderError`|  `BadRequestError` |
|     `BadRequest_InvalidPathError`|  `BadRequestError` |
|     `BadRequest_InvalidReturnToUrlError`|  `BadRequestError` |
|     `BadRequest_InvalidSortFieldError`|  `BadRequestError` |
|     `BadRequest_InvalidSortFilterCombinationError`|  `BadRequestError` |
|     `BadRequest_InvalidUploadOffsetError`|  `BadRequestError` |
|     `BadRequest_InvalidUploadPartGapError`|  `BadRequestError` |
|     `BadRequest_InvalidUploadPartSizeError`|  `BadRequestError` |
|     `BadRequest_MethodNotAllowedError`|  `BadRequestError` |
|     `BadRequest_MultipleSortParamsNotAllowedError`|  `BadRequestError` |
|     `BadRequest_NoValidInputParamsError`|  `BadRequestError` |
|     `BadRequest_PartNumberTooLargeError`|  `BadRequestError` |
|     `BadRequest_PathCannotHaveTrailingWhitespaceError`|  `BadRequestError` |
|     `BadRequest_ReauthenticationNeededFieldsError`|  `BadRequestError` |
|     `BadRequest_RequestParamsContainInvalidCharacterError`|  `BadRequestError` |
|     `BadRequest_RequestParamsInvalidError`|  `BadRequestError` |
|     `BadRequest_RequestParamsRequiredError`|  `BadRequestError` |
|     `BadRequest_SearchAllOnChildPathError`|  `BadRequestError` |
|     `BadRequest_UnrecognizedSortIndexError`|  `BadRequestError` |
|     `BadRequest_UnsupportedCurrencyError`|  `BadRequestError` |
|     `BadRequest_UnsupportedHttpResponseFormatError`|  `BadRequestError` |
|     `BadRequest_UnsupportedMediaTypeError`|  `BadRequestError` |
|     `BadRequest_UserIdInvalidError`|  `BadRequestError` |
|     `BadRequest_UserIdOnUserEndpointError`|  `BadRequestError` |
|     `BadRequest_UserRequiredError`|  `BadRequestError` |
|     `NotAuthenticated_AdditionalAuthenticationRequiredError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_ApiKeySessionsNotSupportedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_AuthenticationRequiredError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_BundleRegistrationCodeFailedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_FilesAgentTokenFailedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InboxRegistrationCodeFailedError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidCredentialsError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidOauthError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidOrExpiredCodeError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidSessionError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_InvalidUsernameOrPasswordError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_LockedOutError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_LockoutRegionMismatchError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_OneTimePasswordIncorrectError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_TwoFactorAuthenticationErrorError`|  `NotAuthenticatedError` |
|     `NotAuthenticated_TwoFactorAuthenticationSetupExpiredError`|  `NotAuthenticatedError` |
|     `NotAuthorized_ApiKeyIsDisabledError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyIsPathRestrictedError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForDesktopAppError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForMobileAppError`|  `NotAuthorizedError` |
|     `NotAuthorized_ApiKeyOnlyForOfficeIntegrationError`|  `NotAuthorizedError` |
|     `NotAuthorized_BillingOrSiteAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_BillingPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_BundleMaximumUsesReachedError`|  `NotAuthorizedError` |
|     `NotAuthorized_BundlePermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_CannotLoginWhileUsingKeyError`|  `NotAuthorizedError` |
|     `NotAuthorized_CantActForOtherUserError`|  `NotAuthorizedError` |
|     `NotAuthorized_ContactAdminForPasswordChangeHelpError`|  `NotAuthorizedError` |
|     `NotAuthorized_FilesAgentFailedAuthorizationError`|  `NotAuthorizedError` |
|     `NotAuthorized_FolderAdminOrBillingPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_FolderAdminPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_FullPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_HistoryPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_InsufficientPermissionForParamsError`|  `NotAuthorizedError` |
|     `NotAuthorized_InsufficientPermissionForSiteError`|  `NotAuthorizedError` |
|     `NotAuthorized_MustAuthenticateWithApiKeyError`|  `NotAuthorizedError` |
|     `NotAuthorized_NeedAdminPermissionForInboxError`|  `NotAuthorizedError` |
|     `NotAuthorized_NonAdminsMustQueryByFolderOrPathError`|  `NotAuthorizedError` |
|     `NotAuthorized_NotAllowedToCreateBundleError`|  `NotAuthorizedError` |
|     `NotAuthorized_PasswordChangeNotRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_PasswordChangeRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReadOnlySessionError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReadPermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReauthenticationFailedError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReauthenticationFailedFinalError`|  `NotAuthorizedError` |
|     `NotAuthorized_ReauthenticationNeededActionError`|  `NotAuthorizedError` |
|     `NotAuthorized_RecaptchaFailedError`|  `NotAuthorizedError` |
|     `NotAuthorized_SelfManagedRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteAdminRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_SiteFilesAreImmutableError`|  `NotAuthorizedError` |
|     `NotAuthorized_TwoFactorAuthenticationRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_UserIdWithoutSiteAdminError`|  `NotAuthorizedError` |
|     `NotAuthorized_WriteAndBundlePermissionRequiredError`|  `NotAuthorizedError` |
|     `NotAuthorized_WritePermissionRequiredError`|  `NotAuthorizedError` |
|     `NotFound_ApiKeyNotFoundError`|  `NotFoundError` |
|     `NotFound_BundlePathNotFoundError`|  `NotFoundError` |
|     `NotFound_BundleRegistrationNotFoundError`|  `NotFoundError` |
|     `NotFound_CodeNotFoundError`|  `NotFoundError` |
|     `NotFound_FileNotFoundError`|  `NotFoundError` |
|     `NotFound_FileUploadNotFoundError`|  `NotFoundError` |
|     `NotFound_GroupNotFoundError`|  `NotFoundError` |
|     `NotFound_InboxNotFoundError`|  `NotFoundError` |
|     `NotFound_NestedNotFoundError`|  `NotFoundError` |
|     `NotFound_PlanNotFoundError`|  `NotFoundError` |
|     `NotFound_SiteNotFoundError`|  `NotFoundError` |
|     `NotFound_UserNotFoundError`|  `NotFoundError` |
|     `ProcessingFailure_AlreadyCompletedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_AutomationCannotBeRunManuallyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BehaviorNotAllowedOnRemoteServerError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BundleOnlyAllowsPreviewsError`|  `ProcessingFailureError` |
|     `ProcessingFailure_BundleOperationRequiresSubfolderError`|  `ProcessingFailureError` |
|     `ProcessingFailure_CouldNotCreateParentError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationExistsError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationFolderLimitedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationParentConflictError`|  `ProcessingFailureError` |
|     `ProcessingFailure_DestinationParentDoesNotExistError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExceededRuntimeLimitError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExpiredPrivateKeyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExpiredPublicKeyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExportFailureError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ExportNotReadyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FailedToChangePasswordError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileNotUploadedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FilePendingProcessingError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileProcessingErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileTooBigToDecryptError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileTooBigToEncryptError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FileUploadedToWrongRegionError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FilenameTooLongError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FolderLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_FolderNotEmptyError`|  `ProcessingFailureError` |
|     `ProcessingFailure_HistoryUnavailableError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidBundleCodeError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidFileTypeError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidFilenameError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidPriorityColorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidRangeError`|  `ProcessingFailureError` |
|     `ProcessingFailure_InvalidSiteError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ModelSaveErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_MultipleProcessingErrorsError`|  `ProcessingFailureError` |
|     `ProcessingFailure_PathTooLongError`|  `ProcessingFailureError` |
|     `ProcessingFailure_RecipientAlreadySharedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_RemoteServerErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ResourceBelongsToParentSiteError`|  `ProcessingFailureError` |
|     `ProcessingFailure_ResourceLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_SubfolderLockedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationCodeAlreadySentError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationCountryBlacklistedError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationGeneralErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationMethodUnsupportedErrorError`|  `ProcessingFailureError` |
|     `ProcessingFailure_TwoFactorAuthenticationUnsubscribedRecipientError`|  `ProcessingFailureError` |
|     `ProcessingFailure_UpdatesNotAllowedForRemotesError`|  `ProcessingFailureError` |
|     `RateLimited_DuplicateShareRecipientError`|  `RateLimitedError` |
|     `RateLimited_ReauthenticationRateLimitedError`|  `RateLimitedError` |
|     `RateLimited_TooManyConcurrentLoginsError`|  `RateLimitedError` |
|     `RateLimited_TooManyConcurrentRequestsError`|  `RateLimitedError` |
|     `RateLimited_TooManyLoginAttemptsError`|  `RateLimitedError` |
|     `RateLimited_TooManyRequestsError`|  `RateLimitedError` |
|     `RateLimited_TooManySharesError`|  `RateLimitedError` |
|     `ServiceUnavailable_AgentUnavailableError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_AutomationsUnavailableError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_MigrationInProgressError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_SiteDisabledError`|  `ServiceUnavailableError` |
|     `ServiceUnavailable_UploadsUnavailableError`|  `ServiceUnavailableError` |
|     `SiteConfiguration_AccountAlreadyExistsError`|  `SiteConfigurationError` |
|     `SiteConfiguration_AccountOverdueError`|  `SiteConfigurationError` |
|     `SiteConfiguration_NoAccountForSiteError`|  `SiteConfigurationError` |
|     `SiteConfiguration_SiteWasRemovedError`|  `SiteConfigurationError` |
|     `SiteConfiguration_TrialExpiredError`|  `SiteConfigurationError` |
|     `SiteConfiguration_TrialLockedError`|  `SiteConfigurationError` |
|     `SiteConfiguration_UserRequestsEnabledRequiredError`|  `SiteConfigurationError` |

## Pagination

Certain API operations return lists of objects. When the number of objects in the list is large,
the API will paginate the results.

The Files.com JavaScript SDK automatically paginates through lists of objects by default.

```javascript title="Example Request" hasDataFormatSelector
import File from 'files.com/lib/models/File';
import * as FilesErrors from 'files.com/lib/Errors';

Files.configureNetwork({
  // true by default
  autoPaginate: true,
});

try {
  const files = await Folder.listFor(path, {
    search: "some-partial-filename",
  });
  for (const file of files) {
    // Operate on file
  }
} catch (err) {
  if (err instanceof FilesErrors.NotAuthenticatedError) {
    console.error(`Authentication Error Occurred (${err.constructor.name}): ${err.error}`);
  } else if (err instanceof FilesErrors.FilesError) {
    console.error(`Unknown Error Occurred (${err.constructor.name}): ${err.error}`);
  } else {
    throw err;
  }
}
```

## Mock Server

Files.com publishes a Files.com API server, which is useful for testing your use of the Files.com
SDKs and other direct integrations against the Files.com API in an integration test environment.

It is a Ruby app that operates as a minimal server for the purpose of testing basic network
operations and JSON encoding for your SDK or API client. It does not maintain state and it does not
deeply inspect your submissions for correctness.

Eventually we will add more features intended for integration testing, such as the ability to
intentionally provoke errors.

Download the server as a Docker image via [Docker Hub](https://hub.docker.com/r/filescom/files-mock-server).

The Source Code is also available on [GitHub](https://github.com/Files-com/files-mock-server).

A README is available on the GitHub link.
