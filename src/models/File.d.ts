import Files from '../Files'
import DirectConnectionInfo from './DirectConnectionInfo'
import FileAction from './FileAction'
import FileUploadPart from './FileUploadPart'
import Preview from './Preview'
import ZipListEntry from './ZipListEntry'

/** A File object represents a file or folder on your Files.com site. */
declare class File {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: File.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: File.Attributes & Files.UnknownFields

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
  readonly custom_metadata?: File.CustomMetadata | null

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

  /** The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist */
  readonly action?: string

  /** Length of file. */
  readonly length?: number

  /** Create parent directories if they do not exist? */
  readonly mkdir_parents?: boolean

  /** Part if uploading a part. */
  readonly part?: number

  /** How many parts to fetch? */
  readonly parts?: number

  readonly ref?: string

  /** File byte offset to restart from. */
  readonly restart?: number

  /**
   * If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to
   * the destination folder tree?
   */
  readonly copy_behaviors?: boolean

  /** If copying folder, copy just the structure? */
  readonly structure?: string

  /** Allow file rename instead of overwrite? */
  readonly with_rename?: boolean

  /**
   * If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload
   * will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload
   * using parallel parts to a remote server destination that does not offer parallel parts support natively.
   */
  readonly buffered_upload?: boolean

  /** Include optional direct connection information for a direct Agent transfer attempt? */
  readonly with_direct_connection_info?: boolean

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
  getCustomMetadata(): File.CustomMetadata | null | undefined

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

  /** The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist */
  getAction(): string | undefined

  /** Length of file. */
  getLength(): number | undefined

  /** Create parent directories if they do not exist? */
  getMkdirParents(): boolean | undefined

  /** Part if uploading a part. */
  getPart(): number | undefined

  /** How many parts to fetch? */
  getParts(): number | undefined

  getRef(): string | undefined

  /** File byte offset to restart from. */
  getRestart(): number | undefined

  /**
   * If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to
   * the destination folder tree?
   */
  getCopyBehaviors(): boolean | undefined

  /** If copying folder, copy just the structure? */
  getStructure(): string | undefined

  /** Allow file rename instead of overwrite? */
  getWithRename(): boolean | undefined

  /**
   * If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload
   * will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload
   * using parallel parts to a remote server destination that does not offer parallel parts support natively.
   */
  getBufferedUpload(): boolean | undefined

  /** Include optional direct connection information for a direct Agent transfer attempt? */
  getWithDirectConnectionInfo(): boolean | undefined

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
  setCustomMetadata(value: File.CustomMetadata): void

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

  /** The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist */
  setAction(value: string): void

  /** Length of file. */
  setLength(value: number): void

  /** Create parent directories if they do not exist? */
  setMkdirParents(value: boolean): void

  /** Part if uploading a part. */
  setPart(value: number): void

  /** How many parts to fetch? */
  setParts(value: number): void

  setRef(value: string): void

  /** File byte offset to restart from. */
  setRestart(value: number): void

  /**
   * If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to
   * the destination folder tree?
   */
  setCopyBehaviors(value: boolean): void

  /** If copying folder, copy just the structure? */
  setStructure(value: string): void

  /** Allow file rename instead of overwrite? */
  setWithRename(value: boolean): void

  /**
   * If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload
   * will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to upload
   * using parallel parts to a remote server destination that does not offer parallel parts support natively.
   */
  setBufferedUpload(value: boolean): void

  /** Include optional direct connection information for a direct Agent transfer attempt? */
  setWithDirectConnectionInfo(value: boolean): void

  /** Download File */
  download(params?: File.DownloadParams): Promise<File>

  /** Update File/Folder Metadata */
  update(params?: File.UpdateParams): Promise<this>

  /** Delete File/Folder */
  delete(params?: File.DeleteParams): Promise<void>

  /** Alias of `delete()`. */
  destroy(params?: File.DeleteParams): Promise<void>

  /** List the contents of a ZIP file */
  zipListContents(params?: Files.NoParams): Promise<ZipListEntry[]>

  /**
   * Delete File/Folder and return its File Action. A pending or processing deletion continues in the background after
   * this returns; check its File Migration for completion. Waiting for the File Migration does not cancel the deletion
   */
  beginDelete(params?: File.BeginDeleteParams): Promise<FileAction>

  /** Copy File/Folder */
  copy(params?: File.CopyParams): Promise<FileAction>

  /** Move File/Folder */
  move(params?: File.MoveParams): Promise<FileAction>

  /** Transform a file and save the output to a destination path */
  transform(params?: File.TransformParams): Promise<FileAction>

  /** Decrypt a GPG-encrypted file and save it to a destination path */
  gpgDecrypt(params?: File.GpgDecryptParams): Promise<FileAction>

  /** Encrypt a file with GPG and save it to a destination path */
  gpgEncrypt(params?: File.GpgEncryptParams): Promise<FileAction>

  /** Extract a ZIP file to a destination folder */
  unzip(params?: File.UnzipParams): Promise<FileAction>

