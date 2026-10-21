import Files from '../Files'
import DirectConnectionInfo from './DirectConnectionInfo'
import File from './File'
import Preview from './Preview'

/** A File object represents a file or folder on your Files.com site. */
declare class Folder {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: Folder.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: Folder.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `path`. */
  isLoaded(): boolean

  /**
   * File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** User ID of the User who created the file/folder */
  readonly created_by_id?: number | null

  /** ID of the API key that created the file/folder */
  readonly created_by_api_key_id?: number | null

  /** ID of the AS2 Incoming Message that created the file/folder */
  readonly created_by_as2_incoming_message_id?: number | null

  /** ID of the Automation that created the file/folder */
  readonly created_by_automation_id?: number | null

  /** ID of the Bundle Registration that created the file/folder */
  readonly created_by_bundle_registration_id?: number | null

  /** ID of the Inbox that created the file/folder */
  readonly created_by_inbox_id?: number | null

  /** ID of the Remote Server that created the file/folder */
  readonly created_by_remote_server_id?: number | null

  /** ID of the Sync that created the file/folder */
  readonly created_by_sync_id?: number | null

  /**
   * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
   */
  readonly custom_metadata?: Folder.CustomMetadata | null

  /** File/Folder display name */
  readonly display_name?: string | null

  /** Type: `directory` or `file`. */
  readonly type?: string | null

  /** File/Folder size */
  readonly size?: number | null

  /** File created date/time */
  readonly created_at?: Files.DateTimeString | null

  /** User ID of the User who last modified the file/folder */
  readonly last_modified_by_id?: number | null

  /** ID of the API key that last modified the file/folder */
  readonly last_modified_by_api_key_id?: number | null

  /** ID of the Automation that last modified the file/folder */
  readonly last_modified_by_automation_id?: number | null

  /** ID of the Bundle Registration that last modified the file/folder */
  readonly last_modified_by_bundle_registration_id?: number | null

  /** ID of the Remote Server that last modified the file/folder */
  readonly last_modified_by_remote_server_id?: number | null

  /** ID of the Sync that last modified the file/folder */
  readonly last_modified_by_sync_id?: number | null

  /**
   * File last modified date/time, according to the server. This is the timestamp of the last Files.com operation of the
   * file, regardless of what modified timestamp was sent.
   */
  readonly mtime?: Files.DateTimeString | null

  /**
   * File last modified date/time, according to the client who set it. Files.com allows desktop, FTP, SFTP, and WebDAV
   * clients to set modified at times. This allows Desktop<->Cloud syncing to preserve modified at times.
   */
  readonly provided_mtime?: Files.DateTimeString | null

  /** File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  readonly crc32?: string | null

  /** File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  readonly md5?: string | null

  /** File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  readonly sha1?: string | null

  /** File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  readonly sha256?: string | null

  /** MIME Type.  This is determined by the filename extension and is not stored separately internally. */
  readonly mime_type?: string | null

  /** Region location */
  readonly region?: string | null

  /**
   * A short string representing the current user's permissions. Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List)
   * or any combination
   */
  readonly permissions?: string | null

  /** Are subfolders locked and unable to be modified? */
  readonly subfolders_locked?: boolean | null

  /** Is this folder locked and unable to be modified? */
  readonly is_locked?: boolean | null

  /** Link to download file. Provided only in response to a download request. */
  readonly download_uri?: string | null

  /** Optional direct connection information for direct Agent transfer attempts */
  readonly direct_connection_info?: DirectConnectionInfo.Attributes | null

  /** Bookmark/priority color of file/folder */
  readonly priority_color?: string | null

  /** File preview ID */
  readonly preview_id?: number | null

  /** File preview */
  readonly preview?: Preview.Attributes | null

  /** Create parent directories if they do not exist? */
  readonly mkdir_parents?: boolean

  /**
   * File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** User ID of the User who created the file/folder */
  getCreatedById(): number | null | undefined

  /** ID of the API key that created the file/folder */
  getCreatedByApiKeyId(): number | null | undefined

  /** ID of the AS2 Incoming Message that created the file/folder */
  getCreatedByAs2IncomingMessageId(): number | null | undefined

  /** ID of the Automation that created the file/folder */
  getCreatedByAutomationId(): number | null | undefined

  /** ID of the Bundle Registration that created the file/folder */
  getCreatedByBundleRegistrationId(): number | null | undefined

  /** ID of the Inbox that created the file/folder */
  getCreatedByInboxId(): number | null | undefined

