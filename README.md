# Files.com JavaScript SDK

The Files.com JavaScript SDK provides convenient access to the Files.com API from applications written in JavaScript.

## Installation

To install the package:

    yarn add files.com

or

    npm install files.com

## Usage

### Import and initialize

    import Files from 'files.com/lib/Files'

    // set your subdomain or custom domain
    Files.setBaseUrl('https://MY-SUBDOMAIN.files.com')

#### `require()` vs. `import`

The examples provided in the documentation here use the newer ES6 `import` syntax. To
instead use the older CommonJS module syntax with `require()`, ensure that `.default`
is included. For example:

    const Files = require('files.com/lib/Files').default
    const User = require('files.com/lib/models/User').default

    // destructure to directly assign a named export
    const { LogLevel } = require('files.com/lib/Logger').default

### Authentication

There are multiple ways to authenticate to the API.

#### Global API Key

You can set an API key globally like this:

    Files.setApiKey('my-api-key')

#### Per-Request API Key

Or, you can pass an API key per-request, in the options object at the end of every method like this:

    import User from 'files.com/lib/models/User'
    const user = new User(params, { apiKey: 'my-api-key' })

#### User Session

Or, you can open a user session by calling `Session.create()`

    import Session from 'files.com/lib/models/Session'
    const session = await Session.create({ username, password })

Then use it globally for all subsequent API calls like this:

    Files.setSessionId(session.id)

Or, you can pass the session ID per-request, in the options array at the end of every method like this:

    import User from 'files.com/lib/models/User'
    const user = new User(params, { sessionId: session.id })

### Setting Global Options

You can set the following global properties using static methods on the `Files` class:

#### Log Level

    import { LogLevel } from 'files.com/lib/Logger'
    Files.setLogLevel(LogLevel.INFO)

    /*
    Call Files.setLogLevel() with one of the following:
      LogLevel.NONE
      LogLevel.ERROR
      LogLevel.WARN
      LogLevel.INFO (default)
      LogLevel.DEBUG
    */

#### Debugging

    Files.configureDebugging({
      // enable debug logging of API requests (default: false)
      debugRequest: false,

      // enable debug logging of API response headers (default: false)
      debugResponseHeaders: false,
    })

#### Network

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
    })

### File Operations

#### List root folder

    import Folder from 'files.com/lib/models/Folder'
    const dirFiles = await Folder.listFor('/')

#### Uploading a file

    import File from 'files.com/lib/models/File'
    import { isBrowser } from 'files.com/lib/utils'

    // uploading raw file data
    await File.uploadData(destinationFileName, data)

    // uploading a file on disk (not available in browser)
    if (!isBrowser()) {
      await File.uploadFile(destinationFileName, sourceFilePath)
    }

#### Downloading a file

##### Get a downloadable file object by path

    import File from 'files.com/lib/models/File'

    const foundFile = await File.find(remoteFilePath)
    const downloadableFile = await foundFile.download()

##### Download a file (not available in browser)

    import { isBrowser } from 'files.com/lib/utils'

    if (!isBrowser()) {
      // download to a file on disk
      await downloadableFile.downloadToFile(localFilePath)

      // download to a writable stream
      await downloadableFile.downloadToStream(stream)

      // download in memory and return as a UTF-8 string
      const textContent = await downloadableFile.downloadToString()
    }

### Additional Object Documentation

Additional docs are available at https://developers.files.com

## Getting Support

The Files.com team is happy to help with any SDK Integration challenges you may face.

Just email support@files.com and we'll get the process started.