  /** Begin File Upload */
  beginUpload(params?: File.BeginUploadParams): Promise<FileUploadPart[]>

  /** Creates this object from its attributes. Its attributes then become those the API returns. */
  save(): Promise<true>

  /**
   * Upload File
   * @param path - Path to operate on.
   */
  static create(path: string, params?: File.CreateParams, options?: Files.RequestOptions): Promise<File>

  /**
   * Find File/Folder by Path
   * @param path - Path to operate on.
   */
  static find(path: string, params?: File.FindParams, options?: Files.RequestOptions): Promise<File>

  /** Alias of `find()`. */
  static get(path: string, params?: File.FindParams, options?: Files.RequestOptions): Promise<File>

  /** Create a ZIP from one or more paths and save it to a destination path */
  static zip(params: File.ZipParams, options?: Files.RequestOptions): Promise<FileAction>
}

declare namespace File {
  /** The fields of `File` objects. Any of them can be missing, and those the API returns can be null. */
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
    custom_metadata?: File.CustomMetadata | null

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

    /** The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist */
    action?: string

    /** Length of file. */
    length?: number

    /** Create parent directories if they do not exist? */
    mkdir_parents?: boolean

    /** Part if uploading a part. */
    part?: number

    /** How many parts to fetch? */
    parts?: number

    ref?: string

    /** File byte offset to restart from. */
    restart?: number

    /**
     * If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to
     * the destination folder tree?
     */
    copy_behaviors?: boolean

    /** If copying folder, copy just the structure? */
    structure?: string

    /** Allow file rename instead of overwrite? */
    with_rename?: boolean

    /**
     * If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload
     * will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to
     * upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
     */
    buffered_upload?: boolean