  /** ID of the Remote Server that created the file/folder */
  getCreatedByRemoteServerId(): number | null | undefined

  /** ID of the Sync that created the file/folder */
  getCreatedBySyncId(): number | null | undefined

  /**
   * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
   */
  getCustomMetadata(): Folder.CustomMetadata | null | undefined

  /** File/Folder display name */
  getDisplayName(): string | null | undefined

  /** Type: `directory` or `file`. */
  getType(): string | null | undefined

  /** File/Folder size */
  getSize(): number | null | undefined

  /** File created date/time */
  getCreatedAt(): Files.DateTimeString | null | undefined

  /** User ID of the User who last modified the file/folder */
  getLastModifiedById(): number | null | undefined

  /** ID of the API key that last modified the file/folder */
  getLastModifiedByApiKeyId(): number | null | undefined

  /** ID of the Automation that last modified the file/folder */
  getLastModifiedByAutomationId(): number | null | undefined

  /** ID of the Bundle Registration that last modified the file/folder */
  getLastModifiedByBundleRegistrationId(): number | null | undefined

  /** ID of the Remote Server that last modified the file/folder */
  getLastModifiedByRemoteServerId(): number | null | undefined

  /** ID of the Sync that last modified the file/folder */
  getLastModifiedBySyncId(): number | null | undefined

  /**
   * File last modified date/time, according to the server. This is the timestamp of the last Files.com operation of the
   * file, regardless of what modified timestamp was sent.
   */
  getMtime(): Files.DateTimeString | null | undefined

  /**
   * File last modified date/time, according to the client who set it. Files.com allows desktop, FTP, SFTP, and WebDAV
   * clients to set modified at times. This allows Desktop<->Cloud syncing to preserve modified at times.
   */
  getProvidedMtime(): Files.DateTimeString | null | undefined

  /** File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  getCrc32(): string | null | undefined

  /** File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  getMd5(): string | null | undefined

  /** File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  getSha1(): string | null | undefined

  /** File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  getSha256(): string | null | undefined

  /** MIME Type.  This is determined by the filename extension and is not stored separately internally. */
  getMimeType(): string | null | undefined

  /** Region location */
  getRegion(): string | null | undefined

  /**
   * A short string representing the current user's permissions. Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List)
   * or any combination
   */
  getPermissions(): string | null | undefined

  /** Are subfolders locked and unable to be modified? */
  getSubfoldersLocked(): boolean | null | undefined

  /** Is this folder locked and unable to be modified? */
  getIsLocked(): boolean | null | undefined

  /** Link to download file. Provided only in response to a download request. */
  getDownloadUri(): string | null | undefined

  /** Optional direct connection information for direct Agent transfer attempts */
  getDirectConnectionInfo(): DirectConnectionInfo.Attributes | null | undefined

  /** Bookmark/priority color of file/folder */
  getPriorityColor(): string | null | undefined

  /** File preview ID */
  getPreviewId(): number | null | undefined

  /** File preview */
  getPreview(): Preview.Attributes | null | undefined

  /** Create parent directories if they do not exist? */
  getMkdirParents(): boolean | undefined

  /**
   * File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  setPath(value: string): void

  /** User ID of the User who created the file/folder */
  setCreatedById(value: number): void

  /** ID of the API key that created the file/folder */
  setCreatedByApiKeyId(value: number): void

  /** ID of the AS2 Incoming Message that created the file/folder */
  setCreatedByAs2IncomingMessageId(value: number): void

  /** ID of the Automation that created the file/folder */
  setCreatedByAutomationId(value: number): void

  /** ID of the Bundle Registration that created the file/folder */
  setCreatedByBundleRegistrationId(value: number): void

  /** ID of the Inbox that created the file/folder */
  setCreatedByInboxId(value: number): void

  /** ID of the Remote Server that created the file/folder */
  setCreatedByRemoteServerId(value: number): void

  /** ID of the Sync that created the file/folder */
  setCreatedBySyncId(value: number): void

  /**
   * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
   */
  setCustomMetadata(value: Folder.CustomMetadata): void

  /** File/Folder display name */
  setDisplayName(value: string): void

  /** Type: `directory` or `file`. */
  setType(value: string): void

  /** File/Folder size */
  setSize(value: number): void

  /** User ID of the User who last modified the file/folder */
  setLastModifiedById(value: number): void

  /** ID of the API key that last modified the file/folder */
  setLastModifiedByApiKeyId(value: number): void

