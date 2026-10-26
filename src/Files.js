import { ConfigurationError } from './Errors'
import FilesClient from './FilesClient'
import { LogLevel } from './Logger'
import { TransferControl, TransferJob } from './Transfer'
import { isObject } from './utils'

const endpointPrefix = '/api/rest/v1'
const version = '2.0.5'

// The SDK's declared defaults for the settings of a request, its logging included. The global settings start from them,
// and so does every client, from new FilesClient() or Files.createClient(), whatever the global settings have become
// since. Only a client has agent settings: a call without one takes its agent from its own options.
//
// An API request is retried after 100 ms, then 200 and 400 ms. Each attempt has one budget for its response, headers
// and body together: 110 seconds, so that 30 to connect and 80 to read always fit within it.
const defaults = Object.freeze({
  agent: undefined,
  apiKey: undefined,
  autoPaginate: true,
  baseUrl: 'https://app.files.com',
  debugRequest: false,
  debugResponseHeaders: false,
  fetch: undefined,
  followRegionMismatch: true,
  getAgentForUrl: undefined,
  language: null,
  logger: null,
  logLevel: LogLevel.INFO,
  maxNetworkRetries: 3,
  maxNetworkRetryDelay: 1.5,
  minNetworkRetryDelay: 0.1,
  networkTimeout: 110.0,
  sessionId: null,
  trustRegionHost: undefined,
  userAgent: `Files.com JavaScript SDK v${version}`,
  workspaceId: null,
})

let {
  apiKey,
  autoPaginate,
  baseUrl,
  debugRequest,
  debugResponseHeaders,
  fetch: fetchSetting,
  followRegionMismatch,
  language,
  logger,
  logLevel,
  maxNetworkRetries,
  maxNetworkRetryDelay,
  minNetworkRetryDelay,
  networkTimeout,
  sessionId,
  trustRegionHost,
  userAgent,
  workspaceId,
} = defaults

const loggerMethods = ['error', 'warn', 'info', 'debug']

// An application logger is any object with error, warn, info and debug methods; null or undefined means the console.
const checkLogger = value => {
  if (value !== null && value !== undefined && !loggerMethods.every(method => typeof value[method] === 'function')) {
    throw new ConfigurationError(`Logger must provide ${loggerMethods.join(', ')} methods`)
  }
}

// trustRegionHost is a function that trusts a host outside Files.com for a lockout region mismatch (see Api.js), or
// null or undefined for none.
const checkTrustRegionHost = value => {
  if (value !== null && value !== undefined && typeof value !== 'function') {
    throw new ConfigurationError('trustRegionHost must be a function')
  }
}

// fetch is the HTTP client that sends requests in place of the SDK's own, a function like the standard fetch() (see
// Api.js), or null or undefined for the SDK's own.
const checkFetch = value => {
  if (value !== null && value !== undefined && typeof value !== 'function') {
    throw new ConfigurationError('fetch must be a function')
  }
}

class Files {
  // A client with Files.com settings of its own: the same as new FilesClient(config).
  static createClient = (config = {}) => new FilesClient(config)

  // What pauses and resumes transfers given it, and the scope in which the transfers of one job share their learning and
  // budgets (see Transfer.js).
  static TransferControl = TransferControl

  static TransferJob = TransferJob

  // Not public: the settings of a client made with config, by new FilesClient(config) or Files.createClient(config):
  // the declared defaults, with config's settings and headers copied over them. They never come from the global
  // settings below, so later changes to them, or to config, do not change the client.
  static _clientSettings = config => {
    checkLogger(config?.logger)
    checkTrustRegionHost(config?.trustRegionHost)
    checkFetch(config?.fetch)

    if (!isObject(config)) {
      throw new ConfigurationError('Client settings must be an object')
    }

    Object.keys(config).forEach(name => {
      if (name !== 'headers' && !Object.prototype.hasOwnProperty.call(defaults, name)) {
        throw new ConfigurationError(`Unknown client setting: ${name}`)
      }
    })

    // As Files.configureNetwork() does, a setting given as undefined keeps its default. The application logger, like a
    // header value, is kept as given, not copied.
    const given = Object.fromEntries(Object.entries(config).filter(([, value]) => value !== undefined))
    return { ...defaults, ...given, headers: config.headers }
  }

