import Readable from 'readable-stream'
import { Buffer } from 'safe-buffer'

/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  isBrowser, pathNormalizer, getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

// The model's attributes are its only state. Once an attribute is part of that state, whether given to the
// constructor, set or returned by the server, it can also be read, but not assigned, as a property of the model. The
// property always reads the current attributes, so it agrees with the getter after a set, an update or a save. A name
// the model already uses, for one of its members or a property assigned to it, keeps that use.
const exposeAttributes = (model, names) => {
  names.forEach(name => {
    if (!(name in model)) {
      Object.defineProperty(model, name, { get: () => model.attributes[name] })
    }
  })
}

// Makes attributes, as given to the constructor or returned by the server, the model's whole state, with '?' dropped
// from their names. The state is replaced only once the new attributes are complete.
const adoptAttributes = (model, attributes = {}) => {
  const adopted = {}
  Object.entries(attributes).forEach(([key, value]) => {
    adopted[key.replace('?', '')] = value
  })

  model.attributes = adopted
  exposeAttributes(model, Object.keys(adopted))
}

// The options a model keeps when a static method returns it. A call made without a client leaves its options with the
// model, as it always has. A call made through a client leaves the copy of its options taken when it began, client and
// overrides included, so the model's own requests are made as the one that returned it was; only the call's signal is
// left out, since cancelling the call that produced a model does not cancel the model's own requests.
const retainedOptions = options => {
  if (!options?.client) {
    return options
  }

  const { signal, ...context } = options
  return context
}

/**
 * Class File
 */
class File {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.path

  static _underscoreDestinationPath = (root, id, relativePath = '') =>
    pathNormalizer.normalize(`_/${root}/${id}/${relativePath || ''}`)

  // The agent for an upload part's request to storage at url, the only option that goes with it. Through a client,
  // it is the one the options choose as for an API request, their getAgentForUrl, agent, httpsAgent and httpAgent in
  // turn, then the client's getAgentForUrl and agent. Without a client, it is the one getAgentForUrl or agent gives,
  // as before.
  static _storageAgent = (url, options) => {
    if (!options.client) {
      return options.getAgentForUrl?.(url) || options?.agent
    }

    return options.getAgentForUrl?.(url) || options.agent || options.httpsAgent || options.httpAgent
      || options.client._agentChooser()?.(url) || undefined
  }

  // The agent for a download from url: for a File from a client, the one its options or client choose, as for an upload
  // part. Any other File gives none, and so downloads as it always has.
  static _downloadAgent = (file, url) => (file.options.client ? File._storageAgent(url, file.options) : undefined)

  // Whether a File's downloads ask an agent chooser for each URL (see _downloadAgent): only a File from a client can, and
  // does when its options give a getAgentForUrl, agent, httpsAgent or httpAgent, or its client a getAgentForUrl or an
  // agent, even a chooser that chooses none for a URL. Judged from those settings as they are now, calling neither a
  // chooser nor a getter: a setting a getter gives counts as given, and so does a client that is not a FilesClient.
  static _choosesDownloadAgent = file => {
    const settingOf = (holder, name) => {
      for (let owner = holder; owner !== null && owner !== undefined; owner = Object.getPrototypeOf(owner)) {
        const descriptor = Object.getOwnPropertyDescriptor(owner, name)

        if (descriptor) {
          return 'value' in descriptor ? { value: descriptor.value } : { getter: true }
        }
      }

      return { value: undefined }
    }

    const client = settingOf(file.options, 'client')

    if (client.getter) {
      return true
    }

    if (!client.value) {
      return false
    }

    const given = name => {
      const setting = settingOf(file.options, name)
      return setting.getter === true || Boolean(setting.value)
    }

    if (['getAgentForUrl', 'agent', 'httpsAgent', 'httpAgent'].some(given)) {
      return true
    }

    const FilesClient = require('../FilesClient.js').default
    return !(client.value instanceof FilesClient) || client.value._agentChooser() !== undefined
  }

  // The settings a File's downloads use: its client's, or else the global ones.
  static _downloadSettings = file => file.options?.client ?? require('../Files.js').default

  // Where a File's downloads log their requests, responses and the bytes they read, at DEBUG, with its settings' log
  // level and logger; and whether DEBUG is on for them as a download begins, so that below it nothing is done for each
  // chunk read.
  static _downloadLog = file => {
    const Logger = require('../Logger.js').default
    const config = File._downloadSettings(file)

    return {
      debug: (...messages) => Logger._log(config, Logger.LogLevel.DEBUG, ...messages),
      enabled: !Logger.isPaused && config.getLogLevel() >= Logger.LogLevel.DEBUG,
    }
  }

  // Whether a File's downloads go through a configured HTTP client: its own options' fetch, or else its settings'.
  // Without one, they go through Node.js's https (see File.node.js).
  static _downloadsThroughFetch = file => Boolean(file.options?.fetch ?? File._downloadSettings(file).getFetch())

  // How a File's download from storage sends each request through its configured HTTP client: open(url, headers, stop,
  // agent, whenSendable) sends it through the SDK's request path, as one attempt whose retries the download owns, with
  // agent, the File's agent for that URL (see _downloadAgent), which the download has chosen already, before it last
  // checked the request could be sent, none included, and asked again of nothing; a redirect's URL has the File's agent
  // for it chosen as the redirect is followed. whenSendable(url, signal), the download's own, decides whether each
  // request, a redirect's included, goes now, once every callback of its send has run, in the same turn as it is handed
  // to the fetch (see Api._downloadGate). It goes with the File's fetch,
  // timeoutSecs and settings, stopped by the download's own signal, or else the File's, or by stop, the request's own,
  // and only the headers given, asking for the file's bytes as they are stored, with no content coding (see
  // Api._openStorageDownload).
  static _openDownload = (file, signal) => (url, headers, stop, agent, whenSendable) => {
    const { nodeReadableOf } = require('../isomorphic/File.node.js')
    const { linkedSignal } = require('../Transfer.js')
    const storageOptions = File._storageOptions(file.options)
    const stoppedBy = [signal ?? storageOptions.signal, stop].filter(Boolean)
    const options = {
      ...storageOptions,
      [Api._downloadAgents]: requestUrl => (requestUrl === url ? agent : File._downloadAgent(file, requestUrl)),
      ...(whenSendable ? { [Api._downloadGate]: whenSendable } : {}),
      ...(stoppedBy.length > 0 ? { signal: linkedSignal(stoppedBy) } : {}),

      // cross-fetch's own option: the body as it was sent, not decoded.
      compress: false,
    }

    return Api._openStorageDownload(url, options, { 'Accept-Encoding': 'identity', ...headers }, nodeReadableOf, { attemptOnly: true })
  }

  // How a File's download gives its URL again once that has expired: as the File's own download() does, with the
  // File's options, its client, credentials, workspace and headers included, and the download's signal, as
  // download_uri. A File without a path, such as one made from a download URL alone, cannot.
  static _renewDownload = file => {
    if (!file.attributes.path) {
      return null
    }

    return async signal => {
      const response = await Api.sendRequest(`/files/${encodeURIComponent(file.attributes.path)}`, 'GET', {}, {
        ...file.options,
        ...(signal ? { signal } : {}),
      })

      return response?.data?.download_uri ?? null
    }
  }

