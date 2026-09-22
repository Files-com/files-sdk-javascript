import fetch from 'cross-fetch'

import Files from './Files'
import * as errors from './Errors'
import Logger from './Logger'
import { isEmpty, isObject } from './utils'

const withTimeout = (promise, timeoutSecs) => {
  let timeoutId
  return timeoutSecs <= 0
    ? promise
    : Promise.race([
      promise,
      new Promise((_, reject) => {
        timeoutId = setTimeout(() => reject(new errors.FilesError('Request timed out')), timeoutSecs * 1000)
      }),
    ]).finally(() => clearTimeout(timeoutId))
}

const FILES_AUTH_HEADERS = [
  'X-FilesAPI-Key',
  'X-FilesAPI-Auth',
  'X-Files-Workspace-Id',
]

const NODE_FETCH_SENSITIVE_HEADERS = [
  'authorization',
  'www-authenticate',
  'cookie',
  'cookie2',
]

const REDIRECT_STATUSES = [301, 302, 303, 307, 308]
const MAX_REDIRECTS = 20

const withoutHeaders = (headers, names) => {
  const normalizedNames = names.map(name => name.toLowerCase())
  return Object.fromEntries(
    Object.entries(headers || {}).filter(([name]) => !normalizedNames.includes(name.toLowerCase())),
  )
}

const isDomainOrSubdomain = (originalUrl, destinationUrl) => {
  const originalHostname = new URL(originalUrl).hostname
  const destinationHostname = new URL(destinationUrl).hostname

  return originalHostname === destinationHostname || destinationHostname.endsWith(`.${originalHostname}`)
}

const isSameProtocol = (firstUrl, secondUrl) => (
  new URL(firstUrl).protocol === new URL(secondUrl).protocol
)

const drainResponse = response => {
  if (response.body && typeof response.body.resume === 'function') {
    response.body.resume()
  }
}

const fetchWithRedirects = async (url, options, getAgentForUrl, redirectCount = 0) => {
  const agent = getAgentForUrl?.(url) || options.agent || options.httpsAgent || options.httpAgent
  const redirectMode = options.redirect || 'follow'
  const response = await fetch(url, {
    ...options,
    agent,
    redirect: redirectMode === 'follow' ? 'manual' : redirectMode,
  })

  const location = response.headers.get('location')

  if (redirectMode !== 'follow' || !REDIRECT_STATUSES.includes(response.status) || !location) {
    return response
  }

  const maxRedirects = options.follow ?? MAX_REDIRECTS
  if (redirectCount >= maxRedirects) {
    drainResponse(response)
    throw new errors.FilesError(`maximum redirect reached at: ${url}`)
  }

  const redirectUrl = new URL(location, url).toString()
  let redirectedHeaders = new URL(url).origin === new URL(redirectUrl).origin
    ? options.headers
    : withoutHeaders(options.headers, FILES_AUTH_HEADERS)

  if (!isDomainOrSubdomain(url, redirectUrl) || !isSameProtocol(url, redirectUrl)) {
    redirectedHeaders = withoutHeaders(redirectedHeaders, NODE_FETCH_SENSITIVE_HEADERS)
  }

  const redirectedOptions = {
    ...options,
    headers: redirectedHeaders,
  }

  const method = (redirectedOptions.method || 'GET').toUpperCase()

  if (response.status !== 303 && redirectedOptions.body && typeof redirectedOptions.body.pipe === 'function') {
    drainResponse(response)
    throw new errors.FilesError('Cannot follow redirect with body being a readable stream')
  }

  if (response.status === 303 || ([301, 302].includes(response.status) && method === 'POST')) {
    redirectedOptions.method = 'GET'
    delete redirectedOptions.body
    redirectedOptions.headers = withoutHeaders(redirectedOptions.headers, ['content-length'])
  }

  drainResponse(response)

  return fetchWithRedirects(redirectUrl, redirectedOptions, getAgentForUrl, redirectCount + 1)
}

const fetchWithRetry = async (url, options, retries = 0, getAgentForUrl = null) => {
  const maxRetries = Files.getMaxNetworkRetries()
  const minRetryDelaySecs = Files.getMinNetworkRetryDelay()
  const maxRetryDelaySecs = Files.getMaxNetworkRetryDelay()

  try {
    const { timeoutSecs, ...requestOptions } = options
    return await withTimeout(fetchWithRedirects(url, requestOptions, getAgentForUrl), timeoutSecs)
  } catch (error) {
    Logger.info(`Request #${retries + 1} failed: ${error.message}`)

    if (retries >= maxRetries) {
      throw error
    } else {
      const nextRetries = retries + 1
      Logger.info(`Retrying request (retry ${nextRetries} of ${maxRetries})`)

      const delaySecs = Math.min(minRetryDelaySecs * 2 ** retries, maxRetryDelaySecs) // exponential backoff
      await new Promise(resolve => { setTimeout(resolve, delaySecs * 1000) })

      return fetchWithRetry(url, options, nextRetries, getAgentForUrl)
    }
  }
}

