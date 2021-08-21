import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class BundleRegistration
 */
class BundleRegistration {
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
  // string # Registration cookie code
  getCode = () => this.attributes.code

  // string # Registrant name
  getName = () => this.attributes.name

  // string # Registrant company name
  getCompany = () => this.attributes.company

  // string # Registrant email address
  getEmail = () => this.attributes.email

  // string # Registrant IP Address
  getIp = () => this.attributes.ip

  // string # InboxRegistration cookie code, if there is an associated InboxRegistration
  getInboxCode = () => this.attributes.inbox_code

  // string # Clickwrap text that was shown to the registrant
  getClickwrapBody = () => this.attributes.clickwrap_body

  // int64 # Id of associated form field set
  getFormFieldSetId = () => this.attributes.form_field_set_id

  // string # Data for form field set with form field ids as keys and user data as values
  getFormFieldData = () => this.attributes.form_field_data


  // Parameters:
  //   user_id - int64 - User ID.  Provide a value of `0` to operate the current session's user.
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   bundle_id - int64 - ID of the associated Bundle
  static list = async (params = {}, options = {}) => {
    if (params['user_id'] && !isInt(params['user_id'])) {
      throw new Error(`Bad parameter: user_id must be of type Int, received ${getType(user_id)}`)
    }

    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['bundle_id'] && !isInt(params['bundle_id'])) {
      throw new Error(`Bad parameter: bundle_id must be of type Int, received ${getType(bundle_id)}`)
    }

    const response = await Api.sendRequest(`/bundle_registrations`, 'GET', params, options)

    return response?.data?.map(obj => new BundleRegistration(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    BundleRegistration.list(params, options)
}

export default BundleRegistration
