import Api from '../Api'
import * as errors from '../Errors'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class Session
 */
class Session {
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
  // string # Session ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Session language
  getLanguage = () => this.attributes.language

  setLanguage = value => {
    this.attributes.language = value
  }

  // boolean # Is this session read only?
  getReadOnly = () => this.attributes.read_only

  setReadOnly = value => {
    this.attributes.read_only = value
  }

  // boolean # Are insecure SFTP ciphers allowed for this user? (If this is set to true, the site administrator has signaled that it is ok to use less secure SSH ciphers for this user.)
  getSftpInsecureCiphers = () => this.attributes.sftp_insecure_ciphers

  setSftpInsecureCiphers = value => {
    this.attributes.sftp_insecure_ciphers = value
  }

  // string # Username to sign in as
  getUsername = () => this.attributes.username

  setUsername = value => {
    this.attributes.username = value
  }

  // string # Password for sign in
  getPassword = () => this.attributes.password

  setPassword = value => {
    this.attributes.password = value
  }

  // string # If this user has a 2FA device, provide its OTP or code here.
  getOtp = () => this.attributes.otp

  setOtp = value => {
    this.attributes.otp = value
  }

  // string # Identifier for a partially-completed login
  getPartialSessionId = () => this.attributes.partial_session_id

  setPartialSessionId = value => {
    this.attributes.partial_session_id = value
  }


  save = () => {
      if (this.attributes['id']) {
        throw new errors.NotImplementedError('The Session object doesn\'t support updates.')
      } else {
        const newObject = Session.create(this.attributes, this.options)
        this.attributes = { ...newObject.attributes }
        return true
      }
  }

  // Parameters:
  //   username - string - Username to sign in as
  //   password - string - Password for sign in
  //   otp - string - If this user has a 2FA device, provide its OTP or code here.
  //   partial_session_id - string - Identifier for a partially-completed login
  static create = async (params = {}, options = {}) => {
    if (params['username'] && !isString(params['username'])) {
      throw new errors.InvalidParameterError(`Bad parameter: username must be of type String, received ${getType(params['username'])}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new errors.InvalidParameterError(`Bad parameter: password must be of type String, received ${getType(params['password'])}`)
    }

    if (params['otp'] && !isString(params['otp'])) {
      throw new errors.InvalidParameterError(`Bad parameter: otp must be of type String, received ${getType(params['otp'])}`)
    }

    if (params['partial_session_id'] && !isString(params['partial_session_id'])) {
      throw new errors.InvalidParameterError(`Bad parameter: partial_session_id must be of type String, received ${getType(params['partial_session_id'])}`)
    }

    const response = await Api.sendRequest(`/sessions`, 'POST', params, options)

    return new Session(response?.data, options)
  }

  static delete = async (options = {}) => {
    const response = await Api.sendRequest(`/sessions`, 'DELETE', {}, options)

    return response?.data
  }

  static destroy = (params = {}, options = {}) =>
    Session.delete(params, options)
}

export default Session
