import Files from '../Files'

/** A SIEM HTTP Destination defines where Files.com sends the log types you select. */
declare class SiemHttpDestination {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: SiemHttpDestination.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: SiemHttpDestination.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** SIEM HTTP Destination ID */
  readonly id?: number | null

  /** Name for this Destination */
  readonly name?: string | null

  /** Destination Type */
  readonly destination_type?: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible' | Files.OtherString | null

  /** Destination Url */
  readonly destination_url?: string | null

  /** Applicable only for destination type: file. Destination folder path on Files.com. */
  readonly file_destination_path?: string | null

  /** Applicable only for destination type: file. Generated file format. */
  readonly file_format?: 'json' | 'csv' | Files.OtherString | null

  /** Applicable only for destination type: file. Interval, in minutes, between file deliveries. */
  readonly file_interval_minutes?: number | null

  /** Additional HTTP Headers included in calls to the destination URL */
  readonly additional_headers?: SiemHttpDestination.AdditionalHeaders | null

  /** Whether this SIEM HTTP Destination is currently being sent to or not */
  readonly sending_active?: boolean | null

  /**
   * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array.
   * json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing
   * multiple log entries as JSON.
   */
  readonly generic_payload_type?: 'json_newline' | 'json_array' | Files.OtherString | null

  /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
  readonly splunk_token_masked?: string | null

  /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
  readonly crowdstrike_token_masked?: string | null

  /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
  readonly azure_dcr_immutable_id?: string | null

  /**
   * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
   */
  readonly azure_stream_name?: string | null

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
  readonly azure_oauth_client_credentials_tenant_id?: string | null

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
  readonly azure_oauth_client_credentials_client_id?: string | null

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client Secret. */
  readonly azure_oauth_client_credentials_client_secret_masked?: string | null

  /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
  readonly qradar_username?: string | null

  /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
  readonly qradar_password_masked?: string | null

  /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
  readonly solar_winds_token_masked?: string | null

  /** Applicable only for destination type: new_relic. API key provided by New Relic. */
  readonly new_relic_api_key_masked?: string | null

  /** Applicable only for destination type: datadog. API key provided by Datadog. */
  readonly datadog_api_key_masked?: string | null

  /** Whether or not sending is enabled for action logs. */
  readonly action_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly action_entries_sent?: number | null

  /** Whether or not sending is enabled for sftp_action logs. */
  readonly sftp_action_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly sftp_action_entries_sent?: number | null

  /** Whether or not sending is enabled for ftp_action logs. */
  readonly ftp_action_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly ftp_action_entries_sent?: number | null

  /** Whether or not sending is enabled for web_dav_action logs. */
  readonly web_dav_action_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly web_dav_action_entries_sent?: number | null

  /** Whether or not sending is enabled for sync logs. */
  readonly sync_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly sync_entries_sent?: number | null

  /** Whether or not sending is enabled for outbound_connection logs. */
  readonly outbound_connection_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly outbound_connection_entries_sent?: number | null

  /** Whether or not sending is enabled for automation logs. */
  readonly automation_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly automation_entries_sent?: number | null

  /** Whether or not sending is enabled for api_request logs. */
  readonly api_request_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly api_request_entries_sent?: number | null

  /** Whether or not sending is enabled for public_hosting_request logs. */
  readonly public_hosting_request_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly public_hosting_request_entries_sent?: number | null

  /** Whether or not sending is enabled for email logs. */
  readonly email_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly email_entries_sent?: number | null

  /** Whether or not sending is enabled for exavault_api_request logs. */
  readonly exavault_api_request_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly exavault_api_request_entries_sent?: number | null

  /** Whether or not sending is enabled for settings_change logs. */
  readonly settings_change_send_enabled?: boolean | null

  /** Number of log entries sent for the lifetime of this destination. */
  readonly settings_change_entries_sent?: number | null