class Api {
  static _sendVerbatim = async (path, verb, optionsRaw) => {
    const { getAgentForUrl, ...options } = optionsRaw || {}

    const isExternal = /^[a-zA-Z]+:\/\//.test(path)
    const baseUrl = Files.getBaseUrl()

    if (!isExternal && !baseUrl) {
      throw new errors.ConfigurationError('Base URL has not been set - use Files.setBaseUrl() to set it')
    }

    const url = isExternal
      ? path
      : `${baseUrl}${Files.getEndpointPrefix()}${path}`

    Logger.debug(`Sending request: ${verb} ${url}`)

    Logger.debug('Sending options:', {
      method: verb,
      ...options,
    })

    try {
      const response = await fetchWithRetry(url, {
        method: verb,
        timeoutSecs: Files.getNetworkTimeout(),
        ...options,
      }, 0, getAgentForUrl)

      const headers = Object.fromEntries(response.headers.entries())

      Logger.debug(`Status: ${response.status} ${response.statusText}`)

      if (Files.shouldDebugResponseHeaders()) {
        Logger.debug('Response Headers: ')
        Logger.debug(headers)
      }

      const contentType = headers['content-type'] || ''
      let data

      if (contentType.includes('application/json')) {
        if (headers['content-length'] === '0') {
          data = response.body
        } else {
          data = await response.json()
        }
      } else if (contentType.includes('text/')) {
        data = await response.text()
      } else if (contentType.includes('multipart/form-data')) {
        data = await response.formData()
      } else {
        data = response.body
      }

      const normalizedResponse = {
        data,
        headers,
        reason: response.statusText,
        status: response.status,
      }

      if (!response.ok) {
        /* eslint-disable-next-line no-throw-literal */
        throw { response: normalizedResponse }
      }

      return normalizedResponse
    } catch (error) {
      errors.handleErrorResponse(error)
      return null
    }
  }

  static sendFilePart = (externalUrl, verb, data, optionsRaw = {}) => {
    const options = {
      ...optionsRaw,
      body: data,
    }

    return Api._sendVerbatim(externalUrl, verb, options)
  }

  static _autoPaginate = async (path, verb, params, options, response, metadata) => {
    if (options.autoPaginate ?? Files.getAutoPaginate()) {
      const nextCursor = response?.headers?.['x-files-cursor']

      const {
        autoPaginateCount,
        previousAutoPaginateData,
      } = metadata || {}

      if (nextCursor) {
        const nextPage = (Number(params?.page) || 1) + 1
        const nextParams = {
          ...params,
          cursor: nextCursor,
          page: nextPage,
        }

        const nextMetadata = {
          autoPaginateCount: (autoPaginateCount || 1) + 1,
          previousAutoPaginateData: [
            ...previousAutoPaginateData || [],
            ...response?.data || [],
          ],
        }

        return Api.sendRequest(path, verb, nextParams, options, nextMetadata)
      }

      if (previousAutoPaginateData) {
        return {
          ...response,
          autoPaginateRequests: autoPaginateCount,
          data: [...previousAutoPaginateData, ...response?.data || []],
        }
      }
    }

    return response
  }

  static sendRequest = async (path, verb, params = null, options = {}, metadata = null) => {
    const hasWorkspaceIdOption = Object.prototype.hasOwnProperty.call(options, 'workspaceId')
    const workspaceId = hasWorkspaceIdOption ? options.workspaceId : Files.getWorkspaceId()
    const languageHeader = Files.getLanguage() ? { 'Accept-Language': Files.getLanguage() } : {}

    const headers = {
      Accept: 'application/json',
      ...languageHeader,
      ...options.headers,
      'User-Agent': Files.getUserAgent(),
    }

    const isExternal = /^[a-zA-Z]+:\/\//.test(path)

    if (!isExternal) {
      const hasApiKey = options.apiKey !== undefined && options.apiKey !== null
      const sessionId = hasApiKey ? null : options.sessionId || options.session_id || Files.getSessionId()

      if (sessionId) {
        headers['X-FilesAPI-Auth'] = sessionId
      } else {
        const isCreatingSession = path === '/sessions' && verb.toUpperCase() === 'POST'

        // api key cannot be used when creating a session
        if (!isCreatingSession) {
          const apiKey = options.apiKey || Files.getApiKey()

          if (!apiKey) {
            throw new errors.ConfigurationError('API key has not been set - use Files.setApiKey() to set it')
          }

          headers['X-FilesAPI-Key'] = apiKey
        }
      }

      if (workspaceId !== null && workspaceId !== undefined && `${workspaceId}` !== '') {
        headers['X-Files-Workspace-Id'] = workspaceId
      }
    }

    const updatedOptions = {
      ...options,
      headers,
    }

    let requestPath = path
    const hasParams = isObject(params) && !isEmpty(params)

    if (hasParams) {
      if (verb.toUpperCase() === 'GET') {
        const _params = {}
        for (const [key, value] of Object.entries(params)) {
          if (isObject(value)) {
            for (const [key2, value2] of Object.entries(value)) {
              _params[`${key}[${key2}]`] = value2
            }
          } else {
            _params[key] = value
          }
        }

        const pairs = Object.entries(_params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        requestPath += path.includes('?') ? '&' : '?'
        requestPath += pairs.join('&')
      } else {
        updatedOptions.body = JSON.stringify(params)
        headers['Content-Type'] = 'application/json'
      }
    }

    if (Files.shouldDebugRequest()) {
      Logger.debug('Request Options:')
      Logger.debug({
        ...updatedOptions,
        body: hasParams
          ? `payload keys: ${Object.keys(params).join(', ')}`
          : '(none)',
      })
    }

    const response = await Api._sendVerbatim(requestPath, verb, updatedOptions)

    return Api._autoPaginate(path, verb, params, updatedOptions, response, metadata)
  }
}

export default Api

module.exports = Api
module.exports.default = Api