  // The global settings as they are now, every one of them, as a client of their own that later changes to them do not
  // change. They are the client's settings, not a config, so each is kept exactly, undefined included. The application
  // logger is used, not copied, and, as the global settings have none, the client has no agent settings. Not public: an
  // item iterator made without a client requests its pages with one (see Api._iterate).
  static _currentSettings = () => FilesClient._withSettings({
    apiKey,
    autoPaginate,
    baseUrl,
    debugRequest,
    debugResponseHeaders,
    fetch: fetchSetting,
    followRegionMismatch,
    language,
    logger,
    logLevel,
    maxNetworkRetries,
    maxNetworkRetryDelay,
    minNetworkRetryDelay,
    networkTimeout,
    sessionId,
    trustRegionHost,
    userAgent,
    workspaceId,
  })

  static setUserAgent = value => { userAgent = value }

  static getUserAgent = () => userAgent

  static setApiKey = value => { apiKey = value }

  static getApiKey = () => apiKey

  static setBaseUrl = value => { baseUrl = value }

  static getBaseUrl = () => baseUrl

  static setSessionId = value => { sessionId = value }

  static getSessionId = () => sessionId

  static setWorkspaceId = value => { workspaceId = value }

  static getWorkspaceId = () => workspaceId

  static getLanguage = () => language

  static setLanguage = value => { language = value }

  static getEndpointPrefix = () => endpointPrefix

  static setLogLevel = value => { logLevel = value }

  static getLogLevel = () => logLevel

  // Sends SDK log messages to an application logger with error, warn, info and debug methods instead of the console;
  // null restores the console. The log level still decides which messages are sent.
  static setLogger = value => {
    checkLogger(value)
    logger = value ?? null
  }

  static getLogger = () => logger

  static configureDebugging = options => {
    if (typeof options.debugRequest !== 'undefined') {
      debugRequest = options.debugRequest
    }

    if (typeof options.debugResponseHeaders !== 'undefined') {
      debugResponseHeaders = options.debugResponseHeaders
    }
  }

  static shouldDebugRequest = () => debugRequest

  static shouldDebugResponseHeaders = () => debugResponseHeaders

  static configureNetwork = options => {
    if (typeof options.maxNetworkRetries !== 'undefined') {
      maxNetworkRetries = options.maxNetworkRetries
    }

    if (typeof options.minNetworkRetryDelay !== 'undefined') {
      minNetworkRetryDelay = options.minNetworkRetryDelay
    }

    if (typeof options.maxNetworkRetryDelay !== 'undefined') {
      maxNetworkRetryDelay = options.maxNetworkRetryDelay
    }

    if (typeof options.networkTimeout !== 'undefined') {
      networkTimeout = options.networkTimeout
    }

    if (typeof options.autoPaginate !== 'undefined') {
      autoPaginate = options.autoPaginate
    }

    if (typeof options.followRegionMismatch !== 'undefined') {
      followRegionMismatch = options.followRegionMismatch
    }

    if (typeof options.trustRegionHost !== 'undefined') {
      checkTrustRegionHost(options.trustRegionHost)
      trustRegionHost = options.trustRegionHost
    }

    if (typeof options.fetch !== 'undefined') {
      checkFetch(options.fetch)
      fetchSetting = options.fetch
    }
  }

  static getMaxNetworkRetries = () => maxNetworkRetries

  static getMinNetworkRetryDelay = () => minNetworkRetryDelay

  static getMaxNetworkRetryDelay = () => maxNetworkRetryDelay

  static getNetworkTimeout = () => networkTimeout

  static getAutoPaginate = () => autoPaginate

  static getFollowRegionMismatch = () => followRegionMismatch

  static getTrustRegionHost = () => trustRegionHost

  static getFetch = () => fetchSetting
}

export default Files

module.exports = Files
module.exports.default = Files
