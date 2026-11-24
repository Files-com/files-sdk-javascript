import Files from '../Files'

/** A Database Destination lets an Automation append rows to an existing table. */
declare class DatabaseDestination {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: DatabaseDestination.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: DatabaseDestination.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Database Destination ID. */
  readonly id?: number | null

  /** Workspace ID. 0 means the default workspace. */
  readonly workspace_id?: number | null

  /** Name of the destination. */
  readonly name?: string | null

  /** Database provider. */
  readonly provider?: 'snowflake' | 'bigquery' | 'supabase' | 'postgresql' | 'mysql' | Files.OtherString | null

  /**
   * Provider settings for the destination. Use the schema matching provider. The connection address and table are fixed
   * after creation.
   */
  readonly config?: DatabaseDestination.Config | null

  /**
   * ID of a Secret in the same Workspace. Use a Token Secret for Snowflake, a service account Key/Value Secret for
   * BigQuery, or a Username/Password Secret for a database login.
   */
  readonly secret_id?: number | null

  /** When the destination was created. */
  readonly created_at?: Files.DateTimeString | null

  /** When the destination was last updated. */
  readonly updated_at?: Files.DateTimeString | null

  /** Database Destination ID. */
  getId(): number | null | undefined

  /** Workspace ID. 0 means the default workspace. */
  getWorkspaceId(): number | null | undefined

  /** Name of the destination. */
  getName(): string | null | undefined

  /** Database provider. */
  getProvider(): 'snowflake' | 'bigquery' | 'supabase' | 'postgresql' | 'mysql' | Files.OtherString | null | undefined

  /**
   * Provider settings for the destination. Use the schema matching provider. The connection address and table are fixed
   * after creation.
   */
  getConfig(): DatabaseDestination.Config | null | undefined

  /**
   * ID of a Secret in the same Workspace. Use a Token Secret for Snowflake, a service account Key/Value Secret for
   * BigQuery, or a Username/Password Secret for a database login.
   */
  getSecretId(): number | null | undefined

  /** When the destination was created. */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** When the destination was last updated. */
  getUpdatedAt(): Files.DateTimeString | null | undefined

  /** Database Destination ID. */
  setId(value: number): void

  /** Workspace ID. 0 means the default workspace. */
  setWorkspaceId(value: number): void

  /** Name of the destination. */
  setName(value: string): void

  /** Database provider. */
  setProvider(value: 'snowflake' | 'bigquery' | 'supabase' | 'postgresql' | 'mysql'): void

  /**
   * Provider settings for the destination. Use the schema matching provider. The connection address and table are fixed
   * after creation.
   */
  setConfig(value: DatabaseDestination.Config): void

  /**
   * ID of a Secret in the same Workspace. Use a Token Secret for Snowflake, a service account Key/Value Secret for
   * BigQuery, or a Username/Password Secret for a database login.
   */
  setSecretId(value: number): void

  /** Update Database Destination */
  update(params?: DatabaseDestination.UpdateParams): Promise<this>

  /** Delete Database Destination */
  delete(params?: Files.NoParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: Files.NoParams): Promise<void>

  /**
   * Saves this object: updates it from its attributes when it has an `id`, otherwise creates it from its attributes.
   * Its attributes then become those the API returns.
   */
  save(): Promise<true>

  /** List Database Destinations */
  static list(params?: DatabaseDestination.ListParams, options?: Files.RequestOptions): Promise<DatabaseDestination[]>

  /** Alias of `list()`. */
  static all(params?: DatabaseDestination.ListParams, options?: Files.RequestOptions): Promise<DatabaseDestination[]>

  /**
   * The models `list()` lists, one at a time: nothing is requested before the first `next()`, and each page only once
   * the models before it have been taken. The params, options and settings are taken when the iterator is made, the
   * global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving a
   * `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listIterator(params?: DatabaseDestination.ListParams, options?: Files.RequestOptions): AsyncIterableIterator<DatabaseDestination>

  /**
   * Show Database Destination
   * @param id - Database Destination ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<DatabaseDestination>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<DatabaseDestination>

  /** Create Database Destination */
  static create(params: DatabaseDestination.CreateParams, options?: Files.RequestOptions): Promise<DatabaseDestination>
}

declare namespace DatabaseDestination {
  /** The fields of `DatabaseDestination` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Database Destination ID. */
    id?: number | null

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number | null

    /** Name of the destination. */
    name?: string | null

    /** Database provider. */
    provider?: 'snowflake' | 'bigquery' | 'supabase' | 'postgresql' | 'mysql' | Files.OtherString | null

    /**
     * Provider settings for the destination. Use the schema matching provider. The connection address and table are
     * fixed after creation.
     */
    config?: DatabaseDestination.Config | null

