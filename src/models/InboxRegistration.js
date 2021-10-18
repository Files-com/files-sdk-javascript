import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class InboxRegistration
 */
class InboxRegistration {
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

  // string # Clickwrap text that was shown to the registrant
  getClickwrapBody = () => this.attributes.clickwrap_body

  // int64 # Id of associated form field set
  getFormFieldSetId = () => this.attributes.form_field_set_id

  // string # Data for form field set with form field ids as keys and user data as values
  getFormFieldData = () => this.attributes.form_field_data

  // int64 # Id of associated inbox
  getInboxId = () => this.attributes.inbox_id

  // int64 # Id of associated inbox recipient
  getInboxRecipientId = () => this.attributes.inbox_recipient_id

  // string # Title of associated inbox
  getInboxTitle = () => this.attributes.inbox_title


  // Parameters:
  //   cursor - string - Used for pagination.  Send a cursor value to resume an existing list from the point at which you left off.  Get a cursor from an existing list via the X-Files-Cursor-Next header.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   folder_behavior_id - int64 - ID of the associated Inbox.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new Error(`Bad parameter: cursor must be of type String, received ${getType(cursor)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['folder_behavior_id'] && !isInt(params['folder_behavior_id'])) {
      throw new Error(`Bad parameter: folder_behavior_id must be of type Int, received ${getType(folder_behavior_id)}`)
    }

    const response = await Api.sendRequest(`/inbox_registrations`, 'GET', params, options)

    return response?.data?.map(obj => new InboxRegistration(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    InboxRegistration.list(params, options)
}

export default InboxRegistration
