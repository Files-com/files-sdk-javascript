import fetch from 'cross-fetch'

import Files from './Files'
import * as errors from './Errors'
import Logger from './Logger'
import { isEmpty, isObject } from './utils'

const _fetchWithTimeout = (url, { timeoutSecs, ...options } = {}) =>
  timeoutSecs <= 0
    ? fetch(url, options)
    : Promise.race([
        fetch(url, options),
        new Promise((_, reject) => {
          setTimeout(() => reject(new errors.FilesError('Request timed out')), timeoutSecs * 1000)
        })
      ])

const fetchWithRetry = async (url, options, retries = 0) => {
  const maxRetries = Files.getMaxNetworkRetries()
  const minRetryDelaySecs = Files.getMinNetworkRetryDelay()
  const maxRetryDelaySecs = Files.getMaxNetworkRetryDelay()

  try {
    return await _fetchWithTimeout(url, options)
  } catch (error) {
    Logger.info(`Request #${retries + 1} failed: ${error.message}`)

    if (retries >= maxRetries) {
      throw error
    } else {
      const nextRetries = retries + 1
      Logger.info(`Retrying request (retry ${nextRetries} of ${maxRetries})`)

      const delaySecs = Math.min(minRetryDelaySecs * 2 ** retries, maxRetryDelaySecs) // exponential backoff
      await new Promise(resolve => setTimeout(resolve, delaySecs * 1000))
      
      return fetchWithRetry(url, options, nextRetries)
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
      headers: {
        ...options.headers,
        'X-FilesAPI-Key': '<redacted>',
      },
    })

    try {
      const agent = getAgentForUrl?.(url) || options?.agent || options?.httpsAgent || options?.httpAgent

      const response = await fetchWithRetry(url, {
        agent,
        method: verb,
        timeoutSecs: Files.getNetworkTimeout(),
        ...options,
      })

      const headers = Object.fromEntries(response.headers.entries())

      Logger.debug(`Status: ${response.status} ${response.statusText}`)

      if (Files.shouldDebugResponseHeaders()) {
        Logger.debug('Response Headers: ')
        Logger.debug(headers)
      }

      const contentType = headers['content-type'] || ''
      let data

      if (contentType.includes('application/json')) {
        data = await response.json()
      } else if (contentType.includes('text/')) {
        data = await response.text()
      } else if (contentType.includes('multipart/form-data')) {
        data = await response.formData()
      } else {
        data = response.body
      }

      const normalizedResponse = {
        status: response.status,
        reason: response.statusText,
        headers,
        data,
      }

      if (!response.ok) {
        throw { response: normalizedResponse }
      }

      return normalizedResponse
    } catch (error) {
      errors.handleErrorResponse(error)
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
      } else if (previousAutoPaginateData) {
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
    const headers = {
      Accept: 'application/json',
      ...options.headers,
      'User-Agent': Files.getUserAgent(),
    }

    const isExternal = /^[a-zA-Z]+:\/\//.test(path)

    if (!isExternal) {
      const sessionId = options.sessionId || Files.getSessionId()

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
    }

    const updatedOptions = {
      ...options,
      headers,
    }

    let requestPath = path
    const hasParams = isObject(params) && !isEmpty(params)

    if (hasParams) {
      if (verb.toUpperCase() === 'GET') {
        const pairs = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
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
        headers: {
          ...headers,
          'X-FilesAPI-Key': '<redacted>',
        },
      })
    }

    const response = await Api._sendVerbatim(requestPath, verb, updatedOptions)

    return Api._autoPaginate(path, verb, params, updatedOptions, response, metadata)
  }
}

export default Api

module.exports = Api
module.exports.default = Api
