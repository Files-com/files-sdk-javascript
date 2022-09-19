import { LogLevel } from './Logger'

const endpointPrefix = '/api/rest/v1'

let apiKey
let baseUrl = 'https://app.files.com'
let sessionId = null
let userAgent = 'Files.com JavaScript SDK v1.0'

let logLevel = LogLevel.INFO
let debugRequest = false
let debugResponseHeaders = false

let maxNetworkRetries = 3
let minNetworkRetryDelay = 0.5
let maxNetworkRetryDelay = 1.5
let networkTimeout = 30.0
let autoPaginate = true

class Files {
  static setUserAgent = value => userAgent = value
  static getUserAgent = () => userAgent

  static setApiKey = value => apiKey = value
  static getApiKey = () => apiKey

  static setBaseUrl = value => baseUrl = value
  static getBaseUrl = () => baseUrl

  static setSessionId = value => sessionId = value
  static getSessionId = () => sessionId

  static getEndpointPrefix = () => endpointPrefix

  static setLogLevel = value => logLevel = value
  static getLogLevel = () => logLevel

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
  }

  static getMaxNetworkRetries = () => maxNetworkRetries
  static getMinNetworkRetryDelay = () => minNetworkRetryDelay
  static getMaxNetworkRetryDelay = () => maxNetworkRetryDelay
  static getNetworkTimeout = () => networkTimeout
  static getAutoPaginate = () => autoPaginate
}

export default Files