  // Everything a download of a File from url takes (see File.node.js): the agent of a request to each URL it is sent
  // to, renewed ones included, and whether an agent chooser is asked for it; its log, retries, transport and renewal;
  // the budget of each of its requests, the File's timeoutSecs or else its settings' networkTimeout, as for any request;
  // and the download's own options.
  static _downloadSettingsOf = (file, url, options) => ({
    agentFor: requestUrl => File._downloadAgent(file, requestUrl),
    choosesAgent: () => File._choosesDownloadAgent(file),
    log: File._downloadLog(file),
    maxRetries: File._downloadSettings(file).getMaxNetworkRetries(),
    openFetch: File._downloadsThroughFetch(file) ? File._openDownload(file, options?.signal) : null,
    options: options ?? {},
    renew: File._renewDownload(file),
    timeoutSecs: file.options?.timeoutSecs ?? File._downloadSettings(file).getNetworkTimeout(),
    url,
  })

  // What the upload's owner (see Upload.js) takes of the File model: the agent of a part's request to storage at url,
  // as for an API request (see _storageAgent); the File an upload resolves with, which keeps the upload's options as a
  // static method's model does, its client but not its signal; the FileUploadPart determinePartUploadUri receives; and
  // the options of a part's request (see _storageOptions).
  static _uploadHooks = {
    agentFor: (url, options) => File._storageAgent(url, options),
    makeFile: (data, options) => new File(data, retainedOptions(options)),
    makeUploadPart: data => {
      const FileUploadPart = require('./FileUploadPart.js').default
      return new FileUploadPart(data)
    },
    storageOptionsOf: options => File._storageOptions(options),
  }

  // Uploads the source openSource(admission) gives (see Upload.js) to destinationPath, with params and options, its file
  // name in a form being the destination's. The upload checks its options before it opens the source, in the same turn
  // as the call, so that a bad option opens nothing and data in memory is copied, or refused, before its caller can
  // change it; and it owns the source from then on, closing it, a file on disk included, once it has settled. A
  // failure of the SDK's own rejects as it is; any other, such as the source's, as a FilesError of its message, as an
  // upload's failures always have; a cancelled upload rejects with its signal's reason itself.
  static _upload = async (destinationPath, openSource, params, options) => {
    const signal = options?.signal

    try {
      const { uploadSource } = require('../Upload.js')
      return await uploadSource({
        destinationPath,
        fileName: `${destinationPath ?? ''}`.split('/').pop() || 'file',
        hooks: File._uploadHooks,
        open: openSource,
        options,
        params,
      })
    } catch (error) {
      if (File._isCancellation(signal, error) || error instanceof errors.FilesError) {
        throw error
      }

      errors.handleErrorResponse(error)
      return null
    }
  }

  // The options of an upload's requests to storage: its signal, timeoutSecs, fetch and client, whose network and log
  // settings apply, but none of its credentials, headers or other options. A request's agent is chosen for its URL (see
  // _storageAgent).
  static _storageOptions = options => Object.fromEntries(['client', 'fetch', 'signal', 'timeoutSecs']
    .filter(name => options[name] !== undefined && options[name] !== null)
    .map(name => [name, options[name]]))

  // The options of a File's own copy or move: options given to the call replace the File's, as they always have, but a
  // File from a client keeps that client when the options give none (leave it out, or undefined or null), so its
  // requests never use the global settings. A client the options give is used instead, with only those options.
  static _keepClient = (file, options) => {
    const originClient = file.options.client
    const givenClient = options?.client

    if (originClient === undefined || originClient === null || (givenClient !== undefined && givenClient !== null)) {
      return options
    }

    return { ...options, client: originClient }
  }

  // Sends a copy or move to path, with params and options, and resolves with the API's response, as the copy and move
  // helpers always have, its fields unchanged, with waitForCompletion() besides (see ActionWait.js), which waits for that
  // action in the context its request was sent with (see Api._sendAction).
  static _actionResponse = async (path, params, options) => {
    const { action, response } = await Api._sendAction(path, 'POST', params, options)
    const { withWait } = require('../ActionWait.js')
    return withWait(response, action)
  }

  // Whether error is what an upload cancelled by its signal fails with: the signal's reason itself, whatever it is, falsy
  // values and NaN included, which only Object.is() finds equal to itself; or, when the runtime gives the signal no
  // reason, an AbortError.
  static _isCancellation = (signal, error) => signal?.aborted === true
    && (Object.is(error, signal.reason)
      || (signal.reason === undefined && error instanceof Error && error.name === 'AbortError'))

  // The name of the file at sourceFilePath, its last segment, by forward or back slashes: the destination of an upload
  // to an external destination given none.
  static _sourceFileName = sourceFilePath => `${sourceFilePath}`.split(/[\\/]/).filter(segment => segment !== '').pop() ?? ''

  /**
   * Uploads the file at sourceFilePath on disk to destinationPath: the source first, then where it goes. Node.js only.
   * @note see File.uploadFile() and File.UploadParams for the supported params
   */
  static upload = async (sourceFilePath, destinationPath, params, options) =>
    File.uploadFile(destinationPath, sourceFilePath, params, options)

  /**
   * Uploads data, a string, bytes, a stream or an iterable of chunks, to destinationPath: the source first.
   * @note see File.uploadData() and File.UploadParams for the supported params
   */
  static uploadFromData = async (data, destinationPath, params, options) =>
    File.uploadData(destinationPath, data, params, options)

  /**
   * Uploads what readableStream yields to destinationPath: the source first.
   * @note see File.uploadStream() and File.UploadParams for the supported params
   */
  static uploadFromStream = async (readableStream, destinationPath, params, options) =>
    File.uploadStream(destinationPath, readableStream, params, options)

