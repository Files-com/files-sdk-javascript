import axios from 'axios'
import axiosRetry from 'axios-retry'

import Files from './Files'
import Logger from './Logger'
import { isEmpty, isObject } from './utils'

class Api {
  static _configureAutoRetry = () => {
    axiosRetry(
      axios,
      {
        retries: Files.getMaxNetworkRetries(),
        retryDelay: retries => {
          Logger.info(`Retrying request (retry ${retries} of ${Files.getMaxNetworkRetries()})`)

          return Math.min(
            retries * Files.getMinNetworkRetryDelay() * 1000,
            Files.getMaxNetworkRetryDelay() * 1000
          )
        },
      }
    )
  }

  static _sendVerbatim = async (path, verb, options) => {
    const isExternal = /^[a-zA-Z]+:\/\//.test(path)
    const baseUrl = Files.getBaseUrl()

    if (!isExternal && !baseUrl) {
      throw new Error('Base URL has not been set - use Files.setBaseUrl() to set it')
    }

    const url = isExternal
      ? path
      : `${baseUrl}${Files.getEndpointPrefix()}${path}`

    Logger.debug(`Sending request: ${verb} ${url}`)
    Logger.debug('Sending options:', options)

    Api._configureAutoRetry()

    try {
      const response = await axios({
        method: verb,
        timeout: Files.getNetworkTimeout() * 1000,
        url,
        ...options,
      })

      Logger.debug(`Status: ${response.status} ${response.statusText}`)

      if (Files.shouldDebugResponseHeaders()) {
        Logger.debug('Response Headers: ')
        Logger.debug(response.headers)
      }

      return {
        status: response.status,
        reason: response.statusText,
        headers: response.headers,
        data: response.data,
      }
    } catch (error) {
      if (error.response) {
        Logger.error('Exception >', error.response.status, error.response.statusText)
      }

      Logger.error('Exception >', error.toString())
      return null
    }
  }

  static sendFilePart = (externalUrl, verb, data, headers = {}) => {
    const params = { data }

    if (headers) {
      params.headers = headers
    }

    return Api._sendVerbatim(externalUrl, verb, params)
  }

  static _autoPaginate = async (path, verb, params, options, response, metadata) => {
    if (Files.getAutoPaginate()) {
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
      ...options.headers,
      Accept: 'application/json',
      'User-Agent': 'Files.com JavaScript SDK v1.0',
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
            throw new Error('API key has not been set - use Files.setApiKey() to set it')
          }

          headers['X-FilesAPI-Key'] = apiKey
        }
      }
    }

    let requestPath = path
    const hasParams = isObject(params) && !isEmpty(params)

    if (hasParams) {
      if (verb.toUpperCase() === 'GET') {
        const pairs = Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        requestPath += path.includes('?') ? '&' : '?'
        requestPath += pairs.join('&')
      } else {
        options.data = JSON.stringify(params)
        headers['Content-Type'] = 'application/json'
      }
    }

    options.headers = headers

    if (Files.shouldDebugRequest()) {
      Logger.debug('Request Options:')
      Logger.debug({
        ...options,
        data: hasParams
          ? `payload keys: ${Object.keys(params).join(', ')}`
          : '(none)',
        headers: {
          ...headers,
          'X-FilesAPI-Key': '<redacted>',
        },
      })
    }

    const response = await Api._sendVerbatim(requestPath, verb, options)

    return Api._autoPaginate(path, verb, params, options, response, metadata)
  }
}

export default Api