  /** Type of URL that was last called. Can be `destination_url` or `azure_oauth_client_credentials_url` */
  readonly last_http_call_target_type?: 'destination_url' | 'azure_oauth_client_credentials_url' | 'file_destination' | Files.OtherString | null

  /** Was the last HTTP call made successful? */
  readonly last_http_call_success?: boolean | null

  /** Last HTTP Call Response Code */
  readonly last_http_call_response_code?: number | null

  /** Last HTTP Call Response Body. Large responses are truncated. */
  readonly last_http_call_response_body?: string | null

  /** Last HTTP Call Error Message if applicable */
  readonly last_http_call_error_message?: string | null

  /** Time of Last HTTP Call */
  readonly last_http_call_time?: string | null

  /** Duration of the last HTTP Call in milliseconds */
  readonly last_http_call_duration_ms?: number | null

  /** Time of Most Recent Successful HTTP Call */
  readonly most_recent_http_call_success_time?: string | null

  /** Connection Test Entry */
  readonly connection_test_entry?: string | null

  /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
  readonly splunk_token?: string

  /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
  readonly crowdstrike_token?: string

  /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
  readonly azure_oauth_client_credentials_client_secret?: string

  /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
  readonly qradar_password?: string

  /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
  readonly solar_winds_token?: string

  /** Applicable only for destination type: new_relic. API key provided by New Relic. */
  readonly new_relic_api_key?: string

  /** Applicable only for destination type: datadog. API key provided by Datadog. */
  readonly datadog_api_key?: string

  /** SIEM HTTP Destination ID */
  getId(): number | null | undefined

  /** Name for this Destination */
  getName(): string | null | undefined

  /** Destination Type */
  getDestinationType(): 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible' | Files.OtherString | null | undefined

  /** Destination Url */
  getDestinationUrl(): string | null | undefined

  /** Applicable only for destination type: file. Destination folder path on Files.com. */
  getFileDestinationPath(): string | null | undefined

  /** Applicable only for destination type: file. Generated file format. */
  getFileFormat(): 'json' | 'csv' | Files.OtherString | null | undefined

  /** Applicable only for destination type: file. Interval, in minutes, between file deliveries. */
  getFileIntervalMinutes(): number | null | undefined

  /** Additional HTTP Headers included in calls to the destination URL */
  getAdditionalHeaders(): SiemHttpDestination.AdditionalHeaders | null | undefined

  /** Whether this SIEM HTTP Destination is currently being sent to or not */
  getSendingActive(): boolean | null | undefined

  /**
   * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array.
   * json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing
   * multiple log entries as JSON.
   */
  getGenericPayloadType(): 'json_newline' | 'json_array' | Files.OtherString | null | undefined

  /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
  getSplunkTokenMasked(): string | null | undefined

  /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
  getCrowdstrikeTokenMasked(): string | null | undefined

  /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
  getAzureDcrImmutableId(): string | null | undefined

  /**
   * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
   */
  getAzureStreamName(): string | null | undefined

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
  getAzureOauthClientCredentialsTenantId(): string | null | undefined

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
  getAzureOauthClientCredentialsClientId(): string | null | undefined

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client Secret. */
  getAzureOauthClientCredentialsClientSecretMasked(): string | null | undefined

  /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
  getQradarUsername(): string | null | undefined

  /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
  getQradarPasswordMasked(): string | null | undefined

  /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
  getSolarWindsTokenMasked(): string | null | undefined

  /** Applicable only for destination type: new_relic. API key provided by New Relic. */
  getNewRelicApiKeyMasked(): string | null | undefined

  /** Applicable only for destination type: datadog. API key provided by Datadog. */
  getDatadogApiKeyMasked(): string | null | undefined