  static uploadToRemoteServer = async (remoteServerId, destinationPath, sourceFilePath, params, options) =>
    File.uploadFile(File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath), sourceFilePath, params, options)

  /**
   * Uploads the file at sourceFilePath on disk to destinationPath in a Remote Server: the source first.
   * With destinationPath left out, or undefined, the file goes to the destination's root, under its own name.
   * Node.js only.
   * @note see File.uploadFile() and File.UploadParams for the supported params
   */
  static uploadFileToRemoteServer = async (sourceFilePath, remoteServerId, destinationPath, params, options) =>
    File.uploadFile(File._underscoreDestinationPath(
      'RemoteServers',
      remoteServerId,
      destinationPath === undefined ? File._sourceFileName(sourceFilePath) : destinationPath,
    ), sourceFilePath, params, options)

  static uploadToSnapshot = async (snapshotId, destinationPath, sourceFilePath, params, options) =>
    File.uploadFile(File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath), sourceFilePath, params, options)

  /**
   * Uploads the file at sourceFilePath on disk to destinationPath in a Snapshot: the source first.
   * With destinationPath left out, or undefined, the file goes to the destination's root, under its own name.
   * Node.js only.
   * @note see File.uploadFile() and File.UploadParams for the supported params
   */
  static uploadFileToSnapshot = async (sourceFilePath, snapshotId, destinationPath, params, options) =>
    File.uploadFile(File._underscoreDestinationPath(
      'Snapshots',
      snapshotId,
      destinationPath === undefined ? File._sourceFileName(sourceFilePath) : destinationPath,
    ), sourceFilePath, params, options)

  static uploadToChildSite = async (siteId, destinationPath, sourceFilePath, params, options) =>
    File.uploadFile(File._underscoreDestinationPath('Sites', siteId, destinationPath), sourceFilePath, params, options)

  /**
   * Uploads the file at sourceFilePath on disk to destinationPath in a Child Site: the source first.
   * With destinationPath left out, or undefined, the file goes to the destination's root, under its own name.
   * Node.js only.
   * @note see File.uploadFile() and File.UploadParams for the supported params
   */
  static uploadFileToChildSite = async (sourceFilePath, siteId, destinationPath, params, options) =>
    File.uploadFile(File._underscoreDestinationPath(
      'Sites',
      siteId,
      destinationPath === undefined ? File._sourceFileName(sourceFilePath) : destinationPath,
    ), sourceFilePath, params, options)

  static copyToRemoteServer = async (path, remoteServerId, destinationPath, params = {}, options = {}) =>
    File._actionResponse(`/file_actions/copy/${encodeURIComponent(path)}`, {
      ...(params || {}),
      destination: File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath),
    }, options)

  static moveToRemoteServer = async (path, remoteServerId, destinationPath, params = {}, options = {}) =>
    File._actionResponse(`/file_actions/move/${encodeURIComponent(path)}`, {
      ...(params || {}),
      destination: File._underscoreDestinationPath('RemoteServers', remoteServerId, destinationPath),
    }, options)

  static copyToSnapshot = async (path, snapshotId, destinationPath, params = {}, options = {}) =>
    File._actionResponse(`/file_actions/copy/${encodeURIComponent(path)}`, {
      ...(params || {}),
      destination: File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath),
    }, options)

  static moveToSnapshot = async (path, snapshotId, destinationPath, params = {}, options = {}) =>
    File._actionResponse(`/file_actions/move/${encodeURIComponent(path)}`, {
      ...(params || {}),
      destination: File._underscoreDestinationPath('Snapshots', snapshotId, destinationPath),
    }, options)

  static copyToChildSite = async (path, siteId, destinationPath, params = {}, options = {}) =>
    File._actionResponse(`/file_actions/copy/${encodeURIComponent(path)}`, {
      ...(params || {}),
      destination: File._underscoreDestinationPath('Sites', siteId, destinationPath),
    }, options)

  static moveToChildSite = async (path, siteId, destinationPath, params = {}, options = {}) =>
    File._actionResponse(`/file_actions/move/${encodeURIComponent(path)}`, {
      ...(params || {}),
      destination: File._underscoreDestinationPath('Sites', siteId, destinationPath),
    }, options)

  /**
   * Uploads what readableStream yields to destinationPath (see Upload.js). The stream stays its caller's: it is read
   * only as the upload needs its bytes, and never closed or destroyed. Each chunk is copied as the upload takes it, so
   * that changing it afterwards changes nothing that is uploaded.
   * @note see File.copy() for list of supported params
   */
  static uploadStream = async (destinationPath, readableStream, params, options) => File._upload(destinationPath, admission => {
    const { streamSource } = require('../Upload.js')
    return streamSource(readableStream, { admission })
  }, params, options)

  /**
   * data - string, Buffer, Stream, any object implementing Symbol.iterator or Symbol.asyncIterator
   * @note see File.copy() for list of supported params
   */
  static uploadData = async (destinationPath, data, params, options) => {
    if (!data) {
      throw new errors.MissingParameterError('Upload data was not provided')
    }

    // An ArrayBuffer is uploaded as its bytes, as a view of it is.
    const given = data instanceof ArrayBuffer ? Buffer.from(data) : data

    // Bytes in memory are copied as the upload opens them, in this call, or refused (see Upload.js).
    return File._upload(destinationPath, admission => {
      const { dataSourceOf } = require('../Upload.js')
      return dataSourceOf(given, iterable => Readable.from(iterable), admission)
    }, params, options)
  }

  /**
   * Uploads the file at sourceFilePath (see Upload.js), read at each part's own position, its size known, so that its
   * parts can go in parallel. The file is opened once the upload's file has been admitted, and before the upload
   * begins, so that failing to open it fails the upload without beginning it, and closed once the upload has settled.
   * @note see File.copy() for list of supported params
   */
  static uploadFile = async (destinationPath, sourceFilePath, params, options) => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Disk file uploads are only available in a NodeJS environment')
    }

    return File._upload(destinationPath, () => {
      const { openUploadFile } = require('../isomorphic/File.node.js')
      return openUploadFile(sourceFilePath)
    }, params, options)
  }

  // The options of a folder upload or download that are its files' own transfers', never those of the API requests it
  // makes itself (creating, describing and listing folders, and describing each file), which take every other option.
  static _directoryTransferOptions = ['concurrency', 'control', 'determinePartUploadUri', 'job', 'maxConcurrency', 'onProgress', 'size', 'startup']

  static _directoryRequestOptions = options => Object.fromEntries(Object.entries(options ?? {})
    .filter(([name]) => !File._directoryTransferOptions.includes(name)))

  // What each file's download of a folder download takes: the call's signal and transfer options, and job.
  static _directoryDownloadOptions = (options, job) => ({
    ...Object.fromEntries(['control', 'maxConcurrency', 'onProgress', 'signal']
      .filter(name => options?.[name] !== undefined)
      .map(name => [name, options[name]])),
    job,
  })

  // The Files.com folder of a folder upload or download, as given, but for slashes at either end; a path that is not a
  // string, or names the site's root folder, is refused.
  static _directoryPath = (value, name) => {
    const directoryPath = isString(value) ? value.replace(/^\/+|\/+$/g, '') : ''

    if (directoryPath === '') {
      throw new errors.InvalidParameterError(`Bad parameter: ${name} must name a Files.com folder other than the root, received ${isString(value) ? JSON.stringify(value) : getType(value)}`)
    }

    return directoryPath
  }

  // The local folder of a folder upload or download, as given: a path that is not a string, or is empty, is refused.
  static _localDirectoryPath = (value, name) => {
    if (!isString(value) || value === '') {
      throw new errors.InvalidParameterError(`Bad parameter: ${name} must be the path of a local folder, received ${isString(value) ? '""' : getType(value)}`)
    }

    return value
  }

  // Ends a folder upload or download, between its steps, once its signal has aborted: with the signal's reason itself,
  // whatever it is, as a cancelled call rejects, or, when the runtime gives the signal none, an AbortError.
  static _stopIfAborted = signal => {
    if (signal?.aborted) {
      throw signal.reason === undefined ? Object.assign(new Error('This operation was aborted'), { name: 'AbortError' }) : signal.reason
    }
  }

  /**
   * Uploads the local folder at sourceDirectoryPath, with everything in it, to a new folder at destinationPath: the
   * source first. Its local tree is read first (see Directory.node.js), then the folder is created, then each folder
   * in it, then each file, one at a time, by File.uploadFile(), all sharing options.job or a TransferJob of the call's
   * own. Node.js only. See models/File.d.ts for what it guarantees.
   */
  static uploadDirectory = async (sourceDirectoryPath, destinationPath, options = {}) => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Folder uploads are only available in a NodeJS environment')
    }

    const source = File._localDirectoryPath(sourceDirectoryPath, 'sourceDirectoryPath')
    const root = File._directoryPath(destinationPath, 'destinationPath')

    if (options?.size !== undefined) {
      throw new errors.InvalidParameterError('Bad parameter: size cannot be given to a folder upload, whose files each have their own')
    }

    // The signal is checked before the tree is read, and between each step of reading it, so that a cancelled upload
    // reads no further and rejects with its reason, unchanged, whatever the tree holds or lacks.
    const signal = options?.signal
    const stopIfAborted = () => File._stopIfAborted(signal)
    const { planUpload } = require('../isomorphic/Directory.node.js')
    const plan = await planUpload(source, stopIfAborted)
    stopIfAborted()

    const { TransferJob } = require('../Transfer.js')
    const Folder = require('./Folder.js').default
    const requestOptions = File._directoryRequestOptions(options)
    const fileOptions = { ...options, job: options?.job ?? new TransferJob() }
    const result = { bytes: 0, directories: [], files: [] }

    await Folder.create(root, { mkdir_parents: false }, requestOptions)

    await plan.directories.reduce((previous, relativePath) => previous.then(async () => {
      File._stopIfAborted(signal)
      await Folder.create(`${root}/${relativePath}`, { mkdir_parents: false }, requestOptions)
      result.directories.push(relativePath)
    }), Promise.resolve())

    // A file's bytes are those of its completed upload, as the API reports the file it published: what was uploaded,
    // even when the file changed size after the tree was read. A completed upload whose file reports no size fails the
    // call rather than being counted as some other size.
    await plan.files.reduce((previous, file) => previous.then(async () => {
      File._stopIfAborted(signal)
      const uploaded = await File.uploadFile(`${root}/${file.relativePath}`, file.localPath, {}, fileOptions)
      const size = uploaded?.attributes?.size

      if (!Number.isSafeInteger(size) || size < 0) {
        throw new errors.FilesError(`The upload of ${file.relativePath} completed, but the file it published reports no size, so its bytes cannot be counted`)
      }

      result.files.push(file.relativePath)
      result.bytes += size
    }), Promise.resolve())

    return result
  }

  /**
   * Downloads the Files.com folder at path, with everything in it, into a new local folder at destinationDirectoryPath:
   * the source first. The folder is described first, and must be one; then the local folder is made, and each folder's
   * listing is taken whole and its entries made in the order listed, a folder before what is inside it, each file
   * described again for its download URL and downloaded by downloadToStream() into a new file opened exclusively (see
   * Directory.node.js), one at a time, all sharing options.job or a TransferJob of the call's own. Node.js only. See
   * models/File.d.ts for what it guarantees.
   */
  static downloadDirectory = async (path, destinationDirectoryPath, options = {}) => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Folder downloads are only available in a NodeJS environment')
    }

    const root = File._directoryPath(path, 'path')
    const destination = File._localDirectoryPath(destinationDirectoryPath, 'destinationDirectoryPath')
    const signal = options?.signal
    const { TransferJob } = require('../Transfer.js')
    const Folder = require('./Folder.js').default
    const { localPathOf, makeFolder, openNewFile } = require('../isomorphic/Directory.node.js')
    const requestOptions = File._directoryRequestOptions(options)
    const downloadOptions = File._directoryDownloadOptions(options, options?.job ?? new TransferJob())
    const result = { bytes: 0, directories: [], files: [] }

    File._stopIfAborted(signal)
    const described = await File.find(root, {}, requestOptions)

    if (described?.attributes?.type !== 'directory') {
      throw new errors.FilesError(`${root} is not a folder, so it cannot be downloaded as one`)
    }

    File._stopIfAborted(signal)
    await makeFolder(destination)

    // Downloads entry, a listed file, into a new local file at localPath. The file is opened only once its download URL
    // has been given, and is closed, its descriptor with it, before this settles, whether the download completed or
    // failed, even before any byte was written, as when the download fails before it is given the file. The download's
    // own failure, or its cancellation, is kept as it came, a falsy signal reason included; only without one does a
    // failure of the file itself, such as one to close it, fail it, which then counts nothing of the file.
    const downloadFile = async (entry, localPath, relativePath) => {
      const downloadable = await new File({ path: entry.attributes.path }, requestOptions).download()
      const { closed, stream } = await openNewFile(localPath)
      let failure = null

      try {
        await downloadable.downloadToStream(stream, downloadOptions)
      } catch (error) {
        failure = { error }
      }

      if (failure && !stream.destroyed) {
        stream.destroy()
      }

      const fileFailure = await closed

      if (failure) {
        throw failure.error
      }

      if (fileFailure) {
        throw fileFailure.error
      }

      result.files.push(relativePath)
      result.bytes += stream.bytesWritten
    }

    // Makes the local folder of each folder listed in folderPath, and downloads each file listed there, in turn. Each
    // entry must be directly inside folderPath, as the API names it, with a name that can be written as it is.
    const visit = async (folderPath, localFolder, segments) => {
      const entries = await Folder.listFor(folderPath, {}, { ...requestOptions, autoPaginate: true })

      await entries.reduce((previous, entry) => previous.then(async () => {
        File._stopIfAborted(signal)
        const entryPath = `${entry?.attributes?.path ?? ''}`
        const parent = entryPath.slice(0, Math.max(entryPath.lastIndexOf('/'), 0))

        if (entryPath.lastIndexOf('/') < 0 || !pathNormalizer.same(parent, folderPath)) {
          throw new errors.FilesError(`The API listed ${JSON.stringify(entryPath)} in ${folderPath}, which it is not directly inside`)
        }

        const name = entryPath.slice(entryPath.lastIndexOf('/') + 1)
        const localPath = localPathOf(destination, localFolder, name)
        const relativePath = [...segments, name].join('/')

        if (entry.attributes.type === 'directory') {
          await makeFolder(localPath)
          result.directories.push(relativePath)
          await visit(entryPath, localPath, [...segments, name])
        } else {
          await downloadFile(entry, localPath, relativePath)
        }
      }), Promise.resolve())
    }

    await visit(root, destination, [])
    return result
  }

  downloadToStream = async (writableStream, options) => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Stream downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new errors.EmptyPropertyError('Current object has no download URI')
    }

    const { downloadUrlToStream } = require('../isomorphic/File.node.js')
    return downloadUrlToStream(writableStream, File._downloadSettingsOf(this, downloadUri, options))
  }

  downloadToString = async options => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('String downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new errors.EmptyPropertyError('Current object has no download URI')
    }

    const { downloadUrlToString } = require('../isomorphic/File.node.js')
    return downloadUrlToString(File._downloadSettingsOf(this, downloadUri, options))
  }

  downloadToFile = async (destinationPath, options) => {
    if (isBrowser()) {
      throw new errors.NotImplementedError('Disk file downloads are only available in a NodeJS environment')
    }

    const downloadUri = this.getDownloadUri()

    if (!downloadUri) {
      throw new errors.EmptyPropertyError('Current object has no download URI')
    }

    const { downloadUrlToFile } = require('../isomorphic/File.node.js')
    return downloadUrlToFile(destinationPath, File._downloadSettingsOf(this, downloadUri, options))
  }

  copyTo = async (destinationFilePath, options = this.options) => {
    const params = { destination: destinationFilePath }
    return File._actionResponse(`/file_actions/copy/${encodeURIComponent(this.path)}`, params, File._keepClient(this, options))
  }

  copyToRemoteServer = async (remoteServerId, destinationPath, params = {}, options = this.options) =>
    File.copyToRemoteServer(this.path, remoteServerId, destinationPath, params, File._keepClient(this, options))

  copyToSnapshot = async (snapshotId, destinationPath, params = {}, options = this.options) =>
    File.copyToSnapshot(this.path, snapshotId, destinationPath, params, File._keepClient(this, options))

  copyToChildSite = async (siteId, destinationPath, params = {}, options = this.options) =>
    File.copyToChildSite(this.path, siteId, destinationPath, params, File._keepClient(this, options))

  moveTo = async (destinationFilePath, options = this.options) => {
    const params = { destination: destinationFilePath }
    return File._actionResponse(`/file_actions/move/${encodeURIComponent(this.path)}`, params, File._keepClient(this, options))
  }

  moveToRemoteServer = async (remoteServerId, destinationPath, params = {}, options = this.options) =>
    File.moveToRemoteServer(this.path, remoteServerId, destinationPath, params, File._keepClient(this, options))

  moveToSnapshot = async (snapshotId, destinationPath, params = {}, options = this.options) =>
    File.moveToSnapshot(this.path, snapshotId, destinationPath, params, File._keepClient(this, options))

  moveToChildSite = async (siteId, destinationPath, params = {}, options = this.options) =>
    File.moveToChildSite(this.path, siteId, destinationPath, params, File._keepClient(this, options))

  // string # File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000 characters.
  getPath = () => this.attributes.path

  setPath = value => {
    this.attributes.path = value
    exposeAttributes(this, ['path'])
  }

  // int64 # User ID of the User who created the file/folder
  getCreatedById = () => this.attributes.created_by_id

  setCreatedById = value => {
    this.attributes.created_by_id = value
    exposeAttributes(this, ['created_by_id'])
  }

  // int64 # ID of the API key that created the file/folder
  getCreatedByApiKeyId = () => this.attributes.created_by_api_key_id

  setCreatedByApiKeyId = value => {
    this.attributes.created_by_api_key_id = value
    exposeAttributes(this, ['created_by_api_key_id'])
  }

  // int64 # ID of the AS2 Incoming Message that created the file/folder
  getCreatedByAs2IncomingMessageId = () => this.attributes.created_by_as2_incoming_message_id

  setCreatedByAs2IncomingMessageId = value => {
    this.attributes.created_by_as2_incoming_message_id = value
    exposeAttributes(this, ['created_by_as2_incoming_message_id'])
  }

  // int64 # ID of the Automation that created the file/folder
  getCreatedByAutomationId = () => this.attributes.created_by_automation_id

  setCreatedByAutomationId = value => {
    this.attributes.created_by_automation_id = value
    exposeAttributes(this, ['created_by_automation_id'])
  }

  // int64 # ID of the Bundle Registration that created the file/folder
  getCreatedByBundleRegistrationId = () => this.attributes.created_by_bundle_registration_id

  setCreatedByBundleRegistrationId = value => {
    this.attributes.created_by_bundle_registration_id = value
    exposeAttributes(this, ['created_by_bundle_registration_id'])
  }

  // int64 # ID of the Inbox that created the file/folder
  getCreatedByInboxId = () => this.attributes.created_by_inbox_id

  setCreatedByInboxId = value => {
    this.attributes.created_by_inbox_id = value
    exposeAttributes(this, ['created_by_inbox_id'])
  }

  // int64 # ID of the Remote Server that created the file/folder
  getCreatedByRemoteServerId = () => this.attributes.created_by_remote_server_id

  setCreatedByRemoteServerId = value => {
    this.attributes.created_by_remote_server_id = value
    exposeAttributes(this, ['created_by_remote_server_id'])
  }

  // int64 # ID of the Sync that created the file/folder
  getCreatedBySyncId = () => this.attributes.created_by_sync_id

  setCreatedBySyncId = value => {
    this.attributes.created_by_sync_id = value
    exposeAttributes(this, ['created_by_sync_id'])
  }

  // object # Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  getCustomMetadata = () => this.attributes.custom_metadata

  setCustomMetadata = value => {
    this.attributes.custom_metadata = value
    exposeAttributes(this, ['custom_metadata'])
  }

  // string # File/Folder display name
  getDisplayName = () => this.attributes.display_name

  setDisplayName = value => {
    this.attributes.display_name = value
    exposeAttributes(this, ['display_name'])
  }

  // string # Type: `directory` or `file`.
  getType = () => this.attributes.type

  setType = value => {
    this.attributes.type = value
    exposeAttributes(this, ['type'])
  }

  // int64 # File/Folder size
  getSize = () => this.attributes.size

  setSize = value => {
    this.attributes.size = value
    exposeAttributes(this, ['size'])
  }

  // date-time # File created date/time
  getCreatedAt = () => this.attributes.created_at

  // int64 # User ID of the User who last modified the file/folder
  getLastModifiedById = () => this.attributes.last_modified_by_id

  setLastModifiedById = value => {
    this.attributes.last_modified_by_id = value
    exposeAttributes(this, ['last_modified_by_id'])
  }

  // int64 # ID of the API key that last modified the file/folder
  getLastModifiedByApiKeyId = () => this.attributes.last_modified_by_api_key_id

  setLastModifiedByApiKeyId = value => {
    this.attributes.last_modified_by_api_key_id = value
    exposeAttributes(this, ['last_modified_by_api_key_id'])
  }

  // int64 # ID of the Automation that last modified the file/folder
  getLastModifiedByAutomationId = () => this.attributes.last_modified_by_automation_id

  setLastModifiedByAutomationId = value => {
    this.attributes.last_modified_by_automation_id = value
    exposeAttributes(this, ['last_modified_by_automation_id'])
  }

  // int64 # ID of the Bundle Registration that last modified the file/folder
  getLastModifiedByBundleRegistrationId = () => this.attributes.last_modified_by_bundle_registration_id

  setLastModifiedByBundleRegistrationId = value => {
    this.attributes.last_modified_by_bundle_registration_id = value
    exposeAttributes(this, ['last_modified_by_bundle_registration_id'])
  }

  // int64 # ID of the Remote Server that last modified the file/folder
  getLastModifiedByRemoteServerId = () => this.attributes.last_modified_by_remote_server_id

  setLastModifiedByRemoteServerId = value => {
    this.attributes.last_modified_by_remote_server_id = value
    exposeAttributes(this, ['last_modified_by_remote_server_id'])
  }

  // int64 # ID of the Sync that last modified the file/folder
  getLastModifiedBySyncId = () => this.attributes.last_modified_by_sync_id

  setLastModifiedBySyncId = value => {
    this.attributes.last_modified_by_sync_id = value
    exposeAttributes(this, ['last_modified_by_sync_id'])
  }

  // date-time # File last modified date/time, according to the server.  This is the timestamp of the last Files.com operation of the file, regardless of what modified timestamp was sent.
  getMtime = () => this.attributes.mtime

  setMtime = value => {
    this.attributes.mtime = value
    exposeAttributes(this, ['mtime'])
  }

  // date-time # File last modified date/time, according to the client who set it.  Files.com allows desktop, FTP, SFTP, and WebDAV clients to set modified at times.  This allows Desktop<->Cloud syncing to preserve modified at times.
  getProvidedMtime = () => this.attributes.provided_mtime

  setProvidedMtime = value => {
    this.attributes.provided_mtime = value
    exposeAttributes(this, ['provided_mtime'])
  }

  // string # File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getCrc32 = () => this.attributes.crc32

  setCrc32 = value => {
    this.attributes.crc32 = value
    exposeAttributes(this, ['crc32'])
  }

  // string # File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getMd5 = () => this.attributes.md5

  setMd5 = value => {
    this.attributes.md5 = value
    exposeAttributes(this, ['md5'])
  }

  // string # File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getSha1 = () => this.attributes.sha1

  setSha1 = value => {
    this.attributes.sha1 = value
    exposeAttributes(this, ['sha1'])
  }

  // string # File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again.
  getSha256 = () => this.attributes.sha256

  setSha256 = value => {
    this.attributes.sha256 = value
    exposeAttributes(this, ['sha256'])
  }

  // string # MIME Type.  This is determined by the filename extension and is not stored separately internally.
  getMimeType = () => this.attributes.mime_type

  setMimeType = value => {
    this.attributes.mime_type = value
    exposeAttributes(this, ['mime_type'])
  }

  // string # Region location
  getRegion = () => this.attributes.region

  setRegion = value => {
    this.attributes.region = value
    exposeAttributes(this, ['region'])
  }

  // string # A short string representing the current user's permissions.  Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List) or any combination
  getPermissions = () => this.attributes.permissions

  setPermissions = value => {
    this.attributes.permissions = value
    exposeAttributes(this, ['permissions'])
  }

  // boolean # Are subfolders locked and unable to be modified?
  getSubfoldersLocked = () => this.attributes.subfolders_locked

  setSubfoldersLocked = value => {
    this.attributes.subfolders_locked = value
    exposeAttributes(this, ['subfolders_locked'])
  }

  // boolean # Is this folder locked and unable to be modified?
  getIsLocked = () => this.attributes.is_locked

  setIsLocked = value => {
    this.attributes.is_locked = value
    exposeAttributes(this, ['is_locked'])
  }

  // string # Link to download file. Provided only in response to a download request.
  getDownloadUri = () => this.attributes.download_uri

  setDownloadUri = value => {
    this.attributes.download_uri = value
    exposeAttributes(this, ['download_uri'])
  }

  // DirectConnectionInfo # Optional direct connection information for direct Agent transfer attempts
  getDirectConnectionInfo = () => this.attributes.direct_connection_info

  setDirectConnectionInfo = value => {
    this.attributes.direct_connection_info = value
    exposeAttributes(this, ['direct_connection_info'])
  }

  // string # Bookmark/priority color of file/folder
  getPriorityColor = () => this.attributes.priority_color

  setPriorityColor = value => {
    this.attributes.priority_color = value
    exposeAttributes(this, ['priority_color'])
  }

  // int64 # File preview ID
  getPreviewId = () => this.attributes.preview_id

  setPreviewId = value => {
    this.attributes.preview_id = value
    exposeAttributes(this, ['preview_id'])
  }

  // Preview # File preview
  getPreview = () => this.attributes.preview

  setPreview = value => {
    this.attributes.preview = value
    exposeAttributes(this, ['preview'])
  }

  // string # The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
  getAction = () => this.attributes.action

  setAction = value => {
    this.attributes.action = value
    exposeAttributes(this, ['action'])
  }

  // int64 # Length of file.
  getLength = () => this.attributes.length

  setLength = value => {
    this.attributes.length = value
    exposeAttributes(this, ['length'])
  }

  // boolean # Create parent directories if they do not exist?
  getMkdirParents = () => this.attributes.mkdir_parents

  setMkdirParents = value => {
    this.attributes.mkdir_parents = value
    exposeAttributes(this, ['mkdir_parents'])
  }

  // int64 # Part if uploading a part.
  getPart = () => this.attributes.part

  setPart = value => {
    this.attributes.part = value
    exposeAttributes(this, ['part'])
  }

  // int64 # How many parts to fetch?
  getParts = () => this.attributes.parts

  setParts = value => {
    this.attributes.parts = value
    exposeAttributes(this, ['parts'])
  }

  // string #
  getRef = () => this.attributes.ref

  setRef = value => {
    this.attributes.ref = value
    exposeAttributes(this, ['ref'])
  }

  // int64 # File byte offset to restart from.
  getRestart = () => this.attributes.restart

  setRestart = value => {
    this.attributes.restart = value
    exposeAttributes(this, ['restart'])
  }

  // boolean # If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to the destination folder tree?
  getCopyBehaviors = () => this.attributes.copy_behaviors

  setCopyBehaviors = value => {
    this.attributes.copy_behaviors = value
    exposeAttributes(this, ['copy_behaviors'])
  }

  // string # If copying folder, copy just the structure?
  getStructure = () => this.attributes.structure

  setStructure = value => {
    this.attributes.structure = value
    exposeAttributes(this, ['structure'])
  }

  // boolean # Allow file rename instead of overwrite?
  getWithRename = () => this.attributes.with_rename

  setWithRename = value => {
    this.attributes.with_rename = value
    exposeAttributes(this, ['with_rename'])
  }

  // boolean # If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  getBufferedUpload = () => this.attributes.buffered_upload

  setBufferedUpload = value => {
    this.attributes.buffered_upload = value
    exposeAttributes(this, ['buffered_upload'])
  }

  // boolean # Include optional direct connection information for a direct Agent transfer attempt?
  getWithDirectConnectionInfo = () => this.attributes.with_direct_connection_info

  setWithDirectConnectionInfo = value => {
    this.attributes.with_direct_connection_info = value
    exposeAttributes(this, ['with_direct_connection_info'])
  }

  // Download File
  //
  // Parameters:
  //   action - string - Can be blank, `redirect` or `stat`.  If set to `stat`, we will return file information but without a download URL, and without logging a download.  If set to `redirect` we will serve a 302 redirect directly to the file.  This is used for integrations with Zapier, and is not recommended for most integrations.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  //   with_direct_connection_info - boolean - Include optional direct connection information for a direct Agent transfer attempt?
  download = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.action !== undefined && params.action !== null && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.preview_size !== undefined && params.preview_size !== null && !isString(params.preview_size)) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params.preview_size)}`)
    }

    if (isArray(params.with_previews) || isObject(params.with_previews)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_previews must be of type Boolean, received ${getType(params.with_previews)}`)
    }

    if (isArray(params.with_priority_color) || isObject(params.with_priority_color)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_priority_color must be of type Boolean, received ${getType(params.with_priority_color)}`)
    }

    if (isArray(params.with_direct_connection_info) || isObject(params.with_direct_connection_info)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_direct_connection_info must be of type Boolean, received ${getType(params.with_direct_connection_info)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'GET', params, this.options)

    return new File(response?.data, this.options)
  }

  // Parameters:
  //   custom_metadata - object - Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
  //   provided_mtime - string - Modified time of file.
  //   priority_color - string - Priority/Bookmark color of file.
  update = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.provided_mtime !== undefined && params.provided_mtime !== null && !isString(params.provided_mtime)) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params.provided_mtime)}`)
    }

    if (params.priority_color !== undefined && params.priority_color !== null && !isString(params.priority_color)) {
      throw new errors.InvalidParameterError(`Bad parameter: priority_color must be of type String, received ${getType(params.priority_color)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'PATCH', params, this.options)

    adoptAttributes(this, response?.data)
    return this
  }

  // Parameters:
  //   recursive - boolean - If true, will recursively delete folders.  Otherwise, will error on non-empty folders.
  delete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  // List the contents of a ZIP file
  zipListContents = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/file_actions/zip_list/${encodeURIComponent(params.path)}`, 'GET', params, this.options)

    const ZipListEntry = require('./ZipListEntry.js').default
    return response?.data?.map(obj => new ZipListEntry(obj, this.options)) || []
  }

  // Delete File/Folder and return its File Action.  A pending or processing deletion continues in the background after this returns; check its File Migration for completion.  Waiting for the File Migration does not cancel the deletion
  //
  // Parameters:
  //   recursive - boolean - If true, will recursively delete folders.  Otherwise, will error on non-empty folders.
  beginDelete = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.recursive) || isObject(params.recursive)) {
      throw new errors.InvalidParameterError(`Bad parameter: recursive must be of type Boolean, received ${getType(params.recursive)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const { action: sentAction, response } = await Api._sendAction(`/file_actions/delete/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Copy File/Folder
  //
  // Parameters:
  //   destination (required) - string - Copy destination path.
  //   copy_behaviors - boolean - If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to the destination folder tree?
  //   structure - boolean - Copy structure only?
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  copy = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (isArray(params.copy_behaviors) || isObject(params.copy_behaviors)) {
      throw new errors.InvalidParameterError(`Bad parameter: copy_behaviors must be of type Boolean, received ${getType(params.copy_behaviors)}`)
    }

    if (isArray(params.structure) || isObject(params.structure)) {
      throw new errors.InvalidParameterError(`Bad parameter: structure must be of type Boolean, received ${getType(params.structure)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const { action: sentAction, response } = await Api._sendAction(`/file_actions/copy/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Move File/Folder
  //
  // Parameters:
  //   destination (required) - string - Move destination path.
  //   overwrite - boolean - Overwrite existing file(s) in the destination?
  move = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const { action: sentAction, response } = await Api._sendAction(`/file_actions/move/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Transform a file and save the output to a destination path
  //
  // Parameters:
  //   destination (required) - string - Destination file path for the transformed output.
  //   transform_type (required) - string - Transform type. Supported values are `image_convert`, `document_convert`, and `files_transform_script_execute`.
  //   target_format (required) - string - Destination format to create.
  //   script - string - Files TransformScript source. Required when transform_type is `files_transform_script_execute`.
  //   width - int64 - Maximum output width for image_convert.
  //   height - int64 - Maximum output height for image_convert.
  //   overwrite - boolean - Overwrite existing file in the destination?
  transform = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.transform_type !== undefined && params.transform_type !== null && !isString(params.transform_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: transform_type must be of type String, received ${getType(params.transform_type)}`)
    }

    if (params.target_format !== undefined && params.target_format !== null && !isString(params.target_format)) {
      throw new errors.InvalidParameterError(`Bad parameter: target_format must be of type String, received ${getType(params.target_format)}`)
    }

    if (params.script !== undefined && params.script !== null && !isString(params.script)) {
      throw new errors.InvalidParameterError(`Bad parameter: script must be of type String, received ${getType(params.script)}`)
    }

    if (params.width !== undefined && params.width !== null && !isInt(params.width)) {
      throw new errors.InvalidParameterError(`Bad parameter: width must be of type Int, received ${getType(params.width)}`)
    }

    if (params.height !== undefined && params.height !== null && !isInt(params.height)) {
      throw new errors.InvalidParameterError(`Bad parameter: height must be of type Int, received ${getType(params.height)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    if (!params.transform_type) {
      if (this.attributes.transform_type) {
        params.transform_type = this.transform_type
      } else {
        throw new errors.MissingParameterError('Parameter missing: transform_type')
      }
    }

    if (!params.target_format) {
      if (this.attributes.target_format) {
        params.target_format = this.target_format
      } else {
        throw new errors.MissingParameterError('Parameter missing: target_format')
      }
    }

    const { action: sentAction, response } = await Api._sendAction(`/file_actions/transform/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Decrypt a GPG-encrypted file and save it to a destination path
  //
  // Parameters:
  //   destination (required) - string - Destination file path for the decrypted file.
  //   gpg_key_ids - array(int64) - GPG Key IDs to decrypt with. If omitted, every accessible private GPG key in the source workspace is used.
  //   gpg_key_partner_id - int64 - Partner ID whose GPG keys should be used for decryption.
  //   use_all_private_keys - boolean - Use every accessible private GPG key in the source workspace for decryption.
  //   ignore_mdc_error - boolean - Ignore errors from the MDC (modification detection code) check.
  //   overwrite - boolean - Overwrite existing file in the destination?
  gpgDecrypt = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.gpg_key_ids !== undefined && params.gpg_key_ids !== null && !isArray(params.gpg_key_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: gpg_key_ids must be of type Array, received ${getType(params.gpg_key_ids)}`)
    }

    if (params.gpg_key_partner_id !== undefined && params.gpg_key_partner_id !== null && !isInt(params.gpg_key_partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: gpg_key_partner_id must be of type Int, received ${getType(params.gpg_key_partner_id)}`)
    }

    if (isArray(params.use_all_private_keys) || isObject(params.use_all_private_keys)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_all_private_keys must be of type Boolean, received ${getType(params.use_all_private_keys)}`)
    }

    if (isArray(params.ignore_mdc_error) || isObject(params.ignore_mdc_error)) {
      throw new errors.InvalidParameterError(`Bad parameter: ignore_mdc_error must be of type Boolean, received ${getType(params.ignore_mdc_error)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const { action: sentAction, response } = await Api._sendAction(`/file_actions/gpg_decrypt/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Encrypt a file with GPG and save it to a destination path
  //
  // Parameters:
  //   destination (required) - string - Destination file path for the encrypted file.
  //   gpg_key_ids - array(int64) - GPG Key IDs to encrypt with.
  //   gpg_key_partner_id - int64 - Partner ID whose GPG keys should be used for encryption.
  //   signing_key_id - int64 - Optional GPG Key ID to sign with.
  //   armor - boolean - Output ASCII-armored encrypted data.
  //   overwrite - boolean - Overwrite existing file in the destination?
  gpgEncrypt = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.gpg_key_ids !== undefined && params.gpg_key_ids !== null && !isArray(params.gpg_key_ids)) {
      throw new errors.InvalidParameterError(`Bad parameter: gpg_key_ids must be of type Array, received ${getType(params.gpg_key_ids)}`)
    }

    if (params.gpg_key_partner_id !== undefined && params.gpg_key_partner_id !== null && !isInt(params.gpg_key_partner_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: gpg_key_partner_id must be of type Int, received ${getType(params.gpg_key_partner_id)}`)
    }

    if (params.signing_key_id !== undefined && params.signing_key_id !== null && !isInt(params.signing_key_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: signing_key_id must be of type Int, received ${getType(params.signing_key_id)}`)
    }

    if (isArray(params.armor) || isObject(params.armor)) {
      throw new errors.InvalidParameterError(`Bad parameter: armor must be of type Boolean, received ${getType(params.armor)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const { action: sentAction, response } = await Api._sendAction(`/file_actions/gpg_encrypt/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Extract a ZIP file to a destination folder
  //
  // Parameters:
  //   destination (required) - string - Destination folder path for extracted files.
  //   filename - string - Optional single entry filename to extract.
  //   overwrite - boolean - Overwrite existing files in the destination?
  unzip = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (params.filename !== undefined && params.filename !== null && !isString(params.filename)) {
      throw new errors.InvalidParameterError(`Bad parameter: filename must be of type String, received ${getType(params.filename)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    if (!params.destination) {
      if (this.attributes.destination) {
        params.destination = this.destination
      } else {
        throw new errors.MissingParameterError('Parameter missing: destination')
      }
    }

    const { action: sentAction, response } = await Api._sendAction('/file_actions/unzip', 'POST', params, this.options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, this.options, sentAction)
  }

  // Begin File Upload
  //
  // Parameters:
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Total bytes of file being uploaded (include bytes being retained if appending/restarting).
  //   with_rename - boolean - Allow file rename instead of overwrite?
  //   buffered_upload - boolean - If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  //   with_direct_connection_info - boolean - Include optional direct connection information for a direct Agent transfer attempt?
  beginUpload = async (params = {}) => {
    if (!this.attributes.path) {
      throw new errors.EmptyPropertyError('Current object has no path')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params and the model's attributes stay as they were.
    params = { ...params }
    params.path = this.attributes.path
    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (isArray(params.mkdir_parents) || isObject(params.mkdir_parents)) {
      throw new errors.InvalidParameterError(`Bad parameter: mkdir_parents must be of type Boolean, received ${getType(params.mkdir_parents)}`)
    }

    if (params.part !== undefined && params.part !== null && !isInt(params.part)) {
      throw new errors.InvalidParameterError(`Bad parameter: part must be of type Int, received ${getType(params.part)}`)
    }

    if (params.parts !== undefined && params.parts !== null && !isInt(params.parts)) {
      throw new errors.InvalidParameterError(`Bad parameter: parts must be of type Int, received ${getType(params.parts)}`)
    }

    if (params.ref !== undefined && params.ref !== null && !isString(params.ref)) {
      throw new errors.InvalidParameterError(`Bad parameter: ref must be of type String, received ${getType(params.ref)}`)
    }

    if (params.restart !== undefined && params.restart !== null && !isInt(params.restart)) {
      throw new errors.InvalidParameterError(`Bad parameter: restart must be of type Int, received ${getType(params.restart)}`)
    }

    if (params.size !== undefined && params.size !== null && !isInt(params.size)) {
      throw new errors.InvalidParameterError(`Bad parameter: size must be of type Int, received ${getType(params.size)}`)
    }

    if (isArray(params.with_rename) || isObject(params.with_rename)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_rename must be of type Boolean, received ${getType(params.with_rename)}`)
    }

    if (isArray(params.buffered_upload) || isObject(params.buffered_upload)) {
      throw new errors.InvalidParameterError(`Bad parameter: buffered_upload must be of type Boolean, received ${getType(params.buffered_upload)}`)
    }

    if (isArray(params.with_direct_connection_info) || isObject(params.with_direct_connection_info)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_direct_connection_info must be of type Boolean, received ${getType(params.with_direct_connection_info)}`)
    }

    if (!params.path) {
      if (this.attributes.path) {
        params.path = this.path
      } else {
        throw new errors.MissingParameterError('Parameter missing: path')
      }
    }

    const response = await Api.sendRequest(`/file_actions/begin_upload/${encodeURIComponent(params.path)}`, 'POST', params, this.options)

    const FileUploadPart = require('./FileUploadPart.js').default
    return response?.data?.map(obj => new FileUploadPart(obj, this.options)) || []
  }

  save = async () => {
    const newObject = await File.create(this.attributes.path, this.attributes, this.options)
    adoptAttributes(this, newObject.attributes)
    return true
  }

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   action - string - The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist
  //   custom_metadata - object - Custom metadata map to save when `action=end` completes the upload.  Replaces existing metadata; an empty map clears it.  No separate metadata-edit permission is required.  Supported on native files and configured remote mounts, excluding remote server automount paths.  Limited to 32 keys, 256 characters per key and 1024 characters per value.
  //   etags[etag] (required) - array(string) - etag identifier.
  //   etags[part] (required) - array(int64) - Part number.
  //   length - int64 - Length of file.
  //   mkdir_parents - boolean - Create parent directories if they do not exist?
  //   part - int64 - Part if uploading a part.
  //   parts - int64 - How many parts to fetch?
  //   provided_mtime - string - User provided modification time.
  //   ref - string -
  //   restart - int64 - File byte offset to restart from.
  //   size - int64 - Size of file.
  //   copy_behaviors - boolean - If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to the destination folder tree?
  //   structure - string - If copying folder, copy just the structure?
  //   with_rename - boolean - Allow file rename instead of overwrite?
  //   buffered_upload - boolean - If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
  //   with_direct_connection_info - boolean - Include optional direct connection information for a direct Agent transfer attempt?
  static create = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.action !== undefined && params.action !== null && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.length !== undefined && params.length !== null && !isInt(params.length)) {
      throw new errors.InvalidParameterError(`Bad parameter: length must be of type Int, received ${getType(params.length)}`)
    }

    if (isArray(params.mkdir_parents) || isObject(params.mkdir_parents)) {
      throw new errors.InvalidParameterError(`Bad parameter: mkdir_parents must be of type Boolean, received ${getType(params.mkdir_parents)}`)
    }

    if (params.part !== undefined && params.part !== null && !isInt(params.part)) {
      throw new errors.InvalidParameterError(`Bad parameter: part must be of type Int, received ${getType(params.part)}`)
    }

    if (params.parts !== undefined && params.parts !== null && !isInt(params.parts)) {
      throw new errors.InvalidParameterError(`Bad parameter: parts must be of type Int, received ${getType(params.parts)}`)
    }

    if (params.provided_mtime !== undefined && params.provided_mtime !== null && !isString(params.provided_mtime)) {
      throw new errors.InvalidParameterError(`Bad parameter: provided_mtime must be of type String, received ${getType(params.provided_mtime)}`)
    }

    if (params.ref !== undefined && params.ref !== null && !isString(params.ref)) {
      throw new errors.InvalidParameterError(`Bad parameter: ref must be of type String, received ${getType(params.ref)}`)
    }

    if (params.restart !== undefined && params.restart !== null && !isInt(params.restart)) {
      throw new errors.InvalidParameterError(`Bad parameter: restart must be of type Int, received ${getType(params.restart)}`)
    }

    if (params.size !== undefined && params.size !== null && !isInt(params.size)) {
      throw new errors.InvalidParameterError(`Bad parameter: size must be of type Int, received ${getType(params.size)}`)
    }

    if (isArray(params.copy_behaviors) || isObject(params.copy_behaviors)) {
      throw new errors.InvalidParameterError(`Bad parameter: copy_behaviors must be of type Boolean, received ${getType(params.copy_behaviors)}`)
    }

    if (params.structure !== undefined && params.structure !== null && !isString(params.structure)) {
      throw new errors.InvalidParameterError(`Bad parameter: structure must be of type String, received ${getType(params.structure)}`)
    }

    if (isArray(params.with_rename) || isObject(params.with_rename)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_rename must be of type Boolean, received ${getType(params.with_rename)}`)
    }

    if (isArray(params.buffered_upload) || isObject(params.buffered_upload)) {
      throw new errors.InvalidParameterError(`Bad parameter: buffered_upload must be of type Boolean, received ${getType(params.buffered_upload)}`)
    }

    if (isArray(params.with_direct_connection_info) || isObject(params.with_direct_connection_info)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_direct_connection_info must be of type Boolean, received ${getType(params.with_direct_connection_info)}`)
    }

    const response = await Api.sendRequest(`/files/${encodeURIComponent(params.path)}`, 'POST', params, options)

    return new File(response?.data, retainedOptions(options))
  }

  // Parameters:
  //   path (required) - string - Path to operate on.
  //   preview_size - string - Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`.
  //   with_previews - boolean - Include file preview information?
  //   with_priority_color - boolean - Include file priority color information?
  static find = async (path, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    // The request is prepared on a shallow copy, so the caller's params stay as they were.
    params = { ...params }
    params.path = path

    if (!params.path) {
      throw new errors.MissingParameterError('Parameter missing: path')
    }

    if (params.path !== undefined && params.path !== null && !isString(params.path)) {
      throw new errors.InvalidParameterError(`Bad parameter: path must be of type String, received ${getType(params.path)}`)
    }

    if (params.preview_size !== undefined && params.preview_size !== null && !isString(params.preview_size)) {
      throw new errors.InvalidParameterError(`Bad parameter: preview_size must be of type String, received ${getType(params.preview_size)}`)
    }

    if (isArray(params.with_previews) || isObject(params.with_previews)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_previews must be of type Boolean, received ${getType(params.with_previews)}`)
    }

    if (isArray(params.with_priority_color) || isObject(params.with_priority_color)) {
      throw new errors.InvalidParameterError(`Bad parameter: with_priority_color must be of type Boolean, received ${getType(params.with_priority_color)}`)
    }

    const response = await Api.sendRequest(`/file_actions/metadata/${encodeURIComponent(params.path)}`, 'GET', params, options)

    return new File(response?.data, retainedOptions(options))
  }

  static get = (path, params = {}, options = {}) =>
    File.find(path, params, options)

  // Parameters:
  //   paths (required) - array(string) - Paths to include in the ZIP.
  //   destination (required) - string - Destination file path for the ZIP.
  //   overwrite - boolean - Overwrite existing file in the destination?
  static zip = async (params = {}, options = {}) => {
    if (!params.paths) {
      throw new errors.MissingParameterError('Parameter missing: paths')
    }

    if (!params.destination) {
      throw new errors.MissingParameterError('Parameter missing: destination')
    }

    if (params.paths !== undefined && params.paths !== null && !isArray(params.paths)) {
      throw new errors.InvalidParameterError(`Bad parameter: paths must be of type Array, received ${getType(params.paths)}`)
    }

    if (params.destination !== undefined && params.destination !== null && !isString(params.destination)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination must be of type String, received ${getType(params.destination)}`)
    }

    if (isArray(params.overwrite) || isObject(params.overwrite)) {
      throw new errors.InvalidParameterError(`Bad parameter: overwrite must be of type Boolean, received ${getType(params.overwrite)}`)
    }

    const { action: sentAction, response } = await Api._sendAction('/file_actions/zip', 'POST', params, options)

    const FileAction = require('./FileAction.js').default
    return FileAction._accepted(response?.data, retainedOptions(options), sentAction)
  }
}

export default File

module.exports = File
module.exports.default = File
