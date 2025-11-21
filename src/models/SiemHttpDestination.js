/* eslint-disable no-unused-vars */
import Api from '../Api'
import * as errors from '../Errors'
import {
  getType, isArray, isInt, isObject, isString,
} from '../utils'
/* eslint-enable no-unused-vars */

/**
 * Class SiemHttpDestination
 */
class SiemHttpDestination {
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

  // int64 # SIEM HTTP Destination ID
  getId = () => this.attributes.id

  setId = value => {
    this.attributes.id = value
  }

  // string # Name for this Destination
  getName = () => this.attributes.name

  setName = value => {
    this.attributes.name = value
  }

  // string # Destination Type
  getDestinationType = () => this.attributes.destination_type

  setDestinationType = value => {
    this.attributes.destination_type = value
  }

  // string # Destination Url
  getDestinationUrl = () => this.attributes.destination_url

  setDestinationUrl = value => {
    this.attributes.destination_url = value
  }

  // string # Applicable only for destination type: file. Destination folder path on Files.com.
  getFileDestinationPath = () => this.attributes.file_destination_path

  setFileDestinationPath = value => {
    this.attributes.file_destination_path = value
  }

  // string # Applicable only for destination type: file. Generated file format.
  getFileFormat = () => this.attributes.file_format

  setFileFormat = value => {
    this.attributes.file_format = value
  }

  // int64 # Applicable only for destination type: file. Interval, in minutes, between file deliveries.
  getFileIntervalMinutes = () => this.attributes.file_interval_minutes

  setFileIntervalMinutes = value => {
    this.attributes.file_interval_minutes = value
  }

  // object # Additional HTTP Headers included in calls to the destination URL
  getAdditionalHeaders = () => this.attributes.additional_headers

  setAdditionalHeaders = value => {
    this.attributes.additional_headers = value
  }

  // boolean # Whether this SIEM HTTP Destination is currently being sent to or not
  getSendingActive = () => this.attributes.sending_active

  setSendingActive = value => {
    this.attributes.sending_active = value
  }

  // string # Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing multiple log entries as JSON.
  getGenericPayloadType = () => this.attributes.generic_payload_type

  setGenericPayloadType = value => {
    this.attributes.generic_payload_type = value
  }

  // string # Applicable only for destination type: splunk. Authentication token provided by Splunk.
  getSplunkTokenMasked = () => this.attributes.splunk_token_masked

  setSplunkTokenMasked = value => {
    this.attributes.splunk_token_masked = value
  }

  // string # Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule.
  getAzureDcrImmutableId = () => this.attributes.azure_dcr_immutable_id

  setAzureDcrImmutableId = value => {
    this.attributes.azure_dcr_immutable_id = value
  }

  // string # Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
  getAzureStreamName = () => this.attributes.azure_stream_name

  setAzureStreamName = value => {
    this.attributes.azure_stream_name = value
  }

  // string # Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID.
  getAzureOauthClientCredentialsTenantId = () => this.attributes.azure_oauth_client_credentials_tenant_id

  setAzureOauthClientCredentialsTenantId = value => {
    this.attributes.azure_oauth_client_credentials_tenant_id = value
  }

  // string # Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID.
  getAzureOauthClientCredentialsClientId = () => this.attributes.azure_oauth_client_credentials_client_id

  setAzureOauthClientCredentialsClientId = value => {
    this.attributes.azure_oauth_client_credentials_client_id = value
  }

  // string # Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client Secret.
  getAzureOauthClientCredentialsClientSecretMasked = () => this.attributes.azure_oauth_client_credentials_client_secret_masked

  setAzureOauthClientCredentialsClientSecretMasked = value => {
    this.attributes.azure_oauth_client_credentials_client_secret_masked = value
  }

  // string # Applicable only for destination type: qradar. Basic auth username provided by QRadar.
  getQradarUsername = () => this.attributes.qradar_username

  setQradarUsername = value => {
    this.attributes.qradar_username = value
  }

  // string # Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  getQradarPasswordMasked = () => this.attributes.qradar_password_masked

  setQradarPasswordMasked = value => {
    this.attributes.qradar_password_masked = value
  }

