import Files = require('../Files')
import Automation = require('./Automation')

/** An AutomationVersion is an immutable revision of an Automation v2 graph. */
declare class AutomationVersion {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: AutomationVersion.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: AutomationVersion.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Automation revision ID. */
  readonly id?: number | null

  /** ID of the Automation that owns this revision. */
  readonly automation_id?: number | null

  /** Workspace that owns the Automation. Zero is the Default Workspace. */
  readonly workspace_id?: number | null

  /** Revision number within the Automation. */
  readonly version?: number | null

  /** Time the revision was saved. */
  readonly created_at?: Files.DateTimeString | null

  /** ID of the user who saved the revision, when available. */
  readonly user_id?: number | null

  /** Username recorded when the revision was saved, when available. */
  readonly username?: string | null

  /** ID of the API key used to save the revision, when available. */
  readonly api_key_id?: number | null

  /** Saved Automation v2 graph definition. Included when retrieving a single revision. */
  readonly definition?: AutomationVersion.Definition | null

  /** Normalized application action metadata keyed by pinned action fingerprint. */
  readonly application_actions?: Files.JsonObject | null

  /** Automation revision ID. */
  getId(): number | null | undefined

  /** ID of the Automation that owns this revision. */
  getAutomationId(): number | null | undefined

  /** Workspace that owns the Automation. Zero is the Default Workspace. */
  getWorkspaceId(): number | null | undefined

  /** Revision number within the Automation. */
  getVersion(): number | null | undefined

  /** Time the revision was saved. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** ID of the user who saved the revision, when available. */
  getUserId(): number | null | undefined

  /** Username recorded when the revision was saved, when available. */
  getUsername(): string | null | undefined

  /** ID of the API key used to save the revision, when available. */
  getApiKeyId(): number | null | undefined

  /** Saved Automation v2 graph definition. Included when retrieving a single revision. */
  getDefinition(): AutomationVersion.Definition | null | undefined

  /** Normalized application action metadata keyed by pinned action fingerprint. */
  getApplicationActions(): Files.JsonObject | null | undefined

  /** Restore an Automation v2 definition as a new current version */
  restore(params?: Files.NoParams): Promise<Automation>

  /** List Automation Versions */
  static list(params: AutomationVersion.ListParams, options?: Files.RequestOptions): Promise<AutomationVersion[]>

  /** Alias of `list()`. */
  static all(params: AutomationVersion.ListParams, options?: Files.RequestOptions): Promise<AutomationVersion[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params: AutomationVersion.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<AutomationVersion>

  /**
   * Show Automation Version
   * @param id - Automation Version ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AutomationVersion>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<AutomationVersion>

  static default: typeof AutomationVersion
}

declare namespace AutomationVersion {
  /** The fields of `AutomationVersion` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Automation revision ID. */
    id?: number | null

    /** ID of the Automation that owns this revision. */
    automation_id?: number | null

    /** Workspace that owns the Automation. Zero is the Default Workspace. */
    workspace_id?: number | null

    /** Revision number within the Automation. */
    version?: number | null

    /** Time the revision was saved. */
    created_at?: Files.DateTimeString | null

    /** ID of the user who saved the revision, when available. */
    user_id?: number | null

    /** Username recorded when the revision was saved, when available. */
    username?: string | null

    /** ID of the API key used to save the revision, when available. */
    api_key_id?: number | null

    /** Saved Automation v2 graph definition. Included when retrieving a single revision. */
    definition?: AutomationVersion.Definition | null

    /** Normalized application action metadata keyed by pinned action fingerprint. */
    application_actions?: Files.JsonObject | null
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

    /** If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are . */
    sort_by?: Files.JsonObject

    /** ID of the Automation that owns this revision. */
    automation_id: number
  }

  /** Automation v2 workflow graph. Nodes define triggers, actions, and control flow; edges connect node IDs. */
  interface Definition {
    /** Automation definition schema version. */
    schema_version: 1