    /** Include optional direct connection information for a direct Agent transfer attempt? */
    with_direct_connection_info?: boolean
  }

  interface DownloadParams {
    /**
     * Can be blank, `redirect` or `stat`. If set to `stat`, we will return file information but without a download URL,
     * and without logging a download. If set to `redirect` we will serve a 302 redirect directly to the file. This is
     * used for integrations with Zapier, and is not recommended for most integrations.
     */
    action?: string

    /** Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`. */
    preview_size?: string

    /** Include file preview information? */
    with_previews?: boolean

    /** Include file priority color information? */
    with_priority_color?: boolean

    /** Include optional direct connection information for a direct Agent transfer attempt? */
    with_direct_connection_info?: boolean
  }

  interface CreateParams {
    /** The action to perform.  Can be `append`, `attachment`, `end`, `upload`, `put`, or may not exist */
    action?: string

    /**
     * Custom metadata map to save when `action=end` completes the upload. Replaces existing metadata; an empty map
     * clears it. No separate metadata-edit permission is required. Supported on native files and configured remote
     * mounts, excluding remote server automount paths. Limited to 32 keys, 256 characters per key and 1024 characters
     * per value.
     */
    custom_metadata?: File.CustomMetadata

    /** Length of file. */
    length?: number

    /** Create parent directories if they do not exist? */
    mkdir_parents?: boolean

    /** Part if uploading a part. */
    part?: number

    /** How many parts to fetch? */
    parts?: number

    /** User provided modification time. */
    provided_mtime?: Files.DateTimeString

    ref?: string

    /** File byte offset to restart from. */
    restart?: number

    /** Size of file. */
    size?: number

    /**
     * If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to
     * the destination folder tree?
     */
    copy_behaviors?: boolean

    /** If copying folder, copy just the structure? */
    structure?: string

    /** Allow file rename instead of overwrite? */
    with_rename?: boolean

    /**
     * If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload
     * will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to
     * upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
     */
    buffered_upload?: boolean

    /** Include optional direct connection information for a direct Agent transfer attempt? */
    with_direct_connection_info?: boolean

    /** etag identifier. Part number. */
    etags?: Array<{
      /** etag identifier. */
      etag: string;
      /** Part number. */
      part: number
    }>
  }

  interface UpdateParams {
    /**
     * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
     */
    custom_metadata?: File.CustomMetadata

    /** Modified time of file. */
    provided_mtime?: Files.DateTimeString

    /** Priority/Bookmark color of file. */
    priority_color?: string
  }

  interface DeleteParams {
    /** If true, will recursively delete folders.  Otherwise, will error on non-empty folders. */
    recursive?: boolean
  }

  interface FindParams {
    /** Request a preview size.  Can be `small` (default), `large`, `xlarge`, or `pdf`. */
    preview_size?: string

    /** Include file preview information? */
    with_previews?: boolean

    /** Include file priority color information? */
    with_priority_color?: boolean
  }

  interface BeginDeleteParams {
    /** If true, will recursively delete folders.  Otherwise, will error on non-empty folders. */
    recursive?: boolean
  }

  interface CopyParams {
    /** Required: when not given, this object's `destination` is used. Copy destination path. */
    destination?: string

    /**
     * If copying a folder, also copy supported behaviors, email notification subscriptions, and per-folder branding to
     * the destination folder tree?
     */
    copy_behaviors?: boolean

    /** Copy structure only? */
    structure?: boolean

    /** Overwrite existing file(s) in the destination? */
    overwrite?: boolean
  }

  interface MoveParams {
    /** Required: when not given, this object's `destination` is used. Move destination path. */
    destination?: string

    /** Overwrite existing file(s) in the destination? */
    overwrite?: boolean
  }

  interface TransformParams {
    /**
     * Required: when not given, this object's `destination` is used. Destination file path for the transformed output.
     */
    destination?: string

    /**
     * Required: when not given, this object's `transform_type` is used. Transform type. Supported values are
     * `image_convert`, `document_convert`, and `files_transform_script_execute`.
     */
    transform_type?: string

    /** Required: when not given, this object's `target_format` is used. Destination format to create. */
    target_format?: string

    /** Files TransformScript source. Required when transform_type is `files_transform_script_execute`. */
    script?: string

    /** Maximum output width for image_convert. */
    width?: number

    /** Maximum output height for image_convert. */
    height?: number

    /** Overwrite existing file in the destination? */
    overwrite?: boolean
  }

  interface GpgDecryptParams {
    /** Required: when not given, this object's `destination` is used. Destination file path for the decrypted file. */
    destination?: string

    /** GPG Key IDs to decrypt with. If omitted, every accessible private GPG key in the source workspace is used. */
    gpg_key_ids?: number[]

    /** Partner ID whose GPG keys should be used for decryption. */
    gpg_key_partner_id?: number

    /** Use every accessible private GPG key in the source workspace for decryption. */
    use_all_private_keys?: boolean

    /** Ignore errors from the MDC (modification detection code) check. */
    ignore_mdc_error?: boolean

    /** Overwrite existing file in the destination? */
    overwrite?: boolean
  }

  interface GpgEncryptParams {
    /** Required: when not given, this object's `destination` is used. Destination file path for the encrypted file. */
    destination?: string

    /** GPG Key IDs to encrypt with. */
    gpg_key_ids?: number[]

    /** Partner ID whose GPG keys should be used for encryption. */
    gpg_key_partner_id?: number

    /** Optional GPG Key ID to sign with. */
    signing_key_id?: number

    /** Output ASCII-armored encrypted data. */
    armor?: boolean

    /** Overwrite existing file in the destination? */
    overwrite?: boolean
  }

  interface UnzipParams {
    /** Required: when not given, this object's `destination` is used. Destination folder path for extracted files. */
    destination?: string

    /** Optional single entry filename to extract. */
    filename?: string

    /** Overwrite existing files in the destination? */
    overwrite?: boolean
  }

  interface ZipParams {
    /** Paths to include in the ZIP. */
    paths: string[]

    /** Destination file path for the ZIP. */
    destination: string

    /** Overwrite existing file in the destination? */
    overwrite?: boolean
  }

  interface BeginUploadParams {
    /** Create parent directories if they do not exist? */
    mkdir_parents?: boolean

    /** Part if uploading a part. */
    part?: number

    /** How many parts to fetch? */
    parts?: number

    ref?: string

    /** File byte offset to restart from. */
    restart?: number

    /** Total bytes of file being uploaded (include bytes being retained if appending/restarting). */
    size?: number

    /** Allow file rename instead of overwrite? */
    with_rename?: boolean

    /**
     * If true, and the path refers to a destination not stored on Files.com (such as a remote server mount), the upload
     * will be uploaded first to Files.com before being sent to the remote server mount. This can allow clients to
     * upload using parallel parts to a remote server destination that does not offer parallel parts support natively.
     */
    buffered_upload?: boolean

    /** Include optional direct connection information for a direct Agent transfer attempt? */
    with_direct_connection_info?: boolean
  }

  /**
   * Custom metadata map of keys and values. Limited to 32 keys, 256 characters per key and 1024 characters per value.
   */
  type CustomMetadata = {
    [key: string]: string
  }
}

// The helpers written by hand in File.js, merged into the File declaration above.