  // string # Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  getSolarWindsTokenMasked = () => this.attributes.solar_winds_token_masked

  setSolarWindsTokenMasked = value => {
    this.attributes.solar_winds_token_masked = value
  }

  // string # Applicable only for destination type: new_relic. API key provided by New Relic.
  getNewRelicApiKeyMasked = () => this.attributes.new_relic_api_key_masked

  setNewRelicApiKeyMasked = value => {
    this.attributes.new_relic_api_key_masked = value
  }

  // string # Applicable only for destination type: datadog. API key provided by Datadog.
  getDatadogApiKeyMasked = () => this.attributes.datadog_api_key_masked

  setDatadogApiKeyMasked = value => {
    this.attributes.datadog_api_key_masked = value
  }

  // boolean # Whether or not sending is enabled for sftp_action logs.
  getSftpActionSendEnabled = () => this.attributes.sftp_action_send_enabled

  setSftpActionSendEnabled = value => {
    this.attributes.sftp_action_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getSftpActionEntriesSent = () => this.attributes.sftp_action_entries_sent

  setSftpActionEntriesSent = value => {
    this.attributes.sftp_action_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for ftp_action logs.
  getFtpActionSendEnabled = () => this.attributes.ftp_action_send_enabled

  setFtpActionSendEnabled = value => {
    this.attributes.ftp_action_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getFtpActionEntriesSent = () => this.attributes.ftp_action_entries_sent

  setFtpActionEntriesSent = value => {
    this.attributes.ftp_action_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for web_dav_action logs.
  getWebDavActionSendEnabled = () => this.attributes.web_dav_action_send_enabled

  setWebDavActionSendEnabled = value => {
    this.attributes.web_dav_action_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getWebDavActionEntriesSent = () => this.attributes.web_dav_action_entries_sent

  setWebDavActionEntriesSent = value => {
    this.attributes.web_dav_action_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for sync logs.
  getSyncSendEnabled = () => this.attributes.sync_send_enabled

  setSyncSendEnabled = value => {
    this.attributes.sync_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getSyncEntriesSent = () => this.attributes.sync_entries_sent

  setSyncEntriesSent = value => {
    this.attributes.sync_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for outbound_connection logs.
  getOutboundConnectionSendEnabled = () => this.attributes.outbound_connection_send_enabled

  setOutboundConnectionSendEnabled = value => {
    this.attributes.outbound_connection_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getOutboundConnectionEntriesSent = () => this.attributes.outbound_connection_entries_sent

  setOutboundConnectionEntriesSent = value => {
    this.attributes.outbound_connection_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for automation logs.
  getAutomationSendEnabled = () => this.attributes.automation_send_enabled

  setAutomationSendEnabled = value => {
    this.attributes.automation_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getAutomationEntriesSent = () => this.attributes.automation_entries_sent

  setAutomationEntriesSent = value => {
    this.attributes.automation_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for api_request logs.
  getApiRequestSendEnabled = () => this.attributes.api_request_send_enabled

  setApiRequestSendEnabled = value => {
    this.attributes.api_request_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getApiRequestEntriesSent = () => this.attributes.api_request_entries_sent

  setApiRequestEntriesSent = value => {
    this.attributes.api_request_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for public_hosting_request logs.
  getPublicHostingRequestSendEnabled = () => this.attributes.public_hosting_request_send_enabled

  setPublicHostingRequestSendEnabled = value => {
    this.attributes.public_hosting_request_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getPublicHostingRequestEntriesSent = () => this.attributes.public_hosting_request_entries_sent

  setPublicHostingRequestEntriesSent = value => {
    this.attributes.public_hosting_request_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for email logs.
  getEmailSendEnabled = () => this.attributes.email_send_enabled

  setEmailSendEnabled = value => {
    this.attributes.email_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getEmailEntriesSent = () => this.attributes.email_entries_sent

  setEmailEntriesSent = value => {
    this.attributes.email_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for exavault_api_request logs.
  getExavaultApiRequestSendEnabled = () => this.attributes.exavault_api_request_send_enabled

  setExavaultApiRequestSendEnabled = value => {
    this.attributes.exavault_api_request_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getExavaultApiRequestEntriesSent = () => this.attributes.exavault_api_request_entries_sent

  setExavaultApiRequestEntriesSent = value => {
    this.attributes.exavault_api_request_entries_sent = value
  }

  // boolean # Whether or not sending is enabled for settings_change logs.
  getSettingsChangeSendEnabled = () => this.attributes.settings_change_send_enabled

  setSettingsChangeSendEnabled = value => {
    this.attributes.settings_change_send_enabled = value
  }

  // int64 # Number of log entries sent for the lifetime of this destination.
  getSettingsChangeEntriesSent = () => this.attributes.settings_change_entries_sent

  setSettingsChangeEntriesSent = value => {
    this.attributes.settings_change_entries_sent = value
  }

  // string # Type of URL that was last called. Can be `destination_url` or `azure_oauth_client_credentials_url`
  getLastHttpCallTargetType = () => this.attributes.last_http_call_target_type

  setLastHttpCallTargetType = value => {
    this.attributes.last_http_call_target_type = value
  }

  // boolean # Was the last HTTP call made successful?
  getLastHttpCallSuccess = () => this.attributes.last_http_call_success

  setLastHttpCallSuccess = value => {
    this.attributes.last_http_call_success = value
  }

  // int64 # Last HTTP Call Response Code
  getLastHttpCallResponseCode = () => this.attributes.last_http_call_response_code

  setLastHttpCallResponseCode = value => {
    this.attributes.last_http_call_response_code = value
  }

  // string # Last HTTP Call Response Body. Large responses are truncated.
  getLastHttpCallResponseBody = () => this.attributes.last_http_call_response_body

  setLastHttpCallResponseBody = value => {
    this.attributes.last_http_call_response_body = value
  }

  // string # Last HTTP Call Error Message if applicable
  getLastHttpCallErrorMessage = () => this.attributes.last_http_call_error_message

  setLastHttpCallErrorMessage = value => {
    this.attributes.last_http_call_error_message = value
  }

  // string # Time of Last HTTP Call
  getLastHttpCallTime = () => this.attributes.last_http_call_time

  setLastHttpCallTime = value => {
    this.attributes.last_http_call_time = value
  }

  // int64 # Duration of the last HTTP Call in milliseconds
  getLastHttpCallDurationMs = () => this.attributes.last_http_call_duration_ms

  setLastHttpCallDurationMs = value => {
    this.attributes.last_http_call_duration_ms = value
  }

  // string # Time of Most Recent Successful HTTP Call
  getMostRecentHttpCallSuccessTime = () => this.attributes.most_recent_http_call_success_time

  setMostRecentHttpCallSuccessTime = value => {
    this.attributes.most_recent_http_call_success_time = value
  }

  // string # Connection Test Entry
  getConnectionTestEntry = () => this.attributes.connection_test_entry

  setConnectionTestEntry = value => {
    this.attributes.connection_test_entry = value
  }

  // string # Applicable only for destination type: splunk. Authentication token provided by Splunk.
  getSplunkToken = () => this.attributes.splunk_token

  setSplunkToken = value => {
    this.attributes.splunk_token = value
  }

  // string # Applicable only for destination type: azure. Client Credentials OAuth Client Secret.
  getAzureOauthClientCredentialsClientSecret = () => this.attributes.azure_oauth_client_credentials_client_secret

  setAzureOauthClientCredentialsClientSecret = value => {
    this.attributes.azure_oauth_client_credentials_client_secret = value
  }

  // string # Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  getQradarPassword = () => this.attributes.qradar_password

  setQradarPassword = value => {
    this.attributes.qradar_password = value
  }

  // string # Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  getSolarWindsToken = () => this.attributes.solar_winds_token

  setSolarWindsToken = value => {
    this.attributes.solar_winds_token = value
  }

  // string # Applicable only for destination type: new_relic. API key provided by New Relic.
  getNewRelicApiKey = () => this.attributes.new_relic_api_key

  setNewRelicApiKey = value => {
    this.attributes.new_relic_api_key = value
  }

  // string # Applicable only for destination type: datadog. API key provided by Datadog.
  getDatadogApiKey = () => this.attributes.datadog_api_key

  setDatadogApiKey = value => {
    this.attributes.datadog_api_key = value
  }

  // Parameters:
  //   name - string - Name for this Destination
  //   additional_headers - object - Additional HTTP Headers included in calls to the destination URL
  //   sending_active - boolean - Whether this SIEM HTTP Destination is currently being sent to or not
  //   generic_payload_type - string - Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing multiple log entries as JSON.
  //   file_destination_path - string - Applicable only for destination type: file. Destination folder path on Files.com.
  //   file_format - string - Applicable only for destination type: file. Generated file format.
  //   file_interval_minutes - int64 - Applicable only for destination type: file. Interval, in minutes, between file deliveries. Valid values are 5, 10, 15, 20, 30, 60, 90, 180, 240, 360.
  //   splunk_token - string - Applicable only for destination type: splunk. Authentication token provided by Splunk.
  //   azure_dcr_immutable_id - string - Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule.
  //   azure_stream_name - string - Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
  //   azure_oauth_client_credentials_tenant_id - string - Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID.
  //   azure_oauth_client_credentials_client_id - string - Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID.
  //   azure_oauth_client_credentials_client_secret - string - Applicable only for destination type: azure. Client Credentials OAuth Client Secret.
  //   qradar_username - string - Applicable only for destination type: qradar. Basic auth username provided by QRadar.
  //   qradar_password - string - Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  //   solar_winds_token - string - Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  //   new_relic_api_key - string - Applicable only for destination type: new_relic. API key provided by New Relic.
  //   datadog_api_key - string - Applicable only for destination type: datadog. API key provided by Datadog.
  //   sftp_action_send_enabled - boolean - Whether or not sending is enabled for sftp_action logs.
  //   ftp_action_send_enabled - boolean - Whether or not sending is enabled for ftp_action logs.
  //   web_dav_action_send_enabled - boolean - Whether or not sending is enabled for web_dav_action logs.
  //   sync_send_enabled - boolean - Whether or not sending is enabled for sync logs.
  //   outbound_connection_send_enabled - boolean - Whether or not sending is enabled for outbound_connection logs.
  //   automation_send_enabled - boolean - Whether or not sending is enabled for automation logs.
  //   api_request_send_enabled - boolean - Whether or not sending is enabled for api_request logs.
  //   public_hosting_request_send_enabled - boolean - Whether or not sending is enabled for public_hosting_request logs.
  //   email_send_enabled - boolean - Whether or not sending is enabled for email logs.
  //   exavault_api_request_send_enabled - boolean - Whether or not sending is enabled for exavault_api_request logs.
  //   settings_change_send_enabled - boolean - Whether or not sending is enabled for settings_change logs.
  //   destination_type - string - Destination Type
  //   destination_url - string - Destination Url
  update = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.generic_payload_type && !isString(params.generic_payload_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: generic_payload_type must be of type String, received ${getType(params.generic_payload_type)}`)
    }

    if (params.file_destination_path && !isString(params.file_destination_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_destination_path must be of type String, received ${getType(params.file_destination_path)}`)
    }

    if (params.file_format && !isString(params.file_format)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_format must be of type String, received ${getType(params.file_format)}`)
    }

    if (params.file_interval_minutes && !isInt(params.file_interval_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_interval_minutes must be of type Int, received ${getType(params.file_interval_minutes)}`)
    }

    if (params.splunk_token && !isString(params.splunk_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: splunk_token must be of type String, received ${getType(params.splunk_token)}`)
    }

    if (params.azure_dcr_immutable_id && !isString(params.azure_dcr_immutable_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_dcr_immutable_id must be of type String, received ${getType(params.azure_dcr_immutable_id)}`)
    }

    if (params.azure_stream_name && !isString(params.azure_stream_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_stream_name must be of type String, received ${getType(params.azure_stream_name)}`)
    }

    if (params.azure_oauth_client_credentials_tenant_id && !isString(params.azure_oauth_client_credentials_tenant_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_tenant_id must be of type String, received ${getType(params.azure_oauth_client_credentials_tenant_id)}`)
    }

    if (params.azure_oauth_client_credentials_client_id && !isString(params.azure_oauth_client_credentials_client_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_client_id must be of type String, received ${getType(params.azure_oauth_client_credentials_client_id)}`)
    }

    if (params.azure_oauth_client_credentials_client_secret && !isString(params.azure_oauth_client_credentials_client_secret)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_client_secret must be of type String, received ${getType(params.azure_oauth_client_credentials_client_secret)}`)
    }

    if (params.qradar_username && !isString(params.qradar_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: qradar_username must be of type String, received ${getType(params.qradar_username)}`)
    }

    if (params.qradar_password && !isString(params.qradar_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: qradar_password must be of type String, received ${getType(params.qradar_password)}`)
    }

    if (params.solar_winds_token && !isString(params.solar_winds_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: solar_winds_token must be of type String, received ${getType(params.solar_winds_token)}`)
    }

    if (params.new_relic_api_key && !isString(params.new_relic_api_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: new_relic_api_key must be of type String, received ${getType(params.new_relic_api_key)}`)
    }

    if (params.datadog_api_key && !isString(params.datadog_api_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: datadog_api_key must be of type String, received ${getType(params.datadog_api_key)}`)
    }

    if (params.destination_type && !isString(params.destination_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_type must be of type String, received ${getType(params.destination_type)}`)
    }

    if (params.destination_url && !isString(params.destination_url)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_url must be of type String, received ${getType(params.destination_url)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    const response = await Api.sendRequest(`/siem_http_destinations/${encodeURIComponent(params.id)}`, 'PATCH', params, this.options)

    return new SiemHttpDestination(response?.data, this.options)
  }

  delete = async (params = {}) => {
    if (!this.attributes.id) {
      throw new errors.EmptyPropertyError('Current object has no id')
    }

    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = this.attributes.id
    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    if (!params.id) {
      if (this.attributes.id) {
        params.id = this.id
      } else {
        throw new errors.MissingParameterError('Parameter missing: id')
      }
    }

    await Api.sendRequest(`/siem_http_destinations/${encodeURIComponent(params.id)}`, 'DELETE', params, this.options)
  }

  destroy = (params = {}) =>
    this.delete(params)

  save = async () => {
    if (this.attributes.id) {
      const newObject = await this.update(this.attributes)
      this.attributes = { ...newObject.attributes }
      return true
    }

    const newObject = await SiemHttpDestination.create(this.attributes, this.options)
    this.attributes = { ...newObject.attributes }
    return true
  }

  // Parameters:
  //   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
  //   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
  static list = async (params = {}, options = {}) => {
    if (params.cursor && !isString(params.cursor)) {
      throw new errors.InvalidParameterError(`Bad parameter: cursor must be of type String, received ${getType(params.cursor)}`)
    }

    if (params.per_page && !isInt(params.per_page)) {
      throw new errors.InvalidParameterError(`Bad parameter: per_page must be of type Int, received ${getType(params.per_page)}`)
    }

    const response = await Api.sendRequest('/siem_http_destinations', 'GET', params, options)

    return response?.data?.map(obj => new SiemHttpDestination(obj, options)) || []
  }

  static all = (params = {}, options = {}) =>
    SiemHttpDestination.list(params, options)

  // Parameters:
  //   id (required) - int64 - Siem Http Destination ID.
  static find = async (id, params = {}, options = {}) => {
    if (!isObject(params)) {
      throw new errors.InvalidParameterError(`Bad parameter: params must be of type object, received ${getType(params)}`)
    }

    params.id = id

    if (!params.id) {
      throw new errors.MissingParameterError('Parameter missing: id')
    }

    if (params.id && !isInt(params.id)) {
      throw new errors.InvalidParameterError(`Bad parameter: id must be of type Int, received ${getType(params.id)}`)
    }

    const response = await Api.sendRequest(`/siem_http_destinations/${encodeURIComponent(params.id)}`, 'GET', params, options)

    return new SiemHttpDestination(response?.data, options)
  }

  static get = (id, params = {}, options = {}) =>
    SiemHttpDestination.find(id, params, options)

  // Parameters:
  //   name - string - Name for this Destination
  //   additional_headers - object - Additional HTTP Headers included in calls to the destination URL
  //   sending_active - boolean - Whether this SIEM HTTP Destination is currently being sent to or not
  //   generic_payload_type - string - Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing multiple log entries as JSON.
  //   file_destination_path - string - Applicable only for destination type: file. Destination folder path on Files.com.
  //   file_format - string - Applicable only for destination type: file. Generated file format.
  //   file_interval_minutes - int64 - Applicable only for destination type: file. Interval, in minutes, between file deliveries. Valid values are 5, 10, 15, 20, 30, 60, 90, 180, 240, 360.
  //   splunk_token - string - Applicable only for destination type: splunk. Authentication token provided by Splunk.
  //   azure_dcr_immutable_id - string - Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule.
  //   azure_stream_name - string - Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
  //   azure_oauth_client_credentials_tenant_id - string - Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID.
  //   azure_oauth_client_credentials_client_id - string - Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID.
  //   azure_oauth_client_credentials_client_secret - string - Applicable only for destination type: azure. Client Credentials OAuth Client Secret.
  //   qradar_username - string - Applicable only for destination type: qradar. Basic auth username provided by QRadar.
  //   qradar_password - string - Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  //   solar_winds_token - string - Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  //   new_relic_api_key - string - Applicable only for destination type: new_relic. API key provided by New Relic.
  //   datadog_api_key - string - Applicable only for destination type: datadog. API key provided by Datadog.
  //   sftp_action_send_enabled - boolean - Whether or not sending is enabled for sftp_action logs.
  //   ftp_action_send_enabled - boolean - Whether or not sending is enabled for ftp_action logs.
  //   web_dav_action_send_enabled - boolean - Whether or not sending is enabled for web_dav_action logs.
  //   sync_send_enabled - boolean - Whether or not sending is enabled for sync logs.
  //   outbound_connection_send_enabled - boolean - Whether or not sending is enabled for outbound_connection logs.
  //   automation_send_enabled - boolean - Whether or not sending is enabled for automation logs.
  //   api_request_send_enabled - boolean - Whether or not sending is enabled for api_request logs.
  //   public_hosting_request_send_enabled - boolean - Whether or not sending is enabled for public_hosting_request logs.
  //   email_send_enabled - boolean - Whether or not sending is enabled for email logs.
  //   exavault_api_request_send_enabled - boolean - Whether or not sending is enabled for exavault_api_request logs.
  //   settings_change_send_enabled - boolean - Whether or not sending is enabled for settings_change logs.
  //   destination_type (required) - string - Destination Type
  //   destination_url - string - Destination Url
  static create = async (params = {}, options = {}) => {
    if (!params.destination_type) {
      throw new errors.MissingParameterError('Parameter missing: destination_type')
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.generic_payload_type && !isString(params.generic_payload_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: generic_payload_type must be of type String, received ${getType(params.generic_payload_type)}`)
    }

    if (params.file_destination_path && !isString(params.file_destination_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_destination_path must be of type String, received ${getType(params.file_destination_path)}`)
    }

    if (params.file_format && !isString(params.file_format)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_format must be of type String, received ${getType(params.file_format)}`)
    }

    if (params.file_interval_minutes && !isInt(params.file_interval_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_interval_minutes must be of type Int, received ${getType(params.file_interval_minutes)}`)
    }

    if (params.splunk_token && !isString(params.splunk_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: splunk_token must be of type String, received ${getType(params.splunk_token)}`)
    }

    if (params.azure_dcr_immutable_id && !isString(params.azure_dcr_immutable_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_dcr_immutable_id must be of type String, received ${getType(params.azure_dcr_immutable_id)}`)
    }

    if (params.azure_stream_name && !isString(params.azure_stream_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_stream_name must be of type String, received ${getType(params.azure_stream_name)}`)
    }

    if (params.azure_oauth_client_credentials_tenant_id && !isString(params.azure_oauth_client_credentials_tenant_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_tenant_id must be of type String, received ${getType(params.azure_oauth_client_credentials_tenant_id)}`)
    }

    if (params.azure_oauth_client_credentials_client_id && !isString(params.azure_oauth_client_credentials_client_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_client_id must be of type String, received ${getType(params.azure_oauth_client_credentials_client_id)}`)
    }

    if (params.azure_oauth_client_credentials_client_secret && !isString(params.azure_oauth_client_credentials_client_secret)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_client_secret must be of type String, received ${getType(params.azure_oauth_client_credentials_client_secret)}`)
    }

    if (params.qradar_username && !isString(params.qradar_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: qradar_username must be of type String, received ${getType(params.qradar_username)}`)
    }

    if (params.qradar_password && !isString(params.qradar_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: qradar_password must be of type String, received ${getType(params.qradar_password)}`)
    }

    if (params.solar_winds_token && !isString(params.solar_winds_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: solar_winds_token must be of type String, received ${getType(params.solar_winds_token)}`)
    }

    if (params.new_relic_api_key && !isString(params.new_relic_api_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: new_relic_api_key must be of type String, received ${getType(params.new_relic_api_key)}`)
    }

    if (params.datadog_api_key && !isString(params.datadog_api_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: datadog_api_key must be of type String, received ${getType(params.datadog_api_key)}`)
    }

    if (params.destination_type && !isString(params.destination_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_type must be of type String, received ${getType(params.destination_type)}`)
    }

    if (params.destination_url && !isString(params.destination_url)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_url must be of type String, received ${getType(params.destination_url)}`)
    }

    const response = await Api.sendRequest('/siem_http_destinations', 'POST', params, options)

    return new SiemHttpDestination(response?.data, options)
  }

  // Parameters:
  //   siem_http_destination_id - int64 - SIEM HTTP Destination ID
  //   destination_type - string - Destination Type
  //   destination_url - string - Destination Url
  //   name - string - Name for this Destination
  //   additional_headers - object - Additional HTTP Headers included in calls to the destination URL
  //   sending_active - boolean - Whether this SIEM HTTP Destination is currently being sent to or not
  //   generic_payload_type - string - Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing multiple log entries as JSON.
  //   file_destination_path - string - Applicable only for destination type: file. Destination folder path on Files.com.
  //   file_format - string - Applicable only for destination type: file. Generated file format.
  //   file_interval_minutes - int64 - Applicable only for destination type: file. Interval, in minutes, between file deliveries. Valid values are 5, 10, 15, 20, 30, 60, 90, 180, 240, 360.
  //   splunk_token - string - Applicable only for destination type: splunk. Authentication token provided by Splunk.
  //   azure_dcr_immutable_id - string - Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule.
  //   azure_stream_name - string - Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
  //   azure_oauth_client_credentials_tenant_id - string - Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID.
  //   azure_oauth_client_credentials_client_id - string - Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID.
  //   azure_oauth_client_credentials_client_secret - string - Applicable only for destination type: azure. Client Credentials OAuth Client Secret.
  //   qradar_username - string - Applicable only for destination type: qradar. Basic auth username provided by QRadar.
  //   qradar_password - string - Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  //   solar_winds_token - string - Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  //   new_relic_api_key - string - Applicable only for destination type: new_relic. API key provided by New Relic.
  //   datadog_api_key - string - Applicable only for destination type: datadog. API key provided by Datadog.
  //   sftp_action_send_enabled - boolean - Whether or not sending is enabled for sftp_action logs.
  //   ftp_action_send_enabled - boolean - Whether or not sending is enabled for ftp_action logs.
  //   web_dav_action_send_enabled - boolean - Whether or not sending is enabled for web_dav_action logs.
  //   sync_send_enabled - boolean - Whether or not sending is enabled for sync logs.
  //   outbound_connection_send_enabled - boolean - Whether or not sending is enabled for outbound_connection logs.
  //   automation_send_enabled - boolean - Whether or not sending is enabled for automation logs.
  //   api_request_send_enabled - boolean - Whether or not sending is enabled for api_request logs.
  //   public_hosting_request_send_enabled - boolean - Whether or not sending is enabled for public_hosting_request logs.
  //   email_send_enabled - boolean - Whether or not sending is enabled for email logs.
  //   exavault_api_request_send_enabled - boolean - Whether or not sending is enabled for exavault_api_request logs.
  //   settings_change_send_enabled - boolean - Whether or not sending is enabled for settings_change logs.
  static sendTestEntry = async (params = {}, options = {}) => {
    if (params.siem_http_destination_id && !isInt(params.siem_http_destination_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: siem_http_destination_id must be of type Int, received ${getType(params.siem_http_destination_id)}`)
    }

    if (params.destination_type && !isString(params.destination_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_type must be of type String, received ${getType(params.destination_type)}`)
    }

    if (params.destination_url && !isString(params.destination_url)) {
      throw new errors.InvalidParameterError(`Bad parameter: destination_url must be of type String, received ${getType(params.destination_url)}`)
    }

    if (params.name && !isString(params.name)) {
      throw new errors.InvalidParameterError(`Bad parameter: name must be of type String, received ${getType(params.name)}`)
    }

    if (params.generic_payload_type && !isString(params.generic_payload_type)) {
      throw new errors.InvalidParameterError(`Bad parameter: generic_payload_type must be of type String, received ${getType(params.generic_payload_type)}`)
    }

    if (params.file_destination_path && !isString(params.file_destination_path)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_destination_path must be of type String, received ${getType(params.file_destination_path)}`)
    }

    if (params.file_format && !isString(params.file_format)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_format must be of type String, received ${getType(params.file_format)}`)
    }

    if (params.file_interval_minutes && !isInt(params.file_interval_minutes)) {
      throw new errors.InvalidParameterError(`Bad parameter: file_interval_minutes must be of type Int, received ${getType(params.file_interval_minutes)}`)
    }

    if (params.splunk_token && !isString(params.splunk_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: splunk_token must be of type String, received ${getType(params.splunk_token)}`)
    }

    if (params.azure_dcr_immutable_id && !isString(params.azure_dcr_immutable_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_dcr_immutable_id must be of type String, received ${getType(params.azure_dcr_immutable_id)}`)
    }

    if (params.azure_stream_name && !isString(params.azure_stream_name)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_stream_name must be of type String, received ${getType(params.azure_stream_name)}`)
    }

    if (params.azure_oauth_client_credentials_tenant_id && !isString(params.azure_oauth_client_credentials_tenant_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_tenant_id must be of type String, received ${getType(params.azure_oauth_client_credentials_tenant_id)}`)
    }

    if (params.azure_oauth_client_credentials_client_id && !isString(params.azure_oauth_client_credentials_client_id)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_client_id must be of type String, received ${getType(params.azure_oauth_client_credentials_client_id)}`)
    }

    if (params.azure_oauth_client_credentials_client_secret && !isString(params.azure_oauth_client_credentials_client_secret)) {
      throw new errors.InvalidParameterError(`Bad parameter: azure_oauth_client_credentials_client_secret must be of type String, received ${getType(params.azure_oauth_client_credentials_client_secret)}`)
    }

    if (params.qradar_username && !isString(params.qradar_username)) {
      throw new errors.InvalidParameterError(`Bad parameter: qradar_username must be of type String, received ${getType(params.qradar_username)}`)
    }

    if (params.qradar_password && !isString(params.qradar_password)) {
      throw new errors.InvalidParameterError(`Bad parameter: qradar_password must be of type String, received ${getType(params.qradar_password)}`)
    }

    if (params.solar_winds_token && !isString(params.solar_winds_token)) {
      throw new errors.InvalidParameterError(`Bad parameter: solar_winds_token must be of type String, received ${getType(params.solar_winds_token)}`)
    }

    if (params.new_relic_api_key && !isString(params.new_relic_api_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: new_relic_api_key must be of type String, received ${getType(params.new_relic_api_key)}`)
    }

    if (params.datadog_api_key && !isString(params.datadog_api_key)) {
      throw new errors.InvalidParameterError(`Bad parameter: datadog_api_key must be of type String, received ${getType(params.datadog_api_key)}`)
    }

    await Api.sendRequest('/siem_http_destinations/send_test_entry', 'POST', params, options)
  }
}

export default SiemHttpDestination

module.exports = SiemHttpDestination
module.exports.default = SiemHttpDestination
