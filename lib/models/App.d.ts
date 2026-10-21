import Files = require('../Files')

/** An App represents one of the various integrations provided by Files.com. */
declare class App {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: App.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: App.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** The type of the App */
  readonly app_type?: 'sdk' | 'sso' | 'remote_server' | 'folder_behavior' | 'client_app' | 'app_integration' | 'siem' | Files.OtherString | null

  /** Collection of named links to documentation */
  readonly documentation_links?: Files.JsonObject | null

  /** Long description for the in-App landing page */
  readonly extended_description?: string | null

  /** Long form description of the App */
  readonly extended_description_for_marketing_site?: string | null

  /** Link to external homepage */
  readonly external_homepage_url?: string | null

  /** Is featured on the App listing? */
  readonly featured?: boolean | null

  /** Associated Folder Behavior type, if any */
  readonly folder_behavior_type?: 'webhook' | 'file_expiration' | 'auto_encrypt' | 'lock_subfolders' | 'storage_region' | 'serve_publicly' | 'create_user_folders' | 'inbox' | 'limit_file_extensions' | 'limit_file_regex' | 'amazon_sns' | 'watermark' | 'remote_server_mount' | 'slack_webhook' | 'auto_decrypt' | 'override_upload_filename' | 'permission_fence' | 'limit_filename_length' | 'organize_files_into_subfolders' | 'teams_webhook' | 'google_pub_sub' | 'archive_overwritten_or_deleted_files' | 'auto_recrypt' | 'metadata_category' | 'auto_unzip' | 'remote_server_metadata_index' | 'malware_scanning' | Files.OtherString | null

  /** App icon */
  readonly icon_url?: string | null

  /** Logo thumbnail for the App */
  readonly logo_thumbnail_url?: string | null

  /** Full size logo for the App */
  readonly logo_url?: string | null

  /** Marketing introdution of the App */
  readonly marketing_intro?: string | null

  /** Marketing video page */
  readonly marketing_youtube_url?: string | null

  /** Name of the App */
  readonly name?: string | null

  /** Package manager install command */
  readonly package_manager_install_command?: string | null

  /** Associated Remote Server type, if any */
  readonly remote_server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

  /** Screenshots of the App */
  readonly screenshot_list_urls?: string[] | null

  /** Link to SDK installation instructions */
  readonly sdk_installation_instructions_link?: string | null

  /** Short description of the App */
  readonly short_description?: string | null

  /** Associated SSO Strategy type, if any */
  readonly sso_strategy_type?: 'google' | 'auth0' | 'okta' | 'azure' | 'box' | 'dropbox' | 'slack' | 'onelogin' | 'saml' | 'idaptive' | 'ldap' | 'scim' | 'jumpcloud' | 'duo' | Files.OtherString | null

  /** Associated SIEM type, if any */
  readonly siem_type?: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible' | Files.OtherString | null

  /** Tutorial video page */
  readonly tutorial_youtube_url?: string | null

  /** The type of the App */
  getAppType(): 'sdk' | 'sso' | 'remote_server' | 'folder_behavior' | 'client_app' | 'app_integration' | 'siem' | Files.OtherString | null | undefined

  /** Collection of named links to documentation */
  getDocumentationLinks(): Files.JsonObject | null | undefined

  /** Long description for the in-App landing page */
  getExtendedDescription(): string | null | undefined

  /** Long form description of the App */
  getExtendedDescriptionForMarketingSite(): string | null | undefined

  /** Link to external homepage */
  getExternalHomepageUrl(): string | null | undefined

  /** Is featured on the App listing? */
  getFeatured(): boolean | null | undefined

  /** Associated Folder Behavior type, if any */
  getFolderBehaviorType(): 'webhook' | 'file_expiration' | 'auto_encrypt' | 'lock_subfolders' | 'storage_region' | 'serve_publicly' | 'create_user_folders' | 'inbox' | 'limit_file_extensions' | 'limit_file_regex' | 'amazon_sns' | 'watermark' | 'remote_server_mount' | 'slack_webhook' | 'auto_decrypt' | 'override_upload_filename' | 'permission_fence' | 'limit_filename_length' | 'organize_files_into_subfolders' | 'teams_webhook' | 'google_pub_sub' | 'archive_overwritten_or_deleted_files' | 'auto_recrypt' | 'metadata_category' | 'auto_unzip' | 'remote_server_metadata_index' | 'malware_scanning' | Files.OtherString | null | undefined

  /** App icon */
  getIconUrl(): string | null | undefined

  /** Logo thumbnail for the App */
  getLogoThumbnailUrl(): string | null | undefined

  /** Full size logo for the App */
  getLogoUrl(): string | null | undefined

  /** Marketing introdution of the App */
  getMarketingIntro(): string | null | undefined

  /** Marketing video page */
  getMarketingYoutubeUrl(): string | null | undefined