  /** ID of the Automation that last modified the file/folder */
  setLastModifiedByAutomationId(value: number): void

  /** ID of the Bundle Registration that last modified the file/folder */
  setLastModifiedByBundleRegistrationId(value: number): void

  /** ID of the Remote Server that last modified the file/folder */
  setLastModifiedByRemoteServerId(value: number): void

  /** ID of the Sync that last modified the file/folder */
  setLastModifiedBySyncId(value: number): void

  /**
   * File last modified date/time, according to the server. This is the timestamp of the last Files.com operation of the
   * file, regardless of what modified timestamp was sent.
   */
  setMtime(value: Files.DateTimeString): void

  /**
   * File last modified date/time, according to the client who set it. Files.com allows desktop, FTP, SFTP, and WebDAV
   * clients to set modified at times. This allows Desktop<->Cloud syncing to preserve modified at times.
   */
  setProvidedMtime(value: Files.DateTimeString): void

  /** File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  setCrc32(value: string): void

  /** File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  setMd5(value: string): void

  /** File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  setSha1(value: string): void

  /** File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
  setSha256(value: string): void

  /** MIME Type.  This is determined by the filename extension and is not stored separately internally. */
  setMimeType(value: string): void

  /** Region location */
  setRegion(value: string): void

  /**
   * A short string representing the current user's permissions. Can be `r` (Read),`w` (Write),`d` (Delete), `l` (List)
   * or any combination
   */
  setPermissions(value: string): void

  /** Are subfolders locked and unable to be modified? */
  setSubfoldersLocked(value: boolean): void

  /** Is this folder locked and unable to be modified? */
  setIsLocked(value: boolean): void

  /** Link to download file. Provided only in response to a download request. */
  setDownloadUri(value: string): void

  /** Optional direct connection information for direct Agent transfer attempts */
  setDirectConnectionInfo(value: DirectConnectionInfo.Attributes): void

  /** Bookmark/priority color of file/folder */
  setPriorityColor(value: string): void

  /** File preview ID */
  setPreviewId(value: number): void

  /** File preview */
  setPreview(value: Preview.Attributes): void

  /** Create parent directories if they do not exist? */
  setMkdirParents(value: boolean): void

  /** Creates this object from its attributes. Its attributes then become those the API returns. */
  save(): Promise<true>

  /**
   * List Folders by Path
   * @param path - Path to operate on.
   */
  static listFor(path: string, params?: Folder.ListForParams, options?: Files.RequestOptions): Promise<File[]>

  /**
   * The models `listFor()` lists, one at a time: nothing is requested before the first `next()`, and each page only
   * once the models before it have been taken. The params, options and settings are taken when the iterator is made,
   * the global settings as they are then unless `options.client` is given, and every page and model uses them. Leaving
   * a `for await` loop requests nothing more, and `options.signal` cancels a page request under way, which is not
   * retried.
   */
  static listForIterator(path: string, params?: Folder.ListForParams, options?: Files.RequestOptions): AsyncIterableIterator<File>

  /**
   * Create Folder
   * @param path - Path to operate on.
   */
  static create(path: string, params?: Folder.CreateParams, options?: Files.RequestOptions): Promise<File>
}

declare namespace Folder {
  /** The fields of `Folder` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /**
     * File/Folder path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** User ID of the User who created the file/folder */
    created_by_id?: number | null

    /** ID of the API key that created the file/folder */
    created_by_api_key_id?: number | null

    /** ID of the AS2 Incoming Message that created the file/folder */
    created_by_as2_incoming_message_id?: number | null

    /** ID of the Automation that created the file/folder */
    created_by_automation_id?: number | null

    /** ID of the Bundle Registration that created the file/folder */
    created_by_bundle_registration_id?: number | null

    /** ID of the Inbox that created the file/folder */
    created_by_inbox_id?: number | null

    /** ID of the Remote Server that created the file/folder */
    created_by_remote_server_id?: number | null

    /** ID of the Sync that created the file/folder */
    created_by_sync_id?: number | null

    /**
     * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
     */
    custom_metadata?: Folder.CustomMetadata | null

    /** File/Folder display name */
    display_name?: string | null

    /** Type: `directory` or `file`. */
    type?: string | null

    /** File/Folder size */
    size?: number | null

    /** File created date/time */
    created_at?: Files.DateTimeString | null

    /** User ID of the User who last modified the file/folder */
    last_modified_by_id?: number | null

    /** ID of the API key that last modified the file/folder */
    last_modified_by_api_key_id?: number | null

