/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

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

  // string # The type of the App
  getAppType = () => this.attributes.app_type

  // object # Collection of named links to documentation
  getDocumentationLinks = () => this.attributes.documentation_links

  // string # Long description for the in-App landing page
  getExtendedDescription = () => this.attributes.extended_description

  // string # Long form description of the App
  getExtendedDescriptionForMarketingSite = () => this.attributes.extended_description_for_marketing_site

  // string # Link to external homepage
  getExternalHomepageUrl = () => this.attributes.external_homepage_url

  // boolean # Is featured on the App listing?
  getFeatured = () => this.attributes.featured

  // string # Associated Folder Behavior type, if any
  getFolderBehaviorType = () => this.attributes.folder_behavior_type

  // string # App icon
  getIconUrl = () => this.attributes.icon_url

  // string # Logo thumbnail for the App
  getLogoThumbnailUrl = () => this.attributes.logo_thumbnail_url

  // string # Full size logo for the App
  getLogoUrl = () => this.attributes.logo_url

  // string # Marketing introdution of the App
  getMarketingIntro = () => this.attributes.marketing_intro

  // string # Marketing video page
  getMarketingYoutubeUrl = () => this.attributes.marketing_youtube_url

  // string # Name of the App
  getName = () => this.attributes.name

  // string # Package manager install command
  getPackageManagerInstallCommand = () => this.attributes.package_manager_install_command

  // string # Associated Remote Server type, if any
  getRemoteServerType = () => this.attributes.remote_server_type

  // array(string) # Screenshots of the App
  getScreenshotListUrls = () => this.attributes.screenshot_list_urls

  // string # Link to SDK installation instructions
  getSdkInstallationInstructionsLink = () => this.attributes.sdk_installation_instructions_link

  // string # Short description of the App
  getShortDescription = () => this.attributes.short_description

  // string # Associated SSO Strategy type, if any
  getSsoStrategyType = () => this.attributes.sso_strategy_type

  // string # Tutorial video page
  getTutorialYoutubeUrl = () => this.attributes.tutorial_youtube_url

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  //   action - string
  //   page - int64
  //   sort_by - object - If set, sort records by the specified field in either `asc` or `desc` direction (e.g. `sort_by[name]=desc`). Valid fields are `name` and `app_type`.
  //   filter - object - If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and `app_type`. Valid field combinations are `[ name, app_type ]` and `[ app_type, name ]`.
  //   filter_prefix - object - If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`.
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    if (params.action && !isString(params.action)) {
      throw new errors.InvalidParameterError(`Bad parameter: action must be of type String, received ${getType(params.action)}`)
    }

    if (params.page && !isInt(params.page)) {
      throw new errors.InvalidParameterError(`Bad parameter: page must be of type Int, received ${getType(params.page)}`)
    }

    const response = await Api.sendRequest('/apps', 'GET', params, options)

    return response?.data?.map(obj => new App(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    App.list(params, options)
}

export default App

module.exports = App
module.exports.default = App
