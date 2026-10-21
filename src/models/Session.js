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
 * Class Session
 */
class Session {
  attributes = {}

  options = {}

  constructor(attributes = {}, options = {}) {
    adoptAttributes(this, attributes)
    this.options = { ...options }
  }

  isLoaded = () => !!this.attributes.id

  // string # Session ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
    exposeAttributes(this, ['id'])
  }

  // string # Session language
  getLanguage = () => this.attributes.language

  setLanguage = value => {
    this.attributes.language = value
    exposeAttributes(this, ['language'])
  }

  // boolean # Is this session read only?
  getReadOnly = () => this.attributes.read_only

  setReadOnly = value => {
    this.attributes.read_only = value
    exposeAttributes(this, ['read_only'])
  }

  // boolean # Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled that it is ok to use less secure SSH ciphers for this user.)
  getSftpInsecureCiphers = () => this.attributes.sftp_insecure_ciphers

  setSftpInsecureCiphers = value => {
    this.attributes.sftp_insecure_ciphers = value
    exposeAttributes(this, ['sftp_insecure_ciphers'])
  }

  // string # Username to sign in as
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
    exposeAttributes(this, ['username'])
  }

  // string # Password for sign in
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
    exposeAttributes(this, ['password'])
  }

  // string # If this user has a 2FA device, provide its OTP or code here.
  getOtp = () => this.attributes.otp

  setOtp = value => {
    this.attributes.otp = value
    exposeAttributes(this, ['otp'])
  }

  // string # Identifier for a partially-completed login
  getPartialSessionId = () => this.attributes.partial_session_id

  setPartialSessionId = value => {
    this.attributes.partial_session_id = value
    exposeAttributes(this, ['partial_session_id'])
  }

  save = async () => {
    if (this.attributes.id) {
      throw new errors.NotImplementedError('The Session object doesn\'t support updates.')
    } else {
      const newObject = await Session.create(this.attributes, this.options)
      adoptAttributes(this, newObject.attributes)
      return true
    }
  }

  // Parameters:
  //   username - string - Username to sign in as
  //   password - string - Password for sign in
  //   otp - string - If this user has a 2FA device, provide its OTP or code here.
  //   partial_session_id - string - Identifier for a partially-completed login
  static create = async (params = {}, options = {}) => {
    if (params.username !== undefined && params.username !== null && !isString(params.username)) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params.username)}`)
    }

    if (params.password !== undefined && params.password !== null && !isString(params.password)) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params.password)}`)
    }

    if (params.otp !== undefined && params.otp !== null && !isString(params.otp)) {
      throw new errors.InvalidParameterError(`Bad parameter: otp must be of type String, received ${getType(params.otp)}`)
    }

    if (params.partial_session_id !== undefined && params.partial_session_id !== null && !isString(params.partial_session_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: partial_session_id must be of type String, received ${getType(params.partial_session_id)}`)
    }

    const response = await Api.sendRequest('/sessions', 'POST', params, options)

    return new Session(response?.data, retainedOptions(options))
  }

  static delete = async (options = {}) => {
    await Api.sendRequest('/sessions', 'DELETE', {}, options)
  }

  static destroy = (params = {}, options = {}) =>
    Session.delete(params, options)
}

export default Session

module.exports = Session
module.exports.default = Session
