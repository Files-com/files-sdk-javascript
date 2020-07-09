import Api from '../Api'
import Logger from '../Logger'
import { getType, isArray, isBrowser, isInt, isObject, isString } from '../utils'

/**
 * Class App
 */
class App {
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

  // string # Name of the App
  getName = () => this.attributes.name

  // string # Long form description of the App
  getExtendedDescription = () => this.attributes.extended_description

  // string # Collection of named links to documentation
  getDocumentationLinks = () => this.attributes.documentation_links

  // string # Associated SSO Strategy type, if any
  getSsoStrategyType = () => this.attributes.sso_strategy_type

  // string # Associated Remote Server type, if any
  getRemoteServerType = () => this.attributes.remote_server_type

  // string # Associated Folder Behavior type, if any
  getFolderBehaviorType = () => this.attributes.folder_behavior_type

  // string # Link to external homepage
  getExternalHomepageUrl = () => this.attributes.external_homepage_url

  // string # The type of the App
  getAppType = () => this.attributes.app_type

  // boolean # Is featured on the App listing?
  getFeatured = () => this.attributes.featured


  // Parameters:
  //   page - int64 - Current page number.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string - Deprecated: If set to `count` returns a count of matching records rather than the records themselves.
  static list = async (params = {}, options = {}) => {
    if (params['page'] && !isInt(params['page'])) {
      throw new Error(`Bad parameter: page must be of type Int, received ${getType(page)}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new Error(`Bad parameter: per_page must be of type Int, received ${getType(per_page)}`)
    }

    if (params['action'] && !isString(params['action'])) {
      throw new Error(`Bad parameter: action must be of type String, received ${getType(action)}`)
    }

    const response = await Api.sendRequest(`/apps`, 'GET', params, options)

    return response?.data?.map(obj => new App(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    App.list(params, options)
}

export default App