    /** ID of the Automation that last modified the file/folder */
    last_modified_by_automation_id?: number | null

    /** ID of the Bundle Registration that last modified the file/folder */
    last_modified_by_bundle_registration_id?: number | null

    /** ID of the Remote Server that last modified the file/folder */
    last_modified_by_remote_server_id?: number | null

    /** ID of the Sync that last modified the file/folder */
    last_modified_by_sync_id?: number | null

    /**
     * File last modified date/time, according to the server. This is the timestamp of the last Files.com operation of
     * the file, regardless of what modified timestamp was sent.
     */
    mtime?: Files.DateTimeString | null

    /**
     * File last modified date/time, according to the client who set it. Files.com allows desktop, FTP, SFTP, and WebDAV
     * clients to set modified at times. This allows Desktop<->Cloud syncing to preserve modified at times.
     */
    provided_mtime?: Files.DateTimeString | null

    /** File CRC32 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
    crc32?: string | null

    /** File MD5 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
    md5?: string | null

    /** File SHA1 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
    sha1?: string | null

    /** File SHA256 checksum. This is sometimes delayed, so if you get a blank response, wait and try again. */
    sha256?: string | null

    /** MIME Type.  This is determined by the filename extension and is not stored separately internally. */
    mime_type?: string | null

    /** Region location */
    region?: string | null

    /**
     * A short string representing the current user's permissions. Can be `r` (Read),`w` (Write),`d` (Delete), `l`
     * (List) or any combination
     */
    permissions?: string | null

    /** Are subfolders locked and unable to be modified? */
    subfolders_locked?: boolean | null

    /** Is this folder locked and unable to be modified? */
    is_locked?: boolean | null

    /** Link to download file. Provided only in response to a download request. */
    download_uri?: string | null

    /** Optional direct connection information for direct Agent transfer attempts */
    direct_connection_info?: DirectConnectionInfo.Attributes | null

    /** Bookmark/priority color of file/folder */
    priority_color?: string | null

    /** File preview ID */
    preview_id?: number | null

    /** File preview */
    preview?: Preview.Attributes | null

    /** Create parent directories if they do not exist? */
    mkdir_parents?: boolean
  }

  interface ListForParams {
    /**
     * Send cursor to resume an existing list from the point at which you left off. Get a cursor from an existing list
     * via the X-Files-Cursor-Next header or the X-Files-Cursor-Prev header.
     */
    cursor?: string

    /** Number of records to show per page.  (Max: 10000, 1,000 or less is recommended). */
    per_page?: number

    /** Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`. */
    preview_size?: string

    /**
     * Search by field and direction. Valid fields are `path`, `size`, `modified_at_datetime`, `provided_modified_at`.
     * Valid directions are `asc` and `desc`. Defaults to `{"path":"asc"}`.
     */
    sort_by?: Files.JsonObject

    /**
     * If specified, will search the folders/files list by name. Ignores text before last `/`. This is the same API used
     * by the search bar in the web UI when running 'Search This Folder'. Search results are a best effort, not real
     * time, and not guaranteed to perfectly match the latest folder listing. Results may be truncated if more than
     * 1,000 possible matches exist. This field should only be used for ad-hoc (human) searching, and not as part of an
     * automated process.
     */
    search?: string

    /**
     * If provided, the search string in `search` will search for files where this custom metadata key matches the value
     * sent in `search`. Set this to `*` to allow any metadata key to match the value sent in `search`.
     */
    search_custom_metadata_key?: string

    /**
     * Search entire site? If true, we will search the entire site. Do not provide a path when using this parameter.
     * This is the same API used by the search bar in the web UI when running 'Search All Files'. Search results are a
     * best effort, not real time, and not guaranteed to match every file. This field should only be used for ad-hoc
     * (human) searching, and not as part of an automated process.
     */
    search_all?: boolean

    /** Include file previews? */
    with_previews?: boolean

    /** Include file priority color information? */
    with_priority_color?: boolean

    /** Type of objects to return.  Can be `folder` or `file`. */
    type?: string

    /**
     * If provided, will only return files/folders modified after this time. Can be used only in combination with `type`
     * filter.
     */
    modified_at_datetime?: Files.DateTimeString
  }

  interface CreateParams {
    /** Create parent directories if they do not exist? */
    mkdir_parents?: boolean

    /** User provided modification time. */
    provided_mtime?: Files.DateTimeString
  }

  /**
   * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
   */
  type CustomMetadata = {
    [key: string]: string
  }
}

export default Folder