    /**
     * Flat list of nodes. Every node requires a unique id and a type, accepts the node-specific config fields
     * documented below, and action or control-flow nodes may set return to true to include their output in the
     * Automation result.
     */
    nodes: AutomationVersion.Definition.Node[]

    /** Directed connections between nodes. */
    edges: AutomationVersion.Definition.Edge[]
  }

  namespace Definition {
    /** Node ID or named input. */
    type Slug = string

    /** Case-sensitive output name. Use 1-64 letters, numbers, underscores, or hyphens. */
    type OutputName = string

    /**
     * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{ fts }}
     * supplies one file or folder name; {{{ fts }}} supplies a path fragment.
     */
    type TemplateString = string

    /** A bare Files TransformScript expression, no braces. */
    type FtsExpression = string

    /** One or more destination path templates. */
    type Destinations = AutomationVersion.Definition.TemplateString[]

    /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
    type OnError = Array<{
      /**
       * A typed error family (not-found, processing-failure, service-unavailable), family/specific-error, or * for all.
       */
      error: string

      action: 'continue' | 'propagate'
    }>

    interface Edge {
      /** Source node ID. */
      from: AutomationVersion.Definition.Slug

      /** Destination node ID. */
      to: AutomationVersion.Definition.Slug

      /** Named source output. Omit for the main output. */
      output?: AutomationVersion.Definition.OutputName

      /** Named destination input. Omit for the main input. */
      input?: AutomationVersion.Definition.Slug
    }

    type Node =
      | AutomationVersion.Definition.NodeTriggerScheduled
      | AutomationVersion.Definition.NodeTriggerManual
      | AutomationVersion.Definition.NodeTriggerShared
      | AutomationVersion.Definition.NodeTriggerAction
      | AutomationVersion.Definition.NodeTriggerFolderCreation
      | AutomationVersion.Definition.NodeTriggerWebhook
      | AutomationVersion.Definition.NodeTriggerEmail
      | AutomationVersion.Definition.NodeCreateFolder
      | AutomationVersion.Definition.NodeCreateUser
      | AutomationVersion.Definition.NodeCreateGroup
      | AutomationVersion.Definition.NodeAddUserToGroup
      | AutomationVersion.Definition.NodeCreatePermission
      | AutomationVersion.Definition.NodeCreateShareLink
      | AutomationVersion.Definition.NodeCopyFile
      | AutomationVersion.Definition.NodeMoveFile
      | AutomationVersion.Definition.NodeDeleteFile
      | AutomationVersion.Definition.NodeImportFile
      | AutomationVersion.Definition.NodeImportIntoDatabase
      | AutomationVersion.Definition.NodeRunSync
      | AutomationVersion.Definition.NodeAs2Send
      | AutomationVersion.Definition.NodeSendEmail
      | AutomationVersion.Definition.NodeSendChatMessage
      | AutomationVersion.Definition.NodeSendWebhook
      | AutomationVersion.Definition.NodeHttpRequest
      | AutomationVersion.Definition.NodeApplicationAction
      | AutomationVersion.Definition.NodePublishAmazonSns
      | AutomationVersion.Definition.NodePublishAmazonSqs
      | AutomationVersion.Definition.NodePublishGooglePubsub
      | AutomationVersion.Definition.NodePublishAzureServiceBus
      | AutomationVersion.Definition.NodeAgentCompute
      | AutomationVersion.Definition.NodeSetMetadata
      | AutomationVersion.Definition.NodeExtract
      | AutomationVersion.Definition.NodeDocumentConvert
      | AutomationVersion.Definition.NodeImageConvert
      | AutomationVersion.Definition.NodeZip
      | AutomationVersion.Definition.NodeUnzip
      | AutomationVersion.Definition.NodeGpgEncrypt
      | AutomationVersion.Definition.NodeGpgDecrypt
      | AutomationVersion.Definition.NodeIf
      | AutomationVersion.Definition.NodeSwitch
      | AutomationVersion.Definition.NodeFilter
      | AutomationVersion.Definition.NodeForEach
      | AutomationVersion.Definition.NodeJoin
      | AutomationVersion.Definition.NodeAggregate
      | AutomationVersion.Definition.NodeWait
      | AutomationVersion.Definition.NodeTransform
      | AutomationVersion.Definition.NodeRunAutomation

