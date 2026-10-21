/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
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
 * Class WebhookTest
 */
class WebhookTest {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // int64 # Status HTTP code
  getCode = () => this.attributes.code

  setCode = value => {
    this.attributes.code = value
    exposeAttributes(this, ['code'])
  }

  // string # Error message
  getMessage = () => this.attributes.message

  setMessage = value => {
    this.attributes.message = value
    exposeAttributes(this, ['message'])
  }

  // string # Status message
  getStatus = () => this.attributes.status

  setStatus = value => {
    this.attributes.status = value
    exposeAttributes(this, ['status'])
  }

  // Auto # Additional data
  getData = () => this.attributes.data

  setData = value => {
    this.attributes.data = value
    exposeAttributes(this, ['data'])
  }

  // boolean # The success status of the webhook test
  getSuccess = () => this.attributes.success

  setSuccess = value => {
    this.attributes.success = value
    exposeAttributes(this, ['success'])
  }

  // string # URL for testing the webhook.
  getUrl = () => this.attributes.url

  setUrl = value => {
    this.attributes.url = value
    exposeAttributes(this, ['url'])
  }

  // string # HTTP method(GET or POST).
  getMethod = () => this.attributes.method

  setMethod = value => {
    this.attributes.method = value
    exposeAttributes(this, ['method'])
  }

  // string # HTTP encoding method.  Can be JSON, XML, or RAW (form data).
  getEncoding = () => this.attributes.encoding

  setEncoding = value => {
    this.attributes.encoding = value
    exposeAttributes(this, ['encoding'])
  }

  // object # Additional request headers.
  getHeaders = () => this.attributes.headers

  setHeaders = value => {
    this.attributes.headers = value
    exposeAttributes(this, ['headers'])
  }

  // object # Additional body parameters.
  getBody = () => this.attributes.body

  setBody = value => {
    this.attributes.body = value
    exposeAttributes(this, ['body'])
  }

  // string # raw body text
  getRawBody = () => this.attributes.raw_body

  setRawBody = value => {
    this.attributes.raw_body = value
    exposeAttributes(this, ['raw_body'])
  }

  // boolean # Send the file data as the request body?
  getFileAsBody = () => this.attributes.file_as_body

  setFileAsBody = value => {
    this.attributes.file_as_body = value
    exposeAttributes(this, ['file_as_body'])
  }

  // string # Send the file data as a named parameter in the request POST body
  getFileFormField = () => this.attributes.file_form_field

  setFileFormField = value => {
    this.attributes.file_form_field = value
    exposeAttributes(this, ['file_form_field'])
  }

  // string # action for test body
  getAction = () => this.attributes.action

  setAction = value => {
    this.attributes.action = value
    exposeAttributes(this, ['action'])
  }

  // boolean # Use dedicated IPs for sending the webhook?
  getUseDedicatedIps = () => this.attributes.use_dedicated_ips

  setUseDedicatedIps = value => {
    this.attributes.use_dedicated_ips = value
    exposeAttributes(this, ['use_dedicated_ips'])
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The WebhookTest object doesn\'t support updates.')
    } else {
      const newObject = await WebhookTest.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
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
  //   file_as_body - boolean - Send the file data as the request body?
  //   file_form_field - string - Send the file data as a named parameter in the request POST body
  //   action - string - action for test body
  //   use_dedicated_ips - boolean - Use dedicated IPs for sending the webhook?
  static create = async (params = {}, options = {}) => {
    if (!params.url) {
      throw new errors.MissingParameterError('Parameter missing: url')
    }

    if (params.url !== undefined && params.url !== null && !isString(params.url)) {
      throw new errors.InvalidParameterError(`Bad parameter: url must be of type String, received ${getType(params.url)}`)
    }

    if (params.method !== undefined && params.method !== null && !isString(params.method)) {
      throw new errors.InvalidParameterError(`Bad parameter: method must be of type String, received ${getType(params.method)}`)
    }

    if (params.encoding !== undefined && params.encoding !== null && !isString(params.encoding)) {
      throw new errors.InvalidParameterError(`Bad parameter: encoding must be of type String, received ${getType(params.encoding)}`)
    }

    if (params.raw_body !== undefined && params.raw_body !== null && !isString(params.raw_body)) {
      throw new errors.InvalidParameterError(`Bad parameter: raw_body must be of type String, received ${getType(params.raw_body)}`)
    }

    if (isArray(params.file_as_body) || isObject(params.file_as_body)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_as_body must be of type Boolean, received ${getType(params.file_as_body)}`)
    }

    if (params.file_form_field !== undefined && params.file_form_field !== null && !isString(params.file_form_field)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_form_field must be of type String, received ${getType(params.file_form_field)}`)
    }

    if (params.action !== undefined && params.action !== null && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (isArray(params.use_dedicated_ips) || isObject(params.use_dedicated_ips)) {
      throw new errors.InvalidParameterError(`Bad parameter: use_dedicated_ips must be of type Boolean, received ${getType(params.use_dedicated_ips)}`)
    }

    const response = await Api.sendRequest('/webhook_tests', 'POST', params, options)

    return new WebhookTest(response?.data, retainedOptions(options))
  }
}

export default WebhookTest

module.exports = WebhookTest
module.exports.default = WebhookTest