  /** Whether or not sending is enabled for action logs. */
  getActionSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getActionEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for sftp_action logs. */
  getSftpActionSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getSftpActionEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for ftp_action logs. */
  getFtpActionSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getFtpActionEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for web_dav_action logs. */
  getWebDavActionSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getWebDavActionEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for sync logs. */
  getSyncSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getSyncEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for outbound_connection logs. */
  getOutboundConnectionSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getOutboundConnectionEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for automation logs. */
  getAutomationSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getAutomationEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for api_request logs. */
  getApiRequestSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getApiRequestEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for public_hosting_request logs. */
  getPublicHostingRequestSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getPublicHostingRequestEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for email logs. */
  getEmailSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getEmailEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for exavault_api_request logs. */
  getExavaultApiRequestSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getExavaultApiRequestEntriesSent(): number | null | undefined

  /** Whether or not sending is enabled for settings_change logs. */
  getSettingsChangeSendEnabled(): boolean | null | undefined

  /** Number of log entries sent for the lifetime of this destination. */
  getSettingsChangeEntriesSent(): number | null | undefined

  /** Type of URL that was last called. Can be `destination_url` or `azure_oauth_client_credentials_url` */
  getLastHttpCallTargetType(): 'destination_url' | 'azure_oauth_client_credentials_url' | 'file_destination' | Files.OtherString | null | undefined

  /** Was the last HTTP call made successful? */
  getLastHttpCallSuccess(): boolean | null | undefined

  /** Last HTTP Call Response Code */
  getLastHttpCallResponseCode(): number | null | undefined

  /** Last HTTP Call Response Body. Large responses are truncated. */
  getLastHttpCallResponseBody(): string | null | undefined

  /** Last HTTP Call Error Message if applicable */
  getLastHttpCallErrorMessage(): string | null | undefined

  /** Time of Last HTTP Call */
  getLastHttpCallTime(): string | null | undefined

  /** Duration of the last HTTP Call in milliseconds */
  getLastHttpCallDurationMs(): number | null | undefined

  /** Time of Most Recent Successful HTTP Call */
  getMostRecentHttpCallSuccessTime(): string | null | undefined

  /** Connection Test Entry */
  getConnectionTestEntry(): string | null | undefined

  /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
  getSplunkToken(): string | undefined

  /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
  getCrowdstrikeToken(): string | undefined

  /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
  getAzureOauthClientCredentialsClientSecret(): string | undefined

  /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
  getQradarPassword(): string | undefined

  /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
  getSolarWindsToken(): string | undefined

  /** Applicable only for destination type: new_relic. API key provided by New Relic. */
  getNewRelicApiKey(): string | undefined

  /** Applicable only for destination type: datadog. API key provided by Datadog. */
  getDatadogApiKey(): string | undefined

  /** SIEM HTTP Destination ID */
  setId(value: number): void

  /** Name for this Destination */
  setName(value: string): void

