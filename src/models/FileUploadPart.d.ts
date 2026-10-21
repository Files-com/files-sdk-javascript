import Files from '../Files'
import DirectConnectionInfo from './DirectConnectionInfo'

/** A FileUploadPart is a result of a begin upload operation which is the first step in our upload process. */
declare class FileUploadPart {
  /**
   * Creates a model whose state is the attributes given, such as those the API returns. Attributes not given are left
   * undefined.
   */
  constructor(attributes?: FileUploadPart.Attributes, options?: Files.RequestOptions)

  /**
   * The model's state: the attributes given to the constructor, as setters, updates and `save()` change them. Fields
   * the API returns that this SDK does not know yet are here too, typed `unknown`. Each attribute in the state can
   * also be read, though not assigned, as a property of its name, unless the model uses that name for a method.
   */
  attributes: FileUploadPart.Attributes & Files.UnknownFields

  /** The options this object's methods make their requests with: a copy of those it was created with. */
  options: Files.RequestOptions

  /** Whether this object has its `id`. */
  isLoaded(): boolean

  /** Content-Type and File to send */
  readonly send?: Files.JsonObject | null

  /** Type of upload */
  readonly action?: string | null

  /** If `true`, this file exists and you may wish to ask the user for overwrite confirmation */
  readonly ask_about_overwrites?: boolean | null

  /** Number of parts in the upload */
  readonly available_parts?: number | null

  /** Date/time of when this Upload part expires and the URL cannot be used any more */
  readonly expires?: string | null

  /** Additional upload headers to provide as part of the upload */
  readonly headers?: Files.JsonObject | null

  /** HTTP Method to use for uploading the part, usually `PUT` */
  readonly http_method?: string | null

  /** Size in bytes for this part */
  readonly next_partsize?: number | null

  /**
   * If `true`, multiple parts may be uploaded in parallel. If `false`, be sure to only upload one part at a time, in
   * order.
   */
  readonly parallel_parts?: boolean | null

  /** If `true`, parts may be retried. If `false`, a part cannot be retried and the upload should be restarted. */
  readonly retry_parts?: boolean | null

  /** Additional HTTP parameters to send with the upload */
  readonly parameters?: Files.JsonObject | null

  /** Number of this upload part */
  readonly part_number?: number | null

  /** Size in bytes for the next upload part */
  readonly partsize?: number | null

  /**
   * New file path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  readonly path?: string | null

  /** Reference name for this upload part */
  readonly ref?: string | null

  /** URI to upload this part to */
  readonly upload_uri?: string | null

  /** Optional direct connection information for direct Agent transfer attempts */
  readonly direct_connection_info?: DirectConnectionInfo.Attributes | null

  /** Content-Type and File to send */
  getSend(): Files.JsonObject | null | undefined

  /** Type of upload */
  getAction(): string | null | undefined

  /** If `true`, this file exists and you may wish to ask the user for overwrite confirmation */
  getAskAboutOverwrites(): boolean | null | undefined

  /** Number of parts in the upload */
  getAvailableParts(): number | null | undefined

  /** Date/time of when this Upload part expires and the URL cannot be used any more */
  getExpires(): string | null | undefined

  /** Additional upload headers to provide as part of the upload */
  getHeaders(): Files.JsonObject | null | undefined

  /** HTTP Method to use for uploading the part, usually `PUT` */
  getHttpMethod(): string | null | undefined

  /** Size in bytes for this part */
  getNextPartsize(): number | null | undefined

  /**
   * If `true`, multiple parts may be uploaded in parallel. If `false`, be sure to only upload one part at a time, in
   * order.
   */
  getParallelParts(): boolean | null | undefined

  /** If `true`, parts may be retried. If `false`, a part cannot be retried and the upload should be restarted. */
  getRetryParts(): boolean | null | undefined

  /** Additional HTTP parameters to send with the upload */
  getParameters(): Files.JsonObject | null | undefined

  /** Number of this upload part */
  getPartNumber(): number | null | undefined

  /** Size in bytes for the next upload part */
  getPartsize(): number | null | undefined

  /**
   * New file path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
   * characters.
   */
  getPath(): string | null | undefined

  /** Reference name for this upload part */
  getRef(): string | null | undefined

  /** URI to upload this part to */
  getUploadUri(): string | null | undefined

  /** Optional direct connection information for direct Agent transfer attempts */
  getDirectConnectionInfo(): DirectConnectionInfo.Attributes | null | undefined
}

declare namespace FileUploadPart {
  /** The fields of `FileUploadPart` objects. Any of them can be missing, and those the API returns can be null. */
  interface Attributes {
    /** Content-Type and File to send */
    send?: Files.JsonObject | null

    /** Type of upload */
    action?: string | null

    /** If `true`, this file exists and you may wish to ask the user for overwrite confirmation */
    ask_about_overwrites?: boolean | null

    /** Number of parts in the upload */
    available_parts?: number | null

    /** Date/time of when this Upload part expires and the URL cannot be used any more */
    expires?: string | null

    /** Additional upload headers to provide as part of the upload */
    headers?: Files.JsonObject | null

    /** HTTP Method to use for uploading the part, usually `PUT` */
    http_method?: string | null

    /** Size in bytes for this part */
    next_partsize?: number | null

    /**
     * If `true`, multiple parts may be uploaded in parallel. If `false`, be sure to only upload one part at a time, in
     * order.
     */
    parallel_parts?: boolean | null

    /** If `true`, parts may be retried. If `false`, a part cannot be retried and the upload should be restarted. */
    retry_parts?: boolean | null

    /** Additional HTTP parameters to send with the upload */
    parameters?: Files.JsonObject | null

    /** Number of this upload part */
    part_number?: number | null

    /** Size in bytes for the next upload part */
    partsize?: number | null

    /**
     * New file path. This must be slash-delimited, but it must neither start nor end with a slash. Maximum of 5000
     * characters.
     */
    path?: string | null

    /** Reference name for this upload part */
    ref?: string | null

    /** URI to upload this part to */
    upload_uri?: string | null

    /** Optional direct connection information for direct Agent transfer attempts */
    direct_connection_info?: DirectConnectionInfo.Attributes | null
  }
}

export default FileUploadPart