interface File {
  /**
   * Downloads the file, from its `download_uri`, as UTF-8 text. It holds the whole file, which is what it returns: a
   * copy of each chunk as it comes, then one buffer of them all and the string decoded from it. Rejects with an
   * `EmptyPropertyError` when this object has no `download_uri`.
   *
   * In this and every download, a File from a client uses only the agent its options or client choose for the URL, as
   * for an API request, and none of their credentials or headers; any other File downloads with https's global agent,
   * as before. At the DEBUG log level, with its client's log settings or else the global ones, each request is logged,
   * each response's status and headers, whether it is then used or not, and each chunk of the body as it is read.
   *
   * Every download asks for the whole file first. A response other than 200 fails it with an error whose `status` is
   * that status, none of its body used, unless a retry may answer it: a 429 or 503 after its `Retry-After`, or another
   * server error after 100 ms, within `maxNetworkRetries`. A response from the Files.com web app, with an
   * `X-Files-Frontend-App` header, is refused with a `FilesError`, whatever its status, before any of its body reaches
   * the destination, and so is one for a range. When the response declares the file's exact size, a strong `ETag` and
   * no content coding, a download that breaks asks for the rest of that same version, from the first byte not yet
   * delivered (`Range` with `If-Match`), and its destination never gets a byte twice; a response of another version
   * starts it over from its first byte, when the destination can (a file or text). Without such a response, only those
   * destinations download again from the first byte, and a stream that has been given bytes fails. Each request's
   * failures count on their own, and any byte gained restores them.
   *
   * A URL known to have expired, by its own signature, is never sent: each request's callbacks, the agent's choice for
   * its URL and its log, run before the last check of the download's stop, pause and the URL's expiry, with nothing
   * between that check and the request. A File with a `path` gives it again then, as its own `download()` does, with
   * this File's options, its client, credentials and workspace included, and the download's `signal`; a File without
   * one, such as one made from a URL alone, fails with the expired-URL `FilesError`.
   *
   * With a `fetch` in this object's options, or else in its client's settings, or, for a File without a client, the
   * global ones (see `Files.NetworkOptions.fetch`), every request goes through it, as a request to storage; without
   * one, through Node.js's `https`, with the agent chosen for the URL each request goes to, a renewed one included.
   * Either way, each request has one budget, this object's `timeoutSecs` or else its settings' `networkTimeout`, from
   * sending it until its whole body has been read, never extended by what arrives, which a large file may need raised,
   * or 0 for none; the budget running out fails that request with the "Request timed out" `FilesError`, which a retry
   * may then answer as a broken response is. A paused download delivers nothing more, not even a chunk that arrives
   * while it is paused, until it is resumed, and sends no request: through a configured `fetch`, a request, and each
   * redirect of it, is checked as it is handed to the `fetch`, once its callbacks, the agent's choice for its URL
   * included, have run, and waits there, within its attempt's budget, until resumed. One that fails or is cancelled stops
   * every request it has under way, one still waiting for its response included, and settles only once they have all
   * closed and every renewal of its URL has settled, a stopped one included, with its first failure, even when that came
   * while its last bytes were being written.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  downloadToString(options?: File.DownloadOptions): Promise<string>

  /**
   * Downloads the file, from its `download_uri`, to a path on disk, replacing any file there (see `downloadToString()`).
   * A large file can come in ranges of 8 MiB at once: when the response declares the file's size, a strong `ETag` and
   * no content coding, the file has at least two ranges, and the agent is Node's own `https.Agent` with no `maxSockets`
   * or `maxTotalSockets` limit, as https's global agent is by default, a request for the second range, through the same
   * agent and of that same version, probes the split while the first response waits unread. Only when it answers 206
   * Partial Content with exactly its range within two seconds, intact, is the download split: the first response gives
   * the first range and is then stopped, the probe the second, and each other range is asked for once the job's or the
   * download's adaptive controller admits a request and a request permit is free (see `File.DownloadOptions`). Otherwise
   * the first response gives the whole file. A range that breaks is asked for again from its first byte not yet
   * written. The probe is sent only when the download's `maxConcurrency`, its first response counted, leaves room for
   * it. Through https's global agent as Node gives it, with no `highWaterMark`, `readableHighWaterMark` or
   * `writableHighWaterMark` in its options, these requests ask any socket the agent creates for them for a 4 MiB
   * `highWaterMark`: a threshold at which the socket stops reading ahead, not a maximum of what it buffers. A socket the
   * agent already holds keeps its own, and one created so can later serve another request to the same host. Through a
   * configured `fetch`, the file comes one response at a time.
   *
   * Each request of the download keeps its request permits until it has closed and every byte read from it has been
   * written to the file, a final batch included, or given up: so the job's, or the process's, request limit bounds how
   * many responses have bytes the SDK holds to write at once, each less than 1 MiB of earlier chunks besides the latest
   * one, whatever `maxConcurrentFiles` is. The size of a chunk, and the transport's own buffering, are the transport's.
   *
   * The file at `destinationPath` is opened, and so emptied, only once the download's file has been admitted (see
   * `Files.TransferJobOptions.maxConcurrentFiles`), before anything is asked for: a download waiting for its admission,
   * or cancelled before the file is opened, even right after the call or as its admission is granted, leaves the file as
   * it was. Resolves once every byte has been written, every request has
   * closed and the file is closed, without flushing it to storage. Rejects when the download fails, leaving the file
   * incomplete; for a first response other than 200, with an error whose `status` is that status, and none of its body
   * written. Rejects with an `EmptyPropertyError` when this object has no `download_uri`.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  downloadToFile(destinationPath: string, options?: File.DownloadOptions): Promise<void>

  /**
   * Downloads the file, from its `download_uri`, into a stream, which the download takes over: a complete download
   * ends the stream and closes it if it has a `close()` method, and a failed one closes or destroys it. The stream is
   * written as fast as it takes the bytes, waiting for `'drain'` when it asks to, a wait that the download's `signal`
   * ends; a stream that fails or closes first fails the download and stops it, and an error its `end()` throws fails the
   * download with that error. Only the stream's `'finish'` after the download has ended it completes the download: a
   * stream ended by another before then takes no more bytes, and the download fails with the failure that follows,
   * such as the stream closing or the next byte refused, unless the stream had every byte already and neither closes
   * nor fails. The download settles only once every
   * request it made has closed. Bytes written cannot be taken back, so a download resumed after a break gives the
   * stream only the bytes it has not had, and one that cannot resume fails once the stream has had any (see
   * `downloadToString()`). Rejects with an `EmptyPropertyError` when this object has no `download_uri`.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  downloadToStream(writableStream: NodeJS.WritableStream, options?: File.DownloadOptions): Promise<void>

  /**
   * Copies this file or folder to another path, with this object's options unless others are given. Options given
   * replace this object's, but one from a client keeps that client unless they name another. Resolves with the API's
   * response, whose data describes the copy, as soon as the API accepts it; `await copied.waitForCompletion()` waits for
   * the copy itself (see `FileAction.waitForCompletion()`).
   */
  copyTo(destinationFilePath: string, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /**
   * Moves this file or folder to another path, with this object's options unless others are given. Options given
   * replace this object's, but one from a client keeps that client unless they name another. Resolves with the API's
   * response, whose data describes the move, as soon as the API accepts it; `await moved.waitForCompletion()` waits for
   * the move itself (see `FileAction.waitForCompletion()`).
   */
  moveTo(destinationFilePath: string, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /** Copies this file or folder to `destinationPath` in a Remote Server: `_/RemoteServers/{remoteServerId}/{destinationPath}`. */
  copyToRemoteServer(remoteServerId: number, destinationPath: string, params?: File.DestinationCopyParams, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /** Moves this file or folder to `destinationPath` in a Remote Server: `_/RemoteServers/{remoteServerId}/{destinationPath}`. */
  moveToRemoteServer(remoteServerId: number, destinationPath: string, params?: File.DestinationMoveParams, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /** Copies this file or folder to `destinationPath` in a Snapshot: `_/Snapshots/{snapshotId}/{destinationPath}`. */
  copyToSnapshot(snapshotId: number, destinationPath: string, params?: File.DestinationCopyParams, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /** Moves this file or folder to `destinationPath` in a Snapshot: `_/Snapshots/{snapshotId}/{destinationPath}`. */
  moveToSnapshot(snapshotId: number, destinationPath: string, params?: File.DestinationMoveParams, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /** Copies this file or folder to `destinationPath` in a Child Site: `_/Sites/{siteId}/{destinationPath}`. */
  copyToChildSite(siteId: number, destinationPath: string, params?: File.DestinationCopyParams, options?: Files.RequestOptions): Promise<File.ActionResponse>

  /** Moves this file or folder to `destinationPath` in a Child Site: `_/Sites/{siteId}/{destinationPath}`. */
  moveToChildSite(siteId: number, destinationPath: string, params?: File.DestinationMoveParams, options?: Files.RequestOptions): Promise<File.ActionResponse>
}

declare namespace File {
  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath`: the source first, then where it goes. The same
   * as `uploadFile(destinationPath, sourceFilePath)`, whose order is kept as it always was.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function upload(sourceFilePath: string, destinationPath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /** Uploads `data` to `destinationPath`, the source first: the same as `uploadData(destinationPath, data)`. */
  function uploadFromData(data: UploadData, destinationPath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /** Uploads what the stream yields to `destinationPath`, the source first: the same as `uploadStream(destinationPath, readableStream)`. */
  function uploadFromStream(readableStream: NodeJS.ReadableStream, destinationPath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads data to `destinationPath`, destination first: a string (as UTF-8), bytes, an `ArrayBuffer`, an array of
   * string or byte chunks, a Node.js readable stream, or an iterable or async iterable of string or byte chunks (see
   * `UploadData`). Data in memory has a known size, so that its parts can go in parallel. Bytes, or an array with bytes
   * in it, are copied during the call into memory of the SDK's own, which the upload holds until it settles, so that the
   * caller may change or reuse its buffers, and the array, as soon as the call returns. That copy counts against the
   * upload's buffer budget (see `Files.TransferJobOptions.maxBufferBytes`) and cannot wait, for room or for the
   * upload's file admission: when no file admission is free at once (`Files.TransferJobOptions.maxConcurrentFiles`), when
   * it does not fit, or, larger than the whole budget, when anything else is held, the call rejects with a `FilesError`
   * saying so, before anything is copied or sent. A string, or an array of strings, which cannot
   * change, is encoded part by part as it is read, from the strings the array held at the call, with nothing copied
   * before. A stream or iterable is read as `uploadStream()` reads it, of unknown size unless `options.size` gives it.
   * Rejects with a `MissingParameterError` when `data` is missing or an empty string. Source first: `uploadFromData()`.
   */
  function uploadData(destinationPath: string, data: UploadData, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath`, destination first. The file is opened once the
   * upload's file has been admitted (see `Files.TransferJobOptions.maxConcurrentFiles`) and before the upload begins,
   * so that failing to open it fails the upload without beginning it, its size taken as it is opened, and each part read
   * at its own position, into memory of its own, so that its parts can go in parallel. It is closed once the upload has
   * settled. A file that has changed its size by then fails the upload. Source first: `upload()`.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadFile(destinationPath: string, sourceFilePath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads what the stream yields to `destinationPath`, destination first, following the public upload guide: it
   * begins with `begin_upload`, asking for direct connection information, then asks for its parts' grants in batches,
   * ahead of the parts that need them but never beyond the parts its plan, size or the grant's `available_parts`
   * allow, and completes the upload with its exact size and, when storage returned them, every part's `ETag`: no ETag
   * at all is valid, but a set missing some part's is refused before completing. The SDK reads the stream only as its
   * parts need bytes, and never closes, ends or destroys it; its chunks must be strings, read as UTF-8, or bytes. Each
   * chunk is taken whole and copied at once, the bytes of the part being read into that part's own buffer and the rest
   * into a copy of the SDK's own for the parts after, so that changing a chunk once the upload has taken it changes
   * nothing uploaded, a part sent again included (see `Files.TransferJobOptions.maxBufferBytes` for how that copy is
   * admitted: one that finds no room fails the upload with a `FilesError` before it is made). Looking ahead for the
   * stream's end takes nothing from it. Source first: `uploadFromStream()`.
   *
   * **Parts.** When the size is known, from `options.size` (or `params.size`) for a stream, and the grant fixes no
   * length or checksum, the SDK plans the parts itself: for S3, Files.com's own storage or a customer's bucket, parts
   * of at least 8 MiB, larger to fit 10,000 parts (or a smaller `available_parts`) of at most 5 GiB; for a remote server
   * integration or Files Agent, which the grant's `direct_connection_info` identifies, the API's part size, numbered in
   * the URL's `part_number` and `part_offset`, with no 10,000-part limit. Otherwise each part is as large as its grant's
   * `partsize`; and a grant that asks for the whole file sends it in one request. Each part goes as its grant says: its
   * `http_method`, its exact `headers`, never the API's credentials, workspace or the call's headers, and its bytes as
   * the raw body or as the file field of a multipart form after the grant's `parameters`, its size and type where its
   * `send` places them; a binding that conflicts with another, or that the SDK cannot keep exactly, refuses the part
   * before it is sent. Each grant must keep the upload's `ref` and, when it gives a `path`, the path this upload is
   * for, in its workspace: the one the request acts in, or that the destination names as a site path, or, when neither
   * names one, the one the API's first answer names; given as is or as its site path, or, with `with_rename`, the file
   * in the same folder the API renamed it to. Every later grant must give that same file. Parameters other than
   * `mkdir_parents`, `with_rename`, `buffered_upload` and `restart` go to the completion only.
   *
   * **Concurrency.** Parts go in parallel when the grant allows it (`parallel_parts`) and the size is known; otherwise
   * one at a time, in order, and so do the rest of an upload once a later grant no longer allows it. An adaptive
   * controller chooses how many at once (see `UploadOptions.startup`), within `maxConcurrency` and the job's configured
   * request limit, or the process's limit of 32 requests per direction. `determinePartUploadUri` is called once for
   * each part's first send, in part order.
   *
   * **Retries.** Only a part whose grant allows parallel parts and retrying (`retry_parts`) is sent again after a
   * transient failure, with the same number and bytes, however the upload schedules its parts (see
   * `Files.NetworkOptions.maxNetworkRetries`). A part whose URL, by its grant's `expires` or its own signature, has
   * expired by the time it is to be sent is given a new grant first, at most once for its first send and once for each
   * retry; it fails, unsent, if that URL has expired too, or when that grant's `retry_parts` is `false` and the part
   * may have been sent before. A part whose request storage answered with a redirect to an expired URL was sent, though
   * the redirect is never followed: it is sent again only as a retry its grant allows, to a renewed grant, and otherwise
   * the upload fails with the expired-URL `FilesError`.
   *
   * **Ending.** Once a part fails or `signal` aborts, nothing more is sent or read, any wait for the stream included,
   * the upload's other parts still under way are stopped, with or without a timeout, and the upload fails only after
   * they have settled, and every request for grants with them, with that first failure; it never completes. No other
   * upload, of its job or not, is stopped. Cancelled by `signal`, it rejects with the signal's reason, unchanged,
   * whatever it is, `null`, `NaN` and other falsy values included, as a cancelled call does. The request that completes
   * the upload is retried
   * only after a 429 or a failure to reach the API at all. A server error, a broken connection, a timeout, or a failure
   * or 429 after the API answered it with a redirect leaves it unknown whether the upload completed: it is not sent
   * again, and the upload rejects with that error, whose `completionUnknown` is `true`. Check the destination before
   * uploading again.
   *
   * The File it resolves with keeps the upload's options for its own methods, as a static method's model does: through a
   * client, without its `signal`.
   */
  function uploadStream(destinationPath: string, readableStream: NodeJS.ReadableStream, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath` in a Remote Server: `_/RemoteServers/{remoteServerId}/{destinationPath}`.
   * The source first; `uploadToRemoteServer()` keeps its own order. With `destinationPath` left out,
   * or `undefined`, the file goes to the destination's root under its own name, the last segment of `sourceFilePath`.
   * See `uploadFile()` and `UploadParams` for its params and options.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadFileToRemoteServer(sourceFilePath: string, remoteServerId: number, destinationPath?: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath` in a Remote Server: `_/RemoteServers/{remoteServerId}/{destinationPath}`.
   * Its order, the ID first, is kept as it always was; source first: `uploadFileToRemoteServer()`.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadToRemoteServer(remoteServerId: number, destinationPath: string, sourceFilePath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /** Copies the file or folder at `path` to `destinationPath` in a Remote Server: `_/RemoteServers/{remoteServerId}/{destinationPath}`. */
  function copyToRemoteServer(path: string, remoteServerId: number, destinationPath: string, params?: DestinationCopyParams, options?: Files.RequestOptions): Promise<ActionResponse>

  /** Moves the file or folder at `path` to `destinationPath` in a Remote Server: `_/RemoteServers/{remoteServerId}/{destinationPath}`. */
  function moveToRemoteServer(path: string, remoteServerId: number, destinationPath: string, params?: DestinationMoveParams, options?: Files.RequestOptions): Promise<ActionResponse>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath` in a Snapshot: `_/Snapshots/{snapshotId}/{destinationPath}`.
   * The source first; `uploadToSnapshot()` keeps its own order. With `destinationPath` left out,
   * or `undefined`, the file goes to the destination's root under its own name, the last segment of `sourceFilePath`.
   * See `uploadFile()` and `UploadParams` for its params and options.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadFileToSnapshot(sourceFilePath: string, snapshotId: number, destinationPath?: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath` in a Snapshot: `_/Snapshots/{snapshotId}/{destinationPath}`.
   * Its order, the ID first, is kept as it always was; source first: `uploadFileToSnapshot()`.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadToSnapshot(snapshotId: number, destinationPath: string, sourceFilePath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /** Copies the file or folder at `path` to `destinationPath` in a Snapshot: `_/Snapshots/{snapshotId}/{destinationPath}`. */
  function copyToSnapshot(path: string, snapshotId: number, destinationPath: string, params?: DestinationCopyParams, options?: Files.RequestOptions): Promise<ActionResponse>

  /** Moves the file or folder at `path` to `destinationPath` in a Snapshot: `_/Snapshots/{snapshotId}/{destinationPath}`. */
  function moveToSnapshot(path: string, snapshotId: number, destinationPath: string, params?: DestinationMoveParams, options?: Files.RequestOptions): Promise<ActionResponse>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath` in a Child Site: `_/Sites/{siteId}/{destinationPath}`.
   * The source first; `uploadToChildSite()` keeps its own order. With `destinationPath` left out,
   * or `undefined`, the file goes to the destination's root under its own name, the last segment of `sourceFilePath`.
   * See `uploadFile()` and `UploadParams` for its params and options.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadFileToChildSite(sourceFilePath: string, siteId: number, destinationPath?: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /**
   * Uploads the file at `sourceFilePath` on disk to `destinationPath` in a Child Site: `_/Sites/{siteId}/{destinationPath}`.
   * Its order, the ID first, is kept as it always was; source first: `uploadFileToChildSite()`.
   *
   * Node.js only: in a browser, rejects with a `NotImplementedError`.
   */
  function uploadToChildSite(siteId: number, destinationPath: string, sourceFilePath: string, params?: UploadParams, options?: UploadOptions): Promise<File>

  /** Copies the file or folder at `path` to `destinationPath` in a Child Site: `_/Sites/{siteId}/{destinationPath}`. */
  function copyToChildSite(path: string, siteId: number, destinationPath: string, params?: DestinationCopyParams, options?: Files.RequestOptions): Promise<ActionResponse>

  /** Moves the file or folder at `path` to `destinationPath` in a Child Site: `_/Sites/{siteId}/{destinationPath}`. */
  function moveToChildSite(path: string, siteId: number, destinationPath: string, params?: DestinationMoveParams, options?: Files.RequestOptions): Promise<ActionResponse>

  /**
   * The data `uploadData()` accepts. A string, bytes or an `ArrayBuffer` is uploaded as it is, an array of chunks as
   * one, and an iterable's chunks one after another. A Node.js stream's chunks, which static types cannot check, must
   * also be strings or bytes.
   */
  type UploadData = string | ArrayBuffer | ArrayBufferView | UploadChunk[] | NodeJS.ReadableStream | Iterable<UploadChunk> | AsyncIterable<UploadChunk>

  /** One chunk of upload data: a string, uploaded as UTF-8, or bytes. */
  type UploadChunk = string | Uint8Array

  /**
   * The parameters of an upload, besides those the upload sets itself: `mkdir_parents`, which creates missing parent
   * folders, `with_rename`, `buffered_upload` and `restart` go to `begin_upload`, the others to its completion.
   */
  type UploadParams = Omit<CreateParams, 'action' | 'etags' | 'part' | 'ref'>

  /**
   * The options of an upload. Its API requests use them as a call's options. Each part is sent with the agent chosen
   * for its URL, its `signal`, `timeoutSecs` and `fetch`, and its `client`'s network and log settings, but none of its
   * credentials or headers (see `uploadStream()`). Through a client, the agent is the one `getAgentForUrl`, `agent`,
   * `httpsAgent` or `httpAgent` gives for the part's URL, in that order, or else the client's `getAgentForUrl` or
   * `agent`. Without a client, it is the one `getAgentForUrl` or `agent` gives, as before. Transfer-specific options
   * (`concurrency`, `maxConcurrency`, `startup`, `size`, `onProgress`, `determinePartUploadUri`, `control` and `job`) are
   * checked before the source is opened or a request is sent, however the upload turns out to run; invalid transfer
   * options reject with an `InvalidParameterError`. The request options it inherits keep their own behavior.
   */
  interface UploadOptions extends Files.RequestOptions, TransferOptions {
    /**
     * Chooses the URL each part is uploaded to, instead of the part's `upload_uri`. It must return the URL right away,
     * not a Promise. It is called again for a part given a new grant because its URL expired before it could be sent.
     */
    determinePartUploadUri?: ((part: NegotiatedUploadPart) => string) | undefined

    /** The exact size in bytes of a stream's data, so that its parts can be planned and go in parallel. */
    size?: number | undefined

    /**
     * How an adaptive upload to S3, Files.com's own storage or a customer's bucket, starts: `'default'`, from one part
     * at a time, raising the count only while measured throughput gains and queueing stays low, or at once to the policy
     * start (32) on a link of 96 MiB/s or more; or `'aggressive'`, at the policy start at once. An upload whose first
     * grant identifies a remote server integration or Files Agent has no warm start: it begins at the policy start
     * either way, with a controller apart from S3 uploads'. All reach the same ordinary policy and ceiling, within
     * `maxConcurrency`: probes of 4 more parts kept on a 1% gain, backoff on failures, throttles and rising queueing.
     * Cannot be given with `concurrency`.
     */
    startup?: 'aggressive' | 'default' | undefined

    /**
     * A fixed number of parts at once, from 1 to 1024, instead of the adaptive controller; still within `maxConcurrency`
     * when that is given too, and the request budget.
     */
    concurrency?: number | undefined
  }

  /** The options of a download (see `File.downloadToFile()`): its signal and the transfer options. */
  interface DownloadOptions extends TransferOptions {
    /**
     * Cancels the download: every request it has open stops, and it rejects with the signal's reason, unchanged, once
     * they have all closed.
     */
    signal?: AbortSignal | undefined
  }

  /** What uploads and downloads take besides their requests' options. */
  interface TransferOptions {
    /**
     * The most requests to storage the transfer has at once, from 1 to 1024: 32 by default, the policy's maximum; for a
     * download, its first response included, so that one allowed a single request is never split. A job's or the
     * process's request budget bounds it too.
     */
    maxConcurrency?: number | undefined

    /** Receives the transfer's progress (see `Files.TransferProgress`). */
    onProgress?: ((progress: Files.TransferProgress) => void) | undefined

    /** Pauses and resumes the transfer (see `Files.TransferControl`). */
    control?: Files.TransferControl | undefined

    /** The job the transfer belongs to, whose controller and budgets it shares (see `Files.TransferJob`). */
    job?: Files.TransferJob | undefined
  }

  /**
   * One part's grant, as `determinePartUploadUri` receives it: the API's answer, except that `headers` holds the
   * response headers of the request that gave it and `parameters` the part's own. The part is still sent to storage with
   * the headers the API's answer gave, not these.
   */
  interface NegotiatedUploadPart extends Omit<FileUploadPart, 'getHeaders' | 'getParameters' | 'headers' | 'parameters'> {
    /** The response headers of the request that gave the grant, with lowercase names. */
    readonly headers: Files.HttpHeaders

    /** The part's own parameters: `action`, its number and the upload's `ref`. */
    readonly parameters: PartNegotiationParameters

    /**
     * The same as `headers`: the response headers of the request that gave the grant, with lowercase names, not the
     * headers the part is sent to storage with.
     */
    getHeaders(): Files.HttpHeaders

    /** The same as `parameters`. */
    getParameters(): PartNegotiationParameters
  }

  interface PartNegotiationParameters {
    /** Always `'put'`, for a part to upload. */
    readonly action: 'put'

    /** The number of the part, counting from 1 in the order the upload reads its parts. */
    readonly part: number

    /** The upload's `ref`, as its first grant gave it. */
    readonly ref: string | null | undefined
  }

  /**
   * The API's response to a copy or move: its data describes the operation, and is not a model. It resolves as soon as
   * the API accepts the action; its `waitForCompletion()`, which is not one of its fields, waits for that action, in the
   * context its request was sent with, as `FileAction.waitForCompletion()` does.
   */
  type ActionResponse = Files.ApiResponse<FileAction.Attributes> & FileAction.Waitable

  type DestinationCopyParams = Omit<CopyParams, 'destination'>

  type DestinationMoveParams = Omit<MoveParams, 'destination'>
}

export default File