  /** Destination Type */
  setDestinationType(value: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible'): void

  /** Destination Url */
  setDestinationUrl(value: string): void

  /** Applicable only for destination type: file. Destination folder path on Files.com. */
  setFileDestinationPath(value: string): void

  /** Applicable only for destination type: file. Generated file format. */
  setFileFormat(value: 'json' | 'csv'): void

  /** Applicable only for destination type: file. Interval, in minutes, between file deliveries. */
  setFileIntervalMinutes(value: number): void

  /** Additional HTTP Headers included in calls to the destination URL */
  setAdditionalHeaders(value: SiemHttpDestination.AdditionalHeaders): void

  /** Whether this SIEM HTTP Destination is currently being sent to or not */
  setSendingActive(value: boolean): void

  /**
   * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or json_array.
   * json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array containing
   * multiple log entries as JSON.
   */
  setGenericPayloadType(value: 'json_newline' | 'json_array'): void

  /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
  setSplunkTokenMasked(value: string): void

  /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
  setCrowdstrikeTokenMasked(value: string): void

  /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
  setAzureDcrImmutableId(value: string): void

  /**
   * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
   */
  setAzureStreamName(value: string): void

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
  setAzureOauthClientCredentialsTenantId(value: string): void

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
  setAzureOauthClientCredentialsClientId(value: string): void

  /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client Secret. */
  setAzureOauthClientCredentialsClientSecretMasked(value: string): void

  /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
  setQradarUsername(value: string): void

  /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
  setQradarPasswordMasked(value: string): void

  /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
  setSolarWindsTokenMasked(value: string): void

  /** Applicable only for destination type: new_relic. API key provided by New Relic. */
  setNewRelicApiKeyMasked(value: string): void

  /** Applicable only for destination type: datadog. API key provided by Datadog. */
  setDatadogApiKeyMasked(value: string): void

  /** Whether or not sending is enabled for action logs. */
  setActionSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setActionEntriesSent(value: number): void

  /** Whether or not sending is enabled for sftp_action logs. */
  setSftpActionSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setSftpActionEntriesSent(value: number): void

  /** Whether or not sending is enabled for ftp_action logs. */
  setFtpActionSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setFtpActionEntriesSent(value: number): void

  /** Whether or not sending is enabled for web_dav_action logs. */
  setWebDavActionSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setWebDavActionEntriesSent(value: number): void

  /** Whether or not sending is enabled for sync logs. */
  setSyncSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setSyncEntriesSent(value: number): void

  /** Whether or not sending is enabled for outbound_connection logs. */
  setOutboundConnectionSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setOutboundConnectionEntriesSent(value: number): void

  /** Whether or not sending is enabled for automation logs. */
  setAutomationSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setAutomationEntriesSent(value: number): void

  /** Whether or not sending is enabled for api_request logs. */
  setApiRequestSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setApiRequestEntriesSent(value: number): void

  /** Whether or not sending is enabled for public_hosting_request logs. */
  setPublicHostingRequestSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setPublicHostingRequestEntriesSent(value: number): void

  /** Whether or not sending is enabled for email logs. */
  setEmailSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setEmailEntriesSent(value: number): void

  /** Whether or not sending is enabled for exavault_api_request logs. */
  setExavaultApiRequestSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setExavaultApiRequestEntriesSent(value: number): void

  /** Whether or not sending is enabled for settings_change logs. */
  setSettingsChangeSendEnabled(value: boolean): void

  /** Number of log entries sent for the lifetime of this destination. */
  setSettingsChangeEntriesSent(value: number): void

  /** Type of URL that was last called. Can be `destination_url` or `azure_oauth_client_credentials_url` */
  setLastHttpCallTargetType(value: 'destination_url' | 'azure_oauth_client_credentials_url' | 'file_destination' | Files.OtherString): void

  /** Was the last HTTP call made successful? */
  setLastHttpCallSuccess(value: boolean): void

  /** Last HTTP Call Response Code */
  setLastHttpCallResponseCode(value: number): void

  /** Last HTTP Call Response Body. Large responses are truncated. */
  setLastHttpCallResponseBody(value: string): void

  /** Last HTTP Call Error Message if applicable */
  setLastHttpCallErrorMessage(value: string): void

  /** Time of Last HTTP Call */
  setLastHttpCallTime(value: string): void

  /** Duration of the last HTTP Call in milliseconds */
  setLastHttpCallDurationMs(value: number): void

  /** Time of Most Recent Successful HTTP Call */
  setMostRecentHttpCallSuccessTime(value: string): void

  /** Connection Test Entry */
  setConnectionTestEntry(value: string): void

  /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
  setSplunkToken(value: string): void

  /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
  setCrowdstrikeToken(value: string): void

  /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
  setAzureOauthClientCredentialsClientSecret(value: string): void

  /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
  setQradarPassword(value: string): void

  /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
  setSolarWindsToken(value: string): void

  /** Applicable only for destination type: new_relic. API key provided by New Relic. */
  setNewRelicApiKey(value: string): void

  /** Applicable only for destination type: datadog. API key provided by Datadog. */
  setDatadogApiKey(value: string): void

  /** Update SIEM HTTP Destination */
  update(params?: SiemHttpDestination.UpdateParams): Promise<this>

  /** Delete SIEM HTTP Destination */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List SIEM HTTP Destinations */
  static list(params?: SiemHttpDestination.ListParams, options?: Files.RequestOptions): Promise<SiemHttpDestination[]>

  /** Alias of `list()`. */
  static all(params?: SiemHttpDestination.ListParams, options?: Files.RequestOptions): Promise<SiemHttpDestination[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: SiemHttpDestination.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<SiemHttpDestination>

  /**
   * Show SIEM HTTP Destination
   * @param id - Siem Http Destination ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SiemHttpDestination>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<SiemHttpDestination>

  /** Create SIEM HTTP Destination */
  static create(params: SiemHttpDestination.CreateParams, options?: Files.RequestOptions): Promise<SiemHttpDestination>

  /** send_test_entry SIEM HTTP Destination */
  static sendTestEntry(params?: SiemHttpDestination.SendTestEntryParams, options?: Files.RequestOptions): Promise<void>
}

declare namespace SiemHttpDestination {
  /** The fields of `SiemHttpDestination` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** SIEM HTTP Destination ID */
    id?: number | null

    /** Name for this Destination */
    name?: string | null

    /** Destination Type */
    destination_type?: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible' | Files.OtherString | null

    /** Destination Url */
    destination_url?: string | null

    /** Applicable only for destination type: file. Destination folder path on Files.com. */
    file_destination_path?: string | null

    /** Applicable only for destination type: file. Generated file format. */
    file_format?: 'json' | 'csv' | Files.OtherString | null

    /** Applicable only for destination type: file. Interval, in minutes, between file deliveries. */
    file_interval_minutes?: number | null

    /** Additional HTTP Headers included in calls to the destination URL */
    additional_headers?: SiemHttpDestination.AdditionalHeaders | null

    /** Whether this SIEM HTTP Destination is currently being sent to or not */
    sending_active?: boolean | null

    /**
     * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or
     * json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array
     * containing multiple log entries as JSON.
     */
    generic_payload_type?: 'json_newline' | 'json_array' | Files.OtherString | null

    /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
    splunk_token_masked?: string | null

    /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
    crowdstrike_token_masked?: string | null

    /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
    azure_dcr_immutable_id?: string | null

    /**
     * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
     */
    azure_stream_name?: string | null

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
    azure_oauth_client_credentials_tenant_id?: string | null

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
    azure_oauth_client_credentials_client_id?: string | null

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client Secret. */
    azure_oauth_client_credentials_client_secret_masked?: string | null

    /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
    qradar_username?: string | null

    /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
    qradar_password_masked?: string | null

    /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
    solar_winds_token_masked?: string | null

    /** Applicable only for destination type: new_relic. API key provided by New Relic. */
    new_relic_api_key_masked?: string | null

    /** Applicable only for destination type: datadog. API key provided by Datadog. */
    datadog_api_key_masked?: string | null

    /** Whether or not sending is enabled for action logs. */
    action_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    action_entries_sent?: number | null

    /** Whether or not sending is enabled for sftp_action logs. */
    sftp_action_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    sftp_action_entries_sent?: number | null

    /** Whether or not sending is enabled for ftp_action logs. */
    ftp_action_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    ftp_action_entries_sent?: number | null

    /** Whether or not sending is enabled for web_dav_action logs. */
    web_dav_action_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    web_dav_action_entries_sent?: number | null

    /** Whether or not sending is enabled for sync logs. */
    sync_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    sync_entries_sent?: number | null

    /** Whether or not sending is enabled for outbound_connection logs. */
    outbound_connection_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    outbound_connection_entries_sent?: number | null

    /** Whether or not sending is enabled for automation logs. */
    automation_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    automation_entries_sent?: number | null

    /** Whether or not sending is enabled for api_request logs. */
    api_request_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    api_request_entries_sent?: number | null

    /** Whether or not sending is enabled for public_hosting_request logs. */
    public_hosting_request_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    public_hosting_request_entries_sent?: number | null

    /** Whether or not sending is enabled for email logs. */
    email_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    email_entries_sent?: number | null

    /** Whether or not sending is enabled for exavault_api_request logs. */
    exavault_api_request_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    exavault_api_request_entries_sent?: number | null

    /** Whether or not sending is enabled for settings_change logs. */
    settings_change_send_enabled?: boolean | null

    /** Number of log entries sent for the lifetime of this destination. */
    settings_change_entries_sent?: number | null

    /** Type of URL that was last called. Can be `destination_url` or `azure_oauth_client_credentials_url` */
    last_http_call_target_type?: 'destination_url' | 'azure_oauth_client_credentials_url' | 'file_destination' | Files.OtherString | null

    /** Was the last HTTP call made successful? */
    last_http_call_success?: boolean | null

    /** Last HTTP Call Response Code */
    last_http_call_response_code?: number | null

    /** Last HTTP Call Response Body. Large responses are truncated. */
    last_http_call_response_body?: string | null

    /** Last HTTP Call Error Message if applicable */
    last_http_call_error_message?: string | null

    /** Time of Last HTTP Call */
    last_http_call_time?: string | null

    /** Duration of the last HTTP Call in milliseconds */
    last_http_call_duration_ms?: number | null

    /** Time of Most Recent Successful HTTP Call */
    most_recent_http_call_success_time?: string | null

    /** Connection Test Entry */
    connection_test_entry?: string | null

    /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
    splunk_token?: string

    /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
    crowdstrike_token?: string

    /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
    azure_oauth_client_credentials_client_secret?: string

    /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
    qradar_password?: string

    /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
    solar_winds_token?: string

    /** Applicable only for destination type: new_relic. API key provided by New Relic. */
    new_relic_api_key?: string

    /** Applicable only for destination type: datadog. API key provided by Datadog. */
    datadog_api_key?: string
  }

  interface ListParams {
    /**
     * Used for pagination. When a list request has more records available, cursors are provided in the response headers
     * `X-Files-Cursor-Next` and `X-Files-Cursor-Prev`. Send one of those cursor value here to resume an existing list
     * from the next available record. Note: many of our SDKs have iterator methods that will automatically handle
     * cursor-based pagination.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number
  }

  interface CreateParams {
    /** Name for this Destination */
    name?: string

    /** Additional HTTP Headers included in calls to the destination URL */
    additional_headers?: SiemHttpDestination.AdditionalHeaders

    /** Whether this SIEM HTTP Destination is currently being sent to or not */
    sending_active?: boolean

    /**
     * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or
     * json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array
     * containing multiple log entries as JSON.
     */
    generic_payload_type?: 'json_newline' | 'json_array'

    /** Applicable only for destination type: file. Destination folder path on Files.com. */
    file_destination_path?: string

    /** Applicable only for destination type: file. Generated file format. */
    file_format?: 'json' | 'csv'

    /**
     * Applicable only for destination type: file. Interval, in minutes, between file deliveries. Valid values are 5,
     * 10, 15, 20, 30, 60, 90, 180, 240, 360.
     */
    file_interval_minutes?: number

    /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
    splunk_token?: string

    /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
    crowdstrike_token?: string

    /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
    azure_dcr_immutable_id?: string

    /**
     * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
     */
    azure_stream_name?: string

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
    azure_oauth_client_credentials_tenant_id?: string

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
    azure_oauth_client_credentials_client_id?: string

    /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
    azure_oauth_client_credentials_client_secret?: string

    /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
    qradar_username?: string

    /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
    qradar_password?: string

    /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
    solar_winds_token?: string

    /** Applicable only for destination type: new_relic. API key provided by New Relic. */
    new_relic_api_key?: string

    /** Applicable only for destination type: datadog. API key provided by Datadog. */
    datadog_api_key?: string

    /** Whether or not sending is enabled for action logs. */
    action_send_enabled?: boolean

    /** Whether or not sending is enabled for sftp_action logs. */
    sftp_action_send_enabled?: boolean

    /** Whether or not sending is enabled for ftp_action logs. */
    ftp_action_send_enabled?: boolean

    /** Whether or not sending is enabled for web_dav_action logs. */
    web_dav_action_send_enabled?: boolean

    /** Whether or not sending is enabled for sync logs. */
    sync_send_enabled?: boolean

    /** Whether or not sending is enabled for outbound_connection logs. */
    outbound_connection_send_enabled?: boolean

    /** Whether or not sending is enabled for automation logs. */
    automation_send_enabled?: boolean

    /** Whether or not sending is enabled for api_request logs. */
    api_request_send_enabled?: boolean

    /** Whether or not sending is enabled for public_hosting_request logs. */
    public_hosting_request_send_enabled?: boolean

    /** Whether or not sending is enabled for email logs. */
    email_send_enabled?: boolean

    /** Whether or not sending is enabled for exavault_api_request logs. */
    exavault_api_request_send_enabled?: boolean

    /** Whether or not sending is enabled for settings_change logs. */
    settings_change_send_enabled?: boolean

    /** Destination Type */
    destination_type: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible'

    /** Destination Url */
    destination_url?: string
  }

  interface SendTestEntryParams {
    /** SIEM HTTP Destination ID */
    siem_http_destination_id?: number

    /** Destination Type */
    destination_type?: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible'

    /** Destination Url */
    destination_url?: string

    /** Name for this Destination */
    name?: string

    /** Additional HTTP Headers included in calls to the destination URL */
    additional_headers?: SiemHttpDestination.AdditionalHeaders

    /** Whether this SIEM HTTP Destination is currently being sent to or not */
    sending_active?: boolean

    /**
     * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or
     * json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array
     * containing multiple log entries as JSON.
     */
    generic_payload_type?: 'json_newline' | 'json_array'

    /** Applicable only for destination type: file. Destination folder path on Files.com. */
    file_destination_path?: string

    /** Applicable only for destination type: file. Generated file format. */
    file_format?: 'json' | 'csv'

    /**
     * Applicable only for destination type: file. Interval, in minutes, between file deliveries. Valid values are 5,
     * 10, 15, 20, 30, 60, 90, 180, 240, 360.
     */
    file_interval_minutes?: number

    /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
    splunk_token?: string

    /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
    crowdstrike_token?: string

    /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
    azure_dcr_immutable_id?: string

    /**
     * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
     */
    azure_stream_name?: string

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
    azure_oauth_client_credentials_tenant_id?: string

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
    azure_oauth_client_credentials_client_id?: string

    /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
    azure_oauth_client_credentials_client_secret?: string

    /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
    qradar_username?: string

    /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
    qradar_password?: string

    /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
    solar_winds_token?: string

    /** Applicable only for destination type: new_relic. API key provided by New Relic. */
    new_relic_api_key?: string

    /** Applicable only for destination type: datadog. API key provided by Datadog. */
    datadog_api_key?: string

    /** Whether or not sending is enabled for action logs. */
    action_send_enabled?: boolean

    /** Whether or not sending is enabled for sftp_action logs. */
    sftp_action_send_enabled?: boolean

    /** Whether or not sending is enabled for ftp_action logs. */
    ftp_action_send_enabled?: boolean

    /** Whether or not sending is enabled for web_dav_action logs. */
    web_dav_action_send_enabled?: boolean

    /** Whether or not sending is enabled for sync logs. */
    sync_send_enabled?: boolean

    /** Whether or not sending is enabled for outbound_connection logs. */
    outbound_connection_send_enabled?: boolean

    /** Whether or not sending is enabled for automation logs. */
    automation_send_enabled?: boolean

    /** Whether or not sending is enabled for api_request logs. */
    api_request_send_enabled?: boolean

    /** Whether or not sending is enabled for public_hosting_request logs. */
    public_hosting_request_send_enabled?: boolean

    /** Whether or not sending is enabled for email logs. */
    email_send_enabled?: boolean

    /** Whether or not sending is enabled for exavault_api_request logs. */
    exavault_api_request_send_enabled?: boolean

    /** Whether or not sending is enabled for settings_change logs. */
    settings_change_send_enabled?: boolean
  }

  interface UpdateParams {
    /** Name for this Destination */
    name?: string

    /** Additional HTTP Headers included in calls to the destination URL */
    additional_headers?: SiemHttpDestination.AdditionalHeaders

    /** Whether this SIEM HTTP Destination is currently being sent to or not */
    sending_active?: boolean

    /**
     * Applicable only for destination type: generic. Indicates the type of HTTP body. Can be json_newline or
     * json_array. json_newline is multiple log entries as JSON separated by newlines. json_array is a single JSON array
     * containing multiple log entries as JSON.
     */
    generic_payload_type?: 'json_newline' | 'json_array'

    /** Applicable only for destination type: file. Destination folder path on Files.com. */
    file_destination_path?: string

    /** Applicable only for destination type: file. Generated file format. */
    file_format?: 'json' | 'csv'

    /**
     * Applicable only for destination type: file. Interval, in minutes, between file deliveries. Valid values are 5,
     * 10, 15, 20, 30, 60, 90, 180, 240, 360.
     */
    file_interval_minutes?: number

    /** Applicable only for destination types: splunk, splunk_compatible. Authentication token for the destination. */
    splunk_token?: string

    /** Applicable only for destination type: crowdstrike. Authentication token provided by Crowdstrike. */
    crowdstrike_token?: string

    /** Applicable only for destination types: azure, azure_legacy. Immutable ID of the Data Collection Rule. */
    azure_dcr_immutable_id?: string

    /**
     * Applicable only for destination type: azure. Name of the stream in the DCR that represents the destination table.
     */
    azure_stream_name?: string

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Tenant ID. */
    azure_oauth_client_credentials_tenant_id?: string

    /** Applicable only for destination types: azure, azure_legacy. Client Credentials OAuth Client ID. */
    azure_oauth_client_credentials_client_id?: string

    /** Applicable only for destination type: azure. Client Credentials OAuth Client Secret. */
    azure_oauth_client_credentials_client_secret?: string

    /** Applicable only for destination type: qradar. Basic auth username provided by QRadar. */
    qradar_username?: string

    /** Applicable only for destination type: qradar. Basic auth password provided by QRadar. */
    qradar_password?: string

    /** Applicable only for destination type: solar_winds. Authentication token provided by Solar Winds. */
    solar_winds_token?: string

    /** Applicable only for destination type: new_relic. API key provided by New Relic. */
    new_relic_api_key?: string

    /** Applicable only for destination type: datadog. API key provided by Datadog. */
    datadog_api_key?: string

    /** Whether or not sending is enabled for action logs. */
    action_send_enabled?: boolean

    /** Whether or not sending is enabled for sftp_action logs. */
    sftp_action_send_enabled?: boolean

    /** Whether or not sending is enabled for ftp_action logs. */
    ftp_action_send_enabled?: boolean

    /** Whether or not sending is enabled for web_dav_action logs. */
    web_dav_action_send_enabled?: boolean

    /** Whether or not sending is enabled for sync logs. */
    sync_send_enabled?: boolean

    /** Whether or not sending is enabled for outbound_connection logs. */
    outbound_connection_send_enabled?: boolean

    /** Whether or not sending is enabled for automation logs. */
    automation_send_enabled?: boolean

    /** Whether or not sending is enabled for api_request logs. */
    api_request_send_enabled?: boolean

    /** Whether or not sending is enabled for public_hosting_request logs. */
    public_hosting_request_send_enabled?: boolean

    /** Whether or not sending is enabled for email logs. */
    email_send_enabled?: boolean

    /** Whether or not sending is enabled for exavault_api_request logs. */
    exavault_api_request_send_enabled?: boolean

    /** Whether or not sending is enabled for settings_change logs. */
    settings_change_send_enabled?: boolean

    /** Destination Type */
    destination_type?: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible'

    /** Destination Url */
    destination_url?: string
  }

  /** Additional HTTP Headers included in calls to the destination URL */
  type AdditionalHeaders = {
    [key: string]: string
  }
}

export default SiemHttpDestination