  /** Name of the App */
  getName(): string | null | undefined

  /** Package manager install command */
  getPackageManagerInstallCommand(): string | null | undefined

  /** Associated Remote Server type, if any */
  getRemoteServerType(): 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null | undefined

  /** Screenshots of the App */
  getScreenshotListUrls(): string[] | null | undefined

  /** Link to SDK installation instructions */
  getSdkInstallationInstructionsLink(): string | null | undefined

  /** Short description of the App */
  getShortDescription(): string | null | undefined

  /** Associated SSO Strategy type, if any */
  getSsoStrategyType(): 'google' | 'auth0' | 'okta' | 'azure' | 'box' | 'dropbox' | 'slack' | 'onelogin' | 'saml' | 'idaptive' | 'ldap' | 'scim' | 'jumpcloud' | 'duo' | Files.OtherString | null | undefined

  /** Associated SIEM type, if any */
  getSiemType(): 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible' | Files.OtherString | null | undefined

  /** Tutorial video page */
  getTutorialYoutubeUrl(): string | null | undefined

  /** List Apps */
  static list(params?: App.ListParams, options?: Files.RequestOptions): Promise<App[]>

  /** Alias of `list()`. */
  static all(params?: App.ListParams, options?: Files.RequestOptions): Promise<App[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: App.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<App>

  static default: typeof App
}

declare namespace App {
  /** The fields of `App` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** The type of the App */
    app_type?: 'sdk' | 'sso' | 'remote_server' | 'folder_behavior' | 'client_app' | 'app_integration' | 'siem' | Files.OtherString | null

    /** Collection of named links to documentation */
    documentation_links?: Files.JsonObject | null

    /** Long description for the in-App landing page */
    extended_description?: string | null

    /** Long form description of the App */
    extended_description_for_marketing_site?: string | null

    /** Link to external homepage */
    external_homepage_url?: string | null

    /** Is featured on the App listing? */
    featured?: boolean | null

    /** Associated Folder Behavior type, if any */
    folder_behavior_type?: 'webhook' | 'file_expiration' | 'auto_encrypt' | 'lock_subfolders' | 'storage_region' | 'serve_publicly' | 'create_user_folders' | 'inbox' | 'limit_file_extensions' | 'limit_file_regex' | 'amazon_sns' | 'watermark' | 'remote_server_mount' | 'slack_webhook' | 'auto_decrypt' | 'override_upload_filename' | 'permission_fence' | 'limit_filename_length' | 'organize_files_into_subfolders' | 'teams_webhook' | 'google_pub_sub' | 'archive_overwritten_or_deleted_files' | 'auto_recrypt' | 'metadata_category' | 'auto_unzip' | 'remote_server_metadata_index' | 'malware_scanning' | Files.OtherString | null

    /** App icon */
    icon_url?: string | null

    /** Logo thumbnail for the App */
    logo_thumbnail_url?: string | null

    /** Full size logo for the App */
    logo_url?: string | null

    /** Marketing introdution of the App */
    marketing_intro?: string | null

    /** Marketing video page */
    marketing_youtube_url?: string | null

    /** Name of the App */
    name?: string | null

    /** Package manager install command */
    package_manager_install_command?: string | null

    /** Associated Remote Server type, if any */
    remote_server_type?: 'ftp' | 'sftp' | 's3' | 'google_cloud_storage' | 'webdav' | 'wasabi' | 'backblaze_b2' | 'one_drive' | 'box' | 'dropbox' | 'google_drive' | 'azure' | 'sharepoint' | 's3_compatible' | 'azure_files' | 'files_agent' | 'filebase' | 'cloudflare' | 'linode' | 'files_com' | Files.OtherString | null

    /** Screenshots of the App */
    screenshot_list_urls?: string[] | null

    /** Link to SDK installation instructions */
    sdk_installation_instructions_link?: string | null

    /** Short description of the App */
    short_description?: string | null

    /** Associated SSO Strategy type, if any */
    sso_strategy_type?: 'google' | 'auth0' | 'okta' | 'azure' | 'box' | 'dropbox' | 'slack' | 'onelogin' | 'saml' | 'idaptive' | 'ldap' | 'scim' | 'jumpcloud' | 'duo' | Files.OtherString | null

    /** Associated SIEM type, if any */
    siem_type?: 'generic' | 'splunk' | 'azure_legacy' | 'qradar' | 'sumo' | 'rapid7' | 'solar_winds' | 'new_relic' | 'datadog' | 'azure' | 'file' | 'crowdstrike' | 'splunk_compatible' | Files.OtherString | null

    /** Tutorial video page */
    tutorial_youtube_url?: string | null
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

    /**
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `name` and
     * `app_type`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `name` and
     * `app_type`. Valid field combinations are `[ name, app_type ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`. */
    filter_prefix?: Files.JsonObject
  }
}

export = App
