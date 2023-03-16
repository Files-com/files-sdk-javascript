import Api from '../Api'
import * as errors from '../Errors'
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

  // string # Short description of the App
  getShortDescription = () => this.attributes.short_description

  // object # Collection of named links to documentation
  getDocumentationLinks = () => this.attributes.documentation_links

  // string # App icon
  getIconUrl = () => this.attributes.icon_url

  // string # Full size logo for the App
  getLogoUrl = () => this.attributes.logo_url

  // array # Screenshots of the App
  getScreenshotListUrls = () => this.attributes.screenshot_list_urls

  // string # Logo thumbnail for the App
  getLogoThumbnailUrl = () => this.attributes.logo_thumbnail_url

  // string # Associated SSO Strategy type, if any
  getSsoStrategyType = () => this.attributes.sso_strategy_type

  // string # Associated Remote Server type, if any
  getRemoteServerType = () => this.attributes.remote_server_type

  // string # Associated Folder Behavior type, if any
  getFolderBehaviorType = () => this.attributes.folder_behavior_type

  // string # Link to external homepage
  getExternalHomepageUrl = () => this.attributes.external_homepage_url

  // string # Marketing video page
  getMarketingYoutubeUrl = () => this.attributes.marketing_youtube_url

  // string # Tutorial video page
  getTutorialYoutubeUrl = () => this.attributes.tutorial_youtube_url

  // string # The type of the App
  getAppType = () => this.attributes.app_type

  // boolean # Is featured on the App listing?
  getFeatured = () => this.attributes.featured


  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[name]=desc`). Valid fields are `name` and `app_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and `app_type`. Valid field combinations are `[ name, app_type ]` and `[ app_type, name ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
  static list = async (params = {}, options = {}) => {
    if (params['cursor'] && !isString(params['cursor'])) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params['cursor'])}`)
    }

    if (params['per_page'] && !isInt(params['per_page'])) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params['per_page'])}`)
    }

    const response = await Api.sendRequest(`/apps`, 'GET', params, options)

    return response?.data?.map(obj => new App(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    App.list(params, options)
}

export default App
