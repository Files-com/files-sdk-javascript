import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class WebhookTest
 */
class WebhookTest {
  attributes = {}
  options = {}

  constructor(attributes = {}, options = {}) {
    Object.entries(attributes).forEach(([key, value]) => {
      const normalizedKey = key.replace('?', '')

      this.attributes[normalizedKey] = value

      Object.defineProperty(this, normalizedKey, { value, writable: false })
    })

    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id
  // int64 # Status HTTP code
  getCode = () => this.attributes.code

  setCode = value => {
    this.attributes.code = value
  }

  // string # Error message
  getMessage = () => this.attributes.message

  setMessage = value => {
    this.attributes.message = value
  }

  // string # Status message
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
  }

  // Additional data
  getData = () => this.attributes.data

  setData = value => {
    this.attributes.data = value
  }

  // boolean # The success status of the webhook test
  getSuccess = () => this.attributes.success

  setSuccess = value => {
    this.attributes.success = value
  }

  // string # URL for testing the webhook.
  getUrl = () => this.attributes.url

  setUrl = value => {
    this.attributes.url = value
  }

  // string # HTTP method(GET or POST).
  getMethod = () => this.attributes.method

  setMethod = value => {
    this.attributes.method = value
  }

  // string # HTTP encoding method.  Can be JSON, XML, or RAW (form data).
  getEncoding = () => this.attributes.encoding

  setEncoding = value => {
    this.attributes.encoding = value
  }

  // object # Additional request headers.
  getHeaders = () => this.attributes.headers

  setHeaders = value => {
    this.attributes.headers = value
  }

  // object # Additional body parameters.
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
  }

  // string # raw body text
  getRawBody = () => this.attributes.raw_body

  setRawBody = value => {
    this.attributes.raw_body = value
  }

  // string # action for test body
  getAction = () => this.attributes.action

  setAction = value => {
    this.attributes.action = value
  }


  save = () => {
      if (this.attributes['id']) {
        throw new Error('The WebhookTest object doesn\'t support updates.')
      } else {
        const newObject = WebhookTest.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   url (required) - string - URL for testing the webhook.
  //   method - string - HTTP method(GET or POST).
  //   encoding - string - HTTP encoding method.  Can be JSON, XML, or RAW (form data).
  //   headers - object - Additional request headers.
  //   body - object - Additional body parameters.
  //   raw_body - string - raw body text
  //   action - string - action for test body
  static create = async (params = {}, options = {}) => {
    if (!params['url']) {
      throw new Error('Parameter missing: url')
    }

    if (params['url'] && !isString(params['url'])) {
      throw new Error(`Bad parameter: url must be of type String, received ${getType(url)}`)
    }

    if (params['method'] && !isString(params['method'])) {
      throw new Error(`Bad parameter: method must be of type String, received ${getType(method)}`)
    }

    if (params['encoding'] && !isString(params['encoding'])) {
      throw new Error(`Bad parameter: encoding must be of type String, received ${getType(encoding)}`)
    }

    if (params['raw_body'] && !isString(params['raw_body'])) {
      throw new Error(`Bad parameter: raw_body must be of type String, received ${getType(raw_body)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    const response = await Api.sendRequest(`/webhook_tests`, 'POST', params, options)

    return new WebhookTest(response?.data, options)
  }
}

export default WebhookTest