    /** Trigger scheduled node */
    interface NodeTriggerScheduled {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_scheduled'

      /** Configuration fields for this node type. */
      config?: {
        interval?: 'week' | 'month' | 'quarter' | 'year' | 'day' | 'week_end' | 'month_end' | 'quarter_end' | 'year_end'

        recurring_day?: number

        recurring_days?: number[]

        schedule_id?: number

        schedule_days_of_week?: number[]

        schedule_interval_minutes?: number

        schedule_times_of_day?: string[]

        schedule_time_zone?: string

        holiday_region?: string

        path?: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        source?: AutomationVersion.Definition.TemplateString

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger manual node */
    interface NodeTriggerManual {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_manual'

      /** Configuration fields for this node type. */
      config?: {
        path?: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        source?: AutomationVersion.Definition.TemplateString

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger shared node */
    interface NodeTriggerShared {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_shared'

      /** Configuration fields for this node type. */
      config?: {
        form_field_set_id?: number
      }
    }

    /** Trigger action node */
    interface NodeTriggerAction {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_action'

      /** Configuration fields for this node type. */
      config: {
        /** @defaultValue 'file' */
        kind?: 'file' | 'data'

        trigger_actions: Array<'create' | 'read' | 'update' | 'destroy' | 'move' | 'copy' | 'archived_delete'>

        path?: string

        source?: string

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Trigger folder creation node */
    interface NodeTriggerFolderCreation {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_folder_creation'

      /** Configuration fields for this node type. */
      config?: {
        path?: string
        source?: string
        exclude_pattern?: string
        path_time_zone?: string
      }
    }

    /** Trigger webhook node */
    interface NodeTriggerWebhook {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_webhook'

      /** Configuration fields for this node type. */
      config?: {
        path?: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        source?: AutomationVersion.Definition.TemplateString

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string

        /** @defaultValue false */
        upload_file?: boolean

        destination?: string

        bearer_token_sha256?: string

        allowed_ips?: string[]
      }
    }

    /** Trigger email node */
    interface NodeTriggerEmail {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'trigger_email'

      /** Configuration fields for this node type. */
      config?: {
        allowed_senders?: string[]

        /** @defaultValue false */
        save_body?: boolean

        /** @defaultValue false */
        save_html_body?: boolean

        /** @defaultValue false */
        save_raw_message?: boolean

        source?: string

        limit?: number

        exclude_pattern?: string

        path_time_zone?: string
      }
    }

    /** Create folder node */
    interface NodeCreateFolder {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'create_folder'

      /** Configuration fields for this node type. */
      config: {
        /** One or more destination path templates. */
        destinations: AutomationVersion.Definition.Destinations

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Create user node */
    interface NodeCreateUser {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'create_user'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        username: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        email: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        name?: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        company?: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        notes?: AutomationVersion.Definition.TemplateString

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Create group node */
    interface NodeCreateGroup {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'create_group'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        name: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        notes?: AutomationVersion.Definition.TemplateString

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Add user to group node */
    interface NodeAddUserToGroup {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'add_user_to_group'

      /** Configuration fields for this node type. */
      config?: {
        user_id?: number

        /** A bare Files TransformScript expression, no braces. */
        user_id_expression?: AutomationVersion.Definition.FtsExpression

        group_id?: number

        /** A bare Files TransformScript expression, no braces. */
        group_id_expression?: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Create permission node */
    interface NodeCreatePermission {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'create_permission'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        folder_path?: AutomationVersion.Definition.TemplateString

        user_id?: number

        /** A bare Files TransformScript expression, no braces. */
        user_id_expression?: AutomationVersion.Definition.FtsExpression

        group_id?: number

        /** A bare Files TransformScript expression, no braces. */
        group_id_expression?: AutomationVersion.Definition.FtsExpression

        permission: 'readonly' | 'writeonly' | 'list' | 'history' | 'previewonly' | 'bundle' | 'full' | 'admin'

        /** @defaultValue true */
        recursive?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Create share link node */
    interface NodeCreateShareLink {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'create_share_link'

      /** Configuration fields for this node type. */
      config?: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        description?: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        internal_name?: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        note?: AutomationVersion.Definition.TemplateString

        /** @defaultValue 'read' */
        permissions?: 'read' | 'preview_only'

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        expires_at?: AutomationVersion.Definition.TemplateString

        expires_in_minutes?: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        start_access_on_date?: AutomationVersion.Definition.TemplateString

        max_uses?: number

        password_secret_id?: number

        clickwrap_id?: number

        require_registration?: boolean

        require_share_recipient?: boolean

        send_one_time_password_to_recipient_at_registration?: boolean

        recipients?: AutomationVersion.Definition.TemplateString[]

        /** A bare Files TransformScript expression, no braces. */
        recipients_expression?: AutomationVersion.Definition.FtsExpression

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        recipient_note?: AutomationVersion.Definition.TemplateString

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Copy file node */
    interface NodeCopyFile {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'copy_file'

      /** Configuration fields for this node type. */
      config?: {
        /** One or more destination path templates. */
        destinations?: AutomationVersion.Definition.Destinations

        destination_replace_from?: string

        destination_replace_to?: string

        overwrite_files?: boolean

        always_overwrite_size_matching_files?: boolean

        flatten_destination_structure?: boolean

        exclude_pattern?: string

        ignore_locked_folders?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Move file node */
    interface NodeMoveFile {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'move_file'

      /** Configuration fields for this node type. */
      config?: {
        /** One or more destination path templates. */
        destinations?: AutomationVersion.Definition.Destinations

        destination_replace_from?: string

        destination_replace_to?: string

        overwrite_files?: boolean

        flatten_destination_structure?: boolean

        exclude_pattern?: string

        ignore_locked_folders?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Delete file node */
    interface NodeDeleteFile {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'delete_file'

      /** Configuration fields for this node type. */
      config?: {
        exclude_pattern?: string

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Import file node */
    interface NodeImportFile {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'import_file'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        url: AutomationVersion.Definition.TemplateString

        /** One or more destination path templates. */
        destinations?: AutomationVersion.Definition.Destinations

        /** @defaultValue 'get' */
        method?: 'get' | 'post'

        headers?: {
          [key: string]: AutomationVersion.Definition.TemplateString
        }

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        content?: AutomationVersion.Definition.TemplateString

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Import into database node */
    interface NodeImportIntoDatabase {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'import_into_database'

      /** Configuration fields for this node type. */
      config: {
        database_destination_id: number

        /**
         * A bare Files TransformScript expression, no braces.
         * @defaultValue 'payload'
         */
        rows?: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Run sync node */
    interface NodeRunSync {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'run_sync'

      /** Configuration fields for this node type. */
      config: {
        sync_ids: number[]

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** As2 send node */
    interface NodeAs2Send {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'as2_send'

      /** Configuration fields for this node type. */
      config: {
        as2_station_id: number

        as2_partner_id: number

        /** @defaultValue 'AS2 EDI Transaction' */
        as2_subject?: string

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Send email node */
    interface NodeSendEmail {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'send_email'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        from?: AutomationVersion.Definition.TemplateString

        to: AutomationVersion.Definition.TemplateString[]

        cc?: AutomationVersion.Definition.TemplateString[]

        bcc?: AutomationVersion.Definition.TemplateString[]

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        subject?: AutomationVersion.Definition.TemplateString

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        body?: AutomationVersion.Definition.TemplateString

        attachments?: AutomationVersion.Definition.TemplateString[]

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Send chat message node */
    interface NodeSendChatMessage {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'send_chat_message'

      /** Configuration fields for this node type. */
      config: {
        provider: 'slack' | 'teams'

        webhook_url_secret_id: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        message: AutomationVersion.Definition.TemplateString

        channel?: string

        username?: string

        icon_emoji?: string

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Send webhook node */
    interface NodeSendWebhook {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'send_webhook'

      /** Configuration fields for this node type. */
      config: {
        url?: string

        url_secret_id?: number

        headers_secret_id?: number

        signing_secret_id?: number

        /** A bare Files TransformScript expression, no braces. */
        payload: AutomationVersion.Definition.FtsExpression

        /** @defaultValue false */
        use_dedicated_ips?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Http request node */
    interface NodeHttpRequest {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'http_request'

      /** Configuration fields for this node type. */
      config: {
        /** @defaultValue 'get' */
        method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options'

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        url: AutomationVersion.Definition.TemplateString

        query?: {
          [key: string]: AutomationVersion.Definition.TemplateString
        }

        headers?: {
          [key: string]: AutomationVersion.Definition.TemplateString
        }

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        body?: AutomationVersion.Definition.TemplateString

        auth_secret_id?: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Application action node */
    interface NodeApplicationAction {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'application_action'

      /** Configuration fields for this node type. */
      config: {
        application_key: string

        action_key: string

        fingerprint: string

        connection_id: number

        /** Mappings keyed by field key from the application actions list. */
        mappings: {
          [key: string]: {
            literal: Files.JsonValue
          } | {
            /** A bare Files TransformScript expression, no braces. */
            expression: AutomationVersion.Definition.FtsExpression
          }
        }

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Publish amazon sns node */
    interface NodePublishAmazonSns {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'publish_amazon_sns'

      /** Configuration fields for this node type. */
      config: {
        arn: string

        message_group_id?: string

        aws_credentials_secret_id: number

        /** A bare Files TransformScript expression, no braces. */
        payload: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Publish amazon sqs node */
    interface NodePublishAmazonSqs {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'publish_amazon_sqs'

      /** Configuration fields for this node type. */
      config: {
        arn: string

        message_group_id?: string

        aws_credentials_secret_id: number

        /** A bare Files TransformScript expression, no braces. */
        payload: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Publish google pubsub node */
    interface NodePublishGooglePubsub {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'publish_google_pubsub'

      /** Configuration fields for this node type. */
      config: {
        project_id: string

        topic_id: string

        google_credentials_secret_id: number

        /** A bare Files TransformScript expression, no braces. */
        payload: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Publish azure service bus node */
    interface NodePublishAzureServiceBus {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'publish_azure_service_bus'

      /** Configuration fields for this node type. */
      config: {
        namespace: string

        entity_path: string

        azure_credentials_secret_id: number

        /** A bare Files TransformScript expression, no braces. */
        payload: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Agent compute node */
    interface NodeAgentCompute {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'agent_compute'

      /** Configuration fields for this node type. */
      config: {
        remote_server_id: number

        command: string

        arguments?: {
          [key: string]: AutomationVersion.Definition.TemplateString
        }

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Set metadata node */
    interface NodeSetMetadata {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'set_metadata'

      /** Configuration fields for this node type. */
      config: {
        metadata: {
          [key: string]: AutomationVersion.Definition.TemplateString
        }

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Extract node */
    interface NodeExtract {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'extract'

      /** Configuration fields for this node type. */
      config?: {
        /** @defaultValue true */
        include_metadata?: boolean

        /** @defaultValue true */
        include_content?: boolean

        /** @defaultValue 'main' */
        content_mode?: 'main' | 'all'

        max_chars?: number

        max_pages?: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Document convert node */
    interface NodeDocumentConvert {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'document_convert'

      /** Configuration fields for this node type. */
      config: {
        target_format: 'docx' | 'pdf' | 'rtf' | 'txt' | 'csv' | 'xlsx' | 'pptx'

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Image convert node */
    interface NodeImageConvert {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'image_convert'

      /** Configuration fields for this node type. */
      config: {
        target_format: 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'tif' | 'tiff'

        width?: number

        height?: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Zip node */
    interface NodeZip {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'zip'

      /** Configuration fields for this node type. */
      config: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** @defaultValue 'zip' */
        archive_format?: 'zip' | 'tar' | 'tar.gz' | 'tgz'

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Unzip node */
    interface NodeUnzip {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'unzip'

      /** Configuration fields for this node type. */
      config?: {
        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Gpg encrypt node */
    interface NodeGpgEncrypt {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'gpg_encrypt'

      /** Configuration fields for this node type. */
      config: {
        gpg_key_id: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Gpg decrypt node */
    interface NodeGpgDecrypt {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'gpg_decrypt'

      /** Configuration fields for this node type. */
      config: {
        gpg_key_id: number

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** If node */
    interface NodeIf {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'if'

      /** Configuration fields for this node type. */
      config: {
        /** A bare Files TransformScript expression, no braces. */
        condition: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Switch node */
    interface NodeSwitch {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'switch'

      /** Configuration fields for this node type. */
      config: {
        /** Switch cases. Each item contains a unique output name and the condition that sends items to it. */
        cases: Array<{
          /** Case-sensitive output name. Use 1-64 letters, numbers, underscores, or hyphens. */
          name: AutomationVersion.Definition.OutputName

          /** A bare Files TransformScript expression, no braces. */
          condition: AutomationVersion.Definition.FtsExpression
        }>

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Filter node */
    interface NodeFilter {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'filter'

      /** Configuration fields for this node type. */
      config: {
        kind?: 'file' | 'data'

        /** A bare Files TransformScript expression, no braces. */
        condition: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** For each node */
    interface NodeForEach {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'for_each'

      /** Configuration fields for this node type. */
      config: {
        /** A bare Files TransformScript expression, no braces. */
        list: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Join node */
    interface NodeJoin {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'join'

      /** Configuration fields for this node type. */
      config: {
        /** @defaultValue 'left' */
        join_type?: 'inner' | 'left' | 'outer'

        /** A bare Files TransformScript expression, no braces. */
        left_key: AutomationVersion.Definition.FtsExpression

        /** A bare Files TransformScript expression, no braces. */
        right_key: AutomationVersion.Definition.FtsExpression

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Aggregate node */
    interface NodeAggregate {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'aggregate'

      /** Configuration fields for this node type. */
      config?: {
        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Wait node */
    interface NodeWait {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'wait'

      /** Configuration fields for this node type. */
      config?: {
        delay_seconds?: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Transform node */
    interface NodeTransform {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'transform'

      /** Configuration fields for this node type. */
      config: {
        fts: string

        /**
         * A string value. Supports {{ fts }} interpolation, evaluated per item at execution time. In path fields, {{
         * fts }} supplies one file or folder name; {{{ fts }}} supplies a path fragment.
         */
        destination?: AutomationVersion.Definition.TemplateString

        /** @defaultValue false */
        overwrite_files?: boolean

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }

    /** Run automation node */
    interface NodeRunAutomation {
      /** Unique node ID within the graph. */
      id: AutomationVersion.Definition.Slug

      /** Node type. */
      type: 'run_automation'

      /** Configuration fields for this node type. */
      config: {
        automation_id: number

        automation_version: number

        /** Error handlers. Each item selects an error pattern and whether to continue or propagate it. */
        on_error?: AutomationVersion.Definition.OnError
      }

      /** Whether this node's output is included in the Automation result. */
      return?: boolean
    }
  }
}

export = AutomationVersion
