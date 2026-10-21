import Files = require('../Files')

/** A FileMigration is a background operation on one or more files, such as a copy or a region migration. */
declare class FileMigration {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FileMigration.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FileMigration.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** File migration ID */
  readonly id?: number | null

  /**
   * Source path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Destination path */
  readonly dest_path?: string | null

  /** Reason for the failure, if applicable. */
  readonly failure_message?: string | null

  /** Number of files processed */
  readonly files_moved?: number | null

  readonly files_total?: number | null

  /** The type of operation */
  readonly operation?: 'delete' | 'move' | 'copy' | 'regional_migration' | 'organize' | 'zip' | 'unzip' | 'gpg_encrypt' | 'gpg_decrypt' | 'transform' | Files.OtherString | null

  /** Region */
  readonly region?: string | null

  /** Status */
  readonly status?: 'pending' | 'cancelled' | 'processing' | 'completed' | 'failed' | Files.OtherString | null

  /** Link to download the log file for this migration. */
  readonly log_url?: string | null

  /** File migration ID */
  getId(): number | null | undefined

  /**
   * Source path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Destination path */
  getDestPath(): string | null | undefined

  /** Reason for the failure, if applicable. */
  getFailureMessage(): string | null | undefined

  /** Number of files processed */
  getFilesMoved(): number | null | undefined

  getFilesTotal(): number | null | undefined

  /** The type of operation */
  getOperation(): 'delete' | 'move' | 'copy' | 'regional_migration' | 'organize' | 'zip' | 'unzip' | 'gpg_encrypt' | 'gpg_decrypt' | 'transform' | Files.OtherString | null | undefined

  /** Region */
  getRegion(): string | null | undefined

  /** Status */
  getStatus(): 'pending' | 'cancelled' | 'processing' | 'completed' | 'failed' | Files.OtherString | null | undefined

  /** Link to download the log file for this migration. */
  getLogUrl(): string | null | undefined

  /**
   * Show File Migration
   * @param id - File Migration ID.
   */
  static find(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<FileMigration>

  /** Alias of `find()`. */
  static get(id: number, params?: Files.NoParams, options?: Files.RequestOptions): Promise<FileMigration>

  static default: typeof FileMigration
}

declare namespace FileMigration {
  /** The fields of `FileMigration` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** File migration ID */
    id?: number | null

    /**
     * Source path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Destination path */
    dest_path?: string | null

    /** Reason for the failure, if applicable. */
    failure_message?: string | null

    /** Number of files processed */
    files_moved?: number | null

    files_total?: number | null

    /** The type of operation */
    operation?: 'delete' | 'move' | 'copy' | 'regional_migration' | 'organize' | 'zip' | 'unzip' | 'gpg_encrypt' | 'gpg_decrypt' | 'transform' | Files.OtherString | null

    /** Region */
    region?: string | null

    /** Status */
    status?: 'pending' | 'cancelled' | 'processing' | 'completed' | 'failed' | Files.OtherString | null

    /** Link to download the log file for this migration. */
    log_url?: string | null
  }
}

export = FileMigration
