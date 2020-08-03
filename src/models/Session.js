import Api from '../Api'
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

  // string # Login token. If set, this token will allow your user to log in via browser at the domain in `login_token_domain`.
  getLoginToken = () => this.attributes.login_token

  setLoginToken = value => {
    this.attributes.login_token = value
  }

  // string # Domain to use with `login_token`.
  getLoginTokenDomain = () => this.attributes.login_token_domain

  setLoginTokenDomain = value => {
    this.attributes.login_token_domain = value
  }

  // int64 # Maximum number of files to retrieve per folder for a directory listing.  This is based on the user's plan.
  getMaxDirListingSize = () => this.attributes.max_dir_listing_size

  setMaxDirListingSize = value => {
    this.attributes.max_dir_listing_size = value
  }

  // boolean # Can access multiple regions?
  getMultipleRegions = () => this.attributes.multiple_regions

  setMultipleRegions = value => {
    this.attributes.multiple_regions = value
  }

  // boolean # Is this session read only?
  getReadOnly = () => this.attributes.read_only

  setReadOnly = value => {
    this.attributes.read_only = value
  }

  // string # Initial root path to start the user's session in.
  getRootPath = () => this.attributes.root_path

  setRootPath = value => {
    this.attributes.root_path = value
  }

  // int64 # Site ID
  getSiteId = () => this.attributes.site_id

  setSiteId = value => {
    this.attributes.site_id = value
  }

  // boolean # Is SSL required for this user?  (If so, ensure all your communications with this user use SSL.)
  getSslRequired = () => this.attributes.ssl_required

  setSslRequired = value => {
    this.attributes.ssl_required = value
  }

  // boolean # Is strong TLS disabled for this user? (If this is set to true, the site administrator has signaled that it is ok to use less secure TLS versions for this user.)
  getTlsDisabled = () => this.attributes.tls_disabled

  setTlsDisabled = value => {
    this.attributes.tls_disabled = value
  }

  // boolean # If true, this user needs to add a Two Factor Authentication method before performing any further actions.
  getTwoFactorSetupNeeded = () => this.attributes.two_factor_setup_needed

  setTwoFactorSetupNeeded = value => {
    this.attributes.two_factor_setup_needed = value
  }

  // boolean # Sent only if 2FA setup is needed. Is SMS two factor authentication allowed?
  getAllowed2faMethodSms = () => this.attributes.allowed_2fa_method_sms

  setAllowed2faMethodSms = value => {
    this.attributes.allowed_2fa_method_sms = value
  }

  // boolean # Sent only if 2FA setup is needed. Is TOTP two factor authentication allowed?
  getAllowed2faMethodTotp = () => this.attributes.allowed_2fa_method_totp

  setAllowed2faMethodTotp = value => {
    this.attributes.allowed_2fa_method_totp = value
  }

  // boolean # Sent only if 2FA setup is needed. Is U2F two factor authentication allowed?
  getAllowed2faMethodU2f = () => this.attributes.allowed_2fa_method_u2f

  setAllowed2faMethodU2f = value => {
    this.attributes.allowed_2fa_method_u2f = value
  }

  // boolean # Sent only if 2FA setup is needed. Is Yubikey two factor authentication allowed?
  getAllowed2faMethodYubi = () => this.attributes.allowed_2fa_method_yubi

  setAllowed2faMethodYubi = value => {
    this.attributes.allowed_2fa_method_yubi = value
  }

  // boolean # Allow the user to provide file/folder modified at dates?  If false, the server will always use the current date/time.
  getUseProvidedModifiedAt = () => this.attributes.use_provided_modified_at

  setUseProvidedModifiedAt = value => {
    this.attributes.use_provided_modified_at = value
  }

  // boolean # Does this user want to use Windows line-ending emulation?  (CR vs CRLF)
  getWindowsModeFtp = () => this.attributes.windows_mode_ftp

  setWindowsModeFtp = value => {
    this.attributes.windows_mode_ftp = value
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
        throw new Error('The Session object doesn\'t support updates.')
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
      throw new Error(`Bad parameter: username must be of type String, received ${getType(username)}`)
    }

    if (params['password'] && !isString(params['password'])) {
      throw new Error(`Bad parameter: password must be of type String, received ${getType(password)}`)
    }

    if (params['otp'] && !isString(params['otp'])) {
      throw new Error(`Bad parameter: otp must be of type String, received ${getType(otp)}`)
    }

    if (params['partial_session_id'] && !isString(params['partial_session_id'])) {
      throw new Error(`Bad parameter: partial_session_id must be of type String, received ${getType(partial_session_id)}`)
    }

    const response = await Api.sendRequest(`/sessions`, 'POST', params, options)

    return new Session(response?.data, options)
  }

  static delete = async (params = {}, options = {}) => {
    const response = await Api.sendRequest(`/sessions`, 'DELETE', options)

    return response?.data
  }

  static destroy = (params = {}, options = {}) =>
    Session.delete(params, options)
}

export default Session