    /**
     * ID of a Secret in the same Workspace. Use a Token Secret for Snowflake, a service account Key/Value Secret for
     * BigQuery, or a Username/Password Secret for a database login.
     */
    secret_id?: number | null

    /** When the destination was created. */
    created_at?: Files.DateTimeString | null

    /** When the destination was last updated. */
    updated_at?: Files.DateTimeString | null
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
     * If set, sort records by the specified field in either `asc` or `desc` direction. Valid fields are `workspace_id`
     * and `name`.
     */
    sort_by?: Files.JsonObject

    /**
     * If set, return records where the specified field is equal to the supplied value. Valid fields are `workspace_id`
     * and `name`. Valid field combinations are `[ workspace_id, name ]`.
     */
    filter?: Files.JsonObject

    /** If set, return records where the specified field is prefixed by the supplied value. Valid fields are `name`. */
    filter_prefix?: Files.JsonObject
  }

  interface CreateParams {
    /** Name of the destination. */
    name: string

    /** Database provider. */
    provider: 'snowflake' | 'bigquery' | 'supabase' | 'postgresql' | 'mysql'

    /**
     * Provider settings for the destination. Use the schema matching provider. The connection address and table are
     * fixed after creation.
     */
    config: DatabaseDestination.Config

    /**
     * ID of a Secret in the same Workspace. Use a Token Secret for Snowflake, a service account Key/Value Secret for
     * BigQuery, or a Username/Password Secret for a database login.
     */
    secret_id: number

    /** Workspace ID. 0 means the default workspace. */
    workspace_id?: number
  }

  interface UpdateParams {
    /** Name of the destination. */
    name?: string

    /**
     * ID of a Secret in the same Workspace. Use a Token Secret for Snowflake, a service account Key/Value Secret for
     * BigQuery, or a Username/Password Secret for a database login.
     */
    secret_id?: number

    /**
     * Provider settings for the destination. Use the schema matching provider. The connection address and table are
     * fixed after creation.
     */
    config?: DatabaseDestination.Config
  }

  type Config = ({
    [key: string]: Files.JsonValue
  }) & ({
    /** Snowflake account identifier in organization-account format. */
    account_identifier: string

    /** Exact name of the database. */
    database_name: string

    /** Exact name of the schema. */
    schema_name: string

    /** Exact name of the existing table. */
    table_name: string

    /** Warehouse to use. Omit to use the Snowflake user's default. */
    warehouse?: string

    /** Role to use. Omit to use the Snowflake user's default. */
    role?: string
  } | {
    /** Exact name of the existing table. */
    table_name: string

    /** Google Cloud project that owns the table and runs the load job. */
    project_id: string

    /** BigQuery dataset that contains the table. */
    dataset_name: string

    /** Location of the BigQuery dataset. */
    location: string
  } | {
    /** Exact name of the database. */
    database_name: string

    /** Exact name of the schema. */
    schema_name: string

    /** Exact name of the existing table. */
    table_name: string

    /**
     * Database hostname. PostgreSQL also supports an IP address with a matching certificate. For Supabase, use the
     * project's direct or shared pooler hostname.
     */
    host: string

    /** Database port. Defaults to 3306 for MySQL and 5432 for PostgreSQL or Supabase. */
    port?: number

    /**
     * PEM-encoded CA certificate or bundle for TLS verification. Supabase requires the project's CA certificate from
     * Database Settings. PostgreSQL and MySQL use the system trust store when omitted.
     */
    ca_certificate: string
  } | {
    /** Exact name of the database. */
    database_name: string

    /** Exact name of the schema. */
    schema_name: string

    /** Exact name of the existing table. */
    table_name: string

    /**
     * Database hostname. PostgreSQL also supports an IP address with a matching certificate. For Supabase, use the
     * project's direct or shared pooler hostname.
     */
    host: string

    /** Database port. Defaults to 3306 for MySQL and 5432 for PostgreSQL or Supabase. */
    port?: number

    /**
     * PEM-encoded CA certificate or bundle for TLS verification. Supabase requires the project's CA certificate from
     * Database Settings. PostgreSQL and MySQL use the system trust store when omitted.
     */
    ca_certificate?: string
  } | {
    /** Exact name of the database. */
    database_name: string

    /** Exact name of the existing table. */
    table_name: string

    /**
     * Database hostname. PostgreSQL also supports an IP address with a matching certificate. For Supabase, use the
     * project's direct or shared pooler hostname.
     */
    host: string

    /** Database port. Defaults to 3306 for MySQL and 5432 for PostgreSQL or Supabase. */
    port?: number

    /**
     * PEM-encoded CA certificate or bundle for TLS verification. Supabase requires the project's CA certificate from
     * Database Settings. PostgreSQL and MySQL use the system trust store when omitted.
     */
    ca_certificate?: string
  })
}

export default DatabaseDestination
