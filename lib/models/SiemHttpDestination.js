"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
exports.__esModule = true;
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _Api = _interopRequireDefault(require("../Api"));
var errors = _interopRequireWildcard(require("../Errors"));
var _utils = require("../utils");
var _SiemHttpDestination;
/* eslint-disable no-unused-vars */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2.default)(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
/* eslint-enable no-unused-vars */
/**
 * Class SiemHttpDestination
 */
var SiemHttpDestination = /*#__PURE__*/(0, _createClass2.default)(function SiemHttpDestination() {
  var _this = this;
  var attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0, _classCallCheck2.default)(this, SiemHttpDestination);
  (0, _defineProperty2.default)(this, "attributes", {});
  (0, _defineProperty2.default)(this, "options", {});
  (0, _defineProperty2.default)(this, "isLoaded", function () {
    return !!_this.attributes.id;
  });
  // int64 # SIEM HTTP Destination ID
  (0, _defineProperty2.default)(this, "getId", function () {
    return _this.attributes.id;
  });
  (0, _defineProperty2.default)(this, "setId", function (value) {
    _this.attributes.id = value;
  });
  // string # Name for this Destination
  (0, _defineProperty2.default)(this, "getName", function () {
    return _this.attributes.name;
  });
  (0, _defineProperty2.default)(this, "setName", function (value) {
    _this.attributes.name = value;
  });
  // string # Destination Type
  (0, _defineProperty2.default)(this, "getDestinationType", function () {
    return _this.attributes.destination_type;
  });
  (0, _defineProperty2.default)(this, "setDestinationType", function (value) {
    _this.attributes.destination_type = value;
  });
  // string # Destination Url
  (0, _defineProperty2.default)(this, "getDestinationUrl", function () {
    return _this.attributes.destination_url;
  });
  (0, _defineProperty2.default)(this, "setDestinationUrl", function (value) {
    _this.attributes.destination_url = value;
  });
  // string # Applicable only for destination type: file. Destination folder path on Files.com.
  (0, _defineProperty2.default)(this, "getFileDestinationPath", function () {
    return _this.attributes.file_destination_path;
  });
  (0, _defineProperty2.default)(this, "setFileDestinationPath", function (value) {
    _this.attributes.file_destination_path = value;
  });
  // string # Applicable only for destination type: file. Generated file format.
  (0, _defineProperty2.default)(this, "getFileFormat", function () {
    return _this.attributes.file_format;
  });
  (0, _defineProperty2.default)(this, "setFileFormat", function (value) {
    _this.attributes.file_format = value;
  });
  // int64 # Applicable only for destination type: file. Interval, in minutes, between file deliveries.
  (0, _defineProperty2.default)(this, "getFileIntervalMinutes", function () {
    return _this.attributes.file_interval_minutes;
  });
  (0, _defineProperty2.default)(this, "setFileIntervalMinutes", function (value) {
    _this.attributes.file_interval_minutes = value;
  });
  // object # Additional HTTP Headers included in calls to the destination URL
  (0, _defineProperty2.default)(this, "getAdditionalHeaders", function () {
    return _this.attributes.additional_headers;
  });
  (0, _defineProperty2.default)(this, "setAdditionalHeaders", function (value) {
    _this.attributes.additional_headers = value;
  });
  // boolean # Whether this SIEM HTTP Destination is currently being sent to or not
  (0, _defineProperty2.default)(this, "getSendingActive", function () {
    return _this.attributes.sending_active;
  });
  (0, _defineProperty2.default)(this, "setSendingActive", function (value) {
    _this.attributes.sending_active = value;
  });
  // string # Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing multiple log entries as JSON.
  (0, _defineProperty2.default)(this, "getGenericPayloadType", function () {
    return _this.attributes.generic_payload_type;
  });
  (0, _defineProperty2.default)(this, "setGenericPayloadType", function (value) {
    _this.attributes.generic_payload_type = value;
  });
  // string # Applicable only for destination type: splunk. Authentication token provided by Splunk.
  (0, _defineProperty2.default)(this, "getSplunkTokenMasked", function () {
    return _this.attributes.splunk_token_masked;
  });
  (0, _defineProperty2.default)(this, "setSplunkTokenMasked", function (value) {
    _this.attributes.splunk_token_masked = value;
  });
  // string # Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule.
  (0, _defineProperty2.default)(this, "getAzureDcrImmutableId", function () {
    return _this.attributes.azure_dcr_immutable_id;
  });
  (0, _defineProperty2.default)(this, "setAzureDcrImmutableId", function (value) {
    _this.attributes.azure_dcr_immutable_id = value;
  });
  // string # Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
  (0, _defineProperty2.default)(this, "getAzureStreamName", function () {
    return _this.attributes.azure_stream_name;
  });
  (0, _defineProperty2.default)(this, "setAzureStreamName", function (value) {
    _this.attributes.azure_stream_name = value;
  });
  // string # Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID.
  (0, _defineProperty2.default)(this, "getAzureOauthClientCredentialsTenantId", function () {
    return _this.attributes.azure_oauth_client_credentials_tenant_id;
  });
  (0, _defineProperty2.default)(this, "setAzureOauthClientCredentialsTenantId", function (value) {
    _this.attributes.azure_oauth_client_credentials_tenant_id = value;
  });
  // string # Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID.
  (0, _defineProperty2.default)(this, "getAzureOauthClientCredentialsClientId", function () {
    return _this.attributes.azure_oauth_client_credentials_client_id;
  });
  (0, _defineProperty2.default)(this, "setAzureOauthClientCredentialsClientId", function (value) {
    _this.attributes.azure_oauth_client_credentials_client_id = value;
  });
  // string # Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client Secret.
  (0, _defineProperty2.default)(this, "getAzureOauthClientCredentialsClientSecretMasked", function () {
    return _this.attributes.azure_oauth_client_credentials_client_secret_masked;
  });
  (0, _defineProperty2.default)(this, "setAzureOauthClientCredentialsClientSecretMasked", function (value) {
    _this.attributes.azure_oauth_client_credentials_client_secret_masked = value;
  });
  // string # Applicable only for destination type: qradar. Basic auth username provided by QRadar.
  (0, _defineProperty2.default)(this, "getQradarUsername", function () {
    return _this.attributes.qradar_username;
  });
  (0, _defineProperty2.default)(this, "setQradarUsername", function (value) {
    _this.attributes.qradar_username = value;
  });
  // string # Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  (0, _defineProperty2.default)(this, "getQradarPasswordMasked", function () {
    return _this.attributes.qradar_password_masked;
  });
  (0, _defineProperty2.default)(this, "setQradarPasswordMasked", function (value) {
    _this.attributes.qradar_password_masked = value;
  });
  // string # Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  (0, _defineProperty2.default)(this, "getSolarWindsTokenMasked", function () {
    return _this.attributes.solar_winds_token_masked;
  });
  (0, _defineProperty2.default)(this, "setSolarWindsTokenMasked", function (value) {
    _this.attributes.solar_winds_token_masked = value;
  });
  // string # Applicable only for destination type: new_relic. API key provided by New Relic.
  (0, _defineProperty2.default)(this, "getNewRelicApiKeyMasked", function () {
    return _this.attributes.new_relic_api_key_masked;
  });
  (0, _defineProperty2.default)(this, "setNewRelicApiKeyMasked", function (value) {
    _this.attributes.new_relic_api_key_masked = value;
  });
  // string # Applicable only for destination type: datadog. API key provided by Datadog.
  (0, _defineProperty2.default)(this, "getDatadogApiKeyMasked", function () {
    return _this.attributes.datadog_api_key_masked;
  });
  (0, _defineProperty2.default)(this, "setDatadogApiKeyMasked", function (value) {
    _this.attributes.datadog_api_key_masked = value;
  });
  // boolean # Whether or not sending is enabled for sftp_action logs.
  (0, _defineProperty2.default)(this, "getSftpActionSendEnabled", function () {
    return _this.attributes.sftp_action_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setSftpActionSendEnabled", function (value) {
    _this.attributes.sftp_action_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getSftpActionEntriesSent", function () {
    return _this.attributes.sftp_action_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setSftpActionEntriesSent", function (value) {
    _this.attributes.sftp_action_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for ftp_action logs.
  (0, _defineProperty2.default)(this, "getFtpActionSendEnabled", function () {
    return _this.attributes.ftp_action_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setFtpActionSendEnabled", function (value) {
    _this.attributes.ftp_action_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getFtpActionEntriesSent", function () {
    return _this.attributes.ftp_action_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setFtpActionEntriesSent", function (value) {
    _this.attributes.ftp_action_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for web_dav_action logs.
  (0, _defineProperty2.default)(this, "getWebDavActionSendEnabled", function () {
    return _this.attributes.web_dav_action_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setWebDavActionSendEnabled", function (value) {
    _this.attributes.web_dav_action_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getWebDavActionEntriesSent", function () {
    return _this.attributes.web_dav_action_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setWebDavActionEntriesSent", function (value) {
    _this.attributes.web_dav_action_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for sync logs.
  (0, _defineProperty2.default)(this, "getSyncSendEnabled", function () {
    return _this.attributes.sync_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setSyncSendEnabled", function (value) {
    _this.attributes.sync_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getSyncEntriesSent", function () {
    return _this.attributes.sync_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setSyncEntriesSent", function (value) {
    _this.attributes.sync_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for outbound_connection logs.
  (0, _defineProperty2.default)(this, "getOutboundConnectionSendEnabled", function () {
    return _this.attributes.outbound_connection_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setOutboundConnectionSendEnabled", function (value) {
    _this.attributes.outbound_connection_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getOutboundConnectionEntriesSent", function () {
    return _this.attributes.outbound_connection_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setOutboundConnectionEntriesSent", function (value) {
    _this.attributes.outbound_connection_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for automation logs.
  (0, _defineProperty2.default)(this, "getAutomationSendEnabled", function () {
    return _this.attributes.automation_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setAutomationSendEnabled", function (value) {
    _this.attributes.automation_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getAutomationEntriesSent", function () {
    return _this.attributes.automation_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setAutomationEntriesSent", function (value) {
    _this.attributes.automation_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for api_request logs.
  (0, _defineProperty2.default)(this, "getApiRequestSendEnabled", function () {
    return _this.attributes.api_request_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setApiRequestSendEnabled", function (value) {
    _this.attributes.api_request_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getApiRequestEntriesSent", function () {
    return _this.attributes.api_request_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setApiRequestEntriesSent", function (value) {
    _this.attributes.api_request_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for public_hosting_request logs.
  (0, _defineProperty2.default)(this, "getPublicHostingRequestSendEnabled", function () {
    return _this.attributes.public_hosting_request_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setPublicHostingRequestSendEnabled", function (value) {
    _this.attributes.public_hosting_request_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getPublicHostingRequestEntriesSent", function () {
    return _this.attributes.public_hosting_request_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setPublicHostingRequestEntriesSent", function (value) {
    _this.attributes.public_hosting_request_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for email logs.
  (0, _defineProperty2.default)(this, "getEmailSendEnabled", function () {
    return _this.attributes.email_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setEmailSendEnabled", function (value) {
    _this.attributes.email_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getEmailEntriesSent", function () {
    return _this.attributes.email_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setEmailEntriesSent", function (value) {
    _this.attributes.email_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for exavault_api_request logs.
  (0, _defineProperty2.default)(this, "getExavaultApiRequestSendEnabled", function () {
    return _this.attributes.exavault_api_request_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setExavaultApiRequestSendEnabled", function (value) {
    _this.attributes.exavault_api_request_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getExavaultApiRequestEntriesSent", function () {
    return _this.attributes.exavault_api_request_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setExavaultApiRequestEntriesSent", function (value) {
    _this.attributes.exavault_api_request_entries_sent = value;
  });
  // boolean # Whether or not sending is enabled for settings_change logs.
  (0, _defineProperty2.default)(this, "getSettingsChangeSendEnabled", function () {
    return _this.attributes.settings_change_send_enabled;
  });
  (0, _defineProperty2.default)(this, "setSettingsChangeSendEnabled", function (value) {
    _this.attributes.settings_change_send_enabled = value;
  });
  // int64 # Number of log entries sent for the lifetime of this destination.
  (0, _defineProperty2.default)(this, "getSettingsChangeEntriesSent", function () {
    return _this.attributes.settings_change_entries_sent;
  });
  (0, _defineProperty2.default)(this, "setSettingsChangeEntriesSent", function (value) {
    _this.attributes.settings_change_entries_sent = value;
  });
  // string # Type of URL that was last called. Can be `destination_url` or `azure_oauth_client_credentials_url`
  (0, _defineProperty2.default)(this, "getLastHttpCallTargetType", function () {
    return _this.attributes.last_http_call_target_type;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallTargetType", function (value) {
    _this.attributes.last_http_call_target_type = value;
  });
  // boolean # Was the last HTTP call made successful?
  (0, _defineProperty2.default)(this, "getLastHttpCallSuccess", function () {
    return _this.attributes.last_http_call_success;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallSuccess", function (value) {
    _this.attributes.last_http_call_success = value;
  });
  // int64 # Last HTTP Call Response Code
  (0, _defineProperty2.default)(this, "getLastHttpCallResponseCode", function () {
    return _this.attributes.last_http_call_response_code;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallResponseCode", function (value) {
    _this.attributes.last_http_call_response_code = value;
  });
  // string # Last HTTP Call Response Body. Large responses are truncated.
  (0, _defineProperty2.default)(this, "getLastHttpCallResponseBody", function () {
    return _this.attributes.last_http_call_response_body;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallResponseBody", function (value) {
    _this.attributes.last_http_call_response_body = value;
  });
  // string # Last HTTP Call Error Message if applicable
  (0, _defineProperty2.default)(this, "getLastHttpCallErrorMessage", function () {
    return _this.attributes.last_http_call_error_message;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallErrorMessage", function (value) {
    _this.attributes.last_http_call_error_message = value;
  });
  // string # Time of Last HTTP Call
  (0, _defineProperty2.default)(this, "getLastHttpCallTime", function () {
    return _this.attributes.last_http_call_time;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallTime", function (value) {
    _this.attributes.last_http_call_time = value;
  });
  // int64 # Duration of the last HTTP Call in milliseconds
  (0, _defineProperty2.default)(this, "getLastHttpCallDurationMs", function () {
    return _this.attributes.last_http_call_duration_ms;
  });
  (0, _defineProperty2.default)(this, "setLastHttpCallDurationMs", function (value) {
    _this.attributes.last_http_call_duration_ms = value;
  });
  // string # Time of Most Recent Successful HTTP Call
  (0, _defineProperty2.default)(this, "getMostRecentHttpCallSuccessTime", function () {
    return _this.attributes.most_recent_http_call_success_time;
  });
  (0, _defineProperty2.default)(this, "setMostRecentHttpCallSuccessTime", function (value) {
    _this.attributes.most_recent_http_call_success_time = value;
  });
  // string # Connection Test Entry
  (0, _defineProperty2.default)(this, "getConnectionTestEntry", function () {
    return _this.attributes.connection_test_entry;
  });
  (0, _defineProperty2.default)(this, "setConnectionTestEntry", function (value) {
    _this.attributes.connection_test_entry = value;
  });
  // string # Applicable only for destination type: splunk. Authentication token provided by Splunk.
  (0, _defineProperty2.default)(this, "getSplunkToken", function () {
    return _this.attributes.splunk_token;
  });
  (0, _defineProperty2.default)(this, "setSplunkToken", function (value) {
    _this.attributes.splunk_token = value;
  });
  // string # Applicable only for destination type: azure. Client Credentials OAuth Client Secret.
  (0, _defineProperty2.default)(this, "getAzureOauthClientCredentialsClientSecret", function () {
    return _this.attributes.azure_oauth_client_credentials_client_secret;
  });
  (0, _defineProperty2.default)(this, "setAzureOauthClientCredentialsClientSecret", function (value) {
    _this.attributes.azure_oauth_client_credentials_client_secret = value;
  });
  // string # Applicable only for destination type: qradar. Basic auth password provided by QRadar.
  (0, _defineProperty2.default)(this, "getQradarPassword", function () {
    return _this.attributes.qradar_password;
  });
  (0, _defineProperty2.default)(this, "setQradarPassword", function (value) {
    _this.attributes.qradar_password = value;
  });
  // string # Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds.
  (0, _defineProperty2.default)(this, "getSolarWindsToken", function () {
    return _this.attributes.solar_winds_token;
  });
  (0, _defineProperty2.default)(this, "setSolarWindsToken", function (value) {
    _this.attributes.solar_winds_token = value;
  });
  // string # Applicable only for destination type: new_relic. API key provided by New Relic.
  (0, _defineProperty2.default)(this, "getNewRelicApiKey", function () {
    return _this.attributes.new_relic_api_key;
  });
  (0, _defineProperty2.default)(this, "setNewRelicApiKey", function (value) {
    _this.attributes.new_relic_api_key = value;
  });
  // string # Applicable only for destination type: datadog. API key provided by Datadog.
  (0, _defineProperty2.default)(this, "getDatadogApiKey", function () {
    return _this.attributes.datadog_api_key;
  });
  (0, _defineProperty2.default)(this, "setDatadogApiKey", function (value) {
    _this.attributes.datadog_api_key = value;
  });
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
  (0, _defineProperty2.default)(this, "update", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var params,
      response,
      _args = arguments;
    return _regenerator.default.wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
          if (_this.attributes.id) {
            _context.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (!(params.name && !(0, _utils.isString)(params.name))) {
            _context.next = 4;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
        case 4:
          if (!(params.generic_payload_type && !(0, _utils.isString)(params.generic_payload_type))) {
            _context.next = 5;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: generic_payload_type must be of type String, received ".concat((0, _utils.getType)(params.generic_payload_type)));
        case 5:
          if (!(params.file_destination_path && !(0, _utils.isString)(params.file_destination_path))) {
            _context.next = 6;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: file_destination_path must be of type String, received ".concat((0, _utils.getType)(params.file_destination_path)));
        case 6:
          if (!(params.file_format && !(0, _utils.isString)(params.file_format))) {
            _context.next = 7;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: file_format must be of type String, received ".concat((0, _utils.getType)(params.file_format)));
        case 7:
          if (!(params.file_interval_minutes && !(0, _utils.isInt)(params.file_interval_minutes))) {
            _context.next = 8;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: file_interval_minutes must be of type Int, received ".concat((0, _utils.getType)(params.file_interval_minutes)));
        case 8:
          if (!(params.splunk_token && !(0, _utils.isString)(params.splunk_token))) {
            _context.next = 9;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: splunk_token must be of type String, received ".concat((0, _utils.getType)(params.splunk_token)));
        case 9:
          if (!(params.azure_dcr_immutable_id && !(0, _utils.isString)(params.azure_dcr_immutable_id))) {
            _context.next = 10;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_dcr_immutable_id must be of type String, received ".concat((0, _utils.getType)(params.azure_dcr_immutable_id)));
        case 10:
          if (!(params.azure_stream_name && !(0, _utils.isString)(params.azure_stream_name))) {
            _context.next = 11;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_stream_name must be of type String, received ".concat((0, _utils.getType)(params.azure_stream_name)));
        case 11:
          if (!(params.azure_oauth_client_credentials_tenant_id && !(0, _utils.isString)(params.azure_oauth_client_credentials_tenant_id))) {
            _context.next = 12;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_tenant_id must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_tenant_id)));
        case 12:
          if (!(params.azure_oauth_client_credentials_client_id && !(0, _utils.isString)(params.azure_oauth_client_credentials_client_id))) {
            _context.next = 13;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_client_id must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_client_id)));
        case 13:
          if (!(params.azure_oauth_client_credentials_client_secret && !(0, _utils.isString)(params.azure_oauth_client_credentials_client_secret))) {
            _context.next = 14;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_client_secret must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_client_secret)));
        case 14:
          if (!(params.qradar_username && !(0, _utils.isString)(params.qradar_username))) {
            _context.next = 15;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: qradar_username must be of type String, received ".concat((0, _utils.getType)(params.qradar_username)));
        case 15:
          if (!(params.qradar_password && !(0, _utils.isString)(params.qradar_password))) {
            _context.next = 16;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: qradar_password must be of type String, received ".concat((0, _utils.getType)(params.qradar_password)));
        case 16:
          if (!(params.solar_winds_token && !(0, _utils.isString)(params.solar_winds_token))) {
            _context.next = 17;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: solar_winds_token must be of type String, received ".concat((0, _utils.getType)(params.solar_winds_token)));
        case 17:
          if (!(params.new_relic_api_key && !(0, _utils.isString)(params.new_relic_api_key))) {
            _context.next = 18;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: new_relic_api_key must be of type String, received ".concat((0, _utils.getType)(params.new_relic_api_key)));
        case 18:
          if (!(params.datadog_api_key && !(0, _utils.isString)(params.datadog_api_key))) {
            _context.next = 19;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: datadog_api_key must be of type String, received ".concat((0, _utils.getType)(params.datadog_api_key)));
        case 19:
          if (!(params.destination_type && !(0, _utils.isString)(params.destination_type))) {
            _context.next = 20;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_type must be of type String, received ".concat((0, _utils.getType)(params.destination_type)));
        case 20:
          if (!(params.destination_url && !(0, _utils.isString)(params.destination_url))) {
            _context.next = 21;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: destination_url must be of type String, received ".concat((0, _utils.getType)(params.destination_url)));
        case 21:
          if (params.id) {
            _context.next = 23;
            break;
          }
          if (!_this.attributes.id) {
            _context.next = 22;
            break;
          }
          params.id = _this.id;
          _context.next = 23;
          break;
        case 22:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 23:
          _context.next = 24;
          return _Api.default.sendRequest("/siem_http_destinations/".concat(encodeURIComponent(params.id)), 'PATCH', params, _this.options);
        case 24:
          response = _context.sent;
          return _context.abrupt("return", new SiemHttpDestination(response === null || response === void 0 ? void 0 : response.data, _this.options));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })));
  (0, _defineProperty2.default)(this, "delete", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var params,
      _args2 = arguments;
    return _regenerator.default.wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
          if (_this.attributes.id) {
            _context2.next = 1;
            break;
          }
          throw new errors.EmptyPropertyError('Current object has no id');
        case 1:
          if ((0, _utils.isObject)(params)) {
            _context2.next = 2;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 2:
          params.id = _this.attributes.id;
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context2.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          if (params.id) {
            _context2.next = 5;
            break;
          }
          if (!_this.attributes.id) {
            _context2.next = 4;
            break;
          }
          params.id = _this.id;
          _context2.next = 5;
          break;
        case 4:
          throw new errors.MissingParameterError('Parameter missing: id');
        case 5:
          _context2.next = 6;
          return _Api.default.sendRequest("/siem_http_destinations/".concat(encodeURIComponent(params.id)), 'DELETE', params, _this.options);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })));
  (0, _defineProperty2.default)(this, "destroy", function () {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _this.delete(params);
  });
  (0, _defineProperty2.default)(this, "save", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3() {
    var _newObject, newObject;
    return _regenerator.default.wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (!_this.attributes.id) {
            _context3.next = 2;
            break;
          }
          _context3.next = 1;
          return _this.update(_this.attributes);
        case 1:
          _newObject = _context3.sent;
          _this.attributes = _objectSpread({}, _newObject.attributes);
          return _context3.abrupt("return", true);
        case 2:
          _context3.next = 3;
          return SiemHttpDestination.create(_this.attributes, _this.options);
        case 3:
          newObject = _context3.sent;
          _this.attributes = _objectSpread({}, newObject.attributes);
          return _context3.abrupt("return", true);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })));
  Object.entries(attributes).forEach(function (_ref4) {
    var _ref5 = (0, _slicedToArray2.default)(_ref4, 2),
      key = _ref5[0],
      value = _ref5[1];
    var normalizedKey = key.replace('?', '');
    _this.attributes[normalizedKey] = value;
    Object.defineProperty(_this, normalizedKey, {
      value: value,
      writable: false
    });
  });
  this.options = _objectSpread({}, options);
});
_SiemHttpDestination = SiemHttpDestination;
// Parameters:
//   cursor - string - Used for pagination.  When a list request has more records available, cursors are provided in the response headers `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`.  Send one of those cursor value here to resume an existing list from the next available record.  Note: many of our SDKs have iterator methods that will automatically handle cursor-based pagination.
//   per_page - int64 - Number of records to show per page.  (Max: 10,000, 1,000 or less is recommended).
(0, _defineProperty2.default)(SiemHttpDestination, "list", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4() {
  var _response$data;
  var params,
    options,
    response,
    _args4 = arguments;
  return _regenerator.default.wrap(function (_context4) {
    while (1) switch (_context4.prev = _context4.next) {
      case 0:
        params = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : {};
        options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
        if (!(params.cursor && !(0, _utils.isString)(params.cursor))) {
          _context4.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: cursor must be of type String, received ".concat((0, _utils.getType)(params.cursor)));
      case 1:
        if (!(params.per_page && !(0, _utils.isInt)(params.per_page))) {
          _context4.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: per_page must be of type Int, received ".concat((0, _utils.getType)(params.per_page)));
      case 2:
        _context4.next = 3;
        return _Api.default.sendRequest('/siem_http_destinations', 'GET', params, options);
      case 3:
        response = _context4.sent;
        return _context4.abrupt("return", (response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.map(function (obj) {
          return new _SiemHttpDestination(obj, options);
        })) || []);
      case 4:
      case "end":
        return _context4.stop();
    }
  }, _callee4);
})));
(0, _defineProperty2.default)(SiemHttpDestination, "all", function () {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _SiemHttpDestination.list(params, options);
});
// Parameters:
//   id (required) - int64 - Siem Http Destination ID.
(0, _defineProperty2.default)(SiemHttpDestination, "find", /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(id) {
    var params,
      options,
      response,
      _args5 = arguments;
    return _regenerator.default.wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          params = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          if ((0, _utils.isObject)(params)) {
            _context5.next = 1;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: params must be of type object, received ".concat((0, _utils.getType)(params)));
        case 1:
          params.id = id;
          if (params.id) {
            _context5.next = 2;
            break;
          }
          throw new errors.MissingParameterError('Parameter missing: id');
        case 2:
          if (!(params.id && !(0, _utils.isInt)(params.id))) {
            _context5.next = 3;
            break;
          }
          throw new errors.InvalidParameterError("Bad parameter: id must be of type Int, received ".concat((0, _utils.getType)(params.id)));
        case 3:
          _context5.next = 4;
          return _Api.default.sendRequest("/siem_http_destinations/".concat(encodeURIComponent(params.id)), 'GET', params, options);
        case 4:
          response = _context5.sent;
          return _context5.abrupt("return", new _SiemHttpDestination(response === null || response === void 0 ? void 0 : response.data, options));
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x) {
    return _ref7.apply(this, arguments);
  };
}());
(0, _defineProperty2.default)(SiemHttpDestination, "get", function (id) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return _SiemHttpDestination.find(id, params, options);
});
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
(0, _defineProperty2.default)(SiemHttpDestination, "create", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee6() {
  var params,
    options,
    response,
    _args6 = arguments;
  return _regenerator.default.wrap(function (_context6) {
    while (1) switch (_context6.prev = _context6.next) {
      case 0:
        params = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : {};
        options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
        if (params.destination_type) {
          _context6.next = 1;
          break;
        }
        throw new errors.MissingParameterError('Parameter missing: destination_type');
      case 1:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context6.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 2:
        if (!(params.generic_payload_type && !(0, _utils.isString)(params.generic_payload_type))) {
          _context6.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generic_payload_type must be of type String, received ".concat((0, _utils.getType)(params.generic_payload_type)));
      case 3:
        if (!(params.file_destination_path && !(0, _utils.isString)(params.file_destination_path))) {
          _context6.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_destination_path must be of type String, received ".concat((0, _utils.getType)(params.file_destination_path)));
      case 4:
        if (!(params.file_format && !(0, _utils.isString)(params.file_format))) {
          _context6.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_format must be of type String, received ".concat((0, _utils.getType)(params.file_format)));
      case 5:
        if (!(params.file_interval_minutes && !(0, _utils.isInt)(params.file_interval_minutes))) {
          _context6.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_interval_minutes must be of type Int, received ".concat((0, _utils.getType)(params.file_interval_minutes)));
      case 6:
        if (!(params.splunk_token && !(0, _utils.isString)(params.splunk_token))) {
          _context6.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: splunk_token must be of type String, received ".concat((0, _utils.getType)(params.splunk_token)));
      case 7:
        if (!(params.azure_dcr_immutable_id && !(0, _utils.isString)(params.azure_dcr_immutable_id))) {
          _context6.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_dcr_immutable_id must be of type String, received ".concat((0, _utils.getType)(params.azure_dcr_immutable_id)));
      case 8:
        if (!(params.azure_stream_name && !(0, _utils.isString)(params.azure_stream_name))) {
          _context6.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_stream_name must be of type String, received ".concat((0, _utils.getType)(params.azure_stream_name)));
      case 9:
        if (!(params.azure_oauth_client_credentials_tenant_id && !(0, _utils.isString)(params.azure_oauth_client_credentials_tenant_id))) {
          _context6.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_tenant_id must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_tenant_id)));
      case 10:
        if (!(params.azure_oauth_client_credentials_client_id && !(0, _utils.isString)(params.azure_oauth_client_credentials_client_id))) {
          _context6.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_client_id must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_client_id)));
      case 11:
        if (!(params.azure_oauth_client_credentials_client_secret && !(0, _utils.isString)(params.azure_oauth_client_credentials_client_secret))) {
          _context6.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_client_secret must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_client_secret)));
      case 12:
        if (!(params.qradar_username && !(0, _utils.isString)(params.qradar_username))) {
          _context6.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: qradar_username must be of type String, received ".concat((0, _utils.getType)(params.qradar_username)));
      case 13:
        if (!(params.qradar_password && !(0, _utils.isString)(params.qradar_password))) {
          _context6.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: qradar_password must be of type String, received ".concat((0, _utils.getType)(params.qradar_password)));
      case 14:
        if (!(params.solar_winds_token && !(0, _utils.isString)(params.solar_winds_token))) {
          _context6.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: solar_winds_token must be of type String, received ".concat((0, _utils.getType)(params.solar_winds_token)));
      case 15:
        if (!(params.new_relic_api_key && !(0, _utils.isString)(params.new_relic_api_key))) {
          _context6.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: new_relic_api_key must be of type String, received ".concat((0, _utils.getType)(params.new_relic_api_key)));
      case 16:
        if (!(params.datadog_api_key && !(0, _utils.isString)(params.datadog_api_key))) {
          _context6.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: datadog_api_key must be of type String, received ".concat((0, _utils.getType)(params.datadog_api_key)));
      case 17:
        if (!(params.destination_type && !(0, _utils.isString)(params.destination_type))) {
          _context6.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_type must be of type String, received ".concat((0, _utils.getType)(params.destination_type)));
      case 18:
        if (!(params.destination_url && !(0, _utils.isString)(params.destination_url))) {
          _context6.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_url must be of type String, received ".concat((0, _utils.getType)(params.destination_url)));
      case 19:
        _context6.next = 20;
        return _Api.default.sendRequest('/siem_http_destinations', 'POST', params, options);
      case 20:
        response = _context6.sent;
        return _context6.abrupt("return", new _SiemHttpDestination(response === null || response === void 0 ? void 0 : response.data, options));
      case 21:
      case "end":
        return _context6.stop();
    }
  }, _callee6);
})));
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
(0, _defineProperty2.default)(SiemHttpDestination, "sendTestEntry", /*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee7() {
  var params,
    options,
    _args7 = arguments;
  return _regenerator.default.wrap(function (_context7) {
    while (1) switch (_context7.prev = _context7.next) {
      case 0:
        params = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
        options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
        if (!(params.siem_http_destination_id && !(0, _utils.isInt)(params.siem_http_destination_id))) {
          _context7.next = 1;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: siem_http_destination_id must be of type Int, received ".concat((0, _utils.getType)(params.siem_http_destination_id)));
      case 1:
        if (!(params.destination_type && !(0, _utils.isString)(params.destination_type))) {
          _context7.next = 2;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_type must be of type String, received ".concat((0, _utils.getType)(params.destination_type)));
      case 2:
        if (!(params.destination_url && !(0, _utils.isString)(params.destination_url))) {
          _context7.next = 3;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: destination_url must be of type String, received ".concat((0, _utils.getType)(params.destination_url)));
      case 3:
        if (!(params.name && !(0, _utils.isString)(params.name))) {
          _context7.next = 4;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: name must be of type String, received ".concat((0, _utils.getType)(params.name)));
      case 4:
        if (!(params.generic_payload_type && !(0, _utils.isString)(params.generic_payload_type))) {
          _context7.next = 5;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: generic_payload_type must be of type String, received ".concat((0, _utils.getType)(params.generic_payload_type)));
      case 5:
        if (!(params.file_destination_path && !(0, _utils.isString)(params.file_destination_path))) {
          _context7.next = 6;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_destination_path must be of type String, received ".concat((0, _utils.getType)(params.file_destination_path)));
      case 6:
        if (!(params.file_format && !(0, _utils.isString)(params.file_format))) {
          _context7.next = 7;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_format must be of type String, received ".concat((0, _utils.getType)(params.file_format)));
      case 7:
        if (!(params.file_interval_minutes && !(0, _utils.isInt)(params.file_interval_minutes))) {
          _context7.next = 8;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: file_interval_minutes must be of type Int, received ".concat((0, _utils.getType)(params.file_interval_minutes)));
      case 8:
        if (!(params.splunk_token && !(0, _utils.isString)(params.splunk_token))) {
          _context7.next = 9;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: splunk_token must be of type String, received ".concat((0, _utils.getType)(params.splunk_token)));
      case 9:
        if (!(params.azure_dcr_immutable_id && !(0, _utils.isString)(params.azure_dcr_immutable_id))) {
          _context7.next = 10;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_dcr_immutable_id must be of type String, received ".concat((0, _utils.getType)(params.azure_dcr_immutable_id)));
      case 10:
        if (!(params.azure_stream_name && !(0, _utils.isString)(params.azure_stream_name))) {
          _context7.next = 11;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_stream_name must be of type String, received ".concat((0, _utils.getType)(params.azure_stream_name)));
      case 11:
        if (!(params.azure_oauth_client_credentials_tenant_id && !(0, _utils.isString)(params.azure_oauth_client_credentials_tenant_id))) {
          _context7.next = 12;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_tenant_id must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_tenant_id)));
      case 12:
        if (!(params.azure_oauth_client_credentials_client_id && !(0, _utils.isString)(params.azure_oauth_client_credentials_client_id))) {
          _context7.next = 13;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_client_id must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_client_id)));
      case 13:
        if (!(params.azure_oauth_client_credentials_client_secret && !(0, _utils.isString)(params.azure_oauth_client_credentials_client_secret))) {
          _context7.next = 14;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: azure_oauth_client_credentials_client_secret must be of type String, received ".concat((0, _utils.getType)(params.azure_oauth_client_credentials_client_secret)));
      case 14:
        if (!(params.qradar_username && !(0, _utils.isString)(params.qradar_username))) {
          _context7.next = 15;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: qradar_username must be of type String, received ".concat((0, _utils.getType)(params.qradar_username)));
      case 15:
        if (!(params.qradar_password && !(0, _utils.isString)(params.qradar_password))) {
          _context7.next = 16;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: qradar_password must be of type String, received ".concat((0, _utils.getType)(params.qradar_password)));
      case 16:
        if (!(params.solar_winds_token && !(0, _utils.isString)(params.solar_winds_token))) {
          _context7.next = 17;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: solar_winds_token must be of type String, received ".concat((0, _utils.getType)(params.solar_winds_token)));
      case 17:
        if (!(params.new_relic_api_key && !(0, _utils.isString)(params.new_relic_api_key))) {
          _context7.next = 18;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: new_relic_api_key must be of type String, received ".concat((0, _utils.getType)(params.new_relic_api_key)));
      case 18:
        if (!(params.datadog_api_key && !(0, _utils.isString)(params.datadog_api_key))) {
          _context7.next = 19;
          break;
        }
        throw new errors.InvalidParameterError("Bad parameter: datadog_api_key must be of type String, received ".concat((0, _utils.getType)(params.datadog_api_key)));
      case 19:
        _context7.next = 20;
        return _Api.default.sendRequest('/siem_http_destinations/send_test_entry', 'POST', params, options);
      case 20:
      case "end":
        return _context7.stop();
    }
  }, _callee7);
})));
var _default = exports.default = SiemHttpDestination;
module.exports = SiemHttpDestination;
module.exports.default = SiemHttpDestination;